# UI Workflow 架构总览

> 生成时间：2026-05-30
> 来源文件：10 份 UI 工作流相关文档的综合提炼
> 定位：threetwoa AI Workflow OS —— UI/UX/Motion 层的知识地图与操作手册

---

## 1. UI Workflow 总览

### 1.1 五阶段流水线

```
Stage 0: 项目初始化          Stage 1: 设计方向            Stage 2: 实现
    ↓                            ↓                          ↓
/impeccable init          ui-ux-pro-max --design-system   frontend-design "build"
/impeccable document      frontend-design (anti-slop)     heroui-react-pro (组件)
                          getdesign.md (品牌参考)          Impeccable craft/polish

Stage 3: Motion              Stage 4: Review              Stage 5: 交付
    ↓                            ↓                          ↓
gsap-core / timeline      bencium-controlled-ux-designer   baoyu-slide-deck
gsap-scrolltrigger        Impeccable audit / critique      ppt-master
gsap-react                Codex review                     baoyu-infographic
gsap-performance                                           drawio / mermaid
```

### 1.2 关键原则

- **设计决策与实现分离**：Stage 1 只做选择，Stage 2 才写代码
- **GPT 审批门**：设计方向必须经过 GPT 确认才能进入实现
- **单职责技能**：每个 skill 只有一个主责，不重叠
- **反 AI Slop 贯穿全程**：frontend-design 定方向，Impeccable 做审查

**来源**：`D:/OneDrive/Desktop/my-claude/reports/ui-workflow/03-ui-workflow-standard.md`

---

## 2. UI Skill Stack 地图

### 2.1 已安装技能全景（按职责分层）

| 层级 | Skill | 主责 | 触发词 | 文件状态 |
|------|-------|------|--------|---------|
| **设计方向** | ui-ux-pro-max | 风格/色板/字体数据库 | "design system", "palette", "font" | 完整 (378 items) |
| | frontend-design | 反 AI Slop + 大胆方向 | "design a page", "build" | 空目录 (注册可用) |
| | getdesign.md | 品牌 DESIGN.md 参考 | 浏览复制 | 无需安装 |
| **实现** | heroui-react-pro | HeroUI Pro 组件库 | "HeroUI", "Pro component" | 完整 |
| | heroui-native-pro | HeroUI Native 组件 | "React Native", "Native Pro" | 完整 |
| | heroui-pro-design-taste | 78 条设计原则 | HeroUI 项目自动触发 | 完整 |
| **文档生成** | Impeccable | DESIGN.md / PRODUCT.md + 25 命令 | "/impeccable init" | 空目录 (注册可用) |
| **UX 审查** | bencium-controlled-ux-designer | WCAG / 响应式 / 动效规范 | "accessibility", "audit" | 空目录 (注册可用) |
| **动画** | gsap-core | 补间/缓动/交错 | "animate", "gsap", "tween" | 空目录 (注册可用) |
| | gsap-timeline | 时间线编排 | "timeline", "sequence" | 空目录 (注册可用) |
| | gsap-scrolltrigger | 滚动驱动动画 | "scroll animation", "parallax" | 空目录 (注册可用) |
| | gsap-react | React 集成 | "React animation", "useGSAP" | 空目录 (注册可用) |
| | gsap-performance | 60fps 优化 | "performance", "60fps" | 空目录 (注册可用) |
| | gsap-plugins | 插件参考 (SplitText/Flip/DrawSVG) | "SVG animation", "text reveal" | 空目录 (注册可用) |
| | gsap-utils | 工具函数 | — | 空目录 (注册可用) |
| | gsap-frameworks | Vue/Svelte 生命周期 | — | 空目录 (注册可用) |
| **图表/演示** | baoyu-diagram | 深色科技 SVG | "diagram", "架构图" | 完整 |
| | baoyu-infographic | 21 布局 × 22 风格信息图 | "infographic", "信息图" | 完整 |
| | baoyu-slide-deck | 幻灯片生成 | "slides", "presentation" | 完整 |
| | baoyu-cover-image | 文章封面 | "cover image" | 完整 |
| | ppt-master | PPTX 导出 | "PPT", "presentation" | 完整 (1537 items) |
| | drawio-skill | 专业图表 (泳道/容器) | "diagram", "flowchart" | 完整 |
| | excalidraw-skill | 草图风视觉论证 | "diagram", "visualize" | 完整 |
| | mermaid-skill | 文本驱动图表 | "mermaid", "sequence" | 完整 |
| | tldraw-skill | 手绘白板风 | "whiteboard", "draw" | 完整 |
| **原型** | prototype | 可交互原型 | "prototype", "mock up" | 完整 |

### 2.2 Skill 依赖关系

