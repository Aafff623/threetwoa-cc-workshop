---
name: update-registry
description: 扫描仓库，更新 registry/ 资产索引和决策日志。支持全量重建和一致性校验。用户显式触发或定期执行。
---

# /update-registry

扫描仓库所有 `.md` 文件，提取 frontmatter 信息，生成/更新资产索引和决策日志。

## 命令签名

```
/update-registry [--full] [--check-only]
```

### 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `--full` | flag | off | 从零重建所有索引，忽略缓存；适用于大规模结构变更后 |
| `--check-only` | flag | off | 仅检测异常，不写入任何文件；适用于 CI/预检 |

### 参数组合

| 组合 | 效果 |
|------|------|
| 无参数 | 增量扫描，更新索引，输出摘要 |
| `--full` | 全量重建所有索引文件 |
| `--check-only` | 仅检测异常，报告问题 |
| `--full --check-only` | 全量扫描检测异常，不写入文件 |

## 执行流程

### Step 1 — 扫描文件

- 使用 `Glob` 工具扫描所有 `.md` 文件
- 扫描范围：`docs/`、`reports/raw/`、`registry/`、`.claude/`、根目录
- 排除：`node_modules/`、`.git/`、`archive/`（归档文件单独统计）
- `--full` 模式：忽略 `.tmp/scan-result.json` 缓存，重新扫描
- 非全量模式：仅扫描 `git diff --name-only HEAD~1` 变更文件（增量更新）

### Step 2 — 提取 Frontmatter

- 逐个读取文件的 YAML frontmatter
- 提取字段：`title`、`type`、`status`、`owner`、`updated`、`source_files`、`seealso`
- 无 frontmatter 的文件记录为异常项

### Step 3 — 分类统计

按 `type` 分桶统计：

| type | 说明 |
|------|------|
| `reference` | 参考资料 |
| `workflow` | 工作流文档 |
| `principle` | 原则文档 |
| `command` | 命令定义 |
| `agent` | Agent 配置 |
| `report` | 原始报告 |
| `config` | 其他配置文件 |

按 `status` 统计：`active` / `draft` / `deprecated` / `archived`

### Step 4 — 异常检测

| 异常类型 | 规则 | 严重度 |
|---------|------|--------|
| 缺少 frontmatter | `.md` 文件（除 README 外）无 YAML 头 | ⚠️ 警告 |
| 断裂 source_files | `source_files` 引用路径不存在 | 🔴 错误 |
| 孤儿文档 | `docs/` 文件无 `source_files` 且未被 INDEX.md 引用 | ⚠️ 警告 |
| 过期文档 | `updated` 超过 90 天且 `status: active` | ℹ️ 提示 |
| 重复文档 | 同一 `title` 出现在多个文件中 | ⚠️ 警告 |
| 未索引文件 | 存在于目录但不在 asset-index.md 中 | ℹ️ 提示 |

### Step 5 — 写入索引（`--check-only` 跳过此步）

#### registry/asset-index.md

格式化索引文件，包含：

```markdown
# 资产索引

> 最后更新: YYYY-MM-DD HH:mm | 模式: full | 增量

## 按类型

### Reference (N)
| 文件 | 标题 | 状态 | 更新日期 |
|------|------|------|---------|
| docs/reference/foo.md | Foo 参考 | active | 2025-01-15 |

### Workflow (N)
...

## 按状态

- active: X | draft: Y | deprecated: Z

## 异常项
...
```

#### registry/decision-log.md

追加决策记录：

```markdown
## YYYY-MM-DD — registry update

- **触发**: 手动 / 定期 / --full
- **变更**: +N 新增, -M 移除, U 更新
- **异常**: A 错误, B 警告, C 提示
```

#### registry/.tmp/scan-result.json

机器可读的扫描结果缓存：

```json
{
  "timestamp": "YYYY-MM-DDTHH:mm:ss",
  "mode": "full",
  "files": [
    {
      "path": "docs/reference/foo.md",
      "frontmatter": { "title": "...", "type": "reference", ... },
      "hash": "sha256:...",
      "anomalies": []
    }
  ],
  "summary": { "total": 42, "by_type": {...}, "by_status": {...} }
}
```

### Step 6 — 输出摘要

```
╔════════════════════════════════╗
║   Registry 更新完成            ║
╠════════════════════════════════╣
║ 扫描文件:     42 个           ║
║ 新增资产:      3 个           ║
║ 更新资产:      5 个           ║
║ 移除资产:      1 个           ║
╠════════════════════════════════╣
║ 异常检测:                     ║
║  🔴 错误:      1 (断裂引用)   ║
║  ⚠️  警告:      2 (缺少元数据) ║
║  ℹ️  提示:      3 (过期文档)   ║
╠════════════════════════════════╣
║ 模式: full | 耗时: 1.2s      ║
╚════════════════════════════════╝
```

## 安全约束

- 不删除任何现有文件，索引文件为完全重写
- `--check-only` 模式不写入任何文件
- 使用 `write` 工具写入，禁止 PowerShell 写入含中文内容
- `scan-result.json` 写入 `.tmp/` 目录，应在 `.gitignore` 中排除

## 与其他命令协同

- `/distill-report` 完成后建议运行 `/update-registry` 更新索引
- `/restructure-repo` 执行 Phase 4 时调用本命令的逻辑更新索引
- 定期执行（建议每周）保持索引与实际状态同步