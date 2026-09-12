# vbean-codemod

SoybeanUI → VBean 重命名的迁移脚本。零运行时依赖，Node 18+，**默认 dry-run**。

方案背景与完整影响面：见 [`docs/rebrand-vbean.md`](../../docs/rebrand-vbean.md)。
面向消费者的升级步骤：见 `apps/docs/src/content/{zh,en}/ui/migration/v0.50.0.md`。

## 用法

```bash
# 1. 先预览（不写盘）
node tools/vbean-codemod/migrate.mjs .

# 2. 确认后写入
node tools/vbean-codemod/migrate.mjs . --write

# 3. 若在 CSS / e2e 选择器里用过 data-soybean-* 或 var(--soybean-*)
node tools/vbean-codemod/migrate.mjs . --write --runtime-contract

# 4. 同时迁移 sbean CLI 引用
node tools/vbean-codemod/migrate.mjs . --write --cli

# 5. 连域名 / CDN / 仓库地址一起迁移（Phase 0 定域名后）
node tools/vbean-codemod/migrate.mjs . --write --cli --new-domain=vbean.dev --repo-slug=soybeanjs/vbean

# 6. 本仓库自改（额外处理品牌文案与私有包名）
node tools/vbean-codemod/migrate.mjs . --profile=repo --write
```

| 选项                       | 说明                                                                           |
| -------------------------- | ------------------------------------------------------------------------------ |
| `--write`                  | 真正写入文件；缺省为预览                                                       |
| `--profile=<name>`         | `consumer`（默认）或 `repo`                                                    |
| `--runtime-contract`       | 改写 `data-soybean-*` → `data-vbean-*`、`--soybean-*` → `--vbean-*`            |
| `--cli`                    | 改写 `sbean.json` / `npx sbean` 等 CLI 引用（**不改文件名**）                  |
| `--new-domain=<域名>`      | 改写 host：`ui.soybeanjs.cn` → `<域名>`、`r2.soybeanjs.tech` → `assets.<域名>` |
| `--new-cdn=<主机名>`       | 覆盖 CDN 目标域名（默认 `assets.<新域名>`）                                    |
| `--repo-slug=<owner/repo>` | 改写 `github.com/soybeanjs/soybean-ui` → `github.com/<owner/repo>`             |
| `--quiet`                  | 只输出汇总，不逐文件打印 diff                                                  |
| `-h, --help`               | 帮助                                                                           |

## 改写规则

**Tier A — 包名与 import（始终生效）**

| 现状                                  | 目标             |
| ------------------------------------- | ---------------- |
| `@soybeanjs/headless`                 | `@vbean/aria`    |
| `@soybeanjs/ui`                       | `@vbean/ui`      |
| `@soybeanjs/theme`                    | `@vbean/theme`   |
| `@soybeanjs/ui-uno`                   | `@vbean/uno`     |
| `@soybeanjs/ui-skills`                | `@vbean/skills`  |
| `/headless\/dist\//`（Nuxt 排除路径） | `/aria\/dist\//` |

**Tier B — 运行时契约（`--runtime-contract`，会破坏消费者自定义 CSS）**

| 现状             | 目标           | 规模                     |
| ---------------- | -------------- | ------------------------ |
| `data-soybean-*` | `data-vbean-*` | 511 个唯一属性、1,539 处 |
| `--soybean-*`    | `--vbean-*`    | 92 个唯一变量、212 处    |

**Tier C — 品牌文案与私有包（`--profile=repo`）**

`SoybeanUI → VBean`、`SoybeanHeadless → VBean Aria`、`soybean-ui-uno → vbean-uno`、
`@soybeanjs/{scripts,shared,ui-docs,ui-nuxt} → @vbean/*`、logo 资产名。

**Tier D — 域名与 URL（`--new-domain`，不传则完全不生效）**

| 现状                                 | 目标                                | 本仓库规模                 |
| ------------------------------------ | ----------------------------------- | -------------------------- |
| `ui.soybeanjs.cn`（docs + registry） | `<新域名>`（路径不变）              | 258 处                     |
| `r2.soybeanjs.tech`（CDN）           | `assets.<新域名>`（或 `--new-cdn`） | 10 处                      |
| `github.com/soybeanjs/soybean-ui`    | `github.com/<repo-slug>`            | 2,845 处（2,766 为生成物） |

刻意**不改写** `github.com/soybeanjs`（org 是否改名是独立决策）与 CDN 对象路径前缀
`/soybeanjs/...`（它标识桶内对象，不搬对象就改 URL 会 404；应给 bucket 绑自定义域）。

### 刻意的排除项

