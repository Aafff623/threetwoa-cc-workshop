# Claude Code 本机 Skills 全量汇总

> 扫描时间：2026-05-27
> 扫描路径：`C:\Users\Lenovo\.claude\skills\`
> 总计：**67 个 skill 目录** + **1 个 MCP 服务器**（CodeGraph）

---

## 一、画图 / 可视化（6 个）

| Skill | 触发关键词 | 功能简述 |
|-------|-----------|---------|
| **tldraw-skill** | diagram, flowchart, whiteboard, draw | 手绘白板风图表，6 种预设，PNG/SVG 导出，Vision 自检 |
| **drawio-skill** | diagram, flowchart, architecture, UML, ERD | 干净专业风图表，支持 PNG/SVG/PDF/JPG，泳道/容器/风格预设 |
| **mermaid-skill** | mermaid, flowchart, sequence, class diagram | 23 种图表类型，纯文本 Mermaid 代码，Markdown 原生嵌入 |
| **excalidraw-skill** | diagram, workflow, architecture, visualize | 草图风视觉论证，强调"图在论证而非展示"，多层 zoom 结构 |
| **baoyu-diagram** | diagram, flowchart, sequence, architecture, 画个图 | 深色科技风 SVG（slate-900 + cyan/emerald），9 种类型，矢量无损 |
| **baoyu-infographic** | infographic, 信息图, visual summary, 可视化, 高密度信息大图 | 21 布局 × 22 风格信息图，完整内容分析→结构化→图像生成工作流 |

---

## 二、Baoyu 内容生产生态（15 个）

| Skill | 触发关键词 | 功能简述 |
|-------|-----------|---------|
| **baoyu-image-gen** | generate image, create image, draw image, 生成图片 | 多 provider AI 生图底层（OpenAI/Google/阿里/字节等 11 家） |
| **baoyu-cover-image** | generate cover, create cover, article cover, 封面 | 文章封面图生成，5 维度 × 11 色板 × 7 渲染风格 |
| **baoyu-slide-deck** | create slides, presentation, PPT, slide deck, 演示文稿 | PPT/幻灯片生成，从内容到单页图片 |
| **baoyu-xhs-images** | 小红书图片, 小红书种草, 小绿书, image cards, 图片卡片 | 社交媒体信息图卡片（1-10 张），12 风格 × 8 布局 |
| **baoyu-article-illustrator** | illustrate article, add images, generate images for article, 为文章配图 | 分析文章结构，识别需配图位置，Type×Style×Palette 三维度生成 |
| **baoyu-comic** | 知识漫画, 教育漫画, biography comic, tutorial comic | 知识漫画生成，多艺术风格，面板布局，批量生成 |
| **baoyu-translate** | translate, 翻译, 精翻, 本地化, localize, 改成中文/英文 | 三模式翻译（快速/标准/精翻），支持术语一致性和 EXTEND.md 词汇表 |
| **baoyu-format-markdown** | format markdown, beautify article, add formatting, 美化文章 | Markdown 格式化，frontmatter/标题/摘要/列表/代码块 |
| **baoyu-markdown-to-html** | markdown to html, convert md to html, md 转 html, 微信外链转底部引用 | Markdown 转样式化 HTML，支持代码高亮/数学/Mermaid/PlantUML |
| **baoyu-url-to-markdown** | save webpage, url to markdown, 保存网页 | 任意 URL 转 Markdown（支持 X/Twitter/YouTube/HN） |
| **baoyu-post-to-wechat** | 发布公众号, post to wechat, 微信公众号, 贴图/图文/文章 | 微信公众号文章/贴图发布（API 或 Chrome CDP） |
| **baoyu-post-to-weibo** | post to weibo, 发微博, 发布微博, 微博头条文章 | 微博发布（文字/图片/视频/头条文章） |
| **baoyu-post-to-x** | post to X, tweet, publish to Twitter, share on X | X/Twitter 发布（含长文 X Articles） |
| **baoyu-wechat-summary** | 总结群聊, 群聊精华, summarize group chat, 群聊摘要 | 微信群聊总结（正常/毒舌版），维护群组历史 |
| **baoyu-youtube-transcript** | get YouTube transcript, download subtitles, YouTube字幕, 视频封面 | YouTube 字幕/封面下载，支持翻译/章节/说话人识别 |
| **baoyu-compress-image** | compress image, optimize image, convert to webp, 压缩图片 | 图片压缩转 WebP/PNG |
| **baoyu-electron-extract** | extract Electron, decompile Electron, 提取 .asar, 看 Electron 源码 | Electron 应用 .asar 解包提取 |
| **baoyu-danger-gemini-web** | generate image with Gemini, Gemini text generation | Gemini Web API 逆向，文生图/图生文/多轮对话 |
| **baoyu-danger-x-to-markdown** | X to markdown, tweet to markdown, save tweet | X/Twitter 推文/文章转 Markdown（YAML frontmatter） |

---

## 三、搜索 / 信息获取（2 个）

| Skill | 触发关键词 | 功能简述 |
|-------|-----------|---------|
| **anysearch** | search, web search, 搜索, 网页搜索 | 实时搜索引擎，支持 23 个垂直领域、并行批量搜索、URL 内容提取 |
| **zhihu-search** | 知乎, 知乎搜索, zhihu | 搜索知乎站内内容，返回结构化结果（标题/链接/作者/摘要） |

---

## 四、GitNexus 代码知识图谱（7 个）

| Skill | 触发关键词 | 功能简述 |
|-------|-----------|---------|
| **gitnexus-cli** | index repo, reanalyze, generate wiki, list repos | GitNexus CLI 操作：索引仓库、生成 wiki、清理索引 |
| **gitnexus-exploring** | how does X work, trace execution, show me auth flow | 探索代码库架构、追踪执行流、理解陌生代码 |
| **gitnexus-debugging** | why is X failing, trace this bug, where does error come from | 调试 bug、追踪错误来源 |
| **gitnexus-impact-analysis** | is it safe to change X, what depends on this, what will break | 变更影响分析，改什么会炸 |
| **gitnexus-refactoring** | rename function, extract module, refactor class, move file | 安全重构：重命名、提取、拆分、移动 |
| **gitnexus-pr-review** | review this PR, what does PR change, is PR safe to merge | PR 审查：变更内容、合并风险、测试覆盖 |
| **gitnexus-guide** | what GitNexus tools, how to use GitNexus | GitNexus 本身的使用指南、工具列表、查询语法 |

---

## 五、工程开发（9 个）

| Skill | 触发关键词 | 功能简述 |
|-------|-----------|---------|
| **tdd** | TDD, red-green-refactor, integration tests, test-first | 测试驱动开发：红-绿-重构循环 |
| **diagnose** | diagnose this, debug this, something is broken, performance regression |  disciplined 诊断循环：复现→最小化→假设→验证→修复→回归测试 |
| **prototype** | prototype this, mock up UI, try designs, let me play | 快速原型：终端 app 或多种 UI 变体切换 |
| **zoom-out** | zoom out, bigger picture, how does this fit | 拉高视角，给出更宏观的上下文 |
| **migrate-to-shoehorn** | shoehorn, replace `as` in tests, partial test data | 将测试中的 `as` 断言迁移到 @total-typescript/shoehorn |
| **setup-pre-commit** | pre-commit hooks, Husky, lint-staged, 提交前检查 | 配置 Husky + lint-staged + typecheck + test 的 pre-commit 流水线 |
| **git-commit** | commit, git commit, /commit, conventional commit | 分析 diff 生成符合 Conventional Commits 规范的提交信息，支持自动检测 type/scope |
| **git-guardrails-claude-code** | block git push, prevent destructive git, git safety hooks | 设置 hooks 阻止危险 git 操作（push/reset --hard/clean/branch -D） |
| **improve-codebase-architecture** | improve architecture, refactor opportunities, make testable | 基于 CONTEXT.md 和 ADR 发现架构深化机会 |

---

## 六、项目管理 / 工作流（6 个）

| Skill | 触发关键词 | 功能简述 |
|-------|-----------|---------|
| **to-issues** | convert plan to issues, create tickets, break down work | 将计划/PRD 拆分为可独立执行的 issue（tracer-bullet 切片） |
| **to-prd** | create PRD, turn into PRD | 将当前对话转为 PRD 并发布到 issue tracker |
| **triage** | triage issues, create issue, review bugs, manage workflow | 基于 triage 角色的 issue 状态机管理 |
| **review** | review since X, review branch, review PR | 双轴审查：Standards（代码规范）+ Spec（是否符合需求） |
| **handoff** | handoff, compact conversation | 将当前对话压缩为 handoff 文档，供其他 agent 接力 |
| **release-skills** | release, 发布, bump version, new version, GitHub Release | 通用发布工作流：自动检测版本文件、changelog、GitHub Release |

---

## 七、写作 / 内容创作（5 个）

| Skill | 触发关键词 | 功能简述 |
|-------|-----------|---------|
| **edit-article** | edit article, revise, improve article, 改文章 | 文章编辑：重构段落、提升清晰度、精简表达 |
| **writing-shape** | shape article, turn notes into article, 把碎片写成文章 | 将 raw material 逐步塑造成文章（逐段生长、格式讨论） |
| **writing-fragments** | fragments, ideate, raw material, 收集碎片 | 挖掘写作碎片（观点、场景、句子），追加到单一文档 |
| **writing-beats** | beats, narrative, story beats, 叙事节拍 | 以"节拍"为单位组装文章， choose-your-own-adventure 风格 |
| **readme-polish** | 帮我写 README, 打磨 README, 生成项目首页 | 分析项目结构 → 生成 Banner 图 → 组装规范 README |

---

## 八、计划 / 沟通 / 风格（4 个）

| Skill | 触发关键词 | 功能简述 |
|-------|-----------|---------|
| **grill-me** | grill me, stress-test plan, 拷问我的设计 |  relentlessly 拷问计划/设计，直到决策树每个分支都清晰 |
| **grill-with-docs** | grill with docs, stress-test against domain model | 针对现有领域模型和文档进行拷问，同步更新 CONTEXT.md/ADR |
| **caveman** | caveman mode, less tokens, be brief, 简短模式 |  ultra-compressed 通信，token 消耗降低 ~75% |
| **soulmate** | soulmate mode, be warm, more emotion, 温柔模式 | 温暖人性化沟通模式，gentle/warm/radiant 三档 |

---

## 九、MiniMax Skills 插件（Marketplace 安装）

> 来源：`~/.claude/plugins/marketplaces/minimax-skills/`
> 说明：通过 Claude Code 插件市场安装的 MiniMax 官方 skills 包

### 9.1 办公四件套

| Skill | 触发关键词 | 功能简述 |
|-------|-----------|---------|
| **minimax-docx** | docx, Word, 文档, 公文 | 创建/编辑 Word 文档（.docx），支持中国公文格式标准（GB/T 9704-2012） |
| **minimax-xlsx** | Excel, xlsx, spreadsheet, csv, 表格, 财务模型 | 打开/创建/读取/分析/编辑 Excel 表格，支持公式计算、数据透视、财务格式化 |
| **minimax-pdf** | PDF, 生成报告, 填写表单, 精美文档 | 创建精美 PDF（报告/简历/提案）、填写 PDF 表单字段、重新格式化现有文档 |
| **pptx-generator** | PPT, PPTX, PowerPoint, presentation, slide, deck | 生成/编辑/读取 PowerPoint，基于 PptxGenJS 创建完整演示文稿 |

### 9.2 开发类

| Skill | 触发关键词 | 功能简述 |
|-------|-----------|---------|
| **android-native-dev** | Android, Kotlin, Jetpack Compose | Android 原生应用开发 |
| **ios-application-dev** | iOS, Swift, SwiftUI, UIKit | iOS 应用开发 |
| **flutter-dev** | Flutter, Dart, 跨平台 | Flutter 跨平台开发 |
| **react-native-dev** | React Native, Expo | React Native 移动端开发 |
| **frontend-dev** | frontend, React, Vue, web | 前端 Web 开发 |
| **fullstack-dev** | fullstack, 全栈, backend + frontend | 全栈开发 |
| **shader-dev** | shader, GLSL, WebGL, 渲染 | Shader/图形渲染开发 |

### 9.3 多媒体 / AI 工具

| Skill | 触发关键词 | 功能简述 |
|-------|-----------|---------|
| **vision-analysis** | 图像分析, 图片识别, 视觉分析 | 图像内容分析与理解 |
| **minimax-music-gen** | 音乐生成, AI作曲, music generation | MiniMax 音乐生成 |
| **minimax-music-playlist** | 歌单, playlist, 音乐推荐 | 音乐歌单创建与管理 |
| **buddy-sings** | 唱歌, AI唱歌, 歌声合成 | AI 歌声合成 |
| **gif-sticker-maker** | GIF, 表情包, sticker, 动图 | GIF/贴纸制作 |
| **mmx-cli** (minimax-multimodal-toolkit) | MiniMax CLI, 多模态工具 | ✅ **已安装 + 7项能力全部实测通过**，见下方 [9.5 实测报告](#95-mmx-cli-实测报告) |

### 9.4 代码审查

| Skill | 触发关键词 | 功能简述 |
|-------|-----------|---------|
| **pr-review** | PR review, pull request, validate skill, check skill | MiniMax Skills 仓库的 PR 审查，验证新 skill 提交合规性 |

### 9.5 mmx-cli 实测报告

> 测试时间：2026-05-27 | CLI 版本：1.0.15 | API 区域：cn | 登录状态：✅ 已登录

#### 7 项能力全通

| 能力 | 命令 | 输出 |
|------|------|------|
| **text chat** | `mmx text chat` | 四言诗 |
| **search query** | `mmx search query` | 10 条搜索结果 |
| **image generate** | `mmx image generate` | `image_001.jpg` (379KB) |
| **speech synthesize** | `mmx speech synthesize` | `speech_*.mp3` (153KB, 9.5s) |
| **music generate** | `mmx music generate --instrumental` | `music_*.mp3` |
| **video generate** | `mmx video generate` | `*.mp4` (Hailuo-2.3) |
| **vision describe** | `mmx vision describe` | 详细图片描述 |

#### 生成文件位置

```
C:\Users\Lenovo\
├── image_001.jpg                      # 赛博朋克夜景图
├── speech_2026-05-27-00-37-40.mp3     # 温柔女声朗读
├── music_2026-05-27-00-37-59.mp3      # 爵士风格音乐
└── AppData\Local\Temp\mmx-video\
    └── 402550131257560.mp4            # 夕阳猫咪视频
