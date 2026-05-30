---
title: "GSAP Motion 层分析"
type: reference
status: active
source_files:
  - "archive/2026-05-30/source-05-gsap-motion-layer-analysis.md"
updated: 2026-05-30
owner: threetwoa
---

# GSAP Motion Layer Analysis

> Generated: 2026-05-30 · Distilled from source-05-gsap-motion-layer-analysis.md
> Source: greensock/gsap-skills (8 sub-modules)

---

## 1. GSAP 在 UI Workflow 中的位置

### GSAP 在哪一层

```
Design System (DESIGN.md)
    ↓
Component Implementation
    ↓
[GSAP LAYER] ← 你在这里
    ↓
UX Review
    ↓
Ship
```

GSAP **不是**用来做布局、样式或结构的。GSAP 专为**基于时间的视觉变化**而生。

### 何时使用 GSAP

| 场景 | 用 GSAP？ | 替代方案 |
|------|----------|---------|
| 页面加载入场序列 | ✅ 是 | — |
| 滚动触发揭示 | ✅ 是 | CSS `scroll-driven animations`（支持有限） |
| 复杂时间线编排 | ✅ 是 | — |
| SVG 路径绘制 | ✅ 是 | — |
| 文字字符拆分 | ✅ 是 | — |
| 简单 hover 过渡 | ❌ 否 | CSS `transition` |
| 颜色渐变 | ❌ 否 | CSS `transition` |
| 布局变化（grid 重排） | ⚠️ 看情况 | CSS `grid-template` + FLIP |
| 物理动画 | ⚠️ 看情况 | CSS `spring()` 或 Framer Motion |

### 何时不使用 GSAP

1. **简单 hover 状态** — CSS `transition` 更轻量
2. **纯颜色过渡** — CSS 足够
3. **React 状态驱动动画** — 考虑 Framer Motion 同步状态
4. **包体积敏感** — GSAP gzip 后约 25KB；CSS 是 0KB
5. **减动效为主要受众** — 不要将内容门控在动画上

---

## 2. 子模块深入解析

### 2.1 gsap-core（核心原语）

**基本 Tween：**
```js
// 目标动画
gsap.to(".box", { x: 100, duration: 0.6, ease: "power2.inOut" });

// 从某状态到当前
gsap.from(".box", { opacity: 0, y: 50 });

// 从一状态到另一状态
gsap.fromTo(".box", 
  { opacity: 0, y: 50 }, 
  { opacity: 1, y: 0, duration: 0.6 }
);

// 瞬时设定（无动画）
gsap.set(".box", { x: 100, opacity: 0.5 });
```

**缓动函数：**
- `"power1"` ~ `"power4"` — 平滑自然
- `"back.out(1.7)"` — 过冲弹性
- `"elastic.out(1, 0.3)"` — 弹跳
- `"expo.inOut"` — 戏剧性，快-慢-快
- `"none"` / `"linear"` — 仅用于 scrubbed 动画

**Stagger（交错）：**
```js
gsap.to(".card", {
  y: 0,
  opacity: 1,
  duration: 0.6,
  stagger: 0.1, // 每 100ms 间隔
  ease: "power2.out"
});
```

**响应式动画：**
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

### 2.2 gsap-timeline（时间线编排）

**链式调用：**
```js
const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });

tl.to(".a", { x: 100 })
  .to(".b", { y: 50 }, "+=0.2")     // 前一个结束后 0.2s
  .to(".c", { opacity: 0 }, "<")    // 与前一个同时开始
  .to(".d", { scale: 1.2 }, "-=0.1"); // 前一个结束前 0.1s
```

**标签定位：**
```js
tl.addLabel("intro", 0)
  .addLabel("content", 1.5)
  .addLabel("outro", 4);

// 跳转到标签
tl.play("content");
tl.reverse("outro");
```

**嵌套时间线：**
```js
const intro = gsap.timeline();
intro.to(".logo", { scale: 1 });

const content = gsap.timeline();
content.to(".text", { opacity: 1 });

const master = gsap.timeline();
master.add(intro, 0)
      .add(content, "-=0.5");
```

### 2.3 gsap-scrolltrigger（滚动触发）

**基础用法：**
```js
gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    end: "bottom top",
    scrub: true,
    markers: false // 生产环境移除
  },
  x: 500
});
```

**钉住（Pinning）：**
```js
ScrollTrigger.create({
  trigger: ".section",
  start: "top top",
  end: "+=500",
  pin: true,
  pinSpacing: true
});
```

