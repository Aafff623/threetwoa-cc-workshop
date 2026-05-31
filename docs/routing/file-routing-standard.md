---
title: "File Routing Standard — 文件落点规范"
category: claude-code
last_updated: 2026-05-31
---

# File Routing Standard

## 目标

所有 AI 产物（报告、PRD、plan、review、handoff）有统一落点，方便用户拖入 GPT 讨论层，也方便跨项目查找。

---

## 全局文件落点

```
~/.claude/
├── CLAUDE.md                              # 启动内核
└── Docs/
    ├── README.md                          # Docs 知识库说明
    ├── methodology/                       # 方法论
    │   ├── superpowers.md
    │   └── matt-pocock-skills.md
    ├── routing/                           # 路由规则
    │   ├── command-routing.md
    │   ├── file-routing-standard.md       # 本文件
    │   ├── tool-routing.md
    │   └── ui-workflow-routing.md
    ├── templates/                         # 可复制模板
    │   ├── decision-needed-report.md
    │   ├── gpt-decision-material.md
    │   ├── codex-review-material.md
    │   ├── handoff-report.md
    │   ├── prd.md
    │   └── design.md
    ├── environment/
    │   └── windows-wsl2.md
    ├── style/
    │   └── style-layer.md
    └── reports/                           # Claude Code 自己的停机报告、状态报告
        └── YYYY-MM-DD-HHMM-decision-needed-<topic>.md
```

---

## 项目级文件落点（建议统一）

新项目或二手项目改造时，建议统一结构。项目已有 `docs/` 时遵循已有结构，无 `docs/` 时建议创建。

```
project-root/
├── docs/
│   ├── reports/         # 停机报告、状态报告、调研报告
│   │   └── YYYY-MM-DD-HHMM-decision-needed-<topic>.md
│   ├── prd/             # PRD、需求固化
│   │   └── YYYY-MM-DD-<topic>-prd.md
│   ├── design/          # DESIGN.md、视觉规范、架构设计
│   │   └── YYYY-MM-DD-<topic>-design.md
│   ├── plans/           # implementation plan、Superpowers plan
│   │   └── YYYY-MM-DD-<feature>-plan.md
│   ├── review/          # Codex review material
│   │   └── YYYY-MM-DD-<topic>-review.md
│   ├── handoff/         # session handoff
│   │   └── YYYY-MM-DD-<topic>-handoff.md
│   └── methodology/     # 项目级方法论说明
│
├── .claude/
│   └── CLAUDE.md        # 项目级协作规范（覆盖全局）
│
└── ...
```

---

## 落点规则

| 产物类型 | 全局路径 | 项目级路径 | 命名格式 |
|---|---|---|---|
| Decision Needed 停机报告 | `~/.claude/Docs/reports/` | `docs/reports/` | `YYYY-MM-DD-HHMM-decision-needed-<topic>.md` |
| 状态/调研报告 | `~/.claude/Docs/reports/` | `docs/reports/` | `YYYY-MM-DD-HHMM-<topic>-report.md` |
| PRD | — | `docs/prd/` | `YYYY-MM-DD-<topic>-prd.md` |
| Design Doc | — | `docs/design/` | `YYYY-MM-DD-<topic>-design.md` |
| Implementation Plan | — | `docs/plans/` | `YYYY-MM-DD-<feature>-plan.md` |
| Codex Review Material | — | `docs/review/` | `YYYY-MM-DD-<topic>-review.md` |
| Handoff | — | `docs/handoff/` | `YYYY-MM-DD-<topic>-handoff.md` |

**规则：**
- 全局 `~/.claude/Docs/reports/` 只放 Claude Code 自己的停机报告和状态报告
- 项目级 `docs/reports/` 放与该项目相关的所有报告
- 项目已有文档结构时，优先遵循已有结构，不建议强行迁移
- 不确定路径时先提议，等用户确认

---

## Superpowers 默认落点

Superpowers pipeline 的产物：

| 阶段 | 产物 | 默认路径 |
|---|---|---|
| Brainstorm | Design Doc | `docs/superpowers/specs/YYYY-MM-DD-<topic>-design.md` |
| Plan | Implementation Plan | `docs/superpowers/plans/YYYY-MM-DD-<feature>.md` |

用户偏好可覆盖此默认。
