---
title: "UI Workflow Routing — UI 工序路由"
category: ui-workflow
last_updated: 2026-05-31
---

# UI Workflow / MVP 工序路由

## 资产分层（L0 → L6）

```
L0 业务底盘层：Mkdirs
L1 视觉灵感层：MotionSites.ai Pro Prompts / getdesign.md / awesome-design-md
L2 设计判断层：taste.skill / frontend-design / DESIGN.md / GPT
L3 视觉实现层：Aceternity / Framer Motion / Tailwind CSS
L4 产品组件层：HeroUI v3
L5 工程执行层：Claude Code
L6 审查沉淀层：Codex / screenshots / git diff / reports
```

## 默认职责

| 资产 | 职责 | 不负责 |
|---|---|---|
| Mkdirs | 业务逻辑、CMS、认证、支付、目录站流程 | 视觉冲击力 |
| MotionSites | Hero / Landing 视觉方向和动态 prompt | 业务后端 |
| Aceternity | 动态营销组件、Hero、CTA、Features、Pricing | 全栈业务逻辑 |
| HeroUI v3 | App 内页、Dashboard、Form、Modal、Table、可访问组件 | 炫技动效 |
| taste.skill | 审美判断、质感、廉价感检测 | 代码实现 |
| frontend-design | 页面结构、视觉层级、布局推导 | 后端逻辑 |
| DESIGN.md | 统一 AI agent 的视觉语言 | 自动产出页面 |
| Claude Code | 执行和报告 | 最终方向拍板 |
| Codex | 审查和挑刺 | 设计方向拍板 |
| GPT | 判断、取舍、spec、整合 | 本地文件执行 |

## 默认 UI 落地顺序

```
业务底盘先跑通
→ 选视觉方向
→ 沉淀 DESIGN.md
→ 小范围移植 Aceternity / MotionSites 风格
→ 用 HeroUI v3 补产品级交互组件
→ Claude Code 执行
→ screenshots + git diff
→ Codex review
→ GPT 综合下一轮
```

## 目录站 / MVP / SaaS 推荐组合

```
主项目：Mkdirs
视觉方向：MotionSites prompts
营销组件：Aceternity
产品组件：HeroUI v3
审美约束：taste.skill + frontend-design + DESIGN.md
执行：Claude Code
审查：Codex
综合：GPT
```

## 页面/区域路由

| 页面/区域 | 主力来源 | 辅助来源 |
|---|---|---|
| 首页 Hero | MotionSites + Aceternity | taste.skill |
| 首页动态背景 | MotionSites + Aceternity | Framer Motion |
| Features 区块 | Aceternity | frontend-design |
| Pricing 页面 | Aceternity + 业务数据 | HeroUI 表格/按钮 |
| Tool 卡片列表 | 业务数据 + Aceternity 卡片 | HeroUI 控件 |
| 搜索/筛选 | 业务逻辑 + HeroUI | frontend-design |
| 登录/注册 | Auth 逻辑 + HeroUI | Aceternity 背景 |
| Dashboard | 业务数据 + HeroUI | 少量 Aceternity 装饰 |
| CMS / Studio 后台 | 原业务系统 | 默认不动 |
| Blog 页面 | 内容系统 + Aceternity 文章卡片 | getdesign.md |
| Sponsor / Submit 流程 | 业务逻辑 + HeroUI | Aceternity CTA |

## 动效选择

```
Framer Motion = 默认主动效层
GSAP = 复杂 timeline / ScrollTrigger / 高级动效时再上
CSS transition = 简单 hover / color / opacity
Goat = 灵感库，默认不进 P0 主线
```

## UI 任务停机条件

以下情况必须停下询问用户 / 准备 GPT 决策材料：

- MotionSites / Aceternity / HeroUI 三者风格冲突
- 是否替换业务底盘不明确
- 是否引入 GSAP 不明确
- 是否大规模改视觉系统
- 是否改变 DESIGN.md 主风格
- 是否影响认证、支付、CMS、提交审核等业务路径
- 视觉实现会侵入业务逻辑
- 动效方案影响性能或可访问性
