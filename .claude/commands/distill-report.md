---
name: distill-report
description: 将 reports/raw/ 原始报告提炼为 docs/ 长期知识文档。支持指定类型，质量门控，与 report-distiller agent 协同。
---

# /distill-report

将原始调研报告提炼为长期知识文档。这是 `report-distiller` agent 的命令入口。

## 命令签名

```
/distill-report [source_path] [--type reference|workflow|principle]
```

### 参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `source_path` | string | 无（交互选择） | 原始报告路径，如 `reports/raw/heroui/template-architecture.md` |
| `--type` | enum | 自动检测 | 输出文档类型：`reference`（参考资料）、`workflow`（工作流）、`principle`（原则） |

### 参数说明

- **source_path** 省略时，列出 `reports/raw/` 下所有未提炼的报告，由用户选择
- **--type** 省略时，根据报告内容自动推断：
  - 包含步骤/流程 → `workflow`
  - 包含架构/对比/规范 → `reference`
  - 包含理念/最佳实践/哲思 → `principle`

## 提炼流程

### Step 1 — 读取源报告

- 使用 `read` 工具（禁止 PowerShell）读取 `source_path`
- 如果 `source_path` 不存在，扫描 `reports/raw/` 列出可选报告

### Step 2 — 提取核心

- 提取核心论点（claim）、关键发现（finding）、实践建议（action item）
- 识别报告的结构层级：标题、小节、代码块、列表
- 标记可提炼的知识点 vs 上下文噪音

### Step 3 — 去重合并（Quality Gate 1）

- 扫描 `docs/` 目录，检查是否已有相同主题的文档
- 去重规则：
  - **完全重叠**（同一主题、同一框架版本）→ 合并到已有文档，追加 `source_files`
  - **部分重叠**（同一技术、不同版本/角度） → 保留独立文档，在两文档间添加 `seealso` 链接
  - **无重叠** → 新建文档

### Step 4 — 结构化输出

按文档类型使用对应模板：

#### reference 类型
```markdown
## 概述 → 核心概念 → 详细说明 → 参考
```

#### workflow 类型
```markdown
## 概述 → 前置条件 → 步骤详述 → 验证 → 故障排除
```

#### principle 类型
```markdown
## 概述 → 核心原则 → 实践案例 → 反模式
```

### Step 5 — 注入 Frontmatter（Quality Gate 2）

```yaml
---
title: "中文标题"
type: reference | workflow | principle
status: active
source_files:
  - "reports/raw/path/to/source.md"
created: YYYY-MM-DD
updated: YYYY-MM-DD
owner: threetwoa
seealso:
  - "docs/reference/related-topic.md"
---
```

- `title` 从源报告提取，翻译为中心标题
- `source_files` 必填，追溯来源
- `seealso` 仅在 Step 3 发现重叠时添加

### Step 6 — 写入文档（Quality Gate 3）

- 使用 `write` 工具写入（禁止 PowerShell，防止中文编码损坏）
- 写入后 **立即验证**：`read` 工具读取前 10 行，确认中文可读
- 如果验证失败，重新写入

### Step 7 — 更新索引

- 更新 `docs/INDEX.md`，添加新文档条目
- 更新 `registry/asset-index.md`（如果 `update-registry` 命令存在则提示用户运行）

## 输出格式

### 精炼文档路径规则

| 类型 | 路径模板 |
|------|---------|
| reference | `docs/reference/{slug}.md` |
| workflow | `docs/workflow/{slug}.md` |
| principle | `docs/principle/{slug}.md` |

`{slug}` 由标题生成：小写、中文保留、空格变 `-`、去除特殊字符。

### 文档结构示例

```yaml
---
title: "HeroUI 模板架构"
type: reference
status: active
source_files:
  - "reports/raw/heroui/template-architecture.md"
created: 2025-01-15
updated: 2025-01-15
owner: threetwoa
seealso:
  - "docs/reference/heroui-component-patterns.md"
---

## Source Material

- `reports/raw/heroui/template-architecture.md`

## 概述

HeroUI 模板架构的核心设计理念是...

## 核心概念

### 组件槽位系统
...

## 参考

- [HeroUI 官方文档](https://heroui.com)
```

## 错误处理

| 场景 | 处理 |
|------|------|
| 源文件不存在 | 列出 `reports/raw/` 可选文件，提示选择 |
| 源文件为空 | 终止，报告 `源报告无内容` |
| 源文件无 frontmatter | 继续，仅提取正文内容 |
| 源文件缺少关键章节 | 标记为 `⚠️ 部分提炼`，补写缺失章节占位符 |
| 目标文件已存在 | 提示：`合并` / `覆盖` / `跳过` |
| 写入后验证失败 | 重试一次，再次失败则终止并报错 |

## 与 report-distiller Agent 协同

本命令是 `report-distiller` agent 的入口。Agent 负责：

1. 内容理解与提炼（核心智能）
2. 去重判断与合并策略
3. 结构化模板选择

本命令（`/distill-report`）负责：

1. 参数解析与路径验证
2. 流程编排与质量门控
3. 文件 I/O（写入、验证、索引更新）

## 安全约束

- 不修改原始报告（`reports/raw/` 只读）
- 保留原始报告完整副本
- 多份报告涉及同一主题时合并去重
- 使用 `write` 工具写入，禁止 PowerShell 写入含中文内容