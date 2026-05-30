# GSAP Motion Layer Analysis

> Generated: 2026-05-30
> Source: greensock/gsap-skills (8 sub-modules)

---

## 1. GSAP in the UI Workflow

### Where GSAP Fits

```
Design System (DESIGN.md)
    ↓
Component Implementation
    ↓
[GSAP LAYER] ← You are here
    ↓
UX Review
    ↓
Ship
```

GSAP is **not** for layout, not for styling, not for structure. GSAP is for **time-based visual change**.

### When to Use GSAP

| Scenario | Use GSAP? | Alternative |
|----------|-----------|-------------|
| Page load entrance sequence | ✅ Yes | — |
| Scroll-triggered reveals | ✅ Yes | CSS `scroll-driven animations` (limited support) |
| Complex timeline orchestration | ✅ Yes | — |
| SVG path drawing | ✅ Yes | — |
| Text character splitting | ✅ Yes | — |
| Simple hover transitions | ❌ No | CSS `transition` |
| Color fades | ❌ No | CSS `transition` |
| Layout changes (grid reorder) | ⚠️ Maybe | CSS `grid-template` + FLIP |
| Physics-based animation | ⚠️ Maybe | CSS `spring()` or Framer Motion |

### When NOT to Use GSAP

1. **Simple hover states** — CSS `transition` is lighter
2. **Color-only transitions** — CSS is sufficient
3. **React state-driven animations** — Consider Framer Motion for state sync
4. **When bundle size matters** — GSAP is ~25KB gzipped; CSS is 0KB
5. **When reduced-motion is primary audience** — Don't gate content on animation

---

## 2. Sub-Module Deep Dive

### 2.1 gsap-core

**Primitives:**
```js
// Basic tween
gsap.to(".box", { x: 100, duration: 0.6, ease: "power2.inOut" });

// From current state to target
gsap.from(".box", { opacity: 0, y: 50 });

// From one state to another
gsap.fromTo(".box", 
  { opacity: 0, y: 50 }, 
  { opacity: 1, y: 0, duration: 0.6 }
);

// Instant set (no animation)
gsap.set(".box", { x: 100, opacity: 0.5 });
```

**Easing:**
- `"power1"` through `"power4"` — smooth, natural feel
- `"back.out(1.7)"` — overshoot for playful feel
- `"elastic.out(1, 0.3)"` — bouncy
- `"expo.inOut"` — dramatic, fast-slow-fast
- `"none"` / `"linear"` — for scrubbed animations only

**Stagger:**
```js
gsap.to(".card", {
  y: 0,
  opacity: 1,
  duration: 0.6,
  stagger: 0.1, // 100ms between each
  ease: "power2.out"
});
```

**Responsive Animation:**
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

### 2.2 gsap-timeline

**Chaining:**
```js
const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });

tl.to(".a", { x: 100 })
  .to(".b", { y: 50 }, "+=0.2")     // 0.2s after previous ends
  .to(".c", { opacity: 0 }, "<")    // same start as previous
  .to(".d", { scale: 1.2 }, "-=0.1"); // 0.1s before previous ends
```

**Labels:**
```js
tl.addLabel("intro", 0)
  .addLabel("content", 1.5)
  .addLabel("outro", 4);

// Jump to label
tl.play("content");
tl.reverse("outro");
```

**Nested Timelines:**
```js
const intro = gsap.timeline();
intro.to(".logo", { scale: 1 });

const content = gsap.timeline();
content.to(".text", { opacity: 1 });

const master = gsap.timeline();
master.add(intro, 0)
      .add(content, "-=0.5");
```

### 2.3 gsap-scrolltrigger

**Basic:**
```js
gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
  scrollTrigger: {
    trigger: ".box",
    start: "top center",
    end: "bottom top",
    scrub: true,
    markers: false // remove in production
  },
  x: 500
});
```

**Pinning:**
```js
ScrollTrigger.create({
  trigger: ".section",
  start: "top top",
  end: "+=500",
  pin: true,
  pinSpacing: true
});
```

**Batch (for lists):**
```js
ScrollTrigger.batch(".card", {
  onEnter: batch => gsap.to(batch, { opacity: 1, y: 0, stagger: 0.1 }),
  start: "top 85%"
});
```