```
设计输入
    ├── frontend-design (方向, anti-slop)
    ├── ui-ux-pro-max (palette/style/font DB)
    └── getdesign.md (品牌 DNA)
           ↓
    DESIGN.md / PRODUCT.md (Impeccable 生成)
           ↓
    实现
    ├── frontend-design (代码生成)
    ├── Impeccable (craft/shape/polish)
    └── heroui-pro-design-taste (HeroUI 项目)
           ↓
    Motion
    └── gsap-skills (8 子模块)
           ↓
    Review
    ├── bencium-controlled-ux-designer (UX audit)
    ├── Impeccable (critique/audit)
    └── ui-ux-pro-max (UX guidelines)
           ↓
    Presentation
    ├── baoyu-slide-deck (slides)
    ├── baoyu-infographic (infographics)
    ├── ppt-master (PPTX)
    └── drawio/excalidraw/mermaid/tldraw (diagrams)
```

**来源**：`D:/OneDrive/Desktop/my-claude/reports/ui-workflow/02-ui-skill-deep-research.md`

---

## 3. UI Tool Routing 模型

### 3.1 快速决策表

| 我想... | 使用 Skill | 命令 / 触发 |
|---------|-----------|------------|
| **选风格** | ui-ux-pro-max | `python3 skills/ui-ux-pro-max/scripts/search.py "..." --design-system` |
| **选色板** | ui-ux-pro-max | `--domain color "..."` |
| **选字体** | ui-ux-pro-max | `--domain typography "..."` |
| **复制品牌设计** | getdesign.md | 浏览 → 复制 DESIGN.md |
| **避免 AI Slop** | frontend-design | 说 "design a page" (自动触发) |
| **写 DESIGN.md** | Impeccable | `/impeccable init` 或 `/impeccable document` |
| **写 PRODUCT.md** | Impeccable | `/impeccable init` |
| **构建落地页** | frontend-design + Impeccable craft | "build landing page" |
| **构建仪表盘** | ui-ux-pro-max + frontend-design | "build dashboard" + `--domain chart` |
| **添加页面加载动画** | gsap-core + gsap-timeline | "animate page load" |
| **添加滚动动画** | gsap-scrolltrigger | "scroll animation" / "parallax" |
| **React 动画** | gsap-react | "React animation" / "useGSAP" |
| **优化动画 FPS** | gsap-performance | "animation performance" / "60fps" |
| **SVG / 文本特效** | gsap-plugins | "SVG animation" / "text reveal" |
| **审查 UI 质量** | Impeccable audit | `/impeccable audit` |
| **检查无障碍** | bencium-controlled-ux-designer | "accessibility audit" / "a11y" |
| **创建幻灯片** | baoyu-slide-deck | "create slides" / "presentation" |
| **创建 PPT** | ppt-master | "create PPT" / "make presentation" |
| **创建信息图** | baoyu-infographic | "infographic" / "信息图" |
| **创建架构图** | drawio / excalidraw / mermaid | "diagram" / "flowchart" / "架构图" |
| **创建封面图** | baoyu-cover-image | "cover image" / "article cover" |

### 3.2 按技术栈路由

#### React / Next.js

| 需求 | 首选 | 备选 |
|------|------|------|
| 组件代码 | frontend-design | heroui-react-pro |
| 动画 | gsap-react | gsap-core |
| 设计系统 | ui-ux-pro-max | heroui-pro-design-taste |
| 审查 | bencium-controlled-ux-designer | Impeccable audit |

#### Vue / Svelte

| 需求 | 首选 | 备选 |
|------|------|------|
| 组件代码 | frontend-design | — |
| 动画 | gsap-frameworks | gsap-core |
| 设计系统 | ui-ux-pro-max | — |

#### HTML + Tailwind

| 需求 | 首选 | 备选 |
|------|------|------|
| 页面代码 | frontend-design | ui-ux-pro-max |
| 动画 | gsap-core + gsap-scrolltrigger | — |
| 设计系统 | ui-ux-pro-max | getdesign.md |

#### HeroUI (React)

| 需求 | 首选 | 备选 |
|------|------|------|
| 组件 | heroui-react-pro | heroui-pro-design-taste |
| 设计品味 | heroui-pro-design-taste | — |
| MCP 查询 | heroui-pro (MCP) | — |

**来源**：`D:/OneDrive/Desktop/my-claude/reports/ui-workflow/04-ui-tool-routing-cheatsheet.md`

---

## 4. HeroUI Pro 知识地图

### 4.1 技术栈基线

| 项 | 版本 | 备注 |
|---|---|---|
| Next.js | 16.2.3 | App Router（强制） |
| React | 19.2.5 | — |
| TypeScript | 5.9.3 | — |
| Tailwind CSS | 4.2.2 | v3 不兼容 |
| @heroui/react | 3.0.3 | 开源基础组件 |
| @heroui-pro/react | latest | 需 hpsetup 认证 |
| @heroui/styles | 3.0.3 | 主题变量 |
| @gravity-ui/icons | 2.18.0 | 图标库 |
| recharts | 3.8.0 | Dashboard/Finances 额外依赖 |

