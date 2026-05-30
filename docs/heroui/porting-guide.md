---
title: "HeroUI Pro v3 移植指南"
type: reference
status: active
version: "@heroui-pro/react@1.0.0-beta.4 / @heroui/react@3.0.3 / Tailwind v4"
source_files:
  - reports/raw/heroui/porting-guide-and-pitfalls.md
updated: 2026-05-30
owner: threetwoa
---

# HeroUI Pro v3 移植指南

> 基于 phase-01~07 实测记录提炼，长期参考用。

---

## 环境准备

### 硬性要求

| 项 | 最低 | 推荐 | 备注 |
|---|---|---|---|
| Node.js | 18+ | **24.x** | phase-01 实测 v24.14.0 |
| pnpm | 9+ | **10.33.0** | 项目统一 pnpm |
| React | 18+ | **19.2.5** | |
| Tailwind CSS | 4+ | **4.2.2** | v3 不兼容 |
| TypeScript | 5+ | **5.9.3** | |

### 凭证（不入仓）

| 凭证 | 格式 | 用途 |
|---|---|---|
| HP Key | `hp_` 开头 | hpsetup 拉取 Pro 包 |
| Personal Token | UUID 格式 | MCP / Skills 认证 |

> 两者不同体系，不可混用。

### 网络

需可访问：`collectui.youquxing.com`（文档）· `registry.npmjs.org`（npm）· `hpsetup-cdn.932324.xyz`（Pro CDN）· `hp-skills.932324.xyz`（Skills）

### 包管理器

| 包管理器 | 状态 | 注意 |
|---|---|---|
| **pnpm** | 推荐 | phase-01~05 全量验证 |
| npm | 支持 | 自动附加 `--legacy-peer-deps` |
| yarn | 仅 Classic | **不支持 Berry PnP** |
| bun | 支持 | 自动加 `trustedDependencies` |

---

## 项目初始化（3 种路径）

### A：heroui-cli 初始化（推荐新项目）

```powershell
npx -y heroui-cli@latest init my-app -t app -p pnpm
cd my-app; pnpm install
pnpm dev   # 验证基线后 Ctrl+C 停止
git init; git add .; git commit -m "init: heroui project"
```

> CLI 选项：1=App Router（推荐）· 2=Pages Router · 3=Vite

### B：degit 克隆模板（最快）

```powershell
npx -y degit rhywonfeong/hp-nextjs-app-template my-hp-app
cd my-hp-app; pnpm install
```

### C：现有项目接入

```powershell
pnpm add @heroui-pro/react
```

```css
/* globals.css 末尾追加 — 顺序铁律 */
@import "tailwindcss";
@import "@heroui/styles";
@import "@heroui-pro/react/css";   /* <- 必须最后 */
```

---

## hpsetup 认证详解

### 机制一句话

hpsetup 用 HP Key 从 CDN 下载 Pro 组件 tarball → 解压到 `node_modules` 已有 stub 包 → 补齐 peer 依赖和信任配置。

### 7 阶段流水线

```
环境检测 → 产品发现 → 版本校验 → 下载产物 → 信任配置 → Peer 依赖 → 收尾
  (包管理器/monorepo/平台)  (扫描node_modules)  (npm查最新)  (CDN→缓存fallback)  (pnpm allowBuilds等)  (扫描缺失→交互确认)  (patch package.json/Vercel配置)
```

### 用法

```powershell
# 推荐：环境变量注入（避免 Key 进 shell history）
$env:HEROUI_KEY = "hp_xxxxxxxx"
npx -y hpsetup@latest

# 直接传参
npx -y hpsetup@latest hp_xxxxxxxx

# 指定产品
npx -y hpsetup@latest hp_xxxxxxxx react      # Web
npx -y hpsetup@latest hp_xxxxxxxx native     # Native
```

### 自动模式触发条件（满足任一）

`CI=true` · `--auto` flag · `HEROUI_KEY` 已设置

### 常用选项

| 选项 | 作用 |
|---|---|
| `--auto` | 跳过交互，自动检测安装 |
| `--dry-run` | 只显示操作，不做更改 |
| `--no-cache` | 绕过缓存强制拉取（**每日限 1 次**） |

### 下载容错（三层 fallback）

```
CDN 下载 → 当前版本缓存 → 上一版本缓存 → 退出报错
```

### 缓存结构

```
~/.heroui/cache/
├── react/1.0.0-beta.4/
└── react-native/1.0.0-beta.4/
```

### 真包自检

```powershell
Test-Path 'node_modules/@heroui-pro/react/dist/index.js'
# stub ~13 KB，真包 ~2.47 MB
```

