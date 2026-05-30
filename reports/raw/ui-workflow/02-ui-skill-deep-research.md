# UI Skill Deep Research

> Generated: 2026-05-30
> Method: GitHub raw content analysis + web research

---

## 1. GSAP Skills (8 Sub-Skills)

**Source:** `github.com/greensock/gsap-skills`
**Maintainer:** GreenSock (official)
**License:** MIT
**Multi-agent:** Universal (14+ agents)

### 1.1 gsap-core

**Purpose:** Core animation API — tweens, easing, staggering

**Key Rules:**
- Prefer transform aliases (`x`, `y`, `scale`, `rotation`) over raw `transform` strings
- Use `autoAlpha` over `opacity` for fade effects (handles visibility)
- Built-in eases: `"power3.inOut"`, `"back.out(1.7)"`
- Use `gsap.matchMedia()` for responsive breakpoints + `prefers-reduced-motion`
- Store tween instances for playback control
- **Avoid delay-chaining** — use timelines instead

**Trigger:** "animate", "gsap", "tween", "transition", "fade", "slide"

### 1.2 gsap-timeline

**Purpose:** Sequence orchestration

**Key Rules:**
- `gsap.timeline({ defaults: { duration: 0.5 } })` for default propagation
- Position parameters: absolute (`1`), relative (`"+=0.5"`), labels (`"intro"`), alignment (`"<"`)
- Labels improve maintainability: `tl.addLabel("intro", 0)`
- Nest timelines: `master.add(child, 0)`
- Playback controls: `play()`, `pause()`, `reverse()`, `restart()`, `kill()`
- **Keep ScrollTrigger at top level only**

### 1.3 gsap-scrolltrigger

**Purpose:** Scroll-driven animations

**Key Rules:**
- Register once: `gsap.registerPlugin(ScrollTrigger)`
- `start`/`end` values: `"top center"`, `"bottom top"`
- `scrub: true` or `scrub: 0.5` (number = smooth lag)
- `pin: true` with `pinSpacing` for fixed elements
- `ScrollTrigger.batch()` for coordinated callbacks
- **Remove `markers` in production**
- **Avoid combining `scrub` with `toggleActions`**
- Call `ScrollTrigger.refresh()` after layout changes (debounced)

### 1.4 gsap-react

**Purpose:** React integration

**Key Rules:**
- Use `useGSAP()` hook from `@gsap/react` instead of `useEffect`
- Pass `scope` (ref) to limit selectors to component boundaries
- Cleanup runs automatically on unmount
- `revertOnUpdate`: reverts context when dependencies change
- **SSR:** Never call gsap during SSR; use `useGSAP` or `useEffect` for client-only
- **Never target selectors without scope**

### 1.5 gsap-performance

**Purpose:** 60fps optimization

**Key Rules:**
- Animate only `transform` + `opacity` (compositor work)
- Use `will-change: transform` in CSS, but **not universally**
- `gsap.quickTo()` for frequent updates (mouse followers)
- Use stagger instead of manual delays
- Virtualize long lists
- Batch DOM reads/writes to prevent layout thrashing
- **Don't animate width/height/top/left when transforms suffice**

### 1.6 gsap-plugins

**Purpose:** Plugin reference

**Key Plugins:**
- ScrollToPlugin, ScrollSmoother
- Flip (FLIP animations), Draggable, Observer
- SplitText (character/word/line splitting)
- DrawSVG, MorphSVG, MotionPath
- CustomEase, EasePack
- **All plugins are free including commercial use** (Webflow acquisition)

### 1.7 gsap-utils

**Purpose:** Utility functions

**Key Utils:**
- `gsap.utils.clamp()`, `mapRange()`, `interpolate()`
- `gsap.utils.random()`, `splitColor()`, `toArray()`

### 1.8 gsap-frameworks

**Purpose:** Vue/Svelte lifecycle integration

**Key Rules:**
- Vue: cleanup in `onUnmounted`
- Svelte: cleanup in `onDestroy`
- Framework-specific lifecycle hooks for registration/cleanup

---

## 2. Impeccable

**Source:** `github.com/pbakaus/impeccable`
**Maintainer:** Paul Bakaus (Google Chrome DevRel alumni)
**License:** Apache 2.0
**Stars:** 31.4k
**Version:** v3.5.0
**Multi-agent:** Universal (14+ agents)

### 2.1 Positioning

Impeccable is a **design language + review + generation** skill. It sits at the intersection of:
- Design system creation (`init`, `document`)
- UI critique (`critique`, `audit`)
- Polish refinement (`polish`, `bolder`, `quieter`)
- Motion design (`animate`)

### 2.2 The 25 Commands

