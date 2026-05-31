---
title: "UI Workflow L0: Mkdirs 业务底盘"
type: reference
status: active
source_files:
  - "D:/OneDrive/Desktop/test-lib/mkdirs-template/README.md"
  - "D:/OneDrive/Desktop/test-lib/mkdirs-template/CLAUDE.md"
updated: 2026-05-31
owner: threetwoa
---

# UI Workflow L0: Mkdirs 业务底盘

> 定位：UI Workflow 资产分层中的 L0 层，负责业务逻辑与核心功能的"底盘"搭建。
> 原则：先跑通业务，再叠加视觉与动效。

---

## 概述

在 UI Workflow 的 L0→L6 链路中，Mkdirs 承担 **L0 业务底盘** 的角色。它的核心使命是在视觉设计和动效介入之前，先把一个目录站（Directory Site）的完整业务逻辑跑通——包括内容管理、用户认证、支付闭环、搜索过滤、博客发布等核心能力。

Mkdirs 不是一个视觉模板，而是一个功能完整的 Next.js 14 应用骨架。它提供了目录站所需的全部基础设施，让团队可以在"有真实数据、真实用户、真实交易"的基础上，再去讨论"用什么风格、加什么动效"。

L0 层的关键特征是：**业务优先、视觉中性、可扩展**。Mkdirs 默认使用 Tailwind CSS + shadcn/ui 的中性样式，不预设强烈的品牌风格，正是为了给 L1→L6 的上层视觉改造留出最大空间。

---

## 核心功能

Mkdirs 作为目录站模板，内置了以下核心能力模块：

### 1. 目录列表（Listings）
- 支持条目提交、编辑、发布/下架
- 条目包含标题、描述、标签、分类、外链、截图等字段
- 支持通过 Sanity Studio 进行内容审核

### 2. 分类与标签（Categories & Tags）
- 多级分类体系
- 标签云与交叉过滤
- 分类页面自动生成

### 3. 搜索与过滤（Search & Filter）
- 全文搜索
- 按分类、标签、集合（Collection）过滤
- 排序与分页

### 4. 内容管理（CMS）
- Sanity CMS 作为内容后端
- Schema 驱动的数据模型：条目、分类、标签、集合、博客文章、页面、订单、用户
- 可视化 Studio 界面，非技术用户可直接操作

### 5. 支付（Payments）
- Stripe 集成，支持订阅与一次性付款
- Checkout Session 与 Customer Portal
- Webhook 处理支付状态回调
- 定价计划在 `src/config/price.ts` 中配置

### 6. 认证（Authentication）
- NextAuth v5 (beta.18) 支持 credentials + OAuth
- 登录、注册、密码重置、邮箱验证
- 受保护路由（Dashboard、Settings、Submit、Edit）
- 中间件自动拦截未授权访问

### 7. 博客（Blog）
- 基于 Sanity 的博客文章系统
- 作者管理
- 文章列表与详情页

### 8. 其他功能
- Newsletter 订阅
- AI 内容生成辅助（Vercel AI SDK，支持 OpenAI / Google / DeepSeek / xAI / OpenRouter）
- 邮件通知（React Email + Resend）
- SEO 优化（OG 图片自动生成）
- 多主题切换
- OpenPanel 分析集成

---

## 技术栈

| 层级 | 技术 |
|------|------|
| 框架 | Next.js 14 (App Router) |
| 语言 | TypeScript |
| 样式 | Tailwind CSS + shadcn/ui (Radix UI 底层) |
| CMS | Sanity CMS |
| 认证 | NextAuth v5 (beta.18) |
| 支付 | Stripe |
| 邮件 | React Email + Resend |
| AI | Vercel AI SDK |
| 分析 | OpenPanel |
| 代码质量 | Biome (lint + format) |

### 路由结构

```
src/app/
  (website)/
    (public)/      ← 公开页面：首页、搜索、条目、分类、标签、集合、博客、定价
    (protected)/   ← 需登录：Dashboard、Settings、Submit、Edit
    (newsletter)/  ← 退订
    auth/          ← 登录、注册、重置密码、邮箱验证
  (sanity)/        ← Sanity Studio (/studio)
  api/             ← API：认证、Stripe Webhook、OG 图片、草稿模式、发邮件、上传图片
```

### 数据层

- **Sanity CMS** 是主内容存储
- `src/data/` 存放数据访问函数（item.ts、blog.ts、collection.ts 等）
- `src/actions/` 存放 Server Actions（提交、编辑、支付、认证等）
- `sanity.types.ts` 为自动生成的 TypeScript 类型

---

