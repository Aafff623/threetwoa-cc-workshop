# my-claude 仓库迁移计划

> 角色：Migration Planner
> 交付物：可执行的文件迁移映射
> 约束：不删除任何文件，未经审批不执行

---

## 1. 迁移原则

| # | 原则 | 说明 |
|---|------|------|
| 1 | **不删除** | 所有现有文件保留，原始报告不动 |
| 2 | **先复制后移动** | 精炼文档先复制到新位置，确认后再考虑是否归档原文件 |
| 3 | **来源可追溯** | 每个精炼文档必须包含 `source_files` frontmatter |
| 4 | **配置可执行** | `.claude/` 下只放 Claude Code 能真正读取执行的配置 |
| 5 | **报告原始性** | `reports/` 保留原始调研的"现场感"，不二次编辑 |
| 6 | **分层清晰** | docs（长期知识）/ reports（原始调研）/ .claude（配置）/ templates（可复制模板）/ archive（历史归档） |
| 7 | **命名统一** | 新文件用 kebab-case，中文标题放 frontmatter |
| 8 | **最小可行** | 第一批只建核心骨架，不一次性创建几十个空 agent/command/rule |

---

## 2. 文件移动映射表

### 2.1 根目录 .md 文件（11 个）

| Current Path | Target Path | Action | Reason | Keep Raw Copy? |
|-------------|-------------|--------|--------|----------------|
| `02-template-architecture.md` | `reports/raw/heroui/02-template-architecture.md` | move | 原始 HeroUI 模板调研报告，属于原始调研层 | 是（保留在 reports/raw/） |
| `03-porting-guide-and-pitfalls.md` | `reports/raw/heroui/03-porting-guide-and-pitfalls.md` | move | 原始 HeroUI 移植踩坑报告，属于原始调研层 | 是 |
| `Claude Code 全功能谱系与工作流手册.md` | `docs/claude-code/feature-handbook.md` | distill | 精炼为长期参考文档，添加 frontmatter 和版本追踪 | 是（原始保留在 archive/） |
| `Claude Code 本机 Skills 全量汇总.md` | `docs/claude-code/skills-inventory.md` | distill | 精炼为可维护的技能索引，添加分类和状态追踪 | 是 |
| `Claude Code 画图技能调研报告.md` | `docs/claude-code/diagram-skills-reference.md` | distill | 精炼为六款画图技能的选择指南 | 是 |
| `Claude-Mem 安装与验证 Handoff.md` | `docs/claude-code/claude-mem-setup.md` | distill | 保留核心安装步骤，去除 handoff 语境 | 是 |
| `Claude-Mem 配置与使用指南.md` | `docs/claude-code/claude-mem-usage.md` | distill | 保留配置和命令速查，与 setup 合并或独立 | 是 |
| `Claude-Mem 验证交接 Prompt.md` | `archive/2026-05-30/claude-mem-handoff-prompt.md` | archive | 一次性交接 prompt，无长期价值 | 否 |
| `Claude个性化风格配置方案.md` | `.claude/CLAUDE.md` | copy | 这是全局配置的主体，应同时存在于仓库和 ~/.claude/ | 是（保留原始在 archive/） |
| `CodeGraph_GitNexus_grill-me_三工具详解.md` | `docs/claude-code/codegraph-gitnexus-guide.md` | distill | 精炼为三工具配合工作流指南 | 是 |
| `heroui-pro-v3-component-reference-and-porting-guide.md` | `docs/heroui/component-reference.md` | distill | 精炼为组件速查和移植方案 | 是 |
| `temp_task.md` | `archive/2026-05-30/temp-task-tracking.md` | archive | 临时任务追踪，Workflow 完成后归档 | 否 |

### 2.2 reports/ui-workflow/*.md 文件（6 个）

