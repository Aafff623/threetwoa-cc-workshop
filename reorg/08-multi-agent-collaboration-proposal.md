---
title: "多 Agent 协作分工方案"
type: proposal
status: draft
updated: 2026-05-30
owner: threetwoa
---

# 多 Agent 协作分工方案

## 一、问题诊断：刚才为什么慢

### 1.1 实际执行路径（串行）

刚才的迁移执行了 **8 个串行阶段**：

```
创建目录 → Move文件 → Archive文件 → Distill文档 → 创建门面文件
    → 创建.claude/配置 → 补充Source Material → 归档temp_task.md
```

**耗时分析**（估算）：

| 阶段 | 耗时 | 是否可并行 |
|------|------|-----------|
| 创建目录 | 2s | ❌ 必须先完成 |
| Move文件 | 5s | ⚠️ 部分可与Archive并行 |
| Archive文件 | 3s | ⚠️ 部分可与Move并行 |
| Distill文档（9个） | 60s | ✅ 9个文件完全可并行 |
| 创建门面文件（7个） | 20s | ✅ 完全可并行 |
| 创建.claude/配置（11个） | 30s | ✅ 完全可并行 |
| 补充Source Material（8个） | 25s | ✅ 完全可并行 |
| 归档temp_task.md | 2s | ⚠️ 可与最后阶段并行 |

**理论最优**：如果全部并行，总耗时 ≈ **创建目录(2s) + max(并行批次) ≈ 15-20s**  
**实际耗时**：~30 分钟  
**效率损失**：约 **90-95%** 的时间花在等待串行 I/O 上

### 1.2 根因

1. **单线程执行**：所有文件操作通过一个 PowerShell 脚本串行完成
2. **无任务拆分**：没有将 "读取→分析→写入" 拆分为独立子任务
3. **无状态共享**：每个步骤之间没有共享状态，反复读取同一份源文件
4. **等待阻塞**：每个 `Write` 操作等待完成才开始下一个

---

## 二、多 Agent 协作方案

### 2.1 核心设计原则

1. **分而治之**：把大任务拆为独立子任务，每个 Agent 只负责一个子任务
2. **并行执行**：无依赖的子任务同时启动
3. **状态共享**：通过 `registry/` 中的临时状态文件协调
4. **最终汇总**：一个 Agent 汇总所有结果，生成最终报告

### 2.2 Agent 分工架构

```
┌─────────────────────────────────────────────────────────────┐
│                    主控 Agent（调度）                         │
│              负责任务拆分、派发、汇总                         │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
      ┌────────▼────────┐            ┌───────▼────────┐
      │   Phase 1: 侦察  │            │  Phase 2: 执行  │
      │   （3个并行Agent）│            │ （4个并行Agent）│
      └────────┬────────┘            └───────┬────────┘
               │                              │
    ┌──────────┼──────────┐        ┌─────────┼─────────┐
    │          │          │        │         │         │
┌───▼───┐ ┌──▼───┐ ┌──▼───┐  ┌───▼──┐ ┌──▼───┐ ┌──▼───┐ ┌──▼───┐
│扫描员 │ │审查员 │ │安全员│  │格式化│ │链接  │ │索引  │ │配置  │
└───┬───┘ └──┬───┘ └──┬───┘  └───┬──┘ └──┬───┘ └──┬───┘ └──┬───┘
    │        │        │          │       │        │        │
    └────────┴────────┘          └───────┴────────┴────────┘
               │                              │
               └──────────────┬───────────────┘
                              │
                    ┌─────────▼─────────┐
                    │  Phase 3: 综合验证  │
                    │   （1个Agent）      │
                    └─────────────────────┘
```

---

## 三、Agent 详细分工

### Agent 1: 仓库扫描员（Repo Scanner）

**职责**：读取所有文件，提取元数据，生成分类列表

**输入**：仓库根路径
**输出**：`registry/.scan-result.json`

**执行内容**：
1. 扫描所有 `.md` 文件（Glob）
2. 读取每个文件的 frontmatter
3. 统计：文件数、总大小、分类分布、无 frontmatter 文件列表
4. 检测孤儿文件（无 source_files 的 docs/ 文件）
5. 输出 JSON 格式的扫描结果

**耗时**：~5s（读取 50+ 文件）

---

### Agent 2: 内容审查员（Content Auditor）

**职责**：检查文档质量、来源追溯、格式一致性

**输入**：仓库根路径 + Agent 1 的扫描结果
**输出**：`registry/.audit-result.json`

**执行内容**：
1. 检查每个 distill 文档是否有 `## Source Material` 章节
2. 检查 frontmatter 是否完整（title, type, status, source_files, updated, owner）
3. 检查相对链接是否断裂
4. 检查命名规范（kebab-case）
5. 输出问题列表（文件路径 + 问题描述 + 建议修复）

**耗时**：~8s（分析 50+ 文件）

---

### Agent 3: 安全扫描员（Security Scanner）

**职责**：扫描 secrets、敏感信息

**输入**：仓库根路径
**输出**：`registry/.security-scan.json`

**执行内容**：
1. 扫描所有文本文件中的 secrets 模式
2. 检测：API keys, tokens, passwords, 私钥
3. 标记风险等级（高危/中危/低危）
4. 输出安全报告（位置 + 模式 + 建议）

**耗时**：~3s（Grep 扫描）

---

### Agent 4: 文档格式化员（Doc Formatter）

**职责**：为无 frontmatter 的文件添加 frontmatter，统一格式

**输入**：Agent 1 扫描结果中标记为 "no-frontmatter" 的文件列表
**输出**：格式化后的文件

