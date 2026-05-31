---
title: "UI Workflow L3: Aceternity 动效层"
type: reference
status: active
source_files:
  - "D:/OneDrive/Desktop/test-lib/aceternity/"
  - "docs/ui-workflow/gsap-motion-guide.md"
updated: 2026-05-31
owner: threetwoa
---

# UI Workflow L3: Aceternity 动效层

> 本文档定义 Aceternity 在 UI Workflow 资产分层（L0→L6）中的定位、使用策略和移植方法。

---

## 1. 概述：Aceternity 在 L0→L6 链路中的位置

```
L0 Mkdirs(业务) → L1 MotionSites(灵感) → L2 Taste/frontend-design(判断)
                        ↓
              L3 Aceternity(动效) ← 你在这里
                        ↓
              L4 HeroUI v3(组件) → L5 Claude Code(执行) → L6 Codex/screenshots(审查)
```

Aceternity UI 是一套以 Framer Motion 为核心构建的现成动效组件和 Next.js 模板集合。在 UI Workflow 中，它位于 **L3 动效层**——在 L2 设计方向确定后，从这里挑选并移植动效组件到目标项目。

**核心定位：**
- 不是设计系统，是**动效素材库**
- 不是组件框架，是**可移植的动效实现参考**
- 所有模板基于 Next.js + Tailwind CSS + Framer Motion
- 许可为 Apache License 2.0，允许修改和再分发（需保留版权声明）

**何时使用 Aceternity：**
- 需要快速获得高质量的入场动画、hover 效果、scroll 揭示
- 需要 3D card、粒子背景、文字特效等复杂动效的现成实现
- 设计方向已确定（L2 完成），进入执行阶段

**何时不使用 Aceternity：**
- 设计方向尚未确定（应在 L2 解决）
- 项目技术栈不是 React/Next.js
- 需要高度定制的时间线动画（考虑 GSAP）
- 包体积极度敏感（Framer Motion 约 30KB+ gzip）

---

## 2. 核心组件类型

Aceternity 模板中反复出现的动效模式可分为以下几类：

### 2.1 3D Cards & 透视效果
- `CardPattern`、`GridPattern` — 带渐变边框和悬停 3D 倾斜的卡片
- `LinkPreview` — 悬停时展示预览图的链接卡片
- `ambient-color` — 环境光晕背景卡片

### 2.2 Particles & 背景动效
- `GridPattern` / `GridLines` — SVG 网格背景图案
- `Circles` / `Lines` — 装饰性几何背景
- `globe` — 3D 地球/球体背景（基于 cobe）
- `dotted-map` — 点阵地图背景

### 2.3 Scroll Effects & 揭示动画
- `in-view-div` — 进入视口时触发的淡入上移动画
- `BlurImage` — 图片懒加载 + 模糊渐显
- `horizontal-gradient` — 水平滚动渐变效果

### 2.4 Hover Animations
- `Button` / `ButtonCTA` — 带磁吸/缩放反馈的按钮
- `LinkPreview` — 悬停展开预览
- `animated-svg` — SVG 路径描边动画

### 2.5 Text Effects
- `Heading` / `SubHeading` — 分段揭示的标题动画
- `AnimatedCounter` — 数字滚动计数
- `Highlight` — 文字高亮扫过效果

### 2.6 Layout Transitions
- `mode-toggle` — 深色/浅色模式切换动画
- `next-view-transitions` — 页面间过渡动画
- `video-modal` / `macbook` — 模态框/设备框展开动画

---

## 3. 八个模板项目速查

| 模板 | 定位 | 典型场景 | 核心动效 |
|------|------|----------|----------|
| **agenlabs-agency** | 代理机构/创意工作室 | 展示服务、作品集、客户案例 | GridPattern、HeroFeatures、LinkPreview、Testimonial |
| **ai-saas** | AI/SaaS 产品官网 | 功能介绍、定价、博客、 testimonials | Globe、GridFeatures、TestimonialColumn、PricingGrid |
| **devpro-portfolio** | 开发者个人作品集 | 项目展示、技术栈、博客、时间线 | Beam、Timeline、LatestRepos、Experience |
| **sidefolio-portfolio** | 侧边栏导航作品集 | 简洁个人站、产品展示 | Sidebar、Circles、Lines、WorkHistory |
| **startup-landing-page** | 初创公司落地页 | MVP 产品发布、早期获客 | 极简结构、Hero、Features、CTA |
| **foxtrot-marketing** | 营销/内容网站 | 博客、内容营销、SEO 落地页 | Banner、CardPattern、BlurImage、MDXBlog |
| **playful-marketing** | 活泼风格营销站 | SaaS 营销、产品展示、博客 | AnimatedCounter、MapSection、FAQ、Blog |
| **proactiv-marketing** | 现代营销/代理 | 企业官网、服务展示、客户墙 | Particles、AmbientColor、VideoModal、Macbook |