| Current Path | Target Path | Action | Reason | Keep Raw Copy? |
|-------------|-------------|--------|--------|----------------|
| `reports/ui-workflow/01-ui-skill-stack-installation-report.md` | `reports/raw/ui-workflow/01-ui-skill-stack-installation-report.md` | move | 原始安装报告，保留现场记录 | 是 |
| `reports/ui-workflow/02-ui-skill-deep-research.md` | `reports/raw/ui-workflow/02-ui-skill-deep-research.md` | move | 原始深度调研，保留现场记录 | 是 |
| `reports/ui-workflow/03-ui-workflow-standard.md` | `docs/ui-workflow/workflow-standard.md` | distill | 精炼为长期 UI Workflow 规范 | 是 |
| `reports/ui-workflow/04-ui-tool-routing-cheatsheet.md` | `docs/ui-workflow/tool-routing-cheatsheet.md` | copy | 速查表本身已是精炼格式，直接复制到 docs | 是 |
| `reports/ui-workflow/05-gsap-motion-layer-analysis.md` | `docs/ui-workflow/gsap-motion-guide.md` | distill | 精炼为 GSAP 实施指南 | 是 |
| `reports/ui-workflow/06-handoff-for-gpt.md` | `archive/2026-05-30/ui-workflow-handoff-for-gpt.md` | archive | 一次性 handoff，无长期价值 | 否 |

### 2.3 claude-code-best-practice/ 目录

该目录当前为空（0 个文件），无需迁移操作。

| Current Path | Target Path | Action | Reason | Keep Raw Copy? |
|-------------|-------------|--------|--------|----------------|
| `claude-code-best-practice/` | `archive/claude-code-best-practice/` | keep | 空目录，保留作为历史占位 | — |

---

## 3. 文件重命名映射表

| 当前文件名 | 新文件名 | 理由 |
|-----------|---------|------|
| `02-template-architecture.md` | `template-architecture.md` | kebab-case，中文标题放 frontmatter |
| `03-porting-guide-and-pitfalls.md` | `porting-guide-and-pitfalls.md` | kebab-case |
| `Claude Code 全功能谱系与工作流手册.md` | `feature-handbook.md` | kebab-case |
| `Claude Code 本机 Skills 全量汇总.md` | `skills-inventory.md` | kebab-case |
| `Claude Code 画图技能调研报告.md` | `diagram-skills-reference.md` | kebab-case |
| `Claude-Mem 安装与验证 Handoff.md` | `claude-mem-setup.md` | kebab-case，去除 Handoff 语境 |
| `Claude-Mem 配置与使用指南.md` | `claude-mem-usage.md` | kebab-case |
| `Claude-Mem 验证交接 Prompt.md` | `claude-mem-handoff-prompt.md` | kebab-case |
| `Claude个性化风格配置方案.md` | `CLAUDE.md` | 标准化为 Claude Code 全局配置名 |
| `CodeGraph_GitNexus_grill-me_三工具详解.md` | `codegraph-gitnexus-guide.md` | kebab-case |
| `heroui-pro-v3-component-reference-and-porting-guide.md` | `component-reference.md` | 在 heroui/ 目录下已具名空间 |
| `temp_task.md` | `temp-task-tracking.md` | kebab-case |
| `03-ui-workflow-standard.md` | `workflow-standard.md` | 去除序号，目录结构已排序 |
| `04-ui-tool-routing-cheatsheet.md` | `tool-routing-cheatsheet.md` | 去除序号 |
| `05-gsap-motion-layer-analysis.md` | `gsap-motion-guide.md` | 更简洁 |
| `06-handoff-for-gpt.md` | `ui-workflow-handoff-for-gpt.md` | 添加前缀避免混淆 |

---

## 4. 保留为原始报告的文件

以下文件**只移动不精炼**，保留原始调研的"现场感"：

| 文件路径（移动后） | 保留理由 |
|-------------------|---------|
| `reports/raw/heroui/02-template-architecture.md` | 模板架构原始分析，含完整文件树和对比矩阵 |
| `reports/raw/heroui/03-porting-guide-and-pitfalls.md` | 踩坑记录原始现场，14 个坑的详细上下文 |
| `reports/raw/ui-workflow/01-ui-skill-stack-installation-report.md` | 安装现场记录，含失败项和未验证项 |
| `reports/raw/ui-workflow/02-ui-skill-deep-research.md` | 深度调研原始笔记，含技能依赖图 |

---

## 5. 提炼成长期 docs 的文件

以下文件需要**精炼**（添加 frontmatter、结构化、去除临时语境）后写入 `docs/`：

