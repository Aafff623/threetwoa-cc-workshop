# 目标架构设计：my-claude

## 1. 架构设计目标

### 1.1 核心命题

`my-claude` 不是 prompt 仓库，而是 Claude Code 的** harness 配置系统**。Prompt 只是内容，harness 才是系统。

### 1.2 设计原则

| 原则 | 含义 |
|------|------|
| **Agent / Command / Skill 分工明确** | Agent 做决策，Command 执行动作，Skill 封装可复用能力 |
| **.claude/ 只放真正被执行的配置** | 不囤积，不装饰，每个文件都有运行时职责 |
| **docs/ 放长期精炼知识** | 经过验证、结构化、可复用的知识资产 |
| **reports/ 保留原始调研** | 未加工的调研过程，与 docs/ 形成"生-熟"分离 |
| **registry/ 负责索引和资产注册** | 机器可读的索引，支撑检索和自动化 |
| **templates/ 负责可复制模板** | 即拿即用的模板文件，降低创建成本 |
| **archive/ 负责历史归档** | 过期但可能仍有参考价值的材料 |

### 1.3 反模式清单

- ❌ 把 prompt 当知识（prompt 是消耗品，知识是资产）
- ❌ .claude/ 里堆满从不执行的文件
- ❌ 调研报告和精炼知识混在同一目录
- ❌ 没有索引，靠记忆找文件
- ❌ 没有归档机制，历史文件堆积

---

## 2. 目标文件树

```
my-claude/
├── .claude/                          # Claude Code 运行时配置
│   ├── settings.json                 # 项目级设置（权限、模型偏好）
│   ├── settings.local.json           # 本地覆盖（敏感信息、个人偏好）
│   ├── CLAUDE.md                     # 项目上下文（自动加载）
│   ├── AGENTS.md                     # Agent 定义和分工
│   ├── hooks/                        # 生命周期钩子
│   │   ├── pre-command.md            # 命令执行前触发
│   │   ├── post-command.md           # 命令执行后触发
│   │   └── stop.md                   # Stop Hook（instinct 演化）
│   ├── skills/                       # Skill 定义
│   │   ├── skill-a/
│   │   │   ├── SKILL.md              # Skill 入口文档
│   │   │   ├── scripts/              # Skill 执行脚本
│   │   │   └── templates/            # Skill 专用模板
│   │   └── skill-b/
│   │       └── ...
│   └── commands/                     # 自定义命令
│       ├── cmd-name/
│       │   └── COMMAND.md            # 命令定义
│       └── ...
│
├── docs/                             # 长期精炼知识
│   ├── README.md                     # 知识库导航
│   ├── index.md                      # 全库索引
│   ├── guides/                       # 操作指南
│   │   ├── workflow-guide.md
│   │   └── best-practices.md
│   ├── patterns/                     # 模式与范式
│   │   ├── prompt-patterns.md
│   │   └── debugging-patterns.md
│   ├── references/                   # 参考手册
│   │   ├── api-reference.md
│   │   └── tool-reference.md
│   └── decisions/                    # 决策记录（ADR）
│       ├── 001-why-this-structure.md
│       └── 002-why-not-alternative.md
│
├── templates/                        # 可复制模板
│   ├── notes/                        # 笔记模板
│   │   ├── daily-log.md
│   │   ├── meeting-notes.md
│   │   └── research-notes.md
│   ├── prompts/                      # Prompt 模板
│   │   ├── code-review-prompt.md
│   │   └── bug-report-prompt.md
│   ├── docs/                         # 文档模板
│   │   ├── adr-template.md
│   │   └── guide-template.md
│   └── projects/                     # 项目模板
│       ├── new-project/
│       │   └── ...
│       └── ...
│
├── registry/                         # 索引和资产注册
│   ├── index.json                    # 主索引（机器可读）
│   ├── tags.json                     # 标签体系定义
│   ├── assets.json                   # 资产清单（图片、附件）
│   └── manifests/                    # 清单文件
│       ├── skills-manifest.json      # Skill 注册表
│       └── commands-manifest.json    # 命令注册表
│
├── reports/                          # 原始调研报告
│   ├── 2026-05-30-topic-name/        # 按日期+主题组织
│   │   ├── raw-notes.md
│   │   ├── sources.json              # 来源追踪
│   │   └── findings.md               # 初步发现
│   └── ...
│
├── archive/                          # 历史归档
│   ├── 2026-Q1/                      # 按季度归档
│   │   ├── old-project-notes.md
│   │   └── deprecated-patterns.md
│   └── ...
│
└── README.md                         # 项目根入口
```

---

