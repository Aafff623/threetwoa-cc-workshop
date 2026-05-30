---
title: "GitHub Review Fix 报告"
type: report
status: active
updated: 2026-05-30
owner: threetwoa
---

# 10 — GitHub Review Fix Report

> 日期：2026-05-30
> 执行者：opencode (glm-5.1)

---

## 修复清单

### ✅ 1. README clone URL

| 项 | 修复前 | 修复后 |
|----|--------|--------|
| `README.md` clone URL | `https://github.com/threetwoa/threetwoa-cc-workshop.git` | `https://github.com/Aafff623/threetwoa-cc-workshop.git` |

### ✅ 2. 3 个空 UI Workflow 文档填充

| 文件 | 修复前 | 修复后 |
|------|--------|--------|
| `workflow-standard.md` | 20 行空壳 | 399 行完整内容（17 个章节） |
| `tool-routing-cheatsheet.md` | 20 行空壳 | 188 行完整内容（10 个章节） |
| `gsap-motion-guide.md` | 20 行空壳 | 525 行完整内容（15 个章节） |

所有内容均从 `archive/2026-05-30/` 对应源文件蒸馏而来，保留 frontmatter 和 Source Material 章节。

### ✅ 3. SKILL.md YAML frontmatter

| 文件 | 修复前 | 修复后 |
|------|--------|--------|
| `my-claude-repo-manager/SKILL.md` | 无 YAML frontmatter | 添加 `name`, `description`, `allowed-tools`, `user-invocable` |
| `report-to-doc-distiller/SKILL.md` | 无 YAML frontmatter | 添加 `name`, `description`, `allowed-tools`, `user-invocable` |

### ✅ 4. Registry 一致性修复

| 文件 | 修复内容 |
|------|---------|
| `skill-registry.md` | "my-claude" → "threetwoa-cc-workshop" |
| `workflow-registry.md` | "my-claude" → "threetwoa-cc-workshop" |
| `asset-index.md` | source_files 路径从 `reports/ui-workflow/` 修正为 `archive/2026-05-30/` |
| `asset-index.md` | 添加 4 个 ui-workflow 文档条目 |
| `index.json` | "my-claude" → "threetwoa-cc-workshop" |
| `index.json` | sourceFiles 路径修正为完整 `archive/2026-05-30/` 路径 |
| `index.json` | 添加 `report-to-doc-distiller/SKILL.md` 条目 |

### ✅ 5. 过时状态修复

| 文件 | 修复内容 |
|------|---------|
| `HANDOFF-Round2.md` | 仓库路径 `my-claude` → `threetwoa-cc-workshop` |
| `HANDOFF-Round2.md` | Git 状态"无 remote" → 已绑定 GitHub remote |
| `HANDOFF-Round2.md` | 删除过时提交记录，更新为远程已推送 |
| `HANDOFF-Round2.md` | 目录树中 `my-claude/` → `threetwoa-cc-workshop/` |
| `HANDOFF-Round2.md` | 关键决策表：Git 行从"本地无 remote"更新 |

### ✅ 6. INDEX.md 表格修复

| 修复 | 说明 |
|------|------|
| 缺 `status` 列 | 3 个 claude-code 文档行补上了 `active` 状态 |
| "(待更新)" 删除 | `07-verification-report` 描述去掉了过时标记 |
| 模板索引补全 | 添加 `project-CLAUDE.md`, `project-PRODUCT.md`, `porting-checklist.md`, `dashboard-starter/` |

---

## 未修改的文件

以下文件**刻意未修改**（遵循约束）：

| 文件 | 原因 |
|------|------|
| `.claude/CLAUDE.md` | 人格配置不弱化 |
| `.claude/settings.example.json` | 权限配置不收敛 |
| 的所有 `reports/raw/` 文件 | 生熟分离原则 |

---

## 建议提交消息

```
fix: GitHub review — fill empty docs, fix URLs, normalize registries

- Fill workflow-standard.md (20→399 lines) from source-03
- Fill tool-routing-cheatsheet.md (20→188 lines) from source-04
- Fill gsap-motion-guide.md (20→525 lines) from source-05
- Fix README clone URL (threetwoa→Aafff623)
- Add YAML frontmatter to both SKILL.md files
- Sync registry: skill-registry, workflow-registry, asset-index, index.json
- Fix HANDOFF-Round2.md stale status (my-claude→threetwoa-cc-workshop, remote bound)
- Fix INDEX.md missing status column and add template entries
```