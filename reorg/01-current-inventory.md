# my-claude 仓库全面盘点报告

> 生成时间：2026-05-30
> 盘点范围：D:\OneDrive\Desktop\my-claude\ 下全部 21 个 Markdown 文件
> 盘点原则：只读不写，不修改任何源文件
> 报告用途：为 reorg/ 系列规划提供事实基线

---

## 1. 当前仓库总览

| 维度 | 数据 |
|------|------|
| **根目录** | `D:\OneDrive\Desktop\my-claude\` |
| **是否为 Git 仓库** | 否（`git status` 报 "not a git repository"） |
| **总文件数** | 21 个 `.md` 文件 |
| **总 Markdown 体积** | ~272 KB（约 8,000+ 行） |
| **顶层目录** | 4 个：`claude-code-best-practice/`、`reorg/`、`reports/`、`reports/ui-workflow/` |
| **空目录** | `claude-code-best-practice/`（存在但无任何文件） |
| **创建时间跨度** | 2026-05-27 至 2026-05-30（仅 3 天） |
| **内容主题** | Claude Code 生态配置、HeroUI Pro 技术资产、UI/UX/Motion 工作流 |

**关键观察**：
- 这是一个**高度聚焦的 Claude Code 技术资产仓库**，不是通用笔记库
- 内容密度极高，几乎每份文档都是深度调研或配置指南
- 文件命名极不统一：有中文名、有数字前缀、有英文 kebab-case、有空格
- `claude-code-best-practice/` 目录存在但为空（用户提及的 11 个文件实际不存在）
- `temp_task.md` 是当前活跃的任务追踪文件，记录了一个未完成的 Workflow

---

## 2. 当前文件树摘要

```
D:\OneDrive\Desktop\my-claude\
├── 02-template-architecture.md                          [22.3 KB]  HeroUI 四大模板架构分析
├── 03-porting-guide-and-pitfalls.md                     [17.9 KB]  HeroUI Pro 移植踩坑指南
├── Claude Code 本机 Skills 全量汇总.md                  [18.7 KB]  67 个 Skill 全量清单
├── Claude Code 画图技能调研报告.md                      [16.7 KB]  6 款图表技能深度对比
├── Claude Code 全功能谱系与工作流手册.md                 [9.2 KB]  Claude Code v0.x-v2.1.156 功能速查
├── Claude-Mem 安装与验证 Handoff.md                     [8.1 KB]  Claude-Mem 安装交接文档
├── Claude-Mem 配置与使用指南.md                         [3.0 KB]  Claude-Mem 使用速查
├── Claude-Mem 验证交接 Prompt.md                        [0.8 KB]  交接 Prompt（给 Agent）
├── Claude个性化风格配置方案.md                          [8.6 KB]  个人风格/颜文字/工程行为配置
├── CodeGraph_GitNexus_grill-me_三工具详解.md            [11.8 KB]  三工具定位、流程、最佳实践
├── heroui-pro-v3-component-reference-and-porting-guide.md [19.2 KB]  55 组件 API + 移植代码
├── temp_task.md                                         [13.6 KB]  当前任务追踪 + Workflow 状态
│
├── claude-code-best-practice/                           [空目录]
│
├── reorg/                                               [规划输出目录]
│   ├── 02-target-architecture.md                        [17.0 KB]  目标架构设计（已生成）
│   ├── 04-ui-workflow-architecture.md                   [30.9 KB]  UI 工作流架构总览（已生成）
│   └── 05-migration-plan.md                             [13.9 KB]  迁移计划（已生成）
│
└── reports/
    └── ui-workflow/
        ├── 01-ui-skill-stack-installation-report.md     [9.0 KB]  UI Skill 安装报告
        ├── 02-ui-skill-deep-research.md                 [13.3 KB]  8 个 Skill 深度分析
        ├── 03-ui-workflow-standard.md                   [9.3 KB]  五阶段工作流标准
        ├── 04-ui-tool-routing-cheatsheet.md             [6.9 KB]  工具路由速查表
        ├── 05-gsap-motion-layer-analysis.md             [11.4 KB]  GSAP 代码模式与反模式
        └── 06-handoff-for-gpt.md                        [6.7 KB]  GPT 交接文档
