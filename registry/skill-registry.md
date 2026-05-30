---
title: "技能注册表"
type: registry
status: active
updated: 2026-05-30
owner: threetwoa
---

# 技能注册表

本文件记录 my-claude 仓库引用的所有技能（内部 + 外部）。

## 内部技能

| Name | Type | Trigger | Description | Status | Location |
|------|------|---------|-------------|--------|----------|
| my-claude-repo-manager | internal | 仓库管理操作 | 管理 my-claude 仓库结构、索引与 README 生成 | ✅ active | `.claude/skills/my-claude-repo-manager/` |
| report-to-doc-distiller | internal | `/distill` 命令 | 将原始报告蒸馏为 docs/ 下的持久知识文档 | ✅ active | `.claude/skills/report-to-doc-distiller/` |

## 外部技能 — UI/设计

| Name | Type | Trigger | Description | Status | Location |
|------|------|---------|-------------|--------|----------|
| ui-ux-pro-max | external | UI/UX 设计任务 | 67 风格、96 色板、25 图表、13 技术栈的综合设计技能 | ✅ active | `~/.claude/skills/ui-ux-pro-max/` |
| design-taste-frontend | external | 前端设计任务 | 反模板化前端设计技能，审计驱动、预检严格 | ✅ active | `.claude/skills/taste-skill/` |
| heroui-react-pro | external | HeroUI React 组件 | HeroUI Pro React 组件库开发指导 | ✅ active | `~/.config/opencode/skill/heroui-react-pro/` |
| heroui-native-pro | external | HeroUI Native 组件 | HeroUI Pro Native (React Native) 组件开发指导 | ✅ active | `~/.config/opencode/skill/heroui-native-pro/` |
| heroui-pro-design-taste | external | HeroUI 设计规范 | HeroUI 设计系统 78 条设计原则 | ✅ active | `~/.config/opencode/skill/heroui-pro-design-taste/` |

## 外部技能 — 图表/可视化

| Name | Type | Trigger | Description | Status | Location |
|------|------|---------|-------------|--------|----------|
| baoyu-diagram | external | "画个图"、架构图 | 暗色主题专业 SVG 图表生成 | ✅ active | `~/.agents/skills/baoyu-diagram/` |
| baoyu-infographic | external | "信息图"、"可视化" | 21 布局 × 22 风格的专业信息图生成 | ✅ active | `~/.agents/skills/baoyu-infographic/` |
| baoyu-slide-deck | external | "PPT"、"slides" | 内容驱动的幻灯片图像生成 | ✅ active | `~/.agents/skills/baoyu-slide-deck/` |
| baoyu-cover-image | external | "cover"、"封面" | 5 维度文章封面图生成 | ✅ active | `~/.agents/skills/baoyu-cover-image/` |
| drawio-skill | external | drawio 图表需求 | .drawio XML 生成与本地导出 | ✅ active | `~/.claude/skills/drawio-skill/` |
| excalidraw-diagram | external | excalidraw 图表需求 | Excalidraw JSON 图表生成 | ✅ active | `~/.claude/skills/excalidraw-skill/` |
| mermaid | external | mermaid 图表需求 | Mermaid 多类型图表生成 | ✅ active | `~/.claude/skills/mermaid-skill/` |
| tldraw-skill | external | tldraw 图表需求 | .tldr JSON 生成与 PNG/SVG 导出 | ✅ active | `~/.claude/skills/tldraw-skill/` |
| ppt-master | external | "PPT"、"演示文稿" | 多格式 SVG 内容生成 → PPTX 导出 | ✅ active | `~/.agents/skills/ppt-master/` |

## 外部技能 — 动画/交互

| Name | Type | Trigger | Description | Status | Location |
|------|------|---------|-------------|--------|----------|
| gsap-core | external | GSAP 基础动画 | GSAP 核心动画 API 使用指导 | ✅ active | `gsap-skills` 集合 |
| gsap-timeline | external | GSAP 时间线 | GSAP Timeline 复杂编排指导 | ✅ active | `gsap-skills` 集合 |
| gsap-scrolltrigger | external | GSAP ScrollTrigger | 滚动驱动动画指导 | ✅ active | `gsap-skills` 集合 |
| gsap-react | external | GSAP + React | React 环境下 GSAP 集成指导 | ✅ active | `gsap-skills` 集合 |
| impeccable | external | 精致 UI 任务 | 高端 UI 审美与实现指导 | ✅ active | `~/.claude/skills/` |