| 源文件 | 目标路径 | 精炼要点 |
|--------|---------|---------|
| `Claude Code 全功能谱系与工作流手册.md` | `docs/claude-code/feature-handbook.md` | 添加版本时间线 frontmatter，更新为最新版本 |
| `Claude Code 本机 Skills 全量汇总.md` | `docs/claude-code/skills-inventory.md` | 添加分类索引、安装状态追踪、触发词速查 |
| `Claude Code 画图技能调研报告.md` | `docs/claude-code/diagram-skills-reference.md` | 添加选择决策树、平台兼容性矩阵 |
| `Claude-Mem 安装与验证 Handoff.md` + `Claude-Mem 配置与使用指南.md` | `docs/claude-code/claude-mem-guide.md` | 合并为单一指南，去除 handoff 语境，保留验证步骤 |
| `CodeGraph_GitNexus_grill-me_三工具详解.md` | `docs/claude-code/codegraph-gitnexus-guide.md` | 保留场景化最佳实践，添加快速查询表 |
| `heroui-pro-v3-component-reference-and-porting-guide.md` | `docs/heroui/component-reference.md` | 保留组件速查和移植代码，添加版本兼容性 frontmatter |
| `reports/ui-workflow/03-ui-workflow-standard.md` | `docs/ui-workflow/workflow-standard.md` | 保留五阶段工作流，添加决策门和技能触发映射 |
| `reports/ui-workflow/04-ui-tool-routing-cheatsheet.md` | `docs/ui-workflow/tool-routing-cheatsheet.md` | 已是精炼格式，直接复制，添加更新日期 frontmatter |
| `reports/ui-workflow/05-gsap-motion-layer-analysis.md` | `docs/ui-workflow/gsap-motion-guide.md` | 保留实现模式和反模式，添加 Claude Code 专用 checklist |

**精炼文档 frontmatter 模板**：
```yaml
---
title: "中文标题"
type: principle | workflow | reference | report | template | registry | handoff | decision
status: active | draft | archived
source_files:
  - path/to/source.md
updated: YYYY-MM-DD
owner: threetwoa
---
```

---

## 6. 归档文件

以下文件**无长期价值**，移动到 `archive/2026-05-30/`：

| 文件 | 归档理由 |
|------|---------|
| `Claude-Mem 验证交接 Prompt.md` | 一次性交接 prompt，验证完成后无复用价值 |
| `reports/ui-workflow/06-handoff-for-gpt.md` | 一次性 handoff，GPT 已接收 |
| `temp_task.md` | 临时任务追踪，Workflow 完成后失效 |

---

## 7. 转化成 .claude 配置的文件

| 源文件 | 目标路径 | 配置类型 | 说明 |
|--------|---------|---------|------|
| `Claude个性化风格配置方案.md` | `.claude/CLAUDE.md` | 全局指令 | 个性化风格配置，作为 Claude Code 全局上下文 |
| — | `.claude/settings.example.json` | 示例配置 | 新建，含环境变量、MCP、hooks 模板 |
| — | `.claude/README.md` | 配置说明 | 新建，说明 .claude/ 目录结构和加载机制 |

**注意**：`.claude/CLAUDE.md` 与 `docs/` 下的精炼版本是**同内容双位置**——`.claude/` 供 Claude Code 读取，`docs/` 供人类阅读和版本管理。

---

## 8. 转化成 templates 的文件

| 源内容 | 目标路径 | 模板类型 | 说明 |
|--------|---------|---------|------|
| HeroUI 模板架构分析 | `templates/heroui-dashboard-starter/` | 项目模板 | 从 `02-template-architecture.md` 提取的 Dashboard 模板骨架 |
| HeroUI 移植 checklist | `templates/heroui-porting-checklist.md` | 检查清单 | 从 `03-porting-guide-and-pitfalls.md` 提取的生产接入 checklist |
| UI Workflow 五阶段 | `templates/ui-workflow/project-DESIGN.md` | 设计系统模板 | 从 `03-ui-workflow-standard.md` 提取的 DESIGN.md 模板 |
| GSAP 实现 checklist | `templates/ui-workflow/gsap-checklist.md` | 检查清单 | 从 `05-gsap-motion-layer-analysis.md` 提取 |

---

## 9. 风险

