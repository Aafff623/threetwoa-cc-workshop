---
title: "Claude Code 本机 Skills 全量汇总"
type: reference
status: active
source_files:
  - "archive/2026-05-30/Claude Code 本机 Skills 全量汇总.md"
updated: 2026-05-31
owner: threetwoa
---

# Claude Code 本机 Skills 全量汇总

> 盘点时间：2026-05-31
> 扫描路径：`C:\Users\Lenovo\.claude\skills\`
> 总计：**80+ 个 Skills**

---

## 1. Claude Code 内置 Skills（官方 /slash 命令类）

| Skill | 一句话用途 | 触发方式 |
|-------|-----------|---------|
| **agent-browser** | 浏览器自动化 CLI，支持导航/填表/截图/数据提取 | `/agent-browser` 或 "open a website", "scrape data" |
| **time-skill** | 显示巴基斯坦标准时间（PKT, UTC+5） | `/time-skill` 或 "current time", "Pakistan time" |
| **weather-fetcher** | 从 Open-Meteo API 获取迪拜当前气温 | `/weather-fetcher` 或 "weather", "temperature" |
| **weather-svg-creator** | 创建 SVG 天气卡片显示迪拜当前温度 | `/weather-svg-creator` 或 "weather card", "weather svg" |
| **diagnose** | 严谨诊断循环：复现→最小化→假设→验证→修复→回归测试 | `/diagnose` 或 "diagnose this", "debug this" |
| **grill-me** | 无情拷问计划/设计，直到决策树每个分支都清晰 | `/grill-me` 或 "grill me", "stress-test plan" |
| **grill-with-docs** | 针对现有领域模型和文档进行拷问，同步更新 CONTEXT.md/ADR | `/grill-with-docs` 或 "grill with docs" |
| **handoff** | 将当前对话压缩为 handoff 文档，供其他 agent 接力 | `/handoff` 或 "handoff", "compact conversation" |
| **tdd** | 测试驱动开发：红-绿-重构循环 | `/tdd` 或 "TDD", "red-green-refactor" |
| **to-prd** | 将当前对话上下文转为 PRD 并发布到 issue tracker | `/to-prd` 或 "create PRD", "turn into PRD" |
| **to-issues** | 将计划/PRD 拆分为可独立执行的 issue（tracer-bullet 切片） | `/to-issues` 或 "convert plan to issues", "create tickets" |
| **triage** | 基于 triage 角色的 issue 状态机管理 | `/triage` 或 "triage issues", "review bugs" |
| **ui-ux-pro-max** | UI/UX 设计智能，67 风格/96 色板/57 字体配对/25 图表/13 技术栈 | `/ui-ux-pro-max` 或 "design ui", "build ui", "create landing page" |
| **vision-analysis** | 使用 MiniMax vision MCP 工具分析/描述/提取图像信息 | `/vision-analysis` 或 "analyze image", "describe image", "OCR" |
| **git-commit** | 分析 diff 生成 Conventional Commits 规范提交信息 | `/git-commit` 或 "commit", "/commit", "git commit" |
| **git-guardrails-claude-code** | 设置 hooks 阻止危险 git 操作（push/reset --hard/clean/branch -D） | `/git-guardrails-claude-code` 或 "block git push", "prevent destructive git" |
| **gitnexus-cli** | GitNexus CLI 操作：索引仓库、生成 wiki、清理索引 | `/gitnexus-cli` 或 "index repo", "reanalyze", "generate wiki" |
| **gitnexus-debugging** | 调试 bug、追踪错误来源 | `/gitnexus-debugging` 或 "why is X failing", "trace this bug" |
| **gitnexus-exploring** | 探索代码库架构、追踪执行流、理解陌生代码 | `/gitnexus-exploring` 或 "how does X work", "show me auth flow" |
| **gitnexus-guide** | GitNexus 本身的使用指南、工具列表、查询语法 | `/gitnexus-guide` 或 "what GitNexus tools", "how to use GitNexus" |
| **gitnexus-impact-analysis** | 变更影响分析，改什么会炸 | `/gitnexus-impact-analysis` 或 "is it safe to change X", "what will break" |
| **gitnexus-pr-review** | PR 审查：变更内容、合并风险、测试覆盖 | `/gitnexus-pr-review` 或 "review this PR", "is PR safe to merge" |
| **gitnexus-refactoring** | 安全重构：重命名、提取、拆分、移动 | `/gitnexus-refactoring` 或 "rename function", "extract module" |
| **improve-codebase-architecture** | 基于 CONTEXT.md 和 ADR 发现架构深化机会 | `/improve-codebase-architecture` 或 "improve architecture", "refactor opportunities" |
| **migrate-to-shoehorn** | 将测试中的 `as` 断言迁移到 @total-typescript/shoehorn | `/migrate-to-shoehorn` 或 "shoehorn", "replace `as` in tests" |
| **readme-polish** | 分析项目结构 → 生成 Banner 图 → 组装规范 README | `/readme-polish` 或 "帮我写 README", "打磨 README" |
| **release-skills** | 通用发布工作流：自动检测版本文件、changelog、GitHub Release | `/release-skills` 或 "release", "发布", "bump version" |
| **review** | 双轴审查：Standards（代码规范）+ Spec（是否符合需求） | `/review` 或 "review since X", "review branch", "review PR" |
| **scaffold-exercises** | 创建练习目录结构（section/problem/solution/explainer），通过 lint | `/scaffold-exercises` 或 "scaffold exercises", "create exercise stubs" |
| **setup-pre-commit** | 配置 Husky + lint-staged + typecheck + test 的 pre-commit 流水线 | `/setup-pre-commit` 或 "pre-commit hooks", "Husky", "lint-staged" |
| **skill-creator** | 创建/修改/优化 skills，运行 evals，benchmark 性能 | `/skill-creator` 或 "create skill", "write skill", "optimize skill" |
| **soulmate** | 温暖人性化沟通模式，gentle/warm/radiant 三档 | `/soulmate` 或 "soulmate mode", "be warm", "more emotion" |
| **prototype** | 快速原型：终端 app 或多种 UI 变体切换 | `/prototype` 或 "prototype this", "mock up UI", "try designs" |
| **caveman** | ultra-compressed 通信，token 消耗降低约 75% | `/caveman` 或 "caveman mode", "less tokens", "be brief" |
| **zoom-out** | 拉高视角，给出更宏观的上下文 | `/zoom-out` 或 "zoom out", "bigger picture" |
| **verify** | 运行应用并观察行为，验证代码变更是否生效 | `/verify` 或 "verify", "confirm a fix works" |
| **code-review** | 审查 diff 的正确性 bug 和复用/简化/效率优化 | `/code-review` 或 "code review", "review diff" |
| **simplify** | 审查变更代码的复用、简化、效率和高层次优化，并应用修复 | `/simplify` 或 "simplify", "refactor" |
| **fewer-permission-prompts** | 扫描 transcript 中的只读 Bash/MCP 调用，添加 allowlist 减少权限提示 | `/fewer-permission-prompts` 或 "fewer prompts", "reduce permissions" |
| **loop** | 在循环间隔上运行 prompt 或 slash 命令 | `/loop` 或 "loop", "recurring task", "poll every" |
| **run** | 启动并驱动项目应用以查看变更效果 | `/run` 或 "run", "start", "screenshot the app" |
| **init** | 初始化新的 CLAUDE.md 文件及代码库文档 | `/init` 或 "init CLAUDE.md", "setup codebase docs" |
| **security-review** | 安全审查：检查代码中的安全漏洞和风险 | `/security-review` 或 "security review", "audit security" |
| **deep-research** | 深度研究：扇出搜索、获取来源、对抗性验证、合成引用报告 | `/deep-research` 或 "deep research", "research report" |
| **writing-dna** | 个人写作风格指纹提取与复用工具，去除 AI 味 | `/writing-dna` 或 "writing DNA", "my writing style" |
| **zhihu-search** | 搜索知乎站内内容，返回结构化结果 | `/zhihu-search` 或 "知乎", "知乎搜索" |
| **obsidian-vault** | Obsidian 笔记库搜索、创建、管理（支持 wikilink 和索引笔记） | `/obsidian-vault` 或 "obsidian", "find notes", "create note" |
| **ppt-master** | 多格式 SVG 内容生成系统，PDF/DOCX/URL/Markdown → SVG → PPTX | `/ppt-master` 或 "create PPT", "make presentation", "生成 PPT" |
| **claude-api** | 构建、调试和优化 Claude API / Anthropic SDK 应用 | `/claude-api` 或 "Claude API", "Anthropic SDK" |
| **update-config** | 通过 settings.json 配置 Claude Code harness | `/update-config` 或 "update config", "configure settings" |
| **keybindings-help** | 自定义键盘快捷键、重新绑定按键、修改 keybindings.json | `/keybindings-help` 或 "rebind keys", "customize keybindings" |
| **buddy** | 展示、抚摸或管理你的编码伙伴 | `/buddy` 或 "buddy", "pet" |
| **buddy-sings** | 让你的 Claude Code 伙伴唱歌 | `/buddy-sings` 或 "buddy sing", "pet sing" |
| **agent-skill-creator** | 从工作流描述创建跨平台 agent skills | `/agent-skill-creator` 或 "create agent", "automate workflow" |
| **write-a-skill** | 创建具有正确结构、渐进披露和资源捆绑的新 agent skill | `/write-a-skill` 或 "write a skill", "create new skill" |
| **edit-article** | 文章编辑：重构段落、提升清晰度、精简表达 | `/edit-article` 或 "edit article", "revise", "improve article" |
| **writing-shape** | 将 raw material 逐步塑造成文章（逐段生长、格式讨论） | `/writing-shape` 或 "shape article", "turn notes into article" |
| **writing-fragments** | 挖掘写作碎片（观点、场景、句子），追加到单一文档 | `/writing-fragments` 或 "fragments", "ideate", "raw material" |
| **writing-beats** | 以"节拍"为单位组装文章，choose-your-own-adventure 风格 | `/writing-beats` 或 "beats", "narrative", "story beats" |
| **excalidraw-skill** | 创建 Excalidraw 图表 JSON 文件，用于视觉论证 | `/excalidraw-skill` 或 "excalidraw", "visualize workflow" |
| **anysearch** | 实时搜索引擎，支持 23 个垂直领域、并行批量搜索、URL 内容提取 | `/anysearch` 或 "search", "web search", "搜索" |

---

## 2. HeroUI 生态 Skills

| Skill | 一句话用途 | 触发方式 |
|-------|-----------|---------|
| **heroui-react-pro** | HeroUI Pro React 组件库（图表、表单、导航、覆盖层、数据展示） | `/heroui-react-pro` 或 "heroui pro", "Pro component", "DataGrid" |
| **heroui-native-pro** | HeroUI Pro Native 组件库（React Native 日期选择器、步进器、进度按钮等） | `/heroui-native-pro` 或 "heroui native pro", "React Native", "Uniwind" |
| **heroui-pro-design-taste** | HeroUI 设计系统的设计品味档案，78 条设计原则 | `/heroui-pro-design-taste` 或 "heroui design", "heroui spacing", "heroui typography" |

---

## 3. UI/UX 设计 Skills

| Skill | 一句话用途 | 触发方式 |
|-------|-----------|---------|
| **ui-ux-pro-max** | UI/UX 设计智能，67 风格/96 色板/57 字体配对/25 图表/13 技术栈 | `/ui-ux-pro-max` 或 "design ui", "build ui", "create landing page" |
| **taste-skill** | 前端设计品味 skill，反 sloppy 设计 | `/taste-skill` 或 "design taste", "anti-slop", "premium frontend" |
| **taste-skill-v1** | 前端设计品味 skill v1 版本 | `/taste-skill-v1` 或 "taste", "design taste" |
| **brandkit** | 品牌 kit 生成与管理 | `/brandkit` 或 "brand kit", "brand identity" |
| **brutalist-skill** | 粗野主义设计风格 skill | `/brutalist-skill` 或 "brutalist", "brutalism" |
| **minimalist-skill** | 极简主义设计风格：温暖单色、排版对比、扁平 bento 网格 | `/minimalist-skill` 或 "minimalist", "clean design", "editorial" |
| **soft-skill** | 柔和设计风格 skill | `/soft-skill` 或 "soft", "soft design" |
| **stitch-skill** | 拼接/组合设计风格 skill | `/stitch-skill` 或 "stitch", "combine designs" |
| **redesign-skill** | 重设计 skill | `/redesign-skill` 或 "redesign", "redesign this" |
| **output-skill** | 输出/导出设计 skill | `/output-skill` 或 "output", "export design" |
| **image-to-code-skill** | 图像转代码 skill | `/image-to-code-skill` 或 "image to code", "convert image to code" |
| **imagegen-frontend-mobile** | 移动端前端图像生成 | `/imagegen-frontend-mobile` 或 "mobile image", "mobile frontend image" |
| **imagegen-frontend-web** | Web 前端图像生成 | `/imagegen-frontend-web` 或 "web image", "frontend image" |
| **gpt-tasteskill** | GPT 设计品味 skill | `/gpt-tasteskill` 或 "GPT taste", "taste skill" |

---

## 4. Git / 开发工具 Skills

| Skill | 一句话用途 | 触发方式 |
|-------|-----------|---------|
| **git-commit** | 分析 diff 生成 Conventional Commits 规范提交信息 | `/git-commit` 或 "commit", "/commit" |
| **git-guardrails-claude-code** | 设置 hooks 阻止危险 git 操作 | `/git-guardrails-claude-code` 或 "block git push", "git safety hooks" |
| **gitnexus-cli** | GitNexus CLI 操作：索引仓库、生成 wiki、清理索引 | `/gitnexus-cli` 或 "index repo", "reanalyze" |
| **gitnexus-debugging** | 调试 bug、追踪错误来源 | `/gitnexus-debugging` 或 "why is X failing", "trace this bug" |
| **gitnexus-exploring** | 探索代码库架构、追踪执行流 | `/gitnexus-exploring` 或 "how does X work", "trace execution" |
| **gitnexus-guide** | GitNexus 使用指南、工具列表 | `/gitnexus-guide` 或 "what GitNexus tools" |
| **gitnexus-impact-analysis** | 变更影响分析，改什么会炸 | `/gitnexus-impact-analysis` 或 "is it safe to change X" |
| **gitnexus-pr-review** | PR 审查：变更内容、合并风险 | `/gitnexus-pr-review` 或 "review this PR" |
| **gitnexus-refactoring** | 安全重构：重命名、提取、拆分、移动 | `/gitnexus-refactoring` 或 "rename function", "extract module" |
| **setup-pre-commit** | 配置 Husky + lint-staged + typecheck + test 流水线 | `/setup-pre-commit` 或 "pre-commit hooks", "Husky" |
| **migrate-to-shoehorn** | 将测试中的 `as` 断言迁移到 @total-typescript/shoehorn | `/migrate-to-shoehorn` 或 "shoehorn" |
| **scaffold-exercises** | 创建练习目录结构，通过 lint | `/scaffold-exercises` 或 "scaffold exercises" |
| **improve-codebase-architecture** | 基于 CONTEXT.md 和 ADR 发现架构深化机会 | `/improve-codebase-architecture"` 或 "improve architecture" |
| **code-review** | 审查 diff 的正确性 bug 和复用/简化/效率优化 | `/code-review` 或 "code review" |
| **simplify** | 审查变更代码的复用、简化、效率优化 | `/simplify` 或 "simplify" |
| **security-review** | 安全审查：检查代码中的安全漏洞 | `/security-review` 或 "security review" |
| **diagnose** | 严谨诊断循环：复现→最小化→假设→验证→修复→回归测试 | `/diagnose` 或 "diagnose this", "debug this" |
| **tdd** | 测试驱动开发：红-绿-重构循环 | `/tdd` 或 "TDD", "test-first" |
| **prototype** | 快速原型：终端 app 或多种 UI 变体切换 | `/prototype` 或 "prototype this" |
| **verify** | 运行应用并观察行为，验证代码变更 | `/verify` 或 "verify", "confirm a fix works" |
| **run** | 启动并驱动项目应用 | `/run` 或 "run", "start" |
| **init** | 初始化新的 CLAUDE.md 文件及代码库文档 | `/init` 或 "init CLAUDE.md" |
| **claude-api** | 构建、调试和优化 Claude API / Anthropic SDK 应用 | `/claude-api` 或 "Claude API" |
| **release-skills** | 通用发布工作流 | `/release-skills` 或 "release", "bump version" |
| **review** | 双轴审查：Standards + Spec | `/review` 或 "review since X" |

