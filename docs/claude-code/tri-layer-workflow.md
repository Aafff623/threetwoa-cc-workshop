---
title: "三层工作流协作模型"
type: workflow
status: active
source_files:
  - reorg/00-executive-summary.md
updated: 2026-05-30
owner: threetwoa
---

# 三层工作流协作模型（Tri-Layer Workflow）

## 1. 三层协作模型概述

三层工作流模型是一种 AI 协作架构，将不同能力的 AI 代理分配到合适的层级，形成 **高层决策 → 本地执行 → 审查反驳** 的完整闭环。

```
┌─────────────────────────────────────────┐
│           GPT（高层大脑）                │
│    问题分解 · 方向判断 · 决策制定          │
│    Spec 撰写 · 反馈综合 · Prompt 编排    │
└──────────────┬──────────────────────────┘
               │ Spec / 任务包 / 上下文
               ▼
┌─────────────────────────────────────────┐
│        Claude Code（本地执行层）          │
│    仓库读取 · 文件操作 · 深度研究          │
│    Spec 驱动实现 · 报告生成 · 配置维护     │
└──────────────┬──────────────────────────┘
               │ 审查包 / 实现产物
               ▼
┌─────────────────────────────────────────┐
│        Codex（审查反驳层）                │
│    代码审查 · 报告审阅 · 漏洞发现          │
│    矛盾检测 · 过度工程判断 · 风险分析      │
└─────────────────────────────────────────┘
```

每层只做自己最擅长的事，通过结构化协议传递信息，避免能力错配和上下文丢失。

## 2. 各层职责边界

### 2.1 GPT（高层大脑）

| 职责 | 说明 |
|------|------|
| 问题分解 | 将复杂需求拆分为可执行的子任务 |
| 方向判断 | 在多个方案中选择最优路径 |
| 决策制定 | 综合各方信息做出最终决策 |
| Spec 撰写 | 输出结构化的实现规格书 |
| Prompt 编写 | 为 CC 和 Codex 编写精确的指令 |
| Checklist 创建 | 定义验收标准和检查清单 |
| 反馈综合 | 汇总 CC 的执行结果和 Codex 的审查意见 |

**不做**：直接操作文件、执行代码、读取本地仓库

### 2.2 Claude Code（本地执行层）

| 职责 | 说明 |
|------|------|
| 仓库读取 | 用 Read/Grep/Glob 工具研究代码库 |
| 文件操作 | 创建、编辑、删除文件 |
| 深度研究 | 跨文件追踪数据流、理解架构 |
| Spec 驱动实现 | 按 Spec 逐步实现功能 |
| 报告生成 | 将研究结果整理为结构化报告 |
| 配置维护 | 管理 .claude 目录下的 Skills/Agents 配置 |

**不做**：策略决策、方向选择、最终验收

### 2.3 Codex（审查反驳层）

| 职责 | 说明 |
|------|------|
| 代码审查 | 检查实现的正确性和风格 |
| 报告审阅 | 验证研究报告的准确性和完整性 |
| 漏洞发现 | 找出逻辑漏洞和边界情况 |
| 矛盾检测 | 发现 Spec 与实现之间的不一致 |
| 过度工程判断 | 识别不必要的复杂度 |
| 风险分析 | 评估技术方案的风险 |

**不做**：直接实现功能、做策略决策、操作文件

## 3. 信息流动模型

### 3.1 GPT → Claude Code

GPT 向 CC 传递的内容：

- **Task Spec**：结构化的任务规格书（见第 4 节）
- **Context Package**：相关背景信息、约束条件、优先级
- **Acceptance Criteria**：验收标准 checklist
- **Reference Materials**：相关的 docs/refs 中的参考文档路径

### 3.2 Claude Code → GPT

CC 向 GPT 返回的内容：

- **Execution Report**：执行结果摘要（做了什么、改了什么文件）
- **Research Findings**：深度研究的发现和建议
- **Blocked Signals**：需要决策的阻塞点
- **Artifact Paths**：生成的文件路径列表

### 3.3 Claude Code → Codex

CC 向 Codex 提交的内容：

- **Review Package**：审查包（见第 5 节）

### 3.4 Codex → GPT

Codex 向 GPT 返回的内容：

