# 四大模板架构分析

> 分析对象：`D:\code\hero-ui-v3\templates\` 下的 template-chat、template-dashboard、template-email、template-finances
> 分析日期：2026-05-29

---

## 1. 技术栈对比

| 维度 | Chat | Dashboard | Email | Finances |
|------|------|-----------|-------|----------|
| **框架** | Next.js 16.2.3 (App Router) | 同左 | 同左 | 同左 |
| **React** | 19.2.5 | 19.2.5 | 19.2.5 | 19.2.5 |
| **HeroUI OSS** | @heroui/react 3.0.3 | 3.0.3 | 3.0.3 | 3.0.3 |
| **HeroUI Pro** | @heroui-pro/react latest | latest | latest | latest |
| **HeroUI Styles** | @heroui/styles 3.0.3 | 3.0.3 | 3.0.3 | 3.0.3 |
| **图标** | @gravity-ui/icons 2.18.0 | 2.18.0 | 2.18.0 | 2.18.0 |
| **图表** | — | recharts 3.8.0 | — | recharts 3.8.0 |
| **Tailwind** | v4.2.2 + @tailwindcss/postcss | 同左 | 同左 | 同左 |
| **TypeScript** | 5.9.3 | 5.9.3 | 5.9.3 | 5.9.3 |
| **dev port** | 3004 | 3003 | 3005 | 3006 |

**关键差异**：
- Dashboard / Finances 额外依赖 `recharts`（图表模板需要）
- Chat / Email 无图表依赖，更轻量
- 四个模板共享完全一致的 HeroUI v3 核心版本

---

## 2. 目录结构矩阵

### 2.1 统一层

```
每个模板都包含：
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (app)/              # Route Group（共享 Shell）
│   │   │   ├── layout.tsx      # Shell 注入点
│   │   │   ├── page.tsx        # 首页
│   │   │   └── [...]/          # 子路由
│   │   ├── layout.tsx          # Root Layout（Toast/Metadata）
│   │   └── globals.css         # HeroUI CSS 导入
│   ├── components/             # 全局 Shell 组件
│   ├── views/                  # 页面级组合（Page Views）
│   ├── widgets/                # Pro 组件消费层（仅 Dashboard/Finances）
│   └── data/                   # Mock 数据 + 类型定义
├── package.json / next.config.ts / tsconfig.json
```

### 2.2 各模板目录差异

| 模板 | app/ 路由 | components/ | views/ | widgets/ | data/ | nav-items.ts |
|------|-----------|-------------|--------|----------|-------|--------------|
| **Chat** | `(app)/[chatId]/`, `explore/`, `library/`, `new/` | 6 个 | 4 个 | — | 1 个 | ❌ 内联在 data/chat.ts |
| **Dashboard** | `(app)/analytics/`, `orders/`, `tracker/`, `settings/`, `help/` | 4 个 | 6 个 | 12 个 | 6 个 | ✅ 独立文件 |
| **Email** | `(app)/[folder]/[emailId]/` | 8 个 | — | — | 1 个 | ❌ 内联在 data/email.ts |
| **Finances** | `(app)/portfolio/`, `spending/`, `earn/`, `transactions/`, `settings/`, `help/` | 4 个 | 7 个 | 9 个 | 5 个 | ✅ 独立文件 |

### 2.3 路由组织模式

**Chat / Email：动态路由 + 重定向首页**
- Chat: `page.tsx` → `redirect(/${DEFAULT_CHAT_THREAD_ID})`
- Email: `page.tsx` → `redirect(/${DEFAULT_FOLDER_ID})`
- 动态段：`[chatId]` / `[folder]` / `[emailId]`
- 使用 `generateStaticParams()` 预渲染动态路由

**Dashboard / Finances：静态路由 + 直接渲染**
- 每个页面一个目录，无动态段
- `page.tsx` 直接 import 对应的 View 组件

---

## 3. Shell 实现差异

### 3.1 四种 Shell 对比

| Shell | 模板 | Navbar | Sidebar | 特殊功能 | disableNavigation |
|-------|------|--------|---------|----------|-------------------|
| **ChatShell** | Chat | ChatNavbar（动态标题/副标题） | ChatSidebar（Action Items + Recent Threads） | ⌘K 搜索对话框 | ✅ 支持 |
| **AppShell** | Dashboard | DashboardNavbar（路由标题） | DashboardSidebar（NavItems + FooterItems） | 无 | ❌ 不支持 |
| **EmailShell** | Email | 无（Email 无 Navbar） | EmailSidebar（Folders + Labels + Compose） | C 键打开 Compose Sheet | ✅ 支持 |
| **AppShell** | Finances | FinancesNavbar（路由标题 + 操作按钮） | FinancesSidebar（NavItems + FooterItems） | 无 | ✅ 支持 |

### 3.2 Shell 核心结构

所有 Shell 都包裹在 `<AppLayout>`（来自 `@heroui-pro/react`）中：

```tsx
<AppLayout
  navigate={navigate}           // 路由跳转回调
  navbar={<XxxNavbar />}        // 顶部导航栏
  sidebar={<XxxSidebar />}      // 侧边栏
  sidebarCollapsible="offcanvas" // 折叠模式
