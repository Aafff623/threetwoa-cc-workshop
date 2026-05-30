# HeroUI Pro v3 移植方案与踩坑指南

> 来源：基于 `D:\code\hero-ui-v3\Explorer\phase-01~07` 实测记录 + `Docs/` 技术文档整理
> 适用版本：`@heroui-pro/react@1.0.0-beta.4` / `@heroui/react@3.0.3` / Tailwind CSS v4
> 整理时间：2026-05-29

---

## 1. 环境准备

### 1.1 硬性要求

| 项 | 最低版本 | 推荐版本 | 备注 |
|---|---|---|---|
| Node.js | 18+ | **24.x** | phase-01 实测 v24.14.0 |
| pnpm | 9+ | **10.33.0** | 本项目统一使用 pnpm |
| React | 18+ | **19.2.5** | 模板基线 |
| Tailwind CSS | 4+ | **4.2.2** | v3 不兼容 |
| TypeScript | 5+ | **5.9.3** | |

### 1.2 凭证准备（不入仓）

- **HP Key**：以 `hp_` 开头，用于 `hpsetup` 拉取 Pro 包
- **Personal Token**：UUID 格式，用于 MCP / Skills 认证
- 两者**不同体系**，不可混用

### 1.3 网络要求

需可访问：
- `collectui.youquxing.com`（文档/管理后台）
- `registry.npmjs.org`（npm 包）
- `hpsetup-cdn.932324.xyz`（Pro 包 CDN 分发）
- `hp-skills.932324.xyz`（Skills 安装）

### 1.4 包管理器选择

| 包管理器 | 支持状态 | 注意事项 |
|---|---|---|
| **pnpm** | 推荐 | 测试场景最多，phase-01~05 全量验证 |
| npm | 支持 | 自动附加 `--legacy-peer-deps` |
| yarn | 仅 Classic | **不支持 Yarn Berry PnP** |
| bun | 支持 | 自动加 `trustedDependencies` |

---

## 2. 项目初始化（3 种路径）

### 路径 A：heroui-cli 初始化（推荐新项目）

```powershell
# 1. 创建项目
npx -y heroui-cli@latest init my-app -t app -p pnpm

# 2. 安装依赖
cd my-app
pnpm install

# 3. 验证基线
pnpm dev        # 确认页面正常后 Ctrl+C 停止

# 4. 初始化 Git（可选但推荐）
git init; git add .; git commit -m "init: heroui project"
```

> CLI 选项说明：第 1 个选项 = Next.js App Router（推荐），第 2 个 = Pages Router（兼容老项目），第 3 个 = React + Vite

### 路径 B：degit 克隆模板（最快）

```powershell
npx -y degit rhywonfeong/hp-nextjs-app-template my-hp-app
cd my-hp-app
pnpm install
```

### 路径 C：现有项目接入

```powershell
# 1. 确保已有 Next.js / Vite 项目，且 Tailwind CSS v4 已配好
# 2. 安装 stub 包
pnpm add @heroui-pro/react

# 3. 引入样式（globals.css 末尾追加）
@import "tailwindcss";
@import "@heroui/styles";
@import "@heroui-pro/react/css";   /* <- 必须最后 */
```

> **顺序铁律**：`@import "@heroui-pro/react/css"` 必须在 CSS 文件末尾，且在 `tailwindcss` / `@heroui/styles` 之后。

---

## 3. hpsetup 认证详解

### 3.1 一句话机制

hpsetup 通过 HP Key 从 CDN 下载 HeroUI Pro 的闭源组件 tarball，解压到本地 `node_modules` 中已有的 stub 包内，再自动补齐 peer 依赖和包管理器信任配置。

### 3.2 7 阶段流水线

```
npx -y hpsetup@latest hp_xxxx
         |
         v
   +-------------+
   | 1. 环境检测  |  包管理器 . monorepo . 平台类型
   +------+------+
          v
   +-------------+
   | 2. 产品发现  |  扫描 node_modules . 识别已装版本
   +------+------+
          v
   +-------------+
   | 3. 版本校验  |  npm registry 查最新 . 过期则升级
   +------+------+
          v
   +-------------+
   | 4. 下载产物  |  CDN -> 本地缓存 fallback
   +------+------+
          v
   +-------------+
   | 5. 信任配置  |  pnpm allowBuilds . bun trustedDeps
   +------+------+
          v
   +-------------+
   | 6. Peer 依赖 |  扫描缺失 . 交互确认 . 分 workspace 安装
   +------+------+
          v
   +-------------+
   | 7. 收尾     |  patch package.json . Vercel 配置
   +-------------+
```