- **Review Feedback**：结构化审查反馈（见第 6 节）

```
GPT ──(Spec)──► CC ──(Review Package)──► Codex
 ▲                                    │
 │            (Feedback)               │
 └────────────────────────────────────┘
```

## 4. GPT → Claude Code 交接协议

### 4.1 Spec 格式

每次交接必须包含以下字段：

```yaml
task_id: "TASK-001"
title: "简明任务标题"
layer: execution          # execution | review
priority: P1              # P0-P3
scope:                    # 影响范围
  files: [list of files]
  dirs: [list of dirs]
description: |
  任务的详细描述，包含背景和目标
acceptance_criteria:
  - "验收条件 1"
  - "验收条件 2"
constraints:
  - "约束条件 1"
  - "不做什么（Negative constraints 同样重要）"
references:
  - "docs/path/to/ref.md"
  - "docs/path/to/another.md"
```

### 4.2 Context Package 规则

- **必须包含**：当前仓库的 AGENTS.md 摘要、相关 Skill 描述、已有代码的关键片段
- **禁止包含**：无关的上下文、模糊的方向性描述
- **优先级声明**：当约束冲突时，明确哪个优先

### 4.3 交接检查清单

- [ ] task_id 唯一且与 Issue/PR 对应
- [ ] acceptance_criteria 可量化、可验证
- [ ] constraints 包含负面约束（"不要做什么"）
- [ ] references 指向仓库内已存在的文档
- [ ] scope 精确到文件级别

## 5. Claude Code → Codex 审查包

### 5.1 审查包结构

```yaml
review_id: "REV-001"
task_id: "TASK-001"          # 关联的 task_id
type: code_review | report_review
author: claude-code
artifacts:
  - path: "src/feature/new-module.ts"
    change_type: created | modified | deleted
    description: "变更说明"
  - path: "tests/feature/new-module.test.ts"
    change_type: created
    description: "对应的测试文件"
summary: |
  本次变更的整体说明
spec_compliance:
  - criterion: "验收条件 1"
    status: met | partially_met | not_met
    evidence: "具体证据"
  - criterion: "验收条件 2"
    status: met
    evidence: "具体证据"
open_questions:
  - "需要 Codex 重点审查的问题"
  - "不确定的设计决策"
```

### 5.2 审查包要求

- 每个 `acceptance_criteria` 必须有对应的 `spec_compliance` 条目
- `open_questions` 至少 1 条——没有疑问的实现往往藏着问题
- 路径必须是仓库内的相对路径

## 6. Codex → GPT 反馈格式

### 6.1 反馈结构

```yaml
review_id: "REV-001"
task_id: "TASK-001"
verdict: approve | approve_with_notes | request_changes | reject
findings:
  - severity: critical | major | minor | nit
    category: correctness | inconsistency | over_engineering | risk | style
    location: "file:line 或章节"
    description: "问题描述"
    suggestion: "修复建议"
synthesis:
  overall_assessment: "整体评价"
  key_concerns:
    - "核心关注点 1"
    - "核心关注点 2"
  recommendations:
    - "建议 1"
    - "建议 2"
```

### 6.2 反馈分级说明

| Severity | 含义 | 处理方式 |
|----------|------|----------|
| critical | 必须修复，阻塞合并 | CC 必须修复后重新提交 |
| major | 应该修复 | GPT 决策是否修复 |
| minor | 建议修复 | 可选修复 |
| nit | 风格偏好 | 忽略或顺手修复 |

## 7. 常见协作模式

### 7.1 Deep Research（深度研究）

```
GPT: 提出研究问题 + 范围约束
 ↓
CC:  深度研究本地仓库 → 生成结构化报告
 ↓
GPT: 综合报告 → 做出决策或进一步提问
```

适用场景：理解遗留代码、技术选型调研、架构分析

### 7.2 Spec-Driven Implementation（Spec 驱动实现）

```
GPT: 撰写 Spec（含 acceptance_criteria）
 ↓
CC:  按 Spec 实现 → 生成审查包
 ↓
Codex: 审查 → 返回反馈
 ↓
GPT: 综合 CC 实现结果 + Codex 反馈 → 决策
```

适用场景：新功能开发、重构、Bug 修复

