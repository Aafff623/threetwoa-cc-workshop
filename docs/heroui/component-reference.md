---
title: "HeroUI Pro v3 组件参考"
type: reference
status: active
version: "@heroui-pro/react@1.0.0-beta.4 / @heroui/react@3.0.3"
source_files:
  - archive/2026-05-30/heroui-pro-v3-component-reference-and-porting-guide.md
updated: 2026-05-30
owner: threetwoa
---

# HeroUI Pro v3 — 组件参考

> 移植流程请看 [[porting-guide]]，本文只涵盖组件 API、数据契约和选型建议。

---

## 1. 项目概览

**HeroUI Pro v3** = 55+ Web 组件 + 30+ Native 组件 + 4 套模板 + 2 套 Figma Kit + 3 个 Skill 包。

| 层级 | 技术 | 版本 | 职责 |
|------|------|------|------|
| 框架 | Next.js | 16.2.3 | App Router（强制） |
| UI | React | 19.2.5 | — |
| 样式 | Tailwind CSS | 4.2.2 | 原子化样式 |
| Pro 组件 | `@heroui-pro/react` | latest | 高级组件（需 `hpsetup`） |
| 基础组件 | `@heroui/react` | 3.0.3 | 开源基础组件 |
| 图标 | `@gravity-ui/icons` | 2.18.0 | 图标库 |
| 图表 | recharts | 3.8.0 | dashboard/finances 依赖 |

**样式引入顺序（铁律）**：

```css
@import "tailwindcss";
@import "@heroui/styles";
@import "@heroui-pro/react/css";   /* ← 必须最后 */
```

---

## 2. 组件全景清单

### 2.1 数据可视化（7 个）

| 组件 | 复杂度 | 适用场景 | 核心 API |
|------|--------|---------|---------|
| `AreaChart` | ★★★☆☆ | 趋势图、时序数据 | `Grid`, `XAxis`, `YAxis`, `Area`, `Tooltip` |
| `BarChart` | ★★★☆☆ | 对比柱状图 | `Bar`, `XAxis`, `YAxis`, `Tooltip` |
| `LineChart` | ★★★☆☆ | 折线图 | `Line`, `XAxis`, `YAxis`, `Tooltip` |
| `PieChart` | ★★★☆☆ | 占比饼图 | `Pie`, `Cell`, `Tooltip` |
| `RadarChart` | ★★★☆☆ | 雷达图 | `Radar`, `PolarGrid`, `Tooltip` |
| `RadialChart` | ★★★☆☆ | 环形进度 | `Bar`, `Tooltip`, `innerRadius/outerRadius` |
| `ComposedChart` | ★★★★☆ | 混合图（柱+线+面积） | 组合多个图表类型 |

### 2.2 数据表格与看板（3 个）

| 组件 | 复杂度 | 适用场景 | 核心 API |
|------|--------|---------|---------|
| `DataGrid` | ★★★★★ | 后台表格、数据管理 | `columns`, `cell` render prop, `sortFn` |
| `Kanban` | ★★★★☆ | 项目管理、任务看板 | `Column`, `CardList`, `Card`, `DragHandle` |
| `FileTree` | ★★★☆☆ | 文件树、PR 审查 | `Tree`, `TreeItem`, `DragHandle` |

### 2.3 仪表盘 / KPI（2 个）

| 组件 | 复杂度 | 适用场景 | 核心 API |
|------|--------|---------|---------|
| `KPI` | ★★☆☆☆ | 指标卡片 | `Root`, `Header`, `Title`, `Value`, `Trend`, `Chart` |
| `Widget` | ★★★☆☆ | 仪表盘 Widget 组合 | `Header`, `Content`, `Footer` |

### 2.4 媒体与轮播（1 个）

| 组件 | 复杂度 | 适用场景 | 核心 API |
|------|--------|---------|---------|
| `Carousel` | ★★★☆☆ | 图片轮播、卡片滑动 | `Content`, `Item`, `Previous`, `Next`, `Dots` |

### 2.5 交互组件（3 个）

| 组件 | 复杂度 | 适用场景 | 核心 API |
|------|--------|---------|---------|
| `Rating` | ★★☆☆☆ | 评分、星级 | `Item`, `defaultValue`, `onChange` |
| `Stepper` | ★★★☆☆ | 步骤流程 | `Step`, `Indicator`, `Content`, `Title`, `Separator` |
| `Command` | ★★★★☆ | 命令面板、搜索 | `Input`, `List`, `Item`, `Group` |

### 2.6 布局与容器

- `AppLayout` — 仪表盘整体布局（navbar + sidebar + navigate）
- `Sheet` — 底部抽屉、SnapPoints
- `Card`、`Button`、`Modal`、`Chip`、`Avatar` — 开源基础组件

### 2.7 Native Pro 组件（30 个）

包名：`heroui-native-pro`（样式系统用 `uniwind`，非纯 Tailwind v4）。

---

## 3. 已验证组件与代码示例

以下 9 个组件已在 `demo-app` 中跑通：