### 4.2 四大模板选型

| 模板 | 端口 | 场景 | Shell 复杂度 | 独有特性 |
|------|------|------|-------------|---------|
| template-dashboard | 3003 | 后台仪表盘 | 中 | widgets/, recharts, AppShell |
| template-chat | 3004 | AI 助手/聊天 | 中 | ChatShell, 搜索对话框, Cmd+K |
| template-email | 3005 | 邮件客户端 | 低 | EmailShell, 双层动态路由, 最简结构 |
| template-finances | 3006 | 财务/记账 | 高 | widgets/, recharts, 预览模式 |

### 4.3 三层职责边界（核心架构模式）

```
components/    → 全局基础设施层（AppShell/ChatShell/EmailShell, Navbar, Sidebar）
views/         → 页面组合层（组合 widgets 形成完整页面，不直接引用 Pro 组件）
widgets/       → Pro 组件消费层（直接引用 @heroui-pro/react，绑定 mock 数据）
```

**差异**：
- email 无 views/widgets：所有逻辑内聚在 components/
- chat 无 widgets：业务组件直接放 components/
- dashboard/finances 有完整三层：业务复杂度最高

### 4.4 Pro 组件全景（55 个 Web + 30 个 Native）

#### 数据可视化（7 个）

| 组件 | 复杂度 | 复合 API |
|------|--------|---------|
| AreaChart | 3/5 | Grid, XAxis, YAxis, Area, Tooltip |
| BarChart | 3/5 | Bar, XAxis, YAxis, Tooltip |
| LineChart | 3/5 | Line, XAxis, YAxis, Tooltip |
| PieChart | 3/5 | Pie, Cell, Tooltip |
| RadarChart | 3/5 | Radar, PolarGrid, Tooltip |
| RadialChart | 3/5 | Bar, Tooltip |
| ComposedChart | 4/5 | 组合多个图表类型 |

#### 数据表格与看板（3 个）

| 组件 | 复杂度 | 关键约束 |
|------|--------|---------|
| DataGrid | 5/5 | 每列必须 id + accessorKey；aria-label 必填 |
| Kanban | 4/5 | Card 必须在 CardList 内（render prop 模式） |
| FileTree | 3/5 | Tree, TreeItem, DragHandle |

#### 仪表盘 / KPI（2 个）

| 组件 | 复合 API |
|------|---------|
| KPI | Root, Header, Title, Value, Trend, Chart |
| Widget | Header, Content, Footer |

#### 交互组件（3 个）

| 组件 | 复合 API |
|------|---------|
| Rating | Item |
| Stepper | Step, Indicator, Content, Title, Separator |
| Command | Input, List, Item, Group |

### 4.5 hpsetup 认证流程

```powershell
# 1. 设置环境变量
$env:HEROUI_KEY = "hp_xxxxxxxx"

# 2. 安装依赖
pnpm install

# 3. 运行 hpsetup（7 阶段流水线）
npx -y hpsetup@latest

# 4. 验证真包就位
Test-Path 'node_modules/@heroui-pro/react/dist/index.js'
```

**7 阶段**：环境检测 → 产品发现 → 版本校验 → 下载产物 → 信任配置 → Peer 依赖 → 收尾

### 4.6 关键踩坑记录

| 坑 | 现象 | 处理 |
|---|------|------|
| Key 字符混淆 | `Invalid or inactive key` | 重新复制 Key，注意 l/1、0/O |
| `latest` 版本号 | `Invalid comparator: latest` | 改成具体版本号如 `1.0.0-beta.4` |
| DataGrid 缺 id | TS 报错 `Property 'id' is missing` | 每列补充 `id` |
| Kanban Card 位置 | `GridListItem outside collection` | 用 CardList render prop 包裹 |
| TooltipContent API | `formatter` 不存在 | 去掉 formatter，用默认或自定义 content |
| Vite JSX 报错 | `does not provide export named 'jsx'` | vite.config.ts 加 `optimizeDeps.include` |

**来源**：`D:/OneDrive/Desktop/my-claude/02-template-architecture.md`、`D:/OneDrive/Desktop/my-claude/03-porting-guide-and-pitfalls.md`、`D:/OneDrive/Desktop/my-claude/heroui-pro-v3-component-reference-and-porting-guide.md`

---

## 5. GSAP Motion 决策树

### 5.1 什么时候用 GSAP

