# UI Tool Routing Cheatsheet

> Generated: 2026-05-30
> One-page reference for skill selection

---

## Quick Lookup Table

| I want to... | Use This Skill | Command / Trigger |
|--------------|---------------|-------------------|
| **Pick a style** | ui-ux-pro-max | `python3 skills/ui-ux-pro-max/scripts/search.py "..." --design-system` |
| **Pick a color palette** | ui-ux-pro-max | `--domain color "..."` |
| **Pick fonts** | ui-ux-pro-max | `--domain typography "..."` |
| **Copy a brand's design** | getdesign.md (reference) | Browse getdesign.md → copy DESIGN.md |
| **Avoid AI slop** | frontend-design | Say "design a page" (auto-triggers) |
| **Set bold direction** | frontend-design | "brutalist / maximalist / retro-futuristic" |
| **Write DESIGN.md** | impeccable | `/impeccable init` or `/impeccable document` |
| **Write PRODUCT.md** | impeccable | `/impeccable init` |
| **Build a landing page** | frontend-design + impeccable craft | "build landing page" |
| **Build a dashboard** | ui-ux-pro-max + frontend-design | "build dashboard" + `--domain chart` |
| **Build a component** | frontend-design | "create button/modal/card component" |
| **Add page load animation** | gsap-core + gsap-timeline | "animate page load" |
| **Add scroll animations** | gsap-scrolltrigger | "scroll animation" / "parallax" |
| **Add React animations** | gsap-react | "React animation" / "useGSAP" |
| **Optimize animation FPS** | gsap-performance | "animation performance" / "60fps" |
| **Morph shapes / draw SVG** | gsap-plugins | "SVG animation" / "morph" |
| **Split text animation** | gsap-plugins (SplitText) | "text reveal" / "typewriter" |
| **Audit UI quality** | impeccable audit | `/impeccable audit` |
| **Critique design** | impeccable critique | `/impeccable critique` |
| **Polish existing UI** | impeccable polish | `/impeccable polish` |
| **Check accessibility** | bencium-controlled-ux-designer | "accessibility audit" / "a11y" |
| **Check responsive** | bencium-controlled-ux-designer | "responsive design" |
| **Review UX patterns** | bencium-controlled-ux-designer | "UX review" / "heuristic" |
| **Make it bolder** | impeccable bolder | `/impeccable bolder` |
| **Make it quieter** | impeccable quieter | `/impeccable quieter` |
| **Add motion** | impeccable animate | `/impeccable animate` |
| **Fix layout** | impeccable layout | `/impeccable layout` |
| **Fix typography** | impeccable typeset | `/impeccable typeset` |
| **Fix colors** | impeccable colorize | `/impeccable colorize` |
| **Create HTML demo** | prototype | "prototype this" |
| **Create slides** | baoyu-slide-deck | "create slides" / "presentation" |
| **Create PPT** | ppt-master | "create PPT" / "make presentation" |
| **Create infographic** | baoyu-infographic | "infographic" / "信息图" |
| **Create cover image** | baoyu-cover-image | "cover image" / "article cover" |
| **Create diagram** | drawio / excalidraw / mermaid / tldraw | "diagram" / "flowchart" / "架构图" |
| **Why does this look bad?** | frontend-design + impeccable critique | "critique this design" |
| **How to make it premium?** | impeccable + frontend-design | "make it look premium" |

---

## Stack-Specific Routing

### React / Next.js

| Need | Primary | Secondary |
|------|---------|-----------|
| Component code | frontend-design | heroui-react-pro |
| Animation | gsap-react | gsap-core |
| Design system | ui-ux-pro-max | heroui-pro-design-taste |
| Review | bencium-controlled-ux-designer | impeccable audit |

### Vue / Svelte

| Need | Primary | Secondary |
|------|---------|-----------|
| Component code | frontend-design | web-design-guidelines |
| Animation | gsap-frameworks | gsap-core |
| Design system | ui-ux-pro-max | — |

### HTML + Tailwind

| Need | Primary | Secondary |
|------|---------|-----------|
| Page code | frontend-design | ui-ux-pro-max |
| Animation | gsap-core + gsap-scrolltrigger | — |
| Design system | ui-ux-pro-max | getdesign.md |

### HeroUI (React)

| Need | Primary | Secondary |
|------|---------|-----------|
| Components | heroui-react-pro | heroui-pro-design-taste |
| Design taste | heroui-pro-design-taste | — |
| MCP lookup | heroui-pro | — |

---

## Anti-Pattern Detection

If Claude Code generates any of these, invoke the corrective skill:

| Anti-Pattern | Corrective Skill | Rule |
|--------------|-----------------|------|
| Inter font everywhere | frontend-design | "Avoid Inter, Roboto, Arial" |
| Purple gradient on white | frontend-design | "Cliched color schemes" |
| Icon + heading + text cards x6 | impeccable | "Identical card grids banned" |
| Gradient text | impeccable | "background-clip: text banned" |
| Glassmorphism default | impeccable | "Glassmorphism as default banned" |
| Hero metric template | impeccable | "Big number + small label + gradient banned" |
| 01/02/03 section markers | impeccable | "Numbered section markers banned" |
| Emojis as icons | ui-ux-pro-max | "Use SVG icons, not emojis" |
| Missing focus states | bencium-controlled-ux-designer | WCAG 2.1 violation |
| Touch target < 44px | bencium-controlled-ux-designer | "Minimum 44x44px" |
| Animating width/height | gsap-performance | "Use transform, not layout properties" |
| Missing reduced-motion | gsap-core | "prefers-reduced-motion required" |

---

## Skill Combination Recipes

### Recipe 1: Landing Page from Scratch

```
ui-ux-pro-max --design-system "fintech landing" --persist
→ frontend-design "build landing page"
→ gsap-scrolltrigger + gsap-timeline "add scroll animations"
→ impeccable audit
```

### Recipe 2: Dashboard Redesign

```
impeccable document  # extract current DESIGN.md
→ frontend-design "redesign dashboard"
→ ui-ux-pro-max --domain chart "real-time data"
→ gsap-core "animate data updates"
→ bencium-controlled-ux-designer "UX audit"
```

### Recipe 3: Brand-Consistent Microsite

```
getdesign.md → copy Apple DESIGN.md
→ frontend-design "build product page like Apple"
→ gsap-scrolltrigger "Apple-style scroll animations"
→ impeccable polish
```

### Recipe 4: HeroUI Admin Panel

```
heroui-react-pro → lookup components
→ heroui-pro-design-taste → apply principles
→ ui-ux-pro-max --stack shadcn "admin patterns"
→ gsap-react "page transitions"
```

### Recipe 5: Motion Showcase

```
frontend-design "create animated hero section"
→ gsap-timeline "orchestrate entrance sequence"
→ gsap-scrolltrigger "pin + scrub"
→ gsap-performance "optimize for 60fps"
→ impeccable animate "add polish"
```

---

## Emergency Fallbacks

If a skill fails or is unavailable:

| Failed Skill | Fallback | How |
|-------------|----------|-----|
| ui-ux-pro-max | getdesign.md | Copy brand DESIGN.md manually |
| gsap-* | CSS animations | Use `transition` + `@keyframes` |
| impeccable | Manual review | Use checklist from 02-ui-skill-deep-research.md |
| frontend-design | web-design-guidelines | Use `.agents/skills/web-design-guidelines` |
| bencium-ux | ui-ux-pro-max UX section | Search `--domain ux` |
| heroui-* | shadcn/ui MCP | Use shadcn/ui components directly |