### 3.3 基本用法

```powershell
# 方式 1：环境变量注入（推荐，避免 Key 进 shell history）
$env:HEROUI_KEY = "hp_xxxxxxxx"
npx -y hpsetup@latest

# 方式 2：直接传参
npx -y hpsetup@latest hp_xxxxxxxx

# 方式 3：指定产品
npx -y hpsetup@latest hp_xxxxxxxx react      # Web
npx -y hpsetup@latest hp_xxxxxxxx native     # Native
```

### 3.4 自动模式触发条件（满足任一）

- `CI=true` 环境变量
- `--auto` flag
- `HEROUI_KEY` 已设置

### 3.5 常用选项

| 选项 | 作用 |
|---|---|
| `--auto` | 跳过交互提示，自动检测并安装 |
| `--dry-run` | 只显示将执行的操作，不做任何更改 |
| `--no-cache` | 绕过缓存，强制从源站拉取（**每日限 1 次**） |
| `-h, --help` | 显示帮助信息 |

### 3.6 下载容错（三层 fallback）

```
CDN 下载 -> 当前版本缓存 -> 上一版本缓存 -> 退出报错
```

即使 CDN 完全宕机，只要本地有过任一历史版本缓存，安装仍可降级完成。

### 3.7 本地缓存结构

```
~/.heroui/cache/
├── react/
│   ├── 1.0.0-beta.3/
│   └── 1.0.0-beta.4/
└── react-native/
    └── 1.0.0-beta.4/
```

### 3.8 真包自检

```powershell
# PowerShell
Test-Path 'node_modules/@heroui-pro/react/dist/index.js'

# 或看目录大小：stub ~13 KB，真包 ~2.47 MB
```

> `index.js` 判断在 `@1.0.0-beta.4` 可能假阴，应判断 `dist/index.js` 或目录大小。

### 3.9 CI/CD 集成

**GitHub Actions：**
```yaml
- run: npx -y hpsetup@latest
  env:
    HEROUI_KEY: ${{ secrets.HEROUI_KEY }}
```

**Vercel：**
- Build Settings -> Install Command 填入 `npx -y hpsetup@latest`
- Environment Variables 添加 `HEROUI_KEY`
- hpsetup 会自动写 `vercel.json` 并将其加入 `.gitignore`

---

## 4. 组件接入步骤

### 4.1 通用接入模式

