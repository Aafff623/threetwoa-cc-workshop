---
title: "HeroUI Pro 生产接入 Checklist"
type: checklist
status: active
version: "@heroui-pro/react@1.0.0-beta.4 / @heroui/react@3.0.3 / Tailwind v4"
source_files:
  - reports/raw/heroui/porting-guide-and-pitfalls.md
updated: 2026-05-30
owner: threetwoa
---

# HeroUI Pro 生产接入 Checklist

使用前逐项确认，确保零遗漏接入。

## Source Material

- `reports/raw/heroui/porting-guide-and-pitfalls.md`

---

## 1. 环境 & 凭证

- [ ] Node.js 18+（推荐 24.x）
- [ ] pnpm 已安装（推荐 10.x）
- [ ] HP Key 已获取且有效（`hp_` 开头）
- [ ] Personal Token 已获取（UUID 格式，用于 MCP/Skills）
- [ ] 网络可访问 CDN 和 npm registry
- [ ] `.gitignore` 已排除 `vercel.json` 和凭证文件

## 2. 项目初始化

- [ ] 项目已创建（heroui-cli / degit / 现有项目）
- [ ] `pnpm install` 无报错
- [ ] `pnpm dev` 基线页面正常
- [ ] Git 初始提交已完成
- [ ] `globals.css` 已引入 `@import "@heroui-pro/react/css"`（**末尾**）

## 3. hpsetup 认证

- [ ] `HEROUI_KEY` 环境变量已设置
- [ ] `npx -y hpsetup@latest` 成功执行
- [ ] `node_modules/@heroui-pro/react/dist/index.js` 存在（真包确认）
- [ ] 缓存已生成 `~/.heroui/cache/react/<version>/`
- [ ] 同版本二次运行显示 `already on the latest version`

## 4. 组件接入

- [ ] 至少 1 个 Pro 组件成功渲染（建议从 AreaChart 开始）
- [ ] 复合 API 使用正确（dot-notation: `AreaChart.Grid`, `KPI.Root` 等）
- [ ] `aria-label` 等无障碍属性已加
- [ ] 设计 token（`var(--chart-N)`）生效
- [ ] 控制台无 React/CSS warning

## 5. 踩坑重点

| # |坑 | 关键检查 |
|---|---|---|
| 1 | Key 字符混淆 | 确认 `hp_` key 无 `l`/`1` 混淆 |
| 2 | `latest` 版本报错 | package.json 中 Pro 包版本必须是具体版本号 |
| 3 | 端口占用 | `Get-NetTCPConnection -LocalPort <port>` 检查 |
| 4 | 明文 Token | `~/.claude.json` 中使用 `${env:HEROUI_TOKEN}` 占位 |
| 5 | DataGrid 缺 `id` | 每列定义必须有 `id` + `accessorKey` |
| 6 | Kanban.Card 在 CardList 外 | 必须用 `CardList` render prop |
| 7 | TooltipContent 无 `formatter` | 用 `content` render prop 替代 |
| 8 | CSS 导入顺序 | `@heroui-pro/react/css` 必须最后 |

## 6. MCP & Skills

- [ ] `hpmcp` 已注册到 Claude Code / Cursor
- [ ] 无明文 Token 在配置文件
- [ ] `list_components` / `get_component_docs` 调用正常
- [ ] 3 个 Skills 已安装（heroui-react-pro, heroui-native-pro, heroui-pro-design-taste）

## 7. CI/CD

- [ ] GitHub Actions: `HEROUI_KEY` 使用 Secrets
- [ ] Vercel: Install Command 配置 `npx -y hpsetup@latest`
- [ ] Vercel: Environment Variables 添加 `HEROUI_KEY`
- [ ] Monorepo: 在根目录运行 hpsetup

## 8. 性能 & 安全

- [ ] DataGrid >500 行评估虚拟化
- [ ] mock 数据层结构清晰，替换 API 只改导出
- [ ] 无 `hp_xxx` / `HEROUI_KEY` 明文
- [ ] `pnpm approve-builds` 已处理