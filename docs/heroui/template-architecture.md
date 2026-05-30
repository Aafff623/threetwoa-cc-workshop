---
title: "HeroUI Pro v3 模板架构精要"
type: reference
status: active
source_files:
  - reports/raw/heroui/template-architecture.md
updated: 2026-05-30
owner: threetwoa
---

# HeroUI Pro v3 模板架构精要

四大模板：Chat、Dashboard、Email、Finances，共享 HeroUI v3 核心，在数据层和 Shell 层各有差异。

## 技术栈对比

| 维度 | Chat | Dashboard | Email | Finances |
|------|------|-----------|-------|----------|
| 框架 | Next.js 16.2.3 (App Router) | 同左 | 同左 | 同左 |
| React | 19.2.5 | 19.2.5 | 19.2.5 | 19.2.5 |
| HeroUI OSS | @heroui/react 3.0.3 | 3.0.3 | 3.0.3 | 3.0.3 |
| HeroUI Pro | @heroui-pro/react latest | latest | latest | latest |
| HeroUI Styles | @heroui/styles 3.0.3 | 3.0.3 | 3.0.3 | 3.0.3 |
| 图标 | @gravity-ui/icons 2.18.0 | 2.18.0 | 2.18.0 | 2.18.0 |
| 图表 | — | recharts 3.8.0 | — | recharts 3.8.0 |
| Tailwind | v4.2.2 + @tailwindcss/postcss | 同左 | 同左 | 同左 |
| TypeScript | 5.9.3 | 5.9.3 | 5.9.3 | 5.9.3 |
| dev port | 3004 | 3003 | 3005 | 3006 |

**关键差异**：Dashboard / Finances 多 `recharts` 依赖（图表模板需要）；Chat / Email 更轻量无图表。

## 目录结构

### 统一层

每个模板都包含：

```
src/
├── app/
│   ├── (app)/              # Route Group（共享 Shell）
│   │   ├── layout.tsx      # Shell 注入点
│   │   ├── page.tsx        # 首页
│   │   └── [...]/          # 子路由
│   ├── layout.tsx          # Root Layout（Toast/Metadata）
│   └── globals.css         # HeroUI CSS 导入
├── components/             # 全局 Shell 组件
├── views/                  # 页面级组合（Page Views）
├── widgets/                # Pro 组件消费层（仅 Dashboard/Finances）
└── data/                   # Mock 数据 + 类型定义
```

### 差异矩阵

| 模板 | app/ 路由 | components/ | views/ | widgets/ | data/ | nav-items.ts |
|------|-----------|-------------|--------|----------|-------|--------------|
| **Chat** | `(app)/[chatId]/`, `explore/`, `library/`, `new/` | 6 | 4 | — | 1 | ❌ 内联在 data/chat.ts |
| **Dashboard** | `(app)/analytics/`, `orders/`, `tracker/`, `settings/`, `help/` | 4 | 6 | 12 | 6 | ✅ 独立文件 |
| **Email** | `(app)/[folder]/[emailId]/` | 8 | — | — | 1 | ❌ 内联在 data/email.ts |
| **Finances** | `(app)/portfolio/`, `spending/`, `earn/`, `transactions/`, `settings/`, `help/` | 4 | 7 | 9 | 5 | ✅ 独立文件 |

### 路由组织模式

**Chat / Email：动态路由 + 重定向首页**

```tsx
// Chat: page.tsx → redirect(/${DEFAULT_CHAT_THREAD_ID})
// Email: page.tsx → redirect(/${DEFAULT_FOLDER_ID})
// 动态段：[chatId] / [folder] / [emailId]
// 使用 generateStaticParams() 预渲染动态路由
```

**Dashboard / Finances：静态路由 + 直接渲染**

```tsx
// 每个页面一个目录，无动态段
// page.tsx 直接 import 对应的 View 组件
```

## 三层职责边界

