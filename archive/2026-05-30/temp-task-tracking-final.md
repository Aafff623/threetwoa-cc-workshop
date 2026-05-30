# my-claude 重构任务追踪

> 创建时间：2026-05-30 03:33+08
> 当前会话：Claude Code 运行中
> 总仓库：D:\OneDrive\Desktop\my-claude
> 目标：将 my-claude 重构成长期可维护的 Claude 生态资产仓库 / AI Workflow Operating System

---

## 当前会话状态

| 项目 | 状态 |
|------|------|
| 会话启动时间 | 2026-05-30 03:33 |
| 当前操作者 | Claude Code (Claude) |
| 会话中断时间 | 2026-05-30 ~04:15 |
| 已完成前置任务 | ✅ Commit threetwoa_ob 的 Claude Code Best Practices 报告归档 |
| **Workflow 状态** | **✅ 已完成** |
| 旧 Workflow ID | ~~`woqpwfgqw`~~（已停止） |
| 最终 Workflow ID | `wt621mrbo` |
| 启动时间 | 2026-05-30 ~04:20 |
| 完成时间 | 2026-05-30 ~04:50 |
| 耗时 | ~29 分钟 |
| reorg/ 目录状态 | **6 份报告已生成（2906 行）** |

---

## Phase 1: 仓库侦察 ✅

- [x] `pwd` — `/d/OneDrive/Desktop/my-claude`
- [x] `git status` — 非 git 仓库
- [x] 文件扫描完成（~22 个 Markdown + 6 个图片/SVG）
- [x] 关键文档抽样读取完成

**已识别的根目录文档：**
- `02-template-architecture.md`
- `03-porting-guide-and-pitfalls.md`
- `Claude Code 本机 Skills 全量汇总.md`
- `Claude Code 画图技能调研报告.md`
- `Claude Code 全功能谱系与工作流手册.md`
- `Claude-Mem 安装与验证 Handoff.md`
- `Claude-Mem 配置与使用指南.md`
- `Claude-Mem 验证交接 Prompt.md`
- `Claude个性化风格配置方案.md`
- `CodeGraph_GitNexus_grill-me_三工具详解.md`
- `heroui-pro-v3-component-reference-and-porting-guide.md`

**已识别的子目录文档：**
- `claude-code-best-practice/*.md` (11 个报告)
- `reports/ui-workflow/*.md` (6 个报告)

---

## Phase 2: 并发规划 Workflow 🔄

**Workflow ID**: `woqpwfgqw`  
**启动时间**: 2026-05-30 ~03:50  
**预计完成**: 10-15 分钟

### 5 个并行子智能体

| # | 智能体 | 交付物 | 状态 |
|---|--------|--------|------|
| 1 | Cartographer | `reorg/01-current-inventory.md` | 🔄 运行中 |
| 2 | Architect | `reorg/02-target-architecture.md` | 🔄 运行中 |
| 3 | Ecosystem Engineer | `reorg/03-claude-ecosystem-plan.md` | 🔄 运行中 |
| 4 | UI Librarian | `reorg/04-ui-workflow-architecture.md` | 🔄 运行中 |
| 5 | Migration Planner | `reorg/05-migration-plan.md` | 🔄 运行中 |

### 综合阶段（待前 5 个完成后）

| # | 任务 | 交付物 | 状态 |
|---|------|--------|------|
| 6 | Synthesis | `reorg/00-executive-summary.md` | ⏳ 等待中 |

---

## Phase 3: 待审批后执行 ⏸️

**审批条件**: 用户回复 `Approve reorg execution`

### 迁移执行清单

