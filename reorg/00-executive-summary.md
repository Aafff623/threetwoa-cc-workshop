# my-claude 仓库重组执行摘要

> 来源：5 份重组规划报告的综合提炼
> 生成时间：2026-05-30

---

## 1. 这个仓库最终要变成什么

**AI Workflow Operating System 的知识中枢。**

不是 prompt 仓库，不是笔记堆，而是 Claude Code harness 的**配置系统 + 知识资产库**。

- `docs/` = 精炼知识（长期维护，可复用）
- `reports/` = 原始调研（保留来源，生熟分离）
- `.claude/` = 运行时配置（只放会被执行的东西）
- `templates/` = 可复制模板（降低创建成本）
- `registry/` = 机器可读索引（支撑检索和自动化）
- `archive/` = 历史归档（过期但可能有参考价值）

来源：`02-target-architecture.md` 第 1-2 节

---

## 2. 当前状态诊断

| 维度 | 状态 | 说明 |
|------|------|------|
| 文件总数 | 21 个 .md | 分散在根目录、reports/ui-workflow/、reorg/ |
| 命名规范 | 混乱 | 中文名、数字前缀、英文 kebab-case、空格混用 |
| Git 状态 | 无 | 整个仓库不是 Git repo |
| 空目录 | 1 个 | `claude-code-best-practice/` 存在但无任何文件 |
| 内容重叠 | 严重 | HeroUI Pro 技术栈在 3 份文件中重复；踩坑记录重复 |
| 价值分层 | 无 | 调研报告和精炼知识混放，没有"生熟分离" |
| 索引系统 | 无 | 靠文件名记忆，未来扩展后无法检索 |
| .claude/ 配置 | 完全缺失 | 仓库级 CLAUDE.md、settings.json、skills/ 均不存在 |

**核心问题**：这是一个 3 天内快速堆积的技术资产堆，有极高价值内容，但组织结构为零。

来源：`01-current-inventory.md` 第 1、5、6、9 节

---

## 3. 目标架构摘要

```
my-claude/
├── .claude/              # 运行时配置（10 个组件：2 agents + 3 commands + 3 rules + 2 skills）
├── docs/                 # 长期精炼知识（9 份文档）
├── reports/raw/          # 原始调研（4 份保留原始现场感）
├── templates/            # 可复制模板（4 个模板）
├── registry/             # 机器可读索引（index.json + tags.json + assets.json）
├── archive/              # 历史归档（3 份一次性文件）
├── reorg/                # 重组规划（7 份决策记录，保留）
├── README.md             # 仓库门面
└── 00-START-HERE.md      # 快速入门
```

**设计原则**：Agent/Command/Skill 分工明确；.claude/ 只放真正被执行的配置；docs/ 只放经过验证的精炼知识；reports/ 与 docs/ 生熟分离；registry/ 支撑自动化检索。

来源：`02-target-architecture.md` 第 2-9 节

---

## 4. Top 10 设计决策

| # | 决策 | 理由 | 来源 |
|---|------|------|------|
| 1 | **生熟分离**（reports/ vs docs/） | 解决"这是最终版吗？"的永恒困惑 | `02-target-architecture.md` 第 8 节 |
| 2 | **.claude/ 只放被执行的配置** | 防止配置层膨胀为知识层 | `02-target-architecture.md` 第 4 节 |
| 3 | **CLAUDE.md 双位置**（.claude/ + docs/） | .claude/ 供 Claude Code 读取，docs/ 供人类阅读和版本管理 | `05-migration-plan.md` 第 7 节 |
| 4 | **kebab-case 命名，中文标题放 frontmatter** | 统一文件名，保留中文语义 | `02-target-architecture.md` 第 10 节 |
| 5 | **frontmatter 强制化**（title/type/status/tags/source_files） | 支撑 registry 索引和自动化 | `02-target-architecture.md` 第 11 节 |
| 6 | **原始报告只移动不精炼** | 保留调研的"现场感"和失败上下文 | `05-migration-plan.md` 第 4 节 |
| 7 | **.claude/ 生态 10 组件起步，9 组件模板预留** | 解决当前痛点，不过度工程化 | `03-claude-ecosystem-plan.md` 第 8-9 节 |
| 8 | **no-secrets rule 为 P0** | 安全基线，防止 API key 写入仓库 | `03-claude-ecosystem-plan.md` 第 4.3 节 |
| 9 | **registry/ 机器可读索引** | 未来检索和自动化的基础设施 | `02-target-architecture.md` 第 7 节 |
| 10 | **不删除任何文件，先复制后移动** | 保守策略，保留原始直到确认精炼成功 | `05-migration-plan.md` 第 1 节 |