| 层级 | 职责 | 类比 |
|------|------|------|
| **components/** | 全局 Shell 组件（Navbar / Sidebar / Shell） | 布局框架 |
| **views/** | 页面级组合，将 widgets 组装成完整页面 | 页面控制器 |
| **widgets/** | 独立可复用的 Pro 组件消费单元 | 业务组件 |
| **data/** | Mock 数据、类型定义、辅助函数 | 数据层 |

各模板层级分布：

| 模板 | 架构 | components/ | views/ | widgets/ | data/ |
|------|------|-------------|--------|----------|-------|
| Chat | 扁平 | Shell + Navbar + Sidebar + Composer + SearchDialog + MessageActions | 4 页面 | — | chat.ts |
| Dashboard | 分层 | AppShell + Navbar + Sidebar + IconButton | 6 页面 | 12 个图表/表格 | 6 个数据文件 |
| Email | 扁平 | Shell + Sidebar + List + Detail + ComposeSheet + FolderLayout + EmptyState | — | — | email.ts |
| Finances | 分层 | AppShell + Navbar + Sidebar + IconButton | 7 页面 | 9 个金融组件 | 5 个数据文件 |

**关键发现**：
- Chat / Email 扁平架构：数据驱动型，页面简单，不需要 widgets 层
- Dashboard / Finances 分层架构：数据可视化型，需要大量可复用卡片/表格
- views/ 层非常薄：通常只是将 widgets 按网格布局组合
- widgets/ 层是核心资产：包含可直接复制的图表、表格、KPI 组件

## Shell 实现差异

### 四种 Shell 对比

| Shell | 模板 | Navbar | Sidebar | 特殊功能 | disableNavigation |
|-------|------|--------|---------|----------|-------------------|
| ChatShell | Chat | ChatNavbar（动态标题/副标题） | ChatSidebar（Action Items + Recent Threads） | ⌘K 搜索对话框 | ✅ |
| AppShell | Dashboard | DashboardNavbar（路由标题） | DashboardSidebar（NavItems + FooterItems） | — | ❌ |
| EmailShell | Email | 无 | EmailSidebar（Folders + Labels + Compose） | C 键打开 Compose Sheet | ✅ |
| AppShell | Finances | FinancesNavbar（路由标题 + 操作按钮） | FinancesSidebar（NavItems + FooterItems） | — | ✅ |

### 核心结构

所有 Shell 都包裹在 `<AppLayout>`（来自 `@heroui-pro/react`）中：

```tsx
<AppLayout
  navigate={navigate}
  navbar={<XxxNavbar />}
  sidebar={<XxxSidebar />}
  sidebarCollapsible="offcanvas"
>
  {children}
  {/* 全局浮层：搜索 / Compose */}
</AppLayout>
```

### ChatShell 独有特性

```tsx
// 1. 动态页面解析（thread / new / library / explore）
const activePage = resolveChatActivePage(pathname, basePath);

// 2. 键盘快捷键：⌘K 打开搜索
useEffect(() => { /* metaKey + K */ }, [disableNavigation]);

// 3. 搜索对话框（Command 组件）
<ChatSearchDialog isOpen={isSearchOpen} threads={CHAT_THREADS} ... />

// 4. Sidebar 双区域：Action Items + Recent Threads
<Sidebar.Group>{/* New / Library / Explore */}</Sidebar.Group>
<Sidebar.Separator />
<Sidebar.Group>{/* Recent chats */}</Sidebar.Group>
```

### EmailShell 独有特性

```tsx
// 1. 无 Navbar（list-detail 布局不需要顶部栏）
// 2. 键盘快捷键：C 打开 Compose（排除 input/textarea）
useEffect(() => { /* key === 'c' */ }, [disableNavigation]);

// 3. Compose Sheet（右侧滑出）
<ComposeSheet isOpen={isComposeOpen} onOpenChange={setIsComposeOpen} />

// 4. Sidebar 双区域：Folders + Labels
// 5. Footer 操作：New email 按钮
<Sidebar.Footer>
  <Button onPress={onCompose}>New email</Button>
</Sidebar.Footer>
```

### AppShell（Dashboard/Finances）标准模式

```tsx
// 路由标题推导（O(1) Map 查找）
const ROUTE_LABELS = new Map([...NAV_ITEMS, ...FOOTER_ITEMS].map(...));
const title = ROUTE_LABELS.get(relative) ?? HOME_GREETING;

