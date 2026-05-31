---
title: "Windows / WSL2 环境规则"
category: environment
last_updated: 2026-05-31
---

# Windows / WSL2 环境规则

## 默认环境

```
Windows 11 / WSL2 / Lenovo Legion Y7000P
```

## Shell 声明

给命令前先声明目标 shell：

- PowerShell 5.1
- PowerShell 7+
- CMD
- Git Bash
- WSL2 Ubuntu

## 规则

- **PowerShell 写中文文件容易编码出问题**，优先用 Claude Code Write/Edit 工具，不用 PowerShell `Set-Content`/`Out-File`
- Python 脚本优先 `python -X utf8`
- 控制台乱码先检查 UTF-8 / codepage（`chcp 65001`）
- WSL2 访问 Windows 文件用 `/mnt/c/...`
- Windows 程序从 WSL 调用需要 `.exe`
- 路径中有中文、空格、反斜杠时要格外小心，优先用 Claude Code 工具写文件
- 不确定 shell 时先询问，不要猜

## 路径注意

- Windows 路径：`C:\Users\...`
- WSL 路径：`/mnt/c/Users/...`
- 跨环境调用时确认路径格式