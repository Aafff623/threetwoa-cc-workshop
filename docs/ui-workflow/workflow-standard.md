---
title: "UI Workflow 标准"
type: workflow
status: active
source_files:
  - "archive/2026-05-30/source-03-ui-workflow-standard.md"
updated: 2026-05-30
owner: threetwoa
---

# UI Workflow Standard

> Generated: 2026-05-30 · Distilled from source-03-ui-workflow-standard.md
> Scope: threetwoa AI Workflow Operating System — UI/UX layer

---

## 核心理念

将**设计决策**、**实现**、**审查**严格分离。每个阶段有明确的输入、输出和技能分配，没有技能超载，每个只承担单一核心职责。

---

## Stage 0: 项目初始化（一次性）

**时机**：新项目启动，或大规模重设计开始
**执行者**：Claude Code
**产物**：`DESIGN.md` + `PRODUCT.md`（可选）

### 命令

```bash
# 从零开始
/impeccable init

# 从现有代码提取
/impeccable document
```

### 流程

1. Impeccable 扫描项目现有设计约定
2. 读取 `reference/brand.md` 或 `reference/product.md`
3. 生成 `PRODUCT.md`（产品上下文）和 `DESIGN.md`（设计系统）
4. 若无品牌色，运行 `palette.mjs` 获取 OKLCH 指导

### 产物结构

```
project-root/
├── DESIGN.md          ← 设计系统（颜色、排版、间距、组件）
├── PRODUCT.md         ← 产品上下文（受众、目标、约束）
└── ...
```

---

## Stage 1: 设计方向

**时机**：需要决定 UI 的视觉风格
**执行者**：GPT（策略） + Claude Code（执行）
**输入**：项目简报、目标受众、行业
**输出**：风格选择 + 色板 + 字体 + 布局方向

### 工作流

```
GPT 提供：
  - 产品类型（SaaS、电商、作品集……）
  - 目标受众
  - 情绪关键词（专业、活泼、奢华……）
  - 技术栈（React、Vue、HTML+Tailwind……）

Claude Code 执行：
  Step 1: ui-ux-pro-max --design-system
    → 生成完整设计系统及理由

  Step 2: frontend-design 验证
    → 检查 AI slop，推动大胆方向
    → 验证字体是否在禁用列表中
    → 验证颜色是否在陈词滥调列表中

  Step 3: (可选) getdesign.md 参考
    → 需要品牌一致性时，复制相关 DESIGN.md

  Step 4: 持久化设计系统
    → ui-ux-pro-max --persist
    → 创建 design-system/MASTER.md + pages/*.md
```

### 资产分层参考

本阶段涉及 L0→L3 层的协作：

- **[Mkdirs 业务底盘](mkdirs-business-layer.md)**（L0）— 确保业务逻辑已跑通，再进入视觉设计
- **[MotionSites 灵感层](motionsites-inspiration-layer.md)**（L1）— 浏览参考站点，收集视觉方向和动效灵感
- **[Taste 判断层](taste-judgment-layer.md)**（L2）— 应用 Anti-Slop 原则，校准设计方向
- **[Aceternity 动效层](aceternity-motion-layer.md)**（L3）— 预览可用的动效组件，提前评估移植可行性

### 决策门禁

> **GPT 必须在设计方向获得批准后才进入实现。**

Claude Code 呈现：
- 选定风格 + 理由
- 色板（含对比度比值）
- 字体搭配
- 反模式警告
- 2–3 个备选方向（如有需要）

---

## Stage 2: 实现

**时机**：设计方向已批准
**执行者**：Claude Code
**输入**：DESIGN.md + 风格选择
**输出**：可运行代码（组件、页面、接口）

### 工作流

