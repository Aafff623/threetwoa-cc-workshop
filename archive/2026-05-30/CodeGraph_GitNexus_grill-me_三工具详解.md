# CodeGraph · GitNexus · grill-me 三工具详解

> 整理时间：2026-05-27
> 目标读者：独立开发者 / 技术Lead，想用 AI agent 做代码分析和项目探索

---

## 一、工具定位总览

| 工具 | 层级 | 核心职责 | 回答什么问题 |
|------|------|----------|------------|
| **CodeGraph** | **索引层** | 代码库静态分析 → 知识图谱（MCP server） | "X 在哪？""谁调用谁？""改 X 会炸什么？" |
| **GitNexus** | **理解层** | 动态探索 + 推理 + 执行（Claude Code skills） | "这个模块怎么运作？""执行流是什么？" |
| **grill-me** | **验证层** | 计划/设计评审，拷问决策树（Claude Code skills） | "这个方案可行吗？""盲点在哪？" |

```
新项目开荒：
  CodeGraph init -i  →  索引建立
       ↓
  CodeGraph context  →  项目概览（3-5 calls）
       ↓
  GitNexus exploring  →  架构探索 + 执行流 trace
       ↓
  grill-me            →  方案评审

老项目探索：
  CodeGraph search    →  快速定位符号
  CodeGraph trace     →  追踪跨模块调用链
  GitNexus debugging  →  定位 bug 根因
  GitNexus impact     →  评估变更影响
  grill-me-with-docs  →  对着现有文档拷问设计
```

---

## 二、CodeGraph — 本地代码知识图谱

### 核心理念

> **Trust codegraph results. Don't re-verify with grep.**

CodeGraph 把代码库预先解析成 SQLite 图谱，agent 查询时**毫秒级响应**，不需要每次都 grep + Read 扫描全库。

### 工作原理

```
文件 → tree-sitter 解析（AST）→ 符号/边提取 → ReferenceResolver → SQLite 图谱
                                                              ↓
                                          file watcher（增量同步，~1s 延迟）
                                                              ↓
                                              MCP server（暴露给 agent）
```

### 核心工具链

| MCP 工具 | 回答什么问题 | 性能目标 |
|---------|------------|---------|
| `codegraph_status` | 索引准备好了吗？有多大？ | 即时 |
| `codegraph_search` | 找名为 X 的符号/文件 | FTS5 全文搜索，毫秒 |
| `codegraph_context` | PR/feature/area 的全貌是什么？ | 1 call = search+node+callers+callees |
| `codegraph_node` | 显示符号 X 的源码/签名/文档 | 单符号，即时 |
| `codegraph_callers` | 谁调用了这个函数？ | 反向调用链 |
| `codegraph_callees` | 这个函数调用了什么？ | 正向调用链 |
| `codegraph_trace` | X 是如何触发 Y 的？（完整路径） | **ONE call 返回全程，含动态 dispatch  hops** |
| `codegraph_impact` | 改 X 会炸什么？ | BFS 影响半径 |
| `codegraph_explore` | 展示多个相关符号的源码（ONE capped call） | 一次拿多个符号 |
| `codegraph_files` | 目录 X 下有哪些文件？ | 目录树 |

### trace 的独特价值 — 动态 dispatch 桥接

grep 跟不过去的调用链，CodeGraph 可以：
- **React re-render**：`setState` → `render` → JSX child component
- **Callback/Observer**：事件触发 → listener → handler
- **框架路由**：Express 路由 → controller → service → ORM

这些"跨边界"的动态 hops，trace 可以一步到位展示全程。

### 新项目开荒流程

```bash
# 1. 进入项目
cd my-project

# 2. 建立索引（首次 ~30s-5min，看仓库大小）
codegraph init -i

# 3. agent 即可通过 MCP 调用
# 常用开荒组合：
codegraph context --task "项目概览"    # 全局了解
codegraph search "auth"                 # 找认证相关符号
codegraph trace from=login to=verify  # 登录→验证完整链路
```

