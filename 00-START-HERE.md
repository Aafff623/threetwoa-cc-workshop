# 00-START-HERE

欢迎来到 my-claude — 你的 Claude 生态资产仓库。

## 这是什么？

这不是 prompt 仓库，不是笔记堆，而是 Claude Code harness 的**配置系统 + 知识资产库**。

## 五大区域

| 区域 | 内容 | 维护频率 |
|------|------|---------|
| `docs/` | 长期精炼知识 | 持续更新 |
| `.claude/` | Claude Code 运行时配置 | 按需调整 |
| `templates/` | 可复制模板 | 按需扩展 |
| `reports/raw/` | 原始调研报告 | 只增不改 |
| `registry/` | 资产索引 | 随变更同步 |

## 推荐阅读顺序

1. `docs/claude-code/feature-handbook.md` — Claude Code 全功能速查
2. `docs/claude-code/skills-inventory.md` — 本机 Skills 清单
3. `docs/ui-workflow/workflow-standard.md` — UI 工作流标准
4. `.claude/CLAUDE.md` — 个性化风格配置

## 贡献规范

- 原始报告保留在 `reports/raw/`，不二次编辑
- 精炼知识写入 `docs/`，必须添加 frontmatter 和来源
- 配置变更写入 `.claude/`，必须验证可执行性
- 所有变更同步更新 `registry/`