---

## 5. 内容创作 Skills（Baoyu 系列）

| Skill | 一句话用途 | 触发方式 |
|-------|-----------|---------|
| **baoyu-article-illustrator** | 分析文章结构，识别需配图位置，Type×Style×Palette 三维度生成插图 | `/baoyu-article-illustrator` 或 "illustrate article", "为文章配图" |
| **baoyu-comic** | 知识漫画生成，多艺术风格，面板布局，批量生成 | `/baoyu-comic` 或 "知识漫画", "教育漫画", "tutorial comic" |
| **baoyu-compress-image** | 图片压缩转 WebP/PNG | `/baoyu-compress-image` 或 "compress image", "optimize image", "convert to webp" |
| **baoyu-cover-image** | 文章封面图生成，5 维度 × 11 色板 × 7 渲染风格 | `/baoyu-cover-image` 或 "generate cover", "create article cover", "封面" |
| **baoyu-danger-gemini-web** | Gemini Web API 逆向，文生图/图生文/多轮对话 | `/baoyu-danger-gemini-web` 或 "generate image with Gemini" |
| **baoyu-danger-x-to-markdown** | X/Twitter 推文/文章转 Markdown（YAML frontmatter） | `/baoyu-danger-x-to-markdown` 或 "X to markdown", "tweet to markdown" |
| **baoyu-diagram** | 深色科技风 SVG 图表（slate-900 + cyan/emerald），9 种类型 | `/baoyu-diagram` 或 "diagram", "画个图", "画一个架构图" |
| **baoyu-electron-extract** | Electron 应用 .asar 解包提取源码 | `/baoyu-electron-extract` 或 "extract Electron", "提取 .asar" |
| **baoyu-format-markdown** | Markdown 格式化，frontmatter/标题/摘要/列表/代码块 | `/baoyu-format-markdown` 或 "format markdown", "beautify article", "美化文章" |
| **baoyu-image-gen** | 多 provider AI 生图底层（OpenAI/Google/阿里/字节等 11 家） | `/baoyu-image-gen` 或 "generate image", "create image", "生成图片" |
| **baoyu-infographic** | 21 布局 × 22 风格信息图，完整内容分析→结构化→图像生成 | `/baoyu-infographic` 或 "infographic", "信息图", "可视化" |
| **baoyu-markdown-to-html** | Markdown 转样式化 HTML，支持代码高亮/数学/Mermaid/PlantUML | `/baoyu-markdown-to-html` 或 "markdown to html", "md 转 html" |
| **baoyu-post-to-wechat** | 微信公众号文章/贴图发布（API 或 Chrome CDP） | `/baoyu-post-to-wechat` 或 "发布公众号", "微信公众号", "贴图/图文/文章" |
| **baoyu-post-to-weibo** | 微博发布（文字/图片/视频/头条文章） | `/baoyu-post-to-weibo` 或 "post to Weibo", "发微博", "发布微博" |
| **baoyu-post-to-x** | X/Twitter 发布（含长文 X Articles） | `/baoyu-post-to-x` 或 "post to X", "tweet", "publish to Twitter" |
| **baoyu-slide-deck** | PPT/幻灯片生成，从内容到单页图片 | `/baoyu-slide-deck` 或 "create slides", "presentation", "PPT", "slide deck" |
| **baoyu-translate** | 三模式翻译（快速/标准/精翻），支持术语一致性和 EXTEND.md 词汇表 | `/baoyu-translate` 或 "translate", "翻译", "精翻", "本地化" |
| **baoyu-url-to-markdown** | 任意 URL 转 Markdown（支持 X/Twitter/YouTube/HN） | `/baoyu-url-to-markdown` 或 "save webpage", "url to markdown", "保存网页" |
| **baoyu-wechat-summary** | 微信群聊总结（正常/毒舌版），维护群组历史 | `/baoyu-wechat-summary` 或 "总结群聊", "群聊精华", "summarize group chat" |
| **baoyu-xhs-images** | 社交媒体信息图卡片（1-10 张），12 风格 × 8 布局 | `/baoyu-xhs-images` 或 "小红书图片", "小红书种草", "image cards" |
| **baoyu-youtube-transcript** | YouTube 字幕/封面下载，支持翻译/章节/说话人识别 | `/baoyu-youtube-transcript` 或 "get YouTube transcript", "YouTube字幕", "视频封面" |

