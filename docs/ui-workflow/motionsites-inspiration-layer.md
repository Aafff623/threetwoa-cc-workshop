---
title: "UI Workflow L1: MotionSites 灵感层"
type: reference
status: active
source_files:
  - "D:/OneDrive/Desktop/test-lib/motionsites.ai-prompt-library/README.md"
  - "D:/OneDrive/Desktop/test-lib/motionsites.ai-prompt-library/CLAUDE.md"
updated: 2026-05-31
owner: threetwoa
---

# UI Workflow L1: MotionSites 灵感层

## 概述

MotionSites.ai Prompt Library 是 UI Workflow 资产分层中的 **L1 灵感层**。在做具体设计决策之前，先从 MotionSites 浏览 curated prompts 和对应的 React/Vite 实时 demo，提取视觉参考和风格方向。

在 L0→L6 链路中，L1 位于业务底盘（Mkdirs）之后、设计判断层（Taste/frontend-design）之前。它的职责不是直接输出设计系统，而是提供**可触摸的视觉参考**，帮助 GPT 和用户在进入 Taste 层之前，对"想要什么样的感觉"建立共识。

**L0→L6 链路中的位置：**

```
L0 Mkdirs(业务) → L1 MotionSites(灵感) → L2 Taste(判断) → L3 Aceternity(动效)
→ L4 HeroUI v3(组件) → L5 Claude Code(执行) → L6 Codex/screenshots(审查)
```

MotionSites 的核心价值在于：每个 prompt 都配有**实时可运行的 React demo**，不是静态图片。这意味着你可以看到完整的交互状态、滚动行为、响应式表现，而不只是理想化的设计稿。

---

## 核心内容

MotionSites 目前包含 **65+ AI web design prompts**，分为免费和 Pro 两个层级，覆盖以下五大类：

### 1. Landing Pages & Websites（落地页与网站）

| 代表 Prompt | 风格关键词 |
|-------------|-----------|
| AI Designer Agency | 深色、玻璃拟态、agency 气质 |
| Liquid Glass Agency | Liquid Glass 风格、高质感 |
| NOVA Space Systems | 太空主题、未来感、深色背景 |
| SkyElite Private Jets | 奢华、大图、高端服务 |
| Weblex Dark Hero | 深色 hero、现代 SaaS 感 |
| NeoVision | 科技感、渐变、动态元素 |

**适用场景：** 品牌官网、产品落地页、活动页面。

### 2. SaaS & AI Applications（SaaS 与 AI 应用）

| 代表 Prompt | 风格关键词 |
|-------------|-----------|
| Apex SaaS | 干净、专业、数据展示 |
| Finlytic AI Agent | AI 代理、金融、信任感 |
| Neuralyn | 神经网络、科技感、深色 |
| Taskora SaaS Hero | 任务管理、清晰层级 |
| Datacore SaaS Hero | 数据驱动、仪表盘感 |
| Nickel Payments | 支付、安全、简洁 |

**适用场景：** B2B SaaS 产品、AI 工具、数据平台。

### 3. Hero Sections & Components（Hero 区域与组件）

| 代表 Prompt | 风格关键词 |
|-------------|-----------|
| Aethera Studio | 创意工作室、艺术感 |
| Bloom AI | AI 产品、柔和渐变 |
| Power AI | 力量感、动态、深色 |
| Railroad.ai | 工业感、精准、数据 |
| Loader Animation | 加载动画、微交互 |

**适用场景：** 首页首屏、关键转化区域、独立组件参考。

### 4. Portfolio & Personal（作品集与个人站）

| 代表 Prompt | 风格关键词 |
|-------------|-----------|
| Bold Portfolio Hero | 大胆排版、视觉冲击 |
| Dark Portfolio Hero | 深色模式、极简 |
| Portfolio Cosmic | 宇宙主题、沉浸感 |
| Viktor Portfolio | 设计师风格、精致细节 |

**适用场景：** 个人作品集、创意工作者展示、设计师个人站。

### 5. Agency & Video（代理商与视频）

