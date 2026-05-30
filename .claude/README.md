# .claude/ 配置说明

本目录存放 Claude Code 的运行时配置。

## 文件说明

| 文件 | 用途 | 加载时机 |
|------|------|---------|
| `CLAUDE.md` | 全局个性化风格配置 | 每次会话自动加载 |
| `settings.example.json` | 配置示例模板 | 参考用，不自动加载 |

## 重要提示

- `.claude/CLAUDE.md` 与 `docs/` 下的精炼版本是**同内容双位置**
- **以 `.claude/CLAUDE.md` 为准**，`docs/` 版本仅作备份和版本管理
- 全局配置建议放 `~/.claude/`，项目级配置放项目根目录的 `.claude/`

## 配置层次

1. `~/.claude/settings.json` — 全局个人默认
2. `~/.claude/CLAUDE.md` — 全局个性化指令
3. `{project}/.claude/settings.json` — 项目级团队共享
4. `{project}/.claude/CLAUDE.md` — 项目级指令

## 维护规范

- 变更 `.claude/` 配置后，需验证 Claude Code 是否正确读取
- 重大变更记录到 `registry/decision-log.md`
- 不要在此目录存放 secrets、API keys、凭证
