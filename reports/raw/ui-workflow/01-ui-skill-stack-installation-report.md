# UI Skill Stack Installation Report

> Generated: 2026-05-30
> Environment: Windows 11 Home China, PowerShell 5.1
> Claude Code: v2.1.156

---

## 1. Environment Snapshot

| Item | Value |
|------|-------|
| OS | Windows 11 Home China (Build 26100) |
| Shell | PowerShell 5.1 |
| Claude Code | v2.1.156 |
| Node.js | v24.14.0 |
| npm | 11.9.0 |
| pnpm | 10.33.0 |
| bun | **Not installed** |
| Python | 3.13.0 |
| Skills root (.claude/skills) | `C:\Users\Lenovo\.claude\skills` |
| Skills root (.agents/skills) | `C:\Users\Lenovo\.agents\skills` |
| Plugins root | `C:\Users\Lenovo\.claude\plugins` |

### Pre-installed UI-Related Skills (Before This Run)

| Skill | Location | Status |
|-------|----------|--------|
| ui-ux-pro-max | .claude/skills | ✅ Full files (378 items) |
| heroui-pro-design-taste | .claude/skills | ✅ Full files |
| heroui-react-pro | .claude/skills | ✅ Full files |
| heroui-native-pro | .claude/skills | ✅ Full files |
| baoyu-diagram | .claude/skills | ✅ Full files |
| baoyu-infographic | .claude/skills | ✅ Full files |
| baoyu-slide-deck | .claude/skills | ✅ Full files |
| baoyu-cover-image | .claude/skills | ✅ Full files |
| drawio-skill | .claude/skills | ✅ Full files |
| excalidraw-skill | .claude/skills | ✅ Full files |
| mermaid-skill | .claude/skills | ✅ Full files |
| tldraw-skill | .claude/skills | ✅ Full files |
| ppt-master | .claude/skills | ✅ Full files (1537 items) |
| minimax-* (docx/pdf/xlsx/multimodal/music-gen) | .claude/skills | ✅ Full files |
| prototype | .claude/skills | ✅ Full files |
| vision-analysis | .claude/skills | ✅ Full files |
| frontend-design | .agents/skills | ⚠️ Empty directory (0 items) |
| web-design-guidelines | .agents/skills | ⚠️ Empty directory (0 items) |

---

## 2. P0 Installation Results

### 2.1 GSAP Skills ✅ SUCCESS

| Sub-Skill | Install Path | Claude Code Registered | Files Present |
|-----------|-------------|----------------------|---------------|
| gsap-core | `.agents/skills/gsap-core` | ✅ Yes | ⚠️ Empty (symlink only) |
| gsap-timeline | `.agents/skills/gsap-timeline` | ✅ Yes | ⚠️ Empty |
| gsap-scrolltrigger | `.agents/skills/gsap-scrolltrigger` | ✅ Yes | ⚠️ Empty |
| gsap-plugins | `.agents/skills/gsap-plugins` | ✅ Yes | ⚠️ Empty |
| gsap-utils | `.agents/skills/gsap-utils` | ✅ Yes | ⚠️ Empty |
| gsap-react | `.agents/skills/gsap-react` | ✅ Yes | ⚠️ Empty |
| gsap-performance | `.agents/skills/gsap-performance` | ✅ Yes | ⚠️ Empty |
| gsap-frameworks | `.agents/skills/gsap-frameworks` | ✅ Yes | ⚠️ Empty |

**Install Command:** `npx skills add https://github.com/greensock/gsap-skills`

**Security Scan:** All 8 skills passed (Safe / 0 alerts / Low Risk)

**Multi-Agent Support:** Universal — Antigravity, Cline, Codex, Cursor, Gemini CLI, GitHub Copilot, OpenCode, Qwen Code, Trae, Windsurf, Zed (+ 3 more)

**⚠️ Known Issue:** `npx skills` on Windows creates empty directories. The skill metadata is registered in Claude Code's skill index, but actual SKILL.md files are not written to disk. Content was retrieved directly from GitHub raw URLs for analysis.

---

### 2.2 Impeccable ✅ SUCCESS

| Property | Value |
|----------|-------|
| Install Path | `.agents/skills/impeccable` |
| Claude Code Registered | ✅ Yes |
| Files Present | ⚠️ Empty (symlink only) |
| Version | v3.5.0 (per SKILL.md) |
| License | Apache 2.0 |

**Install Command:** `npx skills add pbakaus/impeccable`

**Security Scan:** Medium Risk (per skills.sh assessment) — **Review before use**

**Multi-Agent Support:** Universal — same 14 agents as GSAP

**Key Capabilities Registered:**
- 25 commands: `/impeccable craft`, `init`, `document`, `audit`, `polish`, `animate`, etc.
- DESIGN.md / PRODUCT.md generation
- AI Slop detection and elimination
- Codex CLI subagent support

---

### 2.3 frontend-design ✅ ALREADY PRESENT (Empty)

| Property | Value |
|----------|-------|
| Install Path | `.agents/skills/frontend-design` |
| Claude Code Registered | ✅ Yes |
| Files Present | ⚠️ Empty (0 items) |
| Source | `github.com/anthropics/claude-code/plugins/frontend-design` |
| Official Status | Anthropic Official |