---

## 5. Top 10 风险

| # | 风险 | 严重度 | 缓解措施 |
|---|------|--------|---------|
| 1 | `Claude个性化风格配置方案.md` 双位置导致版本漂移 | 中 | `.claude/README.md` 声明"以 .claude/CLAUDE.md 为准" | `05-migration-plan.md` 第 9 节 |
| 2 | 精炼过程丢失原始报告的"现场感" | 低 | 原始报告保留在 `reports/raw/`，精炼文档标注 `source_files` | `05-migration-plan.md` 第 9 节 |
| 3 | 文件移动后相对链接断裂 | 中 | 执行阶段扫描所有 .md 中的链接，批量更新 | `05-migration-plan.md` 第 9 节 |
| 4 | `temp_task.md` Workflow 未真正完成即归档 | 中 | 归档前确认 Workflow 状态 | `05-migration-plan.md` 第 9 节 |
| 5 | HeroUI Pro 版本漂移（文档基于 beta.4） | 中 | 组件参考文档添加版本兼容性 frontmatter | `01-current-inventory.md` 第 9.1 节 |
| 6 | Claude Code 版本漂移（功能手册基于 v2.1.156） | 中 | feature-handbook 添加版本时间线 frontmatter | `01-current-inventory.md` 第 9.1 节 |
| 7 | Windows 空目录问题未解决（npx skills 不复制文件） | 中 | 记录到 `docs/ui-workflow/windows-skill-gap-workaround.md` | `04-ui-workflow-architecture.md` 第 12 节 |
| 8 | 精炼文档 frontmatter 格式不统一导致索引失败 | 低 | 使用统一模板，执行时验证 | `05-migration-plan.md` 第 9 节 |
| 9 | `.claude/` 配置被误读为项目级而非全局 | 低 | `.claude/README.md` 明确说明是"仓库级配置参考" | `05-migration-plan.md` 第 9 节 |
| 10 | 仓库不是 Git repo，变更无历史追踪 | 中 | 建议迁移后初始化 Git | `01-current-inventory.md` 第 9.2 节 |

---

## 6. 建议目标文件树