| 场景 | 用 GSAP? | 替代方案 |
|------|---------|---------|
| 页面加载入场序列 | 是 | — |
| 滚动触发显现 | 是 | CSS scroll-driven animations（支持有限） |
| 复杂时间线编排 | 是 | — |
| SVG 路径绘制 | 是 | — |
| 文本字符拆分 | 是 | — |
| 简单 hover 过渡 | **否** | CSS transition |
| 颜色渐变 | **否** | CSS transition |
| React 状态驱动动画 | **否** | Framer Motion |
| 包体积敏感 | **否** | CSS (GSAP ~25KB gzipped) |

### 5.2 按动画类型选子模块

```
What type of motion?
├── Page load entrance
│   └── gsap-timeline + gsap-core
│       → 编排交错显现
│       → 用 labels 提高可维护性
│
├── Scroll-triggered
│   └── gsap-scrolltrigger
│       → Pin, scrub, 或 toggle
│       → Batch 处理列表
│
├── React component animation
│   └── gsap-react
│       → useGSAP hook（不用 useEffect）
│       → 传 scope 限制选择器
│       → 卸载自动清理
│
├── SVG / text special effects
│   └── gsap-plugins
│       → SplitText 文本显现
│       → DrawSVG 线条绘制
│       → MorphSVG 形状变形
│
├── Performance optimization
│   └── gsap-performance
│       → quickTo 鼠标跟随
│       → will-change 策略
│       → 批量 DOM 操作
│
└── Simple hover / transition
    └── CSS transition（不用 GSAP）
        → 减少包体积
```

### 5.3 核心代码模式

#### 基础补间
```js
gsap.to(".box", { x: 100, duration: 0.6, ease: "power2.inOut" });
gsap.from(".box", { opacity: 0, y: 50 });
```

#### 时间线
```js
const tl = gsap.timeline({ defaults: { duration: 0.5 } });
tl.to(".a", { x: 100 })
  .to(".b", { y: 50 }, "+=0.2")
  .to(".c", { opacity: 0 }, "<");
```

#### ScrollTrigger
```js
gsap.registerPlugin(ScrollTrigger);
gsap.to(".box", {
  scrollTrigger: { trigger: ".box", start: "top center", scrub: true },
  x: 500
});
```

#### React useGSAP
```jsx
import { useGSAP } from "@gsap/react";
useGSAP(() => {
  gsap.to(".box", { x: 100 });
}, { scope: containerRef });
```

### 5.4 性能铁律

- 只动画 `transform` + `opacity`（合成器工作）
- 不用 `width`/`height`/`top`/`left` 动画
- `will-change: transform` 选择性添加，动画完移除
- 频繁更新用 `gsap.quickTo()`
- 列表用 `ScrollTrigger.batch()`

### 5.5 无障碍

```js
gsap.matchMedia({
  "(prefers-reduced-motion: reduce)": () => {
    gsap.set(".animated", { opacity: 1, y: 0 });
  },
  "(min-width: 768px)": () => {
    gsap.to(".animated", { x: 100 });
  }
});
```

**铁律**：Never gate content on animation. 提供 reduced-motion 路径让内容立即可见。

### 5.6 清理清单

- React：`useGSAP` 自动清理，或手动 `ctx.revert()`
- ScrollTrigger：`ScrollTrigger.getById("id").kill()`
- 布局变化后：`ScrollTrigger.refresh()`（防抖）
- 生产环境：移除所有 `markers`

**来源**：`D:/OneDrive/Desktop/my-claude/reports/ui-workflow/05-gsap-motion-layer-analysis.md`

---

## 6. Diagram / Presentation 工具路由

### 6.1 六款图表技能对比

| 技能 | 输出格式 | 核心风格 | 最佳场景 | 依赖 |
|------|---------|---------|---------|------|
| **mermaid-skill** | `.md` Mermaid 代码 | 文本驱动/自动布局 | GitHub README / 博客 / Markdown 文档 | 零依赖 |
| **drawio-skill** | `.drawio` XML | 干净专业风 | 商务 PPT / 学术论文 / 正式交付 | draw.io Desktop |
| **tldraw-skill** | `.tldr` JSON | 手绘白板风 | 内部文档 / 白板讲解 | tldraw-cli |
| **excalidraw-skill** | `.excalidraw` JSON | 草图风/视觉论证 | 产品汇报 / 概念演示 / 教学 | Python + uv + Playwright |
| **baoyu-diagram** | `.svg` 纯矢量 | 深色科技风 | 技术文档 / 博客 dark mode | Bun/Node.js |
| **baoyu-infographic** | `.png` 栅格图 | 多元插画风 | 公众号 / 小红书 / 社交媒体 | Bun + 图像后端 |

### 6.2 按场景选择