> `index.js`（根目录）可能假阴，判断 `dist/index.js` 或目录大小更可靠。

### CI/CD 集成

**GitHub Actions：**
```yaml
- run: npx -y hpsetup@latest
  env:
    HEROUI_KEY: ${{ secrets.HEROUI_KEY }}
```

**Vercel：** Build Settings → Install Command 填 `npx -y hpsetup@latest`；添加环境变量 `HEROUI_KEY`；hpsetup 自动写 `vercel.json` 并加入 `.gitignore`。

---

## 组件接入

### 通用模式

```tsx
"use client";

import { Card } from "@heroui/react";                    // 开源
import { AreaChart, ChartTooltip } from "@heroui-pro/react";  // Pro

export default function MyWidget() {
  return (
    <Card>
      <AreaChart data={data} height={200}>
        <AreaChart.Grid />
        <AreaChart.XAxis dataKey="month" />
        <AreaChart.YAxis />
        <AreaChart.Area dataKey="revenue" />
        <AreaChart.Tooltip content={...} />
      </AreaChart>
    </Card>
  );
}
```

### 复合 API（dot-notation）

| 组件 | 子组件 |
|---|---|
| `AreaChart` | Grid, XAxis, YAxis, Area, Tooltip |
| `KPI` | Root, Header, Title, Value, Trend, Content, Icon, Chart, Progress, Footer, Actions, Separator |
| `Kanban` | Root, Column, ColumnHeader, ColumnTitle, ColumnCount, ColumnBody, CardList, Card, DragHandle, DropIndicator, ScrollShadow |
| `ChartTooltip` | Header, Item, Indicator, Label, Value |
| `PieChart` | Pie, Cell, Tooltip |
| `RadialChart` | Bar, Tooltip |
| `Carousel` | Content, Item, Previous, Next, Dots, Thumbnails, Thumbnail |
| `Rating` | Item |
| `Stepper` | Step, Indicator, Content, Title, Separator |

> **例外**：`DataGrid` 是单一组件，通过 `columns` 配置数组驱动。

### 样式引入顺序

```css
@import "tailwindcss";
@import "@heroui/styles";
@import "@heroui-pro/react/css";   /* <- 必须最后，在 @custom-variant 之后 */
```

### 设计 Token

- `var(--chart-1)` ~ `var(--chart-5)`：图表系列色值
- `var(--text-foreground)` / `var(--bg-background)`：与开源版共享

---

## 框架兼容性矩阵

| 框架 | 版本 | 状态 | 特殊配置 |
|---|---|---|---|
| **Next.js App Router** | 16.2.3 | 推荐 | 无 |
| Next.js Pages Router | 16.x | 兼容 | 不推荐新项目 |
| React + Vite | 19.x | 支持 | 需 `optimizeDeps.include` |
| Expo (RN) | SDK 55 | 支持 | 需 `uniwind` + `heroui-native-pro/styles` |

**Vite 必配：**
```ts
// vite.config.ts
optimizeDeps: { include: ["react", "react/jsx-runtime", "@heroui-pro/react"] }
```

**Monorepo：** hpsetup 自动识别 workspace；**铁律**：根目录运行，禁止逐 workspace 单独执行；React Pro 只装 Web workspace，Native Pro 只装 Native workspace。

---

## 14 条踩坑记录

### #1：Key 字符混淆 → `Invalid or inactive key`

- **现象**：hpsetup 报 `Invalid or inactive key`
- **根因**：Key 中 `l`/`1`、`0`/`O` 混淆
- **处理**：从官网重拷 Key，确认字符
- **教训**：HP Key 仅含十六进制（0-9, a-f），验证失败先查易混淆字符

### #2：版本写 `latest` → `Invalid comparator: latest`

- **现象**：`npx hpsetup@latest` 报 `Invalid comparator: latest`
- **根因**：package.json 中 Pro 包版本为 `"latest"`，hpsetup v4.5.6 不解析 npm tag
- **处理**：改为具体版本号如 `"1.0.0-beta.4"`
- **教训**：跑 hpsetup 前必须确认 package.json 中 Pro 包版本是具体号

### #3：端口占用 `EADDRINUSE`

- **现象**：`pnpm dev` 报 `address already in use :::3003`
- **根因**：之前 session 的 dev server 进程仍在
- **处理**：`Get-NetTCPConnection -LocalPort 3003` 检查并结束进程
- **教训**：跨 session 启动 dev server 注意端口占用

### #4：MCP 注册写入明文 Token

