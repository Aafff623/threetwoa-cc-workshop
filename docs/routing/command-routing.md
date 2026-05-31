---
title: "Command Routing — 完整命令路由表"
category: claude-code
last_updated: 2026-05-31
---

# Command Routing — 完整版

## 核心原则

- **Superpowers** 是软件工程任务的默认主推进范式
- **Matt Pocock Skills** 是判断/澄清/诊断/架构工具箱，按需插入
- 命令选择基于"当前状态"而非"用户说了什么"

---

## 场景路由表

### 需求澄清阶段

| 当前状态 | 命令 | 说明 |
|---|---|---|
| 想法不清，需求模糊 | `/grill-me` | 苏格拉底式提问，把模糊想法变成明确 spec |
| 有项目文档/历史决策 | `/grill-with-docs` | 对齐领域语言、CONTEXT.md、ADR |
| 讨论已充分，要固化 | `/to-prd` | 生成 PRD 到 `docs/prd/` |

### 设计阶段

| 当前状态 | 命令 | 说明 |
|---|---|---|
| 准备开始工程任务 | `brainstorming` | **HARD-GATE**：先设计，不写代码；所有工程任务都必须经过 |
| 设计已确认，要写 plan | `writing-plans` | bite-sized 任务，2-5 分钟/个，零占位符 |
| plan 已就绪，要拆任务 | `/to-issues` | 拆成 tracer-bullet vertical slices |
| issue 需要判断状态 | `/triage` | ready / needs-info / wontfix / blocked |

### 工程执行阶段

| 当前状态 | 命令 | 说明 |
|---|---|---|
| 需要隔离开发 | `using-git-worktrees` | 新 worktree + branch，干净基线 |
| 执行 plan（有 subagent） | `subagent-driven-development` | 每任务 dispatch 新 subagent + 两阶段 review |
| 执行 plan（无 subagent） | `executing-plans` | 批量执行 + human checkpoint |
| 需要测试保障 | `test-driven-development` / `/tdd` | red-green-refactor，铁律：无失败测试不写代码 |
| 进入陌生代码区域 | `/zoom-out` | 先看系统上下文，再看局部 |
| 发现架构腐化 | `/improve-codebase-architecture` | 找边界、seams、testability 改进点 |

### Debug 阶段

| 当前状态 | 命令 | 说明 |
|---|---|---|
| bug / 性能问题 | `/diagnose` / `systematic-debugging` | 复现 → 最小化 → 假设 → 验证 → 修复 → 回归 |
| 修复后验证 | `verification-before-completion` | 确认修复真实有效，不是表面修复 |

### 审查与收尾阶段

| 当前状态 | 命令 | 说明 |
|---|---|---|
| 完成实现，需要审查 | `requesting-code-review` + Codex | 准备 review material，对照 plan 审查 |
| 收到 review 反馈 | `receiving-code-review` | 响应反馈，处理 critical/blocking |
| 任务全部完成 | `finishing-a-development-branch` | merge / PR / keep / discard 选项 |
| 换会话/交接 | `/handoff` | 生成 handoff 材料 |

---

## 快速决策流程

```
用户提出需求
    ↓
需求是否清晰？
    ├─ 否 → /grill-me 或 /grill-with-docs
    └─ 是 → 是否工程任务（写代码/改功能/修bug/重构）？
            ├─ 否 → 通用范式 Explore→Plan→Execute→Verify→Summarize
            └─ 是 → brainstorming（HARD-GATE）
                    ↓
                设计获批？
                    ├─ 否 → 继续 brainstorm
                    └─ 是 → writing-plans
                            ↓
                        执行 plan
                            ↓
                        遇到 bug？ → /diagnose
                        陌生代码？ → /zoom-out
                        架构问题？ → /improve-codebase-architecture
                            ↓
                        requesting-code-review + Codex
                            ↓
                        finishing-a-development-branch
```

---

## 降级规则

以下场景**不**走完整 Superpowers pipeline，回退到通用范式：

- 轻量单文件修改（如改个配置、修个 typo）
- 纯调研/报告/文档整理（如 motionsites-new-all 的内容维护）
- 一次性原型/探索
- 用户明确说"简单改一下"或"不用设计"