| 场景 | 推荐 | 理由 |
|------|------|------|
| 内部技术文档 / 白板讲解 | tldraw-skill | 手绘风轻松自然，vision 自检闭环 |
| 商务 PPT / 学术论文 / 正式交付 | drawio-skill | 干净专业，支持 PDF 导出和泳道 |
| GitHub README / 博客 / Markdown | mermaid-skill | 纯文本嵌入，版本控制友好 |
| 产品汇报 / 概念演示 / 教学视频 | excalidraw-skill | 草图风暗示"迭代中"，视觉论证能力强 |
| 技术文档 dark mode 配图 | baoyu-diagram | 深色科技 SVG，矢量无损，中文友好 |
| 公众号 / 小红书 / 社交媒体 | baoyu-infographic | 21 布局 × 22 风格，出版级输出 |

### 6.3 按复杂度选择

| 复杂度 | 推荐 |
|--------|------|
| 随手画（< 5 节点）| mermaid-skill（最快，零依赖） |
| 中等复杂度（5-15 节点）| tldraw-skill / baoyu-diagram |
| 高复杂度（> 15 节点，需嵌套容器）| drawio-skill（swimlane + 分组最强） |
| 需要"讲故事"的教学/演示图 | excalidraw-skill（多 zoom 层级 + 证据工件） |
| 高密度知识总结图 | baoyu-infographic（信息图叙事） |

### 6.4 Presentation 工具

| 需求 | 工具 | 输出 |
|------|------|------|
| 幻灯片图片 | baoyu-slide-deck | 单页 PNG 序列 |
| PPTX 文件 | ppt-master | .pptx（多格式 SVG → PPTX） |
| 信息图 | baoyu-infographic | 出版级 PNG |
| 封面图 | baoyu-cover-image | 文章/项目封面 |

**来源**：`D:/OneDrive/Desktop/my-claude/Claude Code 画图技能调研报告.md`

---

## 7. UI Review Protocol

### 7.1 审查维度矩阵

| 维度 | Skill | 检查项 |
|------|-------|--------|
| **Accessibility** | bencium-controlled-ux-designer | WCAG 2.1/2.2 合规性 |
| **Touch targets** | bencium-controlled-ux-designer | 最小 44×44px |
| **Responsive** | bencium-controlled-ux-designer | 断点策略 |
| **Motion** | gsap-performance | 60fps, reduced-motion |
| **Visual polish** | Impeccable | 禁用模式, AI Slop 测试 |
| **Typography** | Impeccable | 行长度, 层级 |
| **Color** | Impeccable | 对比度比率 |

### 7.2 质量门检查清单

#### 实现阶段

- [ ] 无禁用字体（Inter, Roboto, Arial, Space Grotesk）
- [ ] 无禁用配色（白底紫渐变）
- [ ] 无禁用布局（相同卡片网格 ×6, hero-metric 模板）
- [ ] 所有交互元素有 `cursor-pointer`
- [ ] Focus 状态可见
- [ ] 响应式：375px, 768px, 1024px, 1440px
- [ ] 移动端无水平滚动

#### Motion 阶段

- [ ] `prefers-reduced-motion` 已处理
- [ ] 只动画 `transform` + `opacity`
- [ ] 卸载时清理（useGSAP 或 ctx.revert）
- [ ] 无 SSR 执行
- [ ] 生产环境移除 `markers`
- [ ] 微交互时长 150-300ms
- [ ] 无 layout thrashing

#### 反模式检测

| 反模式 | 纠正 Skill | 规则 |
|--------|-----------|------|
| 全局 Inter 字体 | frontend-design | "Avoid Inter, Roboto, Arial" |
| 白底紫渐变 | frontend-design | "Cliched color schemes" |
| 图标+标题+文本卡片 ×6 | Impeccable | "Identical card grids banned" |
| 渐变文字 | Impeccable | "background-clip: text banned" |
| 默认玻璃拟态 | Impeccable | "Glassmorphism as default banned" |
| Hero metric 模板 | Impeccable | "Big number + small label + gradient banned" |
| 01/02/03 章节标记 | Impeccable | "Numbered section markers banned" |
| Emoji 当图标 | ui-ux-pro-max | "Use SVG icons, not emojis" |
| 缺失 focus 状态 | bencium-controlled-ux-designer | WCAG 2.1 违规 |
| 触摸目标 < 44px | bencium-controlled-ux-designer | "Minimum 44x44px" |
| 动画 width/height | gsap-performance | "Use transform, not layout properties" |
| 缺失 reduced-motion | gsap-core | "prefers-reduced-motion required" |

**来源**：`D:/OneDrive/Desktop/my-claude/reports/ui-workflow/03-ui-workflow-standard.md`、`D:/OneDrive/Desktop/my-claude/reports/ui-workflow/04-ui-tool-routing-cheatsheet.md`

---

## 8. GPT → Claude Code → Codex 的 UI Handoff 协议

### 8.1 GPT → Claude Code

