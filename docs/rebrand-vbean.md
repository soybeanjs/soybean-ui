# VBean 品牌重命名方案：SoybeanUI → VBean

> 定位：把「品牌 + npm scope + 逻辑层名」三件事一次性换成 VBean 体系的**总方案**，含影响面量化、平滑过渡策略、执行编排与配套 codemod。给维护者与执行 Agent 看。
> 状态：💡 提案
> 基线：2026-09-11 · 当前版本 v0.40.0-beta.1
> 下游依赖：[docs/v0.50.0.md](./v0.50.0.md)（v0.50.0 原地重构总方案，已规划 `headless → aria`）。**本方案与 v0.50.0 合并为同一次 breaking 发布执行**，理由见 [§8](#8-与-docsv0500md-的合并关系)。
> 配套交付：`tools/vbean-codemod/`（消费者迁移脚本）；`apps/docs/src/content/{zh,en}/ui/migration/v0.50.0.md`（升级指南）。

## 0. 结论先行

| 决策项               | 选择                                                                                                                                                                                                      |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 品牌名               | **VBean**，来源 **V**ue + Soy**bean**（V = Vue，bean = Soybean 的延续）                                                                                                                                   |
| 逻辑层               | `@soybeanjs/headless` → **`@vbean/aria`**（沿用 v0.50.0 已确定的 aria 命名，只换 scope）                                                                                                                  |
| 样式层               | `@soybeanjs/ui` → **`@vbean/ui`**                                                                                                                                                                         |
| 主题 / UnoCSS / 技能 | `@soybeanjs/theme` → `@vbean/theme`；`@soybeanjs/ui-uno` → `@vbean/unocss`；`@soybeanjs/ui-skills` → `@vbean/skills`                                                                                      |
| 消费者 CLI           | `sbean` → **`@vbean/cli`** bin名称为vbean；配置文件 `sbean.json` → `vbean.json`                                                                                                                           |
| **不变项**           | `--size`/`--radius`/`--primary` 等**无前缀设计令牌**、`@soybeanjs/cva`、`@soybeanjs/colord`、`Symbol.for('ConfigProvider')`、CHANGELOG 历史                                                               |
| 组件前缀             | **保持 `S`，定义为 `Styled`**（样式封装层标识，与 aria 层的无前缀原语相对）；**不改 `V`**——实测成本 787 文件 / 4,984 处 + 全部下游，且 `V` 撞 Vuetify，见 [§7.5](#75-组件前缀保留-s定义为-styled不改-v)   |
| 品牌混淆风险         | `vbean` 与 `vben`（`vue-vben-admin`，约 28k–33k star，技术栈与目标用户重合）编辑距离仅 **1** —— 品牌书写统一用 `VBean`，见 [§7.5.1](#751-附带发现vbean-与-vben-的品牌混淆风险)                            |
| 运行时契约改名       | `--soybean-*` → `--vbean-*`、`data-soybean-*` → `data-vbean-*`：**做**，但用 codemod 兜底（92 + 511 个符号）                                                                                              |
| localStorage key     | `__SOYBEAN_THEME` / `__SOYBEAN_THEME_CSS`：**不改名**（改了只会静默清空用户已保存主题，品牌零收益）                                                                                                       |
| 过渡方式             | **一次性干净切换（clean break）+ 墓碑版本 + npm deprecate**，不做长期双包并存                                                                                                                             |
| 旧包保留期           | 6 个月：旧包发最后一版 re-export 转发 + 控制台警告，期满 `npm deprecate`                                                                                                                                  |
| 落地窗口             | v0.50.0（与 aria 改名、引擎更换同批），不额外制造第二次 breaking                                                                                                                                          |
| 域名                 | `ui.soybeanjs.cn` → **`vbean.dev`**（canonical，$12/年）；`vbean-ui.com` 作 301 防御域；`vbean.soybeanjs.cn` 作过渡入口 301，见 [§7.4](#74-域名与-registry-url)；旧域名路径保持型 301，并行服务 ≥ 12 个月 |
| 仓库                 | GitHub repo `soybeanjs/soybean-ui` → **`soybeanjs/vbean`**（留在团队 org，带走 15k star 联动）；`vbean-ui` 的 GitHub 名留作占位                                                                           |

## 1. 依据：npm 真实下载量与迁移成本

### 1.1 下载量实测（2026-09-11 取自 npm registry API，单位：次）

| 包                     | 近 1 日 | 近 1 周 | 近 30 日  | 近 1 年 |
| ---------------------- | ------- | ------- | --------- | ------- |
| `@soybeanjs/ui`        | 10      | 36      | **1,704** | 27,695  |
| `@soybeanjs/headless`  | 5       | 38      | **1,481** | 29,107  |
| `@soybeanjs/theme`     | —       | —       | 845       | —       |
| `@soybeanjs/ui-uno`    | —       | —       | 588       | —       |
| `@soybeanjs/ui-skills` | —       | —       | 799       | —       |
| `sbean`（CLI）         | —       | —       | 706       | —       |

`@soybeanjs/ui` 月度趋势（按月聚合）：

```
2025-11   1500     2026-04   1780
2025-12    435     2026-05   5562
2026-01   4147     2026-06   4230
2026-02   3247     2026-07    962
2026-03   3507     2026-08   2267
```

### 1.2 从数据得出的三个结论

**结论 1：真实人类消费者是两位数到三位数量级，不是四位数。**
近 30 日 1,704 次下载 ≠ 1,704 个项目在用。这个量级里，CI 构建、镜像回源、`npm i` 重试、以及你自己的 release/CI 流水线占了大头——最直接的证据是**近 1 周仅 36 次、近 1 日仅 10 次**（约 5/日），显著低于月均的 57/日。真实在用的下游项目，乐观估计 **50–150 个**。

**结论 2：现在改名几乎是免费的，越晚越贵。**
改名成本 ≈ 需要被 codemod 覆盖的项目数 × 单项目改造成本。当这个数是 10² 量级时，"一次性干净切换"的总破坏成本低于"长期维护双包别名"的总维护成本。反过来，如果等到 1–2 年后有了 1,000+ 真实下游、文档被搜索引擎与社区文章大量引用、域名有 SEO 权重，改名成本会线性上升，且永远找不到更便宜的窗口。

**结论 3：0.x 阶段允许 breaking，这是最后一次"免费窗口"。**
仓库当前处于 `0.40.0-beta`，且 v0.50.0 已规划为一轮大规模 breaking（aria 改名、日期/表格/表单引擎更换、Drawer 拆分）。**把品牌改名并进同一个窗口，破坏只发生一次**；分开做则用户要在两个版本里各改一遍 import，纯属自找麻烦。

### 1.3 机会成本对照

| 方案                          | 一次性破坏成本      | 长期维护成本                           | 结论                |
| ----------------------------- | ------------------- | -------------------------------------- | ------------------- |
| **干净切换 + 墓碑版**（推荐） | 低（10² 项目 × 1h） | 低（一个转发包，6 个月后删除）         | ✅ 采纳             |
| 新旧包长期双发（永久别名）    | 零                  | 高（每次发版双份、双份 bug、文档两套） | ❌ 不值             |
| 只改文档/品牌，包名不动       | 零                  | 中（品牌与包名永久割裂，认知成本）     | ❌ 没解决真问题     |
| 不改名                        | 零                  | 低                                     | ❌ 品牌资产无法沉淀 |

## 2. 命名映射总表

### 2.1 npm 包与代码标识

| 现状                                                                                                   | 目标                           | 破坏性  |
| ------------------------------------------------------------------------------------------------------ | ------------------------------ | ------- |
| `@soybeanjs/headless`                                                                                  | `@vbean/aria`                  | 🚨 破坏 |
| `@soybeanjs/headless/shared`\|`/date`\|`/composables`\|`/locale`\|`/nuxt`\|`/resolver`\|`/{component}` | `@vbean/aria/*` 同名跟随       | 🚨 破坏 |
| `@soybeanjs/ui`                                                                                        | `@vbean/ui`                    | 🚨 破坏 |
| `@soybeanjs/ui/{component}`                                                                            | `@vbean/ui/{component}`        | 🚨 破坏 |
| `@soybeanjs/theme`                                                                                     | `@vbean/theme`                 | 🚨 破坏 |
| `@soybeanjs/theme/storage`\|`/ssr`                                                                     | `@vbean/theme/storage`\|`/ssr` | 🚨 破坏 |
| `@soybeanjs/ui-uno`                                                                                    | `@vbean/unocss`                | 🚨 破坏 |
| `@soybeanjs/ui-skills`                                                                                 | `@vbean/skills`                | 🚨 破坏 |
| `sbean`（npm 包 + bin）                                                                                | `vbean`（npm 包 + bin）        | 🚨 破坏 |
| `packages/headless/`                                                                                   | `packages/aria/`               | 🟡 内部 |
| namespaced `Headless.*`                                                                                | `Aria.*`                       | 🚨 破坏 |
| `pnpm sui gen catalog headless`                                                                        | `pnpm sui gen catalog aria`    | 🟡 内部 |
| `presetUiUnocss()` / `UiUnocssOptions`                                                                 | **不变**（函数名不含品牌）     | —       |
| docs content `content/{en,zh}/headless/`                                                               | `content/{en,zh}/aria/`        | 🟡 内部 |
| `apps/docs` 包名 `@soybeanjs/ui-docs`                                                                  | `@vbean/docs`（私有）          | —       |
| `@soybeanjs/scripts`（私有）                                                                           | `@vbean/scripts`（私有）       | —       |

### 2.2 明确不变（防止过度改名）

| 不变项                                                                                  | 理由                                                                                                                                                                                                                                                               |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`S` 组件前缀**（`SButton`、`SDialog`）                                                | **`S` = Styled**——样式封装层标识，与 `@vbean/aria` 的无前缀原语（`Button`）相对，同时也是让两层能在同一文件共存的机制。改前缀实测成本 **787 文件 / 4,984 处**（codemod 实测）+ 全部下游，而 `V` 还撞 Vuetify。详见 [§7.5](#75-组件前缀保留-s定义为-styled不改-v)。 |
| **无前缀设计令牌** `--size` / `--radius` / `--background` / `--primary` / `--chart-1` … | 这些是 shadcn 兼容契约（见 `packages/theme/src/variables.ts`），本就不带品牌前缀，**重命名后零影响**。                                                                                                                                                             |
| `Symbol.for('ConfigProvider')` / `Symbol.for('UIConfigProvider')`                       | 无品牌字符串，跨包注入键，动了反而破坏运行时。                                                                                                                                                                                                                     |
| `@soybeanjs/cva` / `@soybeanjs/colord`                                                  | 通用工具包，与 UI 品牌无绑定关系，锁定在 `@soybeanjs` scope 可避免把 breaking 扩散到两个独立包。`@vbean/ui` 依赖 `@soybeanjs/cva` 完全正常。                                                                                                                       |
| `__SOYBEAN_THEME` / `__SOYBEAN_THEME_CSS`（localStorage key）                           | 品牌不可见（用户只在 DevTools 里看到）。改名只会静默清空已保存主题，破坏体验却零收益。**保留原 key**。                                                                                                                                                             |
| CHANGELOG 历史（6,125 处 `soybean`）                                                    | 历史记录是审计资产，不回改。仅新条目用新品牌。                                                                                                                                                                                                                     |
| `.git` 历史、已发布版本的 tarball                                                       | 不可变。                                                                                                                                                                                                                                                           |

### 2.3 运行时契约（建议改，用 codemod 兜底）

| 现状             | 规模                                                         | 目标           | 处理                                                     |
| ---------------- | ------------------------------------------------------------ | -------------- | -------------------------------------------------------- |
| `data-soybean-*` | **511 个唯一属性**、1,539 处、579 个文件                     | `data-vbean-*` | v0.50.0 一次改完；codemod 提供 `--runtime-contract` 开关 |
| `--soybean-*`    | **92 个唯一变量**、212 处（`theme` 包 0 处，全在组件作用域） | `--vbean-*`    | 同上                                                     |

> 这两项是本次改名**技术风险最高的部分**——它们是字符串形式的 DOM/CSS 契约，编译器不会报错。用户自定义样式里写过的 `[data-soybean-dialog-content]` 选择器会静默失效。因此：(1) 必须写进升级指南；(2) codemod 必须覆盖；(3) 保留期内在旧属性上同时输出新属性不可行（会污染 DOM），故选择**只改不兼容，但用大版本明确公告**。

### 2.4 品牌文案

| 现状                             | 目标         | 规模（含文档/生成物） |
| -------------------------------- | ------------ | --------------------- |
| `SoybeanUI`                      | `VBean`      | 573 处（源码/文档）   |
| `SoybeanHeadless`                | `VBean Aria` | 21 处                 |
| `@soybeanjs/*`（文档正文引用）   | `@vbean/*`   | 3,300+ 处             |
| `ui.soybeanjs.cn`（含 registry） | 新域名       | 60+ 处                |

> 品牌文案层**无破坏性**，但量最大（全仓 22,789 处 `soybean`，其中 CHANGELOG 占 6,125）。这部分交给 codemod 的 repo profile + `pnpm sui gen` 重生成，不靠手工。

## 3. 影响面量化与分层

改名影响面按「编译器能否发现」分四层，处理策略完全不同：

| 层  | 内容                                              | 编译器可发现 | 规模                                   | 策略                                        |
| --- | ------------------------------------------------- | ------------ | -------------------------------------- | ------------------------------------------- |
| A   | npm 包名 / import specifier                       | ✅ 是        | 773 个 ts/vue 文件引用旧包名           | codemod 正则替换 + `typecheck` 兜底         |
| B   | DOM 契约 `data-soybean-*`、CSS 变量 `--soybean-*` | ❌ 否        | 511 + 92 个符号，1,751 处              | codemod `--runtime-contract` + 升级指南必列 |
| C   | 品牌文案、URL、徽章、技能文档                     | ❌ 否        | 全仓 22,789 处（CHANGELOG 6,125 除外） | codemod repo profile + 生成器重跑           |
| D   | 仓库名 / 域名 / npm org / CI / SEO                | ❌ 否        | 运维层，约 20 项                       | 手工清单 + [§5](#5-执行编排) Phase 0/5      |

各包源码规模（`ts`/`vue`，排除 `node_modules`/`dist`/`generated`）：

| 路径                | 文件数 | 说明                                                                                 |
| ------------------- | ------ | ------------------------------------------------------------------------------------ |
| `packages/headless` | 1,022  | → `packages/aria`，改名后回归量最大                                                  |
| `apps/docs/src`     | 586    | 含 391 个 md 文档与中英双语内容                                                      |
| `packages/ui`       | 565    | 样式层，import 面最广                                                                |
| `packages/cli`      | 59     | 原 `sbean` 目录（v0.50.0 Phase A 已迁移）→ `@vbean/cli` CLI，含 registry / templates |
| `apps/nuxt`         | 27     | 集成 fixture，需验证 Nuxt 模块 configKey                                             |
| `packages/scripts`  | 26     | `sui` 生成器，`catalog.ts` 有 `headless` 硬编码                                      |
| `packages/theme`    | 20     | 零 `--soybean-*`，改名几乎无风险                                                     |
| `packages/unocss`   | 11     | 含 16 处 `--soybean-*`                                                               |

## 4. 平滑过渡策略

### 4.1 双轨期设计（6 个月）

```
T0  ─── v0.50.0 发布 ──────────────────────────────────────────┐
      · @vbean/aria + @vbean/ui 首发（0.50.0）
      · @soybeanjs/ui + @soybeanjs/headless 停止功能开发，发 0.50.0-tombstone
        → 内容为纯 re-export 转发到 @vbean/*，并在 import 时 console.warn
      · 旧文档站 / 旧 registry 继续在线（只读）
      · npm deprecate 不执行（保留可安装性）
                                                    │
T0+6m ─ npm deprecate @soybeanjs/ui @soybeanjs/headless ... ─────┘
      · 旧包标记 deprecated，提示 "Renamed to @vbean/ui"
      · 旧域名 301 → 新域名；旧 registry 下线
```

**为什么墓碑版要 re-export 而不是直接 deprecate？**
因为 6 个月内用户的 `pnpm-lock` 与 CI 缓存仍会装到旧包。纯 deprecate 会让 `pnpm install` 报警但功能正常（其实也够）；re-export 转发则让用户的**代码零改动就能先升版本**，把"改 import"从"必须阻塞升级"降级为"可以稍后做"——这是真正的"平滑"。

**墓碑版实现要点：**

- 转发包不复制源码，只生成转发文件。96 个组件家族 × 2 个包 ≈ 200 个转发文件，用 `pnpm sui` 新命令生成（见 [§5](#5-执行编排) Phase 3），不手写。
- 子路径必须逐个转发（`@soybeanjs/ui/button` → `@vbean/ui/button`），`exports` map 要一一对应，否则 tree-shaking 与 standalone 导入会断。
- 墓碑版的 `peerDependencies` 指向 `@vbean/ui@0.50.x`，避免用户停留在旧语义。
- 类型也要转发（`export * from` 足以让 `.d.ts` 跟上）。

### 4.2 公告与迁移支持的组合拳

| 渠道                    | 内容                                                                       | 时机         |
| ----------------------- | -------------------------------------------------------------------------- | ------------ |
| 升级指南（docs 站内页） | 全量 diff 对照 + codemod 用法 + B 层契约清单                               | v0.50.0 同步 |
| releases 页 breaking 条 | `changelog-notes.ts` 加 `v0.50.0` 条目 + `docPath: 'ui/migration/v0.50.0'` | v0.50.0 同步 |
| 终端 / 阅读器警告       | 旧包导入时 `console.warn`（开发态 only）                                   | v0.50.0      |
| GitHub README 顶部横幅  | 「项目已改名为 VBean，本仓转入维护模式」                                   | v0.50.0      |
| 旧文档站顶部 banner     | 自动重定向到新站对应页（保留路径映射）                                     | v0.50.0      |
| npm deprecate           | 旧包全域标记                                                               | T0+6m        |

### 4.3 明确不做的事

- ❌ 不长期双发包（理由见 [§1.3](#13-机会成本对照)）。
- ❌ 不改 `S` 前缀、不改设计令牌、不改 localStorage key。
- ❌ 不为 `data-soybean-*` 提供兼容别名（DOM 双写会污染结构，代价大于收益）。
- ❌ 不在本次改名中同时重构 API 形状（那是 v0.50.0 其他章节的事，混在一起会让升级指南无法阅读）。

## 5. 执行编排

### Phase 0 — 前置占位（现在就能做，0 风险）

| 序号 | 动作                                                                                                                                                                                                            | 验收                                                                          |
| ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 0.1  | npm org `vbean` **已注册，`@vbean/*` scope 归属已确认 ✅**；可选：发一个最小占位（如 `@vbean/aria@0.0.1`）建立对外可见性                                                                                        | 能 `npm publish` 到 `@vbean/*`                                                |
| 0.2  | 裸名 `vbean` 占位（`vbean@0.0.1`）**保留并升版为真实 CLI**；`vbean-ui@0.0.1` 补一版指路 README 并 `npm deprecate`（见 [§7.7](#77-npm-占位包与-vbean-scope-归属)）                                               | 可 `npm publish vbean@0.50.0`；`npm i vbean-ui` 能看到指向 `@vbean/ui` 的说明 |
| 0.3  | 域名（**两个候选域当前均未注册**）：购买 **`vbean.dev`** 作 canonical，`vbean-ui.com` 作 301 防御域，配 DNS；`vbean.soybeanjs.cn` 301 → `vbean.dev`；`ui.soybeanjs.cn` 做路径保持型 301；可选补注 `vbeanui.com` | 新域名可访问，`/r/*`、`/schema/*`、`/llms*.txt` 在旧域名上仍可解析            |
| 0.4  | 在旧包 release note 提前一轮预告改名（用户有心理预期）                                                                                                                                                          | v0.40.0 正式版 release note 含预告                                            |
| 0.5  | 备好回滚：记录 v0.40.x 最后一个可用 tag 与 tarball 校验和                                                                                                                                                       | 可从零重建旧版本                                                              |

### Phase 1 — 仓库内改名（一个 PR，机械改动不做长期分支）

1. `git mv packages/headless packages/aria`（保留历史）。
2. 各 `package.json`：`name`、`description`、`repository`、`homepage`、`bugs`、`exports`/`publishConfig` 同步；workspace 依赖 `workspace:^` 自动跟随。
3. 跑 codemod repo profile（`node tools/vbean-codemod/migrate.mjs . --profile=repo --write`）完成 A/B 层字符串替换。
4. `packages/scripts`：`catalog.ts` 的 `CatalogTarget = 'headless' | 'ui'` → `'aria' | 'ui'`，`srcDir` 改 `packages/aria/src`；`index.ts` 帮助文本同步。
5. `packages/cli`（原 `sbean`，目录已在 v0.50.0 Phase A 就位）：包名 `sbean` → `@vbean/cli`、`bin.vbean`、`REGISTRY_URL`/`DOCS_URL`/`GITHUB_SOURCE_URL`、`DEFAULT_REGISTRY_NAMESPACE = '@vbean'`、配置文件 `sbean.json` → `vbean.json`（schema 文件名跟随）。
6. Nuxt 模块：`meta.name` / `configKey` 从 `@soybeanjs/headless`、`@soybeanjs/ui` 改为 `@vbean/aria`、`@vbean/ui`（**这是用户 nuxt.config 里的键，必须写进升级指南**）。
7. resolver 的 `from` 字符串同步。
8. docs：`content/{en,zh}/headless` → `aria`；`constants/menus.ts` 分组值；locales 中英双语品牌词；`apps/nuxt` fixture。
9. 技能与规范：`.agents/skills/soybean-ui-develop/*`（7 文件）+ 根 `AGENTS.md` + `docs/headless-admission-remediation.md` → `aria-admission-remediation.md`。
10. 重生成产物：`pnpm sui gen catalog aria && pnpm sui gen catalog ui && pnpm sui gen api && pnpm sui gen api --translate --locale zh` 以及 changelog/locale/schema/skills。

### Phase 2 — 验证（与 Phase 1 同 PR）

```bash
pnpm build && pnpm typecheck && pnpm test && pnpm test:e2e
rg "@soybeanjs/(headless|ui|theme|ui-uno)" packages apps --glob '!node_modules' --glob '!dist'   # 期望 0
rg "data-soybean-|--soybean-" packages apps --glob '!node_modules' --glob '!dist'               # 期望 0
rg -n "headless" packages/scripts/src packages/aria/AGENTS.md                                   # 期望仅历史说明
```

### Phase 3 — 墓碑版与发布（v0.50.0 + 墓碑）

1. `pnpm sui gen tombstone`（新增命令，见下）生成 4 个旧包的转发实现。
2. 依赖方向：墓碑包 `dependencies` → `@vbean/*@workspace:^`。
3. 发布顺序：`@vbean/theme` → `@vbean/unocss` → `@vbean/aria` → `@vbean/ui` → `@vbean/skills` → `vbean`（CLI） → 4 个墓碑包。**必须按拓扑序**，否则 `workspace:^` 会指向未发布版本。
4. `changelog-notes.ts` 增加 `v0.50.0` breaking 条目 + `docPath`。
5. 新文档站上线，旧站保留并加 banner。

### Phase 4 — 收尾（T0+6m）

- `npm deprecate` 全部旧包，消息统一为 `Renamed to @vbean/ui. See https://<new-domain>/ui/migration/v0.50.0`。
- 旧 registry（`ui.soybeanjs.cn/r`）下线，旧域名 301 到新域名。
- 删除墓碑包源目录，保留 tag 与 CHANGELOG 条目。

## 6. codemod

配套脚本见 **`tools/vbean-codemod/`**，零运行时依赖，Node 18+ 直接跑，默认 dry-run。

```bash
# 消费者项目：预览改动（不写盘）
node tools/vbean-codemod/migrate.mjs .

# 消费者项目：写入
node tools/vbean-codemod/migrate.mjs . --write

# 消费者项目：同时改写运行时契约（data-soybean-* / --soybean-*）
node tools/vbean-codemod/migrate.mjs . --write --runtime-contract

# 消费者项目：连域名/CDN/仓库地址一起改写（Phase 0 定域名后）
node tools/vbean-codemod/migrate.mjs . --write --cli --new-domain=vbean.dev

# 本仓库自改（额外处理品牌文案、仓库路径、内部标识）
node tools/vbean-codemod/migrate.mjs . --profile=repo --write --new-domain=vbean.dev --repo-slug=soybeanjs/vbean
```

设计约束：

| 约束                 | 实现                                                                                                                           |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **默认安全**         | 不写盘；`--write` 才落盘，并输出变更文件数与逐个文件 diff 摘要                                                                 |
| **幂等**             | 全部规则基于 `@soybeanjs/*` 字面量匹配，跑第二次是 0 变更                                                                      |
| **不误伤子路径**     | 用负向前瞻 `@soybeanjs/ui(?![-\w])`，保证 `@soybeanjs/ui-uno`、`@soybeanjs/ui-docs` 不被半替换                                 |
| **长匹配优先**       | `ui-uno` 规则排在 `ui` 之前，避免 `@soybeanjs/ui-uno` → `@vbean/ui-uno`                                                        |
| **域名按需改写**     | `--new-domain` 未传时完全不碰 host；传入后把 `ui.soybeanjs.cn` → 新域名、`r2.soybeanjs.tech` → `assets.<新域名>`，路径保持不变 |
| **不碰 R2 对象前缀** | CDN 只换 host，`/soybeanjs/...` 对象路径前缀保留（改写会造成 404），详见 [§7.4](#74-域名与-registry-url)                       |
| **跳过目录**         | `node_modules`、`dist`、`.git`、`.nuxt`、`.output`、`coverage`、`.temp`、`.ubean`                                              |
| **不碰 CHANGELOG**   | repo profile 默认跳过 `CHANGELOG.md`（历史不改）                                                                               |
| **报告人工项**       | 结束时打印无法自动化的步骤（重装依赖、Nuxt configKey、DNS/301 等）                                                             |

**不在 codemod 覆盖范围（必须人工）**：目录 `git mv`、`pnpm sui gen` 重生成、npm 发布顺序、DNS/301、npm org、GitHub 仓库改名、lockfile（一律建议删除后重装）。

## 7. 风险与对策

### 7.1 `@vbean/aria` 命名与职责的错配 ⚠️

`aria` 这个名字承载不了 `packages/headless` 的全部内容：它包含 96 个无样式组件家族、28 个 composable、**date 引擎、locale、resolver、nuxt 模块**。`date/locale` 与 ARIA 语义无关。

- **建议**：仍用 `@vbean/aria`（v0.50.0 已论证该命名，且"aria 层"在 Base UI / Ark UI 语境下已泛指无样式行为层），但**在文档首段明确界定**："aria = 无样式行为层，包含 a11y 状态机、composable、日期与格式化基础能力"。
- **备选**：`@vbean/pure` / `@vbean/primitives`。若改名窗口内仍觉得别扭，此时切换成本最低——**这是唯一值得在动工前再确认一次的命名**。
- **风险**：`aria` 一词在 npm 上高度拥挤（`aria-*`、`@react-aria/*`），品牌识别度弱于 `vbean`。缓解方式：文档、README、搜索关键词统一以 `@vbean/aria` 整体出现。

### 7.2 B 层运行时契约静默失效（最高技术风险）

`data-soybean-*`（511 个）+ `--soybean-*`（92 个）是字符串契约，TypeScript 与 ESLint 都不会报错。用户写过的 `[data-soybean-dialog-content]{...}` 会静默失效。

- **对策**：升级指南用独立章节逐条列出；codemod 提供 `--runtime-contract`；在 v0.50.0 breaking note 中单独点名；文档站组件示例页给出 `data-vbean-*` 的显式说明。

### 7.3 发布顺序错位

`@vbean/ui` 依赖 `@vbean/aria`，`aria` 又依赖 `@vbean/theme`。若用 `workspace:^` 且发布乱序，消费者会装到指向未发布版本的 peer。

- **对策**：Phase 3 强制拓扑序发布（[§5](#5-执行编排)）；发布前用 `pnpm publish -r --access public` 的递归顺序，或按清单逐个 `--filter`。

### 7.4 域名与 registry URL

**命名资产盘点（2026-09-11 实测）**

| 命名空间   | 短名 `vbean`                                                                                                     | 带后缀 `vbean-ui`                                                       | 备注                                                                                                    |
| ---------- | ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| npm 包名   | ✅ 你持有（占位 `vbean@0.0.1`）                                                                                  | ✅ 你持有（占位 `vbean-ui@0.0.1`）                                      | 均为 1.3 KB 空包，见 [§7.7](#77-npm-占位包与-vbean-scope-归属)                                          |
| npm scope  | `@vbean/*`                                                                                                       | —                                                                       | ✅ 你持有（npm org `vbean` 已注册）；registry 上尚无包，见 [§7.7](#77-npm-占位包与-vbean-scope-归属)    |
| GitHub     | ❌ 用户/组织名已被他人占用                                                                                       | ✅ 你持有                                                               | ⚠️ 但**不影响**——仓库挂在团队 org `soybeanjs` 下（`soybeanjs/vbean`），GitHub 端不需要 `vbean` 这个名字 |
| 域名       | `vbean.com` **第三方持有**（2013-09-24 注册，**2026-09-24 到期**，注册局四锁）；`vbean.dev` **未注册**（$12/年） | `vbean-ui.com` **未注册**（$11/年）；`vbeanui.com` **未注册**（$11/年） | ⚠️ **两个候选域都空置**，价格仅差 $1/年——因此不存在"选便宜的"这条论据（2026-09-11 22:01 RDAP 复核）     |
| 团队自有域 | —                                                                                                                | —                                                                       | `soybeanjs.cn`（站点在 Cloudflare）                                                                     |

**结论：canonical 用 `vbean.dev`（$12/年，现空置）；`vbean-ui.com` 作为 301 防御域一并买入（$11/年）；`vbean.soybeanjs.cn` 只作过渡入口。**

> **本节结论的变更记录**（保留判断过程，避免留下前后矛盾的结论）：
>
> | 版本           | 结论                      | 依据                              | 为何变更                                                                                                                |
> | -------------- | ------------------------- | --------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
> | v1             | `vbean.soybeanjs.cn` 过渡 | 无独立域                          | 否决：子域 → 独立域要再迁一轮 canonical/SEO（见下）                                                                     |
> | v2             | `vbean-ui.com`            | "`vbean-ui` 是三处唯一齐全的名字" | **依据失效**：它依赖"GitHub 拿不到 `vbean`"，但仓库挂在 org `soybeanjs` 下，GitHub 端本就不需要 `vbean` 这个名字        |
> | **v3（现行）** | **`vbean.dev`**           | 身份一致性（见下 6 条）           | 同时是**数据更正**：v2 表格误写 `vbean-ui.com` 为"已持有"，2026-09-11 22:01 RDAP 复核为**未注册**——两个候选域其实都空置 |

1. **身份一致性**：`@vbean/*`（scope）｜`vbean`（CLI）｜`vbean.dev`（站点）｜`soybeanjs/vbean`（仓库），每一层都读作 `vbean`。5 层身份里 4 层是裸名 `vbean`，唯一带后缀的就是域名——该对齐的是域名，不是其他四层。
2. **生态惯例是 scope 名 == 域名**，这条赛道尤其整齐：`@radix-ui/*` ↔ radix-ui.com、`@base-ui-components/*` ↔ base-ui.com、`@headlessui/*` ↔ headlessui.com、`@tanstack/*` ↔ tanstack.com。
3. **命名不该窄于它承载的东西**（与 §7.1 同一条原则）：`vbean-ui.com` 只点了 `@vbean/ui` 一个包，但这个站要同时承载 `@vbean/aria`（无样式层）、`@vbean/theme`、`@vbean/unocss` 与 `vbean` CLI。`chakra-ui.com` / `mui.com` 能用 `-ui` 后缀，是因为它们**整个产品**就叫 Chakra UI / MUI；这里伞形产品叫 VBean，只有其中一个包叫 UI。
4. **`.dev` 预置 HSTS**（Google 注册局，TLD 级）：浏览器层面禁止 http 明文访问，免费拿到强制 HTTPS 与信任加成。**代价要说清**：该域不能用作本地开发别名（无法把 `vbean.dev` 指向 localhost 起明文服务）。对本项目影响 ≈ 0——文档站与 registry 本来就必须跑 HTTPS。
5. **价格不构成差异**：`.dev` $12 vs `.com` $11，差 **$1/年**。选 `.com` 的理由不能是"省钱"，只能落在命名或受众上——而这两条都指向 `.dev`。
6. **`vbean-ui.com` 的价值是防御，不是主力**：它挡的是 `vbean-ui` / `vbeanui` 这条混淆与抢注路径。这是**主动付出的防御成本**，不是需要被"用掉"的沉没成本——所以它不构成"既然买了就用它"的理由。

**`.com` 什么时候才是更优解？** 只有一个场景：**决策人不是工程师**。企业采购、招投标、供应商名录、非技术买方瞥见 URL 的那一刻，`.com` 的信任溢价是真实的。但组件库的采购决策人是工程师，入口是 npm / GitHub / README —— `.com` 在这里的获客贡献接近 0。若将来 VBean 要做面向非技术买方的商业版（Enterprise 授权、私有部署报价），届时再谈 `vbean.com`（它 2026-09-24 到期，可能掉落）也不迟。

**为什么不用 `vbean.soybeanjs.cn` 做 canonical**（与选哪个独立域无关）：子域 → 独立域必然要再迁一轮 canonical / sitemap / 外部引用 / SEO 权重，而改名窗口的全部价值恰恰是"一次性把品牌信号立起来"。且二级域对工程师读者传递"还没定下来"的信号；soybean-admin 有 15k star，用二级域反而拉低预期。

> **更正（备案）**：本小节早前把"`.cn` 需 ICP 备案"列为不选子域的理由。实测 `ui.soybeanjs.cn` 由 Cloudflare 承载（`server: cloudflare`、`cf-ray …-SEA`），不触发备案。不选子域的依据只在上段两条，**不是**备案。

**`vbean.soybeanjs.cn` 仍然有用——只作过渡入口**：301 → `vbean.dev`，成本 0，给中文存量用户一个落脚点，并把 `soybeanjs.cn` 的权重导向新站。

**推荐组合**

| 域名                 | 用途                                                        | 年费                  | 优先级   |
| -------------------- | ----------------------------------------------------------- | --------------------- | -------- |
| **`vbean.dev`**      | **canonical**：主站 + 文档 + registry `/r/*` + npm homepage | $12（未注册，需购买） | **必买** |
| `vbean-ui.com`       | 301 防御域，挡 `vbean-ui` 这条混淆与抢注路径                | $11（未注册）         | 建议买   |
| `vbeanui.com`        | 301 防御域，补上去连字符的钓鱼变体                          | $11（未注册）         | 可选     |
| `vbean.soybeanjs.cn` | 过渡入口，301 → `vbean.dev`                                 | $0                    | 零成本   |
| `vbean.com`          | 远期：等掉落，或等出现非技术买方时再谈                      | $27（第三方持有）     | 暂不     |

**最小可行组合**：`vbean.dev` + `vbean-ui.com` = **$23/年**。加上 `vbeanui.com` 共 $34/年。

**仓库与 org：继续留在 `soybeanjs`。** repo 改名 `soybean-ui` → **`vbean`**（即 `soybeanjs/vbean`），仍挂在团队 org 下——org 是团队资产，能带走 soybean-admin 的 15k star 联动与 trust 传递；`vbean-ui` 那个 GitHub 名留作占位，可给未来的官网或示例仓库。codemod 对应 `--repo-slug=soybeanjs/vbean`。

**技术侧：域名决策不阻塞迁移。** npm scope `@vbean/*` 与域名无绑定关系，域名只影响 5 处：

| 位置                      | 现值                                          | 规模与说明                                                        |
| ------------------------- | --------------------------------------------- | ----------------------------------------------------------------- |
| docs canonical/OG/sitemap | `ui.soybeanjs.cn`                             | 258 处引用（含生成物）                                            |
| registry base             | `https://ui.soybeanjs.cn/r`                   | `packages/cli`（原 `sbean`）的 `REGISTRY_URL` / `DOCS_URL`        |
| CDN 资产                  | `r2.soybeanjs.tech/soybeanjs/*`               | 10 处                                                             |
| GitHub 仓库               | `github.com/soybeanjs/soybean-ui`             | 2,845 处，其中 2,766 在 `generated/changelog`（会重生成，可忽略） |
| LLM 文档路由              | `/llms.txt`、`/llms*.txt`、`/components/*.md` | skills 内 193 处（生成物）                                        |

- **codemod 已覆盖**：`--new-domain=vbean.dev [--new-cdn=<host>] [--repo-slug=soybeanjs/vbean]`。host 替换与包名替换同一轮完成，已验证幂等；`github.com/soybeanjs`（org 本身）与 R2 对象前缀**刻意保留**。
- **旧域名必须路径保持型 301**：`/r/*`、`/schema/*`、`/components/*.md`、`/llms*.txt` 逐路径保留。旧版 `sbean` 的 `REGISTRY_URL` 是硬编码的，跳首页会让全部存量 CLI 直接坏掉。新旧并行 ≥ 12 个月。
- **R2 对象路径前缀 `/soybeanjs/` 不改写**：它标识桶内对象，不搬对象就改 URL 会 404。正确做法是给现有 bucket 绑自定义域 `assets.vbean.dev`（对象原地不动）；若要统一前缀，先复制对象再改引用。

### 7.5 组件前缀：保留 `S`，定义为 **Styled**（不改 `V`）

组件叫 `SButton`，品牌叫 VBean——"S 从何而来"必然成为反复被问的问题。三个选项都做过成本实测：

| 方案                           | 成本                                                                                                         | 收益                         | 判断              |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------ | ---------------------------- | ----------------- |
| **A. 改成 `V`**                | 本仓 **787 文件 / 4,984 处**（codemod 实测）+ 全部下游；且 `V` 撞 Vuetify 的 `VBtn` / `VCard` / `VDataTable` | 五层身份完全一致             | ❌ 成本远大于收益 |
| **B. 去掉前缀**                | 同 A，并**引入与 aria 层的命名碰撞**                                                                         | 无                           | ❌ 否决           |
| **C. 保留 `S`，定义为 Styled** | **0 行代码**                                                                                                 | 消除历史包袱，语义反而更准确 | ✅ **推荐**       |

**依据 1 — 前缀不是品牌标记，是这一层的技术标识。**

`@vbean/aria` 导出无前缀原语（`Button`），`@vbean/ui` 导出 `SButton`。前缀是让两层能在同一个文件里共存的东西：

```ts
import { Button } from '@vbean/aria'; // 无样式行为层
import { SButton } from '@vbean/ui'; // 样式封装层
```

所以问题从来不是"要不要前缀"，而是"用哪个字母"。**光去掉前缀就会撞名。**

**依据 2 — `S = Styled` 不是事后合理化，仓库文档里一直是这么绑定的。**

全仓搜索确认：**没有任何一处**写过"`S` 代表 Soybean"。反而 `S` 与"样式层 / Styled"在文档里始终相邻出现——只是从未把这个对应写死：

| 出处                          | 原文                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------ |
| `AGENTS.md:38-41`             | `Core Headless/Styled separation:` … 紧接 `Styled wrappers … 144 S-prefixed exports` |
| `docs/roadmap.md:1179`        | `Layer 3  样式组件层   @soybeanjs/ui（S 前缀，96 组 / 144 导出）`                    |
| `docs/ecosystem/README.md:27` | 同上                                                                                 |

**明确它 = 把既有事实写出来，改 0 行代码。**

**依据 3 — 保留 `S` 直接减掉约 40% 的用户迁移量。**

包名迁移实测命中 1,894 文件 / 约 6,400 处（含域名规则）；前缀重命名 787 文件 / 4,984 处。不改前缀，用户的迁移工作量少掉这一整块——这正是"平滑过渡"的核心诉求，也符合 [§2.2](#22-明确不变防止过度改名) 的"防止过度改名"原则。

**文案规范**：统一写作 **`S` = Styled，标识样式封装层，与 `@vbean/aria` 的无前缀原语相对。** 不要写"S 原本是 Soybean"——一句自洽、可长期维持的解释，比一段改名沿革更适合出现在文档里。

> **codemod 已备好但建议不用。** `tools/vbean-codemod/rename-components.mjs` 实现了 S→V 的全量重命名（白名单驱动，已验证误伤为零、幂等）。它的价值在于**把这个选项的成本量化清楚**（787 文件 / 4,984 处），让"不改"成为有依据的决策而不是拖延。若将来确实要改，一条命令即可：
>
> ```bash
> node tools/vbean-codemod/rename-components.mjs . --write
> ```

#### 7.5.1 附带发现：vbean 与 vben 的品牌混淆风险

调查前缀时撞见的，严重程度高于前缀本身，**需要单独决策**。

|          | `vbean`（本项目）                         | `vben`                                       |
| -------- | ----------------------------------------- | -------------------------------------------- |
| 编辑距离 | **1 个字符**                              |                                              |
| 代表项目 | `soybeanjs/vbean`                         | `vbenjs/vue-vben-admin`，**约 28k–33k star** |
| 技术栈   | Vue3 + Shadcn + Vite + TS + pnpm monorepo | Vue3 + Shadcn + Vite + TS + pnpm monorepo    |
| 目标用户 | Vue 中后台开发者                          | Vue 中后台开发者                             |

技术栈与用户**完全重合**，而名字只差一个字母。

1. **口头与搜索混淆**：`vbean` 极易被读错、打错成 `vben`；搜索引擎可能把 "vbean" 纠错到 "vben"。
2. **npm 误装**：无 scope 的 `vben` 已被第三方占用（`vben@1.0.11`），`npm i vben` 装到的是别人的包。而本库真正要装的是 `@vbean/ui`——scope 形式反而构成了隔离。
3. **前缀叠加**：若前缀也改 `V`，`VButton` + `VBean` 会进一步强化与 Vben 的视觉关联。**这是"不该改成 V 前缀"的第四条依据。**

**对策（暂定，待决策）**

- 品牌书写**始终用完整形态 `VBean`**（大写 B），避免全小写 `vbean` 与 `vben` 在视觉上混淆。
- 官网 / README 首屏明确 **"VBean — Vue + Soybean"**，用来源叙事建立区分度（这本来就是 [§0](#0-结论先行) 里定下的品牌介绍方式）。
- npm 层已天然隔离（`@vbean` scope vs 无 scope 的 `vben`），无需额外动作。
- 不建议为此再次改名——npm org、scope、CLI 包名、仓库与域名都已按 `vbean` 铺开，改名成本远高于混淆风险。

### 7.6 搜索与生态引用

GitHub star（soybean-admin 15k）与新品牌的关联会断开。

- **对策**：README 顶部明确 "VBean — by the SoybeanJS team (soybean-admin 同一作者)"；在新站保留 "formerly SoybeanUI" 字样以承接搜索流量；`docs/` 内保留本方案作为改名沿革记录。

### 7.7 npm 占位包与 `@vbean` scope 归属

实测两个占位包（2026-08-18 发布）都是**空包**：

| 包         | 版本    | 内容                                                            | 影响                                                                                                                                                                       |
| ---------- | ------- | --------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `vbean`    | `0.0.1` | 1,356 B；`main: ./dist/index.js`，无 description / README / bin | 未来作为 CLI 的真实版本会覆盖它（发 ≥ 0.50.0 即可），无需特殊处理                                                                                                          |
| `vbean-ui` | `0.0.1` | 1,359 B；同上                                                   | ⚠️ 它**不会**成为包名（真包是 `@vbean/ui`），但 `vbean-ui` 极易被自然尝试——`-ui` 是组件库最常见的后缀，且 `vbean-ui.com` 无论自持还是被抢注都会强化这个联想 → 直接装到空包 |

**对策（Phase 0 就做）**

1. 给 `vbean-ui` 补一版**指路版**（如 `0.0.2`）：README + description 写明"名称预留；组件库是 `@vbean/ui`，文档 https://vbean.dev"，随后 `npm deprecate vbean-ui "Name reservation. Use @vbean/ui instead."`。把一次"点击到空包"的体验坑，变成 npm 搜索里可见的指路牌。
2. `vbean` 无需处理——真实 CLI 发布后占位被更高版本取代；顺手 `npm deprecate vbean@0.0.1` 避免有人锁死老版本。

**`@vbean` scope 归属：✅ 已确认（2026-09-11，npm org `vbean` 已注册）。**

因为 npm 的**组织名与用户名共用同一命名空间**，注册了 org `vbean` 就意味着不存在（也不可能再出现）同名的用户账号，`@vbean/*` 这个 scope 已完全落到团队手里，不会被第三方抢注。公共 registry 上仍是 **0 个 `@vbean/*` 包**，这不影响归属，只影响"外部可见性"——在发出第一个包之前，社区看不到这个名字已被占用。

- **剩余动作（低优先级，可与 Phase 3 合并）**：发第一个 `@vbean/*` 包时即完成对外占位。若希望更早建立可见性，可在 Phase 0 发一个最小占位 `@vbean/aria@0.0.1`（真实版本用 `0.50.0`，不冲突）。
- **权限自查**：确认 org 成员都有 2FA、且发布者具备 publish 权限；免费 org 可无限发布**公开**包，本方案不涉及私有包，无需付费计划。

## 8. 与 docs/v0.50.0.md 的合并关系

`docs/v0.50.0.md` 已规划 `@soybeanjs/headless → @soybeanjs/aria`（scope 不变）与一轮引擎级重构。**本方案不是替代它，而是替换其中的命名维度**：

| 议题                    | docs/v0.50.0.md 原定                      | 本方案覆盖为                                 |
| ----------------------- | ----------------------------------------- | -------------------------------------------- |
| 逻辑层改名              | `@soybeanjs/headless` → `@soybeanjs/aria` | `@soybeanjs/headless` → **`@vbean/aria`**    |
| UI 包                   | `@soybeanjs/ui` 不变                      | → **`@vbean/ui`**                            |
| theme / ui-uno / sbean  | 全部不变                                  | → `@vbean/theme` / `@vbean/unocss` / `vbean` |
| `data-soybean-*`        | 明确「不改」                              | → **改** 为 `data-vbean-*`                   |
| `--soybean-*`           | 明确「不改」                              | → **改** 为 `--vbean-*`                      |
| `S` 前缀                | 不改                                      | **一致，不改**                               |
| 依赖最小化 / 引擎更换   | 本方案不涉及                              | 原样保留                                     |
| Drawer / BottomSheet 等 | 本方案不涉及                              | 原样保留                                     |

执行时以**本方案的命名映射** + **v0.50.0 的结构重构** 合成单一 PR。建议把 `docs/v0.50.0.md` 的 §2「改名」章节替换为指向本文的链接并标注「已升级为品牌级改名」，避免两份文档给出不同映射。
