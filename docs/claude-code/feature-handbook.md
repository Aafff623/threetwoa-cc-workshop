---
title: "Claude Code 全功能谱系与工作流手册"
type: reference
status: active
source_files:
  - "archive/2026-05-30/Claude Code 全功能谱系与工作流手册.md"
updated: 2026-05-31
owner: threetwoa
---

# Claude Code 全功能谱系与工作流手册

> 版本覆盖：v0.x → v2.1.156（截至 2026-05-29）
> 用途：速查 + 工作流参考

---

## 版本覆盖范围说明

本手册覆盖 Claude Code 从早期 v0.x 到最新 v2.1.156 的完整功能谱系。内容按功能稳定性分为两层：

- **稳定层**：历史经典功能，长期可用，适合日常依赖（如 `/compact`、`/init`、Git 集成、Memory、Skills）
- **新特性层**：2026 年 3 月–5 月发布的功能，代表当前能力边界（如 Agent View、Auto Mode、Computer Use、Scheduled Tasks）

版本标注格式：`v2.1.xxx+` 表示该版本起可用。

---

## 核心功能分类

### 1. 会话与上下文管理

| 功能 | 命令 / 说明 | 版本 |
|------|-------------|------|
| `/compact` | 压缩上下文，保留关键信息，长会话窗口告急时使用 | 稳定 |
| Rewind Menu | "Summarize up to here" 压缩上下文到指定位置 | v2.1.139+ |
| `/clear` | 清空当前会话，重新开始 | 稳定 |
| `/resume` | 恢复之前的会话，断点续传 | 稳定 |
| Session Recap | 终端失焦期间的摘要，回来后快速 catch up | v2.1.114+ |
| Transcript Search | 按 `/` 搜索会话历史 | v2.1.83+ |
| `/goal` | 跨多轮持续工作直到条件满足，设定持久目标 | v2.1.139+ |

**关键概念**：Claude Code 的上下文窗口有限，长任务中定期 `/compact` 或使用 Rewind 是保持性能的核心习惯。

---

### 2. 代码编辑与开发

| 功能 | 命令 / 说明 | 版本 |
|------|-------------|------|
| 文件编辑 | `Edit` / `Write` 工具 — 精确替换或全量写入 | 稳定 |
| 代码搜索 | `Grep` / `Glob` — 基于 ripgrep 的内容和文件搜索 | 稳定 |
| 代码阅读 | `Read` — 带行号的文件读取，支持偏移和限制 | 稳定 |
| `/test` | 运行测试并分析失败，自动定位问题 | 稳定 |
| `/diagnose` | 结构化诊断：复现 → 假设 → 验证 → 修复 | 稳定 |
| Fast Mode | 默认 Opus 4.7，新增 `xhigh` effort 级别 | v2.1.105+ |
| Computer Use | 视觉操控 GUI，打开原生 App、点击 UI、滚动导航 | v2.1.86+ |

**最佳实践**：
- 多文件修改前先 `Read` 关键文件，避免盲改
- 复杂 bug 优先用 `/diagnose` 走结构化流程，而非直接试错
- GUI 验证场景（如浏览器渲染确认）启用 Computer Use

---

### 3. Git 集成与版本控制

| 功能 | 命令 / 说明 | 版本 |
|------|-------------|------|
| `/commit` | 智能分析 diff，生成 conventional commit 消息 | 稳定 |
| Git Guardrails | 阻断危险操作（`push --force`、`reset --hard` 等） | 稳定 |
| Worktrees | 隔离的 git 工作树，避免分支切换污染工作区 | 稳定 |
| Cloud Auto-fix | 自动跟踪 PR、修复 CI、处理 review 评论 | v2.1.83+ |
| Windows PowerShell | 原生 PowerShell 支持，不再需要 Git Bash | v2.1.120+ |

**Worktree 用法**：
```bash
# 进入 worktree（自动创建新分支）
claude worktree my-feature

# 配置基准分支来源
# settings.json: "worktree.baseRef": "fresh"  # 从 remote default
# settings.json: "worktree.baseRef": "head"   # 从本地 HEAD
```