## 3. 每个目录的职责

### 3.1 .claude/

**唯一职责**：Claude Code 运行时的配置和执行逻辑。

**什么放这里**：
- Claude Code 启动时自动加载的文件（CLAUDE.md、AGENTS.md）
- 影响 Claude Code 行为的设置（settings.json）
- 被 Claude Code 直接执行的 Skill 和 Command
- 生命周期钩子（pre-command、post-command、stop）

**什么不放这里**：
- 仅供人类阅读的知识文档 → 去 docs/
- 原始调研材料 → 去 reports/
- 过期的配置 → 去 archive/ 或直接删除

### 3.2 docs/

**唯一职责**：长期、精炼、可复用的知识资产。

**什么放这里**：
- 经过验证的工作流程
- 提炼后的最佳实践
- 模式与范式总结
- 决策记录（ADR）
- 工具/ API 参考手册

**准入标准**：
- 至少经过一次实践验证
- 结构清晰，可直接引用
- 有明确的适用场景

### 3.3 templates/

**唯一职责**：降低创建成本的可复制模板。

**什么放这里**：
- 笔记模板（日报、会议记录、调研笔记）
- Prompt 模板（代码审查、Bug 报告、需求分析）
- 文档模板（ADR、指南、API 文档）
- 项目脚手架（新项目初始化文件）

**设计原则**：
- 每个模板必须包含使用说明
- 模板变量用 `{{variable}}` 标记
- 提供填充示例

### 3.4 registry/

**唯一职责**：机器可读的索引和资产注册。

**什么放这里**：
- 全库索引（index.json）
- 标签体系定义（tags.json）
- 资产清单（assets.json）
- Skill / Command 注册表

**为什么需要**：
- 支撑自动化检索
- 为未来的工具集成提供数据层
- 避免依赖文件名约定做索引

### 3.5 reports/

**唯一职责**：保留原始调研过程和未加工材料。

**什么放这里**：
- 网络调研的原始笔记
- 实验过程的记录
- 临时性分析
- 待验证的假设

**与 docs/ 的关系**：
- reports/ = 生材料（raw）
- docs/ = 熟知识（cooked）
- 从 reports/ 到 docs/ 是知识提炼流程

### 3.6 archive/

**唯一职责**：存放过期但可能仍有参考价值的材料。

**什么放这里**：
- 过期的项目文档
- 废弃的模式或工具
- 历史决策的上下文

**归档规则**：
- 按季度归档
- 归档时记录原因
- 保留检索入口

---

## 4. 什么应该放进 .claude/

### 4.1 必须放入

| 文件/目录 | 原因 |
|-----------|------|
| `CLAUDE.md` | Claude Code 启动时自动加载，提供项目上下文 |
| `AGENTS.md` | 定义 Agent 角色和分工 |
| `settings.json` | 项目级 Claude Code 设置 |
| `skills/` | 被 Claude Code 识别和执行的 Skill |
| `commands/` | 被 Claude Code 识别和执行的自定义命令 |
| `hooks/` | 生命周期钩子，自动化触发 |

### 4.2 不应该放入

| 文件/目录 | 原因 | 应该去哪 |
|-----------|------|----------|
| 知识性文档 | .claude/ 是执行层，不是知识层 | docs/ |
| 原始调研 | 运行时不需要 | reports/ |
| 模板文件 | 不是运行时配置 | templates/ |
| 历史文件 | 过期配置不应影响当前运行 | archive/ |

### 4.3 关键设计决策

**.claude/ 只放"会被执行"的东西**。如果一个文件只是供人阅读、不会被 Claude Code 运行时加载或执行，它就不属于这里。

---

## 5. 什么应该放进 docs/

### 5.1 必须放入

| 类型 | 示例 |
|------|------|
| 操作指南 | 如何使用某个工具、如何执行某个流程 |
| 模式总结 | 提炼后的 prompt 模式、调试模式 |
| 参考手册 | API 速查、工具参数说明 |
| 决策记录 | ADR（Architecture Decision Records） |
| 最佳实践 | 经实践验证的方法论 |

### 5.2 不应该放入

| 类型 | 原因 | 应该去哪 |
|------|------|----------|
| 原始调研笔记 | 未经提炼 | reports/ |
| 一次性分析 | 不可复用 | reports/ |
| Prompt 草稿 | 不是知识 | templates/ 或 .claude/skills/ |
| 运行时配置 | 不是知识 | .claude/ |

### 5.3 准入标准

进入 docs/ 的文件必须满足：
1. **经过验证**：不是理论，是实践过的
2. **结构清晰**：有标题、有层次、有索引
3. **可复用**：不是一次性内容
4. **有维护者**：知道谁负责更新

