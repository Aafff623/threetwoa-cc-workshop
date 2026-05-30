# HeroUI Pro v3 — 组件参考与移植方案

> 来源：`D:\code\hero-ui-v3` 资产工作区  
> 更新时间：2026-05-29  
> 授权有效期：2027-05-01

---

## 1. 项目本质与技术栈

### 1.1 这是什么？

**HeroUI Pro v3** 是企业级 React / React Native UI 组件库，官方出品，包含：
- **55+ Web 组件**（`@heroui-pro/react`）
- **30+ Native 组件**（`heroui-native-pro`）
- **4 套生产级模板**（dashboard / chat / email / finances）
- **2 套 Figma Kit**（Web + Native）
- **3 个 Skill 包**（组件知识库 + 设计原则）

> ⚠️ 本项目通过**中转服务**使用（非直连官方），组件代码、API、设计令牌与官方完全一致。

### 1.2 共享技术栈（四个模板统一）

| 层级 | 技术 | 版本 | 职责 |
|------|------|------|------|
| 框架 | Next.js | 16.2.3 | App Router（强制） |
| UI | React | 19.2.5 | — |
| 类型 | TypeScript | 5.9.3 | — |
| 样式 | Tailwind CSS | 4.2.2 | 原子化样式 |
| 处理 | PostCSS | 8.5.9 | 样式管道 |
| Pro 组件 | `@heroui-pro/react` | latest | 高级组件（需 hpsetup） |
| 基础组件 | `@heroui/react` | 3.0.3 | 开源基础组件 |
| 样式令牌 | `@heroui/styles` | 3.0.3 | 主题变量 |
| 图标 | `@gravity-ui/icons` | 2.18.0 | 图标库 |
| 图表 | recharts | 3.8.0 | dashboard/finances 额外依赖 |

### 1.3 样式引入顺序（关键）

```css
@import "tailwindcss";
@import "@heroui/styles";
@import "@heroui-pro/react/css";   /* ← 必须最后 */
```

---

## 2. 组件全景清单

### 2.1 Web Pro 组件（55 个）

按功能分类，基于 `hp-components/` 目录（46 个示例目录 × N 变体）：

#### 数据可视化（7 个）

| 组件 | 复杂度 | 适用场景 | 核心 API |
|------|--------|---------|---------|
| `AreaChart` | ★★★☆☆ | 趋势图、时序数据 | `Grid`, `XAxis`, `YAxis`, `Area`, `Tooltip` |
| `BarChart` | ★★★☆☆ | 对比柱状图 | `Bar`, `XAxis`, `YAxis`, `Tooltip` |
| `LineChart` | ★★★☆☆ | 折线图 | `Line`, `XAxis`, `YAxis`, `Tooltip` |
| `PieChart` | ★★★☆☆ | 占比饼图 | `Pie`, `Cell`, `Tooltip` |
| `RadarChart` | ★★★☆☆ | 雷达图 | `Radar`, `PolarGrid`, `Tooltip` |
| `RadialChart` | ★★★☆☆ | 环形进度 | `Bar`, `Tooltip`, `innerRadius/outerRadius` |
| `ComposedChart` | ★★★★☆ | 混合图（柱+线+面积）| 组合多个图表类型 |

#### 数据表格与看板（3 个）

| 组件 | 复杂度 | 适用场景 | 核心 API |
|------|--------|---------|---------|
| `DataGrid` | ★★★★★ | 后台表格、数据管理 | `columns`, `cell` render prop, `sortFn` |
| `Kanban` | ★★★★☆ | 项目管理、任务看板 | `Column`, `CardList`, `Card`, `DragHandle` |
| `FileTree` | ★★★☆☆ | 文件树、PR 审查 | `Tree`, `TreeItem`, `DragHandle` |

#### 仪表盘 / KPI（2 个）

