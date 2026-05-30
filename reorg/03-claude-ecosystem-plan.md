# .claude/ 生态配置层设计

> 生成时间：2026-05-30
> 定位：my-claude 仓库的 Claude Code harness 配置层规划
> 原则：只放会被执行的配置，不囤积，不装饰

---

## 1. 当前 .claude/ 状态

### 1.1 现状扫描

| 检查项 | 状态 | 说明 |
|--------|------|------|
| `my-claude/.claude/` 目录 | ❌ 不存在 | 仓库根目录无 .claude/ |
| `my-claude/.claude/CLAUDE.md` | ❌ 不存在 | 无项目级上下文 |
| `my-claude/.claude/settings.json` | ❌ 不存在 | 无项目级设置 |
| `my-claude/.claude/skills/` | ❌ 不存在 | 无自定义 skill |
| `my-claude/.claude/commands/` | ❌ 不存在 | 无自定义命令 |
| `my-claude/.claude/agents/` | ❌ 不存在 | 无 agent 定义 |
| `my-claude/.claude/rules/` | ❌ 不存在 | 无规则定义 |
| `my-claude/.claude/hooks/` | ❌ 不存在 | 无生命周期钩子 |
| 全局 `~/.claude/CLAUDE.md` | ✅ 存在 | `C:\Users\Lenovo\.claude\CLAUDE.md`（Personal Hermes Engineer 风格） |
| 全局 `~/.claude/skills/` | ✅ 67+ 个 | 已安装 skill 全量清单见 `Claude Code 本机 Skills 全量汇总.md` |
| 全局 `~/.claude/plugins/` | ✅ 4 个 | claude-mem, CodeGraph, minimax-skills, official |
| `threetwoa_ob/.claude/` | ✅ 存在 | 个人 Obsidian 知识库已有 .claude/ 配置（含 skills, settings.json） |

### 1.2 关键结论

- **my-claude 目前是纯知识仓库**，没有代码项目，因此没有代码级 .claude/ 配置需求
- **全局配置已相当完整**：67+ skills、4 plugins、MCP servers、claude-mem 记忆系统
- **my-claude 的 .claude/ 职责**：不是重复全局配置，而是定义**本仓库特有的** agents / commands / rules / skills
- **核心问题**：这个仓库要"做什么"？—— 它是 AI Workflow OS 的知识中枢，需要配置来**管理自身**和**对外输出模板**

---

## 2. 候选 Agents 评估

### 2.1 repo-cartographer（仓库地图绘制员）

| 维度 | 评估 |
|------|------|
| **用途** | 扫描仓库结构，生成文件索引，标记内容类型，建议分类 |
| **来源依据** | 当前仓库有 ~22 个文件分散在根目录，需要系统化盘点；已有 `reorg/01-current-inventory.md` 概念 |
| **什么时候使用** | 仓库文件增长超过 30 个时；季度盘点时；迁移前 |
| **现在创建？** | ✅ **是** — 当前正处于重组期，需要自动化盘点能力 |
| **维护成本** | 低 — 纯文本 agent 定义，无外部依赖 |
| **草案大纲** | 输入：仓库路径 → 扫描所有 .md 文件 → 提取 frontmatter → 分类（report/guide/template/config） → 生成索引 → 标记孤儿文件 |

### 2.2 workflow-architect（工作流架构师）

| 维度 | 评估 |
|------|------|
| **用途** | 分析用户工作流需求，设计 Skill/Command/Rule 组合方案 |
| **来源依据** | UI Workflow 已有 5 阶段流水线；GPT → Claude Code → Codex 三层协作 |
| **什么时候使用** | 新增工作流时；评估 skill 组合时；设计 handoff 协议时 |
| **现在创建？** | ⏸️ **以后** — 当前工作流已相对稳定（UI/UX/Motion），待有新领域（如后端/数据）时再引入 |
| **维护成本** | 中 — 需要持续更新 skill 清单和工作流模式 |
| **草案大纲** | 输入：目标领域 + 约束 → 查询 registry 现有 skill → 设计阶段流水线 → 定义 handoff 点 → 输出配置草案 |