---

## 6. 什么应该放进 templates/

### 6.1 必须放入

| 类型 | 示例 |
|------|------|
| 笔记模板 | 日报模板、会议记录模板、调研笔记模板 |
| Prompt 模板 | 代码审查 prompt、Bug 报告 prompt |
| 文档模板 | ADR 模板、指南模板、API 文档模板 |
| 项目脚手架 | 新项目目录结构、初始化文件 |

### 6.2 模板规范

每个模板文件必须包含：
1. **使用说明**：何时使用、如何填充
2. **变量标记**：用 `{{variable}}` 标识需要替换的部分
3. **示例填充**：提供一个完整示例
4. **版本信息**：模板的创建和更新日期

### 6.3 不应该放入

| 类型 | 原因 | 应该去哪 |
|------|------|----------|
| 具体实例 | 模板是抽象，实例是具体 | docs/ 或 reports/ |
| 运行时脚本 | 不是模板 | .claude/skills/ |
| 知识性内容 | 不是可复制结构 | docs/ |

---

## 7. 什么应该放进 registry/

### 7.1 必须放入

| 文件 | 职责 |
|------|------|
| `index.json` | 全库文件索引，支撑快速检索 |
| `tags.json` | 标签体系定义，统一分类语言 |
| `assets.json` | 资产清单（图片、附件、外部资源） |
| `manifests/skills-manifest.json` | Skill 注册表，记录所有可用 Skill |
| `manifests/commands-manifest.json` | 命令注册表，记录所有自定义命令 |

### 7.2 索引格式示例

```json
{
  "version": "1.0",
  "lastUpdated": "2026-05-30",
  "entries": [
    {
      "path": "docs/guides/workflow-guide.md",
      "title": "Workflow Guide",
      "type": "guide",
      "tags": ["workflow", "automation"],
      "status": "active",
      "created": "2026-05-30",
      "modified": "2026-05-30"
    }
  ]
}
```

### 7.3 不应该放入

| 类型 | 原因 | 应该去哪 |
|------|------|----------|
| 具体内容 | registry 只存元数据 | 对应内容目录 |
| 人类可读文档 | registry 是机器层 | docs/ |

---

## 8. 什么应该放进 reports/

### 8.1 必须放入

| 类型 | 示例 |
|------|------|
| 网络调研原始笔记 | 从网页、论文、视频提取的原始内容 |
| 实验记录 | 工具试用、API 测试的过程记录 |
| 临时分析 | 针对特定问题的快速分析 |
| 待验证假设 | 尚未经过验证的想法 |

### 8.2 目录组织

```
reports/
├── 2026-05-30-claude-code-research/
│   ├── raw-notes.md          # 原始笔记
│   ├── sources.json          # 来源追踪
│   ├── findings.md           # 初步发现
│   └── summary.md            # 简要总结
└── 2026-05-28-tool-evaluation/
    └── ...
```

### 8.3 与 docs/ 的关系

```
reports/ 原始材料
    ↓ 提炼、验证、结构化
docs/    精炼知识
```

reports/ 到 docs/ 的转化是知识生产的核心流程。

---

## 9. 什么应该放进 archive/

### 9.1 必须放入

| 类型 | 示例 |
|------|------|
| 过期项目文档 | 已完成或放弃的项目 |
| 废弃模式 | 被新版本替代的方法论 |
| 历史配置 | 不再使用的 .claude/ 配置 |
| 过时工具文档 | 工具已更新或弃用 |

### 9.2 归档规则

1. **按季度归档**：`archive/2026-Q1/`
2. **记录归档原因**：每个归档文件附带 `ARCHIVED.md` 说明
3. **保留检索入口**：在 docs/index.md 中保留归档索引

### 9.3 不应该放入

| 类型 | 原因 | 应该去哪 |
|------|------|----------|
| 当前活跃文件 | 归档意味着不再活跃 | 对应活跃目录 |
| 临时文件 | 直接删除 | /dev/null |

---

## 10. 命名规范

### 10.1 文件命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 文档 | kebab-case，语义明确 | `workflow-guide.md` |
| 模板 | 后缀 `-template` | `daily-log-template.md` |
| 索引 | `index` 或 `README` | `index.md`, `README.md` |
| 配置 | 小写，无空格 | `settings.json` |
| 报告目录 | `YYYY-MM-DD-topic` | `2026-05-30-claude-research/` |
| 归档目录 | `YYYY-Q#` | `2026-Q1/` |

### 10.2 目录命名