**执行内容**：
1. 为每个文件推断合适的 type（从路径推断）
2. 添加标准 frontmatter
3. 统一标题层级
4. 不修改原始报告（reports/raw/ 跳过）

**耗时**：~2s/文件，10 个文件并行 ≈ **5s**

---

### Agent 5: 链接修复员（Link Fixer）

**职责**：扫描并修复所有相对链接

**输入**：Agent 2 审计结果中标记为 "broken-link" 的问题
**输出**：修复后的文件

**执行内容**：
1. 扫描所有 `.md` 中的相对链接
2. 检测目标文件是否存在
3. 修复断裂链接（更新路径或标记为 TODO）
4. 更新 `docs/INDEX.md` 中的链接

**耗时**：~5s（扫描 50+ 文件）

---

### Agent 6: 索引更新员（Index Updater）

**职责**：更新所有索引文件

**输入**：Agent 1 扫描结果
**输出**：`docs/INDEX.md`, `registry/asset-index.md`

**执行内容**：
1. 读取所有文件的 frontmatter
2. 按目录分类生成索引表格
3. 更新 docs/INDEX.md（文档索引）
4. 更新 registry/asset-index.md（资产索引）
5. 检测新增/删除/变更的文件

**耗时**：~5s

---

### Agent 7: .claude/ 配置生成员（Config Generator）

**职责**：创建/更新 .claude/ 目录下的配置

**输入**：仓库结构 + 用户需求
**输出**：`.claude/` 下的 agents/commands/rules

**执行内容**：
1. 根据仓库特点生成 agents（如 repo-cartographer）
2. 生成 commands（如 distill-report, update-registry）
3. 生成 rules（如 file-organization, no-secrets）
4. 更新 `.claude/README.md`

**耗时**：~10s（并行生成 10+ 个配置）

---

### Agent 8: 综合验证员（Verifier）

**职责**：汇总所有 Agent 结果，生成最终验证报告

**输入**：所有 Agent 的输出
**输出**：`reorg/verification-report.md`

**执行内容**：
1. 读取所有子 Agent 的输出
2. 统计：修改文件数、新增文件数、发现问题数、修复数
3. 生成最终文件树
4. 列出剩余 TODOs
5. 生成风险报告

**耗时**：~5s

---

## 四、并行执行流程

```
T+0s   主控 Agent 启动
       ├── 派发 Agent 1（扫描员）
       ├── 派发 Agent 2（审查员）
       ├── 派发 Agent 3（安全员）
       │
T+5s   Agent 1 完成 → 触发 Agent 4, 6, 7
       ├── 派发 Agent 4（格式化员）
       ├── 派发 Agent 6（索引更新员）
       ├── 派发 Agent 7（配置生成员）
       │
T+8s   Agent 2 完成 → 触发 Agent 5
       ├── 派发 Agent 5（链接修复员）
       │
T+10s  Agent 3 完成
T+15s  Agent 4, 5, 6, 7 完成
       ├── 派发 Agent 8（验证员）
       │
T+20s  Agent 8 完成
       └── 主控 Agent 汇总，向用户汇报
```

**理论总耗时**：~20s（vs 串行 30 分钟）

---

## 五、状态协调机制

Agent 之间通过 `registry/.tmp/` 目录共享状态：

```
registry/.tmp/
├── scan-result.json        ← Agent 1 输出
├── audit-result.json       ← Agent 2 输出
├── security-scan.json      ← Agent 3 输出
├── format-queue.json       ← Agent 4 输入（从 scan-result 生成）
├── link-fix-queue.json     ← Agent 5 输入（从 audit-result 生成）
└── final-verification.json ← Agent 8 输出
```

每个 Agent 写入自己的输出文件，不修改其他 Agent 的文件。

---

## 六、与现有配置的衔接

### 已有的 Agent（2 个）

| Agent | 角色 | 如何融入多 Agent 方案 |
|-------|------|----------------------|
| repo-cartographer | 仓库地图绘制 | **升级为 Agent 1**，自动触发 |
| report-distiller | 报告提炼 | **升级为 Agent 4**，与格式化员合并 |

### 已有的 Command（3 个）

| Command | 角色 | 如何融入 |
|---------|------|---------|
| /restructure-repo | 仓库重组 | 由主控 Agent 调用 |
| /distill-report | 报告提炼 | 由 report-distiller Agent 调用 |
| /update-registry | 更新索引 | 由 Agent 6 调用 |

---

## 七、实施建议

### 7.1 立即可做的优化

1. **将 TODO 任务改为并行**：下次维护时，用 `parallel()` 同时启动多个 Agent
2. **提取共享状态**：建立 `registry/.tmp/` 作为 Agent 间通信目录
3. **标准化 Agent 输出**：每个 Agent 输出 JSON，方便机器解析

### 7.2 下一步实现

1. 将本方案写入 `.claude/agents/`（作为 workflow-orchestrator agent）
2. 创建 `registry/.tmp/` 目录和状态文件模板
3. 在下次仓库维护时验证并行效率

---

## 八、风险与约束

| 风险 | 缓解措施 |
|------|---------|
| Agent 冲突（同时写同一文件） | 每个 Agent 只写自己负责的文件 |
| 状态文件丢失 | 主控 Agent 备份所有中间状态 |
| 并行过多导致 I/O 瓶颈 | 限制同时运行的 Agent 数为 CPU 核心数 - 1 |
| 依赖循环 | 主控 Agent 检查依赖图，拒绝循环依赖 |

---

*本方案旨在将串行执行升级为并行协作，理论效率提升约 90x。*