```
Step 1: 结构
  → frontend-design "build [page/component]"
  → 使用语义化 HTML，Tailwind 类名
  → 应用布局规则（不对称、重叠、对角线流）

Step 2: 组件
  → HeroUI 项目: heroui-react-pro
    → 通过 MCP 查询组件 API
    → 应用 heroui-pro-design-taste 原则
  → 自定义: frontend-design 从零生成

Step 3: 打磨
  → Impeccable polish
    → 检查禁用模式
    → 验证对比度、间距、排版
    → 确保 AI slop 清除
```

### 资产分层参考

本阶段涉及 L2→L4 层的落地：

- **[Taste 判断层](taste-judgment-layer.md)**（L2）— 执行前再次确认 Anti-Slop 规则已应用
- **[Aceternity 动效层](aceternity-motion-layer.md)**（L3）— 从模板中移植动效组件到项目
- **[Mkdirs 业务底盘](mkdirs-business-layer.md)**（L0）— 在已有业务底盘上叠加视觉层，不替换底层逻辑

### 质量门禁

- [ ] 无禁用字体（Inter、Roboto、Arial、Space Grotesk）
- [ ] 无禁用配色（白底紫渐变）
- [ ] 无禁用布局（雷同卡片网格、hero-metric 模板）
- [ ] 所有交互元素有 `cursor-pointer`
- [ ] 焦点状态可见
- [ ] 响应式：375px、768px、1024px、1440px
- [ ] 移动端无水平滚动

---

## Stage 3: 动效设计

**时机**：静态实现已通过，需要添加动画
**执行者**：Claude Code
**输入**：实现代码 + 动效需求
**输出**：带动画的代码

### 决策树

```
动效类型？
├── 页面加载入场
│   └── gsap-timeline + gsap-core
│       → 编排交错揭示
│       → 使用标签提高可维护性
│
├── 滚动触发
│   └── gsap-scrolltrigger
│       → Pin、Scrub 或 Toggle
│       → 列表场景使用 Batch
│
├── React 组件动画
│   └── gsap-react
│       → useGSAP hook
│       → 限定组件作用域
│       → 自动清理
│
├── SVG / 文字特效
│   └── gsap-plugins
│       → SplitText 文字揭示
│       → DrawSVG 线描动画
│       → MorphSVG 形态变化
│
├── 性能优化
│   └── gsap-performance
│       → quickTo 鼠标跟随
│       → will-change 策略
│       → 批量 DOM 操作
│
└── 简单 hover / 过渡
    └── CSS transition（不用 GSAP）
        → 控制包体积
```

### 质量门禁

- [ ] `prefers-reduced-motion` 已处理
- [ ] 仅动画 transform + opacity
- [ ] 卸载时清理（useGSAP 或 ctx.revert）
- [ ] SSR 阶段不执行 GSAP
- [ ] 生产环境移除 Markers
- [ ] 微交互时长 150–300ms
- [ ] 无布局抖动

---

## Stage 4: UX 审查

**时机**：实现 + 动效完成
**执行者**：Claude Code（自审） → Codex（外部审查）
**输入**：完整代码
**输出**：审查报告 + 修复

### Claude Code 自审

```bash
# UX 审计
bencium-controlled-ux-designer "audit UX"

# 设计批评
impeccable critique

# 打磨迭代
impeccable polish
```

### Codex 审查

```
Codex 检查项：
  - 无障碍性 (WCAG 2.1)
  - 响应式行为
  - 动画性能
  - 代码质量
  - GSAP 清理
```

### 审查维度

| 维度 | 技能 | 检查项 |
|------|------|--------|
| 无障碍性 | bencium | WCAG 2.1/2.2 合规 |
| 触摸目标 | bencium | 最小 44×44px |
| 响应式 | bencium | 断点策略 |
| 动效 | gsap-performance | 60fps、减动效 |
| 视觉打磨 | impeccable | 禁用模式、AI slop 检测 |
| 排版 | impeccable | 行长、层级 |
| 色彩 | impeccable | 对比度比 |

---

## Stage 5: 呈现（可选）

**时机**：需要展示或分享成果
**执行者**：Claude Code
**输入**：最终代码 + 资源
**输出**：展示材料