| 目录 | 命名规则 |
|------|----------|
| 一级目录 | 小写，kebab-case |
| Skill 目录 | 小写，kebab-case |
| 模板分类 | 复数形式：`notes/`, `prompts/` |

### 10.3 禁止

- ❌ 空格：`my file.md`
- ❌ 中文文件名（目录名可中文，文件名用英文）
- ❌ 无意义命名：`1.md`, `temp.md`, `new.md`
- ❌ 混合大小写：`MyFile.md`

---

## 11. Frontmatter 规范

### 11.1 必填字段

```yaml
---
title: "文档标题"
description: "一句话描述"
date: 2026-05-30
type: guide | pattern | reference | decision | report | template
status: draft | active | deprecated | archived
tags: [tag1, tag2]
---
```

### 11.2 字段说明

| 字段 | 说明 | 可选值 |
|------|------|--------|
| `title` | 文档标题 | 任意字符串 |
| `description` | 一句话描述 | 任意字符串 |
| `date` | 创建日期 | ISO 8601 |
| `type` | 文档类型 | `guide`, `pattern`, `reference`, `decision`, `report`, `template` |
| `status` | 文档状态 | `draft`, `active`, `deprecated`, `archived` |
| `tags` | 标签列表 | 来自 tags.json 的预定义标签 |

### 11.3 可选字段

| 字段 | 说明 |
|------|------|
| `author` | 作者 |
| `updated` | 最后更新日期 |
| `version` | 文档版本 |
| `related` | 相关文档路径 |
| `source` | 来源（用于 reports/） |

---

## 12. 来源追踪规范

### 12.1 来源类型

| 类型 | 标识 | 示例 |
|------|------|------|
| 网页 | `web:` | `web:https://example.com/article` |
| 论文 | `paper:` | `paper:arXiv:2401.12345` |
| 书籍 | `book:` | `book:《Clean Code》` |
| 视频 | `video:` | `video:https://youtube.com/watch?v=xxx` |
| 对话 | `chat:` | `chat:Claude-2026-05-30` |
| 经验 | `exp:` | `exp:项目X实践` |

### 12.2 来源记录格式

在 reports/ 中使用 `sources.json`：

```json
{
  "sources": [
    {
      "id": "src-001",
      "type": "web",
      "url": "https://example.com/article",
      "title": "Article Title",
      "accessed": "2026-05-30",
      "notes": "关键观点摘要"
    }
  ]
}
```

### 12.3 内联引用

在文档中引用来源：

```markdown
Claude Code 的 harness 机制支持自定义命令 [^src-001]。

[^src-001]: web:https://docs.anthropic.com/...
```

---

## 13. 为什么这个结构不会过度工程化

### 13.1 反驳"太复杂"

| 质疑 | 回应 |
|------|------|
| "7 个顶层目录太多了" | 每个目录有单一职责，不重叠。实际使用中，你主要操作 docs/ 和 .claude/，其他目录是支撑层 |
| "registry/ 是多余的" | 当文件超过 50 个时，靠文件名记忆不可持续。registry 是未来的检索基础设施 |
| "reports/ 和 docs/ 为什么要分开" | 生熟分离是知识管理的基本原则。混放会导致"不知道哪个是最终版" |
| "archive/ 直接删除不行吗" | 历史上下文有时需要回溯。归档比删除更安全 |

### 13.2 复杂度控制机制

1. **渐进采用**：新项目可以只用 docs/ 和 .claude/，其他目录按需引入
2. **自动化支撑**：registry/ 和索引可以通过脚本自动生成
3. **明确边界**：每个目录的"什么不放这里"清单防止膨胀
4. **归档机制**：archive/ 防止活跃目录被历史文件污染

### 13.3 与替代方案的对比

| 方案 | 问题 | 本方案优势 |
|------|------|------------|
| 全部放 docs/ | 生熟混放，检索困难 | 生熟分离，职责清晰 |
| 全部放 .claude/ | 运行时配置与知识混放 | 执行层与知识层分离 |
| 扁平结构 | 文件多了无法管理 | 分层 + 索引，可扩展 |
| 无模板目录 | 每次从零创建 | 模板降低创建成本 |

### 13.4 核心论点

这个结构不是"为了组织而组织"，而是为了解决**三个真实问题**：

1. **"我放在哪了？"** → registry/ + 目录职责明确
2. **"这是最终版吗？"** → reports/ vs docs/ 生熟分离
3. **"这个还能用吗？"** → status 字段 + archive/ 机制

每个设计决策都对应一个具体的痛点，没有为设计而设计的部分。

---

*文档版本：1.0*
*创建日期：2026-05-30*
*类型：decision*
*状态：active*
