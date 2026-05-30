---
name: restructure-repo
description: 执行仓库重组：创建目录、移动文件、更新索引、生成日志。支持 dry-run 和分阶段执行，仅在审批后执行。
---

# /restructure-repo

根据迁移计划执行仓库结构重组。这是**破坏性操作**（移动文件），必须经用户明确审批后执行。

## 命令签名

```
/restructure-repo [--dry-run] [--phase N]
```

### 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `--dry-run` | flag | off | 模拟执行，仅输出即将发生的操作，不实际移动任何文件 |
| `--phase N` | int | 0（全部） | 从指定阶段开始执行（1-5），用于断点续跑 |

## Pre-flight 检查

执行任何操作前，必须通过以下检查：

1. **迁移计划存在** — `reorg/05-migration-plan.md` 必须存在且非空
2. **Git 状态干净** — `git status` 必须显示 clean working tree（`--dry-run` 模式豁免）
3. **映射表可解析** — 迁移计划中至少包含 1 条有效的 `| 源路径 | 目标路径 | 操作 |` 映射行
4. **源文件存在** — 每条映射的源路径必须指向实际存在的文件（警告但不阻塞）
5. **目标无冲突** — 目标路径不应已存在同名文件（`copy` 操作豁免）

**检查失败处理：**
- 缺少迁移计划 → 终止，提示先运行 `/analyze-repo` 生成分析报告
- Git dirty → 终止，提示 `git stash` 或 `git commit` 后重试
- 源文件缺失 → 记录警告，跳过该条目继续执行

## 分阶段执行

### Phase 1 — 验证计划

- 读取 `reorg/05-migration-plan.md`
- 解析所有映射行，构建 `{ source, target, operation }[]`
- 逐条验证文件存在性和目标冲突
- 输出：验证摘要（总条目数、有效条目、警告数）

### Phase 2 — 创建目录

- 收集所有目标路径的目录部分
- 使用 `mkdir -p` 创建缺失目录
- 输出：新建目录列表
- **此阶段幂等**，重复执行不会出错

### Phase 3 — 移动/复制文件

按操作类型逐条执行：

| 操作 | 执行方式 | 备注 |
|------|---------|------|
| `move` | `git mv source target` | 保留 git 历史 |
| `copy` | `cp source target` | 原文件不动 |
| `distill` | 读取源文件 → 添加 frontmatter → `write` 工具写入目标 | 必须包含 `source_files` |
| `archive` | `git mv source archive/YYYY-MM-DD/source` | 按日期归档 |

- 每条操作执行后立即记录到 execution log
- `distill` 操作需验证写入内容的前 10 行中文可读

### Phase 4 — 更新索引

- 更新 `docs/INDEX.md` — 反映新的文件位置
- 更新 `registry/asset-index.md` — 重扫所有 frontmatter
- 如果存在 `registry/decision-log.md`，追加重组决策记录

### Phase 5 — 验证

- 检查断裂链接：`docs/` 内部 `[[wikilink]]` 和 `[markdown](links)` 是否指向已移动文件
- 检查孤儿文件：是否有未被 INDEX.md 引用的文件
- 检查空目录：是否有残留的空目录
- 输出：验证报告，列出所有问题

## Dry-run 模式

`--dry-run` 模式：

1. 执行所有 pre-flight 检查（跳过 git status 检查）
2. 模拟所有 5 个阶段，输出每个操作的预览
3. **不移动、不创建、不修改任何文件**
4. 生成 `reorg/06-dry-run-log.md` 而非 execution-log

```
[DRY-RUN] Phase 3: move reports/raw/old-report.md → docs/reference/new-report.md
[DRY-RUN] Phase 3: distill reports/raw/tech-stack.md → docs/principle/tech-stack.md
[DRY-RUN] Phase 4: 更新 docs/INDEX.md (3 处引用变更)
```

## Rollback 策略

因所有文件移动使用 `git mv`，rollback 依赖 git：

```bash
# 查看重组提交
git log --oneline -5

# 回滚到重组前的提交
git reset --hard <pre-restructure-commit>

# 或仅撤销最近一次重组提交（保留工作区变更）
git reset --soft HEAD~1
```

- 重组完成后自动 `git add -A && git commit -m "restructure: 执行迁移计划"`
- **绝不 `git push`** — push 需用户手动执行

## 审批流程

```
用户: /restructure-repo
Claude: 已读取迁移计划，涉及 X 个文件操作。Pre-flight 检查通过。
        操作摘要：move=N, copy=N, distill=N, archive=N
        请确认：是否执行？输入 "Approve restructure" 继续。
用户: Approve restructure
Claude: 开始执行 Phase 1-5...
```

## 输出

执行日志写入 `reorg/06-execution-log.md`，格式如下：

```markdown
# 重组执行日志

- **日期**: YYYY-MM-DD HH:mm
- **模式**: full | dry-run | phase-N
- **总条目**: X（成功: Y, 跳过: Z, 失败: W）

## Phase 1 — 验证
...

## Phase 2 — 目录创建
...

## Phase 3 — 文件操作
| # | 操作 | 源 | 目标 | 状态 |
|---|------|----|------|------|
| 1 | move | ... | ... | ✅ |
| 2 | distill | ... | ... | ⚠️ 跳过：源文件缺失 |

## Phase 4 — 索引更新
...

## Phase 5 — 验证
...
```

## 安全约束

- 绝不删除任何文件（仅 move 或 archive）
- 原始报告必须保留在 `reports/raw/` 或 `archive/`
- `distill` 产物必须包含 `source_files` frontmatter
- 执行前必须获得用户明确批准
- 使用 `write` 工具写入文件，禁止 PowerShell 写入含中文内容