```tsx
"use client";

import { Card } from "@heroui/react";           // 开源组件
import { AreaChart, ChartTooltip } from "@heroui-pro/react";  // Pro 组件

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

### 4.2 复合 API 模式（dot-notation）

Pro 的高级组件统一用命名空间形式：

| 组件 | 复合 API |
|---|---|
| `AreaChart` | `Grid`, `XAxis`, `YAxis`, `Area`, `Tooltip` |
| `KPI` | `Root`, `Header`, `Title`, `Value`, `Trend`, `Content`, `Icon`, `Chart`, `Progress`, `Footer`, `Actions`, `Separator` |
| `Kanban` | `Root`, `Column`, `ColumnHeader`, `ColumnTitle`, `ColumnCount`, `ColumnBody`, `CardList`, `Card`, `DragHandle`, `DropIndicator`, `ScrollShadow` |
| `ChartTooltip` | `Header`, `Item`, `Indicator`, `Label`, `Value` |
| `PieChart` | `Pie`, `Cell`, `Tooltip` |
| `RadialChart` | `Bar`, `Tooltip` |
| `Carousel` | `Content`, `Item`, `Previous`, `Next`, `Dots`, `Thumbnails`, `Thumbnail` |
| `Rating` | `Item` |
| `Stepper` | `Step`, `Indicator`, `Content`, `Title`, `Separator` |

**例外**：`DataGrid` 是单一组件，通过 `columns` 配置数组驱动。

### 4.3 样式引入顺序

```css
@import "tailwindcss";
@import "@heroui/styles";
@import "@heroui-pro/react/css";   /* <- 必须最后，在 @custom-variant 之后 */
```

### 4.4 设计 Token

Pro 额外提供图表专用变量：
- `var(--chart-1)` ~ `var(--chart-5)`：图表系列色值
- `var(--text-foreground)`, `var(--bg-background)`：与开源版共享

---

## 5. 框架兼容性矩阵

| 框架 | 版本 | 支持状态 | 特殊配置 |
|---|---|---|---|
| **Next.js App Router** | 16.2.3 | 推荐 | 无特殊配置 |
| Next.js Pages Router | 16.x | 兼容 | 不推荐新项目 |
| React + Vite | 19.x | 支持 | `vite.config.ts` 需加 `optimizeDeps.include`（见下方踩坑 #7） |
| Expo (React Native) | SDK 55 | 支持 | 需 `uniwind` + `heroui-native-pro/styles` |

### Vite 特殊配置

```ts
// vite.config.ts
export default defineConfig({
  optimizeDeps: {
    include: ["react", "react/jsx-runtime", "@heroui-pro/react"],
  },
});
```

### Monorepo 支持

- hpsetup 自动识别 `workspaces` 字段或 `pnpm-workspace.yaml`
- **铁律**：在仓库**根目录**运行，禁止逐 workspace 单独执行
- React Pro 只装到 Web workspace，Native Pro 只装到 Native workspace
- 跳过 `packages/*` 下的共享库

---

## 6. 踩坑记录（全量）

### 坑 #1：Key 字符混淆导致 `Invalid or inactive key`

- **现象**：`npx hpsetup@latest hp_xxx` 报 `Invalid or inactive key`
- **根因**：Key 中 `l`（小写 L）被误认为 `1`（数字一），或 `0`/`O` 混淆
- **处理**：从官网重新复制 Key，确认字符无误后重试
- **教训**：hp Key 仅含十六进制字符（0-9, a-f），验证失败先检查易混淆字符
- **来源**：phase-01

### 坑 #2：`@heroui-pro/react` 版本写 `latest` 导致 `Invalid comparator: latest`

- **现象**：`npx hpsetup@latest` 报 `Error: Invalid comparator: latest`
- **根因**：模板出厂的 package.json 中 `@heroui-pro/react` 版本是 `"latest"`，hpsetup v4.5.6 解析不了 npm tag
- **处理**：把 `"latest"` 改成具体版本号（如 `"1.0.0-beta.4"`）
- **教训**：跑 hpsetup 前必须确认 package.json 中 Pro 包版本是具体版本号
- **来源**：phase-03

### 坑 #3：端口占用 `EADDRINUSE`

- **现象**：`pnpm dev` 报 `address already in use :::3003`
- **根因**：之前 session 启动的 dev server 进程还在运行
- **处理**：`Get-NetTCPConnection -LocalPort 3003` 检查并结束进程
- **教训**：跨 session 启动 dev server 时注意端口占用
- **来源**：phase-03

### 坑 #4：MCP 注册写入明文 Token

- **现象**：`claude mcp add` 后 `~/.claude.json` 中出现 UUID 明文
- **根因**：CLI 命令在注册时自动展开 `$env:HEROUI_TOKEN`
- **处理**：手动替换为 `${env:HEROUI_TOKEN}` 占位符
- **教训**：注册后必须检查配置文件，确认无明文；JSON 占位符写法为 `"${env:HEROUI_TOKEN}"`
- **来源**：phase-04

### 坑 #5：MCP `list_components` 返回 remote unavailable

- **现象**：MCP initialize 成功，但 `list_components` 返回 "remote unavailable, no cache"
- **根因**：CDN 缓存未命中或网络波动
- **处理**：清除 `~/.hpmcp/cache` 后重新拉取，或等待网络恢复
- **教训**：MCP server 连接成功不等于所有工具调用成功，需逐个验证
- **来源**：phase-04

### 坑 #6：`DataGridColumn` 缺少 `id` 属性

- **现象**：TypeScript 报错 `Property 'id' is missing in type 'DataGridColumn<Employee>'`
- **根因**：`id` 是必填字段，不是 `key` 也不是 `accessorKey`
- **处理**：每列补充 `id: "xxx"`
- **教训**：DataGrid 的列定义同时需要 `id`（列标识）+ `accessorKey`（数据字段），两者职责不同
- **来源**：phase-05

### 坑 #7：`Kanban.Card` 渲染报错 "outside a collection"

- **现象**：`GridListItem cannot be rendered outside a collection`
- **根因**：`Kanban.Card` 底层是 RAC `GridListItem`，必须在 `Kanban.CardList` 内部
- **处理**：用 `Kanban.CardList items={...}>{(task) => <Kanban.Card>...</Kanban.Card>}</Kanban.CardList>` 包裹
- **教训**：不要直接用 `Array.map` 渲染 Kanban.Card，必须通过 CardList 的 render prop
- **来源**：phase-05

### 坑 #8：`AreaChart.TooltipContent` 不支持 `formatter`

- **现象**：TypeScript 报错 `Property 'formatter' does not exist`
- **根因**：HeroUI Pro 的 TooltipContent 与 Recharts 的 API 不完全一致
- **处理**：去掉 `formatter` prop，用默认格式化或自定义 `content` render prop
- **教训**：Pro 图表组件是 Recharts 的封装层，但不是 1:1 API 映射
- **来源**：phase-05

### 坑 #9：Carousel CDN 图片源跨域/慢

- **现象**：示例用 `nextuipro.nyc3.cdn.digitaloceanspaces.com` 图片源，国内访问慢或拒绝
- **处理**：换成纯 CSS `bg-gradient-to-br` 渐变块 + 文字 label
- **教训**：demo 数据默认走本地 mock，外网资源仅作可选 enhance
- **来源**：phase-02

### 坑 #10：pnpm + Vite JSX 报错 `does not provide an export named 'jsx'`

- **现象**：Vite 项目报 JSX 导出找不到
- **根因**：pnpm 严格依赖隔离导致 `react/jsx-runtime` 被解析到 Pro 包自带副本
- **处理**：`vite.config.ts` 中手动声明 `optimizeDeps.include`
- **教训**：Vite + pnpm + Pro 组合必须配 `optimizeDeps`
- **来源**：Docs/hpsetup-usage.md

### 坑 #11：HTTP MCP 已下线（2026-05-24）

- **现象**：旧配置中的 `x-heroui-personal-token` header 失效
- **根因**：HTTP 传输方式 MCP 已下线，仅保留 Local MCP（stdio）
- **处理**：删除所有 HTTP MCP 配置，改用 `hpmcp` stdio 方式
- **教训**：关注官方变更公告，及时迁移 MCP 配置
- **来源**：phase-04 / Docs/mcp-local.md

### 坑 #12：`--no-cache` 限频 429

- **现象**：一天内多次使用 `--no-cache` 后返回 429
- **根因**：该选项每日最多 1 次
- **处理**：等待 24h 恢复，或改用本地缓存
- **教训**：`--no-cache` 不可在重试循环中使用
- **来源**：Docs/hpsetup-mechanism.md

### 坑 #13：Yarn Berry PnP 不支持

- **现象**：Yarn PnP 模式下 hpsetup 无法正常工作
- **根因**：hpsetup 依赖 node_modules 物理路径
- **处理**：切换为 `node-modules` linker，或改用 pnpm
- **来源**：Docs/hpsetup-usage.md

### 坑 #14：Marker 验证选词错误

- **现象**：验证脚本把 "Energy" 当 RadialChart 命中标记，实际页面用中文"活动概览"
- **根因**：HTTP 验证脚本的关键字未从渲染目标的源码字面取
- **处理**：marker 选页面真实文本（中文标题或数据字段）
- **教训**：自动化验证的关键字要从源码字面取，不主观造英文词
- **来源**：phase-02

---

## 7. 生产接入 checklist

### 7.1 环境 & 凭证

- [ ] Node.js 18+ 已确认（推荐 24.x）
- [ ] pnpm 已安装（推荐 10.x）
- [ ] HP Key 已获取且有效（以 `hp_` 开头）
- [ ] Personal Token 已获取（用于 MCP/Skills，UUID 格式）
- [ ] 网络可访问 CDN 和 npm registry
- [ ] `.gitignore` 已排除 `vercel.json` 和任何含凭证的文件

### 7.2 项目初始化

- [ ] 项目已创建（heroui-cli / degit / 现有项目）
- [ ] `pnpm install` 无报错
- [ ] `pnpm dev` 基线页面正常
- [ ] Git 初始提交已完成（可选但推荐）
- [ ] `globals.css` 已引入 `@import "@heroui-pro/react/css"`（在末尾）

### 7.3 hpsetup 认证

- [ ] `HEROUI_KEY` 环境变量已设置
- [ ] `npx -y hpsetup@latest` 成功执行
- [ ] `node_modules/@heroui-pro/react/dist/index.js` 存在（真包确认）
- [ ] `~/.heroui/cache/react/<version>/` 缓存已生成
- [ ] 同版本第二次运行显示 `already on the latest version`

### 7.4 组件接入

- [ ] 至少 1 个 Pro 组件成功渲染（建议从 AreaChart 开始）
- [ ] 复合 API 使用正确（dot-notation）
- [ ] `aria-label` 等无障碍属性已加（DataGrid / Kanban 必填）
- [ ] 设计 token（`var(--chart-N)`）生效
- [ ] 控制台无 React/CSS warning

### 7.5 MCP & Skills（开发辅助）

- [ ] `hpmcp` 已注册到 Claude Code / Cursor / VS Code
- [ ] `~/.claude.json` 中**未**出现明文 Token（使用 `${env:HEROUI_TOKEN}`）
- [ ] `list_components` / `get_component_docs` 工具调用正常
- [ ] 3 个 Skills 已安装（`heroui-react-pro`, `heroui-native-pro`, `heroui-pro-design-taste`）
- [ ] HTTP MCP 配置已删除（如之前有）

### 7.6 CI/CD（如适用）

- [ ] GitHub Actions workflow 中 `HEROUI_KEY` 使用 Secrets
- [ ] Vercel Install Command 已配置 `npx -y hpsetup@latest`
- [ ] Vercel Environment Variables 已添加 `HEROUI_KEY`
- [ ] Monorepo 在根目录运行 hpsetup（不逐 workspace 执行）

### 7.7 性能 & 安全

- [ ] DataGrid >500 行时评估虚拟化需求
- [ ] 所有 mock 数据层结构清晰，接真实 API 时只需替换导出
- [ ] 无 `hp_xxx` 明文出现在任何代码文件
- [ ] 无 `HEROUI_KEY` / `HEROUI_TOKEN` 明文出现在 `.env` / config 文件
- [ ] `pnpm approve-builds` 已处理（如遇 `ERR_PNPM_IGNORED_BUILDS`）

### 7.8 高级组件（如使用）

- [ ] DataGrid: 所有列定义 `id` + `accessorKey` 双字段
- [ ] DataGrid: `cell` render prop 覆盖自定义需求
- [ ] Kanban: Card 必须通过 `CardList` 的 render prop 渲染
- [ ] Kanban: `CardList` 已加 `aria-label`
- [ ] 图表: 确认 TooltipContent 的 prop 与 Recharts 不同
- [ ] 图表: `tickFormatter` + `domain` 已按需求配置

---

## 8. 性能与优化建议

### 8.1 DataGrid 性能

| 数据量 | 建议 |
|---|---|
| < 100 行 | 无虚拟化，直接渲染 |
| 100~500 行 | 观察首屏渲染时间，<200ms 可接受 |
| > 500 行 | 建议开启虚拟化（需确认 `@heroui-pro/react` 是否内置） |

- 1000 行无虚拟化实测：首屏 ~200ms，排序 <50ms（dev 环境）
- `cell` render prop 是最强大的扩展点，可覆盖 90% 自定义需求

### 8.2 缓存策略

- hpsetup 本地缓存：`~/.heroui/cache/`，同版本秒级恢复
- MCP 缓存：`~/.hpmcp/cache/`，默认 TTL 1800s
- 缓存清理：`Remove-Item -Recurse -Force ~/.hpmcp/cache`

### 8.3 构建优化

- Vite 项目务必配置 `optimizeDeps.include`
- pnpm 项目遇 `ERR_PNPM_IGNORED_BUILDS` 用 `pnpm approve-builds`
- `--no-cache` 仅限排查问题时使用，每日最多 1 次

### 8.4 包大小

- `@heroui-pro/react` stub 包：~13 KB
- 真包（含组件代码）：~2.47 MB
- 首次 CDN 下载：~405 KB（压缩后），耗时 ~7s

### 8.5 开发体验

- **Skills + MCP 配合**：Skills 给上下文知识，MCP 查具体 API 参数，互补使用
- **模板选择**：后台管理场景首选 `template-dashboard`（组件最全、结构最标准）
- **Figma 还原**：先建立 Code -> Component 对照表，再逐区域实现

---

## 附录：Phase 目标速查

| Phase | 目标 | 关键产出 |
|---|---|---|
| phase-01 | 环境 + 认证 | hpsetup 跑通、真包落地、缓存确认 |
| phase-02 | Pro 组件试用 | 9 类组件渲染、复合 API 熟悉 |
| phase-03 | 模板跑通 | 4 个模板全启动、选出最佳业务起点 |
| phase-04 | MCP + Skills | hpmcp 注册、3 个 Skills 安装 |
| phase-05 | 高级组件 | DataGrid/Kanban/ComposedChart 深度试用 |
| phase-06 | React Native | Expo + Native Pro + EAS Build |
| phase-07 | Figma 还原 | 设计稿 -> 代码闭环 |

---

*本文档基于实测记录整理，遇版本更新请以官方文档为准。*