### 老项目探索流程

```bash
# 增量同步（文件 watcher 自动处理）
codegraph sync

# 查具体问题
codegraph search "SessionService"
codegraph node "SessionService.getToken"
codegraph caller's "SessionService.getToken"

# 改代码前先问影响
codegraph impact "PaymentProcessor"
```

### 局限

- **索引有 ~1s 延迟**：刚写的代码查不到，需要 `codegraph sync`
- **动态代码有限制**：通过启发式 bridge 动态 dispatch，不保证 100% 覆盖
- **没有 lint/类型检查**：图谱是静态 AST，不是类型系统

---

## 三、GitNexus — 代码理解与探索

### 核心理念

> **Don't loop `codegraph_node` over many symbols** — one `codegraph_explore` call returns several symbols' source in ONE capped call.

GitNexus 是 Claude Code 的 skill 层，调用 CodeGraph MCP 做深度推理。它不是替代 CodeGraph，而是 CodeGraph 之上的推理引擎。

### 7 个 Skill 分工

| Skill | 触发关键词 | 回答什么问题 |
|-------|-----------|------------|
| `gitnexus-exploring` | how does X work, show me auth flow | 模块架构 + 执行流 |
| `gitnexus-debugging` | why is X failing, trace this bug | bug 根因定位 |
| `gitnexus-impact-analysis` | is it safe to change X | 变更影响评估 |
| `gitnexus-refactoring` | rename function, move file | 安全重构路径 |
| `gitnexus-pr-review` | review this PR | PR 变更 + 风险 |
| `gitnexus-cli` | index repo, list repos | 索引管理 |
| `gitnexus-guide` | what GitNexus tools | 工具使用指南 |

### 典型使用流程

```
# 你：/gitnexus-exploring
# agent：
#   1. codegraph_context 确定 area
#   2. codegraph_trace 追踪执行流
#   3. codegraph_node 展示关键符号源码
#   4. 整理成结构化回答
```

### 新项目开荒组合

```bash
# 最佳开荒组合（CodeGraph + GitNexus）
1. codegraph init -i           # 建索引
2. codegraph context            # 项目全貌
3. gitnexus-exploring           # 按模块深入 trace
4. gitnexus-impact-analysis    # 评估核心依赖
```

### grill-me-with-docs 的独特作用

这是 **grill-me** 的文档版，专门针对**有现有文档/领域模型**的项目。

**grill-me vs grill-me-with-docs 区别：**
- `grill-me`：纯推理，拷问你自己的计划/设计思路
- `grill-me-with-docs`：加载现有 `CONTEXT.md` / ADR / 设计文档，对文档里的决策树逐条验证

### 三工具配合流程（完整链路）

```
┌─────────────────────────────────────────────────────┐
│  Step 1: CodeGraph 快速定位（3-5 calls）              │
│  codegraph search → codegraph context → 找准 area   │
└─────────────────────┬───────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│  Step 2: GitNexus 深度理解（2-3 calls）              │
│  codegraph trace 执行流                             │
│  gitnexus-exploring 架构解读                       │
│  gitnexus-debugging bug trace                      │
└─────────────────────┬───────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────────┐
│  Step 3: grill-me-with-docs 评审（1-2 calls）       │
│  加载 CONTEXT.md/ADR                                │
│  对着文档逐条验证决策树                             │
│  更新文档里的盲点                                   │
└─────────────────────────────────────────────────────┘
```

---

## 四、场景化最佳实践

### 场景 A：新项目开荒（greenfield）

```
推荐流程：
  1. codegraph init -i           # 建索引（30s-5min）
  2. codegraph context            # 一次性全局概览
  3. gitnexus-exploring          # 按模块逐个 trace
  4. gitnexus-impact-analysis   # 标记核心模块/高风险区
  5. grill-me-with-docs          # 拷问设计决策（如果有文档）
  6. 开始写代码
```