| Category | Commands |
|----------|----------|
| Build | `craft`, `shape`, `init`, `document`, `extract` |
| Evaluate | `critique`, `audit` |
| Refine | `polish`, `bolder`, `quieter`, `distill`, `harden`, `onboard` |
| Enhance | `animate`, `colorize`, `typeset`, `layout`, `delight`, `overdrive` |
| Fix | `clarify`, `adapt`, `optimize` |
| Iterate | `live` |
| Utils | `pin`, `unpin` |

### 2.3 Key Design Rules

**Absolute Bans (Auto-Rewrite):**
- Side-stripe borders on cards/alerts
- Gradient text (`background-clip: text`)
- Glassmorphism as default
- "Hero-metric template" (big number + small label + gradient)
- Identical card grids (icon + heading + text, repeated)
- Tiny uppercase tracked eyebrows above every section
- Numbered section markers (01/02/03)
- Text overflowing containers at any breakpoint

**The "AI Slop Test":**
> "If someone could guess the theme from category alone, or guess the aesthetic family from 'category-plus-anti-references,' it's failed."

### 2.4 DESIGN.md / PRODUCT.md Generation

- `/impeccable init` — One-time setup: gather design context, write PRODUCT.md + DESIGN.md
- `/impeccable document` — Generate root DESIGN.md from existing project code
- Runs `node .claude/skills/impeccable/scripts/context.mjs` to check for existing docs
- Reads `reference/brand.md` or `reference/product.md` based on project type

### 2.5 Relationship to Other Skills

| Skill | Overlap | Differentiation |
|-------|---------|-----------------|
| frontend-design | Anti-slop, bold aesthetics | Impeccable has 25 commands + audit + DESIGN.md gen |
| ui-ux-pro-max | Styles, palettes, rules | Impeccable is execution-oriented, UI-UX-Pro-Max is reference DB |
| heroui-pro-design-taste | Design principles | Impeccable covers broader scope (motion, copy, audit) |

---

## 3. frontend-design (Official Anthropic)

**Source:** `github.com/anthropics/claude-code/plugins/frontend-design`
**Maintainer:** Anthropic (official)
**Status:** Built-in to Claude Code plugin system

### 3.1 Core Philosophy

**Anti-AI-Slop.** The skill aggressively pushes Claude Code away from generic AI-generated aesthetics.

**Mandatory Direction:**
> "Choose a clear conceptual direction and execute it with precision."

Valid directions: brutal minimalism, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like.

### 3.2 Typography Rules

- **Ban:** Arial, Inter, Roboto, system fonts, Space Grotesk
- **Push:** Distinctive, characterful choices
- **Execution:** Commit to the chosen direction fully

### 3.3 Color Rules

- **Ban:** Purple gradients on white backgrounds, timid evenly-distributed palettes
- **Push:** Dominant colors with sharp accents

### 3.4 Motion Rules

- One well-orchestrated page load with staggered reveals > scattered micro-interactions
- `animation-delay` orchestration preferred

### 3.5 Layout Rules

- Unexpected layouts: asymmetry, overlap, diagonal flow
- Backgrounds: gradient meshes, noise textures, geometric patterns, layered transparencies

### 3.6 Prohibitions

- NEVER use generic AI-generated aesthetics
- NEVER converge on common choices
- NEVER use overused font families
- NEVER use cliched color schemes

### 3.7 Positioning

| Layer | frontend-design | Impeccable |
|-------|----------------|------------|
| Design direction | ✅ Primary | Secondary |
| Implementation | ✅ Primary | Secondary |
| Audit/review | — | ✅ Primary |
| DESIGN.md gen | — | ✅ Primary |
| Motion spec | Basic | Detailed |

**frontend-design is the "what should it look like" skill. Impeccable is the "make it polished + generate docs" skill.**

---

## 4. bencium-controlled-ux-designer

**Source:** `github.com/bencium/bencium-claude-code-design-skill`
**Maintainer:** bencium.io
**License:** MIT
**Size:** 28,000+ characters of UX reference

### 4.1 Positioning

Systematic, production-grade UX design with strict protocols. Best for enterprise, regulated industries, consistency-focused projects.

### 4.2 Reference Documents

| Document | Content |
|----------|---------|
| `ACCESSIBILITY.md` | Full WCAG 2.1/2.2 guidance |
| `RESPONSIVE-DESIGN.md` | Breakpoint strategies |
| `MOTION-SPEC.md` | Easing curves, duration tables, animation patterns |
| `DESIGN-SYSTEM-TEMPLATE.md` | Bootstrap consistent design systems |

### 4.3 Core Philosophy

- Simplicity through reduction
- Material honesty
- Functional layering through typography, color, spatial relationships
- Obsessive attention to detail
- Invisibility of technology

### 4.4 UX Patterns Covered

- Direct manipulation (drag-and-drop, inline editing)
- Immediate feedback within 100ms
- Forgiveness patterns + progressive disclosure
- Conversational interfaces
- Adaptive layouts

### 4.5 Comparison to Alternatives

