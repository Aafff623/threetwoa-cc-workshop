# Claude Code 全功能谱系与工作流手册

> 版本覆盖：v0.x → v2.1.156（截至 2026-05-29）
> 用途：速查 + 工作流参考

---

## 第一部分：最新特性（2026年3月–5月）

### 🚀 杀手级新功能

#### 1. Agent View — 多会话仪表盘
```bash
claude agents
```
一屏查看所有会话：运行中 / 阻塞 / 已完成。从单会话工具 → 代理操作环境。

#### 2. Auto Mode — 智能权限托管
介于"逐条批准"和 `--dangerously-skip-permissions` 之间：
- 输入层：Prompt-injection 探测
- 输出层：Transcript 分类器
- 结果：93% 的安全操作自动执行，风险操作阻断并引导替代方案

#### 3. Computer Use — 视觉操控 GUI
Claude 可以打开原生 App、点击 UI、滚动、导航。用于闭环仅 GUI 能验证的工作流（如浏览器渲染确认）。

#### 4. Scheduled Tasks — 定时云端执行
```bash
/schedule
```
- 重复任务（每日审 PR、每周依赖审计）
- GitHub 事件触发 / API 触发
- 电脑关机也能跑，回来直接收 PR

#### 5. Ultrareview — 云端代码审查
```bash
/ultrareview
claude ultrareview    # CI 中使用
```
云端 agent 集群审代码，结果自动回 CLI/Desktop。

#### 6. Ultraplan — 云端计划协作
CLI 起草 → Web 审阅评论 → 远程运行或拉回本地。

---

### ⚡ 生产力增强

| 特性 | 命令/说明 | 版本 |
|------|-----------|------|
| `/goal` | 跨多轮持续工作直到条件满足 | v2.1.139+ |
| Rewind Menu | "Summarize up to here" 压缩上下文 | v2.1.139+ |
| Fast Mode | 默认 Opus 4.7，新增 `xhigh` effort | v2.1.105+ |
| Session Recap | 终端失焦期间的摘要 | v2.1.114+ |
| Transcript Search | 按 `/` 搜索会话历史 | v2.1.83+ |
| `/usage` | 查看 rate limit 消耗来源 | v2.1.105+ |

---

### 🔧 平台与集成

| 特性 | 说明 | 版本 |
|------|------|------|
| Windows PowerShell | 不再需要 Git Bash，原生 PowerShell | v2.1.120+ |
| Plugin `.zip`/URL | `--plugin-dir plugin.zip` / `--plugin-url` | v2.1.128+ |
| Mobile Push | 长任务完成推送手机 | v2.1.105+ |
| Cloud Auto-fix | 自动跟踪 PR、修复 CI、处理 review | v2.1.83+ |
| Worktree baseRef | `fresh` 从 remote / `head` 从本地 HEAD | v2.1.128+ |

---

## 第二部分：历史经典功能（长期好用）

### 🛠️ 核心 Slash Commands

| 命令 | 功能 | 适用场景 |
|------|------|----------|
| `/compact` | 压缩上下文，保留关键信息 | 长会话窗口告急 |
| `/init` | 初始化 `CLAUDE.md` 项目文档 | 新项目上手 |
| `/commit` | 智能分析 diff，生成 conventional commit | 提交代码 |
| `/review` | 审查当前 branch/PR | Code Review |
| `/test` | 运行测试并分析失败 | 调试 |
| `/diagnose` | 结构化诊断：复现→假设→验证→修复 | 疑难 Bug |
| `/config` | 交互式配置设置 | 调整行为 |
| `/memory` | 查看/管理持久化记忆 | 跨会话记忆 |
| `/schedule` | 创建定时任务 | 自动化 |
| `/resume` | 恢复之前的会话 | 断点续传 |
| `/clear` | 清空当前会话 | 重新开始 |

---

### 🧠 记忆系统（Memory）

**文件位置**：`~/.claude/memory/` 或项目内 `.claude/memory/`

- 自动记忆：Claude 自动保存关键信息
- 手动记忆：`/memory add "..."`
- 项目记忆：放在项目 `.claude/memory/` 下，随项目走
- 时间戳：记忆文件带时间戳，可追溯

**最佳实践**：
```markdown
---
name: project-conventions
description: 本项目编码规范
metadata:
  type: project
---

- 使用 2 空格缩进
- 所有 API 调用必须带超时
```

---

### 🎣 Hooks 系统

**用途**：在关键事件点自动执行操作。

```json
// .claude/settings.json
{
  "hooks": {
    "beforeToolUse": "echo 'About to run: $CLAUDE_TOOL_NAME'",
    "afterToolUse": "echo 'Done: $CLAUDE_TOOL_NAME'",
    "StopFailure": "notify-send 'Claude failed'",
    "if": {
      "condition": "$CLAUDE_TOOL_NAME == 'Bash'",
      "hook": "echo 'Running bash command'"
    }
  }
}
```

**可用事件**：
- `beforeToolUse` / `afterToolUse`
- `StopFailure`
- `onApproval`
- `onDenial`
- 条件 `if` hooks（v2.1.83+）

---

### 🔒 Git Guardrails

**用途**：防止危险 git 操作。

```bash
# 设置 guardrails
claude config set git.guardrails true
```

**默认阻断**：
- `git push --force`
- `git reset --hard`
- `git clean -fd`
- `git branch -D`

---

### 🌳 Worktrees

**用途**：隔离的 git 工作树，避免分支切换污染。

