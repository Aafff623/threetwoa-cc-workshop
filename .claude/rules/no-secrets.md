---
name: no-secrets
description: 防止 API key、token、凭证、私钥等敏感信息写入仓库。当写入任何文件时触发扫描。包含检测模式、严重等级分类、豁免规则和恢复流程。
---

# No Secrets 安全规范

## 触发条件

写入任何文件时触发扫描。包括创建新文件、编辑现有文件、移动文件。

## 1. 检测模式（扩展版）

### 🔴 Critical — 真实凭证

| 模式类型 | 正则模式 | 示例 |
|---------|---------|------|
| OpenAI API Key | `sk-[a-zA-Z0-9]{20,}` | `sk-proj-abc123...` |
| Anthropic API Key | `sk-ant-[a-zA-Z0-9]{20,}` | `sk-ant-api03-...` |
| Bearer Token | `Bearer [a-zA-Z0-9\-._~+/]+=*` | `Bearer eyJhbG...` |
| 密码字段 | `(password|passwd|pwd|secret_key|secretkey)\s*[:=]\s*['"`][^'"`]{4,}` | `password: "myR3alP@ss"` |
| GitHub Token | `gh[ps]_[a-zA-Z0-9]{36,}` | `ghp_xxxxxxxxxxxx` |
| GitLab Token | `glpat-[a-zA-Z0-9\-]{20,}` | `glpat-xxxxxxxxxxxx` |
| npm Token | `npm_[a-zA-Z0-9]{36,}` | `npm_xxxx...` |
| HP Key | `hp_[a-zA-Z0-9]{20,}` | `hp_xxxxxxxxxxxx` |
| HeroUI Token | `heroui-[a-zA-Z0-9]{16,}` | `heroui-pro-xxxxx` |
| SSH Private Key | `-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----` | `-----BEGIN OPENSSH PRIVATE KEY-----` |
| 数据库连接串 | `(mongodb|postgres|mysql|redis)://[^\s'"`]{10,}` | `postgres://user:pass@host:5432/db` |
| OAuth Client Secret | `(client_secret|clientSecret)\s*[:=]\s*['"`][a-zA-Z0-9\-._]{16,}` | `client_secret: "gk8x..."` |
| JWT Token | `eyJ[a-zA-Z0-9\-_]+\.eyJ[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+` | `eyJhbGci...` |
| 加密密钥 | `(ENCRYPTION_KEY|AES_KEY|encryption_key)\s*[:=]\s*['"`][a-zA-Z0-9+/=]{16,}` | `ENCRYPTION_KEY: "abc..."` |
| AWS Access Key | `AKIA[A-Z0-9]{16,}` | `AKIAIOSFODNN7EXAMPLE` |
| AWS Secret Key | `(aws_secret_access_key|AWS_SECRET_ACCESS_KEY)\s*[:=]\s*['"`][a-zA-Z0-9/+=]{30,}` | `aws_secret_access_key: "wJal..."` |
| GCP Service Account | `"type"\s*:\s*"service_account"` + 含 `private_key` 字段 | 整个 JSON 对象 |
| Webhook URL + Auth | `https://[^/\s]+/[^\s]*?(key|token|secret|auth)=[a-zA-Z0-9\-._]{8,}` | `https://hooks.slack.com/?token=xoxb-...` |

### 🟡 Warning — 疑似凭证

| 模式类型 | 说明 |
|---------|------|
| Base64 编码密钥 | 64 位以上连续 Base64 字符，非明显测试数据 |
| 通用 key/value 对 | `api_key`, `apikey`, `token`, `auth_token` 后跟非占位符值 |
| 连接字符串模式 | `host:port` 后跟用户名密码模式 |
| 长随机字符串 | 32+ 字符的随机字母数字串（可能是 token） |

### 🔵 Info — 明显测试数据

| 模式类型 | 说明 |
|---------|------|
| 占位符值 | `YOUR_API_KEY_HERE`, `<API_KEY>`, `REPLACE_ME`, `xxx` |
| 示例域名 | `example.com`, `localhost`, `127.0.0.1` |
| 明显假密码 | `password`, `123456`, `test`, `dummy` |

## 2. 严重等级分类与响应

### 🔴 Critical — 立即阻断

检测到真实凭证模式时：
1. **阻断写入** — 拒绝保存文件
2. **高亮位置** — 指出具体行号和匹配内容
3. **提供替代方案**：
   - 使用环境变量：`process.env.API_KEY` / `$env:API_KEY`
   - 使用占位符：`<YOUR_API_KEY_HERE>` / `REPLACE_WITH_YOUR_KEY`
   - 移至 `.env.local`（已在 `.gitignore` 中）

### 🟡 Warning — 需确认
检测到疑似凭证时：
1. **暂停写入** — 要求用户确认是否为真实凭证
2. 用户确认安全后可继续写入
3. 建议添加注释说明

### 🔵 Info — 放行但记录

检测到明显测试数据时：
1. **正常写入** — 不阻断
2. 在日志中记录检出信息（可选）

## 3. 允许模式与豁免

### 免检文件

以下文件允许包含模式字符串（但不应包含真实凭证）：

| 文件模式 | 用途 |
|---------|------|
| `.env.example` | 环境变量示例（占位符值） |
| `settings.example.json` | 配置示例 |
| `*.example.*` | 任何示例文件 |
| `*.test.*` / `*.spec.*` | 测试文件（使用 mock 数据） |
| `no-secrets.md` | 本规范文件自身 |

### 允许的占位符模式

```
<YOUR_API_KEY_HERE>
REPLACE_WITH_YOUR_KEY
process.env.API_KEY
$env:API_KEY
${API_KEY}
YOUR_TOKEN_HERE
placeholder
dummy_key_for_test
```

### 豁免声明

如果确需提交含模式字符串的文件（如测试用假凭证）：
1. 在文件头部添加注释：`<!-- SECRETS-EXEMPT: test-only fake key, no real credentials -->`
2. 在 git commit message 中注明：`chore(tests): add mock config (SECRETS-EXEMPT)`

## 4. 环境变量模式

### 应放入 .env 的内容

```
API_KEY=xxx
SECRET_KEY=xxx
DATABASE_URL=xxx
OAUTH_CLIENT_SECRET=xxx
ENCRYPTION_KEY=xxx
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
```

### 应放入 .env.example 的内容

```
API_KEY=<YOUR_API_KEY_HERE>
SECRET_KEY=<YOUR_SECRET_KEY_HERE>
DATABASE_URL=<YOUR_DATABASE_URL_HERE>
```

### 应放入代码的内容

```javascript
// 正确：从环境变量读取
const apiKey = process.env.API_KEY;

// 错误：硬编码
const apiKey = "sk-proj-xxxxxxxx";
```

**`.env` 文件必须在 `.gitignore` 中被排除。**

## 5. Git 安全检查

### .gitignore 必须包含

```
.env
.env.local
.env.*.local
*.pem
*.key
credentials.json
service-account.json
```

### Pre-commit Hook 建议

在 `.husky/pre-commit` 或等效钩子中添加：

```bash
# 检查是否有遗漏的密钥
git diff --cached --name-only | xargs grep -lE '(sk-[a-zA-Z0-9]{20}|AKIA[A-Z0-9]{16}|ghp_[a-zA-Z0-9]{36})' && echo "SECRETS DETECTED" && exit 1
```

## 6. 泄露恢复流程

如果不慎将凭证提交到 git 仓库：

### 步骤 1：立即轮换凭证

在对应平台上重新生成 API key / token / password。这是**最优先**的操作。

### 步骤 2：从 git 历史中移除

```bash
# 使用 git-filter-repo（推荐）
pip install git-filter-repo
git filter-repo --path .env --invert-paths

# 或使用 BFG Repo-Cleaner
java -jar bfg.jar --delete-files .env
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

### 步骤 3：强制推送

```bash
git push origin --force --all
```

### 步骤 4：通知协作者

通知所有有仓库访问权限的人：
- 旧凭证已失效，需更新本地配置
- 执行 `git pull --rebase` 获取清理后的历史

## 7. 上下文特定规则

### HP Key 模式

`hp_` 前缀的 HeroUI Pro 许可密钥：
- 禁止硬编码在源码中
- 通过环境变量传入：`process.env.HEROUI_PRO_KEY`
- `.env.example` 中使用：`HEROUI_PRO_KEY=<YOUR_KEY_HERE>`

### HeroUI Token 模式

`heroui-` 前缀的授权令牌：
- 同 HP Key 处理方式
- 不得出现在 `git` 跟踪的文件中

### 数据库连接串模式

包含用户名密码的连接字符串：
- `postgres://user:password@host:port/db` — 🔴 Critical
- `postgres://user:password@localhost:5432/test` — 🟡 Warning（可能用于本地开发）
- `postgres://user:<YOUR_PASSWORD>@host/db` — 🔵 Info（占位符）

## 8. 扫描范围调整

以下目录默认不扫描（但建议定期人工审查）：
- `node_modules/` — 第三方依赖
- `.git/` — git 内部数据
- `archive/` — 已归档文件（仅标记，不阻断）
- `dist/` / `build/` — 构建产物