---
title: "Matt Pocock Skills — 外部工程判断工具箱"
category: claude-code
last_updated: 2026-05-31
related_reports:
  - reports/raw/2026-05-30-matt-pocock-skills-inventory.md
---

# Matt Pocock Skills — 外部工程判断工具箱

**来源：** https://github.com/mattpocock/skills（或同等 skill 源）

**定位：** 不是主流程推进器，而是判断、澄清、诊断、架构判断的工具箱。在需求不清、架构腐化、debug、陌生代码、需要固化讨论或交接时调用。

**本地可用性：** 以实际安装结果为准。如果某个 skill 未安装或不可用，Claude Code 应告知用户并建议替代方案。

---

## Skills 清单

### `/grill-me`
- **用途：** 需求不清时，通过苏格拉底式提问把模糊想法变成明确 spec
- **触发：** 用户说"我想做个东西"但描述模糊；用户给了方向但缺少约束和成功标准
- **输出：** 澄清后的需求、2-3 个可选方案、推荐方案及理由

### `/grill-with-docs`
- **用途：** 在有项目文档（CONTEXT.md、ADR、领域模型）时，让讨论对齐已有决策
- **触发：** 项目已有文档但新需求可能与旧决策冲突；需要验证新方案是否符合已有架构
- **输出：** 对齐后的方案、需要更新的文档清单、冲突点

### `/tdd`
- **用途：** 按 red-green-refactor 流程写代码
- **触发：** 用户明确说用 TDD；需要高置信度的代码变更
- **与 SP TDD 的关系：** 两者等价，SP 的 `test-driven-development` skill 和 Matt 的 `/tdd` 指向同一套实践

### `/diagnose`
- **用途：** 系统化的 bug 诊断流程
- **触发：** 有 bug 但根因不明；性能回归；偶发失败
- **流程：** 复现 → 最小化 → 假设 → 验证 → 修复 → 回归测试
- **与 SP 的关系：** SP 的 `systematic-debugging` 和 Matt 的 `/diagnose` 等价

### `/zoom-out`
- **用途：** 先看系统上下文，再看局部代码
- **触发：** 进入陌生代码区域；修改前需要理解整体架构；code review 前需要全局视角
- **输出：** 系统上下文摘要、关键依赖关系、修改影响范围评估

### `/improve-codebase-architecture`
- **用途：** 发现架构深化机会，让代码更可测试、更可导航
- **触发：** 代码库出现腐化迹象；AI agent 难以理解；模块边界模糊
- **输出：** 发现的 seams、边界建议、testability 改进点、重构优先级

### `/to-prd`
- **用途：** 将当前对话上下文转成 PRD
- **触发：** 讨论已充分，需要固化成可执行的 PRD 文档
- **输出：** `docs/prd/YYYY-MM-DD-<topic>-prd.md`

### `/to-issues`
- **用途：** 将 plan/spec 拆成独立可 grab 的 issues
- **触发：** plan 已就绪，需要拆成可分配的 tickets
- **输出：** tracer-bullet vertical slices，每个 issue 可独立实现

### `/triage`
- **用途：** issue 状态机管理
- **触发：** 新 issue 到来需要判断；已有 issue 需要更新状态
- **输出：** ready / needs-info / wontfix / blocked 等状态判断

### `/handoff`
- **用途：** 生成 session handoff 材料
- **触发：** 会话结束需要交接；换 agent 继续；需要中断后恢复
- **输出：** handoff 文档，包含当前状态、已完成、阻塞点、下一步

---

## 与 Superpowers 的插入关系

```
Superpowers pipeline:
  Brainstorm → Spec → Plan → TDD → Implement → Review → Finalize
                ↑       ↑      ↑       ↑
              /grill-me /to-issues /tdd /requesting-code-review
              /grill-with-docs     /diagnose
                                   /zoom-out
                                   /improve-codebase-architecture

Matt Skills 不是替代 Superpowers 的阶段，而是可以在 SP 各阶段中按需插入的工具：
- Brainstorm 阶段卡住 → 插入 /grill-me 或 /grill-with-docs
- Plan 阶段需要拆任务 → 插入 /to-issues
- TDD/Implement 阶段遇到 bug → 插入 /diagnose
- 进入陌生代码 → 插入 /zoom-out
- 发现架构问题 → 插入 /improve-codebase-architecture
- 讨论要固化 → 插入 /to-prd
- 换会话 → 插入 /handoff
```

---

## 何时不用 Matt Skills

- 用户已给出明确 spec，不需要澄清 → 直接用 Superpowers pipeline
- 代码变更简单直观 → 不需要 /zoom-out 或 /diagnose
- 架构清晰、无腐化迹象 → 不需要 /improve-codebase-architecture
- 不是 bug 是功能开发 → 不需要 /diagnose