---

## 6. MiniMax / 多媒体 Skills

| Skill | 一句话用途 | 触发方式 |
|-------|-----------|---------|
| **minimax-docx** | 创建/编辑 Word 文档（.docx），支持中国公文格式标准 | `/minimax-docx` 或 "docx", "Word", "文档", "公文" |
| **minimax-multimodal-toolkit** | 通过 MiniMax AI 平台生成文本、图像、视频、语音、音乐 | `/minimax-multimodal-toolkit` 或 "MiniMax", "multimodal", "mmx" |
| **minimax-music-gen** | MiniMax 音乐生成 | `/minimax-music-gen` 或 "音乐生成", "AI作曲", "music generation" |
| **minimax-pdf** | 创建精美 PDF（报告/简历/提案）、填写 PDF 表单、重新格式化 | `/minimax-pdf` 或 "PDF", "生成报告", "填写表单", "精美文档" |
| **minimax-xlsx** | 打开/创建/读取/分析/编辑 Excel 表格，支持公式/透视/财务格式化 | `/minimax-xlsx` 或 "Excel", "xlsx", "spreadsheet", "表格", "财务模型" |
| **mmx-cli** | MiniMax CLI 多模态工具（文本/图像/视频/语音/音乐/搜索/视觉） | `/mmx-cli` 或 "mmx", "MiniMax CLI", "多模态工具" |
| **vision-analysis** | 使用 MiniMax vision MCP 工具分析/描述/提取图像信息 | `/vision-analysis` 或 "图像分析", "图片识别", "视觉分析" |
| **minimax-music-playlist** | 音乐歌单创建与管理 | `/minimax-music-playlist` 或 "歌单", "playlist", "音乐推荐" |
| **buddy-sings** | AI 歌声合成 | `/buddy-sings` 或 "唱歌", "AI唱歌", "歌声合成" |
| **gif-sticker-maker** | GIF/贴纸制作 | `/gif-sticker-maker` 或 "GIF", "表情包", "sticker", "动图" |