```
D:/OneDrive/Desktop/my-claude/
├── .claude/
│   ├── CLAUDE.md                          ← 个性化风格配置（copy from 根目录）
│   ├── README.md                          ← 配置说明（新建）
│   ├── settings.example.json              ← 示例配置（新建）
│   ├── agents/
│   │   ├── repo-cartographer/
│   │   │   └── AGENT.md                   ← 仓库地图绘制员
│   │   └── report-distiller/
│   │       └── AGENT.md                   ← 报告提炼员
│   ├── commands/
│   │   ├── restructure-repo/
│   │   │   └── COMMAND.md                 ← 重组仓库
│   │   ├── distill-report/
│   │   │   └── COMMAND.md                 ← 提炼报告
│   │   └── update-registry/
│   │       └── COMMAND.md                 ← 更新索引
│   ├── rules/
│   │   ├── research-reporting.md          ← 调研报告规范
│   │   ├── file-organization.md           ← 文件组织规范
│   │   └── no-secrets.md                  ← 禁止泄露 secrets
│   └── skills/
│       ├── my-claude-repo-manager/
│       │   └── SKILL.md                   ← 仓库管理
│       └── report-to-doc-distiller/
│           └── SKILL.md                   ← 报告提炼
│
├── docs/
│   ├── INDEX.md                           ← 文档索引（新建）
│   ├── claude-code/
│   │   ├── feature-handbook.md            ← 功能速查 + 工作流
│   │   ├── skills-inventory.md            ← 67 个 Skill 分类索引
│   │   ├── diagram-skills-reference.md    ← 6 款画图技能选择指南
│   │   ├── claude-mem-guide.md            ← 安装 + 配置 + 使用（合并）
│   │   └── codegraph-gitnexus-guide.md    ← 三工具配合工作流
│   ├── heroui/
│   │   ├── component-reference.md         ← 55 组件 API 速查
│   │   ├── template-architecture.md       ← 四大模板架构
│   │   └── porting-guide.md               ← 14 条踩坑 + 生产 checklist
│   └── ui-workflow/
│       ├── workflow-standard.md           ← 五阶段工作流规范
│       ├── tool-routing-cheatsheet.md     ← "I want to... → Use This Skill"
│       ├── gsap-motion-guide.md           ← GSAP 代码模式 + 反模式
│       ├── anti-pattern-cookbook.md       ← 12 条反模式 + 纠正
│       ├── skill-combination-recipes.md   ← 5 个常用组合配方
│       ├── diagram-tool-selection-guide.md ← 6 款工具选择指南
│       └── windows-skill-gap-workaround.md ← Windows 空目录问题记录
│
├── reports/
│   └── raw/
│       ├── heroui/
│       │   ├── template-architecture.md   ← 原始模板架构分析
│       │   └── porting-guide-and-pitfalls.md ← 原始踩坑记录
│       └── ui-workflow/
│           ├── ui-skill-stack-installation-report.md ← 原始安装报告
│           └── ui-skill-deep-research.md  ← 原始深度调研
│
├── templates/
│   ├── heroui/
│   │   ├── dashboard-starter/             ← Dashboard 模板骨架
│   │   └── porting-checklist.md           ← 生产接入 checklist
│   └── ui-workflow/
│       ├── project-DESIGN.md              ← DESIGN.md 模板
│       ├── project-PRODUCT.md             ← PRODUCT.md 模板
│       ├── project-CLAUDE.md              ← UI 项目专用 CLAUDE.md 模板
│       └── gsap-checklist.md              ← GSAP 实施 checklist
│
├── registry/
│   ├── index.json                         ← 全库文件索引
│   ├── tags.json                          ← 标签体系定义
│   ├── assets.json                        ← 资产清单
│   └── manifests/
│       ├── skills-manifest.json           ← Skill 注册表
│       └── commands-manifest.json         ← 命令注册表
│
├── archive/
│   └── 2026-05-30/
│       ├── claude-mem-handoff-prompt.md   ← 一次性交接 prompt
│       ├── ui-workflow-handoff-for-gpt.md ← 一次性 handoff
│       └── temp-task-tracking.md          ← 临时任务追踪
│
├── reorg/
│   ├── 00-executive-summary.md            ← 本文件
│   ├── 01-current-inventory.md            ← 仓库盘点
│   ├── 02-target-architecture.md          ← 目标架构
│   ├── 03-claude-ecosystem-plan.md        ← 生态设计
│   ├── 04-ui-workflow-architecture.md     ← UI 工作流
│   ├── 05-migration-plan.md               ← 迁移计划
│   ├── 06-execution-log.md                ← 执行日志（待生成）
│   └── 07-verification-report.md          ← 验证报告（待生成）
│
├── README.md                              ← 仓库门面
└── 00-START-HERE.md                       ← 快速入门
```

来源：`05-migration-plan.md` 附录

---

## 7. 建议 .claude 生态层