| # | 任务 | 交付物 | 状态 |
|---|------|--------|------|
| 7 | 创建缺失目录 | `docs/`, `.claude/`, `templates/`, `registry/`, `archive/` 等 | ⏸️ |
| 8 | 按 move map 移动/复制文件 | 文件到位 | ⏸️ |
| 9 | 创建/更新 `README.md` | 仓库门面 | ⏸️ |
| 10 | 创建/更新 `00-START-HERE.md` | 快速入门 | ⏸️ |
| 11 | 创建/更新 `docs/INDEX.md` | 文档索引 | ⏸️ |
| 12 | 创建/更新 `registry/asset-index.md` | 资产索引 | ⏸️ |
| 13 | 创建/更新 `registry/decision-log.md` | 决策记录 | ⏸️ |
| 14 | 创建 `.claude/README.md` | 配置说明 | ⏸️ |
| 15 | 创建 `.claude/agents/` 草案 | Agent 定义 | ⏸️ |
| 16 | 创建 `.claude/commands/` 草案 | Command 定义 | ⏸️ |
| 17 | 创建 `.claude/rules/` 草案 | Rule 定义 | ⏸️ |
| 18 | 创建 `settings.example.json` | 示例配置 | ⏸️ |
| 19 | 为新精炼文档添加 frontmatter | 规范元数据 | ⏸️ |
| 20 | 为新精炼文档添加来源章节 | 来源追踪 | ⏸️ |
| 21 | 更新相对链接 | 链接修复 | ⏸️ |
| 22 | 生成执行日志 | `reorg/06-execution-log.md` | ⏸️ |
| 23 | 生成验证报告 | `reorg/07-verification-report.md` | ⏸️ |
| 24 | 最终验证和汇报 | 状态确认 | ⏸️ |

---

## 关键设计原则（来自用户指令）

1. Prompt 不是系统，harness 才是系统
2. Agent / Command / Skill 分工明确
3. `.claude/` 只放真正会被执行的配置
4. `docs/` 放长期精炼知识
5. `reports/` 保留原始调研
6. `registry/` 负责索引和资产注册
7. `templates/` 负责可复制模板
8. `archive/` 负责历史归档

## 安全约束

- ❌ 不删除任何现有文件
- ❌ 不移动文件直到用户审批
- ❌ 不覆盖已有文件
- ❌ 不写入 secrets / API keys
- ❌ 不过度工程化
- ✅ 保留原始报告
- ✅ 精炼文档写明来源
- ✅ 第一阶段只生成计划

---

## Session 切换 Handoff 指南

### 场景 A：全新 Session（Workflow 从未启动过）

1. **读取本文件** — `temp_task.md`
2. **检查 reorg/ 目录** — 确认是否有报告文件
3. **如果 reorg/ 为空** — 重新启动 Workflow（见下方"恢复 Workflow"步骤）
4. **如果 reorg/ 有报告** — 读取 `reorg/00-executive-summary.md`
5. **询问用户** — "规划已完成，是否审批执行迁移？"

### 场景 B：恢复已中断的 Workflow（当前状态）

**当前状态**：Workflow `woqpwfgqw` 已被用户主动中断，reorg/ 目录为空，5 个子智能体均未输出报告。

**恢复步骤**：
1. **读取本文件** — `temp_task.md`
2. **询问用户** — "上次 Workflow 已中断，是否重新开始 my-claude 重构规划？"
3. **如果用户同意** — 重新调用 Workflow（使用保存的脚本路径）
4. **脚本路径**：`C:\Users\Lenovo\.claude\projects\D--OneDrive-Desktop-Notes-threetwoa-ob\9534ab8a-b698-40fc-adee-681768f32ead\workflows\scripts\my-claude-reorganization-wf_77ca0ae3-5e6.js`
5. **重新启动命令**：
   ```javascript
   Workflow({
     scriptPath: "C:\\Users\\Lenovo\\.claude\\projects\\D--OneDrive-Desktop-Notes-threetwoa-ob\\9534ab8a-b698-40fc-adee-681768f32ead\\workflows\\scripts\\my-claude-reorganization-wf_77ca0ae3-5e6.js"
   })
   ```
6. **如果 Workflow 已完成** — 读取 `reorg/00-executive-summary.md`
7. **询问用户审批** — "规划已完成，是否回复 `Approve reorg execution` 执行迁移？"

### 场景 C：审批后执行迁移

