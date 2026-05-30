---
title: "决策记录"
type: registry
status: active
updated: 2026-05-30
owner: threetwoa
---

# 决策记录

## 2026-05-30: 仓库重组

### 决策 1: 仓库定位

**问题**: threetwoa-cc-workshop 仓库内容有价值但结构分散，如何长期维护？

**决策**: 将其重构成 **AI Workflow Operating System** — Claude 生态资产仓库。

**依据**: 5 份重组规划报告的综合分析。

**影响**: 创建 docs/、.claude/、templates/、registry/、archive/ 五大区域。

### 决策 2: 生熟分离

**问题**: 原始调研和精炼知识混放，难以维护。

**决策**: `reports/raw/` 保留原始现场感，`docs/` 存放经过验证的精炼知识。

**依据**: 原始报告的价值在于"现场感"，不应二次编辑；精炼知识需要结构化。

### 决策 3: .claude/ 配置策略

**问题**: `CLAUDE.md` 应该放在哪里？

**决策**: 双位置策略 — `.claude/CLAUDE.md`（供 Claude Code 读取）+ `docs/` 备份（供人类阅读和版本管理）。

**风险**: 版本漂移。缓解：在 `.claude/README.md` 中声明"以 .claude/CLAUDE.md 为准"。

### 决策 4: 最小可行生态

**问题**: 应该创建多少 agents/commands/rules？

**决策**: 第一批只创建核心骨架（2 agents + 3 commands + 3 rules），不一次性创建几十个。

**依据**: 过度工程化是最大风险，优先建立稳定、可维护、可扩展的小核心。

### 决策 5: 归档策略

**问题**: 哪些文件应该归档？

**决策**: 一次性 handoff、临时追踪、无长期价值的文件归档到 `archive/YYYY-MM-DD/`。

**归档文件**:
- `Claude-Mem 验证交接 Prompt.md`
- `reports/ui-workflow/06-handoff-for-gpt.md`
- `temp_task.md`