### 立即启用（P0-P1）—— 10 个组件

| 组件 | 类型 | 职责 | 来源 |
|------|------|------|------|
| `repo-cartographer` | Agent | 扫描仓库结构，生成文件索引，标记孤儿文件 | `03-claude-ecosystem-plan.md` 第 2.1 节 |
| `report-distiller` | Agent | 将 reports/ 原始报告提炼为 docs/ 长期知识 | `03-claude-ecosystem-plan.md` 第 2.4 节 |
| `restructure-repo` | Command | 执行仓库重组：创建目录、移动文件、更新索引 | `03-claude-ecosystem-plan.md` 第 3.2 节 |
| `distill-report` | Command | 将原始报告提炼为长期知识文档 | `03-claude-ecosystem-plan.md` 第 3.3 节 |
| `update-registry` | Command | 扫描仓库，更新 registry/index.json | `03-claude-ecosystem-plan.md` 第 3.7 节 |
| `research-reporting` | Rule | 强制 reports/ 文件 frontmatter 和来源追踪 | `03-claude-ecosystem-plan.md` 第 4.1 节 |
| `file-organization` | Rule | 强制文件按目标架构存放，禁止根目录堆 .md | `03-claude-ecosystem-plan.md` 第 4.2 节 |
| `no-secrets` | Rule | 检测并阻断 API key、token、凭证写入 | `03-claude-ecosystem-plan.md` 第 4.3 节 |
| `my-claude-repo-manager` | Skill | 管理仓库索引、分类、归档、统计 | `03-claude-ecosystem-plan.md` 第 5.1 节 |
| `report-to-doc-distiller` | Skill | 将 reports/ 原始报告提炼为 docs/ 长期知识 | `03-claude-ecosystem-plan.md` 第 5.1 节 |

### 模板预留（P2-P3，暂不创建）—— 9 个组件

| 组件 | 类型 | 触发条件 | 来源 |
|------|------|----------|------|
| `workflow-architect` | Agent | 新增工作流领域时 | `03-claude-ecosystem-plan.md` 第 2.2 节 |
| `ui-workflow-designer` | Agent | UI 项目频率增高时 | `03-claude-ecosystem-plan.md` 第 2.3 节 |
| `codex-review-packager` | Agent | Codex 审查频率增高时 | `03-claude-ecosystem-plan.md` 第 2.5 节 |
| `memory-curator` | Agent | 记忆文件 >50 条时 | `03-claude-ecosystem-plan.md` 第 2.6 节 |
| `build-codex-review-package` | Command | 需要标准化审查包时 | `03-claude-ecosystem-plan.md` 第 3.4 节 |
| `ui-workflow-plan` | Command | UI 项目启动频繁时 | `03-claude-ecosystem-plan.md` 第 3.5 节 |
| `ui-workflow` | Rule | 仓库开始做 UI 实现时 | `03-claude-ecosystem-plan.md` 第 4.4 节 |
| `codex-review` | Rule | 审查频率增高时 | `03-claude-ecosystem-plan.md` 第 4.5 节 |
| `handoff` | Rule | 多 agent 协作频繁时 | `03-claude-ecosystem-plan.md` 第 4.6 节 |

来源：`03-claude-ecosystem-plan.md` 第 8 节

---

## 8. 建议 docs 索引

### docs/ 目录结构（9 份精炼文档）