## 何时使用 Mkdirs

Mkdirs 适合作为底盘的项目类型：

| 项目类型 | 说明 |
|----------|------|
| 工具目录站 | 如 indiehub.best、boilerplatehunt.com |
| 资源聚合站 | 设计资源、开源项目、模板库 |
| 垂直导航站 | 行业工具导航、SaaS 导航 |
| 付费收录站 | 提交收费、高级列表付费 |
| 社区驱动目录 | 用户提交 + 管理员审核模式 |

**不适合的场景：**
- 纯展示型落地页（无目录、无 CMS、无用户系统）
- 电商商城（Mkdirs 是目录展示，非购物车/库存系统）
- 社交应用（无关注、无 feed、无实时通讯）

---

## 与上层的关系（L0 → L1 → L2 → L3 → L4）

Mkdirs 作为 L0，跑通后按以下顺序进入上层：

```
L0 Mkdirs（业务底盘）
  → 业务逻辑验证通过（列表、搜索、支付、Auth 可工作）
  → 数据模型稳定（Sanity Schema 确定）
  → 进入 L1

L1 MotionSites（灵感）
  → 浏览参考站点，确定视觉方向
  → 收集动效灵感、排版参考、交互模式
  → 输出：灵感板 + 3-5 个参考站点

L2 taste/frontend-design（判断）
  → 基于灵感做设计决策
  → 确定风格（极简、玻璃态、粗野主义……）
  → 确定色板、字体、布局规则
  → 输出：DESIGN.md

L3 Aceternity（动效）
  → 小范围移植 Aceternity 动效组件
  → 页面加载、滚动触发、hover 微交互
  → 输出：带动效的页面/组件

L4 HeroUI v3（组件）
  → 用 HeroUI Pro/OSS 组件替换基础交互元素
  → 表格、表单、模态框、导航等
  → 输出：高完成度 UI 组件层

L5 Claude Code（执行）
  → 将设计系统落地为代码
  → 整合 L3 动效 + L4 组件到 L0 底盘

L6 Codex/screenshots（审查）
  → 代码审查 + 视觉截图对比
  → 确保实现符合 DESIGN.md
```

**关键原则：** L0 的 Mkdirs 代码在 L1-L4 阶段不会被替换，而是被"覆盖"——路由结构、数据层、Server Actions、API 路由保持稳定，只有组件层和样式层被重新设计。

---

## 上下游链路

### 上游（L0 之前）

L0 是 UI Workflow 的起点，没有更底层的前置层。但在进入 L0 之前，需要完成：

- 产品定义（PRODUCT.md）：目标用户、核心功能、商业模式
- 技术选型确认：Next.js + Sanity + Stripe 是否满足需求
- Mkdirs 模板初始化：从模板仓库创建项目、配置环境变量、部署 Sanity Studio

### 下游（L0 → L1）

L0 完成后，进入 **[L1 MotionSites（灵感层）](motionsites-inspiration-layer.md)**：

- 输入：Mkdirs 跑通的业务功能列表 + 当前默认 UI 截图
- 任务：寻找与业务目标匹配的参考站点
- 输出：灵感板（mood board）+ 参考站点列表 + 初步风格方向

L1 的详细流程见 `docs/routing/ui-workflow-routing.md`。

---

## 快速启动检查清单

在 Mkdirs 上开始一个新项目时，按以下顺序验证：

- [ ] `pnpm dev` 本地运行正常
- [ ] Sanity Studio (`/studio`) 可访问
- [ ] 认证流程（注册 → 登录 → Dashboard）可工作
- [ ] 条目提交表单可提交数据到 Sanity
- [ ] 搜索页面可返回结果
- [ ] Stripe Checkout 可创建会话（测试模式）
- [ ] 博客文章列表与详情页正常渲染
- [ ] OG 图片自动生成正常
- [ ] 邮件发送（Resend）配置完成

全部验证通过后，L0 底盘即告完成，可以进入 L1 灵感收集阶段。

---

## Source Material

- `D:/OneDrive/Desktop/test-lib/mkdirs-template/README.md` — Mkdirs 项目官方说明
- `D:/OneDrive/Desktop/test-lib/mkdirs-template/CLAUDE.md` — Mkdirs 架构与开发指南
- `D:/OneDrive/Desktop/threetwoa-cc-workshop/.claude/CLAUDE.md` 第 9 节 — UI Workflow Routing 资产分层定义
- `D:/OneDrive/Desktop/threetwoa-cc-workshop/docs/ui-workflow/workflow-standard.md` — Stage 0 项目初始化与完整工作流标准