- **现象**：`~/.claude.json` 中出现 UUID 明文
- **根因**：CLI 命令自动展开 `$env:HEROUI_TOKEN`
- **处理**：手动替换为 `"${env:HEROUI_TOKEN}"`
- **教训**：注册后必须检查配置文件，确认无明文

### #5：MCP `list_components` 返回 remote unavailable

- **现象**：initialize 成功但 `list_components` 返回 "remote unavailable, no cache"
- **根因**：CDN 缓存未命中或网络波动
- **处理**：清 `~/.hpmcp/cache` 后重拉，或等网络恢复
- **教训**：连接成功 ≠ 工具调用成功，需逐个验证

### #6：`DataGridColumn` 缺 `id` 属性

- **现象**：TS 报错 `Property 'id' is missing in type 'DataGridColumn<Employee>'`
- **根因**：`id` 是必填，不是 `key` 也不是 `accessorKey`
- **处理**：每列补充 `id: "xxx"`
- **教训**：列定义需 `id`（列标识）+ `accessorKey`（数据字段），两者职责不同

### #7：`Kanban.Card` 渲染报 "outside a collection"

- **现象**：`GridListItem cannot be rendered outside a collection`
- **根因**：`Kanban.Card` 底层是 RAC `GridListItem`，必须在 `CardList` 内
- **处理**：用 `Kanban.CardList items={...}>{(task) => <Kanban.Card>...</Kanban.Card>}</Kanban.CardList>`
- **教训**：不能 `Array.map` 直接渲染 Kanban.Card，必须通过 CardList render prop

### #8：`AreaChart.TooltipContent` 不支持 `formatter`

- **现象**：TS 报错 `Property 'formatter' does not exist`
- **根因**：Pro 的 TooltipContent 与 Recharts API 非 1:1 映射
- **处理**：去掉 `formatter`，用默认格式化或自定义 `content` render prop
- **教训**：Pro 图表是 Recharts 封装层，不是 1:1 API

### #9：Carousel CDN 图片源跨域/慢

- **现象**：示例用 `nextuipro.nyc3.cdn.digitaloceanspaces.com`，国内慢或拒绝
- **处理**：换成 CSS `bg-gradient-to-br` 渐变块 + 文字 label
- **教训**：demo 数据默认走本地 mock，外网资源仅作可选 enhance

### #10：pnpm + Vite JSX 报 `does not provide an export named 'jsx'`

- **现象**：Vite 项目报 JSX 导出找不到
- **根因**：pnpm 严格依赖隔离，`react/jsx-runtime` 解析到 Pro 包自带副本
- **处理**：`vite.config.ts` 加 `optimizeDeps.include`
- **教训**：Vite + pnpm + Pro 组合必须配 `optimizeDeps`

### #11：HTTP MCP 已下线（2026-05-24）

- **现象**：旧配置中 `x-heroui-personal-token` header 失效
- **根因**：HTTP 传输 MCP 已下线，仅保留 stdio
- **处理**：删除所有 HTTP MCP 配置，改用 `hpmcp` stdio 方式
- **教训**：关注官方变更公告，及时迁移 MCP 配置

### #12：`--no-cache` 限频 429

- **现象**：一天内多次 `--no-cache` 后返回 429
- **根因**：该选项每日最多 1 次
- **处理**：等 24h 或用本地缓存
- **教训**：`--no-cache` 不可在重试循环中使用

### #13：Yarn Berry PnP 不支持

- **现象**：Yarn PnP 模式下 hpsetup 无法工作
- **根因**：hpsetup 依赖 `node_modules` 物理路径
- **处理**：切换 `node-modules` linker 或改用 pnpm

### #14：Marker 验证选词错误

- **现象**：验证脚本把 "Energy" 当命中标记，实际页面用中文"活动概览"
- **根因**：关键字未从源码字面取
- **处理**：选页面真实文本（中文标题或数据字段）
- **教训**：自动化验证关键字从源码字面取，不主观造英文词

---

## 生产接入 Checklist

### 环境 & 凭证

- [ ] Node.js 18+（推荐 24.x）
- [ ] pnpm 已安装（推荐 10.x）
- [ ] HP Key 有效（`hp_` 开头）
- [ ] Personal Token 已获取（UUID 格式）
- [ ] 网络可访问 CDN 和 npm registry
- [ ] `.gitignore` 排除 `vercel.json` 和凭证文件

### 项目初始化

- [ ] 项目已创建（cli / degit / 现有项目）
- [ ] `pnpm install` 无报错
- [ ] `pnpm dev` 基线页面正常
- [ ] Git 初始提交完成
- [ ] `globals.css` 已引入 `@import "@heroui-pro/react/css"`（在末尾）

