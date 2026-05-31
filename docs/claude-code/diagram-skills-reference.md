---
title: "Claude Code 画图技能参考"
type: reference
status: active
source_files:
  - "archive/2026-05-30/Claude Code 画图技能调研报告.md"
updated: 2026-05-31
owner: threetwoa
---

# Claude Code 画图技能（Diagram Skills）参考

> 调研时间：2026-05-26
> 技能来源：GitHub 开源社区 / 内置
> 安装位置：`~/.claude/skills/`

---

## 一、六款技能总览

| 维度 | tldraw-skill | drawio-skill | mermaid-skill | excalidraw-skill | baoyu-diagram | baoyu-infographic |
|------|-------------|--------------|---------------|------------------|---------------|-------------------|
| **作者** | Agents365-ai | Agents365-ai | WH-2099 | coleam00 | JimLiu | JimLiu |
| **Star 数** | 39 | ~1.9k | 56 | ~3.3k | 内置 | 内置 |
| **输出格式** | `.tldr` JSON → PNG/SVG | `.drawio` XML → PNG/SVG/PDF/JPG | `.md` Mermaid 代码 | `.excalidraw` JSON → PNG | `.svg` 纯矢量 | `.png` 栅格图 |
| **核心风格** | 手绘白板风 | 干净专业风 | 文本驱动 / 自动布局 | 草图风 / 视觉论证 | 深色科技风 | 多元插画风 |
| **依赖** | Node.js + `tldraw-cli` | draw.io Desktop CLI | 无（纯文本） | Python + `uv` + Playwright | Bun/Node.js | Bun/Node.js + 图像后端 |
| **自检** | Vision 自检（PNG） | Vision 自检（PNG） | 无 | 渲染后视觉自检 | 代码级验证 | 无 |
| **平台** | 全平台 | 全平台 | 全平台 | 全平台 | 全平台 | 全平台 |

---

## 二、逐个技能精要

### 1. tldraw-skill —— 手绘白板

**GitHub**: https://github.com/Agents365-ai/tldraw-skill

- **定位**：轻松、非正式的可视化，内部文档/白板讲解
- **6 种预设**：Architecture、Flowchart、Sequence、ML/DL 神经网络、ERD、UML
- **核心亮点**：Vision 自检闭环（自动修复形状重叠、文字截断、箭头断连）
- **优势**：手绘风自然，10 色语义系统，Windows 无额外桌面依赖
- **劣势**：时序图/ERD/UML 是近似实现，手绘风不适合正式场合

### 2. drawio-skill —— 干净专业

**GitHub**: https://github.com/Agents365-ai/drawio-skill

- **定位**：商务、学术、正式交付场景
- **核心特性**：导出格式最全（PNG/SVG/PDF/JPG），支持嵌入 XML 的可编辑图片，泳道/容器原生支持
- **关键注意**：PNG 修复脚本（`-e` 参数导出时 IEND chunk 缺失），macOS sandbox 需 fallback
- **优势**：1.9k stars，社区最成熟，正式感强，AWS 图标原生支持
- **劣势**：必须安装 draw.io Desktop，Linux headless 需 `xvfb-run`

### 3. mermaid-skill —— 文本驱动

**GitHub**: https://github.com/WH-2099/mermaid-skill

- **定位**：文档嵌入、版本控制、快速随手画
- **23 种图表**：Flowchart、Sequence、Class、State、ER、Gantt、Pie、Mindmap、Timeline、Git Graph、C4、Sankey 等
- **优势**：零依赖，版本控制友好，Markdown 原生嵌入（GitHub/Notion/Obsidian 直接渲染）
- **劣势**：无视觉自检，布局由引擎控制，复杂图表可读性有限

### 4. excalidraw-skill —— 草图风 / 视觉论证

**GitHub**: https://github.com/coleam00/excalidraw-diagram-skill

- **定位**：**"diagrams that argue visually"** —— 图表是视觉论证，不是信息罗列
- **核心哲学**：同构测试（去掉文字结构能否传达概念）、教育测试、形状即意义
- **深度分层**：Summary Flow → Section Boundaries → Detail Inside（证据工件）
- **优势**：3.3k stars 社区最热，设计理念最先进，草图风暗示"迭代中"适合汇报
- **劣势**：渲染依赖最重（Python `uv` + Playwright + Chromium），大图需分 section 构建