```bash
# 进入 worktree（自动创建）
claude worktree my-feature

# 基于 remote default 或本地 HEAD
# settings.json:
{
  "worktree.baseRef": "fresh"  // 或 "head"
}
```

---

### 🔌 MCP Servers

**用途**：扩展 Claude 的能力，连接外部工具。

```json
// .claude/settings.json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
    }
  }
}
```

**常见 MCP**：
- `@modelcontextprotocol/server-filesystem` — 文件系统
- `@modelcontextprotocol/server-github` — GitHub API
- `@modelcontextprotocol/server-postgres` — PostgreSQL
- `@modelcontextprotocol/server-puppeteer` — 浏览器自动化

---

### 🎨 Skills 系统

**用途**：自定义可复用的 agent 工作流。

```bash
# 创建 skill
claude skill create my-skill

# 使用 skill
/skill my-skill
```

**Skill 结构**：
```
.skills/my-skill/
├── claude.md          # Skill 描述和触发条件
├── README.md          # 使用说明
└── ...                # 资源文件
```

---

## 第三部分：推荐工作流

### 工作流 1：长会话 Agent 工作流（官方推荐）

**适用**：复杂功能开发、多文件重构、长期任务

```
1. 准备阶段
   ├── 确保根目录有 CLAUDE.md（项目上下文）
   ├── 确保有 CHANGELOG.md（工作记忆）
   └── tmux 或 screen 保持会话

2. 执行阶段
   ├── 定期 /compact 或 Rewind 压缩上下文
   ├── 定期 git commit（agent 也记得 commit）
   ├── 使用 /goal 设定跨轮目标
   └── 多会话时用 claude agents 监控

3. 收尾阶段
   ├── /review 自查
   ├── 运行完整测试套件
   └── git push
```

**关键文件**：
- `CLAUDE.md` — 项目级上下文（架构、规范、决策）
- `CHANGELOG.md` — 工作记忆（做了什么、为什么、下一步）
- `.claude/memory/` — 持久化记忆

---

### 工作流 2：TDD 红绿重构

```bash
# 1. 写测试（红）
claude "为 X 功能写一个失败的测试"

# 2. 实现（绿）
claude "让测试通过，最小改动"

# 3. 重构
claude "重构这段代码，保持测试通过"
```

**或使用 `/test`**：
```bash
/test
# Claude 会分析失败测试，提出修复方案
```

---

### 工作流 3：PR 审查流水线

```bash
# 本地审查
/review

# 云端深度审查
/ultrareview

# 开启 PR 自动修复（云端）
/autofix-pr
```

**配合 Scheduled Tasks**：
```bash
/schedule "每天早上审查所有 open PRs" --cron "0 9 * * *"
```

---

### 工作流 4：Bug 诊断

```bash
# 结构化诊断
/diagnose

# 手动诊断流程
1. 复现问题（给 Claude 步骤）
2. Claude 提出假设
3. 添加日志/断点验证
4. 修复 + 回归测试
```

---

### 工作流 5：多代理并行

```bash
# 窗口 1：开发功能 A
claude --bg "实现用户认证模块"

# 窗口 2：开发功能 B
claude --bg "重构数据库层"

# 监控所有会话
claude agents

# 恢复某个会话
/resume <session-id>
```

---

### 工作流 6：定时运维

```bash
# 每天早上 9 点审查 PRs
/schedule "审查 open PRs，标记需要关注的" --cron "0 9 * * *"

# 每周一依赖审计
/schedule "运行 npm audit，生成报告" --cron "0 10 * * 1"

# CI 失败自动修复（云端）
# 在 Web 界面配置
```

---

## 第四部分：配置速查

### 常用 settings.json

```json
{
  "model": "claude-opus-4-8",
  "effort": "high",
  "worktree.baseRef": "fresh",
  "git.guardrails": true,
  "hooks": {
    "beforeToolUse": "echo 'Running: $CLAUDE_TOOL_NAME'",
    "StopFailure": "notify-send 'Claude stopped'"
  },
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    }
  },
  "permissions": {
    "Bash": "ask",
    "Edit": "ask",
    "Write": "ask"
  }
}
```

### 环境变量

| 变量 | 说明 |
|------|------|
| `CLAUDE_EFFORT` | 当前 effort level |
| `CLAUDE_TOOL_NAME` | 正在执行的工具名 |
| `CLAUDE_API_KEY` | API Key |

---

## 附录：版本时间线

| 时间 | 版本 | 标志性特性 |
|------|------|-----------|
| 2026-05 | v2.1.139-156 | Agent View, `/goal`, Rewind |
| 2026-05 | v2.1.128-136 | Plugin zip/URL, worktree.baseRef |
| 2026-04 | v2.1.120-126 | Windows PowerShell, `claude ultrareview` |
| 2026-04 | v2.1.114-119 | `/ultrareview`, session recap, custom themes |
| 2026-04 | v2.1.105-113 | Opus 4.7, Routines, mobile push, native binaries |
| 2026-04 | v2.1.92-101 | Ultraplan, Monitor tool, `/loop` self-pacing |
| 2026-03 | v2.1.86-91 | Computer use (CLI), `/powerup`, MCP 500K override |
| 2026-03 | v2.1.83-85 | Auto mode, transcript search, PowerShell tool, `if` hooks |
| 2026-03 | v2.1.x | Output limits ↑ 64k/128k, cloud auto-fix |
| 更早 | v2.0.x | Skills, MCP, worktrees, memory |
| 更早 | v1.x | 基础 CLI，git 集成，slash commands |

---

*最后更新：2026-05-29*