### 2.3 ui-workflow-designer（UI 工作流设计师）

| 维度 | 评估 |
|------|------|
| **用途** | 专门负责 UI/UX/Motion 工作流的编排和审查 |
| **来源依据** | 已有完整 UI skill stack（22+ skills）；`reports/ui-workflow/` 有 6 份报告 |
| **什么时候使用** | 任何 UI 相关项目启动时；审查 UI 实现时 |
| **现在创建？** | ⏸️ **以后** — 当前 UI 工作流已通过 `frontend-design`, `impeccable`, `gsap-*` 等 skill 覆盖，agent 层暂无缺口 |
| **维护成本** | 中 — 需跟踪 HeroUI/GSAP 版本更新 |
| **草案大纲** | 输入：项目类型（landing/dashboard/chat） → 选择模板 → 分配 skill → 定义审查门 → 输出 DESIGN.md 草案 |

### 2.4 report-distiller（报告提炼员）

| 维度 | 评估 |
|------|------|
| **用途** | 将 `reports/` 原始调研提炼为 `docs/` 长期知识 |
| **来源依据** | 迁移计划要求"生熟分离"；6 份 UI 报告需提炼为 docs |
| **什么时候使用** | 每完成一批调研后；季度知识整理时 |
| **现在创建？** | ✅ **是** — 当前有 6 份 UI 报告 + 多份根目录文档待提炼，是核心痛点 |
| **维护成本** | 低 — 文本处理，无外部依赖 |
| **草案大纲** | 输入：reports/*.md → 提取核心发现 → 去重 → 结构化 → 写 docs/*.md → 更新 registry 索引 → 归档源文件 |

### 2.5 codex-review-packager（Codex 审查打包员）

| 维度 | 评估 |
|------|------|
| **用途** | 将本地工作成果打包为 Codex 可审查的格式 |
| **来源依据** | 用户工作流：Claude Code → Codex 审查；需要标准化 handoff |
| **什么时候使用** | 完成阶段性工作后；需要外部审查时 |
| **现在创建？** | ⏸️ **以后** — 当前 handoff 通过 `/handoff` skill 已覆盖，待 handoff 频率增高时再封装为 agent |
| **维护成本** | 低 — 主要是文件打包和格式转换 |
| **草案大纲** | 输入：工作目录 + 审查范围 → 收集变更文件 → 生成摘要 → 打包为 review-package.md → 附检查清单 |

### 2.6 memory-curator（记忆策展人）

| 维度 | 评估 |
|------|------|
| **用途** | 管理 claude-mem 记忆，定期整理、去重、归档 |
| **来源依据** | claude-mem 已安装（v13.3.0）；记忆会积累噪音 |
| **什么时候使用** | 记忆文件超过 50 条时；发现记忆冲突时 |
| **现在创建？** | ⏸️ **以后** — claude-mem 自动管理，人工干预频率低 |
| **维护成本** | 低 — 定期运行即可 |
| **草案大纲** | 输入：memory/ 目录 → 读取所有 .md → 检测重复/冲突 → 合并相似项 → 标记过期 → 生成整理报告 |

### 2.7 Agent 评估总结

| Agent | 决策 | 优先级 | 理由 |
|-------|------|--------|------|
| repo-cartographer | ✅ 现在创建 | P1 | 重组期刚需 |
| report-distiller | ✅ 现在创建 | P1 | 生熟分离核心 |
| workflow-architect | ⏸️ 以后 | P2 | 工作流稳定，暂不需要 |
| ui-workflow-designer | ⏸️ 以后 | P2 | Skill 层已覆盖 |
| codex-review-packager | ⏸️ 以后 | P3 | Handoff skill 已覆盖 |
| memory-curator | ⏸️ 以后 | P3 | 自动管理足够 |

---

## 3. 候选 Commands 评估

### 3.1 deep-research（深度调研）

| 维度 | 评估 |
|------|------|
| **用途** | 对指定主题进行多源深度调研，生成结构化报告 |
| **来源依据** | 已有 `deep-research` skill（Matt Pocock bundle）；用户频繁做技术调研 |
| **什么时候使用** | 需要了解新技术/工具/框架时；评估方案时 |
| **现在创建？** | ❌ **不需要** — `deep-research` skill 已全局安装，直接复用 |
| **维护成本** | — |
| **草案大纲** | — |

### 3.2 restructure-repo（重组仓库）

| 维度 | 评估 |
|------|------|
| **用途** | 执行仓库重组：创建目录、移动文件、更新索引 |
| **来源依据** | 当前正在进行重组；`reorg/05-migration-plan.md` 有完整映射表 |
| **什么时候使用** | 审批后执行迁移；季度结构调整 |
| **现在创建？** | ✅ **是** — 当前重组需要自动化执行能力 |
| **维护成本** | 中 — 需维护文件映射表 |
| **草案大纲** | 输入：迁移计划 .md → 解析映射表 → 创建缺失目录 → 移动/复制文件 → 更新链接 → 生成日志 → 验证 |

### 3.3 distill-report（提炼报告）

| 维度 | 评估 |
|------|------|
| **用途** | 将原始报告提炼为长期知识文档 |
| **来源依据** | `reports/` → `docs/` 是核心知识生产流程 |
| **什么时候使用** | 调研完成后；季度知识整理 |
| **现在创建？** | ✅ **是** — 与 report-distiller agent 配套 |
| **维护成本** | 低 |
| **草案大纲** | 输入：source-report.md → 提取核心论点 → 去过程留结论 → 结构化 → 写 target-doc.md → 添加 frontmatter → 记录来源 |

### 3.4 build-codex-review-package（构建审查包）

| 维度 | 评估 |
|------|------|
| **用途** | 打包工作成果供 Codex 审查 |
| **来源依据** | GPT → Claude Code → Codex 工作流 |
| **什么时候使用** | 阶段性交付前 |
| **现在创建？** | ⏸️ **以后** — `/handoff` skill 已覆盖基础能力 |
| **维护成本** | 低 |
| **草案大纲** | 输入：工作目录 → 收集变更 → 生成 diff → 写 summary → 附检查清单 → 输出 review-package.md |

### 3.5 ui-workflow-plan（UI 工作流规划）

| 维度 | 评估 |
|------|------|
| **用途** | 为 UI 项目生成完整工作流方案 |
| **来源依据** | `reports/ui-workflow/03-ui-workflow-standard.md` 有 5 阶段流水线 |
| **什么时候使用** | 新 UI 项目启动时 |
| **现在创建？** | ⏸️ **以后** — 当前通过 skill 触发已足够 |
| **维护成本** | 中 |
| **草案大纲** | 输入：项目类型 + 技术栈 → 选择模板 → 分配 skill → 定义审查门 → 输出 workflow-plan.md |

### 3.6 handoff（交接）

| 维度 | 评估 |
|------|------|
| **用途** | 压缩当前会话为 handoff 文档 |
| **来源依据** | 已有 `handoff` skill（全局安装） |
| **现在创建？** | ❌ **不需要** — Skill 已覆盖 |
| **维护成本** | — |
| **草案大纲** | — |

### 3.7 update-registry（更新注册表）

| 维度 | 评估 |
|------|------|
| **用途** | 扫描仓库，更新 registry/index.json |
| **来源依据** | `registry/` 是目标架构的核心 |
| **什么时候使用** | 文件增删后；定期维护 |
| **现在创建？** | ✅ **是** — 索引是检索基础设施 |
| **维护成本** | 低 — 可自动化 |
| **草案大纲** | 输入：仓库路径 → 扫描所有 .md → 提取 frontmatter → 更新 index.json → 检测孤儿文件 → 报告变更 |

### 3.8 Command 评估总结

| Command | 决策 | 优先级 | 理由 |
|---------|------|--------|------|
| deep-research | ❌ 不创建 | — | Skill 已覆盖 |
| restructure-repo | ✅ 现在创建 | P1 | 重组刚需 |
| distill-report | ✅ 现在创建 | P1 | 知识生产核心 |
| update-registry | ✅ 现在创建 | P1 | 索引基础设施 |
| build-codex-review-package | ⏸️ 以后 | P2 | Handoff skill 已覆盖 |
| ui-workflow-plan | ⏸️ 以后 | P2 | Skill 层已覆盖 |
| handoff | ❌ 不创建 | — | Skill 已覆盖 |

---

## 4. 候选 Rules 评估

### 4.1 research-reporting（调研报告规范）

| 维度 | 评估 |
|------|------|
| **用途** | 规范 reports/ 目录下的原始调研报告格式 |
| **来源依据** | 已有 6 份 UI 报告，格式不一；需要统一 frontmatter 和来源追踪 |
| **什么时候触发** | 在 reports/ 目录创建/编辑文件时 |
| **现在创建？** | ✅ **是** — 当前报告格式不统一 |
| **维护成本** | 低 |
| **草案大纲** | 强制 frontmatter（title, date, type=report, status, source_files）；强制来源追踪章节；命名规范 `YYYY-MM-DD-topic.md` |

### 4.2 file-organization（文件组织规范）

| 维度 | 评估 |
|------|------|
| **用途** | 强制文件按目标架构存放 |
| **来源依据** | `reorg/02-target-architecture.md` 定义了 7 个顶层目录职责 |
| **什么时候触发** | 创建新文件时 |
| **现在创建？** | ✅ **是** — 防止重组后再次混乱 |
| **维护成本** | 低 |
| **草案大纲** | 禁止根目录放 .md（除 README）；强制按内容类型路由到 docs/reports/templates/registry/archive；新文件必须声明目标目录 |

### 4.3 no-secrets（禁止泄露 secrets）

| 维度 | 评估 |
|------|------|
| **用途** | 防止 API key、token、凭证写入仓库 |
| **来源依据** | 用户安全约束第 6 条；已有 HP key 等敏感信息 |
| **什么时候触发** | 写入文件时 |
| **现在创建？** | ✅ **是** — 安全基线 |
| **维护成本** | 低 |
| **草案大纲** | 检测模式：`hp_`, `sk-`, `Bearer `, `AKID`, 等；发现时阻断写入并提示；允许 `.env.example` 和 `settings.example.json` |

### 4.4 ui-workflow（UI 工作流规范）

| 维度 | 评估 |
|------|------|
| **用途** | 规范 UI 项目的设计-实现-审查流程 |
| **来源依据** | `reports/ui-workflow/03-ui-workflow-standard.md` 有完整 5 阶段流水线 |
| **什么时候触发** | 检测到 UI 相关项目时 |
| **现在创建？** | ⏸️ **以后** — 当前是知识仓库，不做 UI 实现 |
| **维护成本** | 中 |
| **草案大纲** | 强制 Stage 0（DESIGN.md）；GPT 审批门；skill 路由表；审查清单 |

### 4.5 codex-review（Codex 审查规范）

| 维度 | 评估 |
|------|------|
| **用途** | 规范交付 Codex 审查前的自检流程 |
| **来源依据** | GPT → Claude Code → Codex 工作流 |
| **什么时候触发** | 请求审查时 |
| **现在创建？** | ⏸️ **以后** — 当前审查频率低 |
| **维护成本** | 低 |
| **草案大纲** | 审查前必须运行 /review；必须包含变更摘要；必须附测试证据 |

### 4.6 handoff（交接规范）

| 维度 | 评估 |
|------|------|
| **用途** | 规范跨 agent 交接格式 |
| **来源依据** | 多 agent 协作场景 |
| **什么时候触发** | 请求 handoff 时 |
| **现在创建？** | ⏸️ **以后** — `/handoff` skill 已覆盖 |
| **维护成本** | 低 |
| **草案大纲** | 必须包含：上下文摘要、已完成、阻塞项、下一步、相关文件 |

### 4.7 Rule 评估总结

| Rule | 决策 | 优先级 | 理由 |
|------|------|--------|------|
| research-reporting | ✅ 现在创建 | P1 | 报告格式统一 |
| file-organization | ✅ 现在创建 | P1 | 防止再次混乱 |
| no-secrets | ✅ 现在创建 | P0 | 安全基线 |
| ui-workflow | ⏸️ 以后 | P2 | 当前不做 UI 实现 |
| codex-review | ⏸️ 以后 | P2 | 审查频率低 |
| handoff | ⏸️ 以后 | P3 | Skill 已覆盖 |

---

## 5. 候选 Skills 评估

### 5.1 需要创建的 Skill

#### my-claude-repo-manager（仓库管理）

| 维度 | 评估 |
|------|------|
| **用途** | 管理 my-claude 仓库的索引、分类、归档 |
| **来源依据** | 仓库需要自我管理；registry/ 需要维护 |
| **现在创建？** | ✅ **是** — 核心基础设施 |
| **维护成本** | 中 |
| **草案大纲** | 子命令：index（更新索引）、classify（分类文件）、archive（归档过期）、stats（统计） |

#### report-to-doc-distiller（报告提炼）

| 维度 | 评估 |
|------|------|
| **用途** | 将 reports/ 原始报告提炼为 docs/ 长期知识 |
| **来源依据** | 生熟分离是核心设计 |
| **现在创建？** | ✅ **是** — 当前 6 份报告待提炼 |
| **维护成本** | 低 |
| **草案大纲** | 输入：reports/*.md → 提取核心 → 去重 → 结构化 → 输出 docs/*.md |

### 5.2 不需要创建的 Skill（已有全局覆盖）

| Skill | 全局状态 | 理由 |
|-------|----------|------|
| deep-research | ✅ 已安装 | 直接使用 |
| handoff | ✅ 已安装 | 直接使用 |
| git-commit | ✅ 已安装 | 直接使用 |
| obsidian-vault | ✅ 已安装 | 直接使用 |
| anysearch | ✅ 已安装 | 直接使用 |
| grill-me | ✅ 已安装 | 直接使用 |
| diagnose | ✅ 已安装 | 直接使用 |
| tdd | ✅ 已安装 | 直接使用 |

### 5.3 Skill 评估总结

| Skill | 决策 | 优先级 |
|-------|------|--------|
| my-claude-repo-manager | ✅ 现在创建 | P1 |
| report-to-doc-distiller | ✅ 现在创建 | P1 |

---

## 6. CLAUDE.md 草案大纲

### 6.1 定位

`my-claude/.claude/CLAUDE.md` 不是全局风格配置（全局已有），而是**本仓库的专用上下文**：
- 仓库是什么（AI Workflow OS 知识中枢）
- 目录结构约定（docs/reports/templates/registry/archive）
- 文件操作规范（生熟分离、来源追踪、frontmatter）
- 可用工具（本仓库特有的 command/skill）

### 6.2 草案大纲

```markdown
# CLAUDE.md — my-claude

## 仓库定位

AI Workflow Operating System 的知识中枢。
- docs/ = 精炼知识（长期维护）
- reports/ = 原始调研（一次性，保留来源）
- templates/ = 可复制模板
- registry/ = 机器可读索引
- archive/ = 历史归档

## 目录路由规则

| 内容类型 | 目标目录 | 禁止 |
|----------|----------|------|
| 调研原始笔记 | reports/YYYY-MM-DD-topic/ | 禁止放 docs/ |
| 精炼知识 | docs/category/ | 禁止放根目录 |
| 模板 | templates/ | 禁止放 docs/ |
| 索引 | registry/ | 禁止手动编辑（用 update-registry） |
| 过期文件 | archive/YYYY-Q#/ | 禁止直接删除 |

## 文件规范

- 命名：kebab-case，无空格，无中文文件名
- Frontmatter 必填：title, description, date, type, status, tags
- 来源追踪：reports/ 必须附 sources.json

## 可用工具

- `/distill-report` — 将 reports/ 提炼为 docs/
- `/restructure-repo` — 执行文件迁移
- `/update-registry` — 更新索引

## 安全规则

- 禁止写入 API key、token、凭证
- 禁止直接删除文件（归档替代）
- 禁止覆盖已有文件（未经确认）
```

---

## 7. settings.example.json 草案

```json
{
  "env": {
    "CLAUDE_CODE_EFFORT_LEVEL": "high"
  },
  "worktree.baseRef": "fresh",
  "git.guardrails": true,
  "hooks": {
    "beforeToolUse": "echo '[my-claude] Running: $CLAUDE_TOOL_NAME'",
    "StopFailure": "echo '[my-claude] Session stopped'"
  },
  "permissions": {
    "Bash": "ask",
    "Edit": "ask",
    "Write": "ask"
  },
  "commands": {
    "distill-report": {
      "description": "将 reports/ 原始报告提炼为 docs/ 长期知识",
      "prompt": "读取指定的 reports/ 文件，提取核心发现和结论，去重并结构化，写入 docs/ 对应目录，添加 frontmatter 和来源追踪。"
    },
    "restructure-repo": {
      "description": "执行仓库重组迁移",
      "prompt": "读取 reorg/05-migration-plan.md，解析文件映射表，创建缺失目录，按映射移动/复制文件，更新链接，生成执行日志。"
    },
    "update-registry": {
      "description": "更新 registry/index.json",
      "prompt": "扫描仓库所有 .md 文件，提取 frontmatter，更新 registry/index.json，检测孤儿文件和未索引内容。"
    }
  },
  "rules": {
    "research-reporting": {
      "description": "规范 reports/ 报告格式",
      "pattern": "reports/**/*.md",
      "requirements": [
        "必须有 frontmatter：title, date, type=report, status",
        "必须有来源追踪章节",
        "文件名格式：YYYY-MM-DD-topic.md"
      ]
    },
    "file-organization": {
      "description": "强制文件按架构存放",
      "pattern": "*.md",
      "requirements": [
        "禁止根目录放 .md（README.md 除外）",
        "新文件必须声明目标目录"
      ]
    },
    "no-secrets": {
      "description": "禁止写入敏感信息",
      "pattern": "**/*",
      "blockedPatterns": [
        "hp_[a-zA-Z0-9]+",
        "sk-[a-zA-Z0-9]{48}",
        "Bearer [a-zA-Z0-9_-]+",
        "AKID[a-zA-Z0-9]+"
      ]
    }
  }
}
```

---

## 8. 模板 vs 立即启用的分界

### 8.1 立即启用（P0-P1）

| 组件 | 类型 | 状态 |
|------|------|------|
| CLAUDE.md | 配置 | 草案完成，待写入 |
| settings.example.json | 配置 | 草案完成，待写入 |
| research-reporting rule | Rule | 草案完成，待写入 |
| file-organization rule | Rule | 草案完成，待写入 |
| no-secrets rule | Rule | 草案完成，待写入 |
| restructure-repo command | Command | 草案完成，待写入 |
| distill-report command | Command | 草案完成，待写入 |
| update-registry command | Command | 草案完成，待写入 |
| repo-cartographer agent | Agent | 草案完成，待写入 |
| report-distiller agent | Agent | 草案完成，待写入 |
| my-claude-repo-manager skill | Skill | 草案完成，待写入 |
| report-to-doc-distiller skill | Skill | 草案完成，待写入 |

### 8.2 模板化（P2-P3，暂不创建文件）

| 组件 | 类型 | 触发条件 |
|------|------|----------|
| workflow-architect agent | Agent | 新增工作流领域时 |
| ui-workflow-designer agent | Agent | UI 项目频率增高时 |
| codex-review-packager agent | Agent | Codex 审查频率增高时 |
| memory-curator agent | Agent | 记忆文件 >50 条时 |
| build-codex-review-package command | Command | 需要标准化审查包时 |
| ui-workflow-plan command | Command | UI 项目启动频繁时 |
| ui-workflow rule | Rule | 仓库开始做 UI 实现时 |
| codex-review rule | Rule | 审查频率增高时 |
| handoff rule | Rule | 多 agent 协作频繁时 |

### 8.3 分界原则

- **立即启用**：解决当前痛点（重组、提炼、索引）
- **模板化**：已设计但暂不创建，避免过度工程化
- **不创建**：已有全局 skill 覆盖，不重复

---

## 9. 过度工程化检查清单

### 9.1 检查项

| 检查项 | 状态 | 说明 |
|--------|------|------|
| Agent 数量 ≤ 3 个（立即启用） | ✅ 通过 | 实际启用 2 个（repo-cartographer, report-distiller） |
| Command 数量 ≤ 5 个（立即启用） | ✅ 通过 | 实际启用 3 个（restructure-repo, distill-report, update-registry） |
| Rule 数量 ≤ 5 个（立即启用） | ✅ 通过 | 实际启用 3 个（research-reporting, file-organization, no-secrets） |
| Skill 数量 ≤ 3 个（立即启用） | ✅ 通过 | 实际启用 2 个（my-claude-repo-manager, report-to-doc-distiller） |
| 不重复全局 skill | ✅ 通过 | 所有已有 skill 直接复用，不创建副本 |
| 每个组件有明确触发场景 | ✅ 通过 | 每个都有"什么时候使用" |
| 不创建纯装饰性配置 | ✅ 通过 | 所有配置都有运行时职责 |
| 模板 vs 立即启用有明确分界 | ✅ 通过 | 8.1/8.2 已分界 |
| 安全规则优先 | ✅ 通过 | no-secrets 为 P0 |
| 维护成本可控 | ✅ 通过 | 低-中成本，无高成本项 |

### 9.2 反模式检查

| 反模式 | 状态 | 说明 |
|--------|------|------|
| ❌ "先创建，以后可能用" | ✅ 未出现 | 所有组件都有明确触发条件 |
| ❌ "为了完整而创建" | ✅ 未出现 | 不追求 AGENTS.md 的完整性 |
| ❌ 重复全局配置 | ✅ 未出现 | 全局 skill 直接复用 |
| ❌ 过度抽象的 agent | ✅ 未出现 | 每个 agent 有具体输入输出 |
| ❌ 无触发条件的 rule | ✅ 未出现 | 每个 rule 有 pattern 和触发场景 |

### 9.3 结论

**当前设计未过度工程化。**

- 核心生态：2 agents + 3 commands + 3 rules + 2 skills = 10 个组件
- 全部解决当前真实痛点（重组、提炼、索引、安全）
- 模板层预留 9 个组件，按需启用
- 与全局 67+ skills 形成互补，不重复

---

## 附录：文件创建清单（审批后执行）

### 立即创建（P0-P1）

```
my-claude/
├── .claude/
│   ├── CLAUDE.md                          # 项目级上下文
│   ├── settings.example.json              # 示例配置（无敏感信息）
│   ├── agents/
│   │   ├── repo-cartographer/
│   │   │   └── AGENT.md                   # 仓库地图绘制员
│   │   └── report-distiller/
│   │       └── AGENT.md                   # 报告提炼员
│   ├── commands/
│   │   ├── restructure-repo/
│   │   │   └── COMMAND.md                 # 重组仓库
│   │   ├── distill-report/
│   │   │   └── COMMAND.md                 # 提炼报告
│   │   └── update-registry/
│   │       └── COMMAND.md                 # 更新索引
│   ├── rules/
│   │   ├── research-reporting.md          # 调研报告规范
│   │   ├── file-organization.md           # 文件组织规范
│   │   └── no-secrets.md                  # 禁止泄露 secrets
│   └── skills/
│       ├── my-claude-repo-manager/
│       │   └── SKILL.md                   # 仓库管理
│       └── report-to-doc-distiller/
│           └── SKILL.md                   # 报告提炼
```

### 模板预留（P2-P3，暂不创建）

```
my-claude/
├── .claude/
│   ├── agents/
│   │   ├── workflow-architect/            # [模板] 工作流架构师
│   │   ├── ui-workflow-designer/          # [模板] UI 工作流设计师
│   │   ├── codex-review-packager/         # [模板] 审查打包员
│   │   └── memory-curator/                # [模板] 记忆策展人
│   ├── commands/
│   │   ├── build-codex-review-package/    # [模板] 构建审查包
│   │   └── ui-workflow-plan/              # [模板] UI 工作流规划
│   └── rules/
│       ├── ui-workflow.md                 # [模板] UI 工作流规范
│       ├── codex-review.md                # [模板] Codex 审查规范
│       └── handoff.md                     # [模板] 交接规范
```

---

*文档版本：1.0*
*创建日期：2026-05-30*
*类型：decision*
*状态：draft*