| 组件 | 复杂度 | 适用场景 | 核心 API |
|------|--------|---------|---------|
| `KPI` | ★★☆☆☆ | 指标卡片 | `Root`, `Header`, `Title`, `Value`, `Trend`, `Chart` |
| `Widget` | ★★★☆☆ | 仪表盘 Widget 组合 | `Header`, `Content`, `Footer` |

#### 媒体与轮播（1 个）

| 组件 | 复杂度 | 适用场景 | 核心 API |
|------|--------|---------|---------|
| `Carousel` | ★★★☆☆ | 图片轮播、卡片滑动 | `Content`, `Item`, `Previous`, `Next`, `Dots` |

#### 交互组件（3 个）

| 组件 | 复杂度 | 适用场景 | 核心 API |
|------|--------|---------|---------|
| `Rating` | ★★☆☆☆ | 评分、星级 | `Item`, `defaultValue`, `onChange` |
| `Stepper` | ★★★☆☆ | 步骤流程 | `Step`, `Indicator`, `Content`, `Title`, `Separator` |
| `Command` | ★★★★☆ | 命令面板、搜索 | `Input`, `List`, `Item`, `Group` |

#### 布局与容器（多个）

- `AppLayout` — 仪表盘整体布局（navbar + sidebar + navigate）
- `Sheet` — 底部抽屉、SnapPoints
- `Card`（开源 `@heroui/react`）— 基础卡片
- `Button`, `Modal`, `Chip`, `Avatar` 等 — 开源基础组件

### 2.2 React Native Pro 组件（30 个）

| 包名 | 说明 |
|------|------|
| `heroui-native-pro` | Native Pro 组件库 |
| `heroui-native` | 开源 Native 基础组件 |

样式系统用 `uniwind`（跨端 Tailwind 实现），非纯 Tailwind v4。

---

## 3. 四大模板架构参考

### 3.1 模板选型速查

| 模板 | 端口 | 场景 | Shell 复杂度 | 独有特性 |
|------|------|------|-------------|---------|
| `template-dashboard` | 3003 | 后台仪表盘 | 中 | `widgets/`, `recharts`, `AppShell` |
| `template-chat` | 3004 | AI 助手/聊天 | 中 | `ChatShell`, 搜索对话框, Cmd+K |
| `template-email` | 3005 | 邮件客户端 | 低 | `EmailShell`, 双层动态路由, 最简结构 |
| `template-finances` | 3006 | 财务/记账 | 高 | `widgets/`, `recharts`, 预览模式 |

### 3.2 三层职责边界（核心架构模式）

```
components/    → 全局基础设施层（AppShell/ChatShell/EmailShell, Navbar, Sidebar）
views/         → 页面组合层（组合 widgets 形成完整页面，不直接引用 Pro 组件）
widgets/       → Pro 组件消费层（直接引用 @heroui-pro/react，绑定 mock 数据）
```

**差异**：
- **email 无 views/widgets**：所有逻辑内聚在 `components/`，最简模板
- **chat 无 widgets**：业务组件直接放 `components/`，views 只做路由映射
- **dashboard/finances 有完整三层**：业务复杂度最高

### 3.3 AppLayout 三要素（布局心智模型）

```tsx
<AppLayout
  navbar={<DashboardNavbar title={title} />}
  navigate={navigate}           // 适配 Next.js router
  sidebar={<DashboardSidebar />}
  sidebarCollapsible="offcanvas"
>
  {children}
</AppLayout>
```

**关键设计**：
- `navbar` 接收动态标题（当前路由自动映射）
- `sidebar` 接收 `nav-items` + `pathname` 做 active 态
- `navigate` 包装 `router.push`，适配 Next.js App Router

### 3.4 NavItems 模式

```ts
// nav-items.ts
export const NAV_ITEMS = [
  { href: "/analytics", label: "Analytics", icon: "chart" },
  { href: "/orders", label: "Orders", icon: "cart" },
] as const;

export const FOOTER_ITEMS = [
  { href: "/settings", label: "Settings", icon: "gear" },
] as const;
```

使用 `@gravity-ui/icons`，通过 `Map` 构建 O(1) 路由标签查找。

