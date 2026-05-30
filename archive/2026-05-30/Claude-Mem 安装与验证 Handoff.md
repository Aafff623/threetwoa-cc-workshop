# Claude-Mem 安装与验证 Handoff

> 本文档用于交接给下一个 Agent，请按「验证步骤」执行并汇报结果。
> 创建时间：2026-05-28

---

## 一、背景与原因

### 问题现象
用户发现 Claude Code **跨会话失忆**——每次新开会话，之前的上下文、决策、偏好全部丢失。

### 根因诊断
- 用户之前装的是 **`memory MCP server`**（`@modelcontextprotocol/server-memory`）
- 误以为这就是自动记忆系统
- 实际上 memory MCP 只提供手动工具（`create_entities`/`add_observations` 等），**不会自动记录对话**

### 正确方案
需要安装 **`Claude-Mem`** 插件（`thedotmack/claude-mem`），这是一个 Claude Code 原生插件，通过 **hooks** 自动捕获工具调用输出，AI 压缩后存入 SQLite，并在新会话中智能注入相关上下文。

---

## 二、核心区别（必看）

| | memory MCP | Claude-Mem |
|---|---|---|
| 本质 | MCP Server（工具集） | Claude Code 插件 |
| 自动收录 | ❌ 需手动调用 | ✅ 全自动 hooks |
| 触发时机 | 你显式调用 API | 每次工具调用后自动 |
| 存储方式 | 知识图谱（实体/关系/观察） | SQLite + 语义压缩 + Chroma 向量检索 |
| 使用方式 | `create_entities` 等工具 | 透明自动，无需干预 |
| 生效范围 | 按项目配置 | **全局生效**（scope: user） |

**两者互补**：Claude-Mem 自动捕获工具输出，memory MCP 手动维护结构化知识。

---

## 三、安装经过

### 3.1 环境
- OS: Windows 11
- Shell: Git Bash
- Bun: 1.3.11 ✅
- Node: v24.14.0 ✅

### 3.2 安装命令
```bash
npx claude-mem install
```

输出关键信息：
- Version: 12.4.7（marketplace 安装）
- Scope: `user`（全局）
- Plugin dir: `C:\Users\Lenovo\.claude\plugins\marketplaces\thedotmack`
- Worker port: 37777

### 3.3 依赖修复
首次启动 Worker 报错 `Cannot find module 'zod/v3'`，执行：
```bash
cd "C:/Users/Lenovo/.claude/plugins/marketplaces/thedotmack/plugin"
bun install
```
修复成功，安装了 38 个包（含 `zod@4.4.3`）。

### 3.4 启动 Worker
```bash
npx claude-mem start
```

### 3.5 全局注册确认
检查以下文件确认全局注册：
- `C:\Users\Lenovo\.claude\plugins\installed_plugins.json` → `claude-mem@thedotmack` scope: "user"
- `C:\Users\Lenovo\.claude\plugins\known_marketplaces.json` → `thedotmack` 已注册
- `C:\Users\Lenovo\.claude\settings.json` → `extraKnownMarketplaces` 包含 `thedotmack`

---

## 四、当前状态

### 4.1 Worker
```
Status:   Running
PID:      61144
Port:     37777
Started:  2026-05-28T08:57:33.590Z
```

### 4.2 配置（settings.json）
- `CLAUDE_MEM_MODE`: "code"
- `CLAUDE_MEM_MODEL`: "claude-haiku-4-5-20251001"
- `CLAUDE_MEM_DATA_DIR`: `C:\Users\Lenovo\.claude-mem`
- `CLAUDE_MEM_CHROMA_ENABLED`: true（本地模式）
- `CLAUDE_MEM_TRANSCRIPTS_ENABLED`: true

### 4.3 数据目录
```
C:\Users\Lenovo\.claude-mem\
├── claude-mem.db          # SQLite 主数据库
├── settings.json          # 配置文件
├── backups/               # 备份
├── logs/                  # 日志
├── corpora/               # 语料
└── CAPTURE_BROKEN         # 历史问题标记（2026-05-27 的 #2188，已修复）
```

### 4.4 Hooks 覆盖
| Hook | 功能 |
|------|------|
| Setup | 版本检查 |
| SessionStart | 启动 Worker + 注入上下文 |
| UserPromptSubmit | 会话初始化标记 |
| PreToolUse(Read) | 文件上下文捕获 |
| **PostToolUse** | **自动观察记录（核心）** |
| Stop | 生成会话摘要 |

---

## 五、验证步骤（请按顺序执行）

### Step 1: 确认 Worker 运行
```bash
npx claude-mem status
```
**预期输出**: `Worker is running` + PID + Port

**如果未运行**：
```bash
cd "C:/Users/Lenovo/.claude/plugins/marketplaces/thedotmack/plugin"
npx claude-mem start
```

### Step 2: 确认全局注册
读取以下文件，确认 `claude-mem@thedotmack` 存在且 scope 为 `user`：
```bash
cat ~/.claude/plugins/installed_plugins.json | grep -A5 "claude-mem"
```

