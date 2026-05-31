---
title: "Claude Code MCP 服务器指南"
type: reference
status: active
source_files:
  - "docs/claude-code/codegraph-gitnexus-guide.md"
updated: 2026-05-31
owner: threetwoa
---

# Claude Code MCP 服务器指南

> 目标读者：使用 Claude Code 的开发者，需要快速判断"该调用哪个 MCP"
> 覆盖范围：当前环境已连接的 11 个 MCP 服务器

---

## 目录

1. [总览：什么是 MCP](#总览什么是-mcp)
2. [按功能域分组速查](#按功能域分组速查)
3. [代码理解](#代码理解)
4. [UI 组件](#ui-组件)
5. [搜索与爬取](#搜索与爬取)
6. [项目管理](#项目管理)
7. [系统工具](#系统工具)
8. [Source Material](#source-material)

---

## 总览：什么是 MCP

**MCP（Model Context Protocol）** 是 Anthropic 提出的开放协议，让 Claude Code 能够连接外部工具和服务。每个 MCP 服务器暴露一组专用工具，Claude Code 根据用户请求自动选择合适的工具调用。

### 如何判断该用哪个 MCP

| 你的问题/需求 | 应该调用的 MCP |
|---|---|
| "这段代码怎么工作的？" / "谁调用了这个函数？" | `codegraph` |
| "React useEffect 的依赖数组规则是什么？" | `context7` |
| "HeroUI 的 Sheet 组件怎么用？" | `heroui-pro` |
| "搜索最新的 Next.js 15 特性" | `Firecrawl` / `BraveSearch` |
| "分析这张设计稿截图" | `MiniMax` |
| "在 Linear 里创建一个 Bug" | `linear` |
| "记住这个技术决策" | `memory` |
| "我想一步步分析这个复杂问题" | `sequential-thinking` |

### 核心原则

- **先用专用 MCP，后用通用工具**：查询代码结构优先用 `codegraph`，不要先 `grep`
- **文档查询优先 `context7`**：比 web 搜索更精准，覆盖最新版本
- **搜索优先 `Firecrawl`**：比内置搜索返回更丰富的结果（含全文内容）
- **HeroUI 问题直接问 `heroui-pro`**：比查文档更快，含 Pro 组件

---

## 按功能域分组速查

```
代码理解    →  codegraph, context7
UI 组件     →  heroui-pro
搜索爬取    →  Firecrawl, BraveSearch, MiniMax
项目管理    →  linear
系统工具    →  memory, sequential-thinking, filesystem, grep
```

---

## 代码理解

### codegraph — 代码图谱知识库

**核心用途**：以知识图谱形式索引整个代码库的符号、调用关系和影响范围，提供亚毫秒级的代码查询能力。

**核心场景**：
1. 进入陌生代码库，快速理解模块结构和调用链
2. 修改代码前，分析变更的影响范围（会 break 什么）
3. 追踪数据流："用户请求如何到达数据库层？"

**触发条件**：
- 问 "how does X work" / "这段代码怎么工作的"
- 需要追踪函数 A 到函数 B 的调用路径
- 修改前需要知道 "改了这个会 break 什么"
- 探索不熟悉的代码区域

**主要工具**：
- `codegraph_context` — **首选入口**，一次调用返回任务相关的符号、调用者和被调用者
- `codegraph_trace` — 追踪从符号 A 到符号 B 的完整调用路径（含动态 dispatch）
- `codegraph_explore` — 批量查看多个相关符号的源码
- `codegraph_impact` — 分析修改某个符号的影响半径
- `codegraph_search` — 按名称搜索符号

**使用提示**：`codegraph_context` 是黄金入口工具，优先用它代替自己写 `grep + read` 循环。

---

### context7 — 编程库文档查询

**核心用途**：查询编程库和框架的最新官方文档，获取准确的 API 签名、配置参数和使用示例。

**核心场景**：
1. 不确定某个 React/Next.js/Prisma API 的最新用法
2. 需要框架的配置选项完整列表
3. 排查 "为什么这个 API 行为变了"（版本迁移问题）

**触发条件**：
- 询问任何 library / framework / SDK / CLI 的用法
- 需要确认 API 语法或配置键
- 怀疑训练数据可能过时（优先用 context7 而非凭记忆回答）

**主要工具**：
- `resolve-library-id` — 将库名称解析为 Context7 兼容的 ID（必须先调用）
- `query-docs` — 查询指定库的文档和代码示例

**使用提示**：每次查询需先 `resolve-library-id` 获取库 ID，再 `query-docs` 提问。不要用于业务逻辑调试或代码审查。

---

## UI 组件

### heroui-pro — HeroUI 组件文档服务器

**核心用途**：统一查询 HeroUI v3（OSS + Pro）组件的 API 文档、CSS 样式、主题变量和源码实现。

**核心场景**：
1. 开发 UI 时需要确认 HeroUI 组件的 props 和用法
2. 需要获取组件的 BEM CSS 类名进行样式覆盖
3. 查询 Pro 主题的设计 token 和变量

**触发条件**：
- 使用 `@heroui/react` 或 `@heroui-pro/react` 组件时
- 需要组件的 compound API（如 `Sheet.Trigger`, `Sheet.Content`）
- 需要主题变量或 CSS 自定义样式

**主要工具**：
- `list_components` — 列出所有可用组件（区分 OSS 和 Pro）
- `get_component_docs` — 获取组件完整 MDX 文档（props + 示例）
- `get_css` — 获取组件 BEM CSS（含状态选择器和修饰符）
- `get_theme_variables` — 获取 Pro base tokens 和主题变体
- `get_component_source_code` — 查看 OSS 组件源码（Pro 源码不暴露）

**使用提示**：HeroUI v3 需要 Tailwind CSS v4，不需要 Provider，交互元素用 `onPress` 而非 `onClick`。

---

## 搜索与爬取

### Firecrawl — 网页爬虫与监控

**核心用途**：网页搜索、单页抓取、整站爬取、结构化数据提取和变更监控。

**核心场景**：
1. 搜索技术文档或新闻，获取带全文内容的搜索结果
2. 抓取特定网页并提取结构化数据（如价格、产品信息）
3. 监控网页变更（如竞品价格、API 文档更新）

**触发条件**：
- 需要 web 搜索（优先于内置搜索）
- 需要从网页提取特定字段（用 `jsonOptions` + schema）
- 需要监控页面变更（创建 monitor）

**主要工具**：
- `firecrawl_search` — **首选搜索工具**，返回带全文内容的搜索结果
- `firecrawl_scrape` — 抓取单页内容，支持 JSON 结构化提取
- `firecrawl_crawl` — 整站爬取，适合获取多页面内容
- `firecrawl_map` — 发现网站上的所有 URL
- `firecrawl_extract` — 从多个 URL 提取结构化数据
- `firecrawl_monitor_create` — 创建页面变更监控

**使用提示**：搜索后调用 `firecrawl_search_feedback` 可退还 1 credit。提取特定数据时必须用 JSON format + schema，不要用 markdown。

---

### BraveSearch — 网页搜索

**核心用途**：通过 Brave Search API 进行网页搜索和本地商家搜索。

**核心场景**：
1. 快速获取网页搜索结果（标题、链接、摘要）
2. 搜索本地商家和服务（如 "pizza near Central Park"）

**触发条件**：
- 需要快速搜索网页信息
- 需要本地商家/地点信息

**主要工具**：
- `brave_web_search` — 通用网页搜索
- `brave_local_search` — 本地商家和地点搜索

**使用提示**：Firecrawl 的 `firecrawl_search` 返回内容更丰富（含全文），优先用 Firecrawl。BraveSearch 适合快速获取摘要或本地搜索。

---

### MiniMax — 视觉与搜索

**核心用途**：图像分析和网页搜索（通过 MiniMax AI 平台）。

**核心场景**：
1. 分析图片内容（设计稿、截图、图表、照片）
2. 执行网页搜索获取实时信息

**触发条件**：
- 用户上传或引用图片文件（.jpg/.png/.webp 等）
- 需要图像理解、OCR、设计稿分析
- 需要替代搜索渠道

**主要工具**：
- `understand_image` — 分析图片内容，提取信息
- `web_search` — 网页搜索

**使用提示**：`understand_image` 是分析截图、设计稿、图表的首选工具。支持本地文件路径和 URL。

---

## 项目管理

### linear — 项目管理

**核心用途**：在 Linear 中创建、更新、搜索 issue 和添加评论。

**核心场景**：
1. 将发现的 bug 或技术债务创建为 Linear issue
2. 将 implementation plan 拆分为多个 issue
3. 查询分配给自己的 issue 列表

**触发条件**：
- 需要将任务/bug/需求录入 Linear
- 需要查询或更新现有 issue
- 需要给 issue 添加评论或更新状态

**主要工具**：
- `create_issue` — 创建新 issue（需 teamId）
- `update_issue` — 更新 issue 标题、描述、状态、优先级
- `search_issues` — 按条件搜索 issue
- `get_user_issues` — 获取指定用户的 issue 列表
- `add_comment` — 给 issue 添加评论

**使用提示**：创建 issue 时 `teamId` 是必填字段。可通过 `search_issues` 先查询获取 team 信息。

---

## 系统工具

### memory — 持久化记忆图谱

**核心用途**：手动维护跨会话的结构化知识图谱，存储实体、关系和观察。

**核心场景**：
1. 记录重要的技术决策和架构选择
2. 存储项目特定的领域知识和术语
3. 建立概念之间的关系图谱

**触发条件**：
- 需要手动记录结构化知识（非自动）
- 需要建立实体之间的关系
- 需要跨会话检索之前记录的知识

**主要工具**：
- `create_entities` — 创建新实体（带类型和观察）
- `add_observations` — 给现有实体添加观察
- `create_relations` — 建立实体间关系
- `search_nodes` — 搜索知识图谱
- `read_graph` — 读取整个知识图谱

**使用提示**：memory MCP 是**手动工具**，不会自动记录对话。如需自动跨会话记忆，使用 Claude-Mem 插件（见 `claude-mem-guide.md`）。两者互补：Claude-Mem 自动捕获，memory MCP 手动维护结构化知识。

---

### sequential-thinking — 动态反思问题解决

**核心用途**：通过多步 thinking 过程进行复杂问题的分析和推理，支持回溯和修正。

**核心场景**：
1. 分析复杂的架构决策，需要多维度权衡
2. 排查棘手的 bug，需要系统性假设验证
3. 设计复杂功能，需要逐步拆解和验证

**触发条件**：
- 问题复杂，需要多步推理
- 需要记录思考过程并允许回溯修正
- 需要生成和验证假设

**主要工具**：
- `sequentialthinking` — 提交当前思考步骤，可标记为 revision 或 branch

**使用提示**：设置 `totalThoughts` 预估总步数，可随时调整。支持 `isRevision` 修正之前步骤，`branchFromThought` 分叉新思路。

---

### filesystem — 文件系统操作

**核心用途**：提供文件读写、目录遍历等文件系统操作能力。

**核心场景**：
1. 跨目录的文件操作
2. 批量读取或写入文件
3. 目录结构遍历

**触发条件**：
- 需要操作文件系统（读写文件、遍历目录）
- 需要批量处理文件

**主要工具**：
- 文件读取、写入、目录遍历等基础文件操作

**使用提示**：Claude Code 内置的 `Read` / `Write` / `Glob` 工具已覆盖大部分文件操作需求。filesystem MCP 主要用于补充场景或跨项目文件操作。

---

### grep — 代码搜索

**核心用途**：提供文件内容搜索和正则匹配功能。

**核心场景**：
1. 搜索代码中的特定字符串或模式
2. 正则匹配查找复杂模式
3. 批量文件内容分析

**触发条件**：
- 需要搜索文件内容
- 需要正则匹配

**主要工具**：
- 文件内容搜索、正则匹配等

**使用提示**：Claude Code 内置的 `Grep` 工具功能相同且更集成。优先使用内置 `Grep`，grep MCP 作为补充。

---

## 快速决策表

| 你要做什么 | 调用哪个 MCP | 首选工具 |
|---|---|---|
| 理解代码结构 | `codegraph` | `codegraph_context` |
| 查框架 API 文档 | `context7` | `query-docs` |
| 用 HeroUI 组件 | `heroui-pro` | `get_component_docs` |
| 搜索网页信息 | `Firecrawl` | `firecrawl_search` |
| 分析图片 | `MiniMax` | `understand_image` |
| 创建 Linear issue | `linear` | `create_issue` |
| 记录结构化知识 | `memory` | `create_entities` |
| 复杂问题推理 | `sequential-thinking` | `sequentialthinking` |
| 文件系统操作 | `filesystem` / 内置工具 | `Read` / `Write` |
| 代码内容搜索 | `grep` / 内置 `Grep` | `Grep` |

---

## Source Material

- `docs/claude-code/codegraph-gitnexus-guide.md` — 格式参考（frontmatter 和 Source Material 章节结构）
- `docs/claude-code/claude-mem-guide.md` — memory MCP 与 Claude-Mem 插件的区别说明
- `docs/claude-code/tri-layer-workflow.md` — 三层工作流中的工具路由说明
- MCP Server 运行时注入的指令文本（codegraph, context7, heroui-pro, Firecrawl 等）