### 5. baoyu-diagram —— 深色科技 SVG

**GitHub**: https://github.com/JimLiu/baoyu-skills#baoyu-diagram

- **定位**：技术文档、README、博客 dark mode 配图
- **9 种类型**：Architecture、Flowchart、Sequence、Structural、Mind Map、Timeline、Illustrative、State Machine、Data Flow
- **设计系统**：slate-900 背景 + JetBrains Mono 字体 + 语义配色（Cyan=前端、Emerald=后端、Violet=DB、Amber=云、Rose=安全）
- **优势**：零外部依赖，矢量无损，中文优化（Noto Sans SC 回退）
- **劣势**：手写 SVG 坐标，复杂图表手动定位累，仅 dark theme

### 6. baoyu-infographic —— 信息图工厂

**GitHub**: https://github.com/JimLiu/baoyu-skills#baoyu-infographic

- **定位**：将结构化内容转化为出版级信息图，适合社交媒体/公众号/小红书
- **21 种布局**：linear-progression、bento-grid、funnel、hub-spoke、iceberg、comic-strip 等
- **22 种视觉风格**：craft-handmade、cyberpunk-neon、pixel-art、chalkboard、origami 等
- **优势**：462 种 layout×style 组合，完整内容分析→结构化→视觉化工作流
- **劣势**：依赖图像生成后端 API key，生成成本高，非即时出图

---

## 三、横向选择指南

### 按场景选

| 场景 | 推荐技能 | 理由 |
|------|---------|------|
| 内部技术文档 / 白板讲解 | tldraw-skill | 手绘风轻松自然，vision 自检闭环 |
| 商务 PPT / 学术论文 / 正式交付 | drawio-skill | 干净专业，支持 PDF 导出和泳道 |
| GitHub README / 博客 / Markdown 文档 | mermaid-skill | 纯文本嵌入，版本控制友好 |
| 产品汇报 / 概念演示 / 教学视频 | excalidraw-skill | 草图风暗示"迭代中"，视觉论证能力强 |
| 技术文档/博客 dark mode 配图 | baoyu-diagram | 深色科技 SVG，矢量无损，中文友好 |
| 公众号/小红书/社交媒体信息图 | baoyu-infographic | 21 布局 × 22 风格，出版级输出 |

### 按复杂度选

| 复杂度 | 推荐 |
|--------|------|
| 随手画（< 5 节点）| mermaid-skill（最快，零依赖） |
| 中等复杂度（5-15 节点）| tldraw-skill / baoyu-diagram |
| 高复杂度（> 15 节点，需嵌套容器）| drawio-skill（swimlane + 分组最强） |
| 需要"讲故事"的教学/演示图 | excalidraw-skill（多 zoom 层级 + 证据工件） |
| 高密度知识总结图 | baoyu-infographic（信息图叙事） |

### 按平台/环境选

| 环境 | 推荐 |
|------|------|
| Windows（无 WSL）| tldraw-skill / mermaid-skill / baoyu-diagram |
| macOS（有 Homebrew）| drawio-skill（brew install --cask drawio） |
| Linux headless / CI | mermaid-skill / baoyu-diagram（零 GUI 依赖） |
| 有 Python + uv 环境 | excalidraw-skill（渲染管道完整） |
| 有图像生成 API key | baoyu-infographic（需 backend） |

---

## 四、一句话总结

> **mermaid** 是瑞士军刀（什么都能切，文本优先），**drawio** 是手术刀（正式精确，商务首选），**tldraw** 是马克笔（白板涂鸦，内部沟通），**excalidraw** 是故事板（视觉论证，教学演示），**baoyu-diagram** 是蓝图仪（深色科技 SVG，技术文档标配），**baoyu-infographic** 是印刷机（信息图工厂，社交媒体利器）。
>
> 六者互补，不是替代关系。根据"给谁看""在哪用""什么风格"来选择。

---

## Source Material

- `archive/2026-05-30/Claude Code 画图技能调研报告.md` — 原始调研报告，含完整安装状态、依赖配置、工作流程详解