| # | 风险 | 严重度 | 缓解措施 |
|---|------|--------|---------|
| 1 | ⚠️ `Claude个性化风格配置方案.md` 同时存在于 `.claude/CLAUDE.md` 和 `docs/`，可能版本漂移 | 中 | 在 `.claude/README.md` 中声明"以 .claude/CLAUDE.md 为准"，docs 版本仅作备份 |
| 2 | ⚠️ 精炼过程可能丢失原始报告的"现场感"（如安装失败的上下文） | 低 | 原始报告保留在 `reports/raw/`，精炼文档必须标注 `source_files` |
| 3 | ⚠️ `claude-code-best-practice/` 目录为空，用户可能期望其中有内容 | 低 | 在迁移执行时检查是否为空，如仍为空则删除或添加占位说明 |
| 4 | ⚠️ 文件移动后，如果其他文档引用了旧路径，链接会断裂 | 中 | 执行阶段扫描所有 .md 文件中的相对链接，批量更新 |
| 5 | ⚠️ `temp_task.md` 被归档后，如果 Workflow 未真正完成，可能丢失上下文 | 中 | 归档前确认 Workflow 状态，在 `archive/` 中添加 README 说明归档时间 |
| 6 | 精炼文档的 frontmatter 格式需要统一，否则索引系统无法解析 | 低 | 使用统一的 frontmatter 模板，执行时验证 |
| 7 | `.claude/` 配置可能被 Claude Code 误读为项目级配置（而非全局） | 低 | 在 `.claude/README.md` 中明确说明这是"仓库级配置参考"，全局配置仍放 `~/.claude/` |

---

## 10. 执行前审批清单

执行迁移前，请确认以下事项：

- [ ] **文件映射审核**：上表中的每个文件的目标路径是否准确？
- [ ] **归档确认**：`archive/2026-05-30/` 中的文件确实可以归档？
- [ ] **精炼范围**：需要精炼的 9 个文档是否都需要精炼，还是有可以直接复制的？
- [ ] **.claude/ 配置**：`CLAUDE.md` 双位置策略是否可接受？
- [ ] **templates/ 范围**：4 个模板是否足够，还是需要更多？
- [ ] **命名规范**：kebab-case 命名是否统一？
- [ ] **链接修复**：执行阶段是否需要扫描并修复相对链接？
- [ ] **空目录处理**：`claude-code-best-practice/` 空目录如何处理？
- [ ] **安全约束**：确认不删除任何文件，不写入 secrets |

---

## 附录：迁移后目录结构预览

```
D:/OneDrive/Desktop/my-claude/
├── .claude/
│   ├── CLAUDE.md              ← 个性化风格配置（copy from 根目录）
│   ├── README.md              ← 配置说明（新建）
│   └── settings.example.json  ← 示例配置（新建）
├── docs/
│   ├── INDEX.md               ← 文档索引（新建）
│   ├── claude-code/
│   │   ├── feature-handbook.md
│   │   ├── skills-inventory.md
│   │   ├── diagram-skills-reference.md
│   │   ├── claude-mem-guide.md
│   │   └── codegraph-gitnexus-guide.md
│   ├── heroui/
│   │   └── component-reference.md
│   └── ui-workflow/
│       ├── workflow-standard.md
│       ├── tool-routing-cheatsheet.md
│       └── gsap-motion-guide.md
├── reports/
│   └── raw/
│       ├── heroui/
│       │   ├── 02-template-architecture.md
│       │   └── 03-porting-guide-and-pitfalls.md
│       └── ui-workflow/
│           ├── 01-ui-skill-stack-installation-report.md
│           └── 02-ui-skill-deep-research.md
├── templates/
│   ├── heroui-dashboard-starter/
│   ├── heroui-porting-checklist.md
│   └── ui-workflow/
│       ├── project-DESIGN.md
│       └── gsap-checklist.md
├── archive/
│   └── 2026-05-30/
│       ├── claude-mem-handoff-prompt.md
│       ├── ui-workflow-handoff-for-gpt.md
│       └── temp-task-tracking.md
├── reorg/
│   ├── 00-executive-summary.md      ← 综合摘要（待生成）
│   ├── 01-current-inventory.md      ← 仓库盘点（待生成）
│   ├── 02-target-architecture.md    ← 目标架构（待生成）
│   ├── 03-claude-ecosystem-plan.md  ← 生态设计（待生成）
│   ├── 04-ui-workflow-architecture.md ← UI 工作流（待生成）
│   ├── 05-migration-plan.md         ← 本文件
│   ├── 06-execution-log.md          ← 执行日志（待生成）
│   └── 07-verification-report.md    ← 验证报告（待生成）
├── README.md                      ← 仓库门面（新建/更新）
└── 00-START-HERE.md               ← 快速入门（新建）
```

---

*本计划由 Migration Planner 生成，未经审批不得执行。*