// 标准 Sidebar：Header(Avatar) + Content(NavItems) + Footer(FooterItems)
<Sidebar.Header>{/* Avatar + User info */}</Sidebar.Header>
<Sidebar.Content>{/* NAV_ITEMS */}</Sidebar.Content>
<Sidebar.Footer>{/* FOOTER_ITEMS */}</Sidebar.Footer>
```

### disableNavigation 预览模式

Chat / Email / Finances 支持 `disableNavigation` prop：

```tsx
export interface XxxShellProps {
  children: ReactNode;
  basePath?: string;
  disableNavigation?: boolean; // 预览模式：禁用实际路由跳转
}
```

实现方式：
- `navigate` 回调：`disableNavigation` 时直接 `return`
- `Sidebar.MenuItem`：`disableNavigation` 时 `href={undefined}`
- 键盘快捷键：`useEffect` 中 `if (disableNavigation) return`

Dashboard 的 AppShell **不支持** `disableNavigation`。

## NavItems 模式

### 独立文件模式（Dashboard / Finances）

```ts
// src/nav-items.ts
export type NavItem = {
  readonly href: string;
  readonly label: string;
  readonly icon: ComponentType<{className?: string}>;
  readonly badge?: string;
};

export const NAV_ITEMS: readonly NavItem[] = [
  {href: "/", icon: House, label: "Dashboard"},
  {badge: "New", href: "/tracker", icon: ListCheck, label: "Tracker"},
] as const;

export const FOOTER_ITEMS: readonly NavItem[] = [
  {href: "/help", icon: CircleQuestion, label: "Help & Information"},
  {href: "/logout", icon: ArrowRightFromSquare, label: "Log out"},
] as const;
```

特点：独立文件、类型清晰、支持 `badge`、分 `NAV_ITEMS` + `FOOTER_ITEMS`。

### 内联数据模式（Chat / Email）

```ts
// Chat: data/chat.ts
export type ChatNavItem = {
  id: ChatNavItemId;
  icon: ComponentType;
  label: string;
  href: string;
  shortcut?: string;
};