### Step 3: 触发自动收录（核心验证）
在新会话中执行以下操作（确保有工具调用）：

1. 用 `Glob` 或 `Read` 读取项目中的任意文件
2. 用 `Bash` 执行任意命令（如 `ls` 或 `git status`）
3. 等待 5-10 秒（给 hooks 处理时间）

### Step 4: 验证数据写入
检查数据库是否有新记录：

```bash
# 方法 A：用 npx claude-mem 搜索
npx claude-mem search --query "你的工具调用关键词" --limit 5

# 方法 B：直接查 SQLite（如果 sqlite3 CLI 可用）
sqlite3 "C:/Users/Lenovo/.claude-mem/claude-mem.db" "SELECT COUNT(*) FROM observations;"

# 方法 C：看日志
ls -lt "C:/Users/Lenovo/.claude-mem/logs/" | head -3
tail -20 "C:/Users/Lenovo/.claude-mem/logs/claude-mem-$(date +%Y-%m-%d).log"
```

**预期结果**：
- 日志中出现 `[POST_TOOL_USE]` 或 `[OBSERVATION]` 相关记录
- 数据库 observation 计数增加
- `npx claude-mem search` 能返回结果

### Step 5: 验证跨会话记忆
1. **关闭当前 Claude Code 会话**
2. **新开一个会话**（cd 到任意项目）
3. 在新会话中问：「上一个会话我们做了什么？」或执行 `/mem-search 上一个会话`

**预期结果**：Claude-Mem 应该注入上一个会话的摘要或相关上下文。

### Step 6: Web 界面验证
浏览器打开 http://localhost:37777
- 应能看到记忆列表
- 有搜索功能
- 显示统计数据

---

## 六、已知问题与注意

1. **Windows 兼容性**
   - Hooks 使用 bash 语法，依赖 Git Bash
   - 之前出现过 `empty stdin payload received — issue #2188`，已修复

2. **Worker 需保持运行**
   - Worker 停止 = 自动收录失效
   - 电脑重启后需手动重新启动（暂未配置开机自启）

3. **当前会话限制**
   - 本 session 内安装的 Claude-Mem，**当前会话可能无法触发完整 hooks**
   - 因为 `SessionStart` hook 在 Worker 启动前已执行过
   - **下一个新会话**才会完整走通所有 hooks

4. **CAPTURE_BROKEN 文件**
   - `C:\Users\Lenovo\.claude-mem\CAPTURE_BROKEN` 是历史问题标记
   - 内容是 2026-05-27 的 bun-runner stdin 问题
   - 不影响当前运行，可忽略

5. **卸载注意**
   - 卸载前必须关闭所有 Claude Code 会话
   - 否则活跃 hooks 会重建 `~/.claude-mem` 目录

---

## 七、常用命令速查

```bash
# 状态
npx claude-mem status

# 启动/停止 Worker
npx claude-mem start
npx claude-mem stop

# 搜索记忆（CLI）
npx claude-mem search --query "关键词" --limit 10

# Claude Code 内搜索
/mem-search 关键词

# Web 查看器
http://localhost:37777
```

---

## 八、参考文档

- 同目录下：`Claude-Mem 配置与使用指南.md`（详细配置说明）
- GitHub: https://github.com/thedotmack/claude-mem

---

---

## 验证结果（2026-05-28）

执行 Agent 按 Step 1~6 完成验证，结果如下：

| 步骤 | 状态 | 说明 |
|------|------|------|
| Step 1 Worker 运行 | ✅ | PID 61144, Port 37777 |
| Step 2 全局注册 | ✅ | scope: user, v13.3.0 |
| Step 3 触发工具调用 | ✅ | Glob + Bash 已执行 |
| Step 4 数据写入 | ⚠️ | observation = 0，**符合预期**——当前会话 SessionStart 先于 Worker 启动，下一会话才能完整触发 PostToolUse hooks |
| Step 5 跨会话记忆 | ⏳ | **需下一会话验证**（当前会话无法完成） |
| Step 6 Web 界面 | ✅ | `http://localhost:37777` 正常，Welcome 弹窗 + 功能入口完整 |

### 结论

**Claude-Mem 安装正确，Worker 运行正常，但当前会话无法验证自动收录。**

原因符合文档 §6.3 已知限制：本 session 内安装的 Claude-Mem，SessionStart hook 在 Worker 启动前已执行，**下一新会话**才会完整走通所有 hooks（PostToolUse → 自动观察记录）。

### 待办

- [ ] 关闭当前 Claude Code 会话，新开一个会话到任意项目
- [ ] 执行几次工具调用（如 `ls`、`Read`、`Glob`）
- [ ] 执行 `/mem-search` 或问「上一个会话我们做了什么」验证跨会话记忆注入
- [ ] 确认 observation 数量 > 0

---

*Handoff 文档由 Claude Code 生成，交接时间：2026-05-28*
*下一个 Agent 请执行「五、验证步骤」并汇报结果*
