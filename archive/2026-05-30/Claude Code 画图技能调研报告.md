# Claude Code 画图技能（Diagram Skills）深度调研报告

> 调研时间：2026-05-26
> 技能来源：GitHub 开源社区
> 安装位置：`C:\Users\Lenovo\.claude\skills\`

---

## 一、总览：六款技能对比

| 维度 | tldraw-skill | drawio-skill | mermaid-skill | excalidraw-skill | baoyu-diagram | baoyu-infographic |
|------|-------------|--------------|---------------|------------------|---------------|-------------------|
| **作者** | Agents365-ai | Agents365-ai | WH-2099 | coleam00 | JimLiu | JimLiu |
| **Star 数** | 39 | ~1.9k | 56 | ~3.3k | 内置 | 内置 |
| **输出格式** | `.tldr` JSON → PNG/SVG | `.drawio` XML → PNG/SVG/PDF/JPG | `.md` Mermaid 代码 | `.excalidraw` JSON → PNG | `.svg` 纯矢量 | `.png` 栅格图 |
| **核心风格** | 手绘白板风 | 干净专业风 | 文本驱动 / 自动布局 | 草图风 / 视觉论证 | 深色科技风 | 多元插画风 |
| **依赖** | Node.js + `tldraw-cli` | draw.io Desktop CLI | 无（纯文本） | Python + `uv` + Playwright | Bun/Node.js | Bun/Node.js + 图像后端 |
| **自检查** | Vision 自检（PNG） | Vision 自检（PNG） | 无 | 渲染后视觉自检 | 代码级验证 | 无 |
| **平台** | macOS / Linux / Windows | macOS / Linux / Windows | 全平台 | 全平台 | 全平台 | 全平台 |
| **Claude 注册** | 已安装 | 已安装 | ✅ 已注册可用 | 已安装 | 已安装 | 已安装 |

---

## 二、逐个技能详解

### 1. tldraw-skill —— 手绘白板

**GitHub**: https://github.com/Agents365-ai/tldraw-skill

#### 定位
生成现代白板风格的 `.tldr` 图表，通过 `@kitschpatrol/tldraw-cli` 导出为 PNG/SVG。适合**轻松、非正式**的可视化场景。

#### 6 种图表预设
| 预设类型 | 用途 |
|---------|------|
| Architecture 架构图 | 服务分层、组件关系 |
| Flowchart 流程图 | 决策树、处理步骤 |
| Sequence 时序图 | 交互消息、API 调用 |
| ML/DL 神经网络 | 论文配图、模型架构 |
| ERD 图 | 数据库实体关系 |
| UML 类图 | 类结构、继承关系 |

#### 工作流程
1. 检查 `tldraw-cli` 依赖
2. 规划节点坐标网格
3. 生成 `.tldr` JSON（含 shapes + arrows）
4. 导出 PNG 草稿
5. **Vision 自检** —— 用 Claude 识图能力检查重叠、截断、断箭头等
6. 用户评审循环（最多 5 轮）
7. 导出最终 PNG/SVG

#### 自检能力（核心亮点）
| 检查项 | 自动修复动作 |
|--------|-------------|
| 形状重叠 | 位移 ≥200px |
| 文字截断 | 增大 w/h |
| 箭头未连接 | 修正 boundShapeId |
| 箭头穿过形状 | 调整 bend 值或锚点 |
| 箭头堆叠 | 分配不同 normalizedAnchor |

#### 优势
- 手绘风自然不刻板，内部文档/白板讲解很合适
- 有 10 色语义系统（蓝=服务、绿=数据库、紫=认证等）
- Vision 自检闭环，减少手动调图
- Windows 无额外桌面应用依赖（纯 npm CLI）

#### 劣势
- 时序图、ERD、UML 是"近似实现"，不如 drawio 原生支持完整
- 手绘风不适合商务/学术正式场合
- 39 stars，社区相对小众

---

### 2. drawio-skill —— 干净专业

**GitHub**: https://github.com/Agents365-ai/drawio-skill

#### 定位
生成 `.drawio` XML，通过原生 **draw.io Desktop CLI** 导出为 PNG/SVG/PDF/JPG。适合**商务、学术、正式**场景。

#### 核心特性
- **导出格式最全**：PNG/SVG/PDF/JPG 都支持
- **可嵌入 XML**：`-e` 参数让导出的图片包含完整可编辑 XML（`.drawio.png` 双扩展名）
- **风格预设系统**：支持用户自定义风格预设（`~/.drawio-skill/styles/`）
- **容器/泳道支持**：draw.io 原生的 swimlane、group、parent-child 嵌套

#### 工作流程
1. 解析用户风格预设（如果有）
2. 检查 `draw.io` CLI
3. 规划布局（LR/TB）
4. 生成 `.drawio` XML
5. 导出 PNG 草稿（**不带 `-e`**，避免 vision API 400 错误）
6. Vision 自检
7. 用户评审循环
8. 最终导出（**带 `-e`** 嵌入 XML）+ 修复 PNG IEND chunk

#### 关键注意事项
- **PNG 修复脚本**：draw.io CLI 导出 `-e` PNG 时会截断 IEND chunk（8 字节缺失），必须用 `scripts/repair_png.py` 修复
- **macOS sandbox 限制**：在 codex.app 等沙盒环境中，draw.io CLI 可能崩溃，需 fallback 到浏览器 viewer URL

#### 优势
- 1.9k stars，社区最成熟的 draw.io skill
- 正式感强，适合论文/PPT/商务交付
- 泳道、容器、AWS 图标等原生支持
- 风格预设可学习用户偏好

#### 劣势
- **必须先安装 draw.io Desktop**（macOS 用 Homebrew，Windows/Linux 下载安装包）
- Linux headless 环境需要 `xvfb-run` 等额外配置
- Windows 路径含空格（`C:\Program Files\draw.io\draw.io.exe`），调用需注意引号

---

### 3. mermaid-skill —— 文本驱动

**GitHub**: https://github.com/WH-2099/mermaid-skill

#### 定位
生成 **Mermaid 图表代码**，纯文本驱动，支持 23 种图表类型。适合**文档嵌入、版本控制、快速随手画**。

#### 支持的 23 种图表
Flowchart、Sequence Diagram、Class Diagram、State Diagram、ER Diagram、Gantt Chart、Pie Chart、Mindmap、Timeline、Git Graph、Quadrant Chart、Requirement Diagram、C4 Diagram、Sankey Diagram、XY Chart、Block Diagram、Packet Diagram、Kanban、Architecture Diagram、Radar Chart、Treemap、User Journey、ZenUML。

#### 工作流程
1. 分析用户需求，确定图表类型
2. 读取对应类型的语法参考文档（`references/` 目录）
3. 生成符合规范的 Mermaid 代码
4. 应用主题和样式
5. 输出为 ` ```mermaid ` 代码块