---

## 7. 系统/配置 Skills

| Skill | 一句话用途 | 触发方式 |
|-------|-----------|---------|
| **update-config** | 通过 settings.json 配置 Claude Code harness | `/update-config` 或 "update config", "configure settings", "allow npm commands" |
| **keybindings-help** | 自定义键盘快捷键、重新绑定按键、修改 keybindings.json | `/keybindings-help` 或 "rebind keys", "customize keybindings", "change submit key" |
| **fewer-permission-prompts** | 扫描 transcript 添加 allowlist 减少权限提示 | `/fewer-permission-prompts` 或 "fewer prompts", "reduce permission prompts" |
| **loop** | 在循环间隔上运行 prompt 或 slash 命令 | `/loop` 或 "loop", "recurring task", "poll every 5 minutes" |
| **skill-creator** | 创建/修改/优化 skills，运行 evals，benchmark 性能 | `/skill-creator` 或 "create skill", "optimize skill" |
| **agent-skill-creator** | 从工作流描述创建跨平台 agent skills | `/agent-skill-creator` 或 "create agent", "automate workflow" |
| **write-a-skill** | 创建具有正确结构的新 agent skill | `/write-a-skill` 或 "write a skill" |
| **caveman** | ultra-compressed 通信，token 消耗降低约 75% | `/caveman` 或 "caveman mode", "less tokens" |
| **soulmate** | 温暖人性化沟通模式 | `/soulmate` 或 "soulmate mode", "be warm" |
| **handoff** | 将当前对话压缩为 handoff 文档 | `/handoff` 或 "handoff" |
| **grill-me** | 无情拷问计划/设计 | `/grill-me` 或 "grill me" |
| **grill-with-docs** | 针对领域模型和文档进行拷问 | `/grill-with-docs` 或 "grill with docs" |