```

#### 使用注意

- 图片默认输出到**当前目录**，不是 `minimax-output/` 子目录
- Music 参数：`--mode instrumental` 无效，正确是 `--instrumental`
- MCP 包 (`minimax-coding-plan-mcp`) 有 Internal Server Error，建议用 mmx-cli 替代

---

## 十、工具 / 基础设施（6 个）

| Skill | 触发关键词 | 功能简述 |
|-------|-----------|---------|
| **obsidian-vault** | obsidian, find notes, create note, 笔记 | Obsidian 笔记库搜索、创建、管理（支持 wikilink 和索引笔记） |
| **ppt-master** | create PPT, make presentation, 生成 PPT, 做 PPT | 多格式 SVG 内容生成 → PPTX 导出（PDF/DOCX/URL/Markdown → SVG → PPTX） |
| **skill-creator** | create skill, write skill, build skill, optimize skill | 创建/修改/优化 skills，运行 evals，benchmark 性能 |
| **write-a-skill** | write a skill, create new skill | 创建新 agent skill（模板化结构、渐进披露、资源捆绑） |
| **agent-skill-creator** | （空目录，大小 0） | — |
| **learned** | （空目录，大小 0） | — |

---

## 十一、Matt Pocock Skills Bundle（已安装，内含 20+ 子 skills）

> 安装路径：`~/.claude/skills/mattpocock-skills/`
> 说明：上述根目录下的许多 skills（handoff, caveman, diagnose, tdd 等）都同时存在于这个 bundle 中。Bundle 是完整集合，根目录下的是独立安装副本。

| 类别 | 包含 Skills |
|------|------------|
| 工程 | diagnose, tdd, prototype, zoom-out, to-issues, to-prd, triage, improve-codebase-architecture, grill-with-docs |
| 写作 | writing-shape, writing-fragments, writing-beats, edit-article |
| 项目管理 | review, handoff |
| 生产力 | caveman, grill-me, write-a-skill, obsidian-vault |
| 基础设施 | setup-matt-pocock-skills, setup-pre-commit, git-guardrails, migrate-to-shoehorn, scaffold-exercises |
| 废弃/草稿 | ubiquitous-language, design-an-interface, qa, request-refactor-plan |

---

## 十二、已安装 Plugins（Marketplace 插件）

| Plugin | 路径 | 状态 | 功能简述 |
|--------|------|------|---------|
| **claude-mem** | `marketplaces/thedotmack/` | ✅ 已安装（v13.3.0） | 跨 session 持久记忆系统，6 阶段 hook 生命周期，自动压缩/注入上下文 |
| **CodeGraph** | MCP 服务器 | ✅ 已激活 | 本地代码知识图谱（tree-sitter 解析 + SQLite FTS5），支持 Claude/Cursor/Codex/OpenCode |
| **claude-mermaid** | `marketplaces/claude-mermaid/` | ✅ 已安装 | Mermaid 图表语法支持（已集成在 mermaid-skill 中） |
| **minimax-skills** | `marketplaces/minimax-skills/` | ✅ 已安装 | MiniMax 官方 skills 包（办公四件套、开发类、多媒体/AI） |
| **claude-plugins-official** | `marketplaces/claude-plugins-official/` | ✅ 已安装 | 官方插件集合 |

### claude-mem 架构要点

- **6 阶段 Hook 生命周期**：Setup → SessionStart → UserPromptSubmit → PreToolUse (Read) → PostToolUse → Stop
- **Worker Service**：Bun 管理的 Express API（默认端口 `37700 + uid%100`），SQLite3 数据库 `~/.claude-mem/claude-mem.db`
- **隐私控制**：`<private>...</private>` 标签，hook 层剥离后再落盘
- **多账号支持**：通过 `CLAUDE_MEM_DATA_DIR` 环境变量隔离不同账号的数据

### CodeGraph MCP 工具（已注册到 permissions）

```
codegraph_search     — 全文搜索符号/文件
codegraph_context    — 为 AI 构建代码上下文（markdown/JSON）
codegraph_node       — 查询某个符号的详细信息
codegraph_callers    — 查调用者（谁调用了这个函数）
codegraph_callees    — 查被调用者（这个函数调用了什么）
codegraph_impact     — 变更影响半径分析
codegraph_status     — 检查索引状态
```

使用方式：在项目目录运行 `codegraph init -i` 建立索引，之后 agent 即可通过 MCP 调用。

---

## 汇总统计

| 分类 | 数量 | 核心代表 |
|------|------|---------|
| 画图/可视化 | 6 | tldraw, drawio, mermaid, excalidraw, baoyu-diagram, baoyu-infographic |
| Baoyu 内容生态 | 19 | image-gen, translate, post-to-X/WeChat/Weibo, url-to-md, youtube-transcript... |
| 搜索/信息 | 2 | anysearch, zhihu-search |
| GitNexus | 7 | exploring, debugging, impact-analysis, refactoring, pr-review, cli, guide |
| 工程开发 | 9 | tdd, diagnose, prototype, zoom-out, setup-pre-commit, git-commit, git-guardrails... |
| 项目管理 | 6 | to-issues, to-prd, triage, review, handoff, release-skills |
| 写作/内容 | 5 | edit-article, writing-shape, writing-fragments, writing-beats, readme-polish |
| 计划/沟通 | 4 | grill-me, grill-with-docs, caveman, soulmate |
| MiniMax 办公四件套 | 4 | minimax-docx, minimax-xlsx, minimax-pdf, pptx-generator |
| MiniMax 开发类 | 7 | android-native-dev, ios-application-dev, flutter-dev, react-native-dev, frontend-dev, fullstack-dev, shader-dev |
| MiniMax 多媒体/AI | 6 | vision-analysis, minimax-music-gen, minimax-music-playlist, buddy-sings, gif-sticker-maker, mmx-cli |
| 工具/基础设施 | 6 | obsidian-vault, ppt-master, skill-creator, write-a-skill |
| Plugins / MCP | 5 | claude-mem, CodeGraph, claude-mermaid, minimax-skills, claude-plugins-official |
| **合计** | **85+** | — |

---

## 一句话画像

你的 Claude Code 技能库是一个**工程开发 + 内容生产 + 知识管理**的三位一体体系：

- **工程侧**：GitNexus 代码图谱 + Matt Pocock 工程工作流（TDD/诊断/架构/重构）+ Git 安全守卫
- **内容侧**：Baoyu 生态（画图/生图/翻译/排版/多平台发布）+ 写作技能（beats/shape/fragments）+ PPT
- **信息侧**：anysearch 实时搜索 + zhihu 知乎 + 多种 URL 提取工具
- **知识管理**：Obsidian 笔记 + GitNexus 私人 Wiki + 手 off 协作

这配置已经相当完整了，覆盖了一个独立开发者/内容创作者的全链路需求 (｀・ω・´)