**Guardrails 配置**：
```bash
claude config set git.guardrails true
```

---

### 4. 多代理与并行工作（Agent View）

| 功能 | 命令 / 说明 | 版本 |
|------|-------------|------|
| Agent View | `claude agents` — 一屏查看所有会话状态 | v2.1.139+ |
| 后台任务 | `claude --bg "..."` — 后台运行不阻塞终端 | 稳定 |
| `/schedule` | 创建定时任务，支持 cron 表达式 | v2.1.83+ |
| `/ultrareview` | 云端 agent 集群审查代码 | v2.1.114+ |
| Ultraplan | 云端计划协作：CLI 起草 → Web 审阅 → 远程运行 | v2.1.92+ |

**Agent View 状态**：
- 运行中（绿色）
- 阻塞 / 等待批准（黄色）
- 已完成 / 失败（灰色 / 红色）

---

### 5. 记忆系统（Memory）

**文件位置**：`~/.claude/memory/`（全局）或项目内 `.claude/memory/`（项目级）

| 能力 | 说明 |
|------|------|
| 自动记忆 | Claude 自动保存会话中的关键信息 |
| 手动记忆 | `/memory add "..."` 显式添加 |
| 项目记忆 | 放在项目 `.claude/memory/` 下，随仓库走 |
| 时间戳 | 记忆文件带时间戳，可追溯历史 |

**记忆文件格式示例**：
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

### 6. Hooks 系统

**用途**：在关键事件点自动执行自定义操作。

**配置位置**：`.claude/settings.json`

```json
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
- `beforeToolUse` / `afterToolUse` — 工具执行前后
- `StopFailure` — 会话异常停止
- `onApproval` / `onDenial` — 权限批准 / 拒绝
- `if` hooks（v2.1.83+）— 条件触发

---

### 7. MCP Servers（外部工具扩展）

**用途**：通过 Model Context Protocol 连接外部工具，扩展 Claude 能力边界。

**配置示例**：
```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path"]
    }
  }
}
```

**常见 MCP Server**：

| 名称 | 功能 |
|------|------|
| `@modelcontextprotocol/server-filesystem` | 文件系统操作 |
| `@modelcontextprotocol/server-github` | GitHub API 集成 |
| `@modelcontextprotocol/server-postgres` | PostgreSQL 数据库查询 |
| `@modelcontextprotocol/server-puppeteer` | 浏览器自动化 |

---

### 8. Skills 系统（自定义工作流）

**用途**：将可复用的 agent 工作流封装为 Skill，通过 `/skill` 调用。

**创建与使用**：
```bash
# 创建 skill
claude skill create my-skill

# 使用 skill
/skill my-skill
```

**Skill 目录结构**：
```
.skills/my-skill/
├── claude.md          # Skill 描述和触发条件
├── README.md          # 使用说明
└── ...                # 资源文件
```

---

### 9. 安全与权限（Auto Mode）

**Auto Mode**（v2.1.83+）：介于"逐条批准"和 `--dangerously-skip-permissions` 之间的智能托管模式。

**双层防护**：
- **输入层**：Prompt-injection 探测
- **输出层**：Transcript 分类器

**结果**：约 93% 的安全操作自动执行，风险操作阻断并引导替代方案。

**权限粒度配置**：
```json
{
  "permissions": {
    "Bash": "ask",
    "Edit": "ask",
    "Write": "ask"
  }
}
```

---

### 10. 平台与集成特性

| 特性 | 说明 | 版本 |
|------|------|------|
| Plugin `.zip`/URL | `--plugin-dir plugin.zip` / `--plugin-url` 加载插件 | v2.1.128+ |
| Mobile Push | 长任务完成推送手机通知 | v2.1.105+ |
| `/usage` | 查看 rate limit 消耗来源 | v2.1.105+ |
| Custom Themes | 自定义终端主题 | v2.1.114+ |
| Native Binaries | 原生二进制分发，启动更快 | v2.1.105+ |

---

## 常用工作流速查

### 工作流 1：长会话 Agent 开发（官方推荐）

适用于复杂功能开发、多文件重构、长期任务。

**准备阶段**：
1. 确保根目录有 `CLAUDE.md`（项目上下文：架构、规范、决策）
2. 确保有 `CHANGELOG.md`（工作记忆：做了什么、为什么、下一步）
3. 使用 tmux 或 screen 保持会话不中断

**执行阶段**：
1. 定期 `/compact` 或 Rewind 压缩上下文
2. 定期 `git commit`（agent 也记得 commit）
3. 使用 `/goal` 设定跨轮持久目标
4. 多会话时用 `claude agents` 监控状态

**收尾阶段**：
1. `/review` 自查代码质量
2. 运行完整测试套件
3. `git push`

**关键文件清单**：
- `CLAUDE.md` — 项目级上下文
- `CHANGELOG.md` — 工作记忆
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

**配合定时任务**：
```bash
/schedule "每天早上审查所有 open PRs" --cron "0 9 * * *"
```

---

### 工作流 4：Bug 结构化诊断

```bash
# 快速入口
/diagnose
```

**手动诊断四步法**：
1. **复现**：向 Claude 提供精确复现步骤
2. **假设**：Claude 提出可能原因假设
3. **验证**：添加日志 / 断点 / 测试验证假设
4. **修复**：修复问题 + 回归测试防止复发

---

### 工作流 5：多代理并行开发

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

### 工作流 6：定时运维自动化

```bash
# 每天早上 9 点审查 PRs
/schedule "审查 open PRs，标记需要关注的" --cron "0 9 * * *"