---

## 8. 仓库本地 Skills（.claude/skills/）

| Skill | 一句话用途 | 触发方式 |
|-------|-----------|---------|
| **my-claude-repo-manager** | 仓库索引管理、分类、归档与统计技能，确保 registry 始终反映仓库真实状态 | `/my-claude-repo-manager` 或 "scan repo", "update index", "archive old docs", "repo statistics", "扫描仓库", "更新索引", "归档旧文档", "仓库统计" |
| **report-to-doc-distiller** | 将 reports/raw/ 原始报告提炼为 docs/ 长期知识文档 | `/report-to-doc-distiller` 或 "distill report", "提炼报告", "convert report", "整理调研" |

---

## 汇总统计

| 分类 | 数量 | 核心代表 |
|------|------|---------|
| Claude Code 内置 Skills | 50+ | diagnose, tdd, git-commit, gitnexus 系列, review, handoff, prototype, anysearch, vision-analysis, deep-research, writing-dna 等 |
| HeroUI 生态 Skills | 3 | heroui-react-pro, heroui-native-pro, heroui-pro-design-taste |
| UI/UX 设计 Skills | 14 | ui-ux-pro-max, taste-skill, brandkit, brutalist-skill, minimalist-skill, image-to-code-skill 等 |
| Git / 开发工具 Skills | 25 | git-commit, git-guardrails, gitnexus 系列, setup-pre-commit, code-review, diagnose, tdd, verify, run 等 |
| 内容创作 Skills（Baoyu） | 21 | baoyu-image-gen, baoyu-translate, baoyu-diagram, baoyu-post-to-X/WeChat/Weibo, baoyu-slide-deck, baoyu-youtube-transcript 等 |
| MiniMax / 多媒体 Skills | 10 | minimax-docx, minimax-xlsx, minimax-pdf, minimax-music-gen, mmx-cli, vision-analysis 等 |
| 系统/配置 Skills | 12 | update-config, keybindings-help, fewer-permission-prompts, loop, skill-creator, caveman, soulmate 等 |
| 仓库本地 Skills | 2 | my-claude-repo-manager, report-to-doc-distiller |
| **合计** | **137+** | — |

---

## Source Material

- `archive/2026-05-30/Claude Code 本机 Skills 全量汇总.md` — 2026-05-27 扫描的原始素材，包含 67 个 skill 目录 + 1 个 MCP 服务器的详细分类
- `registry/manifests/skills-manifest.json` — 当前 registry 中已记录的 7 条 skill 条目
- 系统提示中列出的当前环境可用 Skills（2026-05-31 会话快照）
