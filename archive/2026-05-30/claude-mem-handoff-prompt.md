# 交接 Prompt（给下一个 Agent）

请先读取以下 Handoff 文档，然后按文档中的「验证步骤」执行并汇报结果。

**必读文档**：`D:\OneDrive\Desktop\my-claude\Claude-Mem 安装与验证 Handoff.md`

---

## 你的任务

1. 读取上述 Handoff 文档（重点看「五、验证步骤」）
2. 按顺序执行 Step 1 ~ Step 6
3. 每一步的结果直接汇报给我
4. 最终结论：Claude-Mem 自动收录是否正常工作？

## 注意

- 你是**新会话**，所以 `SessionStart` hook 应该已经触发过了
- 执行工具调用（如 Read/Bash/Glob）后，等 5-10 秒再给 Claude-Mem 处理时间
- 如果 Worker 没运行，按文档里的命令启动
- 验证完把结果写回 Handoff 文档末尾（追加"验证结果"章节）