### 3.5 预览模式（`disableNavigation`）

finances/chat/email 支持嵌入 iframe：
- `navigate` 变为 no-op
- 键盘快捷键禁用
- Sidebar 项不渲染 `href`

---

## 4. 已验证组件移植方案

### 4.1 验证状态（Phase-02 已完成）

以下 9 个组件已在 `demo-app` 中跑通，可直接参考移植：

| # | 组件 | 验证状态 | 复合 API | 生产就绪 |
|---|------|---------|---------|---------|
| 1 | `AreaChart` | ✅ | `Grid/XAxis/YAxis/Area/Tooltip` | ✅ |
| 2 | `KPI` | ✅ | `Root/Header/Title/Value/Trend/Chart` | ✅ |
| 3 | `DataGrid` | ✅ | 单一组件（columns 驱动） | ✅ |
| 4 | `Kanban` | ✅ | `Column/CardList/Card` | ⚠️ 拖拽需额外接入 |
| 5 | `PieChart` | ✅ | `Pie/Cell/Tooltip` | ✅ |
| 6 | `RadialChart` | ✅ | `Bar/Tooltip` | ✅ |
| 7 | `Carousel` | ✅ | `Content/Item/Previous/Next/Dots` | ✅ |
| 8 | `Rating` | ✅ | `Item` | ✅ |
| 9 | `Stepper` | ✅ | `Step/Indicator/Content/Title/Separator` | ✅ |

### 4.2 KPI 卡片移植代码

```tsx
"use client";

import {KPI} from "@heroui-pro/react";

export function KpiCard() {
  return (
    <KPI>
      <KPI.Header>
        <KPI.Title>Monthly Revenue</KPI.Title>
      </KPI.Header>
      <KPI.Content>
        <KPI.Value style="currency" currency="USD" value={84200} />
        <KPI.Trend trend="up">14%</KPI.Trend>
      </KPI.Content>
      <KPI.Chart
        color="var(--chart-3)"
        data={sparklineData}
        height={60}
        strokeWidth={1.5}
      />
    </KPI>
  );
}
```

**关键点**：
- `KPI.Value` 支持国际化数字格式：`style="currency" | "percent" | "decimal"`
- `KPI.Trend` 取值：`up` | `down` | `neutral`
- `KPI.Chart` 是迷你 sparkline，数据格式 `Array<{value: number}>`

### 4.3 DataGrid 移植代码

```tsx
"use client";

import {DataGrid, type DataGridColumn} from "@heroui-pro/react";

interface Employee {
  id: number;
  name: string;
  department: string;
  salary: number;
}

const columns: DataGridColumn<Employee>[] = [
  { id: "name", accessorKey: "name", header: "Name",
    cell: (item) => (
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary/20" />
        {item.name}
      </div>
    )},
  { id: "dept", accessorKey: "department", header: "Department",
    cell: (item) => <Badge>{item.department}</Badge> },
  { id: "salary", accessorKey: "salary", header: "Salary",
    cell: (item) => `$${item.salary.toLocaleString()}`,
    allowsSorting: true,
    sortFn: (a, b) => a.salary - b.salary },
];

export function EmployeeTable({data}: {data: Employee[]}) {
  return (
    <DataGrid
      aria-label="Employees"
      columns={columns}
      items={data}
      getRowId={(item) => item.id}
    />
  );
}
```

**关键约束**：
- 每列必须给 `id`（列标识）+ `accessorKey`（数据字段）
- `aria-label` 是 DataGrid 的必填属性
- `cell` 是最强大的扩展点，可完全自定义单元格
- 建议 >500 行时开启虚拟化（需确认版本支持）

### 4.4 AreaChart 移植代码