### 选项

| 需求 | 工具 | 产物 |
|------|------|------|
| 幻灯片 | baoyu-slide-deck | 幻灯片图像 |
| PPTX | ppt-master | .pptx 文件 |
| 信息图 | baoyu-infographic | 视觉摘要 |
| 封面图 | baoyu-cover-image | 文章/项目封面 |
| 架构图 | drawio / excalidraw / mermaid | 架构图 |
| HTML 演示 | prototype | 交互原型 |

---

## 全局 vs 项目作用域

### 全局（始终可用）

以下技能注册在 Claude Code 全局技能索引中：
- gsap-*（8 个子技能）
- impeccable
- frontend-design
- bencium-controlled-ux-designer
- ui-ux-pro-max
- heroui-*
- baoyu-*
- diagram 技能

### 项目级（显式启用）

以下应按项目显式添加：
- `DESIGN.md` — 项目专属设计系统
- `PRODUCT.md` — 项目专属产品上下文
- `CLAUDE.md` — 项目专属指令（可引用技能）
- 技能覆盖 — 项目风格与全局默认不同时

### 项目启用方法

```bash
# 方式 1：复制 DESIGN.md 到项目根目录
cp design-system/MASTER.md ./DESIGN.md

# 方式 2：让 Impeccable 生成
/impeccable document

# 方式 3：从 getdesign.md 复制
# 浏览 getdesign.md → 复制品牌设计 → 粘贴为 DESIGN.md
```

---

## 交接协议

### GPT → Claude Code

```
输入：
  - UI 简报（产品类型、受众、目标）
  - 技术栈偏好
  - 参考站点（可选）
  - 约束（预算、时间、无障碍级别）

Claude Code 输出：
  - 设计系统提案（风格、色板、字体）
  - 待 GPT 确认的问题

门禁：GPT 批准设计方向
```

### Claude Code → Codex

```
输入：
  - 完整实现代码
  - DESIGN.md
  - 动效规格（如有）

Codex 输出：
  - 审查报告（Bug、UX 问题、性能）
  - 修复建议

门禁：所有关键问题已解决
```

### Codex → GPT

```
输入：
  - Claude Code 实现摘要
  - Codex 审查报告
  - 遗留问题

GPT 输出：
  - 未解决问题的战略决策
  - 下一迭代方向
```

---

## 技能触发映射

| 用户说 | 触发技能 | 阶段 |
|--------|---------|------|
| "设计落地页" | frontend-design | 1 → 2 |
| "该用什么色板？" | ui-ux-pro-max | 1 |
| "做成 Stripe 那样" | getdesign.md + frontend-design | 1 |
| "加滚动动画" | gsap-scrolltrigger | 3 |
| "动画页面加载" | gsap-timeline | 3 |
| "React 动画" | gsap-react | 3 |
| "审计这个 UI" | impeccable audit + bencium | 4 |
| "打磨一下" | impeccable polish | 2 → 4 |
| "修布局" | impeccable layout | 2 |
| "做幻灯片" | baoyu-slide-deck / ppt-master | 5 |
| "画架构图" | drawio / excalidraw / mermaid | 5 |
| "再大胆一点" | impeccable bolder | 2 |
| "加动效" | impeccable animate | 3 |

---

## 最小可行工作流

快速项目，跳过阶段：

```
简报
  → frontend-design "build it"（仅 Stage 2）
  → gsap-core "add simple fade-in"（Stage 3 简化版）
  → 完成
```

高价值项目，完整流程：

```
简报
  → Stage 0: Impeccable init
  → Stage 1: ui-ux-pro-max + frontend-design 方向
  → GPT 批准
  → Stage 2: frontend-design 实现
  → Stage 3: gsap-* 动效
  → Stage 4: bencium + impeccable + Codex 审查
  → Stage 5: 呈现（如需）
  → 交付
```

---

## Source Material

- `archive/2026-05-30/source-03-ui-workflow-standard.md`