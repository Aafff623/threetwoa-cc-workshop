# UI Workflow Standard

> Generated: 2026-05-30
> Scope: threetwoa AI Workflow Operating System — UI/UX layer

---

## Philosophy

This workflow separates **design decisions** from **implementation** from **review**. Each stage has clear inputs, outputs, and skill assignments. No skill is overloaded; each has a single primary responsibility.

---

## Stage 0: Project Setup (One-Time)

**When:** New project starts, or major redesign begins
**Who:** Claude Code
**Output:** `DESIGN.md` + `PRODUCT.md` (optional)

### Commands

```bash
# If starting from scratch
/impeccable init

# If extracting from existing code
/impeccable document
```

### What Happens

1. Impeccable scans project for existing design conventions
2. Reads `reference/brand.md` or `reference/product.md`
3. Generates `PRODUCT.md` (product context) and `DESIGN.md` (design system)
4. If no brand colors exist, runs `palette.mjs` for OKLCH guidance

### Output

```
project-root/
├── DESIGN.md          ← Design system (colors, typography, spacing, components)
├── PRODUCT.md         ← Product context (audience, goals, constraints)
└── ...
```

---

## Stage 1: Design Direction

**When:** Need to decide what the UI should look like
**Who:** GPT (strategy) + Claude Code (execution)
**Input:** Project brief, audience, industry
**Output:** Style selection + palette + fonts + layout direction

### Workflow

```
GPT provides:
  - Product type (SaaS, e-commerce, portfolio...)
  - Target audience
  - Mood keywords (professional, playful, luxury...)
  - Tech stack (React, Vue, HTML+Tailwind...)

Claude Code executes:
  Step 1: ui-ux-pro-max --design-system
    → Generates complete design system with reasoning

  Step 2: frontend-design validation
    → Checks for AI slop, pushes bold direction
    → Validates font choices against ban list
    → Validates color against cliche list

  Step 3: (Optional) getdesign.md reference
    → If brand consistency needed, copy relevant DESIGN.md

  Step 4: Persist design system
    → ui-ux-pro-max --persist
    → Creates design-system/MASTER.md + pages/*.md
```

### Decision Gate

> **GPT must approve the design direction before implementation.**

Claude Code presents:
- Selected style + rationale
- Color palette (with contrast ratios)
- Font pairings
- Anti-pattern warnings
- 2–3 alternative directions (if requested)

---

## Stage 2: Implementation

**When:** Design direction approved
**Who:** Claude Code
**Input:** DESIGN.md + style selection
**Output:** Working code (components, pages, interfaces)

### Workflow

```
Step 1: Structure
  → frontend-design "build [page/component]"
  → Uses semantic HTML, Tailwind classes
  → Applies layout rules (asymmetry, overlap, diagonal flow)

Step 2: Components
  → If HeroUI project: heroui-react-pro
    → Lookup component APIs via MCP
    → Apply heroui-pro-design-taste principles
  → If custom: frontend-design generates from scratch

Step 3: Polish
  → Impeccable polish
    → Checks for banned patterns
    → Validates contrast, spacing, typography
    → Ensures no AI slop
```

### Quality Gates

- [ ] No banned fonts (Inter, Roboto, Arial, Space Grotesk)
- [ ] No banned color schemes (purple gradient on white)
- [ ] No banned layouts (identical card grids, hero-metric template)
- [ ] All interactive elements have `cursor-pointer`
- [ ] Focus states visible
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile

---

## Stage 3: Motion Design

**When:** Static implementation approved, need animation
**Who:** Claude Code
**Input:** Implementation code + motion requirements
**Output:** Animated code

### Decision Tree

```
What type of motion?
├── Page load entrance
│   └── gsap-timeline + gsap-core
│       → Orchestrate staggered reveals
│       → Use labels for maintainability
│
├── Scroll-triggered
│   └── gsap-scrolltrigger
│       → Pin, scrub, or toggle
│       → Batch for lists
│
├── React component animation
│   └── gsap-react
│       → useGSAP hook
│       → Scope to component
│       → Cleanup automatic
│
├── SVG / text special effects
│   └── gsap-plugins
│       → SplitText for text reveals
│       → DrawSVG for line drawing
│       → MorphSVG for shape morphing
│
├── Performance optimization
│   └── gsap-performance
│       → quickTo for mouse followers
│       → will-change strategy
│       → Batch DOM operations
│
└── Simple hover / transition
    └── CSS transition (not GSAP)
        → Keep bundle size down
```

### Quality Gates

- [ ] `prefers-reduced-motion` respected
- [ ] Only transform + opacity animated
- [ ] Cleanup on unmount (useGSAP or ctx.revert)
- [ ] No SSR execution
- [ ] Markers removed in production
- [ ] Duration 150–300ms for micro-interactions
- [ ] No layout thrashing

---

## Stage 4: UX Review