#### 优势
- **零依赖** —— 不需要安装任何桌面应用或 CLI
- **版本控制友好** —— 纯文本，diff 清晰
- **23 种类型** —— 覆盖范围最广
- **Markdown 原生** —— 直接嵌入 GitHub、Notion、Obsidian
- 已注册到 Claude Code 技能列表（系统提示可见）

#### 劣势
- **没有视觉自检** —— 依赖 Mermaid 渲染器，Claude 无法直接"看图改图"
- 布局由 Mermaid 引擎自动控制，精细调整受限
- 复杂图表（如大型架构图）可读性不如 drawio/tldraw

---

### 4. excalidraw-skill —— 草图风 / 视觉论证

**GitHub**: https://github.com/coleam00/excalidraw-diagram-skill

#### 定位
生成 `.excalidraw` JSON，强调 **"diagrams that argue visually"** —— 图表不是信息的罗列，而是视觉论证。

#### 核心哲学
- **同构测试**：如果去掉所有文字，结构本身能否传达概念？
- **教育测试**：观众能从图中学到具体东西，还是只看到了标签？
- **形状即意义**：每个概念的形状应反映其行为（发散用 fan-out、聚合用 convergence、序列用 timeline）

#### 深度分层
| 层级 | 内容 | 用途 |
|------|------|------|
| Level 1 | Summary Flow | 全局概览 |
| Level 2 | Section Boundaries | 按职责/阶段/团队分组 |
| Level 3 | Detail Inside | 代码片段、真实数据、API 名称等证据工件 |