// Email: data/email.ts
export type EmailFolder = {
  id: EmailFolderId;
  label: string;
  icon: ComponentType;
};
```

特点：与业务数据同文件、Chat 用 `id` 做 `onAction` 回调键、Email 用 `id` 做路由段。

## 可复用组件清单

### 跨模板通用组件

| 组件 | 来源 | 复制难度 |
|------|------|----------|
| **IconButton** | Dashboard / Finances `components/icon-button.tsx` | 低 |
| **AppShell** | Dashboard / Finances `components/app-shell.tsx` | 低 |
| **DashboardSidebar / FinancesSidebar** | Dashboard / Finances `components/*-sidebar.tsx` | 低 |
| **SettingsPage** | Dashboard / Finances `views/settings-page.tsx` | 中 |
| **HelpPage** | Dashboard / Finances `views/help-page.tsx` | 低 |

### Dashboard 独有 widgets

| 组件 | 功能 | 依赖 |
|------|------|------|
| **KpiRow** | 4 列 KPI 卡片行 | `data/sales.ts` |
| **SalesPerformanceCard** | 柱状图 + 迷你 KPI + 时间选择器 | `data/sales.ts`, `recharts` |
| **TrafficSourceCard** | 双折线图 | `data/traffic.ts`, `recharts` |
| **EmployeesTable** | 员工表格（搜索 + 排序 + 行操作） | `data/employees.ts` |
| **AnalyticsKpiRow** | 4 列分析 KPI（带 Sparkline） | `data/analytics.ts` |
| **SessionsOverTimeCard** | 双折线大图 | `data/analytics.ts` |
| **DeviceBreakdownCard** | 环形图 | `data/analytics.ts`, `recharts` |
| **TopChannelsCard** | 水平条形图 | `data/analytics.ts`, `recharts` |
| **TopPagesCard** | 页面数据表格 | `data/analytics.ts` |
| **DashboardToolbar** | Tabs + 日期选择 + 下载按钮 | — |
| **RowActions** | 查看/编辑/删除操作按钮组 | `IconButton` |
| **OrdersRowActions** | 订单操作按钮组 | `IconButton` |

### Finances 独有 widgets

| 组件 | 功能 | 依赖 |
|------|------|------|
| **BalanceKpiStrip** | 4 列金融 KPI | `data/holdings.ts` |
| **PortfolioChartCard** | 投资组合折线图 + 时间范围切换 | `data/portfolio.ts`, `recharts` |
| **HoldingsList** | 持仓列表（头像 + Sparkline + 涨跌幅） | `data/holdings.ts`, `recharts` |
| **AllocationCard** | 资产配置进度条 + 明细列表 | `data/holdings.ts` |
| **RecentActivityTable** | 交易记录表格（搜索 + 排序 + 过滤） | `data/transactions.ts` |
| **EarnTable** | 收益机会表格（APY/TVL/Risk） | `data/earn.ts` |
| **SpendingByCategoryCard** | 环形图 + 分类明细 | `data/spending.ts`, `recharts` |
| **SpendingSummaryCard** | 消费统计摘要卡片 | `data/spending.ts` |
| **SpendingTransactionsList** | 按日期分组的交易列表 | `data/spending.ts` |

### Chat 独有组件

| 组件 | 功能 | 依赖 |
|------|------|------|
| **ChatComposer** | 聊天输入框（TextArea + 模型选择 + 附件） | `data/chat.ts` |
| **MessageActions** | 消息操作按钮（Copy/Thumbs/Regenerate） | — |
| **ChatSearchDialog** | ⌘K 搜索对话框（Command 组件） | `data/chat.ts` |
| **ChatNavbar** | 动态标题 Navbar | `data/chat.ts` |

### Email 独有组件

| 组件 | 功能 | 依赖 |
|------|------|------|
| **ComposeSheet** | 邮件撰写 Sheet（右侧滑出表单） | — |
| **EmailDetail** | 邮件详情页（Toolbar + ThreadMessage） | `data/email.ts` |
| **EmailList** | 邮件列表（Search + ScrollShadow） | `data/email.ts` |
| **EmailListItem** | 邮件列表项（Avatar + 已读状态 + Star） | `data/email.ts` |
| **FolderLayout** | 响应式 list-detail 布局（md+ 并排 / mobile 切换） | `data/email.ts` |
| **EmptyState** | 空状态提示 | — |

## 数据层设计模式

统一模式：

```ts
// data/xxx.ts
export type XxxItem = { ... };
export const XXX_ITEMS: readonly XxxItem[] = [...] as const;
export function getXxx(id: string): XxxItem | undefined { ... }
export function resolveXxxActivePage(pathname: string, basePath: string): XxxActivePage { ... }
```

关键约定：
- 所有 mock 数据使用 `readonly` + `as const`
- 类型定义与数据放在同一文件
- 提供 `getXxx()` 查找函数
- 提供 `resolveXxxActivePage()` 路由解析函数
- 模块级计算（如 `TOTAL_BALANCE_USD`）在文件顶部完成

## 样式约定

```css
/* globals.css - 所有模板一致 */
@import "@heroui/styles/css";
@import "@heroui-pro/react/css";
@source "../**/*.{ts,tsx}";
body { background-color: var(--background); }
```

Tailwind 常用模式：

| 模式 | 用途 |
|------|------|
| `rounded-2xl` | 卡片圆角 |
| `mx-auto max-w-7xl px-5 pb-10 pt-4` | 页面容器 |
| `grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4` | KPI 网格 |
| `grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]` | 两列布局 |
| `tabular-nums` | 数字等宽 |
| `truncate` | 文字截断 |

## 移植建议

### 从 Dashboard 克隆（数据可视化型）

1. 复制 `components/app-shell.tsx` + `components/icon-button.tsx`
2. 复制 `nav-items.ts` 模式，定义新路由
3. 替换 `data/` 下的 mock 数据
4. 按需复制 widgets/ 中的图表组件（需 `recharts`）
5. 在 views/ 中按网格布局组装页面
6. 复制 `views/settings-page.tsx` 和 `views/help-page.tsx`

### 从 Chat 克隆（对话/内容型）

1. 复制 `components/chat-shell.tsx` 的键盘快捷键模式
2. 修改 `data/chat.ts` 定义新数据模型
3. 调整 Sidebar 的 Action Items
4. 保留 ⌘K 搜索模式（Command 组件）
5. 自定义 ChatComposer 为其他输入形式

### 从 Email 克隆（list-detail 型）

1. 复制 `components/folder-layout.tsx` 的响应式 list-detail 布局
2. 复制 `components/compose-sheet.tsx` 的 Sheet 表单模式
3. 复制 `components/email-list-item.tsx` 的列表项交互模式

### 从 Finances 克隆（金融/数据型）

- 同 Dashboard，但 widgets 更偏向金融数据展示
- `PortfolioChartCard` 时间范围切换模式可复用
- `HoldingsList` 的 Sparkline 模式可复用

## 完整文件树

### Dashboard

```
src/
├── app/
│   ├── (app)/
│   │   ├── analytics/page.tsx
│   │   ├── help/page.tsx
│   │   ├── layout.tsx
│   │   ├── orders/page.tsx
│   │   ├── page.tsx
│   │   ├── settings/page.tsx
│   │   └── tracker/page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── app-shell.tsx
│   ├── dashboard-navbar.tsx
│   ├── dashboard-sidebar.tsx
│   └── icon-button.tsx
├── views/
│   ├── analytics-page.tsx
│   ├── dashboard-page.tsx
│   ├── help-page.tsx
│   ├── orders-page.tsx
│   ├── settings-page.tsx
│   └── tracker-page.tsx
├── widgets/
│   ├── analytics-kpi-row.tsx
│   ├── dashboard-toolbar.tsx
│   ├── device-breakdown-card.tsx
│   ├── employees-table.tsx
│   ├── employees-table-row-actions.tsx
│   ├── kpi-row.tsx
│   ├── orders-row-actions.tsx
│   ├── sales-performance-card.tsx
│   ├── sessions-over-time-card.tsx
│   ├── top-channels-card.tsx
│   ├── top-pages-card.tsx
│   └── traffic-source-card.tsx
├── data/
│   ├── analytics.ts
│   ├── employees.ts
│   ├── orders.ts
│   ├── sales.ts
│   ├── tracker.ts
│   └── traffic.ts
└── nav-items.ts
```

### Finances

```
src/
├── app/
│   ├── (app)/
│   │   ├── earn/page.tsx
│   │   ├── help/page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── portfolio/page.tsx
│   │   ├── settings/page.tsx
│   │   ├── spending/page.tsx
│   │   └── transactions/page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── app-shell.tsx
│   ├── finances-navbar.tsx
│   ├── finances-sidebar.tsx
│   └── icon-button.tsx
├── views/
│   ├── dashboard-page.tsx
│   ├── earn-page.tsx
│   ├── help-page.tsx
│   ├── portfolio-page.tsx
│   ├── settings-page.tsx
│   ├── spending-page.tsx
│   └── transactions-page.tsx
├── widgets/
│   ├── allocation-card.tsx
│   ├── balance-kpi-strip.tsx
│   ├── earn-table.tsx
│   ├── holdings-list.tsx
│   ├── portfolio-chart-card.tsx
│   ├── recent-activity-table.tsx
│   ├── spending-by-category-card.tsx
│   ├── spending-summary-card.tsx
│   └── spending-transactions-list.tsx
├── data/
│   ├── earn.ts
│   ├── holdings.ts
│   ├── portfolio.ts
│   ├── spending.ts
│   └── transactions.ts
└── nav-items.ts
```

### Chat

```
src/
├── app/
│   ├── (app)/
│   │   ├── [chatId]/page.tsx
│   │   ├── explore/page.tsx
│   │   ├── layout.tsx
│   │   ├── library/page.tsx
│   │   ├── new/page.tsx
│   │   └── page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── chat-composer.tsx
│   ├── chat-navbar.tsx
│   ├── chat-search-dialog.tsx
│   ├── chat-shell.tsx
│   ├── chat-sidebar.tsx
│   └── message-actions.tsx
├── views/
│   ├── chat-page.tsx
│   ├── explore-page.tsx
│   ├── library-page.tsx
│   └── new-chat-page.tsx
└── data/
    └── chat.ts
```

### Email

```
src/
├── app/
│   ├── (app)/
│   │   ├── [folder]/
│   │   │   ├── [emailId]/page.tsx
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── compose-sheet.tsx
│   ├── email-detail.tsx
│   ├── email-list.tsx
│   ├── email-list-item.tsx
│   ├── email-shell.tsx
│   ├── email-sidebar.tsx
│   ├── empty-state.tsx
│   └── folder-layout.tsx
└── data/
    └── email.ts
```

## Source Material

- `reports/raw/heroui/template-architecture.md`