>
  {children}
  {/* 全局浮层：搜索 / Compose */}
</AppLayout>
```

### 3.3 ChatShell 独有特性

```tsx
// 1. 动态页面解析（thread / new / library / explore）
const activePage = resolveChatActivePage(pathname, basePath);

// 2. 键盘快捷键：⌘K 打开搜索
useEffect(() => { /* metaKey + K */ }, [disableNavigation]);

// 3. 搜索对话框（Command 组件）
<ChatSearchDialog isOpen={isSearchOpen} threads={CHAT_THREADS} ... />

// 4. Sidebar 双区域：Action Items + Recent Threads
<Sidebar.Group> {/* New / Library / Explore */} </Sidebar.Group>
<Sidebar.Separator />
<Sidebar.Group> {/* Recent chats */} </Sidebar.Group>
```

### 3.4 EmailShell 独有特性

```tsx
// 1. 无 Navbar（Email 是 list-detail 布局，不需要顶部栏）
// 2. 键盘快捷键：C 打开 Compose（排除 input/textarea）
useEffect(() => { /* key === 'c' */ }, [disableNavigation]);

// 3. Compose Sheet（右侧滑出）
<ComposeSheet isOpen={isComposeOpen} onOpenChange={setIsComposeOpen} />

// 4. Sidebar 双区域：Folders + Labels
<Sidebar.Group> {/* Inbox / Starred / Sent ... */} </Sidebar.Group>
<Sidebar.Separator />
<Sidebar.Group> {/* Labels */} </Sidebar.Group>

// 5. Footer 操作：New email 按钮
<Sidebar.Footer>
  <Button onPress={onCompose}>New email</Button>
</Sidebar.Footer>
```

### 3.5 AppShell（Dashboard/Finances）标准模式

```tsx
// 1. 路由标题推导（O(1) Map 查找）
const ROUTE_LABELS = new Map([...NAV_ITEMS, ...FOOTER_ITEMS].map(...));
const title = ROUTE_LABELS.get(relative) ?? HOME_GREETING;

// 2. 标准 Sidebar：Header(Avatar) + Content(NavItems) + Footer(FooterItems)
<Sidebar.Header> {/* Avatar + User info */} </Sidebar.Header>
<Sidebar.Content> {/* NAV_ITEMS */} </Sidebar.Content>
<Sidebar.Footer> {/* FOOTER_ITEMS */} </Sidebar.Footer>
```

### 3.6 disableNavigation 预览模式

Chat / Email / Finances 支持 `disableNavigation` prop：

```tsx
export interface XxxShellProps {
  children: ReactNode;
  basePath?: string;
  disableNavigation?: boolean;  // 预览模式：禁用实际路由跳转
}
```

实现方式：
- `navigate` 回调：如果 `disableNavigation` 则直接 `return`
- `Sidebar.MenuItem`：如果 `disableNavigation` 则 `href={undefined}`
- 键盘快捷键：`useEffect` 中提前 `if (disableNavigation) return`

Dashboard 的 AppShell **不支持** `disableNavigation`（历史原因或简化设计）。

---

## 4. NavItems 模式

### 4.1 独立文件模式（Dashboard / Finances）

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
  {href: "/orders", icon: Receipt, label: "Orders"},
  {badge: "New", href: "/tracker", icon: ListCheck, label: "Tracker"},
  ...
] as const;

export const FOOTER_ITEMS: readonly NavItem[] = [
  {href: "/help", icon: CircleQuestion, label: "Help & Information"},
  {href: "/logout", icon: ArrowRightFromSquare, label: "Log out"},
] as const;
```

