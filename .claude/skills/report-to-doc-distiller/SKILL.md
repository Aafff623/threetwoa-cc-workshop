# report-to-doc-distiller

将原始报告提炼为长期知识文档的蒸馏技能。

## 触发短语

- "distill report"
- "refine knowledge"
- "convert report to doc"
- "提炼报告"
- "蒸馏知识"
- "报告转文档"

## 描述

将临时报告、调研笔记、原始分析等半结构化内容，通过 5 步蒸馏流水线转化为结构化的长期知识文档。产出物存入 `docs/` 目录，自动去重、标注来源、更新索引。

## 蒸馏流水线

### Step 1: Read Source（读取源文件）

- 接受路径或内容作为输入
- 支持格式：Markdown、纯文本、JSON
- 提取元信息：创建时间、作者（如有）
- 若源文件缺失，提示用户提供

### Step 2: Extract Core Insights（提取核心洞察）

- 识别报告中的关键结论、数据点、决策理由
- 过滤：去掉临时性描述、重复论述、情绪化表达
- 保留：可复用的知识、模式、教训、决策依据
- 输出为结构化的 insight 列表

### Step 3: Check Duplicates in docs/（去重检查）

- 扫描 `docs/` 下所有 `.md` 文件
- 对比 insight 列表与现有文档的 frontmatter `title` 和 `tags`
- 匹配策略：title 相似度 > 0.8 视为重复
- 如有重复：合并到已有文档，更新 `updated` 字段，跳过 Step 4
- 如无重复：继续 Step 4

### Step 4: Write Structured Doc（写入结构化文档）

输出文件路径：`docs/{type}-{slug}.md`

必须包含以下 frontmatter：

```yaml
---
title: 文档标题
type: insight | decision | pattern | lesson
status: active | archived
source_files:
  - path/to/original/report.md
updated: 2026-05-30
owner: agent | human
tags:
  - tag1
  - tag2
---
```

正文结构：
- **Summary**（1-2 句话概括）
- **Context**（背景与来源）
- **Key Insights**（编号列表）
- **Implications**（对后续行动的影响）
- **References**（源文件链接）

### Step 5: Update Indexes（更新索引）

- 追加条目到 `registry/asset-index.md`
- 追加决策记录到 `registry/decision-log.md`
- 确认索引与实际文件一致

## 质量检查清单

在输出前逐项确认：

- [ ] frontmatter 6 个必填字段完整且格式正确
- [ ] Summary 不超过 2 句话
- [ ] Key Insights 至少含 3 条编号条目
- [ ] 无重复文档（Step 3 已验证）
- [ ] source_files 路径指向真实文件
- [ ] registry/ 索引已更新
- [ ] 正文中无临时性措辞（如 "TODO"、"待确认"）

## 读写文件

| 文件 | 读取 | 写入 |
|------|------|------|
| 源报告（任意路径） | ✅ | - |
| `docs/*.md` | ✅ | ✅ |
| `registry/asset-index.md` | ✅ | ✅ |
| `registry/decision-log.md` | ✅ | ✅ |

## 边界与约束

- 仅处理文本类报告，不处理二进制文件
- 合并去重时不删除原文档，仅追加内容
- `type` 限定为四种：insight / decision / pattern / lesson
- 所有日期使用 ISO 8601 格式
- 不修改 `agents/` 或 `skills/` 目录

## 使用示例

```
# 从文件路径提炼
distill report from docs/research/api-analysis.md

# 从剪贴板内容提炼
refine knowledge: [粘贴内容]

# 批量提炼
convert all reports in docs/drafts/ to structured docs
```