#### 证据工件（Evidence Artifacts）
技术图表**必须**包含具体证据：
- 真实 API 端点 / 方法名（不用 "API" 这种占位符）
- 真实事件名称（如 `RUN_STARTED`, `STATE_DELTA`）
- 代码片段、JSON payload 示例
- UI mockup 模拟真实界面

#### 工作流程
1. **评估深度** —— 简单概念图 vs 综合技术图
2. **研究** —— 查真实 spec、格式、事件名
3. **概念映射** —— 为每个概念选择视觉模式（fan-out、convergence、tree 等）
4. **分段生成 JSON** —— 大图必须分 section 逐步构建（避免 32k token 限制）
5. **渲染 & 验证循环** —— 用 `render_excalidraw.py` 生成 PNG，用 Read 工具查看，修复问题，重复 2-4 次

#### 渲染依赖
```bash
cd .claude/skills/excalidraw-diagram/references
uv sync
uv run playwright install chromium
uv run python render_excalidraw.py diagram.excalidraw
```

#### 优势
- 3.3k stars，社区热度最高
- 设计理念最先进（视觉论证 > 信息展示）
- 草图风自带"非正式、可讨论"的暗示，适合汇报演示
- 严格的质量检查清单（27 项）

#### 劣势
- **渲染依赖最重** —— 需要 Python `uv` + Playwright + Chromium
- 分 section 构建大图流程复杂，学习曲线陡
- 没有 draw.io 那种正式感，不适合学术论文

---

### 5. baoyu-diagram —— 深色科技 SVG

**GitHub**: https://github.com/JimLiu/baoyu-skills#baoyu-diagram

#### 定位
直接生成**纯 SVG 矢量图**，深色科技风格（slate-900 背景 + cyan/emerald/violet 语义色系）。适合**技术文档、README、博客、 dark-mode 界面**嵌入。

#### 支持的 9 种图表类型
| 类型 | 用途 |
|------|------|
| Architecture | 系统组件与关系 |
| Flowchart | 决策逻辑、处理步骤 |
| Sequence | 时序交互 |
| Structural | 类图、ER图、组织架构 |
| Mind Map | 思维导图 |
| Timeline | 时间线 |
| Illustrative | 概念解释、对比 |
| State Machine | 状态转换 |
| Data Flow | 数据转换管道 |

#### 核心设计系统
- **背景**: `#0f172a` (slate-900) +  subtle grid
- **字体**: JetBrains Mono，等宽科技感
- **语义配色**:
  - Cyan → 前端/用户-facing
  - Emerald → 后端/服务
  - Violet → 数据库/存储
  - Amber → 云/基础设施
  - Rose → 安全/错误
- **图层顺序**: 背景 → 区域边界 → 箭头 → 遮罩(rect) → 组件框 → 文字 → 图例

#### 工作流程
1. 识别图表类型
2. 读取对应 reference 文件（`references/architecture.md` 等）
3. 规划布局（组件列表、分组、流向）
4. 手写 SVG（遵循严格的 z-order 和间距规则）
5. 用 `scripts/main.ts` 导出 @2x PNG

#### 优势
- **零外部依赖** —— 纯 SVG，任何浏览器都能打开
- **矢量无损** —— 可无限缩放，适合打印和高分屏
- **深色主题一体化** —— 和技术文档/IDE  dark mode 浑然一体
- **中文优化** —— 自动使用 Noto Sans SC / PingFang SC 回退

#### 劣势
- 需要手写 SVG 坐标，没有可视化编辑器
- 复杂图表（>20 节点）手动定位较累
- 风格固定为 dark theme，无法切换 light mode

---

