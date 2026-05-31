---
title: "执行 Checklist — 资产库补全与链路完善"
type: task-tracker
status: active
updated: 2026-05-31
owner: threetwoa
session: Round-3
---

# 执行 Checklist — 资产库补全与链路完善

> 本文件由当前 Session 创建，用于跟踪 Round 3 的全部执行项。
> 每完成一个 Phase，更新对应条目并同步到 HANDOFF-Current.md。

---

## 🔴 P0 — 资产覆盖率缺口（核心债务）

### 1. Skills 资产补齐 ✅
- [x] 盘点当前 80+ Skills：分类为内置 Skills、外部安装 Skills、MCP 派生 Skills（共 137+，8 个分类）
- [x] 更新 `docs/claude-code/skills-inventory.md`：从 21 行骨架扩展为分类清单
- [x] 更新 `registry/manifests/skills-manifest.json`：从 7 条扩展到 87 条

### 2. Feature Handbook 填充 ✅
- [x] 读取 `archive/2026-05-30/Claude Code 全功能谱系与工作流手册.md`（355 行原始素材）
- [x] 提炼并写入 `docs/claude-code/feature-handbook.md`：460 行，覆盖 10 个功能类别

### 3. MCP 服务器独立文档 ✅
- [x] 新建 `docs/claude-code/mcp-servers-guide.md`
- [x] 为 11 个 MCP 各写一段：核心用途 + 核心场景 + 触发条件
  - [x] codegraph
  - [x] context7
  - [x] heroui-pro
  - [x] filesystem
  - [x] memory
  - [x] grep
  - [x] sequential-thinking
  - [x] BraveSearch
  - [x] MiniMax (vision)
  - [x] Firecrawl
  - [x] linear

---

## 🟡 P1 — UI Workflow 链路补齐

### 4. L0 Mkdirs（业务底盘）✅
- [x] 新建 `docs/ui-workflow/mkdirs-business-layer.md`（226 行）

### 5. L1 MotionSites（灵感层）✅
- [x] 新建 `docs/ui-workflow/motionsites-inspiration-layer.md`（322 行）

### 6. L2 Taste（判断层）✅
- [x] 新建 `docs/ui-workflow/taste-judgment-layer.md`（240 行）

### 7. L3 Aceternity（动效层）✅
- [x] 新建 `docs/ui-workflow/aceternity-motion-layer.md`（273 行）

### 8. 交叉引用修复 ✅
- [x] `workflow-standard.md` 中 Stage 1/2 添加指向对应层文档的链接（7 个链接）
- [x] `.claude/CLAUDE.md` 中 L0→L6 链路添加各层文档链接（L0-L4）
- [x] 各层新文档上下游链路互相指向正确

---

## 🟢 P2 — Registry 索引同步

### 9. index.json 补录 ✅
- [x] 补录 Batch 1 新建/更新的 8 个文件条目
- [x] 条目总数：67 → 75

### 10. docs/INDEX.md 同步 ✅
- [x] 新增 Research 分类索引
- [x] UI Workflow 链路新增 4 个条目
- [x] Claude Code 分类追加 mcp-servers-guide

---

## 🟢 P3 — 质量加固 ✅

### 11. 原始素材归档确认 ✅
- [x] 确认 `archive/2026-05-30/` 中 Feature Handbook 原始素材完整
- [x] 确认 Skills Inventory 原始素材完整
- [x] 确认提炼后的 docs/ 版本正确引用 Source Material

### 12. 剩余原始素材提炼 ✅
- [x] 读取 `archive/2026-05-30/Claude Code 画图技能调研报告.md`（402 行）
- [x] 提炼并填充 `docs/claude-code/diagram-skills-reference.md`
- [x] 读取 `archive/2026-05-30/CodeGraph_GitNexus_grill-me_三工具详解.md`（298 行）
- [x] 提炼并填充 `docs/claude-code/codegraph-gitnexus-guide.md`

---

## 执行顺序

```
Phase 1: P0 核心债务
  ├── Step 1: 读取 archive 原始素材
  ├── Step 2: 填充 feature-handbook.md
  ├── Step 3: 填充 skills-inventory.md
  └── Step 4: 新建 mcp-servers-guide.md

Phase 2: P1 UI Workflow 链路
  ├── Step 5: 并行新建 4 篇层文档
  └── Step 6: 交叉引用修复

Phase 3: P2 Registry 同步
  ├── Step 7: 更新 index.json
  └── Step 8: 更新 docs/INDEX.md
```

---

*Created: 2026-05-31 | Session: Round 3*
