---
title: "工作流注册表"
type: registry
status: active
updated: 2026-05-30
owner: threetwoa
---

# 工作流注册表

本文件记录 my-claude 仓库中定义的所有工作流。

## 1. Deep Research

| 字段 | 值 |
|------|-----|
| **Name** | Deep Research |
| **Description** | GPT 发起研究请求 → Claude Code 执行深度调研 → 返回结构化报告 |
| **Trigger** | 用户提交研究问题，或 GPT 模式下自动触发 |
| **Steps** | 1. 接收问题 → 2. 拆解子问题 → 3. 多源搜索 → 4. 交叉验证 → 5. 生成报告 |
| **Input** | 研究问题 (string)，可选深度级别 |
| **Output** | 结构化 Markdown 报告，含来源引用与置信度 |
| **Status** | ✅ active |

## 2. Report Distillation

| 字段 | 值 |
|------|-----|
| **Name** | Report Distillation |
| **Description** | 将原始研究报告蒸馏为 docs/ 下的持久知识文档 |
| **Trigger** | 调用 `/distill` 命令，或 Deep Research 完成后自动触发 |
| **Steps** | 1. 读取原始报告 → 2. 提取关键洞察 → 3. 去重归并 → 4. 写入 docs/ → 5. 更新索引 |
| **Input** | 报告路径或原始 Markdown 内容 |
| **Output** | docs/ 下的知识文档，索引已更新 |
| **Status** | ✅ active |

## 3. Repo Restructure

| 字段 | 值 |
|------|-----|
| **Name** | Repo Restructure |
| **Description** | 受控的仓库结构重构流程，确保每步可验证 |
| **Trigger** | 用户发起重构请求，或检测到结构违规时建议触发 |
| **Steps** | 1. 生成重构 plan → 2. 用户审批 → 3. 分步执行 → 4. 验证完整性 |
| **Input** | 目标结构描述或 diff 规范 |
| **Output** | 重构后的仓库结构与验证报告 |
| **Status** | ✅ active |

## 4. UI Workflow

| 字段 | 值 |
|------|-----|
| **Name** | UI Workflow |
| **Description** | 端到端 UI 开发流程：设计 → 实现 → 动画 → 评审 |
| **Trigger** | 用户请求创建/修改 UI 组件或页面 |
| **Steps** | 1. 设计方向探索 → 2. 生成界面代码 → 3. GSAP 动画集成 → 4. 代码评审 |
| **Input** | UI 需求描述、设计参考或 Figma 链接 |
| **Output** | 可运行的组件代码 + 动画效果 |
| **Status** | ✅ active |

## 5. Registry Update

| 字段 | 值 |
|------|-----|
| **Name** | Registry Update |
| **Description** | 扫描仓库变更，提取元数据，分类并写入注册表索引 |
| **Trigger** | 新增/修改 skill 或 workflow 文件后触发 |
| **Steps** | 1. 扫描 .claude/skills/ → 2. 提取 frontmatter → 3. 按类型分类 → 4. 写入索引文件 |
| **Input** | 文件系统变更事件 |
| **Output** | 更新后的 registry/*.md 索引文件 |
| **Status** | ✅ active |

## 6. Multi-Agent Collaboration

| 字段 | 值 |
|------|-----|
| **Name** | Multi-Agent Collaboration |
| **Description** | Orchestrator 分发任务 → 多 Agent 并行执行 → 验证并合并结果 |
| **Trigger** | 复杂任务需要拆分给多个专业 Agent 协作完成 |
| **Steps** | 1. Orchestrator 分析任务 → 2. 分发子任务 → 3. Agent 并行执行 → 4. 验证合并 |
| **Input** | 复合任务描述与 Agent 配置 |
| **Output** | 合并后的最终产物与执行日志 |
| **Status** | ✅ active |