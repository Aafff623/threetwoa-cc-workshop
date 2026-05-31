---
title: "Superpowers — 软件工程默认主推进范式"
category: claude-code
last_updated: 2026-05-31
related_reports:
  - reports/raw/2026-05-30-superpowers-methodology.md
---

# Superpowers — 软件工程默认主推进范式

**来源：** https://github.com/obra/superpowers — Jesse Vincent

**定位：** 软件工程任务的默认主推进范式。Claude Code 遇到写代码、改功能、修 bug、重构、多文件修改等工程任务时，默认按 Superpowers pipeline 执行。

**降级/豁免场景（回退到通用范式 `Explore→Plan→Execute→Verify→Summarize`）：**
- 轻量单文件修改
- 纯调研、文档归档、内容整理
- 一次性原型/探索
- 用户明确说"简单改一下"或"不用太复杂"

---

## 7 阶段 Pipeline

```
Brainstorm → Spec → Plan → TDD → Implement → Review → Finalize
```

| 阶段 | SP Skill | 触发时机 | 核心行为 | 产物 |
|---|---|---|---|---|
| 1. **Brainstorm** | `brainstorming` | 工程任务开始前 | 探索上下文 → 逐题澄清 → 2-3 方案 → 分段展示设计 → 用户逐段确认 | `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` |
| 2. **Worktree** | `using-git-worktrees` | 设计获批后 | 独立 worktree + 新 branch + 项目 setup + clean test baseline | 隔离工作区 |
| 3. **Plan** | `writing-plans` | spec 获批后 | bite-sized 任务（2-5 分钟/个），精确文件路径 + 完整代码 + 验证步骤 | `docs/superpowers/plans/YYYY-MM-DD-<feature>.md` |
| 4. **TDD** | `test-driven-development` | 实现阶段 | **铁律：无失败测试不写生产代码**。RED → Verify RED → GREEN → Verify GREEN → REFACTOR | 测试 + 实现 |
| 5. **Implement** | `subagent-driven-development` / `executing-plans` | plan 就绪后 | 每任务 dispatch 独立 subagent + 两阶段审查，或批量执行 + human checkpoint | 代码 |
| 6. **Review** | `requesting-code-review` | 任务间/完成后 | 对照 plan 审查，按严重度报告，critical 阻塞进度 | review notes |
| 7. **Finalize** | `finishing-a-development-branch` | 全部完成 | 验证测试 → merge/PR/keep/discard 选项 → 清理 worktree | 收尾决策 |

**HARD-GATE：** `brainstorming` 阶段禁止未获批设计就写代码。这适用于**所有工程任务**，无论多简单。

---

## Skills 目录

**设计与规划**
- `brainstorming` — 苏格拉底式设计精炼，强制设计先行
- `writing-plans` — 详细实现计划，零占位符（无 TBD/TODO）
- `executing-plans` — 批量执行计划，带 human checkpoint

**工程执行**
- `subagent-driven-development` — 每任务 dispatch 新 subagent + 两阶段 review
- `dispatching-parallel-agents` — 并发 subagent workflow
- `using-git-worktrees` — 隔离开发分支管理

**测试与质量**
- `test-driven-development` — RED-GREEN-REFACTOR，强制先写失败测试
- `systematic-debugging` — 4 阶段根因分析
- `verification-before-completion` — 确认修复真实有效

**协作与收尾**
- `requesting-code-review` — 预审查 checklist，对照 plan 审查
- `receiving-code-review` — 响应反馈
- `finishing-a-development-branch` — merge/PR 决策流程

**元技能**
- `writing-skills` — 按 SP 规范创建新 skill
- `using-superpowers` — 技能系统介绍

---

## 术语映射

| Superpowers 术语 | 本宪法对应 |
|---|---|
| your human partner | 用户 threetwoa |
| coding agent / agent | Claude Code 执行层 |
| code review agent | Codex 审查层 |
| subagent / subagent dev | Claude Code Agent / Workflow 工具 |

---

## 与本宪法的衔接

1. **不确定性停机协议优先**：即使 SP pipeline 中，遇到架构不清、范围膨胀、新增依赖等仍须停下
2. **决策归属不变**：SP 的 "ask your human partner" 即本宪法的 "用户最终决策"
3. **Codex Review 互补**：SP 提供审查 skills 和流程，本宪法提供触发条件和输出格式
4. **冲突裁决**：SP 属于框架默认规则层级，仅在激活时生效（用户指令 > 宪法 > 工程验证 > 项目级配置 > **工具/框架默认规则**）

---

## 核心哲学

| 原则 | SP 表述 |
|---|---|
| TDD 优先 | "NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST" |
| 系统优于即兴 | "Process over guessing" |
| 复杂度削减 | "Simplicity as primary goal" |
| 证据优于声称 | "Verify before declaring success" |
| YAGNI | "You Aren't Gonna Need It" |
| DRY | "Don't Repeat Yourself" |