| 代表 Prompt | 风格关键词 |
|-------------|-----------|
| Buzzentic Agency | 社交媒体 agency、活力 |
| Framelix 3D Studios | 3D 工作室、技术展示 |
| Logoisum Video Agency | 视频制作、动态感 |
| Investor Deck | 演示文稿、数据可视化 |

**适用场景：** 创意 agency、制作公司、投资者演示。

### Pro Prompts

Pro 层包含上述类别的增强版本，通常具有：
- 更复杂的动画编排
- 更精细的视觉细节
- 更完整的页面结构
- 更多交互状态

---

## 使用方式

### Step 1: 浏览（Browse）

进入 MotionSites 仓库的 `README.md` 或打开 `index.html` 画廊页面，按分类浏览 prompts。每个 prompt 都有对应的设计名称和类别标签。

**筛选策略：**
- 先按业务类型缩小范围（SaaS？Portfolio？Agency？）
- 再看风格关键词是否匹配目标情绪
- 优先看有视频预览的 prompt，快速判断是否值得深入

### Step 2: 预览（Preview）

点击 "View Prompt" 打开对应的 markdown 文件，观看嵌入的设计预览视频。每个 prompt 文档包含：
- 设计截图/视频
- 完整的 AI prompt 文本
- 技术栈说明

**关键观察点：**
- 配色方案（主色、辅助色、背景色）
- 排版层级（标题大小、字重、行高）
- 间距节奏（section padding、组件间隙）
- 动效风格（入场方式、滚动行为、hover 反馈）
- 整体情绪（专业、活泼、奢华、科技感……）

### Step 3: 运行 Demo（Execute）

找到感兴趣的 prompt 后，进入 `demos/<Name>/` 目录运行实时 demo：

```bash
cd demos/Zentry_Premium
npm install
npm run dev
```

**运行 demo 的目的：**
- 验证设计在真实浏览器中的表现
- 观察响应式断点行为
- 感受滚动和交互的流畅度
- 检查性能（动画是否卡顿、加载是否缓慢）

### Step 4: 提取设计决策（Extract）

从 demo 中提取可复用的设计决策，记录为 Taste 层的输入：

```
提取模板：
- 参考来源：[Prompt 名称]
- 情绪关键词：[3-5 个形容词]
- 配色方向：[主色/背景色/强调色]
- 排版特征：[字体类型、层级对比]
- 动效风格：[Framer Motion / GSAP / CSS transition]
- 布局特点：[不对称、全宽、卡片网格……]
- 适用度：[高/中/低，理由]
```

---

## 与 L0 的关系：何时进入灵感搜集

**L0（Mkdirs 业务底盘）的输出：**
- 产品功能定义
- 用户画像
- 信息架构
- 核心页面列表

**进入 L1 的时机：**

当 L0 完成以下检查点后，即可进入 MotionSites 灵感搜集：

1. [ ] 核心用户流程已确认（如：landing → signup → dashboard）
2. [ ] 目标受众画像清晰（B2B 决策者？年轻消费者？）
3. [ ] 关键页面列表已确定（需要几个 landing？几个 dashboard？）
4. [ ] 品牌基调有初步方向（专业？创新？可信？）

**不要过早进入 L1：** 如果连"给谁看"和"看什么"都不清楚，浏览 prompts 只会产生选择 paralysis。

**不要跳过 L1：** 直接进入 Taste 层做设计判断时，如果没有视觉参考，容易陷入"凭空想象"或"AI slop"（陈词滥调的设计模式）。

---

## 与 L2 的关系：灵感如何交给 Taste 层

L1（MotionSites）的输出是**视觉参考集合**，L2（Taste/frontend-design）的输入是**设计方向决策**。两者的交接需要结构化：

### 交接格式

从 MotionSites 提取的灵感，按以下结构整理后交给 Taste 层：

```
## 灵感参考包

### 参考 A：[Prompt 名称]
- 情绪：[形容词]
- 截图/录屏：[文件路径]
- 提取元素：配色 / 排版 / 动效 / 布局
- 适用页面：[landing / dashboard / profile]

### 参考 B：[Prompt 名称]
- …

### 排除项
- [Prompt 名称]：理由（如：过于复杂、与品牌不符）

### 设计方向建议
- 主风格：[基于参考的综合判断]
- 备选风格：[2-3 个备选]
- 风险点：[可能的实现难度或审美风险]
```