| 路径 | 来源文件 | 内容 | 优先级 |
|------|---------|------|--------|
| `docs/claude-code/feature-handbook.md` | `Claude Code 全功能谱系与工作流手册.md` | 功能速查 + 6 大工作流 + 配置模板 | P0 |
| `docs/claude-code/skills-inventory.md` | `Claude Code 本机 Skills 全量汇总.md` | 67 个 Skill 分类索引 + 触发词 + 安装状态 | P0 |
| `docs/claude-code/diagram-skills-reference.md` | `Claude Code 画图技能调研报告.md` | 6 款画图技能选择决策树 + 平台兼容性矩阵 | P0 |
| `docs/claude-code/claude-mem-guide.md` | `Claude-Mem 安装与验证 Handoff.md` + `Claude-Mem 配置与使用指南.md` | 安装 + 配置 + 使用（合并为单一指南） | P0 |
| `docs/claude-code/codegraph-gitnexus-guide.md` | `CodeGraph_GitNexus_grill-me_三工具详解.md` | 三工具配合工作流 + 场景化最佳实践 | P0 |
| `docs/heroui/component-reference.md` | `heroui-pro-v3-component-reference-and-porting-guide.md` | 55 组件复合 API 速查 + 移植代码 + 版本兼容性 | P0 |
| `docs/heroui/template-architecture.md` | `02-template-architecture.md` | 四大模板架构对比 + 可复用组件清单 | P0 |
| `docs/heroui/porting-guide.md` | `03-porting-guide-and-pitfalls.md` | 14 条踩坑 + hpsetup 认证 + 生产 checklist | P0 |
| `docs/ui-workflow/workflow-standard.md` | `reports/ui-workflow/03-ui-workflow-standard.md` | 五阶段工作流 + 决策门 + 技能触发映射 | P0 |
| `docs/ui-workflow/tool-routing-cheatsheet.md` | `reports/ui-workflow/04-ui-tool-routing-cheatsheet.md` | "I want to... → Use This Skill" 快速决策表 | P0 |
| `docs/ui-workflow/gsap-motion-guide.md` | `reports/ui-workflow/05-gsap-motion-layer-analysis.md` | GSAP 代码模式 + 反模式 + 性能铁律 + 清理清单 | P0 |
| `docs/ui-workflow/anti-pattern-cookbook.md` | `reports/ui-workflow/04-ui-tool-routing-cheatsheet.md` | 12 条反模式 + 纠正 Skill | P1 |
| `docs/ui-workflow/skill-combination-recipes.md` | `reports/ui-workflow/04-ui-tool-routing-cheatsheet.md` | 5 个常用 Skill 组合配方 | P1 |
| `docs/ui-workflow/diagram-tool-selection-guide.md` | `Claude Code 画图技能调研报告.md` | 6 款工具按场景/复杂度/环境选择 | P1 |
| `docs/ui-workflow/windows-skill-gap-workaround.md` | `reports/ui-workflow/01-ui-skill-stack-installation-report.md` | Windows 空目录问题记录和规避 | P1 |

来源：`05-migration-plan.md` 第 5 节 + `04-ui-workflow-architecture.md` 第 9 节

---

## 9. 建议 registry 索引

### registry/ 文件清单

| 文件 | 职责 | 格式 | 来源 |
|------|------|------|------|
| `registry/index.json` | 全库文件索引，支撑快速检索 | JSON，含 path/title/type/tags/status/created/modified | `02-target-architecture.md` 第 7.2 节 |
| `registry/tags.json` | 标签体系定义，统一分类语言 | JSON，含 tag 名称、描述、适用类型 | `02-target-architecture.md` 第 7.1 节 |
| `registry/assets.json` | 资产清单（图片、附件、外部资源） | JSON，含路径、类型、引用位置 | `02-target-architecture.md` 第 7.1 节 |
| `registry/manifests/skills-manifest.json` | Skill 注册表，记录所有可用 Skill | JSON，含名称、触发词、来源、状态 | `02-target-architecture.md` 第 7.1 节 |
| `registry/manifests/commands-manifest.json` | 命令注册表，记录所有自定义命令 | JSON，含名称、描述、参数、触发场景 | `02-target-architecture.md` 第 7.1 节 |

### index.json 条目示例