| | bencium-controlled | bencium-innovative | LibreUIUX |
|--|-------------------|-------------------|-----------|
| Focus | Systematic UX | Bold/creative | Complete infrastructure |
| Size | 28k chars | 28k chars | 152 agents + 74 skills |
| Best for | Enterprise | Landing pages | Power users |
| Weight | Medium | Medium | **Very Heavy** |

---

## 5. UI UX Pro Max (Pre-existing)

**Source:** `github.com/nextlevelbuilder/ui-ux-pro-max-skill`
**Location:** `.claude/skills/ui-ux-pro-max`
**Status:** Full files present (378 items)

### 5.1 Scale

- 67 styles
- 96 color palettes
- 57 font pairings
- 99 UX guidelines
- 25 chart types
- 13 technology stacks

### 5.2 Key Feature: Design System Generator

```bash
python3 skills/ui-ux-pro-max/scripts/search.py "fintech dashboard" --design-system -p "MyApp"
```

This searches 5 domains in parallel (product, style, color, landing, typography) and applies reasoning rules to select best matches.

### 5.3 Persist Pattern

```bash
# Save design system for hierarchical retrieval
python3 skills/ui-ux-pro-max/scripts/search.py "..." --design-system --persist -p "MyApp"
```

Creates:
- `design-system/MASTER.md` — Global source of truth
- `design-system/pages/<page>.md` — Page-specific overrides

### 5.4 Positioning

**UI UX Pro Max is a reference database + design system generator.** It tells you *what* style/palette/font to use. It does not tell you *how* to implement.

| Task | UI UX Pro Max | frontend-design | Impeccable |
|------|--------------|----------------|------------|
| Pick a palette | ✅ Primary | — | Secondary |
| Pick a font | ✅ Primary | — | Secondary |
| Pick a style | ✅ Primary | — | Secondary |
| Write the code | — | ✅ Primary | ✅ Primary |
| Audit the result | — | — | ✅ Primary |

---

## 6. heroui-pro-design-taste (Pre-existing)

**Source:** HeroUI (official)
**Location:** `.claude/skills/heroui-pro-design-taste`
**Status:** Full files present

### 6.1 Scale

78 design principles across 10 categories:
1. General
2. Spacing & Layout
3. Typography
4. Color & Theming
5. Cards & Surfaces
6. Forms & Inputs
7. Buttons & Actions
8. Icons & Decoration
9. Navigation & Structure
10. Accessibility

### 6.2 Key Principles

- **Semantic over visual**: Use `variant="primary"` not `className="bg-blue-500"`
- **Generous whitespace**: `gap-4`, `gap-6`, `p-6`, `p-8`
- **No layout shift**: Conditional elements use floating/overlay positioning
- **Optical alignment**: Large display text aligns by visual center
- **Minimalism**: When in doubt, remove the decorative element

### 6.3 Positioning

**HeroUI-specific.** Only relevant when using `@heroui/react` or `@heroui-pro/react`. Not a general-purpose design skill.

---

## 7. P1/P2 Research Summary

### 7.1 getdesign.md

- **What:** Web frontend for `awesome-design-md` (71 brand DESIGN.md files)
- **How to use:** Browse → copy DESIGN.md → paste into project root
- **Relationship to Impeccable:** getdesign.md provides *raw material* (brand DNA); Impeccable provides *processing* (audit, polish, DESIGN.md generation)
- **Recommendation:** Use as style source, not as skill. No installation needed.

### 7.2 huashu-design

- **Status:** Repository 404 — cannot install
- **Concept:** HTML-native design (browser as renderer)
- **Output:** HTML → MP4/GIF/PDF/PPTX
- **Comparison to PPT Master:**
  - huashu: HTML-first, agent-agnostic, animation-focused
  - PPT Master: SVG-first, multi-role collaboration, PPTX export
- **Recommendation:** If repo becomes available, install as presentation-layer skill. Currently unavailable.

### 7.3 UI UX Pro Max

- **Status:** Already installed ✅
- **Recommendation:** Keep as reference DB. Not a code generator.
- **Trigger:** "design system", "color palette", "font pairing", "style"

### 7.4 ux-ui-mastery / aesthetic-foundations

- **Status:** Not found as distinct repositories
- **Recommendation:** The `ui-ux-pro-max` + `heroui-pro-design-taste` + `impeccable` combination already covers these domains. No additional installation needed unless a specific high-quality repo is identified.

---

## 8. Skill Dependency Graph

```
Design Input
    ├── frontend-design (direction, anti-slop)
    ├── ui-ux-pro-max (palette/style/font DB)
    └── getdesign.md (brand DNA reference)
           ↓
    DESIGN.md / PRODUCT.md
           ↓
    Implementation
    ├── frontend-design (code generation)
    ├── Impeccable (craft/shape/polish)
    └── heroui-pro-design-taste (if using HeroUI)
           ↓
    Motion
    └── gsap-skills (8 sub-modules)
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