### 7.3 Iterative Refinement（迭代精炼）

```
CC:  产出初版实现/报告
 ↓
Codex: 发现问题 → 返回反馈
 ↓
CC:  根据反馈精炼
 ↓
Codex: 二次审查（可选）
 ↓
GPT: 最终审批
```

适用场景：复杂实现需要多轮打磨、高风险变更

### 7.4 Pattern Selection Guide（模式选择指南）

| 场景 | 推荐模式 | 原因 |
|------|----------|------|
| 不理解现有代码 | Deep Research | 需要全面理解后再决策 |
| 新功能开发 | Spec-Driven | 明确目标，减少返工 |
| 已有初版但质量不明 | Iterative Refinement | 多轮审查保证质量 |
| 紧急热修复 | GPT 直接指导 CC | 跳过审查，快速响应 |

## 8. my-claude 仓库在三层模型中的角色

### 8.1 作为知识中枢

my-claude 仓库不是单纯的代码仓库，而是三层协作的**知识基础设施**：

- **Spec 存储**：`docs/specs/` 存放 GPT 撰写的 Spec
- **工作报告**：`docs/reports/` 存放 CC 生成的研究报告
- **审查记录**：`docs/reviews/` 存放 Codex 的审查反馈
- **决策日志**：`docs/decisions/` 存放 GPT 的最终决策

### 8.2 各层如何使用本仓库

| 层级 | 使用方式 |
|------|----------|
| GPT | 通过 references 字段引用仓库文档，确保 Spec 有据可依 |
| CC | 读取仓库中的 Spec 和参考文档，执行实现，写入产物 |
| Codex | 读取 Spec 和 CC 的实现产物，输出审查反馈到 docs/reviews/ |

### 8.3 .claude 生态系统

`.claude/` 目录维护 CC 层的配置：

- `CLAUDE.md` / `AGENTS.md`：行为规范和系统提示
- `skills/`：Skill 定义（自动化工作流片段）
- `agents/`：Sub-agent 配置

这些配置是 CC 层的"肌肉记忆"，确保执行一致性。

## 9. 工具路由

### 9.1 GPT 层工具

| 工具类别 | 具体工具 | 用途 |
|----------|----------|------|
| Web 搜索 | BraveSearch / Firecrawl | 信息检索、技术调研 |
| 文档查询 | Context7 | SDK/框架文档查询 |
| 多模态理解 | 图片理解 | 设计稿分析、截图理解 |
| 知识管理 | Memory MCP | 跨会话知识持久化 |
| 项目管理 | Linear MCP | Issue 创建与追踪 |

### 9.2 Claude Code 层工具

| 工具类别 | 具体工具 | 用途 |
|----------|----------|------|
| 文件操作 | Read / Edit / Write | 仓库文件的增删改查 |
| 代码搜索 | Grep / Glob | 代码模式搜索 |
| Bash 执行 | Bash tool | 本地命令执行（git, npm, etc.） |
| 浏览器 | Chrome DevTools | Web 应用的调试与验证 |
| 数据库 | PostgreSQL MCP | 数据库查询与验证 |
| 文件系统 | Filesystem MCP | 跨目录文件操作 |

### 9.3 Codex 层工具

| 工具类别 | 具体工具 | 用途 |
|----------|----------|------|
| 代码审查 | 内置 diff 分析 | 审查代码变更 |
| 逻辑分析 | 推理能力 | 发现逻辑漏洞和矛盾 |
| 风格检查 | 编码规范知识 | 判断过度工程和风格问题 |
| 网络搜索 | Web 搜索 | 验证技术方案的可行性 |

### 9.4 工具路由原则

1. **每个层级只用自己层级的工具**——避免跨层工具混用
2. **GPT 不直接操作文件**——通过 Spec 指导 CC 执行
3. **CC 不做策略决策**——只执行和研究，决策权在 GPT
4. **Codex 不直接修改代码**——只审查和反馈

---

## Source Material

- `reorg/00-executive-summary.md` — 仓库重组执行摘要，包含三层模型的原始定义
- `.claude/AGENTS.md` — Claude Code 行为规范
- `.claude/skills/` — Skill 体系定义
- `docs/specs/` — Spec 文档模板与实践