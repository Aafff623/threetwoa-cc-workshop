---
title: "画图工具选择指南"
type: reference
status: active
source_files:
  - reports/raw/ui-workflow/02-ui-skill-deep-research.md
  - docs/claude-code/diagram-skills-reference.md
updated: 2026-05-30
owner: threetwoa
---

# 画图工具选择指南

> 快速决策：选对工具比选贵工具更重要。

---

## 工具概览

| 工具 | 核心定位 | 输入方式 | 输出格式 | 学习成本 |
|------|----------|----------|----------|----------|
| Mermaid | 文本即图 | Markdown 代码块 | SVG / PNG | ★☆☆ 低 |
| Excalidraw | 手绘概念 | JSON 编辑 | SVG / PNG / JSON | ★★☆ 中 |
| draw.io | 专业制图 | GUI / XML | SVG / PNG / PDF / PPTX | ★★★ 高 |
| tldraw | 轻量速写 | JSON / Canvas | SVG / PNG | ★☆☆ 低 |
| baoyu-diagram | 暗色技术文档 | Prompt → SVG | SVG | ★☆☆ 低 |
| PPT (ppt-master) | 演示文稿 | Markdown / 文档 → PPTX | PPTX | ★★☆ 中 |

---

## 详细对比

### 1. Mermaid

**最佳场景**：流程图、时序图、类图、甘特图等标准 UML/结构图；嵌入 Markdown 文档即时渲染。

- **输出格式**：SVG、PNG（通过 mermaid-cli 渲染）
- **平台兼容性**：Windows / Mac / Linux（纯文本，零依赖）
- **学习成本**：低 — 语法直觉，10 分钟上手
- **限制**：
  - 布局自动生成，精细控制有限
  - 复杂自定义样式需要 CSS 覆盖
  - 不支持自由拖拽编辑

### 2. Excalidraw

**最佳场景**：概念草图、架构白板讨论、头脑风暴可视化；需要手绘风格传达"草案感"。

- **输出格式**：SVG、PNG、JSON（可再编辑）
- **平台兼容性**：Windows / Mac / Linux（Web + CLI）
- **学习成本**：中 — JSON schema 需要理解元素结构
- **限制**：
  - 手绘风格不适合正式交付文档
  - 通过 skill 生成时需构建 JSON，复杂图成本高
  - 精确对齐和尺寸控制较弱

### 3. draw.io

**最佳场景**：专业架构图、网络拓扑、UML 图、泳道图；需要丰富图形库和导出多格式。

- **输出格式**：SVG、PNG、PDF、PPTX、VSDX 等
- **平台兼容性**：Windows / Mac / Linux（桌面版 + VS Code 插件）
- **学习成本**：高 — shape 体系复杂，样式选项多
- **限制**：
  - 通过 skill 生成需要手写 XML，学习曲线陡峭
  - 生成文件较大
  - 自动布局能力有限，需要手动指定位置

### 4. tldraw

**最佳场景**：快速草图、简单流程图、一次性可视化；需要快速出图并导出。

- **输出格式**：SVG、PNG（通过 `@kitschpatrol/tldraw-cli` 导出）
- **平台兼容性**：Windows / Mac / Linux（Node.js CLI）
- **学习成本**：低 — JSON 结构简洁，少量元素即可成图
- **限制**：
  - 图形类型有限（矩形、椭圆、箭头、文本、线段）
  - 不支持 UML 专业图形
  - 主题自定义范围小

### 5. baoyu-diagram

**最佳场景**：技术文档配图、暗色主题架构图、专业级 SVG 嵌入 Markdown/博客。

- **输出格式**：独立 SVG 文件
- **平台兼容性**：Windows / Mac / Linux（Skill 调用，无额外依赖）
- **学习成本**：低 — 自然语言描述即可生成
- **限制**：
  - 固定暗色主题风格，无法切换亮色
  - 仅输出 SVG，不输出 PNG/PDF
  - 复杂交互式图表不支持

### 6. PPT (ppt-master)

**最佳场景**：演示文稿配图、幻灯片中嵌入图表、会议汇报材料。

- **输出格式**：PPTX（通过 SVG 中间格式转换）
- **平台兼容性**：Windows / Mac / Linux（Node.js + drawio-cli）
- **学习成本**：中 — 需要 Markdown → SVG → PPTX 流程理解
- **限制**：
  - PPTX 输出依赖 LibreOffice/drawio-cli 转换链
  - 不适合纯图表嵌入文档的轻量场景
  - 动画和过渡效果有限

---

## 决策流程图

```
需要画图？
  │
  ├─ 是演示/汇报场景？ ──── 是 ──→ PPT (ppt-master)
  │
  ├─ 需要手绘/概念感？ ──── 是 ──→ Excalidraw
  │
  ├─ 需要暗色专业 SVG 嵌入文档？ ── 是 ──→ baoyu-diagram
  │
  ├─ 需要快速文本出图？ ── 是 ──→ Mermaid
  │
  ├─ 需要交互编辑/多格式导出？ ── 是 ──→ draw.io
  │
  └─ 需要快速导出轻量图？ ── 是 ──→ tldraw
```

### 快速决策口诀

| 需求 | 工具 |
|------|------|
| 开会汇报 | PPT |
| 白板讨论 | Excalidraw |
| 技术文档配图 | baoyu-diagram |
| Markdown 内嵌 | Mermaid |
| 专业交付物 | draw.io |
| 一次性草图 | tldraw |

---

## 组合策略

实际工作中常需要组合使用：

1. **Mermaid + baoyu-diagram**：Mermaid 做草稿验证逻辑，baoyu-diagram 生成正式配图
2. **tldraw + draw.io**：tldraw 快速出原型，draw.io 精细打磨交付
3. **Excalidraw + PPT**：概念讨论用 Excalidraw，定稿后导入 PPT 汇报
4. **Mermaid + PPT**：Mermaid 导出 SVG 后作为 PPT 素材嵌入

---

## Source Material

- `reports/raw/ui-workflow/02-ui-skill-deep-research.md` — UI Skill 深度调研，包含 Skill 依赖图中 diagram 工具定位
- `docs/claude-code/diagram-skills-reference.md` — Claude Code 画图技能参考文档