---
title: "Skill 组合配方"
type: workflow
status: active
source_files:
  - reports/raw/ui-workflow/02-ui-skill-deep-research.md
  - reports/raw/ui-workflow/04-ui-tool-routing-cheatsheet.md
updated: 2026-05-30
owner: threetwoa
---

# Skill 组合配方

> 5 套经过验证的 UI skill 组合流水线，从概念到交付一条龙。

---

## 1. Landing Page Production Line

**design-taste-frontend → gsap-scrolltrigger → baoyu-cover-image**

### 适用场景

产品发布页、营销落地页、SaaS 首页 — 需要视觉冲击 + 滚动叙事 + 精致 hero 封面。

### 组合顺序

| Step | Skill | 产出 |
|------|-------|------|
| 1 | `design-taste-frontend` | 确定设计方向（反 AI slop）、产出 DESIGN.md + 页面 HTML |
| 2 | `gsap-scrolltrigger` | 叠加滚动驱动动画：pin section、scrub 进度、staggered reveal |
| 3 | `baoyu-cover-image` | 根据 Step 1 的 palette + mood 生成 hero 封面图 |

### 关键技巧

- Step 1 先跑完再进入 Step 2，动画依赖布局和视觉语言确定
- `baoyu-cover-image` 的 palette 参数直接从 Step 1 的 DESIGN.md 提取，保持色彩一致性
- ScrollTrigger 的 `scrub: 0.5` 比 `scrub: true` 手感更好；固定导航用 `pin: true`
- Step 2 中 `gsap.timeline({ defaults: { duration: 0.5 } })` 统一时长，避免 delay-chaining

### 避免陷阱

- ❌ 先做动画再定设计方向 → 返工重写
- ❌ ScrollTrigger 和 `toggleActions` 混用在同一个 tween → 行为不可预测
- ❌ 生产环境忘记移除 `markers: true`
- ❌ 忽略 `prefers-reduced-motion` → 用 `gsap.matchMedia()` 做降级

---

## 2. Dashboard Assembly

**heroui-react-pro + heroui-pro-design-taste → gsap-performance → data grid optimization**

### 适用场景

数据看板、管理后台、分析面板 — 组件密集 + 数据量大 + 性能敏感。

### 组合顺序

| Step | Skill | 产出 |
|------|-------|------|
| 1 | `heroui-pro-design-taste` | 调用 78 条设计原则，保持间距/色/排版一致 |
| 2 | `heroui-react-pro` | 用 compound component 模式搭建 charts/forms/tables |
| 3 | `gsap-performance` | 性能审查：只动画 transform + opacity，布局批处理 |
| 4 | 手动优化 | 虚拟化长列表、`gsap.quickTo()` 处理高频鼠标事件 |

### 关键技巧

- Step 1 → 2 顺序不可逆：先定原则再写组件，否则 `variant="primary"` 和 `className="bg-blue-500"` 混用
- `heroui-react-pro` 的 MCP tool 可搜索组件示例，减少试错
- 数据网格优化优先级：虚拟滚动 > 分页 > 懒加载
- `gsap-performance` 审查时关注 layout thrashing — 批量读再批量写

### 避免陷阱

- ❌ 两个 HeroUI skill 顺序搞反 → 写完组件才发现违反 spacing/color 原则
- ❌ 对 width/height/top/left 做动画 → 触发 layout reflow，必须用 transform
- ❌ `will-change: transform` 全局滥用 → 反而增加内存占用
- ❌ Dashboard 不做 ScrollTrigger pin 头部 → 长表格滚动时丢失导航

---

## 3. Diagram-to-Code Pipeline

**baoyu-diagram or excalidraw-diagram → design-taste-frontend → gsap-core**

### 适用场景

架构图/流程图可视化落地：先把逻辑画成图，再转成可交互的 Web 页面。

### 组合顺序

| Step | Skill | 产出 |
|------|-------|------|
| 1 | `baoyu-diagram` 或 `excalidraw-diagram` | 输出 SVG/PNG 架构图，确定组件关系 |
| 2 | `design-taste-frontend` | 从 diagram 提取结构，施加设计方向，输出 HTML |
| 3 | `gsap-core` + `gsap-timeline` | 给关键节点加 micro-animation：stagger 入场、hover 反馈 |

### 关键技巧

