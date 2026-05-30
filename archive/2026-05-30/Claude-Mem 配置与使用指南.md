# Claude-Mem 配置与使用指南

> 安装日期：2026-05-28
> 插件版本：12.4.7
> 用途：Claude Code 跨会话自动记忆

---

## 一、安装信息

| 项目 | 值 |
|------|-----|
| 版本 | 12.4.7 |
| 安装方式 | `npx claude-mem install` |
| 插件目录 | `C:\Users\Lenovo\.claude\plugins\marketplaces\thedotmack\plugin` |
| 依赖修复 | `bun install`（修复了 `zod/v3` 缺失问题） |

## 二、Worker 状态

```
Status:   Running
PID:      61144
Port:     37777
Started:  2026-05-28T08:57:33.590Z
```

启动命令：
```bash
cd "C:/Users/Lenovo/.claude/plugins/marketplaces/thedotmack/plugin" && npx claude-mem start
```

Web 查看器：http://localhost:37777

## 三、Hooks 配置

Hooks 文件已复制到：
- `C:\Users\Lenovo\.claude\hooks\claude-mem-hooks.json`

覆盖的生命周期：

| Hook | 触发时机 | 功能 |
|------|---------|------|
| Setup | 会话初始化 | 版本检查 |
| SessionStart | startup/clear/compact | 启动 Worker + 注入上下文 |
| UserPromptSubmit | 用户提交消息 | 会话初始化标记 |
| PreToolUse(Read) | Read 工具调用前 | 文件上下文捕获 |
| PostToolUse | 任意工具调用后 | **自动观察记录（核心）** |
| Stop | 会话结束 | 生成摘要 |

## 四、数据存储

| 项目 | 路径 |
|------|------|
| SQLite 数据库 | `C:\Users\Lenovo\.claude-mem\claude-mem.db` |
| 设置文件 | `C:\Users\Lenovo\.claude-mem\settings.json` |
| 备份目录 | `C:\Users\Lenovo\.claude-mem\backups` |
| 日志目录 | `C:\Users\Lenovo\.claude-mem\logs` |

## 五、常用命令

```bash
# 查看状态
npx claude-mem status

# 启动 Worker
npx claude-mem start

# 停止 Worker
npx claude-mem stop

# 在 Claude Code 内搜索记忆
/mem-search <关键词>

# 查看 Web 界面
open http://localhost:37777
```

## 六、与 memory MCP 的区别

| | Claude-Mem | memory MCP |
|---|---|---|
| 类型 | Claude Code 插件 | MCP Server |
| 自动收录 | ✅ 全自动（hooks 驱动） | ❌ 需手动调用工具 |
| 存储 | SQLite + 语义压缩 | 知识图谱（实体/关系） |
| 使用方式 | 透明自动，无需干预 | 显式调用 API |
| 跨项目 | 全局生效 | 按项目配置 |

两者互补：Claude-Mem 负责**自动捕获工具输出**，memory MCP 负责**手动维护结构化知识**。

## 七、注意事项

1. **Worker 需保持运行** — 如果 Worker 停止，自动收录将失效
2. **Windows 兼容性** — hooks 使用 bash 语法，依赖 Git Bash 环境
3. **卸载前关闭所有 Claude Code 会话** — 否则 `~/.claude-mem` 会被活跃的 hooks 重建
4. **首次使用** — 新会话开始后，工具调用会自动被记录，无需额外操作

## 八、故障排查

| 问题 | 解决 |
|------|------|
| Worker 无法启动 | `cd plugin目录 && bun install` 修复依赖 |
| 记忆未保存 | 检查 Worker 是否在运行 (`npx claude-mem status`) |
| 搜索无结果 | 确认已有工具调用记录，或等待 Stop hook 生成摘要 |

---

*本文档由 Claude Code 自动生成，最后更新：2026-05-28*