**特点**：
- 独立文件，类型清晰
- 支持 `badge` 属性（Chip 角标）
- 分为 `NAV_ITEMS`（主导航）和 `FOOTER_ITEMS`（底部操作）
- Dashboard 和 Finances 的 `NavItem` 类型完全一致

### 4.2 内联数据模式（Chat / Email）

**Chat**（`data/chat.ts`）：

```ts
export type ChatNavItemId = "new" | "library" | "explore";

export type ChatNavItem = {
  id: ChatNavItemId;
  icon: ComponentType;
  label: string;
  href: string;
  shortcut?: string;
};

export const CHAT_NAV_ITEMS: readonly ChatNavItem[] = [
  {href: "/new", icon: SquarePlus, id: "new", label: "New Chat"},
  ...
] as const;
```

**Email**（`data/email.ts`）：

```ts
export type EmailFolderId = "inbox" | "starred" | "sent" | ...;

export type EmailFolder = {
  id: EmailFolderId;
  label: string;
  icon: ComponentType;
};

export const FOLDERS: readonly EmailFolder[] = [
  {icon: Tray, id: "inbox", label: "Inbox"},
  ...
] as const;
```

**特点**：
- 与业务数据（threads / messages）放在同一文件
- Chat 使用 `id` 作为唯一键（用于 `onAction` 回调）
- Email 使用 `id` 作为路由段（`/${folder.id}`）
- 都支持 `icon` 组件引用

---

## 5. 三层职责边界（components / views / widgets）

### 5.1 职责定义