**为什么这样做：**
- CodeGraph init 一次性建索引，之后所有查询都是毫秒级
- 先全局概览，再按模块深入，避免盲人摸象
- 核心模块先用 impact 分析标记，开荒时不碰高风险区

### 场景 B：老项目探索（brownfield）

```
推荐流程：
  1. codegraph status            # 检查索引状态，必要时 sync
  2. codegraph search + context   # 定位目标 area
  3. codegraph trace             # 跨模块调用链（这是 grep 跟不过去的）
  4. gitnexus-debugging          # 如果是修 bug
  5. gitnexus-impact-analysis   # 改之前先评估影响
  6. grill-me-with-docs         # 对着现有文档拷问方案
```

**为什么这样做：**
- 老项目往往有复杂的跨模块依赖，grep 效率极低
- trace 可以一步到位展示"请求→handler→service→DB"全程
- impact 分析防止改一个地方炸三个地方

### 场景 C：接手别人的项目（onboarding）

```
推荐流程：
  1. codegraph context            # 20 分钟全局概览
  2. gitnexus-exploring          # 按职责模块深入
  3. codegraph trace → auth/user/payment 等核心流程  # 走通关键链路
  4. 画架构图（tldraw/drawio/excalidraw）           # 输出存档
  5. 写 CONTEXT.md               # 沉淀给后人
```

### 场景 D：Code Review / PR Review

```
推荐流程：
  1. gitnexus-pr-review          # 变更内容 + 风险
  2. codegraph trace             # 走通新增的调用链
  3. codegraph impact           # 评估对现有代码的影响
  4. grill-me-with-docs         # 对着设计文档验证是否合理
```

---

## 五、工具对比与选择

| 维度 | CodeGraph | GitNexus | grill-me-with-docs |
|------|----------|----------|-------------------|
| **回答问题** | "X 在哪？" | "X 怎么运作？" | "这个方案对不对？" |
| **输入** | 符号名/文件 | 模块名/问题 | 计划/设计文档 |
| **输出** | 位置/调用链/影响 | 架构解读/执行流 | 决策树验证/盲点 |
| **响应速度** | 毫秒（已索引） | 秒（多 call） | 秒（1-2 call） |
| **适用阶段** | 全流程 | 理解 + 调试 | 方案评审 |
| **依赖** | 需要 `init -i` | 依赖 CodeGraph MCP | 需要有文档 |

---

## 六、常见坑与避坑

### 1. CodeGraph 索引 lag
**问题**：刚写的代码查不到
**解决**：`codegraph sync`，或等 ~1s file watcher 自动同步

### 2. GitNexus 滥用
**问题**：问简单问题也调用 GitNexus，白白多一层开销
**解决**：简单定位用 `codegraph_search`，GitNexus 留给架构/trace 类问题

### 3. grill-me 问错时机
**问题**：方案还没想清楚就用 grill-me，拷问不出有价值的东西
**解决**：先有草案，再 grill-me 拷问；没草案时先 gitnexus-exploring

### 4. trace 找不到路径
**问题**：动态 dispatch 断链，trace 在中间断了
**解决**：这是已知限制，trace 断了的地方需要用 `codegraph_node` + 手动推理桥接

---

## 七、总结

| 你的情况 | 推荐第一步 |
|---------|---------|
| **新项目开荒** | `codegraph init -i` → `codegraph context` |
| **老项目探索** | `codegraph status` → `codegraph search` |
| **修 bug** | `codegraph trace` → `gitnexus-debugging` |
| **改核心代码前** | `codegraph impact` → `grill-me-with-docs` |
| **接手新项目** | `codegraph context` → 画架构图 → 写 CONTEXT.md |

**三工具不是竞争关系，是分工关系：**
- CodeGraph = 索引 + 快查
- GitNexus = 推理 + 解读
- grill-me-with-docs = 验证 + 质疑

配合使用时，**先用 CodeGraph 定位，再用 GitNexus 理解，最后用 grill-me 质疑**，形成一个完整的学习/分析闭环 ~(˶‾‿‾˶)