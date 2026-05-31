---
title: "Tool Routing — 工具路由速查表"
category: claude-code
last_updated: 2026-05-31
---

# Tool Routing

## 代码结构与影响分析

| 目标 | 优先工具 |
|---|---|
| 找符号 / 定位代码 | `codegraph_search` |
| 看调用链 / 架构路径 | `codegraph_trace` / `gitnexus-exploring` |
| 改代码前影响评估 | `codegraph_impact` |
| Debug 根因 | `codegraph_trace` → `gitnexus-debugging` |
| PR / diff review | `gitnexus-pr-review` → Codex |
| 方案压力测试 | `grill-me` / `grill-with-docs` |

结构性问题优先用 CodeGraph，文字内容 / 日志 / 注释用 grep/ripgrep。

---

## 搜索与文档

| 目标 | 工具 |
|---|---|
| 官方文档 / API | Context7 |
| 通用实时搜索 | AnySearch |
| 中文社区讨论 | zhihu-search |
| 快速网页搜索 | MiniMax WebSearch |

**注意：** 工具不可用时说清楚缺什么，不要假装查到了。

---

## 图表 / 文档 / 多媒体

| 需求 | 工具 |
|---|---|
| 架构图 / 专业图表 | drawio-skill |
| 手绘白板风 | excalidraw / tldraw |
| Markdown 内嵌图 | mermaid |
| 深色科技风 SVG | baoyu-diagram |
| 信息图 | baoyu-infographic |
| PPT / slides | baoyu-slide-deck / ppt-master |
| 图片 / 语音 / 音乐 / 视频 | mmx-cli |

---

## 可选性声明

以上工具列表基于当前环境配置。如果某个工具不可用：

1. 明确说明该工具不可用
2. 提供替代方案（如 Context7 不可用时用 WebSearch）
3. 不假装工具可用或返回伪造结果