- Step 1 用 diagram 把信息层级定下来，Step 2 才有据可依
- `baoyu-diagram` 输出深色主题 SVG，和 Step 2 深色系 landing 天然匹配
- micro-animation 用 `gsap.timeline()` + labels 管理，避免散装 tween
- `autoAlpha` 优于 `opacity` — 同时处理 `visibility`，防止隐藏元素拦截点击

### 避免陷阱

- ❌ Diagram 和代码风格脱节 → Step 1 结束后需明确提取配色和字体
- ❌ 过度动画：每个节点都 stagger → 视觉疲劳，只对首屏 3-5 个关键元素加
- ❌ 用 delay 链接动画 → 不可维护，必须用 timeline position 参数 (`"<"`, `"+=0.3"`)
- ❌ 忘记 `gsap.registerPlugin()` 调用（如果用 Draggle/MotionPath 等插件）

---

## 4. Infographic Flow

**baoyu-infographic → ui-ux-pro-max review → baoyu-slide-deck**

### 适用场景

内容营销、数据可视化报告、社媒信息图 — 需要信息密度 + 美学 + 演示稿。

### 组合顺序

| Step | Skill | 产出 |
|------|-------|------|
| 1 | `baoyu-infographic` | 选择 layout×style 组合，生成信息图 |
| 2 | `ui-ux-pro-max` | 用 `--design-system` 审查配色/字体/排版一致性 |
| 3 | `baoyu-slide-deck` | 将 infographic 拆分到多页演示稿 |

### 关键技巧

- Step 1 选 layout 时，22 种 visual style 中 `editorial` 和 `data-driven` 最适合数据型内容
- Step 2 用 `python3 scripts/search.py "..." --persist -p "ProjectName"` 把设计系统持久化，Step 3 继承
- `ui-ux-pro-max` 的 `MASTER.md` 和 `pages/<page>.md` 分层：全局规则 vs 页面覆盖
- Step 3 的 slide deck 不是贴截图 — 用 style prompt 保持视觉连续性

### 避免陷阱

- ❌ 跳过 Step 2 直接进 Step 3 → 信息图和演示稿风格断裂
- ❌ `ui-ux-pro-max` 只当查询用不 persist → 下一步丢失设计上下文
- ❌ Infographic 内容过多塞进一张图 → 用 `baoyu-xhs-images` 拆成多卡系列
- ❌ Slide deck 每页塞满文字 → 每页一个核心观点 + 视觉支撑

---

## 5. Prototype Sprint

**prototype → gsap-react + gsap-timeline → review with design-taste-frontend**

### 适用场景

快速验证交互概念：从低保真原型到可交互 demo，再审查设计质量。

### 组合顺序

| Step | Skill | 产出 |
|------|-------|------|
| 1 | `prototype` | 生成可运行终端原型 或 多套 UI 方案切换 |
| 2 | `gsap-react` + `gsap-timeline` | 用 `useGSAP()` hook 包裹动画，timeline 编排交互 |
| 3 | `design-taste-frontend` | Anti-slop 审查： typography/color/layout 是否足够有方向性 |

### 关键技巧

- Step 1 `prototype` skill 自动选择分支：状态/逻辑问题走终端原型，UI 问题走多方案切换
- Step 2 必须用 `useGSAP()` 而非 `useEffect` — 自动 cleanup，避免内存泄漏
- `scope` 参数限制定位到组件级：`useGSAP(() => { ... }, { scope: containerRef })`
- Step 3 审查时对照 frontend-design 的禁令清单：gradient text？side-stripe borders？identical card grid？

### 避免陷阱

- ❌ 原型阶段就用 ScrollTrigger → 交互原型只测逻辑，滚动体验放到正式实现阶段
- ❌ `useGSAP` 不传 `scope` → selector 污染全局，组件卸载后动画残留
- ❌ SSR 环境直接调用 gsap → 必须在 `useGSAP` 或 `useEffect` 内调用
- ❌ 审查跳过 AI Slop Test → 如果遮住品牌名仍能猜出是"哪个 AI 生成的"，就不及格

---

## Source Material

| 文件 | 内容 |
|------|------|
| `reports/raw/ui-workflow/02-ui-skill-deep-research.md` | GSAP 8 子模块详解、Impeccable 25 命令、frontend-design 反 slop 规则、UI UX Pro Max 定位、HeroUI Pro Design Taste 原则、skill 依赖图 |
| `reports/raw/ui-workflow/04-ui-tool-routing-cheatsheet.md` | 工具路由速查表（本文件引用为 source，实际内容已融入上方配方） |