# 每周一依赖审计
/schedule "运行 npm audit，生成报告" --cron "0 10 * * 1"

# CI 失败自动修复（云端配置）
# 在 Web 界面配置 Cloud Auto-fix
```

---

## 命令参考表

### Slash Commands 总览

| 命令 | 功能 | 场景 | 稳定性 |
|------|------|------|--------|
| `/compact` | 压缩上下文 | 长会话窗口告急 | 稳定 |
| `/init` | 初始化 `CLAUDE.md` | 新项目上手 | 稳定 |
| `/commit` | 智能生成 conventional commit | 提交代码 | 稳定 |
| `/review` | 审查当前 branch/PR | Code Review | 稳定 |
| `/test` | 运行测试并分析失败 | 调试 | 稳定 |
| `/diagnose` | 结构化诊断流程 | 疑难 Bug | 稳定 |
| `/config` | 交互式配置设置 | 调整行为 | 稳定 |
| `/memory` | 查看/管理持久化记忆 | 跨会话记忆 | 稳定 |
| `/schedule` | 创建定时任务 | 自动化 | v2.1.83+ |
| `/resume` | 恢复之前的会话 | 断点续传 | 稳定 |
| `/clear` | 清空当前会话 | 重新开始 | 稳定 |
| `/goal` | 设定跨轮持久目标 | 长期任务 | v2.1.139+ |
| `/ultrareview` | 云端深度代码审查 | PR 审查 | v2.1.114+ |
| `/usage` | 查看 rate limit 消耗 | 配额管理 | v2.1.105+ |

### CLI 命令速查

| 命令 | 功能 |
|------|------|
| `claude agents` | 打开 Agent View 多会话仪表盘 |
| `claude worktree <name>` | 创建/进入隔离工作树 |
| `claude --bg "..."` | 后台运行任务 |
| `claude skill create <name>` | 创建自定义 Skill |
| `claude ultrareview` | CI 中触发云端审查 |
| `claude config set <key> <value>` | 设置配置项 |

### 环境变量

| 变量 | 说明 |
|------|------|
| `CLAUDE_EFFORT` | 当前 effort level（low / medium / high / xhigh） |
| `CLAUDE_TOOL_NAME` | 正在执行的工具名（Hooks 中使用） |
| `CLAUDE_API_KEY` | API Key |

---

## 配置速查模板

### 推荐 settings.json

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

---

## 版本时间线速览

| 时间 | 版本 | 标志性特性 |
|------|------|-----------|
| 2026-05 | v2.1.139-156 | Agent View, `/goal`, Rewind Menu |
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

## Source Material

- `archive/2026-05-30/Claude Code 全功能谱系与工作流手册.md`
