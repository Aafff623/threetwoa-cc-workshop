---
title: "UI Workflow L2: Taste 判断层"
type: reference
status: active
source_files:
  - "D:/OneDrive/Desktop/test-lib/taste-skill/README.md"
  - "D:/OneDrive/Desktop/test-lib/taste-skill/.github/copilot-instructions.md"
updated: 2026-05-31
owner: threetwoa
---

# UI Workflow L2: Taste 判断层

## 概述

Taste Skill 是 UI Workflow 链路中的 **L2 判断层**（Taste / Judgment Layer）。它是一套 "Anti-Slop Frontend Framework for AI Agents"，核心使命是防止 AI 生成千篇一律的 SaaS 模板 UI。

在 L0→L6 资产分层链路中，Taste 位于 L1（MotionSites 灵感采集）与 L3（Aceternity 动效实现）之间：

```
L0 Mkdirs(业务底盘) → L1 MotionSites(灵感) → L2 Taste(判断/校准)
→ L3 Aceternity(动效) → L4 HeroUI v3(组件) → L5 Claude Code(执行) → L6 Codex/screenshots(审查)
```

当 L1 层从 MotionSites 等灵感源采集到参考素材后，L2 层的 Taste 介入进行**设计方向判断与校准**——它不提供具体组件代码，而是输出一套设计规则、审美约束和风格参数，确保后续 L3-L5 的实现不落入 "slop"（廉价模板化 UI）的陷阱。

Taste 的本质是**审美防火墙**：在灵感转化为代码之前，先用规则过滤掉低质量、高重复、缺乏设计意图的输出。

---

## Anti-Slop 核心原则

Taste Skill 的 Anti-Slop 设计哲学提炼为 5 条核心判断标准，每一条都是可执行的审查准则：

### 1. No Generic UI — 拒绝默认 SaaS 模板

- **判断标准**：界面是否看起来像从某个 admin dashboard 模板直接复制？是否存在无意义的 sidebar + topbar + card grid 三板斧？
- **校准方向**：使用高对比度（high contrast）、强排版层级（strong typographic hierarchy）、极端精细的对齐（extreme care for alignment）。
- **反面典型**：Bootstrap 风格的灰底白卡、无差别的圆角 shadow card、居中对齐的大标题 + 三列 feature grid。
- **正面方向**：敢于打破网格、使用非对称布局、让留白本身成为设计元素。

### 2. Premium Whitespace — 高级留白

- **判断标准**：元素之间是否拥挤？padding/margin 是否使用固定像素值导致在不同屏幕尺寸下失衡？
- **校准方向**：元素需要呼吸空间。使用比例化的 `clamp()` 间距系统，替代死板的固定 padding。
- **实践规则**：
  - 间距基于视口比例缩放，而非固定 px
  - 大模块之间使用 `clamp(2rem, 5vw, 6rem)` 这类 fluid spacing
  - 避免 "所有 card 都用 p-4" 的一刀切做法

### 3. Cinematic Motion — 电影级动效

- **判断标准**：动画是否使用默认的 `ease-in-out` 或 `linear`？过渡是否生硬、机械？
- **校准方向**：绝不用 linear easing。所有动画必须使用弹簧物理（spring physics）。
- **参考参数**：`stiffness: 100, damping: 20`（Framer Motion 弹簧配置）或 GSAP 的 `CustomEase`。
- **动效选择路由**：
  - Framer Motion = 默认主动效层（简单弹簧、布局动画）
  - GSAP = 复杂 timeline / ScrollTrigger 场景
  - CSS transition = 仅限简单 hover / color / opacity

### 4. Complete Implementation — 完整实现

- **判断标准**：代码中是否存在 `// TODO: add actual code here`、`// FIXME`、未完成的 placeholder 组件？
- **校准方向**：每次输出都必须是完整、可运行的实现。不写半成品，不留技术债务给下游。
- **执行层要求**：Claude Code 在 L5 执行时，若发现 Taste 规则与实现冲突，必须停下报告，不得自行妥协。

### 5. Contextual Awareness — 上下文感知

- **判断标准**：设计决策是否与项目整体风格一致？是否读取了本地化的 `SKILL.md` 或 `DESIGN.md`？
- **校准方向**：深度风格配置应从项目本地的 `skills/` 目录或 `DESIGN.md` 中读取，而非使用全局默认。
- **实践规则**：每个项目应有独立的设计系统映射（design-system map），Taste 在此基础上进行判断。

