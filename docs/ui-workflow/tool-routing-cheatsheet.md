---
title: "UI 工具路由速查表"
type: reference
status: active
source_files:
  - "archive/2026-05-30/source-04-ui-tool-routing-cheatsheet.md"
updated: 2026-05-30
owner: threetwoa
---

# UI Tool Routing Cheatsheet

> Generated: 2026-05-30 · Distilled from source-04-ui-tool-routing-cheatsheet.md
> 一页速查：技能选择决策树

---

## 快速查找表

| 我要…… | 使用技能 | 命令 / 触发 |
|---------|---------|-------------|
| **选风格** | ui-ux-pro-max | `python3 skills/ui-ux-pro-max/scripts/search.py "..." --design-system` |
| **选色板** | ui-ux-pro-max | `--domain color "..."` |
| **选字体** | ui-ux-pro-max | `--domain typography "..."` |
| **模仿品牌设计** | getdesign.md（参考） | 浏览 getdesign.md → 复制 DESIGN.md |
| **避免 AI slop** | frontend-design | 说 "design a page"（自动触发） |
| **设定大胆方向** | frontend-design | "brutalist / maximalist / retro-futuristic" |
| **写 DESIGN.md** | impeccable | `/impeccable init` 或 `/impeccable document` |
| **写 PRODUCT.md** | impeccable | `/impeccable init` |
| **建落地页** | frontend-design + impeccable craft | "build landing page" |
| **建仪表盘** | ui-ux-pro-max + frontend-design | "build dashboard" + `--domain chart` |
| **建组件** | frontend-design | "create button/modal/card component" |
| **加页面加载动画** | gsap-core + gsap-timeline | "animate page load" |
| **加滚动动画** | gsap-scrolltrigger | "scroll animation" / "parallax" |
| **加 React 动画** | gsap-react | "React animation" / "useGSAP" |
| **优化动画帧率** | gsap-performance | "animation performance" / "60fps" |
| **形态变换 / SVG 描线** | gsap-plugins | "SVG animation" / "morph" |
| **文字拆分动画** | gsap-plugins (SplitText) | "text reveal" / "typewriter" |
| **审计 UI 质量** | impeccable audit | `/impeccable audit` |
| **批评设计** | impeccable critique | `/impeccable critique` |
| **打磨现有 UI** | impeccable polish | `/impeccable polish` |
| **检查无障碍** | bencium-controlled-ux-designer | "accessibility audit" / "a11y" |
| **检查响应式** | bencium-controlled-ux-designer | "responsive design" |
| **审查 UX 模式** | bencium-controlled-ux-designer | "UX review" / "heuristic" |
| **更大胆** | impeccable bolder | `/impeccable bolder` |
| **更安静** | impeccable quieter | `/impeccable quieter` |
| **加动效** | impeccable animate | `/impeccable animate` |
| **修布局** | impeccable layout | `/impeccable layout` |
| **修排版** | impeccable typeset | `/impeccable typeset` |
| **修色彩** | impeccable colorize | `/impeccable colorize` |
| **创建 HTML 演示** | prototype | "prototype this" |
| **做幻灯片** | baoyu-slide-deck | "create slides" / "presentation" |
| **做 PPT** | ppt-master | "create PPT" / "make presentation" |
| **做信息图** | baoyu-infographic | "infographic" / "信息图" |
| **做封面图** | baoyu-cover-image | "cover image" / "article cover" |
| **画图** | drawio / excalidraw / mermaid / tldraw | "diagram" / "flowchart" / "架构图" |
| **为什么看起来这么差？** | frontend-design + impeccable critique | "critique this design" |
| **怎么做出高级感？** | impeccable + frontend-design | "make it look premium" |

---

## 按技术栈路由

### React / Next.js

| 需求 | 首选 | 备选 |
|------|------|------|
| 组件代码 | frontend-design | heroui-react-pro |
| 动画 | gsap-react | gsap-core |
| 设计系统 | ui-ux-pro-max | heroui-pro-design-taste |
| 审查 | bencium-controlled-ux-designer | impeccable audit |

### Vue / Svelte