**输入**：
- UI brief（产品类型, 受众, 目标）
- 技术栈偏好
- 参考网站（可选）
- 约束（预算, 时间, 无障碍等级）

**Claude Code 输出**：
- 设计系统提案（风格, 色板, 字体）
- 向 GPT 的问题（如有不清楚）

**门控**：GPT 批准设计方向后才能进入实现

### 8.2 Claude Code → Codex

**输入**：
- 完整实现代码
- DESIGN.md
- Motion 规格（如有）

**Codex 输出**：
- 审查报告（bug, UX 问题, 性能）
- 建议修复

**门控**：所有关键问题已解决

### 8.3 Codex → GPT

**输入**：
- Claude Code 实现摘要
- Codex 审查报告
- 遗留问题

**GPT 输出**：
- 未解决问题的战略决策
- 下次迭代方向

### 8.4 完整工作流

```
GPT: 创建 UI brief
  → Claude Code: frontend-design + ui-ux-pro-max → 设计系统提案
  → Claude Code: Impeccable init → PRODUCT.md + DESIGN.md
  → GPT: 批准设计方向
  → Claude Code: frontend-design + Impeccable craft → 构建
  → Claude Code: gsap-* → 动画
  → Claude Code: Impeccable audit + bencium → 自审查
  → Codex: 代码审查
  → GPT: 战略决策
```

### 8.5 最小可行工作流

快速项目跳过阶段：
```
Brief → frontend-design "build it" → gsap-core "add simple fade-in" → Done
```

高价值项目完整流程：
```
Brief → Stage 0: Impeccable init
     → Stage 1: ui-ux-pro-max + frontend-design direction
     → GPT 批准
     → Stage 2: frontend-design implementation
     → Stage 3: gsap-* motion
     → Stage 4: bencium + Impeccable + Codex review
     → Stage 5: Presentation（如需要）
     → Ship
```

**来源**：`D:/OneDrive/Desktop/my-claude/reports/ui-workflow/03-ui-workflow-standard.md`、`D:/OneDrive/Desktop/my-claude/reports/ui-workflow/06-handoff-for-gpt.md`

---

## 9. 建议创建到 docs/ui-workflow/ 的文档

基于现有报告，建议将以下文档归档到 `docs/ui-workflow/` 作为持久知识层：

| 文档 | 来源 | 优先级 | 说明 |
|------|------|--------|------|
| `design-system-template.md` | Impeccable init 输出 | P0 | 新项目 DESIGN.md 模板 |
| `product-context-template.md` | Impeccable init 输出 | P0 | PRODUCT.md 模板 |
| `gsap-implementation-patterns.md` | 05-gsap-motion-layer-analysis.md | P0 | GSAP 代码模式速查 |
| `gsap-cleanup-checklist.md` | 05-gsap-motion-layer-analysis.md | P0 | 清理和反模式清单 |
| `heroui-component-quickref.md` | heroui-pro-v3-component-reference... | P0 | 55 组件复合 API 速查 |
| `heroui-porting-checklist.md` | 03-porting-guide-and-pitfalls.md | P0 | 14 条踩坑 + 生产 checklist |
| `anti-pattern-cookbook.md` | 04-ui-tool-routing-cheatsheet.md | P1 | 12 条反模式 + 纠正方案 |
| `skill-combination-recipes.md` | 04-ui-tool-routing-cheatsheet.md | P1 | 5 个常用组合配方 |
| `diagram-tool-selection-guide.md` | Claude Code 画图技能调研报告.md | P1 | 6 款工具按场景/复杂度/环境选择 |
| `windows-skill-gap-workaround.md` | 01-ui-skill-stack-installation-report.md | P1 | Windows 空目录问题记录和规避 |
| `color-palette-reference.md` | ui-ux-pro-max | P2 | 96 色板精选（按需生成） |
| `font-pairing-reference.md` | ui-ux-pro-max | P2 | 57 字体配对精选（按需生成） |

---

## 10. 建议创建到 templates/ 的 DESIGN / PRODUCT 模板

### 10.1 DESIGN.md 模板

```markdown
# DESIGN.md —— [项目名称]

## 1. 设计方向
- 风格：[brutalist / minimal / retro-futuristic / organic / luxury / playful]
- 情绪关键词：
- 参考品牌：

## 2. 色彩系统
- 主色：
- 强调色：
- 背景色：
- 文字色：
- 图表色：var(--chart-1) ~ var(--chart-5)

## 3. 字体
- 标题：
- 正文：
- 代码/数字：

## 4. 间距
- 页面内边距：
- 卡片间距：
- 组件间距：

## 5. 组件规范
- 按钮：
- 卡片：
- 输入框：
- 表格：

## 6. 动画
- 页面加载：
- 滚动触发：
- 微交互：
- 缓动函数：

## 7. 响应式断点
- 375px (mobile)
- 768px (tablet)
- 1024px (desktop)
- 1440px (wide)

## 8. 无障碍
- 对比度目标：WCAG AA
- 减少动效：prefers-reduced-motion
- 焦点状态：
```