| # | 组件 | 验证 | 生产就绪 |
|---|------|------|---------|
| 1 | `AreaChart` | ✅ | ✅ |
| 2 | `KPI` | ✅ | ✅ |
| 3 | `DataGrid` | ✅ | ✅ |
| 4 | `Kanban` | ✅ | ⚠️ 拖拽需额外接入 |
| 5 | `PieChart` | ✅ | ✅ |
| 6 | `RadialChart` | ✅ | ✅ |
| 7 | `Carousel` | ✅ | ✅ |
| 8 | `Rating` | ✅ | ✅ |
| 9 | `Stepper` | ✅ | ✅ |

### 3.1 KPI 卡片

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

- `KPI.Value` 支持国际化：`style="currency" | "percent" | "decimal"`
- `KPI.Trend` 取值：`up` | `down` | `neutral`
- `KPI.Chart` 是迷你 sparkline，数据格式 `Array<{value: number}>`

### 3.2 DataGrid

```tsx
"use client";
import {DataGrid, type DataGridColumn} from "@heroui-pro/react";

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

- 每列必须给 `id`（列标识）+ `accessorKey`（数据字段）
- `aria-label` 必填
- `cell` render prop 是最强大扩展点
- >500 行建议开启虚拟化

### 3.3 AreaChart

```tsx
"use client";
import {AreaChart, ChartTooltip} from "@heroui-pro/react";

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
      <AreaChart.Tooltip content={CustomTooltip} />
    </AreaChart>
  );
}
```

- 图表专用设计令牌：`var(--chart-1)` ~ `var(--chart-5)`
- `AreaChart.Tooltip` 接受 render prop，完全自定义气泡
- ⚠️ `TooltipContent` 不支持 `formatter` prop（与 Recharts 差异）

### 3.4 Kanban

```tsx
"use client";
import {Kanban} from "@heroui-pro/react";

export function TaskBoard() {
  return (
    <Kanban.Root>
      {columns.map((col) => (
        <Kanban.Column key={col.id}>
          <Kanban.ColumnHeader>
            <Kanban.ColumnTitle>{col.title}</Kanban.ColumnTitle>
            <Kanban.ColumnCount>{col.tasks.length}</Kanban.ColumnCount>
          </Kanban.ColumnHeader>
          <Kanban.CardList aria-label={`${col.title} tasks`} items={col.tasks}>
            {(task) => (
              <Kanban.Card id={task.id} textValue={task.title}>
                <div className="font-medium">{task.title}</div>
              </Kanban.Card>
            )}
          </Kanban.CardList>
        </Kanban.Column>
      ))}
    </Kanban.Root>
  );
}
```

- `Kanban.Card` 必须包在 `Kanban.CardList` 内（RAC GridListItem 要求）
- `CardList` 用 `items` + render prop，不能用 `Array.map`
- `id` + `textValue` 是 Card 必填属性
- 拖拽需额外接入 `useDragAndDrop()` hook

---

## 4. 数据契约模板

```ts
interface ChartPoint {
  month: string;
  revenue: number;
  profit: number;
  expenses: number;
}

interface DataRow {
  id: string | number;      // getRowId 用
  [key: string]: unknown;   // 其他字段
}

interface KanbanTask {
  id: string;               // Card 必填
  title: string;            // textValue 用
  status: string;           // 列映射
  priority?: string;
  assignee?: string;
}
```

---

## 5. 组件选型优先级

**第一梯队（立即可用，ROI 最高）**：
1. `KPI` — 替换手搓指标卡片
2. `AreaChart / BarChart` — 替换 Recharts 手搓代码，统一主题色
3. `DataGrid` — 替换 react-table/TanStack

**第二梯队（需评估）**：
4. `Kanban` — 拖拽需额外接入
5. `Carousel` — embla 底层可靠
6. `Rating / Stepper` — 表单场景

**第三梯队（高级场景）**：
7. `ComposedChart` — 复杂混合图表
8. `Command` — 命令面板/DevTools
9. `FileTree` — 文件树/PR 审查

---

## 6. 踩坑速查

| 组件 | 现象 | 根因 | 处理 |
|------|------|------|------|
| Carousel | CDN 图片跨域/慢 | 示例用国外 CDN | 换 `bg-gradient-to-br` 渐变块 |
| DataGrid | TS 报错 `Property 'id' is missing` | `id` 是必填字段 | 每列补充 `id` |
| Kanban | `GridListItem cannot be rendered outside collection` | Card 必须在 CardList 内 | 用 CardList render prop |
| AreaChart | `TooltipContent` 不支持 `formatter` | Pro 封装层与 Recharts 不完全一致 | 去掉 `formatter`，用默认 |
| 真包判断 | `index.js` 存在但包未替换 | beta.4+ 入口在 `dist/` | 判断 `dist/index.js` 或目录大小 |

---

## Source Material

- `archive/2026-05-30/heroui-pro-v3-component-reference-and-porting-guide.md` — 完整原始报告（620 行），含移植流程、hpsetup、框架兼容等，另见 [[porting-guide]]