# HeroUI Pro Dashboard Starter

基于 HeroUI Pro v3 的 Dashboard 模板骨架，采用 **AppShell + Navbar + Sidebar + NavItems** 标准架构。

## 技术栈

| 依赖 | 版本 |
|------|------|
| Next.js (App Router) | 16.x |
| React | 19.x |
| @heroui/react | 3.0.3 |
| @heroui-pro/react | 1.0.0-beta.4 |
| @heroui/styles | 3.0.3 |
| @gravity-ui/icons | 2.18.0 |
| recharts | 3.8.0 |
| Tailwind CSS | v4 |
| TypeScript | 5.9.x |

## 快速开始

```bash
# 1. 安装依赖
pnpm install

# 2. 认证 Pro 组件（需要 HP Key）
$env:HEROUI_KEY = "hp_你的Key"
npx -y hpsetup@latest

# 3. 启动开发服务器
pnpm dev
```

## 项目结构

```
src/
├── app/
│   ├── (app)/              # Route Group（共享 Shell）
│   │   ├── layout.tsx      # AppShell 注入
│   │   └── page.tsx        # Dashboard 首页
│   ├── globals.css         # HeroUI CSS 导入
│   └── layout.tsx          # Root Layout
├── components/
│   ├── app-shell.tsx       # Shell 容器（AppLayout + Navbar + Sidebar）
│   ├── dashboard-navbar.tsx
│   ├── dashboard-sidebar.tsx
│   └── icon-button.tsx     # 通用图标按钮
└── nav-items.ts            # 导航路由定义
```

## 需要自定义的内容

### 必须修改

1. **导航路由** — 编辑 `src/nav-items.ts`，定义你的 `NAV_ITEMS` 和 `FOOTER_ITEMS`
2. **Sidebar 内容** — 编辑 `src/components/dashboard-sidebar.tsx`，调整 Header/Footer 区域
3. **页面路由** — 在 `src/app/(app)/` 下添加子路由目录及 `page.tsx`
4. **Mock 数据** — 新建 `src/data/` 目录，放置业务数据（参考架构文档的 `data/` 层模式）

### 建议扩展

| 扩展项 | 说明 |
|--------|------|
| `src/views/` | 页面级组合层，将 widgets 组装成完整页面 |
| `src/widgets/` | 可复用业务组件（图表、表格、KPI 卡片等） |
| `src/data/` | Mock 数据 + 类型定义，`readonly` + `as const` |
| 图表组件 | 安装 recharts 后从 `@heroui-pro/react` 引入 `AreaChart` 等 |

## 架构约定

- **三层职责**：`components/`（Shell）→ `views/`（页面控制器）→ `widgets/`（业务组件）
- **样式顺序铁律**：`tailwindcss` → `@heroui/styles` → `@heroui-pro/react/css`（必须最后）
- **导航类型**：`NavItem` 类型含 `href` / `label` / `icon` / 可选 `badge`
- **Pro 组件认证**：需要 hpsetup 认证后才能使用 `@heroui-pro/react`

## 参考

- [HeroUI Pro v3 模板架构精要](../../../docs/heroui/template-architecture.md)
- [HeroUI Pro v3 移植指南](../../../docs/heroui/porting-guide.md)