### 10.2 PRODUCT.md 模板

```markdown
# PRODUCT.md —— [项目名称]

## 1. 产品概述
- 类型：[SaaS / 电商 / 作品集 / 博客 / 后台]
- 目标受众：
- 核心价值主张：

## 2. 用户画像
- 主要用户：
- 使用场景：
- 技术熟练度：

## 3. 目标与约束
- 商业目标：
- 技术约束：
- 时间约束：
- 预算约束：

## 4. 竞品参考
- 直接竞品：
- 设计参考：

## 5. 成功指标
- 转化率：
- 用户留存：
- 性能目标：
```

### 10.3 项目级 CLAUDE.md 模板（UI 项目专用）

```markdown
# CLAUDE.md —— [项目名]

## 设计系统
- 参考 `DESIGN.md`
- 使用 `ui-ux-pro-max` 查询风格/色板/字体
- HeroUI 项目额外参考 `heroui-pro-design-taste`

## 技能路由
- 构建：frontend-design
- 组件：heroui-react-pro（如使用 HeroUI）
- 动画：gsap-react / gsap-scrolltrigger
- 审查：Impeccable audit + bencium-controlled-ux-designer

## 禁用模式（自动检查）
- [ ] Inter / Roboto / Arial / Space Grotesk
- [ ] 白底紫渐变
- [ ] 相同卡片网格 ×6
- [ ] 渐变文字
- [ ] 默认玻璃拟态
- [ ] Hero metric 模板
- [ ] 01/02/03 章节标记

## 质量门
- [ ] 375px / 768px / 1024px / 1440px 响应式
- [ ] Focus 状态可见
- [ ] 触摸目标 ≥ 44px
- [ ] prefers-reduced-motion 处理
- [ ] ScrollTrigger markers 生产移除
```

---

## 11. 哪些 UI Skill 暂时不要再安装

### 11.1 已覆盖，无需重复

| Skill | 原因 | 现有替代 |
|-------|------|---------|
| LibreUIUX (HermeticOrmus) | 过重（152 agents + 74 skills），会导致 skill 冲突 | 当前 stack 已覆盖 90% 场景 |
| ux-ui-mastery | 未找到独立仓库 | ui-ux-pro-max + frontend-design + Impeccable 已覆盖 |
| aesthetic-foundations | 未找到独立仓库 | frontend-design + Impeccable 已覆盖 |
| huashu-design | 仓库 404 | PPT Master + baoyu-slide-deck 已覆盖演示需求 |
| web-design-guidelines | 已存在但空目录 | bencium-controlled-ux-designer 已覆盖 |

### 11.2 可选但非必须

| Skill | 场景 | 决策 |
|-------|------|------|
| taste-skill (Leonxlnx) | 更细腻的美学方向 | 仅当 frontend-design 的 bold 方向过于极端时考虑 |
| getdesign.md | 品牌 DESIGN.md 参考 | 作为网站使用，无需安装为 skill |

### 11.3 安装建议总结

> **当前 stack 足够。** 除非发现具体缺口，否则不再新增 UI skill。
> 如需扩展，优先方向：
> 1. 移动端专项（React Native 设计模式）
> 2. 3D/WebGL 动画（Three.js / R3F）
> 3. 微交互细节（Framer Motion 替代 GSAP 的轻量场景）

**来源**：`D:/OneDrive/Desktop/my-claude/reports/ui-workflow/06-handoff-for-gpt.md`

---

## 12. Windows Skill 空目录问题如何记录和规避

### 12.1 问题定义

`npx skills` 在 Windows 上注册 skill 到 Claude Code 索引，但**不复制实际文件**到磁盘。

**受影响技能**（空目录）：
- `.agents/skills/gsap-core/` — 0 items
- `.agents/skills/gsap-timeline/` — 0 items
- `.agents/skills/gsap-scrolltrigger/` — 0 items
- `.agents/skills/gsap-react/` — 0 items
- `.agents/skills/gsap-performance/` — 0 items
- `.agents/skills/gsap-plugins/` — 0 items
- `.agents/skills/gsap-utils/` — 0 items
- `.agents/skills/gsap-frameworks/` — 0 items
- `.agents/skills/impeccable/` — 0 items
- `.agents/skills/bencium-controlled-ux-designer/` — 0 items
- `.agents/skills/frontend-design/` — 0 items（预先存在）
- `.agents/skills/web-design-guidelines/` — 0 items（预先存在）

### 12.2 影响评估