```json
{
  "version": "1.0",
  "lastUpdated": "2026-05-30",
  "entries": [
    {
      "path": "docs/claude-code/feature-handbook.md",
      "title": "Claude Code 功能速查与工作流手册",
      "type": "reference",
      "tags": ["claude-code", "workflow", "cheatsheet"],
      "status": "active",
      "created": "2026-05-27",
      "modified": "2026-05-30",
      "sourceFiles": ["Claude Code 全功能谱系与工作流手册.md"]
    }
  ]
}
```

来源：`02-target-architecture.md` 第 7 节

---

## 10. 建议 migration plan

### Phase 1：骨架搭建（审批后立即执行）

| 步骤 | 操作 | 预计时间 |
|------|------|----------|
| 1 | 创建所有目录（.claude/agents/...、docs/...、reports/raw/...、templates/...、registry/...、archive/...） | 5 分钟 |
| 2 | 移动原始报告到 reports/raw/（4 份） | 2 分钟 |
| 3 | 归档一次性文件到 archive/（3 份） | 1 分钟 |
| 4 | 复制个性化配置到 .claude/CLAUDE.md | 1 分钟 |
| 5 | 创建 .claude/settings.example.json、.claude/README.md | 10 分钟 |
| 6 | 创建 registry/ 骨架文件（index.json、tags.json、assets.json） | 10 分钟 |
| 7 | 更新 README.md、创建 00-START-HERE.md | 10 分钟 |

### Phase 2：精炼 docs（Phase 1 完成后分批执行）

| 批次 | 文档 | 预计时间 |
|------|------|----------|
| Batch 1 | `docs/claude-code/feature-handbook.md`、`skills-inventory.md`、`diagram-skills-reference.md` | 30 分钟 |
| Batch 2 | `docs/claude-code/claude-mem-guide.md`、`codegraph-gitnexus-guide.md` | 20 分钟 |
| Batch 3 | `docs/heroui/component-reference.md`、`template-architecture.md`、`porting-guide.md` | 30 分钟 |
| Batch 4 | `docs/ui-workflow/workflow-standard.md`、`tool-routing-cheatsheet.md`、`gsap-motion-guide.md` | 30 分钟 |
| Batch 5 | `docs/ui-workflow/anti-pattern-cookbook.md`、`skill-combination-recipes.md`、`diagram-tool-selection-guide.md`、`windows-skill-gap-workaround.md` | 30 分钟 |

### Phase 3：.claude 生态（Phase 2 完成后）

| 步骤 | 操作 | 预计时间 |
|------|------|----------|
| 1 | 创建 2 个 Agent（repo-cartographer、report-distiller） | 15 分钟 |
| 2 | 创建 3 个 Command（restructure-repo、distill-report、update-registry） | 15 分钟 |
| 3 | 创建 3 个 Rule（research-reporting、file-organization、no-secrets） | 10 分钟 |
| 4 | 创建 2 个 Skill（my-claude-repo-manager、report-to-doc-distiller） | 20 分钟 |

### Phase 4：验证与收尾

| 步骤 | 操作 | 来源 |
|------|------|------|
| 1 | 扫描所有 .md 中的相对链接，批量更新 | `05-migration-plan.md` 第 9 节 |
| 2 | 验证 registry/index.json 可正常解析 | `05-migration-plan.md` 第 9 节 |
| 3 | 验证 .claude/ 配置可被 Claude Code 识别 | `03-claude-ecosystem-plan.md` 第 6 节 |
| 4 | 生成 `reorg/06-execution-log.md` 和 `07-verification-report.md` | `05-migration-plan.md` 附录 |

来源：`05-migration-plan.md` 全文

---

## 11. 哪些事情需要我批准