**选择建议：**
- 做**个人作品集** → devpro-portfolio（功能全）或 sidefolio-portfolio（简洁）
- 做**SaaS 产品站** → ai-saas（功能丰富）或 startup-landing-page（快速上线）
- 做**代理/创意机构** → agenlabs-agency 或 proactiv-marketing
- 做**内容/博客站** → foxtrot-marketing 或 playful-marketing

---

## 4. 移植策略：从 Aceternity 模板 → 自己项目

### 步骤 1：确定要移植的组件
在目标模板中运行 `npm run dev`，浏览页面，记录需要移植的组件名称。

### 步骤 2：提取组件文件
将以下文件从模板复制到自己的项目：
```
components/<ComponentName>.tsx       # 主组件
components/<ComponentName>/          # 子组件目录（如有）
constants/<related-data>.tsx         # 相关静态数据
lib/<utility>.ts                     # 工具函数（如需要）
```

### 步骤 3：处理依赖
检查模板 `package.json` 中的依赖，安装缺少的包：
```bash
# 几乎所有模板都需要
npm install framer-motion clsx tailwind-merge

# 部分组件可能需要
npm install @tabler/icons-react lucide-react
npm install mini-svg-data-uri          # SVG 背景图案
npm install cobe                       # 3D 地球
npm install @tsparticles/react         # 粒子效果
```

### 步骤 4：适配样式系统
Aceternity 模板使用 Tailwind CSS v3。移植时需注意：
- 检查 `tailwind.config.js` 中的自定义配置（colors、keyframes、animation）
- 如果目标项目使用 Tailwind v4，需手动迁移配置到 CSS 变量形式
- 检查全局 CSS（`globals.css`）中的自定义样式和动画定义

### 步骤 5：适配数据层
将模板中的硬编码数据替换为自己的内容：
```tsx
// 模板中的常量数据
constants/features.tsx
constants/testimonials.tsx
constants/navItems.tsx
```

### 步骤 6：清理和优化
- 移除未使用的 import
- 将全局选择器改为 scoped（配合 `useGSAP` 的 `scope` 或 Framer Motion 的 `motion` 组件）
- 添加 `prefers-reduced-motion` 支持
- 检查 SSR 兼容性（Framer Motion 在服务端渲染时部分特性受限）

---

## 5. 与 GSAP 的关系：选择标准

Aceternity 组件和 GSAP 不是互斥的，而是互补的。在 UI Workflow 中，动效选择遵循以下优先级：

| 场景 | 首选方案 | 说明 |
|------|----------|------|
| 简单 hover/color/opacity | CSS `transition` | 零依赖，性能最好 |
| 组件级入场/离场动画 | **Framer Motion** (Aceternity) | 与 React 状态同步，声明式 |
| 复杂时间线编排 | **GSAP Timeline** | 精确控制、嵌套、标签定位 |
| ScrollTrigger 滚动动画 | **GSAP ScrollTrigger** | 比 Framer Motion 的 scroll 更强大 |
| SVG 路径动画 | **GSAP DrawSVG/MorphSVG** | 专业 SVG 动画插件 |
| 文字字符拆分动画 | **GSAP SplitText** | 逐字/逐词动画 |
| 物理/spring 动画 | Framer Motion `spring` | 内置 spring 物理 |
| 页面转场 | `next-view-transitions` 或 Framer Motion | 与路由集成 |

**决策流程：**
```
需要动效？
  ├─ 简单 hover/颜色变化？ → CSS transition
  ├─ 组件入场/离场/布局动画？ → Framer Motion (Aceternity)
  ├─ 复杂时间线/滚动触发/SVG？ → GSAP
  └─ 不确定？ → 先用 Framer Motion，遇到限制再切 GSAP
```