| 排除项                                                    | 原因                                                         |
| --------------------------------------------------------- | ------------------------------------------------------------ |
| `@soybeanjs/cva`、`@soybeanjs/colord`                     | 通用工具包，与 UI 品牌无绑定，不在本次改名范围               |
| `@soybeanjs/ui-x`、`@soybeanjs/admin`、`@soybeanjs/chart` | v0.40.0 已下线，文档中的引用属历史记录                       |
| `@soybeanjs/headless-x`                                   | 同 scope 的其他包，负向前瞻 `(?![-\w])` 保证不被半替换       |
| `__SOYBEAN_THEME` / `__SOYBEAN_THEME_CSS`                 | localStorage key，品牌不可见；改名只会静默清空用户已保存主题 |
| `S` 组件前缀（`SButton` …）                               | 不在本次改名范围，改前缀是另一件事                           |
| `--size` / `--radius` / `--primary` 等设计令牌            | 本就无品牌前缀，shadcn 兼容契约，改名后零影响                |
| `pnpm-lock.yaml` / `package-lock.json` / `yarn.lock`      | lockfile 不能字符串改写，删除后重装                          |
| `CHANGELOG.md`（repo profile）                            | 历史记录是审计资产，不回改                                   |
| `node_modules`、`dist`、`.nuxt`、`.output` 等             | 构建产物与依赖目录                                           |

## 安全性保证

- **默认不写盘**，`--write` 才落盘，并打印逐文件 diff 摘要。
- **幂等**：跑第二次是 0 变更（已验证）。
- **负向前瞻**：`@soybeanjs/ui(?![-\w])` 保证 `@soybeanjs/ui-uno`、`@soybeanjs/ui-docs`、`@soybeanjs/ui-x` 不被半替换为 `@vbean/ui-uno` 之类。
- **二进制防护**：含 `\u0000` 的文件跳过；超过 4 MB 的文件跳过。

## 覆盖不到的部分（脚本会打印清单）

1. **目录改名**：`git mv packages/headless packages/aria`（`sbean` 的目录已由 v0.50.0 Phase A 迁移为 `packages/cli`，此处只需改包名，不再动目录）。
2. **lockfile**：删除后重装。
3. **代码生成物**：`pnpm sui gen catalog aria`、`gen api`、`gen changelog` 全量重跑。
4. **`packages/scripts/src/commands/catalog.ts`**：`CatalogTarget = 'headless' | 'ui'` 与 `srcDir` 需手改（类型层面，不是字符串替换）。
5. **DNS / 301 / npm org / 徽章**：host 字符串已由 `--new-domain` 覆盖，但 DNS 解析、旧域名**路径保持型** 301（`/r/*`、`/schema/*`、`/llms*.txt` 必须逐路径保留，跳首页会让存量 CLI 直接坏掉）、npm org 改名、README 徽章仍需人工。
6. **`sbean.json` 文件改名**：脚本只改内容引用，不改文件名。
7. **生成物 diff 是表象**：`apps/docs/src/generated/**`、`apps/docs/public/r/**`、`packages/cli/registry.json` 在重跑 `pnpm sui gen` 后会被覆盖，不必逐行审阅。

## 测试

```bash
# 在临时 fixture 上验证
node tools/vbean-codemod/migrate.mjs /tmp/your-fixture
node tools/vbean-codemod/migrate.mjs /tmp/your-fixture --write
node tools/vbean-codemod/migrate.mjs /tmp/your-fixture --write   # 应输出「没有需要变更的内容」

# 在本仓库上估算影响面（只读）
node tools/vbean-codemod/migrate.mjs . --profile=repo --runtime-contract --cli --quiet

# 含域名规则的影响面
node tools/vbean-codemod/migrate.mjs . --profile=repo --runtime-contract --cli --new-domain=vbean.dev --repo-slug=soybeanjs/vbean --quiet
```

本仓库实测影响面（2026-09-11 基线）：扫描 3,043 个文件，命中 1,974 个（含域名规则），耗时 < 1s。

## 组件前缀重命名（`rename-components.mjs`）