| # | 事项 | 说明 |
|---|------|------|
| 1 | **整体迁移执行** | 是否同意按上述计划执行重组？ |
| 2 | **CLAUDE.md 双位置策略** | 个性化配置同时存在于 `.claude/CLAUDE.md` 和 `docs/`，是否接受版本漂移风险？ |
| 3 | **9 份文档的精炼范围** | 是否需要精炼全部 9 份，还是有可以直接复制无需精炼的？ |
| 4 | **4 个 templates 是否足够** | 当前规划 4 个模板（Dashboard 骨架、Porting checklist、DESIGN.md、GSAP checklist），是否需要更多？ |
| 5 | **空目录 `claude-code-best-practice/` 的处理** | 当前为空，是删除还是保留占位？ |
| 6 | **是否初始化 Git** | 当前不是 Git repo，迁移后是否初始化？ |
| 7 | **archive/ 中的 3 份文件确认** | `Claude-Mem 验证交接 Prompt.md`、`reports/ui-workflow/06-handoff-for-gpt.md`、`temp_task.md` 是否可以归档？ |
| 8 | **命名规范：kebab-case** | 是否统一采用 kebab-case 命名，中文标题放 frontmatter？ |
| 9 | **frontmatter 强制化** | 是否所有 docs/ 和 reports/ 文件强制添加 frontmatter？ |
| 10 | **.claude/ 生态 10 组件** | 是否同意立即创建 2 agents + 3 commands + 3 rules + 2 skills？ |

来源：`05-migration-plan.md` 第 10 节

---

## 12. 哪些事情不建议现在做

| # | 事项 | 理由 | 建议时机 |
|---|------|------|----------|
| 1 | **创建 workflow-architect Agent** | 当前工作流已相对稳定（UI/UX/Motion），待有新领域时再引入 | 新增后端/数据工作流时 | `03-claude-ecosystem-plan.md` 第 2.2 节 |
| 2 | **创建 ui-workflow-designer Agent** | 当前 UI 工作流已通过 frontend-design、impeccable、gsap-* 等 skill 覆盖 | UI 项目频率增高时 | `03-claude-ecosystem-plan.md` 第 2.3 节 |
| 3 | **创建 codex-review-packager Agent** | 当前 handoff 通过 `/handoff` skill 已覆盖 | Codex 审查频率增高时 | `03-claude-ecosystem-plan.md` 第 2.5 节 |
| 4 | **创建 memory-curator Agent** | claude-mem 自动管理，人工干预频率低 | 记忆文件 >50 条时 | `03-claude-ecosystem-plan.md` 第 2.6 节 |
| 5 | **创建 build-codex-review-package Command** | `/handoff` skill 已覆盖基础能力 | 需要标准化审查包时 | `03-claude-ecosystem-plan.md` 第 3.4 节 |
| 6 | **创建 ui-workflow-plan Command** | 当前通过 skill 触发已足够 | UI 项目启动频繁时 | `03-claude-ecosystem-plan.md` 第 3.5 节 |
| 7 | **创建 ui-workflow Rule** | 当前是知识仓库，不做 UI 实现 | 仓库开始做 UI 实现时 | `03-claude-ecosystem-plan.md` 第 4.4 节 |
| 8 | **创建 codex-review Rule** | 当前审查频率低 | 审查频率增高时 | `03-claude-ecosystem-plan.md` 第 4.5 节 |
| 9 | **创建 handoff Rule** | `/handoff` skill 已覆盖 | 多 agent 协作频繁时 | `03-claude-ecosystem-plan.md` 第 4.6 节 |
| 10 | **安装更多 UI Skill** | 当前 stack 已覆盖 90%+ 场景，LibreUIUX 等会导致 skill 冲突 | 发现具体缺口时 | `04-ui-workflow-architecture.md` 第 11 节 |
| 11 | **创建 color-palette-reference.md** | 96 色板按需生成即可，无需预建参考 | 需要时动态生成 | `04-ui-workflow-architecture.md` 第 9 节 |
| 12 | **创建 font-pairing-reference.md** | 57 字体配对按需生成即可 | 需要时动态生成 | `04-ui-workflow-architecture.md` 第 9 节 |

---

*如果你同意执行迁移，请回复：Approve reorg execution*