**When:** Implementation + motion complete
**Who:** Claude Code (self-review) → Codex (external review)
**Input:** Complete code
**Output:** Review report + fixes

### Claude Code Self-Review

```bash
# UX audit
bencium-controlled-ux-designer "audit UX"

# Design critique
impeccable critique

# Polish pass
impeccable polish
```

### Codex Review

```
Codex checks:
  - Accessibility (WCAG 2.1)
  - Responsive behavior
  - Animation performance
  - Code quality
  - GSAP cleanup
```

### Review Dimensions

| Dimension | Skill | Check |
|-----------|-------|-------|
| Accessibility | bencium | WCAG 2.1/2.2 compliance |
| Touch targets | bencium | 44×44px minimum |
| Responsive | bencium | Breakpoint strategy |
| Motion | gsap-performance | 60fps, reduced-motion |
| Visual polish | impeccable | Banned patterns, AI slop test |
| Typography | impeccable | Line length, hierarchy |
| Color | impeccable | Contrast ratios |

---

## Stage 5: Presentation (Optional)

**When:** Need to present or share the work
**Who:** Claude Code
**Input:** Final code + assets
**Output:** Presentation materials

### Options

| Need | Tool | Output |
|------|------|--------|
| Slides | baoyu-slide-deck | Slide images |
| PPTX | ppt-master | .pptx file |
| Infographic | baoyu-infographic | Visual summary |
| Cover image | baoyu-cover-image | Article/project cover |
| Diagram | drawio / excalidraw / mermaid | Architecture diagram |
| HTML demo | prototype | Interactive prototype |

---

## Global vs. Project Scope

### Global (Always Available)

These skills are registered in Claude Code's global skill index:
- gsap-* (8 sub-skills)
- impeccable
- frontend-design
- bencium-controlled-ux-designer
- ui-ux-pro-max
- heroui-*
- baoyu-*
- diagram skills

### Project-Level (Explicit Enable)

These should be explicitly added per project:
- `DESIGN.md` — Project-specific design system
- `PRODUCT.md` — Project-specific product context
- `CLAUDE.md` — Project-specific instructions (can reference skills)
- Skill overrides — If a project's style differs from global defaults

### How to Enable on a Project

```bash
# Option 1: Copy DESIGN.md to project root
cp design-system/MASTER.md ./DESIGN.md

# Option 2: Let Impeccable generate
/impeccable document

# Option 3: Copy from getdesign.md
# Browse getdesign.md → copy brand design → paste as DESIGN.md
```

---

## Handoff Protocol

### GPT → Claude Code

```
Input:
  - UI brief (product type, audience, goals)
  - Tech stack preference
  - Reference sites (optional)
  - Constraints (budget, timeline, accessibility level)

Output from Claude Code:
  - Design system proposal (style, palette, fonts)
  - Questions for GPT (if unclear)

Gate: GPT approves design direction
```

### Claude Code → Codex

```
Input:
  - Complete implementation code
  - DESIGN.md
  - Motion specs (if any)

Output from Codex:
  - Review report (bugs, UX issues, performance)
  - Suggested fixes

Gate: All critical issues resolved
```

### Codex → GPT

```
Input:
  - Claude Code implementation summary
  - Codex review report
  - Remaining questions

Output from GPT:
  - Strategic decisions on unresolved issues
  - Next iteration direction
```

---

## Skill Trigger Mapping

| User Says | Triggered Skill | Stage |
|-----------|----------------|-------|
| "Design a landing page" | frontend-design | 1 → 2 |
| "What palette should I use?" | ui-ux-pro-max | 1 |
| "Make it look like Stripe" | getdesign.md + frontend-design | 1 |
| "Add scroll animation" | gsap-scrolltrigger | 3 |
| "Animate page load" | gsap-timeline | 3 |
| "React animation" | gsap-react | 3 |
| "Audit this UI" | impeccable audit + bencium | 4 |
| "Polish this" | impeccable polish | 2 → 4 |
| "Fix layout" | impeccable layout | 2 |
| "Create slides" | baoyu-slide-deck / ppt-master | 5 |
| "Draw architecture diagram" | drawio / excalidraw / mermaid | 5 |
| "Make it bolder" | impeccable bolder | 2 |
| "Add motion" | impeccable animate | 3 |

---

## Minimal Viable Workflow

For quick projects, skip stages:

```
Brief
  → frontend-design "build it" (Stage 2 only)
  → gsap-core "add simple fade-in" (Stage 3 lite)
  → Done
```

For high-value projects, full workflow:

```
Brief
  → Stage 0: Impeccable init
  → Stage 1: ui-ux-pro-max + frontend-design direction
  → GPT approval
  → Stage 2: frontend-design implementation
  → Stage 3: gsap-* motion
  → Stage 4: bencium + impeccable + Codex review
  → Stage 5: Presentation (if needed)
  → Ship
```