1. **读取 `reorg/05-migration-plan.md`**
2. **读取 `reorg/00-executive-summary.md`**
3. **确认用户已回复** `Approve reorg execution`
4. **按迁移计划执行**：创建目录 → 移动/复制文件 → 更新索引 → 生成日志
5. **生成 `reorg/06-execution-log.md`**
6. **生成 `reorg/07-verification-report.md`**
7. **汇报最终状态**

---

## 相关文件路径速查

```
D:\OneDrive\Desktop\my-claude\                    ← 主仓库
├── temp_task.md                                    ← 本文件
├── reorg\                                          ← 规划报告输出目录
│   ├── 00-executive-summary.md                     ← 综合摘要
│   ├── 01-current-inventory.md                     ← 仓库盘点
│   ├── 02-target-architecture.md                   ← 目标架构
│   ├── 03-claude-ecosystem-plan.md                 ← 生态设计
│   ├── 04-ui-workflow-architecture.md              ← UI 工作流
│   ├── 05-migration-plan.md                        ← 迁移计划
│   ├── 06-execution-log.md                         ← 执行日志（待生成）
│   └── 07-verification-report.md                   ← 验证报告（待生成）
├── reports\                                        ← 原始报告
│   └── ui-workflow\                                ← UI 工作流报告
├── claude-code-best-practice\                      ← 之前的研究报告
└── [根目录 .md 文件]                               ← 待分类文档
```

---

## 原始指令存档（完整 Prompt 摘要）

以下为用户下发的完整重构指令的核心内容摘要。新 session 恢复时，应结合本文件 + `reorg/` 目录下的报告来理解全貌。

### 仓库定位

把 `my-claude` 重构成长期可维护的 **Claude 生态资产仓库 / AI Workflow Operating System**。

当前问题：内容有价值，但结构分散，文件命名不统一，原始报告、精炼知识、配置草案、工作流规范、交接 Prompt 混在一起。

### 目标承载内容

1. 原始调研报告
2. 精炼后的长期知识文档
3. Claude Code 生态配置
4. 可复用的 agents / commands / skills / rules
5. GPT → Claude Code → Codex 工作流规范
6. UI/UX workflow 规范
7. 工具路由表
8. 安装、配置、排障和运行手册
9. 项目模板
10. 决策记录和索引系统

### 用户工作流背景

- **GPT**: 高层工作流大脑 — 拆解、方向、决策、spec、prompt、checklist、综合
- **Claude Code**: 本地执行和调研层 — 读仓库、执行文件、深度调研、生成报告、spec-driven implementation、维护 `.claude` 生态
- **Codex**: 审查和反驳层 — review 代码/报告、找漏洞、找矛盾、判断是否过度工程化、风险分析
- **用户**: 真实运行、体验判断、业务判断、约束补充、最终拍板

### 核心设计原则

1. Prompt 不是系统，harness 才是系统
2. 这个仓库应该体现 harness engineering
3. Agent / Command / Skill 分工明确：
   - Agent: 独立上下文、多步调研、复杂执行
   - Command: 用户显式触发、工作流编排
   - Skill: 可复用能力包、专门知识
4. `.claude/` 只放真正会被 Claude Code 执行、读取、调用的配置
5. `docs/` 放长期精炼知识，不放杂乱原始报告
6. `reports/` 保留原始调研和生成报告，保证来源可追溯
7. `registry/` 负责索引和资产注册
8. `templates/` 负责可复制到其他项目的模板
9. `archive/` 负责历史文件归档，不直接删除
10. 所有精炼文档必须保留来源材料路径

### 硬性安全约束

1. 不要删除任何现有文件
2. 不要在未经批准前移动文件
3. 不要在未经批准前覆盖已有文件
4. **第一阶段只生成重构计划，写入 `reorg/` 目录**
5. 只有用户明确回复 `Approve reorg execution` 才允许执行迁移
6. 不要把任何 secret、API key、HP key、token、OAuth 凭证、账号信息写入仓库
7. 如果发现疑似敏感信息，只做风险标记，不要复制到新文档
8. 所有原始报告都要保留
9. 精炼文档必须写明来源文件
10. 不要发明不存在的文件、命令、API、工具或依赖
11. 如果不确定，标记为 `TODO: verify`
12. 不要过度工程化，不要一次性创建几十个 agent / command / rule
13. 优先做一个小而强、能长期维护的核心生态