| 需求 | 首选 | 备选 |
|------|------|------|
| 组件代码 | frontend-design | web-design-guidelines |
| 动画 | gsap-frameworks | gsap-core |
| 设计系统 | ui-ux-pro-max | — |

### HTML + Tailwind

| 需求 | 首选 | 备选 |
|------|------|------|
| 页面代码 | frontend-design | ui-ux-pro-max |
| 动画 | gsap-core + gsap-scrolltrigger | — |
| 设计系统 | ui-ux-pro-max | getdesign.md |

### HeroUI (React)

| 需求 | 首选 | 备选 |
|------|------|------|
| 组件 | heroui-react-pro | heroui-pro-design-taste |
| 设计规范 | heroui-pro-design-taste | — |
| MCP 查询 | heroui-pro | — |

---

## 反模式检测

如果 Claude Code 生成了以下任何模式，立即调用纠正技能：

| 反模式 | 纠正技能 | 规则 |
|--------|---------|------|
| Inter 字体到处用 | frontend-design | "避免 Inter、Roboto、Arial" |
| 白底紫渐变 | frontend-design | "陈词滥调配色" |
| 图标 + 标题 + 文字卡片 ×6 | impeccable | "雷同卡片网格禁用" |
| 渐变文字 | impeccable | "background-clip: text 禁用" |
| 玻璃拟态默认 | impeccable | "玻璃拟态作为默认禁用" |
| Hero 指标模板 | impeccable | "大数字 + 小标签 + 渐变禁用" |
| 01/02/03 章节标记 | impeccable | "数字章节标记禁用" |
| Emoji 当图标 | ui-ux-pro-max | "用 SVG 图标，不用 emoji" |
| 缺少焦点状态 | bencium-controlled-ux-designer | WCAG 2.1 违规 |
| 触摸目标 < 44px | bencium-controlled-ux-designer | "最小 44×44px" |
| 动画 width/height | gsap-performance | "用 transform，不要动画布局属性" |
| 缺少 reduced-motion | gsap-core | "prefers-reduced-motion 必须处理" |

---

## 技能组合配方

### 配方 1：从零搭建落地页

```
ui-ux-pro-max --design-system "fintech landing" --persist
→ frontend-design "build landing page"
→ gsap-scrolltrigger + gsap-timeline "add scroll animations"
→ impeccable audit
```

### 配方 2：仪表盘重设计

```
impeccable document  # 提取当前 DESIGN.md
→ frontend-design "redesign dashboard"
→ ui-ux-pro-max --domain chart "real-time data"
→ gsap-core "animate data updates"
→ bencium-controlled-ux-designer "UX audit"
```

### 配方 3：品牌一致性微站

```
getdesign.md → 复制 Apple DESIGN.md
→ frontend-design "build product page like Apple"
→ gsap-scrolltrigger "Apple-style scroll animations"
→ impeccable polish
```

### 配方 4：HeroUI 管理面板

```
heroui-react-pro → 查询组件
→ heroui-pro-design-taste → 应用设计原则
→ ui-ux-pro-max --stack shadcn "admin patterns"
→ gsap-react "page transitions"
```

### 配方 5：动效展示

```
frontend-design "create animated hero section"
→ gsap-timeline "orchestrate entrance sequence"
→ gsap-scrolltrigger "pin + scrub"
→ gsap-performance "optimize for 60fps"
→ impeccable animate "add polish"
```

---

## 紧急回退方案

如果技能不可用或失败：

| 失败技能 | 回退方案 | 方法 |
|----------|---------|------|
| ui-ux-pro-max | getdesign.md | 手动复制品牌 DESIGN.md |
| gsap-* | CSS 动画 | 使用 `transition` + `@keyframes` |
| impeccable | 手动审查 | 使用 02-ui-skill-deep-research.md 中的检查清单 |
| frontend-design | web-design-guidelines | 使用 `.agents/skills/web-design-guidelines` |
| bencium-ux | ui-ux-pro-max UX 部分 | 搜索 `--domain ux` |
| heroui-* | shadcn/ui MCP | 直接使用 shadcn/ui 组件 |

---

## Source Material

- `archive/2026-05-30/source-04-ui-tool-routing-cheatsheet.md`