```tsx
"use client";

import {AreaChart, ChartTooltip} from "@heroui-pro/react";

const data = [
  {month: "Jan", revenue: 4200},
  {month: "Feb", revenue: 5800},
  // ...
];

export function RevenueChart() {
  return (
    <AreaChart data={data} height={200}>
      <defs>
        <linearGradient id="fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--chart-3)" stopOpacity={0.2} />
          <stop offset="100%" stopColor="var(--chart-3)" stopOpacity={0.02} />
        </linearGradient>
      </defs>
      <AreaChart.Grid vertical={false} />
      <AreaChart.XAxis dataKey="month" tickMargin={8} />
      <AreaChart.YAxis
        tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
        width={40}
      />
      <AreaChart.Area
        dataKey="revenue"
        fill="url(#fill)"
        stroke="var(--chart-3)"
        strokeWidth={2}
        type="monotone"
      />
      <AreaChart.Tooltip
        content={({active, label, payload}) => {
          if (!active || !payload?.length) return null;
          return (
            <ChartTooltip>
              <ChartTooltip.Header>{label}</ChartTooltip.Header>
              {payload.map((entry) => (
                <ChartTooltip.Item key={String(entry.dataKey)}>
                  <ChartTooltip.Indicator color={entry.color} />
                  <ChartTooltip.Label>{entry.name}</ChartTooltip.Label>
                  <ChartTooltip.Value>
                    ${Number(entry.value).toLocaleString()}
                  </ChartTooltip.Value>
                </ChartTooltip.Item>
              ))}
            </ChartTooltip>
          );
        }}
      />
    </AreaChart>
  );
}
```

**关键点**：
- `var(--chart-1)` 到 `var(--chart-5)` 是图表专用设计令牌
- `AreaChart.Tooltip` 接受 render prop，完全自定义气泡
- `tickFormatter` 统一格式化入口

### 4.5 Kanban 移植代码

```tsx
"use client";

import {Kanban} from "@heroui-pro/react";

interface Task {
  id: string;
  title: string;
  priority: "high" | "medium" | "low";
}

const columns = [
  {id: "todo", title: "To Do", tasks: [...]},
  {id: "doing", title: "In Progress", tasks: [...]},
];

export function TaskBoard() {
  return (
    <Kanban.Root>
      {columns.map((col) => (
        <Kanban.Column key={col.id}>
          <Kanban.ColumnHeader>
            <Kanban.ColumnTitle>{col.title}</Kanban.ColumnTitle>
            <Kanban.ColumnCount>{col.tasks.length}</Kanban.ColumnCount>
          </Kanban.ColumnHeader>
          <Kanban.CardList
            aria-label={`${col.title} tasks`}
            items={col.tasks}
          >
            {(task) => (
              <Kanban.Card id={task.id} textValue={task.title}>
                <div className="font-medium">{task.title}</div>
                <Badge>{task.priority}</Badge>
              </Kanban.Card>
            )}
          </Kanban.CardList>
        </Kanban.Column>
      ))}
    </Kanban.Root>
  );
}
```

**关键约束**：
- `Kanban.Card` 必须包在 `Kanban.CardList` 内（RAC GridListItem 要求）
- `CardList` 的 `items` + render prop 模式，不能直接用 `Array.map`
- `id` + `textValue` 是 Card 的必填属性
- 拖拽需额外接入 `useDragAndDrop()` hook

---

## 5. 高级组件生产接入方案（Phase-05）

### 5.1 选型小结

| 组件 | 复杂度 | 数据量上限 | 生产 checklist |
|------|--------|-----------|---------------|
| **DataGrid** | ★★★★★ | ~1000 行（无虚拟化）| 确认虚拟化需求；每列定义 `id` + `accessorKey` |
| **Kanban** | ★★★★☆ | ~100 卡片/列 | Card 必须通过 `CardList` render prop；加 `aria-label` |
| **图表（Bar/Area/Pie）** | ★★★☆☆ | 无上限（SVG）| `TooltipContent` 不支持 `formatter`；确认 `domain` 固定 |
| **ComposedChart** | ★★★★☆ | 无上限 | 多系列组合需分别声明 |

### 5.2 数据契约模板