**Horizontal Scroll:**
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

### 2.4 gsap-react

**useGSAP Hook (Preferred):**
```jsx
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

function MyComponent() {
  const containerRef = useRef();

  useGSAP(() => {
    gsap.to(".box", { x: 100 });
  }, { scope: containerRef }); // selectors limited to container

  return (
    <div ref={containerRef}>
      <div className="box">...</div>
    </div>
  );
}
```

**With Dependencies:**
```jsx
useGSAP(() => {
  gsap.to(".box", { x: count * 10 });
}, { dependencies: [count], scope: containerRef });
```

**Context-Safe Callbacks:**
```jsx
const { contextSafe } = useGSAP({ scope: containerRef });

const onClick = contextSafe(() => {
  gsap.to(".box", { rotation: 360 });
});
```

**SSR Safety:**
```jsx
// ❌ Bad — runs during SSR
gsap.to(".box", { x: 100 });

// ✅ Good — client only
useGSAP(() => {
  gsap.to(".box", { x: 100 });
});
```

### 2.5 gsap-performance

**Compositor-Only Properties:**
```js
// ✅ Good — compositor work
gsap.to(".el", { x, y, scale, rotation, opacity });

// ❌ Bad — triggers layout
gsap.to(".el", { width, height, top, left, margin, padding });
```

**will-change:**
```css
.animated {
  will-change: transform; /* add before animation */
}
/* Remove after animation completes to free GPU memory */
```

**quickTo for frequent updates:**
```js
// ❌ Bad — creates new tween every frame
window.addEventListener("mousemove", e => {
  gsap.to(".cursor", { x: e.clientX, y: e.clientY });
});

// ✅ Good — reuses single tween
const xTo = gsap.quickTo(".cursor", "x", { duration: 0.3 });
const yTo = gsap.quickTo(".cursor", "y", { duration: 0.3 });
window.addEventListener("mousemove", e => {
  xTo(e.clientX);
  yTo(e.clientY);
});
```

**Batch DOM operations:**
```js
// Read first
const heights = elements.map(el => el.offsetHeight);

// Then write
elements.forEach((el, i) => {
  el.style.height = heights[i] + "px";
});
```

### 2.6 gsap-plugins

**SplitText:**
```js
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(SplitText);

const split = new SplitText(".headline", { type: "words,chars" });
gsap.from(split.chars, { opacity: 0, y: 50, stagger: 0.02 });
```

**Flip:**
```js
import { Flip } from "gsap/Flip";
gsap.registerPlugin(Flip);

const state = Flip.getState(".grid-item");
// ... change layout ...
Flip.from(state, { duration: 0.6, ease: "power2.out" });
```

**MorphSVG:**
```js
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
gsap.to("#shape1", { morphSVG: "#shape2", duration: 1 });
```

---

## 3. Reduced Motion

### Detection

```js
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;
```

### Implementation Patterns

**Pattern 1: Conditional Animation**
```js
if (!prefersReducedMotion) {
  gsap.from(".el", { y: 50, opacity: 0 });
} else {
  gsap.set(".el", { y: 0, opacity: 1 });
}
```

**Pattern 2: matchMedia**
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

**Pattern 3: Shorter Duration**
```js
const duration = prefersReducedMotion ? 0 : 0.6;
gsap.to(".el", { y: 0, opacity: 1, duration });
```

### Rule

> **Never gate content on animation.** If the animation must complete before the user can interact, provide a reduced-motion path that makes content immediately available.

---

## 4. Cleanup Checklist

### React / Component Unmount

```jsx
useGSAP(() => {
  // cleanup is automatic with useGSAP
}, { scope: containerRef });

// Manual cleanup if not using useGSAP
useEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to(".box", { x: 100 });
  }, containerRef);

  return () => ctx.revert(); // ✅ cleanup
}, []);
```

### ScrollTrigger Cleanup

```js
// Remove specific trigger
ScrollTrigger.getById("myTrigger").kill();

// Remove all triggers on a scope
gsap.context(() => {
  // create triggers
}).revert();

// Refresh after layout changes
ScrollTrigger.refresh();
```

