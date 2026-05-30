---
title: "UI 工作流反模式手册"
type: reference
status: active
source_files:
  - reports/raw/ui-workflow/02-ui-skill-deep-research.md
  - reports/raw/ui-workflow/04-ui-tool-routing-cheatsheet.md
  - reports/raw/ui-workflow/01-ui-skill-stack-installation-report.md
updated: 2026-05-30
owner: threetwoa
---

# UI 工作流反模式手册

> Claude Code 环境下 UI/UX 工作流的 12 个常见错误及其修正。
> 来源：UI Skill 深度调研报告 + 安装与工具路由文档。

---

### #1: 动画布局属性而非 Transform

- **❌ 错误做法**: 对 `width`、`height`、`top`、`left` 等布局属性做动画，触发 Layout Thrashing（重排 + 重绘），帧率暴跌
- **✅ 正确做法**: 只对 `transform`（`x`、`y`、`scale`、`rotation`）和 `opacity` 做动画，让合成器独立处理；需要尺寸变化时用 GSAP `Flip` 插件执行 FLIP 动画
- **🛠 修复 Skill**: `gsap-core` + `gsap-performance`
- **来源**: 02-ui-skill-deep-research §1.1 / §1.5

---

### #2: ScrollTrigger 中同时使用 toggleActions + scrub

- **❌ 错误做法**: 同一个 ScrollTrigger 实例同时设置 `toggleActions: "play none none reverse"` 和 `scrub: true`，两者语义冲突，导致动画在滚动位置和触发事件之间来回跳动
- **✅ 正确做法**: 二选一——滚动驱动用 `scrub`（数值或 `true`），触发驱动用 `toggleActions`；若需混合效果，拆为两个独立 ScrollTrigger 实例
- **🛠 修复 Skill**: `gsap-scrolltrigger`
- **来源**: 02-ui-skill-deep-research §1.3

---

### #3: React GSAP Hook 缺少 scope 参数

- **❌ 错误做法**: 在 `useGSAP()` 中不传 `scope`，直接用 CSS 选择器 `gsap.from(".card", ...)` 导致选择器越界到其他组件，动画串台 + 卸载时无法正确清理
- **✅ 正确做法**: 传入 `scope` 参数（ref 引用），将动画限制在组件边界内：`useGSAP(() => { ... }, { scope: containerRef })`
- **🛠 修复 Skill**: `gsap-react`
- **来源**: 02-ui-skill-deep-research §1.4

---

### #4: CSS 导入顺序错误（Pro CSS 不是最后一个）

- **❌ 错误做法**: `@import "tailwindcss/pro"` 放在组件样式之前，导致 Pro CSS 的 `@layer` 优先级被后续规则覆盖，Pro 组件样式失效
- **✅ 正确做法**: `@import "tailwindcss/pro"` 必须是样式文件中**最后一行** import，确保其 layer 优先级不被覆盖
- **🛠 修复 Skill**: `frontend-design`（方向指导）+ 手动检查 CSS 导入顺序
- **来源**: 02-ui-skill-deep-research §3（frontend-design 规则推导）

---

### #5: hpsetup 版本号 "latest" 导致 Invalid Comparator

- **❌ 错误做法**: 在 `package.json` 或 `skill` 配置中写 `"version": "latest"`，semver 解析器无法识别，抛出 `Invalid comparator` 错误，技能加载失败
- **✅ 正确做法**: 使用精确版本号如 `"1.2.3"` 或范围如 `"^1.2.0"`；如需最新版，先用 `npm view <pkg> version` 查询后再填入
- **🛠 修复 Skill**: 手动检查 + `skill-creator`（如需重新生成配置）
- **来源**: 01-ui-skill-stack-installation-report §4（安装问题推导）

---

### #6: Windows 上 npx skills 创建空目录

- **❌ 错误做法**: 在 Windows 上运行 `npx skills add <repo>` 后，`.agents/skills/<name>/` 只创建空目录 + 符号链接，SKILL.md 和脚本文件缺失，技能虽注册但无法从磁盘读取
- **✅ 正确做法**: 使用 `git clone --depth 1 <repo-url> <local-path>` 手动克隆完整仓库到本地，确保所有文件就位后再注册
- **🛠 修复 Skill**: 手动 `git clone` + 验证文件完整性
- **来源**: 01-ui-skill-stack-installation-report §4.1

---

### #7: DataGrid 缺少 id 属性

- **❌ 错误做法**: 传给 `<DataGrid>` 的 `rows` 数组中对象没有 `id` 字段，React key 警告满天飞，排序/筛选/虚拟滚动全部异常
- **✅ 正确做法**: 每行数据必须包含唯一 `id`；或通过 `getRowId` 属性指定自定义主键字段：`<DataGrid getRowId={(row) => row.userId} />`
- **🛠 修复 Skill**: `heroui-react-pro`（组件级指导）
- **来源**: 02-ui-skill-deep-research §6（HeroUI 组件规则推导）

---

### #8: Kanban.Card 渲染在 CardList 之外

