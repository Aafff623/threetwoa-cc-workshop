---
name: my-claude-repo-manager
description: 仓库索引管理、分类、归档与统计技能
allowed-tools:
  - Read
  - Write
  - Glob
  - Grep
  - Bash
user-invocable: true
---

# my-claude-repo-manager

仓库索引管理、分类、归档与统计技能。

## 触发短语

- "scan repo"
- "update index"
- "archive old docs"
- "repo statistics"
- "扫描仓库"
- "更新索引"
- "归档旧文档"
- "仓库统计"

## 描述

对 my-claude 仓库进行全面扫描、分类、索引更新、过期归档与统计生成。确保 registry 始终反映仓库真实状态，是 repo-cartographer agent 的核心操作技能。

## 核心能力

### 1. Scan & Classify（扫描与分类）

- 递归扫描仓库根目录，识别所有文件类型
- 按 `docs/`、`registry/`、`scripts/`、`agents/`、`skills/` 等目录分类
- 对未归类文件标记为 `unclassified`
- 输出扫描结果到 `registry/.tmp/scan-result.json`

### 2. Update Registry Indexes（更新注册索引）

- 读取扫描结果，更新 `registry/asset-index.md`
- 每个 asset 记录：路径、类型、最近修改时间、status
- 同步更新 `registry/decision-log.md` 记录本次变更决策
- 幂等操作：重复运行不产生重复条目

### 3. Archive Stale Docs（归档过期文档）

- 检索 `asset-index.md` 中标记为 `stale` 或超过 90 天未更新的条目
- 将过期文档移动到 `docs/archive/` 并保留原目录结构
- 更新 asset-index 中对应条目的 status 为 `archived`
- 在 decision-log 中追加归档记录

### 4. Generate Statistics（生成统计）

- 统计各目录文件数量、总行数、最近活跃度
- 输出摘要：文件分布饼图数据、活跃度热力数据
- 将统计摘要追加到 `decision-log.md` 的 stats 区段

## 与 repo-cartographer agent 的集成

本技能是 repo-cartographer agent 的执行层：

1. agent 调用 `scan repo` → 触发本技能的 Scan & Classify
2. agent 调用 `update index` → 触发 Update Registry Indexes
3. agent 调用 `archive old docs` → 运行完整归档流水线
4. agent 调用 `repo statistics` → 生成统计并输出摘要

## 与 update-registry command 的集成

- `update-registry` 命令仅执行 **步骤 2**（更新索引）
- 如需完整流程，优先使用技能而非单独命令
- `update-registry` 的输出可作为本技能步骤 2 的输入

## 读写文件

| 文件 | 读取 | 写入 |
|------|------|------|
| `registry/asset-index.md` | ✅ | ✅ |
| `registry/decision-log.md` | ✅ | ✅ |
| `registry/.tmp/scan-result.json` | ✅ | ✅ |
| `docs/archive/` | - | ✅（归档文件） |

## 质量门禁

> **每个操作必须更新 registry/ 下的文件。** 未更新 registry 的操作视为无效。

检查项：
- [ ] asset-index.md 是否包含本次变更
- [ ] decision-log.md 是否记录决策理由
- [ ] scan-result.json 是否反映最新扫描
- [ ] 归档文件是否在 destination 目录存在

## 使用示例

```
# 完整扫描 + 索引更新
scan repo and update index

# 仅归档
archive old docs

# 统计
give me repo statistics
```

## 边界与约束

- 不修改 `agents/` 目录下的 agent 定义文件
- 不删除任何文件，仅移动到 archive
- scan-result.json 为临时文件，每次扫描覆盖
- 统计数据不持久化单独文件，内嵌于 decision-log