---

## 可调参数：三旋钮系统

Taste Skill v2 引入了三个 1-10 的可调参数（dials），用于在不同项目间灵活调整设计倾向：

| 参数 | 全称 | 低值 (1-3) | 中值 (4-7) | 高值 (8-10) |
|---|---|---|---|---|
| **DESIGN_VARIANCE** | 布局实验度 | 居中、对称、保守布局 | 适度非对称、网格突破 | 极端非对称、实验性排版 |
| **MOTION_INTENSITY** | 动效深度 | 仅 hover 状态变化 | 滚动触发、入场动画 | 全页 magnetic、scroll-linked、复杂 timeline |
| **VISUAL_DENSITY** | 视觉密度 |  spacious、大量留白、极简信息 | 平衡的信息与留白 | 高密度 dashboard、信息紧凑 |

### 参数使用示例

- **企业官网**：DESIGN_VARIANCE=3, MOTION_INTENSITY=4, VISUAL_DENSITY=3（稳重、适度动效、留白充足）
- **创意作品集**：DESIGN_VARIANCE=8, MOTION_INTENSITY=7, VISUAL_DENSITY=4（实验布局、强动效、中等密度）
- **SaaS Dashboard**：DESIGN_VARIANCE=4, MOTION_INTENSITY=3, VISUAL_DENSITY=8（功能优先、克制动效、高密度信息）

---

## Skill 变体

Taste Skill 不是单一文件，而是一个 skill 家族。根据项目视觉方向的不同，可选择不同变体：

### 代码实现类 Skill

| 变体 | Install Name | 适用场景 |
|---|---|---|
| **taste-skill v2** (默认) | `design-taste-frontend` | 通用默认，v2 为实验性重写版，支持 brief 推断、三旋钮、design-system map、redesign-audit protocol |
| **taste-skill v1** | `design-taste-frontend-v1` | 依赖原始 v1 精确行为的项目，保守选择 |
| **gpt-taste** | `gpt-taste` | GPT/Codex 专用，更严格的布局差异、更强 GSAP 方向、激进 anti-slop |
| **soft-skill** | `high-end-visual-design` | 高端视觉：柔和对比、大量留白、premium 字体、spring motion，适合奢侈品/品牌站 |
| **minimalist-skill** | `minimalist-ui` | 编辑风格产品 UI（Notion/Linear 气质），克制配色、清晰结构 |
| **brutalist-skill** | `industrial-brutalist-ui` | 工业粗野主义：瑞士字体、锐利对比、实验性布局 |
| **redesign-skill** | `redesign-existing-projects` | 存量项目改造：先 audit UI，再修复布局/间距/层级/样式 |
| **output-skill** | `full-output-enforcement` | 解决模型输出截断问题：强制完整输出，禁止 placeholder |
| **stitch-skill** | `stitch-design-taste` | Google Stitch 兼容规则，支持可选 `DESIGN.md` 导出格式 |

### 图像生成类 Skill

| 变体 | Install Name | 输出类型 |
|---|---|---|
| **imagegen-frontend-web** | `imagegen-frontend-web` | 网站设计稿：hero、landing、多 section，强排版/留白/anti-slop 美术指导 |
| **imagegen-frontend-mobile** | `imagegen-frontend-mobile` | 移动端屏幕与流程：iOS/Android/cross-platform，可读字体、连贯系列 |
| **brandkit** | `brandkit` | 品牌套件板：logo 方向、配色、字体、跨品类身份应用 |

### 变体选择决策树

```
项目类型？
├─ 全新项目 → taste-skill v2 (默认)
│   ├─ 视觉方向已确定？
│   │   ├─ 柔和高端 → soft-skill
│   │   ├─ 极简编辑 → minimalist-skill
│   │   └─ 粗野实验 → brutalist-skill
│   └─ 使用 GPT/Codex 为主？→ gpt-taste
├─ 存量改造 → redesign-skill
├─ 输出截断 → output-skill
└─ 仅生成参考图 → imagegen-frontend-web / mobile / brandkit
```

---

## 使用时机

Taste 判断层在以下节点介入：