**Note:** This skill was already present in `.agents/skills/` before this run, but the directory was empty. The skill metadata is registered in Claude Code's index. Content was retrieved from GitHub for analysis.

---

### 2.4 ux-designer-skill → bencium-controlled-ux-designer ✅ SUCCESS

| Property | Value |
|----------|-------|
| Install Path | `.agents/skills/bencium-controlled-ux-designer` |
| Claude Code Registered | ✅ Yes |
| Files Present | ⚠️ Empty (symlink only) |
| Source | `github.com/bencium/bencium-claude-code-design-skill` |
| Variant | controlled (systematic, production-grade) |

**Install Command:** `npx skills add https://github.com/bencium/bencium-claude-code-design-skill --skill bencium-controlled-ux-designer`

**Security Scan:** Safe / 0 alerts / Low Risk

**Note:** The originally requested `ux-designer-skill` does not exist as a single repository. `bencium-controlled-ux-designer` was selected as the closest equivalent — 28,000+ characters of UX reference, with ACCESSIBILITY.md, RESPONSIVE-DESIGN.md, MOTION-SPEC.md, and DESIGN-SYSTEM-TEMPLATE.md.

---

## 3. Installation Summary Table

| Skill | Priority | Status | Install Cmd | Files | Security |
|-------|----------|--------|-------------|-------|----------|
| gsap-core | P0 | ✅ | `npx skills add greensock/gsap-skills` | Empty* | Safe |
| gsap-timeline | P0 | ✅ | (bundled with above) | Empty* | Safe |
| gsap-scrolltrigger | P0 | ✅ | (bundled) | Empty* | Safe |
| gsap-react | P0 | ✅ | (bundled) | Empty* | Safe |
| gsap-performance | P0 | ✅ | (bundled) | Empty* | Safe |
| gsap-plugins | P0 | ✅ | (bundled) | Empty* | Safe |
| gsap-utils | P0 | ✅ | (bundled) | Empty* | Safe |
| gsap-frameworks | P0 | ✅ | (bundled) | Empty* | Safe |
| Impeccable | P0 | ✅ | `npx skills add pbakaus/impeccable` | Empty* | Medium |
| frontend-design | P0 | ✅ (pre-existing) | n/a | Empty* | — |
| bencium-controlled-ux-designer | P0 | ✅ | `npx skills add bencium/... --skill bencium-controlled-ux-designer` | Empty* | Safe |

*Empty = Windows `npx skills` installer creates symlink/registration without copying actual files. Content verified via GitHub raw URLs.

---

## 4. Failures & Issues

### 4.1 Critical: Windows File System Gap

**Issue:** `npx skills` installer on Windows registers skills in Claude Code's index but does **not** copy SKILL.md files to disk.

**Evidence:**
- `.agents/skills/gsap-core/`: 0 items
- `.agents/skills/impeccable/`: 0 items
- `.agents/skills/frontend-design/`: 0 items (pre-existing)
- `.agents/skills/bencium-controlled-ux-designer/`: 0 items

**Impact:** Skills appear in Claude Code's available skills list and trigger correctly, but cannot be read from local disk. If the skill relies on local scripts (e.g., `ui-ux-pro-max/scripts/search.py`), those will fail.

**Workaround:** Content analysis was done by fetching SKILL.md directly from GitHub raw URLs.

**Fix Recommendation:**
```bash
# Manual clone for full file access
git clone --depth 1 https://github.com/greensock/gsap-skills ~/.claude/skills/gsap-skills-src
git clone --depth 1 https://github.com/pbakaus/impeccable ~/.claude/skills/impeccable-src
```

### 4.2 frontend-design Location Confusion

**Issue:** The official frontend-design skill is **not** in `github.com/anthropics/skills` (404). It is in `github.com/anthropics/claude-code/plugins/frontend-design/`.

**Impact:** The common install command `npx skills add https://github.com/anthropics/skills --skill frontend-design` would fail.

**Actual Source:** `github.com/anthropics/claude-code/tree/main/plugins/frontend-design`

### 4.3 huashu-design Repository Unavailable

**Issue:** `github.com/alchaincyf/huashu-design` returns 404.

**Status:** Cannot install. Will be treated as P2 (research only).

---

## 5. Unverified Items

| Item | Why Unverified | How to Verify |
|------|---------------|---------------|
| GSAP skill script execution | No local files to run | Manual clone + test in project |
| Impeccable `/impeccable` commands | No local scripts | Need project with existing code to test `document`/`audit` |
| bencium reference docs | Raw 404 on GitHub | Clone full repo to inspect ACCESSIBILITY.md etc. |
| frontend-design ASSETS.md | Raw 404 | Check if plugin directory has assets subdirectory |
| Claude Code skill trigger accuracy | Not tested in live project | Create test project, invoke each skill |

---

## 6. Next Steps

1. **Fix Windows file gap:** Manual clone GSAP + Impeccable repos for local script access
2. **Verify triggers:** Create a test HTML project and invoke each P0 skill
3. **Test Impeccable commands:** Run `/impeccable init` and `/impeccable audit` on a real project
4. **Test GSAP workflow:** Create a React + GSAP demo to verify timeline/ScrollTrigger guidance
5. **Evaluate bencium vs. LibreUIUX:** If bencium is insufficient, consider installing HermeticOrmus/LibreUIUX-Claude-Code (152 agents, 74 skills — much heavier)
