---
title: "Docs 知识库说明"
category: claude-code
last_updated: 2026-05-31
related_reports:
  - reports/raw/2026-05-30-claude-v4-operating-contract.md
---

# Docs — Claude Code 方法论与路由知识库

## 定位

- `.claude/CLAUDE.md` 是**启动内核**，只保留 P0/P1 硬规则和路由索引。
- `docs/` 是**详细说明和模板**，承载具体方法论、路由规则、可复制模板。
- 不要把所有东西塞回 `CLAUDE.md`。

## 目录结构

```
docs/
├── README.md                          # 本文件
├── methodology/                       # 方法论详细说明
│   ├── superpowers.md                 # Superpowers 默认主推进范式
│   └── matt-pocock-skills.md          # Matt Pocock Skills 外部工具箱
├── routing/                           # 路由规则
│   ├── command-routing.md             # 完整命令路由表
│   ├── file-routing-standard.md       # 文件落点规范
│   ├── tool-routing.md                # 工具路由详情
│   └── ui-workflow-routing.md         # UI 工序路由详情
├── templates/                         # 可复制模板
│   ├── decision-needed-report.md      # 停机报告
│   ├── gpt-decision-material.md       # GPT 决策材料
│   ├── codex-review-material.md       # Codex 审查材料
│   ├── handoff-report.md              # 交接报告
│   ├── prd.md                         # PRD
│   └── design.md                      # 设计文档
├── environment/                       # 环境规则
│   └── windows-wsl2.md                # Windows / WSL2 详细规则
├── style/                             # 语言风格
│   └── style-layer.md                 # 语言风格与颜文字池
└── INDEX.md                           # 文档索引
```

## 使用方式

- 需要了解某个方法论细节 → 读 `methodology/`
- 需要查命令或工具 → 读 `routing/`
- 需要写报告 → 复制 `templates/` 中的模板
- 遇到环境/编码问题 → 读 `environment/`
- 需要风格参考 → 读 `style/`
