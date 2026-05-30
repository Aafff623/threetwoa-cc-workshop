---
title: "CLAUDE.md - UI 项目工作流模板"
type: template
status: active
updated: 2026-05-30
owner: "<!-- 在此填写维护者 -->"
---

# CLAUDE.md 模板 · UI 项目

> **如何使用**：复制到项目根目录，替换所有 `<!-- ... -->` 占位符后重命名为 `CLAUDE.md`。

---

## Project Overview

<!-- 在此填写项目名称 --> 是 <!-- 在此填写一句话描述 -->。详见 [`PRODUCT.md`](./PRODUCT.md)。

## Tech Stack

| 层级 | 技术 |
|------|------|
| 框架 | <!-- 如 Next.js 15 --> |
| 语言 | <!-- 如 TypeScript 5.x --> |
| 样式 | <!-- 如 Tailwind CSS 4 --> |
| 组件库 | HeroUI Pro (@heroui-pro/react) |
| 动画 | GSAP 3 + @gsap/react |
| 包管理 | <!-- pnpm / npm --> |
| 部署 | <!-- 如 Vercel --> |

## Design System

### 设计令牌

```css
--color-primary: <!-- 主色 -->
--color-surface: <!-- 背景色 -->
--radius-base: <!-- 圆角基准值 -->
--font-heading: <!-- 标题字体 -->
--font-body: <!-- 正文字体 -->
--spacing-unit: <!-- 间距单元 -->
```

### HeroUI Pro 集成

- 组件优先使用 `@heroui-pro/react` Pro 组件
- 主题配置统一在 `src/styles/heroui-theme.ts`
- Pro MCP 工具查询组件 API 与示例

## UI Workflow

### 三层工作流

| 层 | 职责 | 工具 |
|----|------|------|
| **Spec** | 产品定义 | GPT |
| **执行** | 编码实现 | Claude Code |
| **审查** | 质量把关 | Codex |

### Skill 路由表

| 场景 | Skill |
|------|-------|
| 新建 UI 页面 | `design-taste-frontend` |
| 动画实现 | 相关 GSAP skill |
| HeroUI Pro 组件 | `heroui-react-pro` |
| Code Review | `requesting-code-review` |
| 架构优化 | `improve-codebase-architecture` |
| Bug 调试 | `systematic-debugging` |
| 设计审查 | `vision-analysis` |

## Component Patterns

### 目录结构

```
src/
├── components/ui/       <!-- 通用基础组件 -->
├── components/features/ <!-- 业务功能组件 -->
├── components/layouts/  <!-- 布局组件 -->
├── hooks/               <!-- 自定义 Hooks -->
├── styles/              <!-- 全局样式与 tokens -->
├── lib/                 <!-- 工具函数 -->
└── app/                 <!-- Next.js App Router -->
```

### 命名约定

- 组件：`PascalCase.tsx`（如 `UserProfileCard.tsx`）
- Hook：`camelCase.ts`（如 `useAuth.ts`）
- 导出：统一 `export default` + `export type`

### 组件模板

```tsx
interface <!-- ComponentName -->Props {
  // <!-- 在此定义 props -->
}

export default function <!-- ComponentName -->(props: <!-- ComponentName -->Props) {
  return <!-- JSX -->
}
```

## Animation Guidelines

### GSAP 规则

1. 所有滚动动画通过 `useGSAP` Hook 管理
2. 仅 animate `transform` + `opacity`，禁止 `width`/`height`/`top`/`left`
3. 复杂动画使用 `gsap.timeline()`，避免散落 tween
4. `pin` + `scrub` 组合时确保容器有明确高度

### 动画令牌

```css
--duration-fast: 200ms;
--duration-base: 400ms;
--duration-slow: 800ms;
--ease-out: cubic-bezier(0.16, 1, 0.3, 1);
```

## File Organization

```
├── PRODUCT.md            <!-- 产品定义（GPT 主导） -->
├── CLAUDE.md              <!-- 本文件 -->
├── docs/design-tokens.md  <!-- 设计令牌详细定义 -->
├── docs/adr/              <!-- 架构决策记录 -->
├── public/assets/         <!-- 静态资源 -->
└── src/                   <!-- 源码 -->
```

## Windows 专用注意事项

> 完整说明见 `windows-skill-gap-workaround.md`

| 问题 | workaround |
|------|-----------|
| PowerShell GBK 编码 | 写中文文件用 `write` 工具，禁 `Set-Content` |
| 路径分隔符 | 代码中用 `path.join()` |
| 换行符 | `.gitattributes` 设 `* text=auto eol=lf` |
| 长路径 | `git config --global core.longpaths true` |

## Quality Checklist

- [ ] `npm run typecheck` 无报错
- [ ] `npm run lint` 无报错
- [ ] 响应式覆盖 375px / 768px / 1280px
- [ ] 动画 FPS ≥ 55，无 layout thrashing
- [ ] 视觉层级清晰，无"AI 味"通用布局

---

> **三层工作流**：Spec（GPT）→ 执行（Claude Code + Skills）→ 审查（Codex）