### Taste 层的处理

Taste 层（frontend-design / ui-ux-pro-max）收到灵感包后：

1. **验证**：检查灵感是否符合品牌约束（颜色禁用列表、字体禁用列表）
2. **综合**：将多个参考融合为统一的设计语言
3. **判断**：输出最终的设计系统提案（色板、字体、间距、组件风格）
4. **反模式检查**：确保没有落入 AI slop（如白底紫渐变、Inter 字体、雷同卡片网格）

---

## 上下游链路

### 上游：[L0 Mkdirs（业务底盘）](mkdirs-business-layer.md)

**从 L0 接收：**
- 产品类型（SaaS / 电商 / 作品集 / Agency）
- 目标受众画像
- 核心页面列表
- 品牌情绪关键词

**L0 完成后进入 L1：**
```
Mkdirs 业务底盘跑通
  → 用户画像确认
  → 页面结构确认
  → 进入 MotionSites 灵感搜集
```

### 下游：[L2 Taste（设计判断）](taste-judgment-layer.md)

**向 L2 交付：**
- 筛选后的视觉参考（3-5 个核心参考）
- 提取的设计元素（配色、排版、动效、布局）
- 排除项及理由
- 设计方向建议

**L1 → L2 的触发条件：**
- 已浏览足够覆盖业务类型的 prompts
- 已运行关键 demo 并验证表现
- 已提取结构化设计元素

### 链路速查

```
L0 Mkdirs ──[产品定义]──→ L1 MotionSites ──[视觉参考]──→ L2 Taste
                              ↑                              │
                              └────────[排除/反馈]───────────┘
```

---

## 技术备注

### MotionSites 仓库结构

```
motionsites.ai-prompt-library/
├── index.html              # 静态画廊（无构建步骤）
├── prompts/                # 免费 prompts（Markdown）
├── Pro prompts/            # Pro prompts（Markdown）
└── demos/                  # React/Vite 实时 demo
    ├── Zentry_Premium/
    │   ├── package.json
    │   ├── vite.config.js
    │   ├── tailwind.config.js
    │   └── src/
    └── [Other Demo]/
```

### Demo 技术栈

- React 18 + Vite
- Tailwind CSS v3
- GSAP + ScrollTrigger
- Lenis（smooth scroll）
- 无 TypeScript（纯 JSX）
- 无状态管理库（React hooks 足矣）

### 参考 Demo：Zentry_Premium

最复杂的参考 demo，包含：
- Lenis smooth scroll 与 GSAP ticker 同步
- ScrollTrigger 驱动的 clip-path 揭示动画
- 3D tilt / hover 效果（CSS perspective + rotateX/Y）
- 自定义字体（@font-face + Tailwind theme.extend）

---

## 质量门禁

使用 MotionSites 灵感层时，检查以下要点：

- [ ] 浏览的 prompts 覆盖业务类型（SaaS / Portfolio / Agency……）
- [ ] 至少运行 2-3 个关键 demo，验证真实表现
- [ ] 提取的设计元素已结构化记录
- [ ] 排除项有明确理由
- [ ] 灵感包已按交接格式整理，准备交给 Taste 层
- [ ] 未直接复制 prompt 代码（L1 只提取灵感，不复制实现）

---

## Source Material

- `D:/OneDrive/Desktop/test-lib/motionsites.ai-prompt-library/README.md` — MotionSites Prompt Library 项目说明，包含完整 prompts 分类列表和使用指南
- `D:/OneDrive/Desktop/test-lib/motionsites.ai-prompt-library/CLAUDE.md` — MotionSites 架构说明，包含三层结构（Root gallery / Prompts / Demos）和 demo 技术栈
- `D:/OneDrive/Desktop/threetwoa-cc-workshop/.claude/CLAUDE.md` 第 9 节 — UI Workflow Routing，定义 L0→L6 资产分层和落地顺序
- `D:/OneDrive/Desktop/threetwoa-cc-workshop/docs/ui-workflow/workflow-standard.md` — Stage 1 设计方向部分，定义从灵感到设计系统的 workflow