```

---

## 3. 根目录文档清单

| # | 文件名 | 大小 | 日期 | 核心主题 | 内容类型 |
|---|--------|------|------|----------|----------|
| 1 | `02-template-architecture.md` | 22.3 KB | 2026-05-29 | HeroUI Pro 四大模板（Chat/Dashboard/Email/Finances）架构对比 | 技术调研报告 |
| 2 | `03-porting-guide-and-pitfalls.md` | 17.9 KB | 2026-05-29 | HeroUI Pro v3 移植方案、14 条踩坑记录、生产 checklist | 技术指南 |
| 3 | `Claude Code 本机 Skills 全量汇总.md` | 18.7 KB | 2026-05-27 | 67 个 Skill 分类清单、触发词、MiniMax 实测报告 | 资产清单 |
| 4 | `Claude Code 画图技能调研报告.md` | 16.7 KB | 2026-05-27 | 6 款图表技能（tldraw/drawio/mermaid/excalidraw/baoyu-diagram/baoyu-infographic）详解 | 调研报告 |
| 5 | `Claude Code 全功能谱系与工作流手册.md` | 9.2 KB | 2026-05-29 | Claude Code v2.1.x 功能速查、6 大工作流、配置模板 | 参考手册 |
| 6 | `Claude-Mem 安装与验证 Handoff.md` | 8.1 KB | 2026-05-28 | Claude-Mem 安装步骤、验证流程、已知问题 | 交接文档 |
| 7 | `Claude-Mem 配置与使用指南.md` | 3.0 KB | 2026-05-28 | Worker 状态、Hooks 配置、常用命令 | 配置指南 |
| 8 | `Claude-Mem 验证交接 Prompt.md` | 0.8 KB | 2026-05-28 | 给下一个 Agent 的验证指令 | Prompt 模板 |
| 9 | `Claude个性化风格配置方案.md` | 8.6 KB | 2026-05-27 | 风格定位、颜文字规则、响应节奏、工程行为、工具路由 | 配置方案 |
| 10 | `CodeGraph_GitNexus_grill-me_三工具详解.md` | 11.8 KB | 2026-05-27 | CodeGraph/GitNexus/grill-me 定位、流程、场景化实践 | 工具指南 |
| 11 | `heroui-pro-v3-component-reference-and-porting-guide.md` | 19.2 KB | 2026-05-29 | 55 个 Pro 组件 API、移植代码、选型梯队、踩坑汇总 | 技术参考 |
| 12 | `temp_task.md` | 13.6 KB | 2026-05-30 | 重构任务追踪、Workflow 状态、原始指令存档 | 任务追踪 |

---

## 4. reports 目录清单

| # | 文件名 | 大小 | 日期 | 核心主题 | 内容类型 |
|---|--------|------|------|----------|----------|
| 1 | `reports/ui-workflow/01-ui-skill-stack-installation-report.md` | 9.0 KB | 2026-05-30 | GSAP/Impeccable/frontend-design/bencium 安装结果、Windows 空目录问题 | 安装报告 |
| 2 | `reports/ui-workflow/02-ui-skill-deep-research.md` | 13.3 KB | 2026-05-30 | 8 个 Skill 深度分析、依赖关系图、与现有 Skill 对比 | 深度调研 |
| 3 | `reports/ui-workflow/03-ui-workflow-standard.md` | 9.3 KB | 2026-05-30 | 五阶段 UI 工作流（Setup→Design→Implement→Motion→Review→Present） | 工作流规范 |
| 4 | `reports/ui-workflow/04-ui-tool-routing-cheatsheet.md` | 6.9 KB | 2026-05-30 | "I want to... → Use This Skill" 快速决策表、反模式检测、组合配方 | 速查手册 |
| 5 | `reports/ui-workflow/05-gsap-motion-layer-analysis.md` | 11.4 KB | 2026-05-30 | GSAP 8 子模块详解、性能铁律、反模式、清理清单 | 技术分析 |
| 6 | `reports/ui-workflow/06-handoff-for-gpt.md` | 6.7 KB | 2026-05-30 | 安装结果摘要、GPT 决策项、风险、推荐工作流 | 交接文档 |

---

## 5. 文件分类表

### 5.1 按主题分类

| 主题 | 文件数 | 文件列表 |
|------|--------|----------|
| **HeroUI Pro 技术资产** | 3 | `02-template-architecture.md`、`03-porting-guide-and-pitfalls.md`、`heroui-pro-v3-component-reference-and-porting-guide.md` |
| **Claude Code 功能与生态** | 3 | `Claude Code 全功能谱系与工作流手册.md`、`Claude Code 本机 Skills 全量汇总.md`、`Claude Code 画图技能调研报告.md` |
| **Claude-Mem 配置** | 3 | `Claude-Mem 安装与验证 Handoff.md`、`Claude-Mem 配置与使用指南.md`、`Claude-Mem 验证交接 Prompt.md` |
| **代码分析工具** | 1 | `CodeGraph_GitNexus_grill-me_三工具详解.md` |
| **个性化配置** | 1 | `Claude个性化风格配置方案.md` |
| **UI 工作流报告** | 6 | `reports/ui-workflow/01~06-*.md` |
| **重构规划** | 3 | `reorg/02-target-architecture.md`、`reorg/04-ui-workflow-architecture.md`、`reorg/05-migration-plan.md` |
| **任务追踪** | 1 | `temp_task.md` |

### 5.2 按内容类型分类

| 类型 | 文件数 | 占比 | 说明 |
|------|--------|------|------|
| **技术调研报告** | 8 | 38% | 基于实测的深度技术分析 |
| **配置指南** | 5 | 24% | 安装、配置、使用说明 |
| **工作流规范** | 3 | 14% | 流程定义、标准、协议 |
| **资产清单** | 2 | 10% | Skill 清单、组件清单 |
| **规划文档** | 3 | 14% | 架构设计、迁移计划 |

### 5.3 按价值时效分类

| 时效 | 文件数 | 说明 |
|------|--------|------|
| **长期资产** | 10 | 技术架构、配置方案、工作流标准，可持续维护 |
| **中期参考** | 5 | 踩坑记录、组件 API，随版本更新需维护 |
| **一次性/已过期** | 6 | 安装报告、交接文档、任务追踪，完成使命后可归档 |

---

## 6. 重复和重叠内容

### 6.1 高重叠区域（事实）

| 重叠主题 | 涉及文件 | 重叠程度 | 说明 |
|----------|----------|----------|------|
| **HeroUI Pro 技术栈** | `02-template-architecture.md`、`03-porting-guide-and-pitfalls.md`、`heroui-pro-v3-component-reference-and-porting-guide.md` | **高** | 三份文件都包含 Next.js/React/Tailwind/TypeScript 版本信息、样式引入顺序、`@heroui-pro/react` 版本 |
| **hpsetup 认证流程** | `03-porting-guide-and-pitfalls.md`、`heroui-pro-v3-component-reference-and-porting-guide.md` | **高** | 7 阶段流水线、环境变量设置、真包验证命令几乎一致 |
| **踩坑记录** | `03-porting-guide-and-pitfalls.md`、`heroui-pro-v3-component-reference-and-porting-guide.md` | **中高** | DataGrid 缺 id、Kanban Card 位置、TooltipContent API 等坑在两份文件中重复 |
| **Claude Code 功能** | `Claude Code 全功能谱系与工作流手册.md`、`Claude Code 本机 Skills 全量汇总.md` | **中** | Skills 系统、MCP、Hooks、Memory 等概念在两份文件中都有涉及 |
| **UI Skill 信息** | `Claude Code 本机 Skills 全量汇总.md`、`reports/ui-workflow/02-ui-skill-deep-research.md` | **中** | baoyu-diagram、baoyu-infographic 等技能在两处都有描述 |

### 6.2 建议合并方向（推荐）

| 合并目标 | 来源文件 | 理由 |
|----------|----------|------|
| `docs/heroui-pro/README.md` | `02-template-architecture.md` + `03-porting-guide-and-pitfalls.md` + `heroui-pro-v3-component-reference-and-porting-guide.md` | 三份文件同属 HeroUI Pro 主题，合并为总览 + 分册 |
| `docs/claude-code/skills-reference.md` | `Claude Code 本机 Skills 全量汇总.md` + `Claude Code 画图技能调研报告.md` | 同属 Skill 生态，合并为统一参考 |
| `docs/claude-code/claude-mem/README.md` | `Claude-Mem 安装与验证 Handoff.md` + `Claude-Mem 配置与使用指南.md` + `Claude-Mem 验证交接 Prompt.md` | 同属 Claude-Mem，合并为完整指南 |

---

## 7. 高价值源文档

| 排名 | 文件 | 价值理由 | 建议保留方式 |
|------|------|----------|-------------|
| 1 | `heroui-pro-v3-component-reference-and-porting-guide.md` | 55 个 Pro 组件 API + 移植代码 + 选型梯队，**不可替代的技术资产** | 提炼为 `docs/heroui-pro/` 核心文档 |
| 2 | `03-porting-guide-and-pitfalls.md` | 14 条实测踩坑 + 生产 checklist，**高实践价值** | 提炼为 `docs/heroui-pro/porting-guide.md` |
| 3 | `02-template-architecture.md` | 四大模板完整架构分析，**新项目启动必备参考** | 提炼为 `docs/heroui-pro/template-architecture.md` |
| 4 | `Claude Code 本机 Skills 全量汇总.md` | 67 个 Skill 全量清单 + 触发词，**生态地图** | 提炼为 `docs/claude-code/skills-inventory.md` |
| 5 | `CodeGraph_GitNexus_grill-me_三工具详解.md` | 三工具配合流程 + 场景化最佳实践，**代码分析工作流核心** | 提炼为 `docs/claude-code/codegraph-guide.md` |
| 6 | `reports/ui-workflow/03-ui-workflow-standard.md` | 五阶段工作流 + Handoff 协议，**UI 工作流基石** | 转化为 `templates/workflows/ui-workflow-standard.md` |
| 7 | `reports/ui-workflow/04-ui-tool-routing-cheatsheet.md` | "I want to... → Use This Skill" 快速决策表，**高频查询** | 转化为 `templates/workflows/ui-tool-routing-cheatsheet.md` |
| 8 | `reports/ui-workflow/05-gsap-motion-layer-analysis.md` | GSAP 代码模式 + 反模式 + 清理清单，**动画开发必备** | 转化为 `templates/workflows/gsap-motion-layer-analysis.md` |

---

## 8. 低价值或过期文档

| 文件 | 低价值/过期理由 | 建议处理 |
|------|----------------|----------|
| `reports/ui-workflow/01-ui-skill-stack-installation-report.md` | 一次性安装记录，环境已变化（Windows 空目录问题已知） | **归档**到 `archive/reports/` |
| `reports/ui-workflow/06-handoff-for-gpt.md` | 一次性交接文档，已完成使命 | **归档**到 `archive/reports/` |
| `Claude-Mem 验证交接 Prompt.md` | 纯 Prompt 模板，无持久知识价值 | **归档**或合并到 Claude-Mem 主文档 |
| `temp_task.md` | 临时任务追踪，Workflow 已中断 | **保留**（活跃任务追踪），但非长期资产 |
| `reorg/02-target-architecture.md` | 规划文档，执行后价值降低 | **保留**在 `reorg/`，作为决策记录 |
| `reorg/05-migration-plan.md` | 规划文档，执行后价值降低 | **保留**在 `reorg/`，作为决策记录 |

---

## 9. 风险备注

### 9.1 内容风险

| 风险 | 严重度 | 说明 |
|------|--------|------|
| **HeroUI Pro 版本漂移** | 中 | 文档基于 `@heroui-pro/react@1.0.0-beta.4`，官方可能更新 |
| **Claude Code 版本漂移** | 中 | 功能手册基于 v2.1.156，新版本可能新增/变更功能 |
| **Skill 触发词变更** | 低 | Skill 作者可能更新触发关键词 |
| **Windows 空目录问题未解决** | 中 | `npx skills` 在 Windows 上不复制文件，影响脚本型 Skill |

### 9.2 结构风险

| 风险 | 严重度 | 说明 |
|------|--------|------|
| **文件命名混乱** | 中 | 中文名、数字前缀、空格混用，不利于自动化处理 |
| **无 Git 版本控制** | 中 | 整个仓库不是 Git repo，无法追踪变更历史 |
| **无索引系统** | 低 | 21 个文件靠文件名记忆，未来扩展后难以检索 |
| **reorg/ 规划与执行脱节** | 中 | `temp_task.md` 显示 Workflow 已中断，规划文件可能 stale |

### 9.3 敏感信息扫描

| 文件 | 发现 | 处理建议 |
|------|------|----------|
| `03-porting-guide-and-pitfalls.md` | 提到 `hp_` 开头的 Key 格式，但无实际 Key | 无需处理 |
| `heroui-pro-v3-component-reference-and-porting-guide.md` | 提到 `HEROUI_KEY`、`HEROUI_TOKEN` 环境变量名 | 无需处理 |
| 全部文件 | **未发现实际 API Key、Token、密码** | — |

---

## 10. 每个文件建议迁移目标

| Current Path | Suggested Category | Suggested Target | Reason |
|-------------|-------------------|------------------|--------|
| `02-template-architecture.md` | `docs/heroui-pro/` | `docs/heroui-pro/template-architecture.md` | HeroUI 模板架构分析，属于 HeroUI 专题长期知识 |
| `03-porting-guide-and-pitfalls.md` | `docs/heroui-pro/` | `docs/heroui-pro/porting-guide.md` | 移植指南 + 踩坑，高实践价值，需长期维护 |
| `heroui-pro-v3-component-reference-and-porting-guide.md` | `docs/heroui-pro/` | `docs/heroui-pro/component-reference.md` | 55 组件 API 参考，核心技术资产 |
| `Claude Code 全功能谱系与工作流手册.md` | `docs/claude-code/` | `docs/claude-code/feature-handbook.md` | 功能速查 + 工作流，长期参考 |
| `Claude Code 本机 Skills 全量汇总.md` | `docs/claude-code/` | `docs/claude-code/skills-inventory.md` | Skill 生态地图，需随安装更新 |
| `Claude Code 画图技能调研报告.md` | `docs/claude-code/` | `docs/claude-code/diagram-skills-research.md` | 画图技能对比，长期参考 |
| `CodeGraph_GitNexus_grill-me_三工具详解.md` | `docs/claude-code/` | `docs/claude-code/codegraph-guide.md` | 代码分析工具指南，长期参考 |
| `Claude-Mem 安装与验证 Handoff.md` | `docs/claude-code/claude-mem/` | `docs/claude-code/claude-mem/README.md`（合并） | 与另外两份 Claude-Mem 文档合并为完整指南 |
| `Claude-Mem 配置与使用指南.md` | `docs/claude-code/claude-mem/` | `docs/claude-code/claude-mem/README.md`（合并） | 合并到 Claude-Mem 主文档 |
| `Claude-Mem 验证交接 Prompt.md` | `docs/claude-code/claude-mem/` | `docs/claude-code/claude-mem/README.md`（合并） | 合并到 Claude-Mem 主文档 |
| `Claude个性化风格配置方案.md` | `.claude/` | `.claude/personal-style-config.md` | 个性化配置，属于 Claude Code 运行时配置 |
| `reports/ui-workflow/01-ui-skill-stack-installation-report.md` | `archive/reports/` | `archive/reports/2026-05-30-ui-skill-installation.md` | 一次性安装记录，已过时 |
| `reports/ui-workflow/02-ui-skill-deep-research.md` | `archive/reports/` | `archive/reports/2026-05-30-ui-skill-research.md` | 一次性调研，技能版本已更新 |
| `reports/ui-workflow/03-ui-workflow-standard.md` | `templates/workflows/` | `templates/workflows/ui-workflow-standard.md` | 工作流标准，可复用为模板 |
| `reports/ui-workflow/04-ui-tool-routing-cheatsheet.md` | `templates/workflows/` | `templates/workflows/ui-tool-routing-cheatsheet.md` | 工具路由速查，可复用为模板 |
| `reports/ui-workflow/05-gsap-motion-layer-analysis.md` | `templates/workflows/` | `templates/workflows/gsap-motion-layer-analysis.md` | GSAP 分析，可复用为模板 |
| `reports/ui-workflow/06-handoff-for-gpt.md` | `archive/reports/` | `archive/reports/2026-05-30-handoff-for-gpt.md` | 一次性交接，已完成使命 |
| `temp_task.md` | 保留根目录 | `temp_task.md` | 活跃任务追踪，保留至 Workflow 完成 |
| `reorg/02-target-architecture.md` | 保留 reorg/ | `reorg/02-target-architecture.md` | 规划决策记录，保留 |
| `reorg/04-ui-workflow-architecture.md` | 保留 reorg/ | `reorg/04-ui-workflow-architecture.md` | 规划决策记录，保留 |
| `reorg/05-migration-plan.md` | 保留 reorg/ | `reorg/05-migration-plan.md` | 规划决策记录，保留 |

---

## 附录：统计汇总

| 统计项 | 数值 |
|--------|------|
| Markdown 文件总数 | 21 |
| 根目录文件 | 12 |
| reports/ui-workflow/ 文件 | 6 |
| reorg/ 文件 | 3 |
| 总大小 | ~272 KB |
| 中文命名文件 | 8 |
| 英文命名文件 | 10 |
| 数字前缀命名 | 5 |
| 空目录 | 1（`claude-code-best-practice/`） |
| Git 仓库状态 | 否 |
| 时间跨度 | 3 天（2026-05-27 至 2026-05-30） |

---

*报告完成。所有路径均为绝对路径，所有判断基于文件内容实际读取。*