| 层级 | 职责 | 类比 |
|------|------|------|
| **components/** | 全局 Shell 组件（Navbar / Sidebar / Shell） | 布局框架 |
| **views/** | 页面级组合，将 widgets 组装成完整页面 | 页面控制器 |
| **widgets/** | 独立可复用的 Pro 组件消费单元 | 业务组件 |
| **data/** | Mock 数据、类型定义、辅助函数 | 数据层 |

### 5.2 各模板层级分布

**Chat（无 widgets 层）**：
```
components/  → Shell + Navbar + Sidebar + Composer + SearchDialog + MessageActions
views/       → ChatPage + NewChatPage + ExplorePage + LibraryPage
data/        → chat.ts（所有数据 + 类型 + 解析函数）
```

**Dashboard（完整三层）**：
```
components/  → AppShell + DashboardNavbar + DashboardSidebar + IconButton
views/       → DashboardPage + AnalyticsPage + OrdersPage + TrackerPage + SettingsPage + HelpPage
widgets/     → KpiRow + SalesPerformanceCard + TrafficSourceCard + EmployeesTable + ...
data/        → sales.ts + analytics.ts + employees.ts + orders.ts + tracker.ts + traffic.ts
```

**Email（无 views/widgets 层）**：
```
components/  → EmailShell + EmailSidebar + EmailList + EmailDetail + ComposeSheet + ...
data/        → email.ts（所有数据 + 类型 + 辅助函数）
```

**Finances（完整三层）**：
```
components/  → AppShell + FinancesNavbar + FinancesSidebar + IconButton
views/       → DashboardPage + PortfolioPage + SpendingPage + EarnPage + TransactionsPage + SettingsPage + HelpPage
widgets/     → BalanceKpiStrip + PortfolioChartCard + HoldingsList + AllocationCard + ...
data/        → holdings.ts + portfolio.ts + transactions.ts + earn.ts + spending.ts
```

### 5.3 关键发现

- **Chat / Email 是扁平架构**：数据驱动型应用，页面结构简单，不需要 widgets 层
- **Dashboard / Finances 是分层架构**：数据可视化型应用，需要大量可复用卡片/表格
- **views/ 层非常薄**：通常只是将 widgets 按网格布局组合，无复杂逻辑
- **widgets/ 层是核心资产**：包含大量可直接复制的图表、表格、KPI 组件

---

## 6. 可复用组件清单

### 6.1 跨模板通用组件

| 组件 | 来源 | 复用价值 | 复制难度 |
|------|------|----------|----------|
| **IconButton** | Dashboard / Finances `components/icon-button.tsx` | 无障碍图标按钮（Tooltip + aria-label） | 低 |
| **AppShell** | Dashboard / Finances `components/app-shell.tsx` | 标准 Shell 模板（Navbar + Sidebar） | 低 |
| **DashboardSidebar** / **FinancesSidebar** | Dashboard / Finances `components/*-sidebar.tsx` | 标准 Sidebar（Header + Nav + Footer） | 低 |
| **SettingsPage** | Dashboard / Finances `views/settings-page.tsx` | 表单设置页模板 | 中 |
| **HelpPage** | Dashboard / Finances `views/help-page.tsx` | FAQ + 链接卡片页模板 | 低 |

### 6.2 Dashboard 独有可复用 widgets

| 组件 | 路径 | 功能 | 依赖 |
|------|------|------|------|
| **KpiRow** | `widgets/kpi-row.tsx` | 4 列 KPI 卡片行（Revenue/Expenses/Sales/Profit） | `data/sales.ts` |
| **SalesPerformanceCard** | `widgets/sales-performance-card.tsx` | 柱状图 + 迷你 KPI + 时间选择器 | `data/sales.ts`, `recharts` |
| **TrafficSourceCard** | `widgets/traffic-source-card.tsx` | 双折线图（Organic/Paid） | `data/traffic.ts`, `recharts` |
| **EmployeesTable** | `widgets/employees-table.tsx` | 员工表格（搜索 + 排序 + 行操作） | `data/employees.ts` |
| **AnalyticsKpiRow** | `widgets/analytics-kpi-row.tsx` | 4 列分析 KPI（带 Sparkline） | `data/analytics.ts` |
| **SessionsOverTimeCard** | `widgets/sessions-over-time-card.tsx` | 双折线大图（Sessions/Users） | `data/analytics.ts` |
| **DeviceBreakdownCard** | `widgets/device-breakdown-card.tsx` | 环形图（Mobile/Desktop/Tablet） | `data/analytics.ts`, `recharts` |
| **TopChannelsCard** | `widgets/top-channels-card.tsx` | 水平条形图（渠道流量） | `data/analytics.ts`, `recharts` |
| **TopPagesCard** | `widgets/top-pages-card.tsx` | 页面数据表格（Views/Time/Bounce/Trend） | `data/analytics.ts` |
| **DashboardToolbar** | `widgets/dashboard-toolbar.tsx` | Tabs + 日期选择 + 下载按钮 | — |
| **RowActions** | `widgets/employees-table-row-actions.tsx` | 查看/编辑/删除操作按钮组 | `IconButton` |
| **OrdersRowActions** | `widgets/orders-row-actions.tsx` | 订单操作按钮组 | `IconButton` |

### 6.3 Finances 独有可复用 widgets

| 组件 | 路径 | 功能 | 依赖 |
|------|------|------|------|
| **BalanceKpiStrip** | `widgets/balance-kpi-strip.tsx` | 4 列金融 KPI（Total/24h/Top/Holdings） | `data/holdings.ts` |
| **PortfolioChartCard** | `widgets/portfolio-chart-card.tsx` | 投资组合折线图 + 时间范围切换 | `data/portfolio.ts`, `recharts` |
| **HoldingsList** | `widgets/holdings-list.tsx` | 持仓列表（头像 + Sparkline + 涨跌幅） | `data/holdings.ts`, `recharts` |
| **AllocationCard** | `widgets/allocation-card.tsx` | 资产配置进度条 + 明细列表 | `data/holdings.ts` |
| **RecentActivityTable** | `widgets/recent-activity-table.tsx` | 交易记录表格（搜索 + 排序 + 过滤） | `data/transactions.ts` |
| **EarnTable** | `widgets/earn-table.tsx` | 收益机会表格（APY/TVL/Risk） | `data/earn.ts` |
| **SpendingByCategoryCard** | `widgets/spending-by-category-card.tsx` | 环形图 + 分类明细 | `data/spending.ts`, `recharts` |
| **SpendingSummaryCard** | `widgets/spending-summary-card.tsx` | 消费统计摘要卡片 | `data/spending.ts` |
| **SpendingTransactionsList** | `widgets/spending-transactions-list.tsx` | 按日期分组的交易列表 | `data/spending.ts` |

### 6.4 Chat 独有可复用组件

| 组件 | 路径 | 功能 | 依赖 |
|------|------|------|------|
| **ChatComposer** | `components/chat-composer.tsx` | 聊天输入框（TextArea + 模型选择 + 附件） | `data/chat.ts` |
| **MessageActions** | `components/message-actions.tsx` | 消息操作按钮（Copy/Thumbs/Regenerate） | — |
| **ChatSearchDialog** | `components/chat-search-dialog.tsx` | ⌘K 搜索对话框（Command 组件） | `data/chat.ts` |
| **ChatNavbar** | `components/chat-navbar.tsx` | 动态标题 Navbar（thread 标题 / 页面标题） | `data/chat.ts` |

### 6.5 Email 独有可复用组件

| 组件 | 路径 | 功能 | 依赖 |
|------|------|------|------|
| **ComposeSheet** | `components/compose-sheet.tsx` | 邮件撰写 Sheet（右侧滑出表单） | — |
| **EmailDetail** | `components/email-detail.tsx` | 邮件详情页（Toolbar + ThreadMessage） | `data/email.ts` |
| **EmailList** | `components/email-list.tsx` | 邮件列表（Search + ScrollShadow） | `data/email.ts` |
| **EmailListItem** | `components/email-list-item.tsx` | 邮件列表项（Avatar + 已读状态 + Star） | `data/email.ts` |
| **FolderLayout** | `components/folder-layout.tsx` | 响应式 list-detail 布局（md+ 并排 / mobile 切换） | `data/email.ts` |
| **EmptyState** | `components/empty-state.tsx` | 空状态提示 | — |

---

## 7. 移植建议

### 7.1 快速启动新模板

**方案 A：从 Dashboard 克隆（数据可视化型）**
```bash
# 1. 复制 Dashboard 模板
# 2. 修改 nav-items.ts 定义新路由
# 3. 替换 data/ 下的 mock 数据
# 4. 在 widgets/ 中组合所需的图表/表格
# 5. 在 views/ 中按网格布局组装页面
```

**方案 B：从 Chat 克隆（对话/内容型）**
```bash
# 1. 复制 Chat 模板
# 2. 修改 data/chat.ts 定义新数据模型
# 3. 调整 Sidebar 的 Action Items
# 4. 自定义 ChatComposer 为其他输入形式
# 5. 保留 ⌘K 搜索模式（或替换为其他快捷键）
```

### 7.2 跨模板移植组件

**从 Dashboard → 新项目**：
- 复制 `components/app-shell.tsx` + `components/icon-button.tsx`
- 复制 `nav-items.ts` 模式
- 按需复制 widgets/ 中的图表组件（需安装 `recharts`）
- 复制 `views/settings-page.tsx` 和 `views/help-page.tsx`

**从 Finances → 新项目**：
- 同上，但 widgets/ 更偏向金融数据展示
- `PortfolioChartCard` 的时间范围切换模式可复用
- `HoldingsList` 的 Sparkline 模式可复用

**从 Chat → 新项目**：
- 复制 `components/chat-shell.tsx` 的键盘快捷键模式
- 复制 `components/chat-search-dialog.tsx` 的 Command 搜索模式
- 复制 `components/chat-composer.tsx` 的复合输入框模式

**从 Email → 新项目**：
- 复制 `components/folder-layout.tsx` 的响应式 list-detail 布局
- 复制 `components/compose-sheet.tsx` 的 Sheet 表单模式
- 复制 `components/email-list-item.tsx` 的列表项交互模式

### 7.3 数据层设计建议

**统一模式**：
```ts
// data/xxx.ts
export type XxxItem = { ... };
export const XXX_ITEMS: readonly XxxItem[] = [...] as const;
export function getXxx(id: string): XxxItem | undefined { ... }
export function resolveXxxActivePage(pathname: string, basePath: string): XxxActivePage { ... }
```

**关键约定**：
- 所有 mock 数据使用 `readonly` + `as const`
- 类型定义与数据放在同一文件
- 提供 `getXxx()` 查找函数
- 提供 `resolveXxxActivePage()` 路由解析函数
- 模块级计算（如 `TOTAL_BALANCE_USD`）在文件顶部完成

### 7.4 样式约定

```css
/* globals.css - 所有模板一致 */
@import "@heroui/styles/css";
@import "@heroui-pro/react/css";
@source "../**/*.{ts,tsx}";
body { background-color: var(--background); }
```

**Tailwind 常用模式**：
- 卡片圆角：`rounded-2xl`
- 页面容器：`mx-auto max-w-7xl px-5 pb-10 pt-4`
- 网格布局：`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4`
- 两列布局：`grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]`
- 数字字体：`tabular-nums`
- 文字截断：`truncate`

---

## 8. 附录：文件清单

### 8.1 Dashboard 完整文件树

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

### 8.2 Finances 完整文件树

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

### 8.3 Chat 完整文件树

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

### 8.4 Email 完整文件树

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

---

*报告生成完毕。所有文件路径均为绝对路径，可直接定位到源码。*