**批量处理（列表场景）：**
```js
ScrollTrigger.batch(".card", {
  onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1 }),
  start: "top 85%"
});
```

**水平滚动：**
```js
const sections = gsap.utils.toArray(".panel");
gsap.to(sections, {
  xPercent: -100 * (sections.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".container",
    pin: true,
    scrub: 1,
    end: () => "+=" + document.querySelector(".container").offsetWidth
  }
});
```

### 2.4 gsap-react（React 集成）

**useGSAP Hook（推荐方式）：**
```jsx
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

function MyComponent() {
  const containerRef = useRef();

  useGSAP(() => {
    gsap.to(".box", { x: 100 });
  }, { scope: containerRef }); // 选择器限定在容器内

  return (
    <div ref={containerRef}>
      <div className="box">...</div>
    </div>
  );
}
```

**带依赖：**
```jsx
useGSAP(() => {
  gsap.to(".box", { x: count * 10 });
}, { dependencies: [count], scope: containerRef });
```

**Context-Safe 回调：**
```jsx
const { contextSafe } = useGSAP({ scope: containerRef });

const onClick = contextSafe(() => {
  gsap.to(".box", { rotation: 360 });
});
```

**SSR 安全：**
```jsx
// ❌ 错误 — SSR 期间执行
gsap.to(".box", { x: 100 });

// ✅ 正确 — 仅客户端
useGSAP(() => {
  gsap.to(".box", { x: 100 });
});
```

### 2.5 gsap-performance（性能优化）

**仅使用合成器属性：**
```js
// ✅ 好 — 合成器工作
gsap.to(".el", { x, y, scale, rotation, opacity });

// ❌ 差 — 触发布局
gsap.to(".el", { width, height, top, left, margin, padding });
```

**will-change：**
```css
.animated {
  will-change: transform; /* 动画前添加 */
}
/* 动画完成后移除，释放 GPU 内存 */
```

**quickTo 高频更新：**
```js
// ❌ 差 — 每帧创建新 tween
window.addEventListener("mousemove", e => {
  gsap.to(".cursor", { x: e.clientX, y: e.clientY });
});

// ✅ 好 — 复用单个 tween
const xTo = gsap.quickTo(".cursor", "x", { duration: 0.3 });
const yTo = gsap.quickTo(".cursor", "y", { duration: 0.3 });
window.addEventListener("mousemove", e => {
  xTo(e.clientX);
  yTo(e.clientY);
});
```

**批量 DOM 操作：**
```js
// 先读
const heights = elements.map(el => el.offsetHeight);

// 再写
elements.forEach((el, i) => {
  el.style.height = heights[i] + "px";
});
```

### 2.6 gsap-plugins（插件集）

**SplitText：**
```js
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

const split = new SplitText(".headline", { type: "words,chars" });
gsap.from(split.chars, { opacity: 0, y: 50, stagger: 0.02 });
```

**Flip：**
```js
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);

const state = Flip.getState(".grid-item");
// ... 改变布局 ...
Flip.from(state, { duration: 0.6, ease: "power2.out" });
```

**MorphSVG：**
```js
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.to("#shape1", { morphSVG: "#shape2", duration: 1 });
```

---

## 3. Reduced Motion（减动效）

### 检测

```js
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
```

### 实现模式

**模式 1：条件动画**
```js
if (!prefersReducedMotion) {
  gsap.from(".el", { y: 50, opacity: 0 });
} else {
  gsap.set(".el", { y: 0, opacity: 1 });
}
```

**模式 2：matchMedia**
```js
gsap.matchMedia({
  "(prefers-reduced-motion: reduce)": () => {
    gsap.set(".animated", { opacity: 1, y: 0, x: 0 });
  },
  "(prefers-reduced-motion: no-preference)": () => {
    gsap.to(".animated", { y: 0, opacity: 1, stagger: 0.1 });
  }
});
```

**模式 3：缩短时长**
```js
const duration = prefersReducedMotion ? 0 : 0.6;
gsap.to(".el", { y: 0, opacity: 1, duration });
```

### 规则

> **永远不要将内容门控在动画上。** 如果动画必须完成后用户才能交互，请在减动效路径中提供立即可访问的内容。

---

## 4. 清理检查清单

### React / 组件卸载

```jsx
useGSAP(() => {
  // useGSAP 自动清理
}, { scope: containerRef });

// 手动清理（不使用 useGSAP 时）
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to(".box", { x: 100 });
  }, containerRef);

  return () => ctx.revert(); // ✅ 清理
}, []);
```

### ScrollTrigger 清理

