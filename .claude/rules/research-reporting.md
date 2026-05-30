---
name: research-reporting
description: 规范 reports/ 目录下的原始调研报告格式。当在 reports/ 目录创建或编辑任何 .md 文件时触发。强制 frontmatter、命名、来源追踪和归档标准。
---

# Research Reporting 规范

## 触发条件

以下任一条件满足时触发：
- 在 `reports/` 目录（含任意深度子目录）创建 `.md` 文件
- 编辑 `reports/` 下已有的 `.md` 文件
- 将文件移动到 `reports/` 目录下

## 1. Frontmatter Schema

所有报告**必须**包含 YAML frontmatter。缺少任何必填字段 = 写入阻断。

### 必填字段

```yaml
---
title: "报告标题（可中文）"
type: investigation | benchmark | comparison | installation
status: draft | active | archived
date: YYYY-MM-DD          # 创建日期，归档时更新为归档日期
scope: "调研范围一句话描述"
author: threetwoa
---
```

### 可选字段

```yaml
source_files:             # 原始资料路径列表
  - reports/raw/2025-01-15-xxx.md
  - docs/claude-code/setup.md
tags:                     # 频道式标签，便于检索
  - heroui
  - animation
  - gsap
```

### type 字段说明

| type | 用途 | 示例 |
|------|------|------|
| `investigation` | 技术调研、可行性研究 | GSAP 与 Framer Motion 对比调研 |
| `benchmark` | 性能基准测试 | Bundle size 对比、渲染帧率测试 |
| `comparison` | 方案对比分析 | 三种状态管理库选型 |
| `installation` | 安装踩坑记录 | HeroUI Pro 接入实录 |

## 2. 命名规范

### 格式

`YYYY-MM-DD-<kebab-topic>.md`

### 正确示例

- `2025-05-30-gsap-vs-framer-motion.md` ✅
- `2025-05-30-heroui-pro-installation.md` ✅
- `01-gsap-basics.md` ✅ （仅在系列报告中使用序号前缀）

### 错误示例

- `调研报告.md` ❌ 中文文件名（中文放 frontmatter title）
- `gsap research.md` ❌ 含空格
- `GSAP_Learn.md` ❌ 用下划线而非 kebab-case
- `report.md` ❌ 缺少日期前缀且过于泛化

## 3. 内容模板

### investigation 类型

```markdown
---
title: "xxx 调研"
type: investigation
status: draft
date: 2025-05-30
scope: "评估 xxx 方案的可行性"
author: threetwoa
tags: [tag1, tag2]
---

## 背景
## 调研方法
## 发现
## 结论与建议

## Source Material
- 数据来源：xxx
- 参考文档：xxx
```

### benchmark 类型

```markdown
---
title: "xxx 基准测试"
type: benchmark
status: active
date: 2025-05-30
scope: "对比 xxx 与 xxx 的性能指标"
author: threetwoa
---

## 测试环境
## 测试用例
## 结果数据
## 结论

## Source Material
- 测试脚本：xxx
- 原始数据：xxx
```

### comparison 类型

```markdown
---
title: "xxx 方案对比"
type: comparison
status: active
date: 2025-05-30
scope: "对比三种 xxx 方案的优劣"
author: threetwoa
tags: [comparison, tag1]
---

## 方案概述
## 对比维度
## 评分矩阵
## 推荐

## Source Material
- 官方文档：xxx
```

### installation 类型

```markdown
---
title: "xxx 安装实录"
type: installation
status: active
date: 2025-05-30
scope: "记录 xxx 安装过程中的问题与解决方法"
author: threetwoa
---

## 环境信息
## 安装步骤
## 遇到的问题与解决
## 验证结果

## Source Material
- 官方文档：xxx
```

## 4. 来源追踪要求

每个报告末尾**必须**有 `## Source Material` 章节，至少包含一项来源：
- 数据来源 / 参考文档 / 访谈对象 / 测试脚本 / 原始数据
- 如果信息来自 Claude Code 交互，标注 `source: claude-code-session`

## 5. 归档标准

满足以下任一条件时，将 `reports/raw/` 中的文件移至 `archive/YYYY-MM-DD/`：
- 对应的 `docs/` 精炼版本已创建且稳定（>7 天无修改）
- 报告 `status` 标记为 `archived`
- 报告超过 90 天无修改

归档操作步骤：
1. 更新 frontmatter `status: archived`
2. 更新 `date` 为归档日期
3. 移动文件到 `archive/YYYY-MM-DD/`
4. 在原路径创建 stub 文件指向归档位置

## 6. 交叉引用规则

- 报告 → docs：`reports/raw/` 中的报告提炼后，在对应 `docs/` 文件中添加来源链接
- docs 中使用 `> 来源：[报告标题](../reports/raw/YYYY-MM-DD-topic.md)` 引用原始报告
- 报告中避免重复 docs 中已有的精炼内容，用链接替代：`详见 [docs](../docs/xxx.md)`

## 7. 禁止事项

- ❌ 禁止在报告中硬编码 API key、token、凭证
- ❌ 禁止包含个人隐私信息（邮箱、手机号等真实数据）
- ❌ 禁止直接复制受版权保护的内容（超过合理引用范围）
- ❌ 禁止无 frontmatter 的报告文件
- ❌ 禁止在 `reports/raw/` 存放精炼知识（应放 `docs/`）