1. **L1 灵感采集完成后**：MotionSites 或其他灵感源提供了参考素材，需要判断哪些设计语言适合当前项目。
2. **DESIGN.md 沉淀前**：在将设计方向写入 DESIGN.md 之前，先用 Taste 规则校准。
3. **L3 动效选型时**：决定使用 Framer Motion / GSAP / CSS transition 的决策阶段。
4. **Codex 审查前**：作为审查标准之一，检查实现是否符合 Anti-Slop 原则。

**不应使用 Taste 的场景**：
- L0 业务底盘尚未跑通时（先功能，后审美）
- 纯工具/CLI 界面，无视觉展示需求
- 用户明确要求 "快速原型" 且明确接受模板化输出

---

## 上下游链路

### 上游：[L1 MotionSites（灵感层）](motionsites-inspiration-layer.md)

Taste 的输入来自 L1 层采集的灵感素材：

- **MotionSites**：动效与交互参考网站
- **Awwwards / SiteInspire**：高端网页设计案例
- **imagegen-frontend-web / mobile**：AI 生成的设计稿参考图
- **brandkit**：品牌视觉方向板

Taste 对上游的处理方式：
- **吸收**：提取灵感中的排版逻辑、动效节奏、色彩关系
- **过滤**：剔除过于模板化、缺乏设计意图的参考
- **校准**：将灵感转化为可执行的设计规则（三旋钮参数、Anti-Slop 检查清单）

### 下游：[L3 Aceternity（动效层）](aceternity-motion-layer.md)

Taste 的输出作为 L3 层的输入约束：

- **动效选型**：根据 MOTION_INTENSITY 决定使用 Framer Motion 还是 GSAP
- **弹簧参数**：将 `stiffness: 100, damping: 20` 等物理参数传递给动效实现
- **布局约束**：DESIGN_VARIANCE 决定 Aceternity 组件的排列方式（保守网格 vs 实验性布局）
- **密度约束**：VISUAL_DENSITY 影响 Aceternity 组件的间距和尺寸

### 跨层协作

```
L1 MotionSites ──灵感素材──→ L2 Taste ──设计规则──→ L3 Aceternity
                                    │
                                    ↓
                              DESIGN.md（沉淀）
                                    │
                                    ↓
                              L4 HeroUI v3（组件选择）
                                    │
                                    ↓
                              L5 Claude Code（执行）
                                    │
                                    ↓
                              L6 Codex（审查：Anti-Slop 检查）
```

---

## 安装与使用

### 安装 Skill

```bash
# 安装默认 taste-skill v2
npx skills add https://github.com/Leonxlnx/taste-skill

# 安装特定变体
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend-v1"
npx skills add https://github.com/Leonxlnx/taste-skill --skill "high-end-visual-design"
npx skills add https://github.com/Leonxlnx/taste-skill --skill "minimalist-ui"
npx skills add https://github.com/Leonxlnx/taste-skill --skill "industrial-brutalist-ui"
```

### 手动使用

将任意 `SKILL.md` 文件复制到项目目录，或直接粘贴到 ChatGPT / Codex / Claude Code 对话中。

### 图像生成工作流

```
1. 使用 imagegen-frontend-web / mobile / brandkit 生成参考图
2. 将参考图交给 Codex / Cursor / Claude Code
3. 配合 image-to-code-skill 执行 "生成 → 分析 → 编码" 完整链路
```

---

## Source Material

本文档基于以下素材编写：

1. **Taste Skill README** — `D:/OneDrive/Desktop/test-lib/taste-skill/README.md`
   - 来源：[Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill)
   - 内容：Skill 家族完整列表、安装方式、三旋钮系统说明、图像生成工作流

2. **Anti-Slop Copilot Instructions** — `D:/OneDrive/Desktop/test-lib/taste-skill/.github/copilot-instructions.md`
   - 来源：同上仓库 `.github/` 目录
   - 内容：5 条 Anti-Slop 核心原则（No Generic UI / Premium Whitespace / Cinematic Motion / Complete Implementation / Contextual Awareness）

3. **UI Workflow Routing** — `D:/OneDrive/Desktop/threetwoa-cc-workshop/.claude/CLAUDE.md` 第 9 节
   - 内容：L0→L6 资产分层定义、落地顺序、动效选择路由