### Phase 1: 仓库侦察

运行基本侦察命令（pwd, git status, find），读取 README 和重要文档。

重点读取的文档：
- `02-template-architecture.md`
- `03-porting-guide-and-pitfalls.md`
- `Claude Code 本机 Skills 全量汇总.md`
- `Claude Code 画图技能调研报告.md`
- `Claude Code 全功能谱系与工作流手册.md`
- `Claude-Mem 安装与验证 Handoff.md`
- `Claude-Mem 配置与使用指南.md`
- `Claude-Mem 验证交接 Prompt.md`
- `Claude个性化风格配置方案.md`
- `CodeGraph_GitNexus_grill-me_三工具详解.md`
- `heroui-pro-v3-component-reference-and-porting-guide.md`
- `reports/ui-workflow/01~06-*.md`

### Phase 2: 并发调研任务分配

5 个并行子智能体：

| # | 智能体 | 交付物 | 核心任务 |
|---|--------|--------|---------|
| 1 | **仓库地图绘制员** | `reorg/01-current-inventory.md` | 全面盘点当前仓库，文件分类，建议迁移目标 |
| 2 | **知识架构师** | `reorg/02-target-architecture.md` | 设计目标信息架构，目录职责，命名规范 |
| 3 | **Claude 生态工程师** | `reorg/03-claude-ecosystem-plan.md` | 设计 `.claude/` 层：agents/commands/rules/skills，评估每个候选是否需要 |
| 4 | **UI Workflow 图书管理员** | `reorg/04-ui-workflow-architecture.md` | 整理 UI/UX/Motion 调研，设计 UI workflow 知识层 |
| 5 | **迁移规划师** | `reorg/05-migration-plan.md` | 设计可执行的文件迁移计划，映射表，风险 |

### 主控综合任务

前 5 个完成后，主控读取所有报告并生成：
- `reorg/00-executive-summary.md`（执行摘要）

必须包含：仓库最终形态、当前诊断、目标架构、Top 10 设计决策、Top 10 风险、建议文件树、`.claude` 生态层、docs 索引、registry 索引、migration plan、需批准事项、不建议现在做的事。

### 第二阶段：审批后执行

只有用户回复 `Approve reorg execution` 才执行迁移。

执行时必须：
1. 创建缺失目录
2. 按 move map 移动/复制文件
3. 不删除任何文件
4. 原始报告保留在 `reports/raw/` 或 `archive/YYYY-MM-DD/`
5. 创建/更新 `README.md`, `00-START-HERE.md`, `docs/INDEX.md`, `registry/asset-index.md`, `registry/decision-log.md`, `.claude/README.md`
6. `.claude/` 配置先以 draft 形式创建
7. 只创建 `settings.example.json`，不创建真实 `settings.json`
8. 为新精炼文档添加 frontmatter 和来源章节
9. 更新相对链接
10. 生成执行日志 `reorg/06-execution-log.md`
11. 生成验证报告 `reorg/07-verification-report.md`

### 新精炼文档 frontmatter 格式

```yaml
---
title:
type: principle | workflow | reference | report | template | registry | handoff | decision
status: active | draft | archived
source_files:
  - path/to/source.md
updated: YYYY-MM-DD
owner: threetwoa
---
```

### 质量要求

- 具体，不要空泛
- 以本地文件为证据
- 保留原始材料
- 让仓库更容易导航
- 让仓库更容易被 Claude Code 使用
- 不要过度工程化
- 优先建立稳定、可维护、可扩展的小核心
- 必须服务于 GPT → Claude Code → Codex 工作流

---

## 备注

- 用户担心 token 不够用，可能需要切换 session
- 当前时间是凌晨（03:33+），用户可能在深夜工作
- 用户的工作流：GPT（大脑）→ Claude Code（执行）→ Codex（审查）
- 本仓库最终目标：AI Workflow Operating System