| 影响 | 程度 | 说明 |
|------|------|------|
| Skill 触发 | 无影响 | Claude Code 索引已注册，触发词正常工作 |
| 文本 skill | 低影响 | SKILL.md 内容可从 GitHub raw URL 获取 |
| 脚本 skill | **高影响** | 需要本地脚本执行的 skill 会失败 |

**高风险 skill**：ui-ux-pro-max（依赖 `scripts/search.py`）

### 12.3 规避方案

#### 方案 A：手动克隆（推荐用于脚本 skill）

```powershell
# 为需要本地脚本的 skill 手动克隆
git clone --depth 1 https://github.com/nextlevelbuilder/ui-ux-pro-max-skill ~/.claude/skills/ui-ux-pro-max-src

# GSAP / Impeccable / bencium 纯文本 skill 无需克隆
# 触发时 Claude Code 从索引加载上下文
```

#### 方案 B：保持现状（推荐用于纯文本 skill）

GSAP、Impeccable、bencium 均为文本参考型 skill，不依赖本地脚本：
- 触发时 Claude Code 从 skill 索引加载 SKILL.md 内容
- 无需磁盘文件即可提供指导

#### 方案 C：切换到 WSL2

```bash
# WSL2 中安装 skill（Linux 文件系统无此问题）
npx skills add greensock/gsap-skills
```

**缺点**：WSL2 访问 Windows 文件系统性能差，不适合大文件操作

### 12.4 检测脚本

```powershell
# 检测空目录 skill
Get-ChildItem ~/.agents/skills/ | Where-Object {
  $_.PSIsContainer -and (Get-ChildItem $_.FullName -Recurse -File).Count -eq 0
} | Select-Object Name, FullName

# 检测注册但未安装的 skill
# 对比 Claude Code 可用 skill 列表 vs 实际文件存在性
```

### 12.5 记录模板

在 `docs/ui-workflow/windows-skill-gap-workaround.md` 中记录：

```markdown
## Skill 文件状态追踪

| Skill | 注册状态 | 文件状态 | 风险 | 措施 |
|-------|---------|---------|------|------|
| gsap-core | 已注册 | 空目录 | 低 | 纯文本，无需处理 |
| gsap-timeline | 已注册 | 空目录 | 低 | 纯文本，无需处理 |
| ... | ... | ... | ... | ... |
| ui-ux-pro-max | 已注册 | 完整 | 无 | 已完整安装 |
```

### 12.6 最佳实践

1. **安装后验证**：每次 `npx skills add` 后检查目录是否为空
2. **分类处理**：
   - 纯文本 skill → 无需处理，触发正常
   - 脚本 skill → 手动克隆或找替代方案
3. **优先用 `.claude/skills/`**：部分 skill 在 `.claude/skills/` 有完整文件（如 ui-ux-pro-max、baoyu-*）
4. **避免重复安装**：同一 skill 不要同时装在 `.claude/skills/` 和 `.agents/skills/`

**来源**：`D:/OneDrive/Desktop/my-claude/reports/ui-workflow/01-ui-skill-stack-installation-report.md`

---

## 附录：来源文件索引

| 文件路径 | 内容 |
|---------|------|
| `D:/OneDrive/Desktop/my-claude/reports/ui-workflow/01-ui-skill-stack-installation-report.md` | 安装报告、Windows 空目录问题 |
| `D:/OneDrive/Desktop/my-claude/reports/ui-workflow/02-ui-skill-deep-research.md` | 8 个 skill 深度分析、依赖关系图 |
| `D:/OneDrive/Desktop/my-claude/reports/ui-workflow/03-ui-workflow-standard.md` | 五阶段工作流、handoff 协议 |
| `D:/OneDrive/Desktop/my-claude/reports/ui-workflow/04-ui-tool-routing-cheatsheet.md` | 快速决策表、反模式检测、组合配方 |
| `D:/OneDrive/Desktop/my-claude/reports/ui-workflow/05-gsap-motion-layer-analysis.md` | GSAP 代码模式、性能、清理、反模式 |
| `D:/OneDrive/Desktop/my-claude/reports/ui-workflow/06-handoff-for-gpt.md` | GPT handoff、决策项、风险 |
| `D:/OneDrive/Desktop/my-claude/02-template-architecture.md` | 四大模板架构、可复用组件清单 |
| `D:/OneDrive/Desktop/my-claude/03-porting-guide-and-pitfalls.md` | hpsetup 认证、14 条踩坑、生产 checklist |
| `D:/OneDrive/Desktop/my-claude/heroui-pro-v3-component-reference-and-porting-guide.md` | 55 组件 API、移植代码、选型梯队 |
| `D:/OneDrive/Desktop/my-claude/Claude Code 画图技能调研报告.md` | 6 款图表技能详解、选择指南 |
| `D:/OneDrive/Desktop/my-claude/Claude Code 本机 Skills 全量汇总.md` | 67 个 skill 全量清单、触发词、分类 |