```ts
// 通用图表数据点
interface ChartPoint {
  month: string;
  revenue: number;
  profit: number;
  expenses: number;
}

// DataGrid 行数据
interface DataRow {
  id: string | number;      // getRowId 用
  [key: string]: unknown;   // 其他字段
}

// Kanban 卡片数据
interface KanbanTask {
  id: string;               // Card 必填
  title: string;            // textValue 用
  status: string;           // 列映射
  priority?: string;
  assignee?: string;
}
```

---

## 6. 项目初始化与接入流程

### 6.1 新建项目（推荐路径）

```powershell
# 方案 A：一步到位（推荐）
npx -y degit rhywonfeong/hp-nextjs-app-template my-app

# 方案 B：HeroUI CLI 交互式
npx -y heroui-cli@latest init my-app
# → 选第 1 个 App Router（第 2 个是 Pages Router，新项目不推荐）
```

### 6.2 安装 Pro 依赖

```powershell
# 1. 设置环境变量
$env:HEROUI_KEY = "hp_xxxxxxxx"

# 2. 安装依赖
pnpm install

# 3. 运行 hpsetup（拉取真包）
npx -y hpsetup@latest

# 4. 验证真包就位
Test-Path 'node_modules/@heroui-pro/react/dist/index.js'
```

### 6.3 hpsetup 7 步流水线

1. 环境检测（包管理器 / monorepo / 平台）
2. 产品发现（扫 `node_modules` 已装版本）
3. 版本校验（npm registry，3s→6s→10s 递增重试）
4. 下载产物（CDN → 当前版本缓存 → 上一版本缓存 三层 fallback）
5. 信任配置（pnpm `allowBuilds` / bun `trustedDependencies`）
6. Peer 依赖补装
7. 收尾（patch `package.json` + 写 `vercel.json`，自动加入 gitignore）

### 6.4 包管理器差异

| PM | 注意点 |
|----|--------|
| pnpm workspace | 写 `pnpm-workspace.yaml` 的 `allowBuilds` |
| pnpm 单包 | 写 `package.json` 的 `pnpm.onlyBuiltDependencies` |
| bun | 写 `package.json` 的 `trustedDependencies` |
| npm | 自动附 `--legacy-peer-deps` |
| yarn | **仅支持 Classic**，Berry PnP 需加 `nodeLinker: node-modules` |

### 6.5 真包就位自检

```powershell
# Web（beta.4+ 入口在 dist/）
Test-Path 'node_modules/@heroui-pro/react/dist/index.js'
# 或检查目录大小（stub ~13 KB / 真包 ~2.5 MB）
(Get-Item 'node_modules/@heroui-pro/react/dist/index.js').Length -gt 1MB

# Native
Test-Path 'node_modules/heroui-native-pro/index.js'
```

---

## 7. 框架兼容性注意

### 7.1 Vite 项目

```ts
// vite.config.ts
export default {
  resolve: {
    dedupe: ["react", "react-dom", "react/jsx-runtime"],
  },
  optimizeDeps: {
    include: ["react", "react/jsx-runtime", "@heroui-pro/react"],
  },
};
```

否则 `@heroui-pro/react` 报 `React is null`。

### 7.2 不混用 shadcn

HeroUI 主题变量与 shadcn 冲突，若已用 shadcn 须先移除其主题配置。

### 7.3 Next.js Pages Router

仅兼容老项目，新项目必须用 App Router。

### 7.4 Monorepo

`hpsetup` 在**仓库根目录**运行即自动检测所有 workspace，**禁止逐 workspace 单独执行**。

---

## 8. 踩坑记录汇总