### Common Leak Sources

| Leak | Cause | Fix |
|------|-------|-----|
| Duplicate triggers | Re-creating on re-render | Use `useGSAP` or manual cleanup |
| Orphaned listeners | Event listeners not removed | Remove in cleanup function |
| Infinite loops | ScrollTrigger triggering itself | Use `once: true` or guard conditions |
| Memory bloat | Not killing timelines | `timeline.kill()` on unmount |

---

## 5. Common Anti-Patterns

### Anti-Pattern 1: Delay Chaining

```js
// ❌ Bad
gsap.to(".a", { x: 100, delay: 0 });
gsap.to(".b", { x: 100, delay: 0.5 });
gsap.to(".c", { x: 100, delay: 1 });

// ✅ Good
tl.to(".a", { x: 100 })
  .to(".b", { x: 100 })
  .to(".c", { x: 100 });
```

### Anti-Pattern 2: Layout Thrashing

```js
// ❌ Bad — read, write, read, write
for (let el of elements) {
  const h = el.offsetHeight; // read
  el.style.height = h * 2 + "px"; // write
}

// ✅ Good — read all, then write all
const heights = elements.map(el => el.offsetHeight);
elements.forEach((el, i) => {
  el.style.height = heights[i] * 2 + "px";
});
```

### Anti-Pattern 3: Animate Everything

```js
// ❌ Bad — every element animates
gsap.to("*", { opacity: 1, y: 0 });

// ✅ Good — purposeful animation
gsap.to(".hero-headline", { y: 0, opacity: 1, duration: 0.8 });
gsap.to(".hero-subtitle", { y: 0, opacity: 1, duration: 0.6, delay: 0.2 });
```

### Anti-Pattern 4: No Scope in React

```js
// ❌ Bad — affects whole document
gsap.to(".box", { x: 100 });

// ✅ Good — scoped to component
useGSAP(() => {
  gsap.to(".box", { x: 100 });
}, { scope: containerRef });
```

### Anti-Pattern 5: Forgetting Reduced Motion

```js
// ❌ Bad — no fallback
gsap.to(".modal", { scale: 1, opacity: 1, duration: 0.3 });

// ✅ Good — with fallback
const animate = !prefersReducedMotion;
gsap.to(".modal", { 
  scale: 1, 
  opacity: 1, 
  duration: animate ? 0.3 : 0 
});
```

---

## 6. Claude Code GSAP Implementation Checklist

Before generating GSAP code, verify:

- [ ] Is the animation purposeful? (not "animate everything")
- [ ] Are only `transform` and `opacity` being animated?
- [ ] Is `useGSAP` used instead of `useEffect`?
- [ ] Is a `scope` provided to limit selectors?
- [ ] Is cleanup handled (automatic with `useGSAP`, manual with `ctx.revert()`)?
- [ ] Is `prefers-reduced-motion` respected?
- [ ] Are ScrollTrigger `markers` removed in production?
- [ ] Is `scrub` avoided with `toggleActions`?
- [ ] Is `will-change` applied selectively (not universally)?
- [ ] Are plugins registered before use?
- [ ] Is GSAP code client-only (not during SSR)?

---

## 7. Codex GSAP Review Checklist

When reviewing GSAP code, check:

- [ ] **Performance:** Only compositor properties animated?
- [ ] **Cleanup:** All tweens/timelines/ScrollTriggers cleaned up on unmount?
- [ ] **Scope:** Selectors scoped to component (not global `.box`)?
- [ ] **SSR:** No GSAP calls during server rendering?
- [ ] **Reduced Motion:** `prefers-reduced-motion` handled?
- [ ] **Timeline vs. Delay:** Timeline used instead of delay-chaining?
- [ ] **Plugin Registration:** Plugins registered once, not per-component?
- [ ] **ScrollTrigger:** `refresh()` called after layout changes?
- [ ] **Batch:** `ScrollTrigger.batch()` used for lists instead of individual triggers?
- [ ] **quickTo:** Used for frequent updates (mouse followers)?
- [ ] **Memory:** `will-change` not left on elements permanently?
- [ ] **Production:** `markers: false` on all ScrollTriggers?
