---
title: "UI 项目设计系统"
type: template
status: draft
updated: 2026-05-30
owner: threetwoa
---

# DESIGN.md — [项目名称]

> 本模板基于 `docs/ui-workflow/workflow-standard.md` Stage 0 输出。
> 创建时间：YYYY-MM-DD

---

## 1. 项目概述

| 维度 | 内容 |
|------|------|
| **项目类型** | landing / dashboard / chat / e-commerce / other |
| **目标用户** | ... |
| **核心目标** | ... |
| **技术栈** | HeroUI Pro v3 / GSAP / Tailwind CSS / etc. |
| **设计系统** | 基于 HeroUI Pro + 自定义主题 |

## 2. 品牌与视觉

### 2.1 色彩系统

| Token | 值 | 用途 |
|-------|-----|------|
| `primary` | `#...` | 主色调 |
| `secondary` | `#...` | 次色调 |
| `background` | `#...` | 背景色 |
| `surface` | `#...` | 卡片/面板背景 |
| `text-primary` | `#...` | 主文本 |
| `text-secondary` | `#...` | 次文本 |

### 2.2 字体

| 用途 | 字体 | 回退 |
|------|------|------|
| 标题 | ... | system-ui |
| 正文 | ... | system-ui |
| 代码 | ... | monospace |

### 2.3 间距系统

基于 Tailwind 默认 scale：`4px` 基础单位

## 3. 组件清单

| 组件 | 来源 | 自定义需求 | 状态 |
|------|------|-----------|------|
| Button | HeroUI | 品牌色适配 | ⬜ |
| Card | HeroUI | 阴影/圆角 | ⬜ |
| Modal | HeroUI | 动画 | ⬜ |
| Table | HeroUI | 排序/筛选 | ⬜ |
| Chart | HeroUI Pro | 数据绑定 | ⬜ |

## 4. 页面结构

```
[页面名]
├── Header
│   ├── Logo
│   ├── Navigation
│   └── User Menu
├── Main Content
│   └── [内容区块]
└── Footer
```

## 5. 动画规范

| 场景 | 动画类型 | 时长 | 缓动 |
|------|---------|------|------|
| 页面进入 | fade + slide | 300ms | ease-out |
| 列表加载 | stagger fade | 50ms/item | ease-out |
| 模态框 | scale + fade | 200ms | ease-in-out |
| 数据更新 | pulse | 300ms | ease |

> 参考：`docs/ui-workflow/gsap-motion-guide.md`

## 6. 响应式断点

| 断点 | 宽度 | 布局变化 |
|------|------|---------|
| mobile | < 640px | 单列，汉堡菜单 |
| tablet | 640–1024px | 双列，侧边栏可折叠 |
| desktop | > 1024px | 完整布局 |

## 7. 审查门

- [ ] 品牌一致性检查
- [ ] 无障碍性检查（WCAG 2.1 AA）
- [ ] 性能预算检查（LCP < 2.5s）
- [ ] 动画性能检查（60fps）

## 8. 参考资料

- `docs/ui-workflow/workflow-standard.md`
- `docs/heroui/component-reference.md`