### 6. baoyu-infographic —— 信息图工厂

**GitHub**: https://github.com/JimLiu/baoyu-skills#baoyu-infographic

#### 定位
将结构化内容转化为**出版级信息图**。不是画流程图，而是把文章/数据/概念变成视觉叙事。

#### 21 种布局
| 布局 | 适合场景 |
|------|---------|
| linear-progression | 时间线、流程教程 |
| binary-comparison | A vs B |
| bento-grid | 多主题概览（默认） |
| funnel | 转化漏斗 |
| hub-spoke | 中心概念辐射 |
| iceberg | 表象 vs 深层 |
| comic-strip | 叙事序列 |
| dense-modules | 高密度知识指南 |
| ... 共 21 种 | ... |

#### 22 种视觉风格
`craft-handmade`（手绘纸艺，默认）、`cyberpunk-neon`、`pixel-art`、`chalkboard`、`origami`、`pop-laboratory`、`morandi-journal`、`retro-pop-grid` 等。

#### 工作流程
1. **分析内容** → `analysis.md`
2. **结构化** → `structured-content.md`
3. **推荐组合** → 3-5 个 layout×style 方案
4. **用户确认** → 布局 + 风格 + 比例 + 语言
5. **生成 Prompt** → `prompts/infographic.md`
6. **调用图像后端** → `infographic.png`

#### 依赖
- **必须**: Bun/Node.js + `baoyu-image-gen` skill（或其他图像生成后端）
- **图像后端选择**: OpenAI GPT Image 2 / Google / 阿里通义 / 字节豆包 / Replicate 等

#### 优势
- 布局和风格组合极其丰富（21×22 = 462 种组合）
- 完整的内容分析 → 结构化 → 视觉化工作流
- 支持参考图风格迁移
- 输出为 PNG，适合社交媒体/公众号/小红书

#### 劣势
- **依赖图像生成后端** —— 需要配置 API key（OpenAI/Google/阿里等）
- 生成成本较高（每次调用都消耗 image generation token）
- 不是即时出图，需要走完整的确认流程

---

## 三、横向选择指南

### 按场景选

| 场景 | 推荐技能 | 理由 |
|------|---------|------|
| **内部技术文档 / 白板讲解** | tldraw-skill | 手绘风轻松自然，vision 自检闭环 |
| **商务 PPT / 学术论文 / 正式交付** | drawio-skill | 干净专业，支持 PDF 导出和泳道 |
| **GitHub README / 博客 / Markdown 文档** | mermaid-skill | 纯文本嵌入，版本控制友好 |
| **产品汇报 / 概念演示 / 教学视频** | excalidraw-skill | 草图风暗示"迭代中"，视觉论证能力强 |
| **技术文档/博客 dark mode 配图** | baoyu-diagram | 深色科技 SVG，矢量无损，中文友好 |
| **公众号/小红书/社交媒体信息图** | baoyu-infographic | 21 布局 × 22 风格，出版级输出 |

### 按复杂度选

| 复杂度 | 推荐 |
|--------|------|
| 随手画（< 5 个节点）| mermaid-skill（最快，零依赖） |
| 中等复杂度（5-15 节点）| tldraw-skill / baoyu-diagram |
| 高复杂度（> 15 节点，需嵌套容器）| drawio-skill（swimlane + 分组最强） |
| 需要"讲故事"的教学/演示图 | excalidraw-skill（多 zoom 层级 + 证据工件） |
| 高密度知识总结图 | baoyu-infographic（信息图叙事） |

### 按平台/环境选

| 环境 | 推荐 |
|------|------|
| Windows（无 WSL）| tldraw-skill / mermaid-skill / baoyu-diagram（依赖最少） |
| macOS（有 Homebrew）| drawio-skill（brew install --cask drawio） |
| Linux headless / CI | mermaid-skill / baoyu-diagram（零 GUI 依赖） |
| 有 Python + uv 环境 | excalidraw-skill（渲染管道完整） |
| 有图像生成 API key | baoyu-infographic（需 backend） |

---

## 四、安装状态

