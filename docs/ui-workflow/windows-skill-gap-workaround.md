---
title: "Windows 技能空目录问题与规避方案"
type: reference
status: active
source_files:
  - reports/raw/ui-workflow/01-ui-skill-stack-installation-report.md
updated: 2026-05-30
owner: threetwoa
---

# Windows 技能空目录问题与规避方案

## 1. 问题概述

`npx skills add` 在 Windows 上存在一个已知 bug：安装后技能目录为空。技能会被注册到 Claude Code 的技能索引中，名称和触发条件都正常显示，但本地磁盘上只有空目录——没有 `SKILL.md`，没有脚本，没有任何实质内容。

这意味着技能"看起来装好了"，实际无法执行。

## 2. 技术机理

`npx skills` 安装器的工作流程：

1. 从 GitHub 仓库拉取技能元数据
2. 在 Claude Code 技能索引中注册技能名称与触发条件
3. 将技能文件写入本地目录

在 Windows 上，第 3 步失败。npx 在 Windows 环境下无法正确处理符号链接（symlink）或文件复制操作，只创建了空目录壳。

**根因推测**：Windows 的文件系统权限模型（特别是开发者模式未开启时）与 npx 的 symlink 创建逻辑不兼容。Linux/macOS 无此问题。

## 3. 受影响技能列表

| 技能 | 来源 | 安装命令 | 状态 |
|------|------|----------|------|
| gsap-core | greensock/gsap-skills | `npx skills add greensock/gsap-skills` | 空目录 |
| gsap-timeline | greensock/gsap-skills | (bundled) | 空目录 |
| gsap-scrolltrigger | greensock/gsap-skills | (bundled) | 空目录 |
| gsap-plugins | greensock/gsap-skills | (bundled) | 空目录 |
| gsap-utils | greensock/gsap-skills | (bundled) | 空目录 |
| gsap-react | greensock/gsap-skills | (bundled) | 空目录 |
| gsap-performance | greensock/gsap-skills | (bundled) | 空目录 |
| gsap-frameworks | greensock/gsap-skills | (bundled) | 空目录 |
| impeccable | pbakaus/impeccable | `npx skills add pbakaus/impeccable` | 空目录 |
| frontend-design | anthropics/claude-code | Anthropic 官方插件 | 空目录 |
| bencium-controlled-ux-designer | bencium/claude-code-design-skill | 手动指定 | 空目录 |
| web-design-guidelines | (来源不明) | — | 空目录 |

> 所有通过 `npx skills` 安装的技能均受此影响。

## 4. 症状识别

出现以下任一情况即可判定为空目录 bug：

- **目录为空**：`ls ~/.agents/skills/<skill-name>/` 返回 0 个文件
- **技能名出现但不触发**：`/skill-name` 命令无响应，或触发后提示找不到 `SKILL.md`
- **PowerShell 确认**：

```powershell
# 检查技能目录是否有内容
(Get-ChildItem "$env:USERPROFILE\.agents\skills\gsap-core").Count
# 返回 0 = 空目录 bug
```

- **Claude Code 技能列表**：技能出现在 available skills 中，但 `SKILL.md` 路径指向空目录

## 5. Workaround 1: 手动下载

从 GitHub raw URL 直接下载 `SKILL.md` 到对应技能目录：

```powershell
# 以 gsap-core 为例
$skillDir = "$env:USERPROFILE\.agents\skills\gsap-core"
Invoke-WebRequest -Uri "https://raw.githubusercontent.com/greensock/gsap-skills/main/gsap-core/SKILL.md" -OutFile "$skillDir\SKILL.md"
```

**优点**：快速、精准，只下载需要的文件
**缺点**：需要手动查找每个文件的 raw URL；含子目录/脚本的技能不完整

## 6. Workaround 2: git clone

克隆整个仓库到本地，然后复制文件到技能目录：

```powershell
# 克隆到临时目录
git clone --depth 1 https://github.com/greensock/gsap-skills "$env:TEMP\gsap-skills-src"

# 复制到技能目录
$skills = @("gsap-core","gsap-timeline","gsap-scrolltrigger","gsap-plugins","gsap-utils","gsap-react","gsap-performance","gsap-frameworks")
foreach ($s in $skills) {
    $src = "$env:TEMP\gsap-skills-src\$s"
    $dst = "$env:USERPROFILE\.agents\skills\$s"
    Copy-Item -Path "$src\*" -Destination $dst -Recurse -Force
}

# impeccable
git clone --depth 1 https://github.com/pbakaus/impeccable "$env:TEMP\impeccable-src"
Copy-Item -Path "$env:TEMP\impeccable-src\*" -Destination "$env:USERPROFILE\.agents\skills\impeccable" -Recurse -Force
```

**优点**：完整文件，包括脚本和子资源
**缺点**：需要 git；克隆体积可能较大

## 7. Workaround 3: WSL

在 WSL (Windows Subsystem for Linux) 中运行安装命令：

```bash
# 进入 WSL
wsl

# 在 WSL 中执行安装
npx skills add greensock/gsap-skills
npx skills add pbakaus/impeccable

# 确认文件存在
ls -la ~/.agents/skills/gsap-core/SKILL.md
```

**优点**：npx 在 Linux 环境下正常工作，文件完整复制
**缺点**：需要安装 WSL；技能目录路径在 Windows 和 WSL 之间需要映射

> WSL 目录映射：`\\wsl$\Ubuntu\home\<user>\.agents\skills\` → Windows 下需要配置 Claude Code 读取 WSL 路径

## 8. Workaround 4: 替代技能路由

如果以上 workaround 都不方便，可使用已在 Windows 上正常安装的替代技能：

| 受影响技能 | 替代技能 | 说明 |
|-----------|---------|------|
| gsap-* 系列 | `gpt-taste` | 内含 GSAP ScrollTrigger 规范 |
| impeccable | `design-taste-frontend` | v2 重写版，含反 slop 检测 |
| frontend-design | `ui-ux-pro-max` | 67 种风格 + 13 技术栈覆盖 |
| bencium-controlled-ux-designer | `heroui-pro-design-taste` | 78 条设计原则 |

这些替代技能均位于 `.claude/skills/` 目录下，文件完整可用。

## 9. 验证方法

修复后，按以下步骤验证技能是否可用：

```powershell
# 1. 检查文件数量（应 > 0）
(Get-ChildItem "$env:USERPROFILE\.agents\skills\gsap-core").Count

# 2. 确认 SKILL.md 存在且非空
Test-Path "$env:USERPROFILE\.agents\skills\gsap-core\SKILL.md"

# 3. 在 Claude Code 中触发技能
# 输入自然语言包含技能触发词，观察是否正常加载
```

**最小验证**：`SKILL.md` 文件存在且内容非空，即表明技能可用。

**完整验证**：在测试项目中调用技能，确认其能正确读取本地脚本和资源文件。

## 10. 长期跟踪

- **上游 Issue**：此问题与 `npx skills` 在 Windows 上的文件系统兼容性有关，需跟踪 `skills.sh` 或相关包的更新
- **影响范围**：所有通过 `npx skills add` 安装的技能
- **临时状态**：技能注册信息存在但文件缺失，不影响 Claude Code 其他功能
- **建议**：在 bug 修复前，优先使用 Workaround 2（git clone）获取完整技能文件

## Source Material

- `reports/raw/ui-workflow/01-ui-skill-stack-installation-report.md` — 完整安装报告，包含环境快照、安装结果、失败详情和未验证项