- **❌ 错误做法**: 把 `<Kanban.Card>` 作为 `<Kanban.CardList>` 的兄弟节点渲染，导致卡片脱离拖拽上下文，拖放交互完全失效
- **✅ 正确做法**: `<Kanban.Card>` 必须是 `<Kanban.CardList>` 的子组件，确保卡片注册在正确的拖拽容器中
- **🛠 修复 Skill**: `heroui-react-pro`（组件级指导）
- **来源**: 02-ui-skill-deep-research §6（HeroUI 组件规则推导）

---

### #9: 过度安装 UI Skill 导致冲突

- **❌ 错误做法**: 同时安装 `ui-ux-pro-max` + `frontend-design` + `impeccable` + `bencium-controlled` + `bencium-innovative` + `LibreUIUX`，多个 Skill 对同一设计问题给出矛盾指令（一个要极简，一个要极繁），Agent 无所适从
- **✅ 正确做法**: 按职能分层选择：设计方向用 `frontend-design`，调色/字体参考用 `ui-ux-pro-max`，打磨/审计用 `impeccable`，组件制作用 `heroui-pro-design-taste`。每层只保留**一个**主力 Skill
- **🛠 修复 Skill**: 手动 Skill 审计 + `skill-creator`（卸载冗余）
- **来源**: 01-ui-skill-stack-installation-report §3 / 02-ui-skill-deep-research §8（依赖图）

---

### #10: 用 opacity 而非 autoAlpha 做淡入淡出

- **❌ 错误做法**: 使用 `gsap.to(el, { opacity: 0 })` 隐藏元素，动画结束后元素仍然占据 layout 空间且可被交互（Tab 键可达），造成切换障碍
- **✅ 正确做法**: 使用 `autoAlpha`，它在 `opacity: 0` 时自动设 `visibility: hidden`，完全移除元素的可交互性：`gsap.to(el, { autoAlpha: 0 })`
- **🛠 修复 Skill**: `gsap-core`
- **来源**: 02-ui-skill-deep-research §1.1

---

### #11: Delay 链式调用而非 Timeline 编排

- **❌ 错误做法**: 用多个独立 `gsap.to()` + `delay` 参数串联动画，延迟是绝对时间，无法暂停/反转/整体调整时序，维护成本极高
- **✅ 正确做法**: 使用 `gsap.timeline()` 编排序列，用 position 参数（`"<"`、`"+=0.5"`、label）控制相对时序，支持整体 `pause()`/`reverse()`/`restart()`
- **🛠 修复 Skill**: `gsap-timeline`
- **来源**: 02-ui-skill-deep-research §1.1 / §1.2

---

### #12: 布局变化后忘记 ScrollTrigger.refresh()

- **❌ 错误做法**: 动态加载内容、手风琴展开、Tab 切换导致页面高度变化后不调用 `ScrollTrigger.refresh()`，所有 pin/scrub 动画的触发点_calc_位置仍是旧值，动画错位或卡死
- **✅ 正确做法**: 任何改变 DOM 尺寸的操作后（动态内容、展开/折叠、窗口 resize），调用 `ScrollTrigger.refresh()`，建议用 debounce 包装：`gsap.delayedCall(0.1, () => ScrollTrigger.refresh())`
- **🛠 修复 Skill**: `gsap-scrolltrigger`
- **来源**: 02-ui-skill-deep-research §1.3

---

## 快速索引

| # | 反模式 | 修复 Skill | 严重度 |
|---|--------|-----------|--------|
| 1 | 动画布局属性 | gsap-core + gsap-performance | 🔴 性能 |
| 2 | toggleActions + scrub 冲突 | gsap-scrolltrigger | 🔴 功能 |
| 3 | React Hook 缺 scope | gsap-react | 🔴 功能 |
| 4 | Pro CSS 导入顺序 | frontend-design | 🟡 样式 |
| 5 | version "latest" | 手动检查 | 🟡 构建 |
| 6 | Windows 空目录 | git clone | 🔴 缺失 |
| 7 | DataGrid 缺 id | heroui-react-pro | 🔴 运行时 |
| 8 | Kanban.Card 脱离 CardList | heroui-react-pro | 🔴 功能 |
| 9 | Skill 过度安装 | 手动审计 | 🟡 冲突 |
| 10 | opacity vs autoAlpha | gsap-core | 🟡 体验 |
| 11 | delay 链 vs timeline | gsap-timeline | 🟡 可维护 |
| 12 | 忘记 ScrollTrigger.refresh() | gsap-scrolltrigger | 🔴 功能 |

---

## Source Material

| 文件 | 内容 |
|------|------|
| `reports/raw/ui-workflow/01-ui-skill-stack-installation-report.md` | 安装结果、Windows 空目录问题、Skill 冲突分析 |
| `reports/raw/ui-workflow/02-ui-skill-deep-research.md` | GSAP 8 子技能规则、Impeccable/frontend-design/bencium 详细对照 |
| `reports/raw/ui-workflow/04-ui-tool-routing-cheatsheet.md` | 工具路由速查表（归档待补充） |