**这个脚本建议不用。** 组件前缀 `S` 保留，并定义为 **Styled**（样式封装层标识，与 aria 层的无前缀原语相对）——完整论证见 [`docs/rebrand-vbean.md` §7.5](../../docs/rebrand-vbean.md#75-组件前缀保留-s定义为-styled不改-v)。

保留脚本的价值是**把"改成 V"的成本量化清楚**：本仓实测 **787 文件 / 4,984 处**，外加全部下游。若将来确实要改：

```bash
node tools/vbean-codemod/rename-components.mjs .            # 预览
node tools/vbean-codemod/rename-components.mjs . --write    # 写入
node tools/vbean-codemod/rename-components.mjs . --write --docs   # 连文档一起
```

| 选项                | 说明                                             |
| ------------------- | ------------------------------------------------ |
| `--write`           | 真正写入；默认只预览                             |
| `--from=<前缀>`     | 要替换掉的前缀，默认 `S`                         |
| `--to=<前缀>`       | 目标前缀，默认 `V`                               |
| `--docs`            | 同时处理 Markdown（默认只改代码文件）            |
| `--include-history` | 连 CHANGELOG / 迁移文档 / 本方案一起改（不推荐） |
| `--quiet`           | 只输出汇总，不逐文件打印 diff                    |

### 为什么必须用白名单

`\bS[A-Z]\w*\b` 这条"看起来能用"的正则会造成灾难。本仓真实存在的反例：

| 会误伤                                                            | 错误结果                                                         | 性质                                   |
| ----------------------------------------------------------------- | ---------------------------------------------------------------- | -------------------------------------- |
| `SCSS` / `SDK` / `SEO` / `SIGTERM` / `SFC`                        | `VCSS` / `VDK` / `VEO` / `VIGTERM` / `VFC`                       | 普通常量                               |
| `ScrollAreaRoot` / `SelectArrow` / `SeparatorRoot` / `SwitchRoot` | `VcrollAreaRoot` / `VelectArrow` / `VeparatorRoot` / `WitchRoot` | aria 层恰好以 S 开头的标识符           |
| `border-s` / `rounded-s-md` / `border-inline-start`               | `border-v` / `rounded-v-md`                                      | Tailwind **逻辑属性**简写（s = start） |

共 64 个这样的词。脚本因此只匹配 `@vbean/ui` **实际导出的 144 个组件名**；kebab-case 也只在标签位置（`<s-button>` / `</s-button>`）替换，不碰裸 `s-`。

误伤测试用 md5 哈希比对：含 28 个危险标识符的文件经 `--write` 后**字节完全一致**。

**白名单重新生成**（组件增减时）：

```bash
rg -o --no-filename 'as (S[A-Za-z0-9]+)' packages/ui/dist -g '*.d.ts' | sed 's/^as //' | sort -u
```

### 默认跳过的东西

| 跳过                    | 原因                                               |
| ----------------------- | -------------------------------------------------- |
| `CHANGELOG.md`          | 历史记录，改写会让它失真                           |
| `*/migration/*`         | 迁移文档要同时展示新旧两种写法，机械替换会破坏对照 |
| `docs/rebrand-vbean.md` | 本方案正文包含对前缀决策本身的讨论                 |

需要覆盖时加 `--include-history`；但这三处通常应当人工处理。

## 域名决策

canonical 域名定为 **`vbean.dev`**。依据是命名资产盘点：npm 侧到手的是 **org `vbean` + scope `@vbean` + CLI 包名 `vbean` 三层裸名**，
仓库又挂在团队 org 下（`soybeanjs/vbean`）——5 层身份里 4 层是 `vbean`，唯一带后缀的只剩域名，所以该对齐的是域名。
（`.dev` 另有 Google 注册局预置 HSTS 的加成；代价是该域不能用作本地开发别名。）

两个候选域**当前都未注册**（2026-09-11 RDAP 复核），价格只差 $1/年——所以"哪个便宜选哪个"不成立，决策只看命名与受众。

| 域名                 | 用途                                                                         | 年费              |
| -------------------- | ---------------------------------------------------------------------------- | ----------------- |
| **`vbean.dev`**      | canonical：主站 + 文档 + registry `/r/*`                                     | $12/年 · **必买** |
| `vbean-ui.com`       | 301 防御域，挡 `vbean-ui` 混淆与抢注                                         | $11/年 · 建议买   |
| `vbeanui.com`        | 301 防御域，补去连字符变体                                                   | $11/年 · 可选     |
| `vbean.soybeanjs.cn` | 仅作过渡入口，301 → `vbean.dev`                                              | $0                |
| `vbean.com`          | 第三方持有（2013 年注册，2026-09-24 到期），GoDaddy $27/年为过户价，暂不跟进 | —                 |

GitHub 仓库留在团队 org：`soybeanjs/soybean-ui` → **`soybeanjs/vbean`**（对应 `--repo-slug=soybeanjs/vbean`）。

完整依据（含 RDAP 实测、命名资产盘点、npm 占位包处理）：[`docs/rebrand-vbean.md` §7.4 / §7.7](../../docs/rebrand-vbean.md#74-域名与-registry-url)。