```js
// 移除特定触发器
ScrollTrigger.getById("myTrigger").kill();

// 移除作用域内所有触发器
gsap.context(() => {
  // 创建触发器
}).revert();

// 布局变化后刷新
ScrollTrigger.refresh();
```

### 常见泄漏源

| 泄漏 | 原因 | 修复 |
|------|------|------|
| 重复触发 | 重新渲染时重复创建 | 使用 `useGSAP` 或手动清理 |
| 孤立监听器 | 事件监听器未移除 | 在清理函数中移除 |
| 无限循环 | ScrollTrigger 触发自身 | 使用 `once: true` 或守卫条件 |
| 内存膨胀 | 时间线未 kill | 卸载时 `timeline.kill()` |

---

## 5. 常见反模式

### 反模式 1：Delay 链式调用

```js
// ❌ 差
gsap.to(".a", { x: 100, delay: 0 });
gsap.to(".b", { x: 100, delay: 0.5 });
gsap.to(".c", { x: 100, delay: 1 });

// ✅ 好
tl.to(".a", { x: 100 })
  .to(".b", { x: 100 })
  .to(".c", { x: 100 });
```

### 反模式 2：布局抖动

```js
// ❌ 差 — 读写交替
for (let el of elements) {
  const h = el.offsetHeight; // 读
  el.style.height = h * 2 + "px"; // 写
}

// ✅ 好 — 先读后写
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => {
  el.style.height = heights[i] * 2 + "px";
});
```

### 反模式 3：万物皆动画

```js
// ❌ 差 — 每个元素都动画
gsap.to("*", { opacity: 1, y: 0 });

// ✅ 好 — 有目的的动画
gsap.to(".hero-headline", { y: 0, opacity: 1, duration: 0.8 });
gsap.to(".hero-subtitle", { y: 0, opacity: 1, duration: 0.6, delay: 0.2 });
```

### 反模式 4：React 中不限定作用域

```js
// ❌ 差 — 影响整个文档
gsap.to(".box", { x: 100 });

// ✅ 好 — 限定在组件内
useGSAP(() => {
  gsap.to(".box", { x: 100 });
}, { scope: containerRef });
```

### 反模式 5：忘记减动效

```js
// ❌ 差 — 无兜底
gsap.to(".modal", { scale: 1, opacity: 1, duration: 0.3 });

// ✅ 好 — 有兜底
const animate = !prefersReducedMotion;
gsap.to(".modal", { 
  scale: 1, 
  opacity: 1, 
  duration: animate ? 0.3 : 0 
});
```

---

## 6. Claude Code GSAP 实现清单

生成 GSAP 代码前，逐项检查：

- [ ] 动画是否有目的？（非"万物皆动画"）
- [ ] 是否仅动画 `transform` 和 `opacity`？
- [ ] 是否使用 `useGSAP` 而非 `useEffect`？
- [ ] 是否提供了 `scope` 限定选择器？
- [ ] 清理是否处理？（`useGSAP` 自动，手动用 `ctx.revert()`）
- [ ] `prefers-reduced-motion` 是否已处理？
- [ ] ScrollTrigger 的 `markers` 是否在生产环境移除？
- [ ] 是否避免 `scrub` 与 `toggleActions` 混用？
- [ ] `will-change` 是否选择性添加？（非全局）
- [ ] 插件是否在使用前注册？
- [ ] GSAP 代码是否仅客户端执行？（非 SSR）

---

## 7. Codex GSAP 审查清单

审查 GSAP 代码时，检查：

- [ ] **性能**：是否仅动画合成器属性？
- [ ] **清理**：所有 tween/timeline/ScrollTrigger 卸载时是否清理？
- [ ] **作用域**：选择器是否限定在组件？（非全局 `.box`）
- [ ] **SSR**：服务端渲染期间无 GSAP 调用？
- [ ] **减动效**：`prefers-reduced-motion` 是否处理？
- [ ] **时间线 vs Delay**：使用时间线而非 delay 链？
- [ ] **插件注册**：插件是否注册一次而非每组件？
- [ ] **ScrollTrigger**：布局变化后是否调用 `refresh()`？
- [ ] **Batch**：列表场景是否使用 `ScrollTrigger.batch()` 而非逐个触发？
- [ ] **quickTo**：高频更新（鼠标跟随）是否使用 `quickTo`？
- [ ] **内存**：`will-change` 是否未永久留在元素上？
- [ ] **生产**：所有 ScrollTrigger 是否 `markers: false`？

---

## Source Material

- `archive/2026-05-30/source-05-gsap-motion-layer-analysis.md`