| 技能 | 安装路径 | 状态 |
|------|---------|------|
| tldraw-skill | `~/.claude/skills/tldraw-skill/` | ✅ 已安装 |
| drawio-skill | `~/.claude/skills/drawio-skill/` | ✅ 已安装 |
| mermaid-skill | `~/.claude/skills/mermaid-skill/` | ✅ 已安装且已注册 |
| excalidraw-skill | `~/.claude/skills/excalidraw-skill/` | ✅ 已安装 |
| baoyu-diagram | `~/.claude/skills/baoyu-diagram/` | ✅ 已安装 |
| baoyu-infographic | `~/.claude/skills/baoyu-infographic/` | ✅ 已安装 |

### baoyu 生态其他已安装技能

| 技能 | 用途 |
|------|------|
| baoyu-image-gen | AI 图像生成底层（OpenAI/Google/阿里/字节等） |
| baoyu-cover-image | 文章封面图生成 |
| baoyu-slide-deck | PPT/幻灯片生成 |
| baoyu-xhs-images | 小红书/社交媒体图片卡片 |
| baoyu-article-illustrator | 文章配图分析+生成 |
| baoyu-comic | 知识漫画生成 |
| baoyu-translate | 多语言翻译 |
| baoyu-markdown-to-html | Markdown 转 HTML |
| baoyu-url-to-markdown | 网页转 Markdown |
| baoyu-post-to-wechat | 微信公众号发布 |
| baoyu-post-to-weibo | 微博发布 |
| baoyu-post-to-x | X/Twitter 发布 |
| baoyu-wechat-summary | 微信群聊总结 |
| baoyu-youtube-transcript | YouTube 字幕下载 |
| baoyu-electron-extract | Electron 应用源码提取 |
| baoyu-format-markdown | Markdown 格式化 |
| baoyu-compress-image | 图片压缩/转 WebP |

### 待配置依赖

| 技能 | 还需手动配置的依赖 |
|------|-------------------|
| tldraw-skill | `npm install -g @kitschpatrol/tldraw-cli` |
| drawio-skill | 下载安装 draw.io Desktop（https://github.com/jgraph/drawio-desktop/releases） |
| mermaid-skill | 无需配置 |
| excalidraw-skill | `cd ~/.claude/skills/excalidraw-skill/references && uv sync && uv run playwright install chromium` |
| baoyu-diagram | `bun` 或 `npx -y bun`（用于 SVG → PNG 导出） |
| baoyu-infographic | `bun` + 配置图像后端 API key（`baoyu-image-gen` EXTEND.md） |

---

## 五、一句话总结

> **mermaid** 是瑞士军刀（什么都能切，文本优先），**drawio** 是手术刀（正式精确，商务首选），**tldraw** 是马克笔（白板涂鸦，内部沟通），**excalidraw** 是故事板（视觉论证，教学演示），**baoyu-diagram** 是蓝图仪（深色科技 SVG，技术文档标配），**baoyu-infographic** 是印刷机（信息图工厂，社交媒体利器）。
>
> 六者互补，不是替代关系。根据"给谁看""在哪用""什么风格"来选择。

---

## 补充：MiniMax 多模态图像能力（非图表工具）

> 以下能力不属于传统"图表/架构图"范畴，但作为图像生成与理解的补充工具，可供参考。

**mmx-cli**（MiniMax CLI 1.0.15）提供了两个与图像直接相关的命令：

| 命令 | 功能 | 示例 |
|------|------|------|
| `mmx image generate` | 文生图 | `mmx image generate --prompt "赛博朋克城市夜景" --aspect-ratio 16:9` |
| `mmx vision describe` | 图理解 | `mmx vision describe --image image.jpg --prompt "描述这张图片"` |

- **image generate**：支持多种宽高比，默认输出到当前目录
- **vision describe**：支持本地文件、URL、文件 ID 三种输入方式，可针对图片提出具体分析要求

实测结果：两项能力均已验证可用（见《Claude Code 本机 Skills 全量汇总》9.5 节）。
