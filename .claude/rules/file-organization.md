---
name: file-organization
description: 强制文件按目标架构存放。当创建新文件或移动文件时触发。定义路由规则、命名规范、禁止模式和迁移流程。
---

# File Organization 规范

## 触发条件

以下任一条件满足时触发：
- 在仓库中创建新文件
- 将文件移动到新目录
- 在根目录创建 `.md` 文件（`README.md` 和 `00-START-HERE.md` 除外）

## 1. 路由规则（详细版）

| 文件类型 | 目标目录 | 子类示例 |
|---------|---------|---------|
| 原始调研报告 | `reports/raw/` | 技术调研、安装记录、踩坑日志、benchmark 记录 |
| 精炼知识文档 | `docs/` | 见下方 docs/ 子类路由 |
| 可复用模板 | `templates/` | 项目模板、设计系统模板、检查清单 |
| 索引/注册文件 | `registry/` | 资产索引、决策记录、manifests |
| 配置文件 | `.claude/` | CLAUDE.md、settings.json、agents/、commands/、rules/ |
| 历史文件 | `archive/YYYY-MM-DD/` | 过期文档、一次性 handoff、临时追踪 |

### docs/ 子类路由

| 子目录 | 用途 | 示例文件 |
|-------|------|---------|
| `docs/claude-code/` | Claude Code 使用规范与工作流 | setup.md、workflow.md、troubleshooting.md |
| `docs/heroui/` | HeroUI / HeroUI Pro 组件库文档 | components.md、theming.md、pro-components.md |
| `docs/ui-workflow/` | UI 开发工作流与设计规范 | animation.md、gsap-checklist.md、responsive.md |
| `docs/<新类别>/` | 未来新增类别（按功能域划分） | 由新规则追加 |

**新 docs 子目录创建规则**：必须先在 `00-START-HERE.md` 的目录说明中注册，再创建目录。

## 2. 模板约定

| 模板文件 | 用途 | 命名模式 |
|---------|------|---------|
| `DESIGN.md` | 设计系统约束与视觉规范 | 固定名称，每个设计域一个 |
| `PRODUCT.md` | 产品需求与功能说明 | 固定名称，每个产品一个 |
| `gsap-checklist.md` | GSAP 动画检查清单 | kebab-case，功能域前缀 |
| `*-checklist.md` | 各类检查清单 | `{domain}-checklist.md` |

模板文件存放在 `templates/` 目录，使用时复制到目标位置并填写内容。

## 3. 注册文件命名

| 文件 | 用途 | 位置 |
|------|------|------|
| `index.json` | 目录内容索引 | `registry/index.json` |
| `tags.json` | 所有标签的定义与映射 | `registry/tags.json` |
| `assets.json` | 可复用资源清单 | `registry/assets.json` |
| `manifests/*.json` | 每个资产包的详细 manifest | `registry/manifests/` |

注册文件必须通过 `write` 工具写入，禁止用 PowerShell 写含中文的 JSON。

### 例外：索引的人类可读视图

`registry/*.md` 允许作为同名 JSON 索引的**人类可读视图**存在，功能上必须与 JSON 索引保持同步：

| MD 文件 | 对应的 JSON 索引 | 说明 |
|---------|-----------------|------|
| `registry/asset-index.md` | `registry/assets.json` / `registry/index.json` | 资产索引的人类可读版本 |
| `registry/decision-log.md` | 无（纯日志） | 决策记录，按时间顺序追加 |
| `registry/skill-registry.md` | `registry/manifests/skills-manifest.json` | Skill 注册表的人类可读版本 |
| `registry/workflow-registry.md` | `registry/manifests/commands-manifest.json` | 工作流注册表的人类可读版本 |

**约束**：
- MD 索引不得存放与 JSON 索引冲突的内容
- 新增 MD 索引必须在此表中注册，并明确对应的 JSON 来源
- 禁止在 `registry/` 下存放非索引类 MD 文档（如调研报告、安装记录）

## 4. Frontmatter 要求（按目录类型）

### reports/raw/ 下的文件

```yaml
---
title: "报告标题"
type: investigation | benchmark | comparison | installation
status: draft | active | archived
date: YYYY-MM-DD
scope: "调研范围"
author: threetwoa
tags: [可选标签]
---
```

### docs/ 下的文件

```yaml
---
title: "文档标题"
category: claude-code | heroui | ui-workflow | <新类别>
last_updated: YYYY-MM-DD
related_reports:
  - reports/raw/YYYY-MM-DD-topic.md
---
```

### templates/ 下的文件

```yaml
---
name: "模板名称"
purpose: "模板用途说明"
variables: [可选：模板中的变量列表]
---
```

## 5. 禁止模式与解释

| 禁止操作 | 原因 |
|---------|------|
| ❌ 在根目录创建 `.md` | 根目录只允许 `README.md` 和 `00-START-HERE.md` |
| ❌ 在 `docs/` 存放原始调研 | docs 是精炼知识，未经提炼的调研放 `reports/raw/` |
| ❌ 在 `reports/raw/` 存放精炼知识 | 报告是原始记录，精炼后应移至 `docs/` |
| ❌ 创建未在目标架构中定义的目录 | 新目录必须先在 `00-START-HERE.md` 注册 |
| ❌ 文件名含中文或空格 | 影响跨平台兼容性和命令行操作 |
| ❌ 在 `registry/` 存放非 JSON 文件 | 注册目录只存放结构化索引数据 |
| ❌ 在 `.claude/` 存放文档类内容 | `.claude/` 只用于 Claude Code 配置 |

## 6. 新文件检查清单

创建文件前必须回答：
1. **类型判断**：原始调研 → `reports/raw/`，精炼知识 → `docs/`，模板 → `templates/`
2. **目标读者**：自己 / 团队 / Claude Code？（Claude Code 配置放 `.claude/`）
3. **生命周期**：长期维护 → `docs/`，一次性使用 → `archive/`
4. **来源追溯**：是否有来源可追踪？是否需要 `source_files` 字段？

## 7. 文件迁移流程

当需要将文件从一个类别移到另一个类别时：

### reports/raw/ → docs/（提炼归档）

1. 在 `docs/` 对应子目录创建精炼版本
2. 精炼版 frontmatter 中添加 `related_reports` 指向原报告
3. 更新原报告的 `status: archived`
4. 将原报告移动到 `archive/YYYY-MM-DD/`
5. 在原路径创建 stub：`Moved → [docs/xxx](link)`

### 临时文件 → 正式目录

1. 确认内容已定稿
2. 重命名为规范格式（加日期前缀、kebab-case）
3. 移动到目标目录
4. 更新任何内部链接引用

### docs/ 子目录间迁移

1. 移动文件到新子目录
2. 更新 frontmatter `category` 字段
3. 检查并更新所有引用此文件的链接
4. 在 `registry/index.json` 中更新路径

## 8. 例外

- `reorg/` 目录用于存放重组规划，可临时存放
- `temp_*.md` 可在根目录存在，但完成后必须归档或删除
- `.claude/` 下的配置文件遵循自身规范，不适用 docs/ 规则