**重要原则：**
- 不要在一个项目中混用太多动画库，增加维护成本
- Aceternity 组件内部已经用 Framer Motion 实现，移植后可直接使用
- 如果需要在 Aceternity 组件基础上增加复杂时间线，可以包裹 GSAP，但要注意清理

---

## 6. 上下游链路

### 上游：[L2 Taste / 设计方向](taste-judgment-layer.md)

Aceternity 是**执行层**，不是**决策层**。在接触 Aceternity 之前，L2 应已完成：
- 视觉方向确定（配色、字体、间距系统）
- `DESIGN.md` 已沉淀
- 关键页面 wireframe 或 mockup 已确认

**从 L2 接收：**
- 设计规范（颜色、字体、间距 token）
- 需要动效的具体页面和组件清单
- 动效强度偏好（极简 / 适度 / 丰富）

**向 L2 反馈：**
- 某些动效在目标技术栈中的可行性
- 移植某组件所需的额外依赖和体积成本
- 建议替换的替代方案

### 下游：[L4 HeroUI v3](../heroui/component-reference.md)

Aceternity 动效组件与 HeroUI 组件是**组合关系**：
- HeroUI 提供**交互组件**（Button、Modal、Card、Form 等）
- Aceternity 提供**动效包装**（入场动画、hover 效果、背景图案）

**典型组合方式：**
```tsx
// Aceternity 的动效容器 + HeroUI 的组件
<motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
  <Card>  {/* HeroUI Card */}
    <CardBody>
      <Button color="primary">Action</Button>  {/* HeroUI Button */}
    </CardBody>
  </Card>
</motion.div>
```

**交接给 L5（Claude Code 执行）时需提供：**
- 已确认的组件清单（从哪个模板移植哪个组件）
- 适配后的样式 token 映射
- 数据层接口定义
- 动效参数（duration、easing、delay 等）

---

## 7. 技术栈共性

所有 8 个 Aceternity 模板共享以下技术栈：

| 技术 | 版本范围 | 用途 |
|------|----------|------|
| Next.js | 13.x ~ 14.x | 框架 |
| React | 18.x | UI 库 |
| TypeScript | 4.x ~ 5.x | 类型系统 |
| Tailwind CSS | 3.x | 样式 |
| Framer Motion | 10.x ~ 11.x | 动效引擎 |
| clsx + tailwind-merge | 最新 | 条件类名合并 |

**注意：** 模板使用 Tailwind CSS v3，与 HeroUI v3 要求的 Tailwind v4 存在差异。移植时需额外关注配置迁移。

---

## 8. 许可说明

Aceternity 模板采用 **Apache License 2.0**：
- 允许修改、再分发、商业使用
- 修改的文件需保留版权声明
- 不授予商标使用权
- 详见：`D:/OneDrive/Desktop/test-lib/aceternity/LICENSE`

---

## Source Material

- `D:/OneDrive/Desktop/test-lib/aceternity/LICENSE` — Apache 2.0 许可证全文
- `D:/OneDrive/Desktop/test-lib/aceternity/agenlabs-agency/` — 代理机构模板（Next.js + Framer Motion）
- `D:/OneDrive/Desktop/test-lib/aceternity/ai-saas/` — AI SaaS 模板（Next.js 14 + cobe 地球）
- `D:/OneDrive/Desktop/test-lib/aceternity/devpro-portfolio/` — 开发者作品集模板（Beam、Timeline）
- `D:/OneDrive/Desktop/test-lib/aceternity/sidefolio-portfolio/` — 侧边栏作品集模板（Sidebar、Circles）
- `D:/OneDrive/Desktop/test-lib/aceternity/startup-landing-page/` — 初创落地页模板（极简结构）
- `D:/OneDrive/Desktop/test-lib/aceternity/foxtrot-marketing/` — 营销内容模板（Banner、CardPattern）
- `D:/OneDrive/Desktop/test-lib/aceternity/playful-marketing/` — 活泼营销模板（AnimatedCounter、Map）
- `D:/OneDrive/Desktop/test-lib/aceternity/proactiv-marketing/` — 现代营销模板（Particles、AmbientColor）
- `D:/OneDrive/Desktop/threetwoa-cc-workshop/docs/ui-workflow/gsap-motion-guide.md` — GSAP 动效层分析文档
- `D:/OneDrive/Desktop/threetwoa-cc-workshop/.claude/CLAUDE.md` — 第 9 节 UI Workflow Routing