### hpsetup 认证

- [ ] `HEROUI_KEY` 环境变量已设置
- [ ] `npx -y hpsetup@latest` 成功执行
- [ ] `node_modules/@heroui-pro/react/dist/index.js` 存在（真包确认）
- [ ] `~/.heroui/cache/react/<version>/` 缓存已生成
- [ ] 同版本二次运行显示 `already on the latest version`

### 组件接入

- [ ] 至少 1 个 Pro 组件成功渲染（建议从 AreaChart 开始）
- [ ] 复合 API dot-notation 使用正确
- [ ] `aria-label` 已加（DataGrid / Kanban 必填）
- [ ] 设计 token（`var(--chart-N)`）生效
- [ ] 控制台无 React/CSS warning

### MCP & Skills

- [ ] `hpmcp` 已注册
- [ ] `~/.claude.json` 中无明文 Token（用 `${env:HEROUI_TOKEN}`）
- [ ] `list_components` / `get_component_docs` 调用正常
- [ ] 3 个 Skills 已安装
- [ ] HTTP MCP 配置已删除（如之前有）

### CI/CD

- [ ] GitHub Actions 中 `HEROUI_KEY` 用 Secrets
- [ ] Vercel Install Command 配了 `npx -y hpsetup@latest`
- [ ] Vercel 环境变量含 `HEROUI_KEY`
- [ ] Monorepo 在根目录运行 hpsetup

### 性能 & 安全

- [ ] DataGrid >500 行时评估虚拟化
- [ ] mock 数据层结构清晰，接真实 API 只需替换导出
- [ ] 无 `hp_xxx` 明文在代码文件中
- [ ] 无 `HEROUI_KEY` / `HEROUI_TOKEN` 明文在 config 文件中
- [ ] `pnpm approve-builds` 已处理（如遇 `ERR_PNPM_IGNORED_BUILDS`）

### 高级组件

- [ ] DataGrid 列定义有 `id` + `accessorKey`
- [ ] DataGrid `cell` render prop 覆盖自定义需求
- [ ] Kanban Card 通过 `CardList` render prop 渲染
- [ ] Kanban `CardList` 加了 `aria-label`
- [ ] 图表 TooltipContent prop 与 Recharts 不同
- [ ] 图表 `tickFormatter` + `domain` 已按需配置

---

## 性能与优化

### DataGrid

| 数据量 | 建议 |
|---|---|
| < 100 行 | 无虚拟化 |
| 100~500 行 | 观察首屏，<200ms 可接受 |
| > 500 行 | 评估虚拟化 |

- 1000 行无虚拟化实测：首屏 ~200ms，排序 <50ms（dev）
- `cell` render prop 可覆盖 90% 自定义需求

### 缓存

- hpsetup 缓存：`~/.heroui/cache/`，同版本秒级恢复
- MCP 缓存：`~/.hpmcp/cache/`，TTL 1800s
- 清理：`Remove-Item -Recurse -Force ~/.hpmcp/cache`

### 构建

- Vite 项目务必配 `optimizeDeps.include`
- pnpm 遇 `ERR_PNPM_IGNORED_BUILDS` 用 `pnpm approve-builds`
- `--no-cache` 仅排查用，每日限 1 次

### 包大小

| 包 | 大小 |
|---|---|
| stub 包 | ~13 KB |
| 真包 | ~2.47 MB |
| 首次 CDN 下载（压缩） | ~405 KB / ~7s |

### 开发体验

- **Skills + MCP 互补**：Skills 给上下文知识，MCP 查具体 API 参数
- **模板选择**：后台管理首选 `template-dashboard`（组件最全）
- **Figma 还原**：先建 Code → Component 对照表，再逐区域实现

---

## Phase 目标速查

| Phase | 目标 | 关键产出 |
|---|---|---|
| 01 | 环境 + 认证 | hpsetup 跑通、真包落地、缓存确认 |
| 02 | Pro 组件试用 | 9 类组件渲染、复合 API 熟悉 |
| 03 | 模板跑通 | 4 个模板全启动、选出最佳业务起点 |
| 04 | MCP + Skills | hpmcp 注册、3 个 Skills 安装 |
| 05 | 高级组件 | DataGrid/Kanban/ComposedChart 深度试用 |
| 06 | React Native | Expo + Native Pro + EAS Build |
| 07 | Figma 还原 | 设计稿 → 代码闭环 |

---

## Source Material

- `reports/raw/heroui/porting-guide-and-pitfalls.md`