| 时间 | 组件 | 现象 | 根因 | 处理 |
|------|------|------|------|------|
| 2026-05-24 | Carousel | CDN 图片跨域/慢 | 示例用国外 CDN | 换 `bg-gradient-to-br` 渐变块 |
| 2026-05-27 | DataGrid | TS 报错 `Property 'id' is missing` | `id` 是必填字段 | 每列补充 `id` |
| 2026-05-27 | Kanban | `GridListItem cannot be rendered outside collection` | Card 必须在 CardList 内 | 用 CardList render prop |
| 2026-05-27 | AreaChart | `TooltipContent` 不支持 `formatter` | Pro 封装层与 Recharts 不完全一致 | 去掉 `formatter`，用默认 |
| 持续 | 真包判断 | `index.js` 存在但包未替换 | beta.4+ 入口在 `dist/` | 判断 `dist/index.js` 或目录大小 |

---

## 9. 移植到现有项目的步骤

### 9.1 评估清单

- [ ] 项目使用 React 18+（推荐 19）
- [ ] 项目使用 Tailwind CSS v4（必须）
- [ ] 不混用 shadcn/ui
- [ ] 有 `HEROUI_KEY` 环境变量
- [ ] 包管理器不是 Yarn Berry PnP

### 9.2 移植步骤

```bash
# 1. 安装依赖
pnpm add @heroui-pro/react @heroui/react @heroui/styles

# 2. 运行 hpsetup
$env:HEROUI_KEY = "hp_xxx"
npx -y hpsetup@latest

# 3. 更新 globals.css（末尾添加）
@import "@heroui-pro/react/css";

# 4. 验证
pnpm dev
```

### 9.3 组件迁移优先级

**第一梯队（立即可用，ROI 最高）**：
1. `KPI` — 替换手搓指标卡片，一行搞定格式+趋势+sparkline
2. `AreaChart/BarChart` — 替换 Recharts 手搓代码，统一主题色
3. `DataGrid` — 替换 react-table/TanStack，TypeScript 推断完美

**第二梯队（需评估）**：
4. `Kanban` — 如已有看板需求，拖拽需额外接入
5. `Carousel` — 如已有轮播，embla 底层可靠
6. `Rating/Stepper` — 表单场景适用

**第三梯队（高级场景）**：
7. `ComposedChart` — 复杂混合图表
8. `Command` — 命令面板/DevTools
9. `FileTree` — 文件树/PR 审查

---

## 10. 凭证与安全

### 10.1 三套凭证体系

| 凭证 | 格式 | 用途 | 注入方式 |
|------|------|------|---------|
| `HEROUI_KEY` | `hp_` + 48 hex | `hpsetup` 拉包 | 环境变量 / 位置参数 |
| `HEROUI_TOKEN` | UUID | `hpmcp` + Skills | CLI args / JSON 占位 |
| GitHub JWT | — | 上游 postinstall（自动）| 自动收集 |

### 10.2 绝对禁止

- ❌ KEY / TOKEN 写入任何源码、配置、commit、文档正文
- ❌ EAS Build 的 `package.json` preinstall 写明文 `hp_xxx`
- ❌ `claude mcp add` 命令行直接写明文 Token
- ❌ `--no-cache` 重试循环（每日 1 次上限触发 429）

---

## 11. 资源索引

| 资源 | 路径 | 说明 |
|------|------|------|
| 模板源码 | `D:\code\hero-ui-v3\templates\template-*/` | 可直接复制到新项目 |
| 组件示例 | `D:\code\hero-ui-v3\hp-components\` | 46 组件 × N 变体 .tsx 片段 |
| 设计稿 | `D:\code\hero-ui-v3\figma kit\` | Web + Native 两套 .fig |
| Phase 记录 | `D:\code\hero-ui-v3\Explorer\phase-*/README.md` | 目标/步骤/踩坑 |
| 文档镜像 | `D:\code\hero-ui-v3\Docs\` | 中转站文档 + 批注 |
| 在线文档 | `https://collectui.youquxing.com/docs` | 中转站最新文档 |

---

> **总结**：开源 HeroUI 给你乐高积木，Pro 直接给你拼好的城堡。Pro 的组件 API 设计比手搓更省事 80%，但要求理解 RAC 的 composition pattern。本项目已验证 9 个核心组件，4 套模板可直接复制作为新项目骨架。
