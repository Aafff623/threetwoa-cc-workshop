---
title: "Registry 一致性修复报告"
type: report
status: active
updated: 2026-05-30
owner: threetwoa
---

# 11 — Registry Consistency Fix

> 日期：2026-05-30

## 修复项

### 1. skills-manifest.json

| 字段 | 修复前 | 修复后 |
|------|--------|--------|
| report-to-doc-distiller `status` | `"draft"` | `"active"` |
| report-to-doc-distiller `note` | `"目录已创建，SKILL.md 待编写"` | 已删除 |
| report-to-doc-distiller `coreCapabilities` | `[]` | 5 项蒸馏流水线能力 |

### 2. assets.json

| 字段 | 修复前 | 修复后 |
|------|--------|--------|
| report-to-doc-distiller `path` | `.claude/skills/report-to-doc-distiller/` | `.claude/skills/report-to-doc-distiller/SKILL.md` |
| report-to-doc-distiller `status` | `"draft"` | `"active"` |
| report-to-doc-distiller `note` | `"目录已创建，SKILL.md 待编写"` | 已删除 |
| report-to-doc-distiller `coreCapabilities` | `[]` | 5 项 |
| report-to-doc-distiller `triggers` | 4 项 | 5 项（加 `"整理调研"`） |

### 3. 活文档中 "my-claude" 引用修正

仅修正**活文档**（reorg/、archive/ 保留历史原文不动）：

| 文件 | 修正内容 |
|------|---------|
| `my-claude-repo-manager/SKILL.md` | 描述 "my-claude 仓库" → "threetwoa-cc-workshop 仓库" |
| `tri-layer-workflow.md` | 标题 + 正文 "my-claude" → "threetwoa-cc-workshop" |
| `decision-log.md` | "my-claude 仓库" → "threetwoa-cc-workshop 仓库" |
| `workflow-orchestrator.md` | 路径 `my-claude` → `threetwoa-cc-workshop` |
| `09-continuation-status.md` | scope 字段 |
| `HANDOFF-Round2.md` | 剩余 1 处 "my-claude 项目" |

### 4. 旧状态关键词清除

grep 扫描结果：
- ✅ "待编写" — 仅在 skills-manifest.json 和 assets.json，已修复
- ✅ "Git init 待做" — 无残留
- ✅ "没有绑定" / "no remote" — 无残留
- ✅ "空目录" — 全部指 Windows skill bug 描述，属于历史事实，未改

### 5. 不改动的文件

| 类别 | 原因 |
|------|------|
| `reorg/00~06` | 过程文档，记录历史决策 |
| `archive/` | 生熟分离：只增不改 |
| `my-claude-repo-manager` 技能名/路径 | 重命名会破坏引用，保持不变 |