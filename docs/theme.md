# 主题引擎：架构规格与接入手册

> 定位：Vean 主题引擎的**唯一权威文档**——分层架构、完整 token 契约、两项核心机制、引擎 API、运行时接线（持久化 / 首帧 / 面板）、常见任务与禁区、验收标准、决议日志。读者：主题维护者、组件作者、**AI Agent**。
> 状态：✅ 已实施（P0–P5 完成；仅剩对外文档与验收收尾，见 §12 之后的收尾清单）
> 基线：2026-09-19 · 分支 `vean` · `@vean/theme@0.50.0-beta.1`
> 依据：本文取代此前所有主题文档——v1 提案稿、第一代「主题持久化与 FOUC 策略」（内容已并入 §9.4）、以及重构前审计 [theme-system-audit.md](./info/theme-system-audit.md)（仅作历史快照，**不要当作现状**）。

> **AI Agent 请先读 §0**：它给出代码地图、API 速查、规则/禁区、常见任务与验证命令；§1 之后是设计与实现细节。

---

## 0. 速览（AI Agent 入口）

### 0.0 代码地图

| 位置                                             | 职责                                                                                                                                              |
| :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| `packages/theme/src/palette.ts`                  | Layer 1 数据访问：26 色 × 11 档的**裸通道**读写（键表/家族取自 colord，见 §3）                                                                    |
| `packages/theme/src/semantic.ts`                 | **token 契约的数据定义**：家族数组、`CORE_RULES`（每个 token 的亮/暗档位）、护栏配对清单、`STATUS_NAMES`/`ROLE_RAMP_ROLES`                        |
| `packages/theme/src/guard.ts` / `contrast.ts`    | 对比度护栏（两杠杆：选字色 / 走填充档）与 WCAG 计算                                                                                               |
| `packages/theme/src/theme-map.ts`                | 流水线：名义规则 → 阶梯位移 → 核心护栏 → 区域镜像 → 区域护栏 → 派生 active → overrides → 完整性校验                                               |
| `packages/theme/src/emit.ts`                     | CSS 发射：`generatePaletteCss`（Layer 1 静态）+ `emitThemeCss`（Layer 2 别名块 + 角色 ramp）                                                      |
| `packages/theme/src/resolve.ts`                  | JS 侧解析：`resolveTokenColor` / `resolveThemeColors` / `resolveColorRef`（与 CSS 同源）                                                          |
| `packages/theme/src/literals.ts` / `defaults.ts` | 非颜色族（圆角/尺寸/阴影/动效/层次/字体）与默认选项/键表                                                                                          |
| `packages/theme/src/schemes.ts`                  | feedback / chart scheme 数据（纯 `palette.level` 引用）                                                                                           |
| `packages/theme/src/storage.ts` / `ssr.ts`       | 持久化信封（`__VEAN_THEME`）与首帧脚本                                                                                                            |
| `packages/unocss/src/theme.ts`                   | **唯一 UnoCSS 适配器**：theme.colors / theme 键映射 / token preflight                                                                             |
| `packages/ui/src/theme/`                         | UI 层：`adapter.ts`（运行时别名块）、`use-theme-settings.ts`（面板状态）、`use-theme-variants.ts`（逐 token 覆盖）、`types.ts`（`ThemeColor` 等） |
| `packages/ui/src/components/config-provider/`    | 运行时：`<style id="vean-theme">` 独占、单信封写入者、跨标签同步、`useTheme()` 上下文                                                             |
| `packages/ui/src/components/theme-customizer/`   | 定制面板（选板 / scheme / surfaceStyle / contrast / 逐 token 覆盖），数据全部取自引擎                                                             |

### 0.1 引擎 API 速查

```ts
// 解析与发射（纯函数，SSR / worker 安全）
resolveThemeMap(options): ThemeMap                            // 亮/暗映射 + alpha + 字面量 + 护栏报告
emitThemeCss(map, emitOptions?): string                      // Layer 2 别名块（含 55 条角色 ramp 引用）
generatePaletteCss({ format, styleTarget, weakSelectors }): string   // Layer 1 静态调色板表
resolveTokenColor(options, token, mode, format?)             // 单个 token → 完整色
resolveThemeColors(options, mode, format?)                   // 一个模式全部 token → 完整色
resolveColorRef('indigo.600' | 'white' | 'hsl(...)', format?) // 独立色引用 → 完整色（选择器取色用）

// 令牌与数据
SEMANTIC_TOKENS / CORE_RULES / CORE_TEXT_PAIRS / CORE_ON_SOLID_PAIRS / STATUS_NAMES / ROLE_RAMP_ROLES
PALETTE_KEYS / PALETTE_LEVELS / NEUTRAL_PALETTES / paletteColor(key, level, format)
FEEDBACK_SCHEMES / CHART_SCHEMES / DEFAULT_OPTIONS / THEME_SIZE / THEME_RADIUS / themeSizeKeys / themeRadiusKeys
LITERAL_DEFAULTS / literalTokens({ size, radius, prefix })

// 运行时
readThemeEnvelope() / writeThemeEnvelope() / createThemeWriter()   // @vean/theme/storage
createThemeInitScript() / isServerRuntime()                        // @vean/theme/ssr
buildThemeCss(options)                                             // @vean/ui → 运行时别名块
```

### 0.2 消费方式（三条，别绕开）

1. **类名（首选）**：UnoCSS 工具类，语义 token 与 26 个调色板、5 条角色 ramp 一一对应——`bg-background`、`text-muted-foreground`、`border-input`、`bg-destructive-subtle`、`bg-primary-500/30`、`bg-indigo-600`。
2. **CSS 里的完整色**：`hsl(var(--vean-primary) / 0.5)`——**必须包裹**。裸 `var(--vean-primary)` 当颜色用会静默失效（通道不是颜色，UnoCSS 也会丢 alpha）。
3. **JS 里要颜色值**：用 `resolveTokenColor` / `resolveThemeColors` / `resolveColorRef`，不要读 CSS 变量拼字符串。

### 0.3 十条硬规则 / 禁区

1. **语义层不存颜色值**，只存对调色板档位的引用；要完整色走 §0.2-3 的函数。
2. **不手写色板清单与档位数组**：键表取 colord `tailwindPaletteKeys` / `tailwindNeutralPaletteKeys` / `paletteColorLevels`（§3 单一数据源）。
3. **不加 `!important`**：静态默认层用 `:where()` 降权到零特异性，普通选择器即可胜出（§9.3）。
4. **只有一个写入者**：`__VEAN_THEME` 信封由 provider 的防抖写入者独占；组件里别直接写 localStorage（`useThemeSettings` 默认 `persist: false`）。
5. **改档位改 `CORE_RULES`**，不要改发射逻辑或快照；护栏若修正了你的档位，报告会写明步数与最终比值。
6. **`control` 有歧义**：它既是**插槽名**（switch / checkbox / radio-group / carousel / form / input / textarea / tags-input / input-number 的 `control` 槽），也是字面量 token 前缀（`--vean-control-height*` / `--vean-space-control-*`）——与填充 token 无关，批量改名必须避开。
7. **AA 契约的例外**：primary 的 on-solid 配对走组件阈值 3:1（§12-7），按钮文字约 4.4:1；要严格 AA 正文请把 `contrast` 调为 `'aaa'`。
8. **改 `packages/theme` 或 aria 源码后先 `pnpm build:libs` 再 typecheck**，否则下游读到旧 dist。
9. **`vp fmt` 会漂移在途示例**：`apps/docs/src/examples/ui/app-shell/*` 与 `split-nav/08-*` 属 SAppShell 在途工作，格式化后 `git checkout` 还原它们。
10. **生成物门禁**：改公共导出 / 组件类型后用 `pnpm sui gen all` 重跑，`pnpm sui check generated` 必须同步（CI 门禁）。

### 0.4 常见任务

| 任务                        | 做法                                                                                                                                                                |
| :-------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 新增一个语义 token          | `semantic.ts`：加入对应家族数组 → 写 `CORE_RULES[token]` → 补护栏配对（文本/非文本/on-solid）→ 跑测试与快照；UnoCSS 与发射**自动跟随**（由 `SEMANTIC_TOKENS` 驱动） |
| 调整某个 token 的档位       | 改 `CORE_RULES[token].light/dark`（中性色板特例用 `neutral` 覆盖）→ `vitest -u` 更新映射快照 → 看护栏报告是否新增修正                                               |
| 新增状态角色                | 往 `STATUS_NAMES` 加名 → `STATUS_SUFFIXES` 自动展开 5 个 token、护栏配对与 active；再在 scheme 数据里补该角色                                                       |
| 调整角色 ramp（50–950）     | 不用逐条改：`ROLE_RAMP_ROLES` 驱动发射的 55 条引用与 unocss 的 `buildRoleRampColors`                                                                                |
| 改默认主题                  | `defaults.ts` 的 `DEFAULT_OPTIONS`（base / primary / feedback / chart / level / surfaceStyle / contrast / size / radius）                                           |
| 让面板出现新 token 的覆盖项 | `packages/ui/src/theme/use-theme-variants.ts` 的 `DEFAULT_VARIANT_GROUPS` + `theme-customizer/locale.ts`（中英同步）                                                |
| 新增 feedback / chart 方案  | `schemes.ts` 加数据（`palette.level` 引用即可）                                                                                                                     |

### 0.5 验证命令

```bash
pnpm build:libs                      # 改 theme/aria 后必须先跑（dist 缓存）
pnpm typecheck && pnpm lint
pnpm --filter @vean/theme test       # 含护栏矩阵 / 映射快照 / 发射契约 / 预算断言（≤9.5 KB raw）
pnpm --filter @vean/unocss test      # 工具类与 alpha / ramp / preflight
pnpm --filter @vean/ui test          # provider 契约（app-shell 相关失败属在途组件工作，与本引擎无关）
pnpm build:docs                      # 端到端 SSG 构建 + registry 重新生成
pnpm sui gen all && pnpm sui check generated   # 生成物同步门禁
cd packages/theme && pnpm exec vitest run -u   # 有意识地更新映射/护栏快照
```

### 0.6 文档地图

| 文档                                  | 角色                                                           |
| :------------------------------------ | :------------------------------------------------------------- |
| **本文件**                            | 唯一权威：架构 + token 契约 + API + 接入手册 + 验收 + 决议日志 |
| `packages/theme/README.md`            | 包级 README（面向 npm 消费者，本文件的精简版）                 |
| `docs/info/theme-system-audit.md`     | 重构前审计快照（历史证据，**不代表现状**）                     |
| `docs/adr/`                           | 架构决策记录（主题 ADR 待补，见收尾清单 §12 之后）             |
| `.temp/theme-refactor-tasks.md`       | 临时执行跟踪（gitignored，收尾后删除）                         |
| `apps/docs/src/content/{en,zh}/ui/**` | 面向用户的文档站内容（升级指南在 `ui/migration/`）             |

### 0.7 摘要：架构一句话与四个关键决定

**架构一句话**：主题 = **一张静态调色板表**（26 色 × 11 级，注入 CSS 变量）+ **一张动态别名表**（语义 token → 调色板级别的映射，亮/暗各一份）+ **两项机制**（阶梯位移、对比度护栏）。

四个关键决定：

1. **语义 token 只存"引用"，不存"颜色值"**。`--vean-primary: var(--indigo-600)`，而不是 `--vean-primary: 238.7 83.5% 66.7%`。于是：调色板层可静态产出、语义层极小（≈0.56 KB gzip）、切主题只换别名、`getComputedStyle` 读到的是真颜色（canvas / 图表库可用）。
2. **颜色变量只保留「裸通道」一种形态**（`--vean-primary: 243.5 77.8% 59.2%`），消费时统一由 `hsl()` / `oklch()` 包裹——沿用今天已验证的形态，而不是"完整色 + 通道"双变量。需要完整色的 JS 场景由 `@vean/theme` 的解析函数提供（`resolveTokenColor` 等，纯函数、与 CSS 同源）。理由与实测收益见 §3.1；UnoCSS 侧的硬约束（裸 `var()` 会静默丢 alpha）仍在 §8.2。
3. **档位是"整条阶梯位移"，不是"逐 token 偏移"**：层级按构造保序，`lightLevel ≥ 1` 时三面同塌的旧缺陷不可能再发生。
4. **对比度是引擎的验收条件，不是设计者的自觉**：12 个主题变体 × 351 项配对实测，只需 3 处护栏修正即可全绿（§7.3）。

另外四条本轮定案：**沿用 shadcn 词汇（`background` / `foreground` / `muted` / `accent`）+ 自有前缀 `--vean-`**（避免与 shadcn 同名互覆，§4.10）、**sidebar 精简为 6 个 token**（§4.8）、**z-index 不用具名阶梯**（浮层层级由打开顺序决定，§4.11）、**首帧改为单一 `<style>` 就地改写**（去掉 `!important`，§9.3）。

---

## 1. 参照与取舍（结论保留）

**主骨架 PrimeVue v4 + 三处局部借力 + 两处自己造**：

| 来源              | 取什么                                                                                                                 | 不取什么                                                         |
| :---------------- | :--------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------- |
| **PrimeVue v4**   | `primitive → semantic` 两层命名与边界；token 作为**数据**（preset/registry）而非代码；语义层覆盖**颜色 + 尺寸 + 动效** | 手写双份明暗值（我们用推导）；90 个组件 token 集（耦合成本过高） |
| **Ant Design v5** | 表面层级的**语义族**：布局层 / 容器层 / 浮层 / 遮罩，各有明确用途                                                      | 199 个 map/alias token 的规模、CSS-in-JS                         |
| **Radix Colors**  | 色阶的**用途契约**与**对比度保证**（把"级别"从亮度刻度升级为可验收的承诺）                                             | 12 阶体系整体（我们用 10 阶 + 通道形态表达 alpha）               |
| **Chakra v3**     | 语义命名词汇（`subtle` / `interactive` / `carbon`）+ `contrast`（on-solid）角色                                        | 条件系统、recipes、CSS-in-JS                                     |
| **自造 ①**        | **阶梯位移**的档位机制（保序档位，§6）                                                                                 | —                                                                |
| **自造 ②**        | **引擎级对比度护栏**（`contrast: 'off' \| 'aa' \| 'aaa'`，§7）                                                         | —                                                                |

**被拒绝的路线**：全量照搬 Ant（体量与运行时不匹配）；以 Radix 为骨架（它没有语义层）；继续 shadcn 形状（`background = card = popover` 是塌陷根因）；以 Nuxt UI 为骨架（把 token 权威交给 Tailwind `@theme`）；CSS-in-JS（SSG/无 JS 场景退化）；全语义层 `color-mix()`（值不可快照、不可校验）。

---

## 2. 三层架构与数据流

```
┌─ Layer 1 · Palette（静态，构建期产出一次）────────────────────────────────┐
│  @soybeanjs/colord 的 tailwindPalette：26 色 × 11 级                     │
│  产出：--{palette}-{level}（完整色） + --{palette}-{level}（通道）     │
│  例：--indigo-600: 243.5 77.8% 59.2%;  --zinc-100: 240 4.8% 95.9%;        │
│  产物形态：静态样式表（可进 UnoCSS preflight，也可独立 .css 引入）        │
└──────────────────────────────────────────────────────────────────────────┘
                                  ▲ var() 引用
┌─ Layer 2 · Semantic（动态，随主题配置重算）──────────────────────────────┐
│  语义 token → 调色板级别的「映射表」（纯数据）                            │
│  + 对比度护栏修正 + 亮/暗两组别名 + 非颜色 token（尺寸/圆角/阴影/…）      │
│  产出：--vean-background: var(--zinc-100);  --vean-sidebar-surface: var(--vean-background) │
│  体积：≈160 条声明 / ≈5 KB 原始 / ≈0.56 KB gzip                           │
└──────────────────────────────────────────────────────────────────────────┘
                                  ▲ 消费
┌─ Layer 3 · Adapters ─────────────────────────────────────────────────────┐
│  @vean/unocss：theme.colors[key] = `hsl(var(--vean-{token}) / <alpha-value>)` │
│                theme.borderRadius / boxShadow / fontSize / zIndex / …     │
│  @vean/ui   ：SConfigProvider 注入 Layer 2（默认主题的 Layer 2 已在静态层）│
└──────────────────────────────────────────────────────────────────────────┘
```

**数据流**：`ThemeOptions`（base / primary / feedback / chart / sidebar / 档位）→ **映射表**（`Record<SemanticToken, PaletteLevelRef>`）→ 护栏校验与修正 → 别名 CSS。整个过程**没有颜色数学**（除护栏校验时读取调色板计算对比度），因此快、可快照、可在首帧前完成。

**为什么这样分层**：今天的引擎把"颜色值"写进语义层（`--primary: 238.7 83.5% 66.7%`），导致（a）每次主题变更要重算 6 条 ramp × 2 模式、（b）同一 level 在明暗下含义漂移、（c）语义层 7.2 KB。改成"引用"后这三个问题一起消失，且**颜色继承**（`--primary: var(--indigo-600)`、用户在任意 CSS 里写 `var(--indigo-600)`）天然成立。

---

## 3. Layer 1：调色板层（26 × 11 + white/black）

**来源**：`@soybeanjs/colord/palette` 的 `tailwindPalette`（26 个 key × `paletteColorLevels` = `50,100,200,300,400,500,600,700,800,900,950`）与 `simplePalette`（`white` / `black`）。

**单一数据源（2026-09-19）**：键表与家族划分**不再手写**——`PALETTE_KEYS` 取自 `tailwindPaletteKeys`，`NEUTRAL_PALETTES` 取自 `tailwindNeutralPaletteKeys`（`isNeutralFamily` 因此不可能与色板表脱节）；UI 侧的 `themeSizeMap` 取自引擎 `THEME_SIZE`，palette-picker 的简单键取自 colord `simplePalette`。上游新增调色板时只会"多出一个 key"，不会与引擎/UI 的认知漂移；家族划分不变量由 `test/engine-features.spec.ts` 断言（中性 ∪ 彩色 = 全部键，且两两不相交）。

**命名**：`--{palette}-{level}`，值是**裸通道**（不含颜色函数），消费时由 `hsl()` / `oklch()` 包裹——即本仓库沿用至今的形态。

```css
/* 通道（hsl 格式）：通道之间用空格分隔，可带 `%`；消费时包裹为 hsl(...) */
--indigo-600: 243.5 77.8% 59.2%;
--zinc-100: 240 4.8% 95.9%;
--white: 0 0% 100%;
--black: 0 0% 0%;
/* 消费形态（库内由 UnoCSS 适配器统一产出） */
/* background-color: hsl(var(--indigo-600) / 0.5); */
```

**26 个 palette key**（与 colord 一致）：`slate mist gray zinc neutral stone taupe olive mauve`（9 中性）+ `red orange amber yellow lime green emerald teal cyan sky blue indigo violet purple fuchsia pink rose`（17 彩色）。

**格式**：`format: 'hsl' | 'oklch'`（默认 `hsl`）为**构建期**选项（不再是运行时/持久化选项）。**默认 `hsl`**（沿用现状的兼容姿态：`hsl()` 空格语法 + 斜杠 alpha 是 CSS Color 4 的早期特性，Chrome 65+/Safari 12.1+/Firefox 52+ 即可，不引入任何新特性的依赖）；`oklch` 为可选档（体积更小、色域更宽、可做相对色运算，代价是 Baseline 2023）。

实测体积（286 级，单形态）：

| 格式  | 字节                   | 说明                                                                                                             |
| :---- | :--------------------- | :--------------------------------------------------------------------------------------------------------------- |
| hsl   | 10,055 B（gzip 2,794） | **默认**：兼容最好（`hsl()` 空格语法 + 斜杠 alpha 为 CSS Color 4 早期特性，Chrome 65+/Safari 12.1+/Firefox 52+） |
| oklch | 9,505 B（gzip 1,851）  | 可选：体积更小、色域更宽、可做相对色运算，代价是 Baseline 2023                                                   |

### 3.1 为什么只保留「通道」一种形态（并把完整色交给 JS 函数）

**结论：全库只产出通道变量（沿用今天的形态），完整色由 `@vean/theme` 的解析函数在需要时算出。** 这条决定推翻了我此前的"通道单形态双变量"提案，理由如下。

**（1）先看真实消费面——本仓库不存在需要"完整色变量"的消费方：**

| 消费方式                                                  | 通道是否够用  | 说明                                                                                             |
| :-------------------------------------------------------- | :------------ | :----------------------------------------------------------------------------------------------- |
| 组件样式 / UnoCSS 工具类（`bg-primary`、`bg-primary/50`） | ✅ 够用       | 适配器集中在**一处**包裹为 `hsl(var(--vean-primary) / <alpha-value>)`（§8.2）                    |
| `color-mix()` / 相对色语法（`oklch(from …)`）             | ✅ 够用       | 需要的是"调用方包裹"：`color-mix(in oklab, hsl(var(--vean-primary)), white)`                     |
| docs 图表（TanStack Charts，SVG）                         | ✅ 够用       | **今天就是通道形态**：`chart-config.ts` 注释明确写"token 是 HSL 三元组，因此这里用 `hsl()` 包裹" |
| 手写 CSS                                                  | ⚠️ 需知道约定 | 必须写 `hsl(var(--vean-primary))`；写裸 `var(--vean-primary)` 会**静默失效**（见下）             |
| JS 解析颜色（canvas / WebGL / 颜色计算）                  | ❌ 通道不够   | **改由解析函数解决**（不再需要 CSS 变量）                                                        |
| worker / SSR / 原生端（无 CSS 环境）                      | ❌ 通道不够   | 同上：函数是纯的，这些环境里 CSS 变量根本不存在                                                  |

实测证据：库内 + docs 一共 **160 处**颜色消费**全部**是 `hsl(var(--…))` 包裹形态，**裸用 token 变量当颜色 0 处**（脚本扫描见 §11-15）。也就是说"完整色变量"至今没有任何真实消费者，我此前为它给出的理由（"canvas 图表与 JS 解析需要"）是**假设的未来场景**，而那个场景用函数解决更好——纯函数无 DOM 依赖，在 worker / SSR / Electron 主进程 / 原生桥接里同样可用，还能携带类型。

**（2）只保留通道的收益（实测）：**

| 项                     | 双变量（旧提案）              | 只保留通道（采纳）                  | 收益           |
| :--------------------- | :---------------------------- | :---------------------------------- | :------------- |
| Layer 1（286 级，hsl） | 19,529 B / gzip 4,380 B       | **10,055 B / gzip 2,794 B**         | −1.6 KB gzip   |
| Layer 2（语义层）      | ≈160 条 / ≈5 KB / gzip ≈560 B | **≈110 条 / ≈3.3 KB / gzip ≈380 B** | −1.1 / −0.2 KB |
| 变量总数（语义层）     | ≈160                          | **≈110**                            | 认知负担减半   |
| 命名规则               | 多一条"通道伴生"规则          | **无特例**                          | 规则简化       |

> 注：Layer 2 的 gzip 数字为按比例估算（未单独实测），其余为实测值。

**（3）代价与三道护栏。** 通道形态唯一真正的风险是"忘记包裹 → 声明被丢弃且不报错"。护栏：

1. **库内集中在一处包裹**：组件只写工具类，包裹发生在 `@vean/unocss` 的颜色映射里；`global-css` 同理。库内不出现第二处消费点。
2. **可断言的静态扫描**：验收项 §11-15 要求"库内与 docs 不得出现裸 `var(--vean-*)` 作为颜色值"（正则可判），把约定变成 CI 门禁而不是口头纪律。
3. **JS 一侧提供函数**（下面 §9.1）：`resolveTokenColor(options, token, mode, format?)` 与 `resolveThemeColors(options, mode)`，与生成 CSS 走**同一个** `resolveThemeMap`（含护栏修正），因此结果永远与 CSS 一致。

**（4）逃生舱（默认关闭）**：若将来真的出现"CSS 侧必须拿到完整色"的消费者（例如某个 canvas 图表只能读 `getComputedStyle`），加一个构建期开关 `solidVars: 'none' | 'chart' | 'all'`（默认 `'none'`）即可为全部或部分 token 追加完整色变量；因为默认关闭，它不构成今天的成本。

**产出方式**（三条路径，内容完全相同，按消费者选择）：

1. `@vean/unocss` 的 preflight：`presetVean({ format: 'hsl' })` 自动带入（推荐 UnoCSS 用户）。
2. 独立静态样式表：`@vean/theme/palette.css`（非 UnoCSS 用户 / 仅需变量的场景）。
3. `generatePaletteCss({ format })` 函数导出（自建构建流程）。

> 只有**内置 26 色**进静态层；通过 `registerThemePresets` 注册的自定义色板走动态层（现场生成它的 11 级 + 通道），保证自定义能力不被静态化牺牲。

---

## 4. Layer 2：语义层（完整 token 表）

> **下表为节省篇幅省略了 `--vean-` 前缀**：实际 token 为 `--vean-background`、`--vean-primary`、`--vean-muted-foreground`……前缀规则与理由见 §4.10。调色板层（Layer 1）**不带前缀**（`--indigo-500`）。

约定：`{b}` = base 色板，`{p}` = primary 色板，`{c}` = 该状态/scheme 的调色板，`{s}` = 状态名。所有取值都是**调色板级别引用**（`{b}.100` 这类写法即 `var(--zinc-100)`），只有少数常量例外。

### 4.1 表面阶梯（elevation 轴）——4 个表面

**表面（surface）不配前景**：中性表面上的文字统一走 §4.3 的 `foreground` 阶梯。这条规则来自一个实测事实——"卡片上的文字"与"页面上的文字"在主流体系里是同一个角色（Ant 只有 `colorText` + `colorTextSecondary`，Mantine 是 `text` + `dimmed`，Chakra 是 `fg` + `fg.muted`，shadcn/Radix 亦然），给每个表面各配一套前景只会产出"多个 token 一个值"的冗余（本仓库审计第 11 条正是这个问题）。

| token          | 角色                 | light                      | dark      | 实测相邻对比度（light / dark）                        |
| :------------- | :------------------- | :------------------------- | :-------- | :---------------------------------------------------- |
| `--background` | 页面基底             | `{b}.100`                  | `{b}.950` | background↔surface 1.09–1.11 / 1.10–1.14              |
| `--surface`    | 容器 / 卡片          | `white`                    | `{b}.900` | surface↔elevated 1.000（亮色，靠阴影分离）/ 1.15–1.29 |
| `--elevated`   | 浮层 / menu / dialog | `white`                    | `{b}.800` | —                                                     |
| `--scrim`      | 模态遮罩             | `var(--black)`（通道别名） | 同左      | 浓度由组件用法决定（如 `bg-scrim/50`），不参与阶梯    |

> **亮色下 `surface` 与 `elevated` 同值（都取 `white`）是有意为之**：与 Ant 的 `colorBgContainer` / `colorBgElevated` 在亮色下同为 `#fff` 一致，层级靠 `--shadow-*` 分离；暗色下没有"更白的白"可用，才靠提亮拉开一档。因此验收规则是 `lum(background) < lum(surface) ≤ lum(elevated)`，**允许 surface = elevated**。

### 4.2 交互填充（interaction 轴）——3 个填充 + 2 个前景

与表面相反：**填充（fill）配 `-foreground`**，因为填充是着色/降调的表面，其上的文字需要独立定档。**唯一例外是 `--muted`**：实测表明它可以与全局次要文本共用同一个 token（`--muted-foreground` 取 `{b}.600` 时在 `muted`（`{b}.200`）上是 **6.06–6.19**、在白卡片上是 7.0–7.6，都稳过 AA；而 shadcn 量级的 `{b}.500` 在 `muted` 上只有 **3.30–3.90**，不达标），因此 `muted` 不重复产出 `-foreground`，填充列表里的 `muted` 文字即 §4.3 的 `--muted-foreground`。

| token                    | 角色                                | light     | dark      | 约束                                                  |
| :----------------------- | :---------------------------------- | :-------- | :-------- | :---------------------------------------------------- |
| `--muted`                | 弱化块（badge/内嵌井/表头）         | `{b}.200` | `{b}.800` | 与 `surface` 差 ≥1 档（实测 1.23–1.28 / 1.15–1.29）   |
| `--accent`               | hover / 选中面                      | `{b}.300` | `{b}.700` | 与 `surface`、`muted` 均可辨（实测 1.35 / 1.36–1.48） |
| `--accent-foreground`    | 交互面文字                          | `{b}.900` | `{b}.50`  | ≥ 4.5:1                                               |
| `--secondary`            | 次级填充（shadcn 词汇还原；值不变） | `{b}.200` | `{b}.800` | 必须在 `background` 与 `surface` 上都可辨             |
| `--secondary-foreground` | 次级填充文字                        | `{b}.950` | `{b}.50`  | ≥ 4.5:1                                               |

> `--muted` 与 `--secondary` 默认同档是**有意的**（Ant 也用同一个 `colorFillTertiary` 同时服务块填充与控件填充），差别在语义；约束是"一旦分化必须 ≥1 档"。`--accent` 比两者高一档，这才让 hover 在弱化块上可见（今天的 `accent = muted` 使 hover 无反馈）。

### 4.3 内容色（文本 / 图标）

| token                 | 角色                   | light     | dark      | 用途                             |
| :-------------------- | :--------------------- | :-------- | :-------- | :------------------------------- |
| `--foreground`        | 主文本                 | `{b}.950` | `{b}.50`  | 正文、标题                       |
| `--muted-foreground`  | 次文本                 | `{b}.600` | `{b}.400` | 副标题、说明（≥4.5:1，实测通过） |
| `--foreground-subtle` | 三级文本 / placeholder | `{b}.500` | `{b}.500` | 占位符、装饰（≥3:1，实测通过）   |
| `--carbon-foreground` | 反相文本               | `{b}.50`  | `{b}.950` | 压在反相 / 深色实心面上          |

### 4.4 描边与焦点

`--border` 在暗色下是"半透明白"，而通道形态无法把 alpha 藏在同一个变量里（`hsl(var(--x) / a)` 要求 `--x` 不含 alpha），因此它额外配一个**数值**伴生变量（沿用今天的 `--border-alpha` 机制）；消费形态 `hsl(var(--vean-border) / var(--vean-border-alpha))`——alpha 与颜色分离是 MUI `*Channel` 的同一思路，同时保留了 `borderOpacity` 这类"只调透明度"的主题能力。

| token             | 角色                      | light     | dark                          | 约束                      |
| :---------------- | :------------------------ | :-------- | :---------------------------- | :------------------------ |
| `--border`        | 常规分隔线（装饰）        | `{b}.200` | `var(--white)` + alpha `0.10` | 装饰性，不强制对比度      |
| `--border-strong` | 可交互元素边界 / 强调分隔 | `{b}.600` | `{b}.500`                     | **≥ 3:1**（WCAG 1.4.11）  |
| `--input`         | 输入框边界                | `{b}.600` | `{b}.500`                     | **≥ 3:1**                 |
| `--ring`          | 焦点环（取 primary 色板） | `{p}.600` | `{p}.400`                     | **≥ 3:1**（护栏可再走档） |

> **`--input` / `--border-strong` 两点实测定档**（M1 实现期修正了本节早期取值）：
>
> 1. 亮色取 `{b}.600` 而非 `{b}.500`——后者对白卡片只有 **2.99**，差 0.01 不达 3:1；
> 2. 暗色**不再用半透明白**，改用 `{b}.500`：`hsl(var(--white) / 0.35)` 叠在 `{b}.900` 上实测约 **1.4**，任何可用的白浓度都到不了 3:1。只有装饰性的 `--border` 保留半透明白（它不在对比度契约内）。
>
> 因此 alpha 伴生变量从三个收敛到**一个**（`--vean-border-alpha`）。

### 4.5 品牌与反相

`--carbon` 是**表面**（反相表面），因此不配 `-foreground`，其上的文字用 `--carbon-foreground`（§4.1 规则）。

| token                  | 角色         | light                             | dark                              | 说明                                                                    |
| :--------------------- | :----------- | :-------------------------------- | :-------------------------------- | :---------------------------------------------------------------------- |
| `--primary`            | 品牌实心色   | `{p}.500`（中性色板用 `{p}.800`） | `{p}.500`（中性色板用 `{p}.200`） | 500 为 shadcn 谱系习惯档（旧引擎同档）；其上文字走组件阈值 3:1（§12-7） |
| `--primary-foreground` | 实心上的文字 | 护栏决定（见 §7）                 | 护栏决定                          | 实测：indigo 需走 1 档 + 白字（6.03）                                   |
| `--carbon`             | 反相表面     | `{b}.800`                         | `{b}.100`                         | 历史名复原（§12-9）；值不变——模式翻转的高对比表面                       |
| `--carbon-foreground`  | 反相表面文字 | `{b}.50`                          | `{b}.950`                         | ≥ 4.5:1（实测通过）；由 §4.3 提供                                       |

### 4.6 状态色（4 状态 × 5 角色 = 20 个 token）

| 角色               | 用途                                   | light        | dark      | 约束                                                   |
| :----------------- | :------------------------------------- | :----------- | :-------- | :----------------------------------------------------- |
| `--{s}`            | 实心按钮 / 实心标签                    | `{c}.500`    | `{c}.400` | 取值沿用现状，减小视觉变更                             |
| `--{s}-active`     | 实心的按压态（深一档，方向随已选文字） | 护栏派生     | 护栏派生  | 与 `--{s}-foreground` 保持 ≥ 4.5:1                     |
| `--{s}-foreground` | 实心上的文字（on-solid）               | **护栏决定** | 护栏决定  | ≥ 4.5:1（实测：destructive 走 1 档保白字；其余用深字） |
| `--{s}-text`       | 中性底上的状态文字（表单提示 / 图标）  | `{c}.700`    | `{c}.300` | ≥ 4.5:1（对 `background` 与 `surface` 都实测通过）     |
| `--{s}-subtle`     | 软底（alert / badge 背景）             | `{c}.50`     | `{c}.950` | 与所在表面可辨                                         |
| `--{s}-border`     | 软底边框                               | `{c}.200`    | `{c}.800` | 与 `--{s}-subtle` 可辨                                 |

`{s}` ∈ `destructive` / `success` / `warning` / `info`；`{c}` 由 feedback scheme 提供（默认 classic：`red` / `green` / `amber` / `blue`）。`--primary-active` 与 `--carbon-active` 同理（品牌实心与反相实心的按压态）。

> **为什么用"角色"而不是色阶**：按压态在第一代里写的是 `active:bg-primary-600` 这类**硬编码色阶**——它把组件绑死在某个调色板的某个级别上。v2 用 `{role}-active` 表达"实心色的按压态"这个**角色**，值由引擎从护栏后的实心值派生（沿能与已选文字保持对比度的方向走一档），因此换任何调色板都成立。

### 4.6.1 角色 ramp（50–950 颜色面板）

五个角色（`primary` / `destructive` / `success` / `warning` / `info`）各自携带**一整条 50–950 的调色板面板**，别名块输出 `--vean-{role}-{level}: var(--{调色板}-{level})`（55 条引用）：

- `primary` 指向当前主色板（`primary: 'indigo'` → `--vean-primary-500: var(--indigo-500)`）；状态色指向**当前 feedback scheme** 为该角色提供的调色板（`classic` → destructive 用 `red`；`subtle` → `rose`）。换主色或换 scheme 时随别名块整体重发，面板自动跟随；
- 面板是**模式无关**的字面档位（`-50` 恒为最浅档），语义上是"调色板的主题化别名"；随模式自适应的 tint/text/border 仍走 `-subtle` / `-text` / `-border` 角色 token；
- 被完整色 override 的角色没有背书调色板，其面板跳过输出；
- UnoCSS 侧映射为 `bg-primary-500` / `text-destructive-100` 等工具类（`hsl(var(--vean-primary-500) / <alpha-value>)`），替代第一代的语义 ramp。

**这条扩张解决的现实问题**：今天 `bg-destructive/10 text-destructive` 这类"软底 + 状态文字 + 状态边框"全靠透明度修饰拼，库内 `/N` 修饰超过 600 处且无法被主题控制；现在四个角色各有正式 token。

> **on-solid 的真实结论**（实测，见 §7.3）：`destructive` 走 1 档到 `red.600` 配白字（4.62），保住"白字红底"惯例；`success` / `warning` / `info` 在名义填充下用**深字**即可通过（8.74 / 9.27 / 5.41），而不是把 amber 变棕去迁就白字。

### 4.7 数据可视化

| token                     | 说明                                                                       |
| :------------------------ | :------------------------------------------------------------------------- |
| `--chart-1` … `--chart-5` | 直接别名到 chart scheme 的调色板级别（`{c}.{level}`），不再生成 11 级 ramp |

chart scheme 的数据从"11 级 ramp 的种子"降级为"5 个调色板级别引用"，并补两条约束：相邻 chart 色**色相差 ≥ 30° 或明度差 ≥ 15%**（可辨识）；每个 scheme 必须同时给出 light / dark 且方向一致（亮色偏深、暗色偏浅）。

### 4.8 区域皮肤（region 轴，6 个 token）

**先看事实**：库内（`packages/ui/src/styles/*`）与文档示例对 sidebar token 的真实消费统计（下表用**现名**，便于对照 git 与代码；定名见其后）：

| 现 token（统计依据）                 | 消费次数 | 判定                                                                             |
| :----------------------------------- | -------: | :------------------------------------------------------------------------------- |
| `--sidebar`（背景）                  |       20 | **核心**：区域必须能与页面区分，这是该 token 族存在的理由                        |
| `--sidebar-border`（分隔线）         |        4 | **核心**：侧栏与内容区的边界                                                     |
| `--sidebar-foreground`（文字）       |        3 | **核心**：区域内的文字色（反色侧栏必须能改）                                     |
| `--sidebar-accent`（hover/选中填充） |        5 | **需要**：区域内 hover 面；反色侧栏下全局 `accent` 会失效                        |
| `--sidebar-primary`（选中/激活色）   |        4 | **需要**：用作文本/指示器/10% 底；全局 `--primary` 在反色侧栏上不一定可读        |
| `--sidebar-accent-foreground`        |        1 | **保留**：它是"区域内交互填充"的 on-color，语义上必须成对出现                    |
| `--sidebar-primary-foreground`       |        0 | **删除**：区域内的实心填充应直接使用全局 `--primary` / `--primary-foreground` 对 |
| `--sidebar-ring`                     |        0 | **删除**：改为把"侧栏表面"纳入 `--ring` 的对比度校验（见 §7.1）                  |

**精简原则**：区域（region）拥有的是**表面 / 内容 / 边界 / 交互填充**四类角色；**品牌实心对与焦点环不属于区域**——它们属于全局层，区域内需要实心按钮就用全局品牌对。这条原则既解释了为什么能删掉两个 token，也防止未来再次膨胀。

**命名原则**：区域 token 用**区域前缀 + 全局角色名**——`sidebar-` 只表示"这个角色属于侧栏区域"，后缀与全局一一对应。因为全局词汇采用 shadcn 系（`foreground` / `accent` / `muted` / `background`），现名 `sidebar-foreground` / `sidebar-accent` / `sidebar-accent-foreground` / `sidebar-border` / `sidebar-primary` **本来就是正确的镜像名**；本次只有 **`--sidebar` → `--vean-sidebar-surface` 一处真更名**（把"区域基底表面"这个角色显式化，与全局的 `background`/`surface` 阶梯对齐），其余仅是加前缀。

| 定名                               | 与现名的关系 | 默认（= 全局层）                                       | 角色                    |
| :--------------------------------- | :----------- | :----------------------------------------------------- | :---------------------- |
| `--vean-sidebar-surface`           | **更名**     | `--vean-background`（light）/ `--vean-surface`（dark） | 区域表面（基底，核心）  |
| `--vean-sidebar-foreground`        | 同名加前缀   | `--vean-foreground`                                    | 区域内文字（核心）      |
| `--vean-sidebar-border`            | 同名加前缀   | `--vean-border`                                        | 区域边界（核心）        |
| `--vean-sidebar-accent`            | 同名加前缀   | `--vean-accent`                                        | 区域内 hover / 选中填充 |
| `--vean-sidebar-accent-foreground` | 同名加前缀   | `--vean-accent-foreground`                             | 该填充上的文字          |
| `--vean-sidebar-primary`           | 同名加前缀   | `--vean-primary`                                       | 区域内选中 / 激活强调色 |

> **`--vean-sidebar-surface` 的默认映射说明**：亮色默认取 `--vean-background`（与页面同调、靠边框区分，即"平铺侧栏"），需要"侧栏比页面亮一档"时改成 `--vean-surface`（Ant / Semi 的白色侧栏形态）。名称表达角色（区域的基底表面），默认值是可换的设计选择。

若侧栏需要"次级文字"（分组标题、折叠说明），直接用全局的 `--vean-muted-foreground`（不预留 `sidebar-muted-foreground`）：实测该值在 `sidebar-surface` 的两种默认取值（`--vean-background` 与 `--vean-surface`）上都通过 4.5:1；只有当某个自定义区域皮肤让全局值失效时，才由 `overrides` 为该区域补一个专用值。

**语义修正**：区域 token **始终输出**（默认显式等于全局层），不会像今天那样在 `sidebarDerive: false` 时被整段删除（审计 P0-3）。

### 4.9 非颜色族（完整清单）

| token                                                                                            | 默认值 / 推导                                                                        | light–dark 差异     |
| :----------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- | :------------------ |
| `--radius`                                                                                       | `0.625rem`（种子，可配 `ThemeRadiusValue`）                                          | 无                  |
| `--radius-2xs` … `--radius-2xl`                                                                  | `calc(var(--radius) ∓ Npx)`：2xs −8 / xs −6 / sm −4 / md −2 / lg ±0 / xl +4 / 2xl +8 | 无                  |
| `--control-height-sm` / `--control-height` / `--control-height-lg`                               | `2rem`（现 `h-8`）/ `2.25rem`（`h-9`）/ `2.5rem`（`h-10`）                           | 无                  |
| `--space-gutter` / `--space-section` / `--space-gap` / `--space-control-x` / `--space-control-y` | `1rem` / `1.5rem` / `0.5rem` / `0.75rem` / `0.375rem`                                | 无                  |
| `--shadow-color`                                                                                 | `rgb(0 0 0 / 0.1)`                                                                   | `rgb(0 0 0 / 0.4)`  |
| `--shadow-xs` … `--shadow-lg`                                                                    | 由 `--shadow-color` 组合的 4 档（对齐 UnoCSS `xs`/`sm`/`md`/`lg`）                   | 随 `--shadow-color` |
| `--duration-fast` / `--duration-base` / `--duration-slow`                                        | `100ms` / `150ms` / `250ms`                                                          | 无                  |
| `--ease-out` / `--ease-in-out` / `--ease-spring`                                                 | `cubic-bezier(.16,1,.3,1)` / `(.4,0,.2,1)` / `(.34,1.56,.64,1)`                      | 无                  |
| `--z-layout` / `--z-base` / `--z-toast` / `--z-max`                                              | `10` / `50` / `100` / `2147483647`（见 §4.11）                                       | 无                  |
| `--border-width` / `--border-width-strong`                                                       | `1px` / `2px`                                                                        | 无                  |
| `--ring-width` / `--ring-offset-width`                                                           | `3px` / `2px`                                                                        | 无                  |
| `--font-sans` / `--font-heading` / `--font-mono`                                                 | 默认取 UnoCSS 字族栈                                                                 | 无                  |
| `--text-4xs` … `--text-2xl`                                                                      | 9 档（`0.375rem` … `1.5rem`）+ 9 个配对行高 `--leading-4xs` … `--leading-2xl`        | 无                  |

**关于 spacing（已定）**：只提供 5 个**语义**间距 token，**不做**数字 spacing 的全量 token 化。理由：数字间距属于布局层、已经是 rem 且随根字号缩放，把它 token 化只会增加 16 个变量与映射而不增加可主题化的设计决策；真正需要 token 的是"密度"（`--control-height*` 与语义间距）。

**关于行高（已定）**：`--text-*` 与 `--leading-*` 成对产出（9 组），UnoCSS 的 `fontSize` 元组直接引用两者（`sm: ['var(--text-sm)', 'var(--leading-sm)']`），这样行高也可被主题覆盖，而不是写死在预设里。

### 4.10 命名规范与词表

命名规则（先立规则再套用，避免逐 token 拍脑袋）：

1. **角色优先于表象**：`--surface` 而非 `--card`（任何容器都可复用）、`--elevated` 而非 `--popover`（popover 是组件名）。Ant 的 `colorBgContainer` / `colorBgElevated` 是同一条思路。
2. **表面不配前景、填充才配 `-foreground`**（本规格的核心命名规则）：
   - **表面（surface）**：`background` / `surface` / `elevated` / `carbon` —— 其上的文字走 `foreground` 阶梯（`--foreground` / `--muted-foreground` / `--foreground-subtle` / `--carbon-foreground`），**不产出** `--surface-foreground` 这类 token。依据：主流体系里"页面文字"与"卡片文字"是同一个角色（Ant `colorText`、Mantine `text`、Chakra `fg`、shadcn `foreground`），逐表面配前景只会产出"多个 token 一个值"的冗余（审计第 11 条）。本仓库旧命名 `--sidebar-foreground` 正是这条规则的反面案例：它与 `foreground` 同值却独立存在，属于典型的"多 token 一值"。
   - **填充（fill）**：`accent` / `secondary` / `primary` / `{status}` / `{status}-subtle` —— 必须成对产出 `-foreground`（着色表面上的文字要独立定档）。`muted` 是例外：其实测可与全局次要文本共用 `--muted-foreground`（§4.3），因此不重复产出。
   - 生态通用性：`-foreground` 是 shadcn / Chakra / Radix 的一致选择；M3 的 `on-*`（`on-primary`）表意更好但熟悉度低，**不采纳**。
3. **属性族前缀只给"非表面"角色**：文本族 `--foreground*`（**不用 `--text*`**：Tailwind v4 / UnoCSS 已把 `--text-*` 用作字号命名空间）、边界族 `--border*`、字体族 `--font-*` / `--text-*` / `--leading-*`。
4. **修饰语只用中性形容词**：`muted` / `subtle` / `strong` / `carbon`（历史名复原，§12-9）。**禁止在 token 名里出现 `light` / `dark`**（`--light-border` 会被误读为"仅亮色生效"）。`accent` 采纳（shadcn 语义 = 交互填充面）：它与 Radix 的 `--accent-N`（品牌色阶）同名不同义，但本项目不使用 Radix 的色阶命名，故无冲突。
5. **状态用 `{status}-{role}`**：`--destructive` / `--destructive-foreground` / `--destructive-text` / `--destructive-subtle` / `--destructive-border`（Ant 的 `colorErrorText` / `colorErrorBg` 同思路）。
6. **档位用数字、标度用具名**：`--radius-md`、`--text-sm`、`--shadow-lg`、`--z-layout`。
7. **区域（region）用"区域前缀 + 全局角色名"**：`--vean-sidebar-surface` / `--vean-sidebar-foreground` / `--vean-sidebar-accent`…… 区域只表示"这个角色属于该区域"，后缀必须与全局角色一一对应，**不另起词汇**（§4.8）。
8. **颜色变量一律是裸通道**（消费时包裹为 `hsl()` / `oklch()`）；只有 alpha 需要独立可调时才追加数值伴生变量 `-alpha`（仅边框族三个，§4.4）。
9. **前缀**：语义层加 `--vean-`，调色板层不加（见下）。

**前缀结论**：语义层**必须加前缀 `--vean-`**——今天的 `--primary` / `--background` / `--foreground` / `--muted` / `--accent` / `--border` / `--ring` / `--chart-1..5` / `--sidebar-*` 与 **shadcn/ui 完全同名**，共存时会互相覆盖（谁后加载谁生效），这是"静默错色"级别的事故；而主流组件库无一例外都加前缀（Chakra `--chakra-*`、Mantine `--mantine-*`、PrimeVue `--p-*`、MUI `--mui-*`、Element Plus `--el-*`、Semi `--semi-*`）。调色板层**不加前缀**（`--indigo-500`）：它是 Tailwind 风格的 500 阶命名，Tailwind v4 自身用 `--color-*` 命名空间、Open Props / Radix 用 1–12 阶，**不存在同名碰撞**；而不加前缀正是"颜色继承"场景里被写得最多的名字（`var(--indigo-500)`），给 572 条声明加前缀只增体积与书写成本。前缀可配置（`prefix: 'vean' | false`）。

**与 shadcn 及前两轮提案的命名对照**（本轮定稿：**沿用 shadcn 的词汇，但加 `--vean-` 前缀**，以避免同名互覆）：

| 旧提案                                           | 定名                                                                                                                 | 原因                                                                                 |
| :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------- |
| `--canvas`                                       | **还原为 `--vean-background`**                                                                                       | 采用 shadcn 词汇；且页面基底就是"背景"这一角色，无需另造词                           |
| `--content`                                      | **还原为 `--vean-foreground`**                                                                                       | 采用 shadcn 词汇（`foreground`），同时保留"表面不配前景"规则（§4.1）                 |
| `--content-muted` + `--subtle-foreground`        | **合并为 `--vean-muted-foreground`**                                                                                 | 实测二者可共用一值（§4.2）；合并后少一个 token，且沿用 shadcn 名                     |
| `--content-subtle`                               | **`--vean-foreground-subtle`**                                                                                       | 三级文本；修饰语用 `subtle`（`subtle` 已不再作为填充名，无歧义）                     |
| `--content-inverse`                              | **`--vean-carbon-foreground`**                                                                                       | 反相表面文字                                                                         |
| `--subtle`                                       | **还原为 `--vean-muted`**                                                                                            | 采用 shadcn 词汇（`muted` = 弱化面）                                                 |
| `--interactive` / `-foreground`                  | **还原为 `--vean-accent` / `--vean-accent-foreground`**                                                              | 采用 shadcn 词汇（`accent` = 交互填充面）                                            |
| `--secondary`                                    | **改回 `--vean-secondary`**（2026-09-19 复议：曾定 `control`，按「熟悉优先」原则还原 shadcn 词汇；**值与护栏不变**） | shadcn `secondary` 是生态最熟悉名；`control` 与 Fluent `ControlFill*` 同源但属少数派 |
| `--carbon`                                       | **改回 `--vean-carbon`**（§12-9 复原）                                                                               | 历史连续性优先；值与"表面不配前景"架构不变                                           |
| `--border-strong`                                | 保留                                                                                                                 | 规则 4：`strong` 是中性修饰语（Radix 的 step 8 角色）                                |
| `--surface-foreground` / `--elevated-foreground` | **删除**（改用 `--vean-foreground*`）                                                                                | 规则 2：表面不配前景；且二者与 `foreground` 同值，属"多 token 一值"冗余              |
| `--inverse-foreground`                           | **删除**（改用 `--vean-carbon-foreground`）                                                                          | 规则 2：`carbon` 是表面                                                              |
| `--sidebar`                                      | **`--vean-sidebar-surface`**                                                                                         | 规则 7：区域表面（原名的 `sidebar` 无法表达"它是区域基底表面"）                      |
| `--sidebar-foreground`                           | **`--vean-sidebar-foreground`**                                                                                      | 规则 2 + 7：区域表面上的文字走 `foreground` 角色                                     |
| `--sidebar-accent`                               | **`--vean-sidebar-accent`**                                                                                          | 规则 4 + 7：`accent` → 全局交互填充角色 `interactive`                                |
| `--sidebar-accent-foreground`                    | **`--vean-sidebar-accent-foreground`**                                                                               | 同上，保持配对                                                                       |
| `--sidebar-border` / `--sidebar-primary`         | 保留（加前缀）                                                                                                       | 已符合规则（`border` / `primary` 就是全局角色名）                                    |

### 4.11 z-index：层级不是阶梯，而是"打开顺序"

**先看事实**（本仓库现状）：所有浮层（dialog / sheet / select / combobox / cascader / autocomplete / popover / tooltip / backtop）都通过 teleport 渲染到 `body`，并共用同一个 `z-50`（`packages/ui/src/styles/_overlay.ts` 的 `overlayLayer` 常量被各浮层复用）；**层与层之间的先后由 DOM 顺序（即打开顺序）决定**；toast 更彻底——它的 `--z-index` 由 `useToastState` 在 JS 里按位置与顺序计算；布局内的固定头/侧栏则用 `--soybean-layout-*-z-index` 自成一套。

**因此"7 级具名阶梯"（dropdown=20 / modal=50 / tooltip=80）是错的**：它会把"后打开的层在上"这条语义换成"类型决定层级"，于是"在 dialog 里打开的 dropdown"会被 dialog 盖住。正确设计是**一个浮层基准 + 两个例外**：

| token        | 值           | 用途                                                                                                 |
| :----------- | :----------- | :--------------------------------------------------------------------------------------------------- |
| `--z-layout` | `10`         | 页面内嵌 chrome（sticky header / 侧栏 / tabs / 悬浮按钮），必须低于所有浮层                          |
| `--z-base`   | `50`         | **所有 teleport 浮层的统一层级**；层间顺序由 DOM（打开顺序）决定，层内（遮罩 → 内容）同样靠 DOM 顺序 |
| `--z-toast`  | `100`        | 全局通知：即使浮层未关闭也必须可见（含"浮层内触发的 toast"）                                         |
| `--z-max`    | `2147483647` | 逃生舱（调试 / 宿主环境覆盖）；不用于业务组件                                                        |

规则：**除上表四个之外，组件不允许出现字面量 z-index**（今天 13 处 `z-50` 的硬编码正是这条规则的反面教材）；需要"某浮层更高"时，正确的做法是让它更晚打开（或由浮层管理器分配序号），而不是改 z-index。这条规则也让"宿主应用有自己的层级体系"成为可配置项——把 `--z-base` 调高即可整体让位。

---

## 5. Light / Dark 的产出形态

语义层产出两份别名块（结构完全对称，只有右侧级别不同）：

```css
:root {
  /* 表面阶梯 */
  --vean-background: var(--zinc-100);
  --vean-surface: var(--white);
  --vean-elevated: var(--white);
  --vean-scrim: var(--black);
  /* 品牌 / 状态 / 图表 / 侧栏 */
  --vean-primary: var(--indigo-500);
  --vean-primary-foreground: var(--zinc-950);
  /* 区域（侧栏）——默认等于全局角色 */
  --vean-sidebar-surface: var(--vean-background);
  --vean-sidebar-foreground: var(--vean-foreground);
  --vean-sidebar-border: var(--vean-border);
  --vean-sidebar-accent: var(--vean-accent);
  --vean-sidebar-accent-foreground: var(--vean-accent-foreground);
  --vean-sidebar-primary: var(--vean-primary);
  /* 非颜色族 */
  --vean-radius: 0.625rem;
  --vean-z-base: 50;
}

.dark {
  /* 或 [data-theme="dark"] / @media (prefers-color-scheme: dark) */
  --vean-background: var(--zinc-950);
  --vean-surface: var(--zinc-900);
  --vean-elevated: var(--zinc-800);
  --vean-primary: var(--indigo-500);
}
```

要点：

0. **每个块的首行是 `color-scheme`**：`class` / 自定义 selector 下亮色块写 `color-scheme: light`、暗色块写 `dark`；`media` 模式下亮色块写 `light dark`（交给 UA 跟随系统），暗色块不写。这是让原生控件、滚动条、画布与自动填充跟随主题的唯一手段（审计 P1-5）。
1. **暗色块只写与亮色不同的别名**（差异裁剪逻辑保留；因为全是引用，diff 极小）。
2. `--white` / `--black` 是调色板层成员（通道 `0 0% 100%` / `0 0% 0%`）：`--vean-scrim` 与暗色边框族依赖它们。
3. 档位（`lightLevel` / `darkLevel`）只改变**右侧级别**，不改变结构，所以档位不会破坏任何不变量的形态。
4. 语义 token 只是**指向调色板级别的通道引用**（`--vean-background: var(--zinc-100)`），由映射表统一产出；没有第二种色值形态需要同步。
5. 非颜色族也带前缀（`--vean-radius`、`--vean-z-base`），保持"语义层全部 `--vean-`"这条规则无例外；调色板层（`--zinc-100`）不带前缀（§4.10）。

---

## 6. 机制一：阶梯位移（档位）

### 6.1 规则

阶梯按"离画布的距离"定义，档位 = **整条阶梯沿色板同向位移**：

```
亮色：canvas  {b}.100 → .200 → .300        （lightLevel = 0 / 1 / 2）
      muted / secondary / accent 同步下移；surface / elevated 固定在最亮端（white）
暗色：canvas  {b}.950 → .900 → .850 → .800  （darkLevel = 0 / 1 / 2 / 3）
      surface / elevated / muted / accent 同步上移
触边：某档触到色板端点后压缩差值，绝不反向
```

`surfaceStyle: 'flat' | 'layered'`（默认 `layered`）：`flat` 时 `canvas` 也取该模式的极值（亮色 `white` / 暗色 `{b}.950`），等价今天的外观，层级完全交给边框与阴影。

### 6.2 为什么必须这样改（今天的问题）

今天 `LIGHT_SURFACE = [white, 50, 100, 200]` 同时作用于 `background` / `card` / `popover`，而三者在模板里都是 `white`，沿表前移后**永远同值**：`lightLevel = 1/2` 时 `background = card = popover`，`muted = accent = secondary`（level 1 时还等于 `border`）。层级不是被"调暗"而是被"抹平"。改成"阶梯位移 + 不变量"后，这一失败在结构上不可能发生。

### 6.3 接受度规则（可测试）

| 轴                   | 规则                                                                | 实测                                                                                 |
| :------------------- | :------------------------------------------------------------------ | :----------------------------------------------------------------------------------- |
| elevation（硬约束）  | `lum(background) < lum(surface) ≤ lum(elevated)`，相邻对比度 ≥ 1.08 | 1.09–1.29（唯一例外：亮色 `surface = elevated`，设计允许，靠阴影分离）               |
| 软填充（下界硬约束） | `muted` / `secondary` / `accent` 相对所在表面 ≥ 1.08                | 1.15–1.48；暗色 `background↔muted` 在 mist/sky 达 1.62（可接受，属深色软块常见形态） |

> 上界（"层级不要被读成两块不同颜色"）在**亮色 elevation 轴**上是硬约束（≤1.30），在**暗色软填充**上只作参考——暗色里 muted 块与页面差 1.4–1.6 是常规观感。

---

## 7. 机制二：对比度护栏

### 7.1 配对清单与阈值

| 配对                                                                                                                                                                                      | 阈值                              |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------- |
| 文本 ↔ 所在表面（`foreground*` / `*-foreground` ↔ `background`/`surface`/`elevated`/`muted`/`accent`/`secondary`/`carbon`）                                                               | 4.5（`aa`）/ 7（`aaa`）           |
| 实心 ↔ on-solid（`--{s}-foreground` ↔ `--{s}`、`--primary-foreground` ↔ `--primary`）                                                                                                     | 4.5                               |
| 状态文字 ↔ 中性表面（`--{s}-text` ↔ `canvas` / `surface`）                                                                                                                                | 4.5                               |
| **区域配对**（`--vean-sidebar-foreground` ↔ `--vean-sidebar-surface`、`--vean-sidebar-accent-foreground` ↔ `--vean-sidebar-accent`、`--vean-sidebar-primary` ↔ `--vean-sidebar-surface`） | 4.5 / 3.0（primary 作指示器时）   |
| 非文本边界（`ring` / `input` / `border-strong` ↔ 相邻表面，**含 `--vean-sidebar-surface`**）                                                                                              | 3.0                               |
| 阶梯相邻档（§6.3）                                                                                                                                                                        | ≥1.08（亮色 elevation 上界 1.30） |

> **区域配对是本次新增**：删掉 `sidebar-ring` 之后，焦点环在侧栏上的可见性由"`--ring` ↔ `--vean-sidebar-surface` ≥ 3:1"这条校验来保证；反色侧栏（light 下侧栏为深色）若让校验失败，护栏会就地走档，而不是靠一个没人消费的 `--sidebar-ring`。

### 7.2 算法（两个杠杆 + 约定优先）

```
1. 每个 (fill, on-solid) 配对在 scheme 数据里声明 prefer: 'light' | 'dark' | 'auto'
   （destructive = 'light'（白字红底是惯例）；success / warning / info / primary = 'auto'）
2. 在名义填充上评估两种候选文字（{b}.50 / {b}.950）：
     都通过   → 取 prefer（auto 取对比度更高者）
     仅一个通过 → 用它
     都不通过 → 进入 3
3. 沿色板走填充色（亮色向更深、暗色向更浅），每步重新评估；最多 2 档；优先满足 prefer
4. 仍不通过 → 回退绝对黑 / 白文字，并输出告警报告（记录 token / 步数 / 最终比值）
```

其余配对（文本、边界）只用一个杠杆：就地走级别，最多 4 档（因为它们的"填充"由语义决定，例如 `ring` 必须跟随 primary）。

### 7.3 实测验收（6 组 base×primary × 2 模式 = 12 个变体，351 项配对）

**名义表全部通过，仅 1 处需要护栏修正，且只走 1 档**：

| 变体             | 配对                            | 名义                | 护栏结果                 |
| :--------------- | :------------------------------ | :------------------ | :----------------------- |
| stone / amber 亮 | `--ring` ↔ `canvas` / `surface` | `{p}.600` = 2.93 ❌ | `{p}.700` ≥ 3 ✅（1 档） |

> primary 的 on-solid 配对按 **§12-7** 走组件阈值（3:1）：500 档名义即通过（indigo 白字 ≈4.4:1），默认主题的护栏修正在该决议后**清零**。副作用：亮色系（yellow / lime 等）在 500 档白字不达 3:1，护栏的选字杠杆会自动改用深色文字——与 shadcn 对明亮填充的处理一致。

同批实测得到的其它事实（应写成测试断言）：

| 配对                                         | light（名义）                          | dark（名义）               |
| :------------------------------------------- | :------------------------------------- | :------------------------- |
| `content` / `canvas`                         | 17.6–19.9                              | 16.5–19.1                  |
| `content-muted` / `surface`                  | 7.0–7.6                                | 7.7–8.6                    |
| `foreground-subtle` / `surface`              | 4.3–4.9                                | 5.1–6.2                    |
| `--success-foreground` ↔ `--success`         | `green.500` + 深字 = **8.74**          | `green.400` + 深字 = 10.29 |
| `--warning-foreground` ↔ `--warning`         | `amber.500` + 深字 = **9.27**          | `amber.400` + 深字 = 10.76 |
| `--info-foreground` ↔ `--info`               | `blue.500` + 深字 = **5.41**           | `blue.400` + 深字 = 7.05   |
| `--destructive-foreground` ↔ `--destructive` | `red.600` + 白字 = **4.62**（走 1 档） | `red.400` + 深字 = 6.33    |
| `--{s}-text` / `canvas`                      | 4.6–6.9                                | 6.9–11.6                   |

> 对照今天的实现：`success` 2.18、`warning` 2.06、`ring` 1.67–2.99（全部不达标）。差异的根源是"取 base 极值当前景"这条规则；改为"按亮度选择 + 有界走档"后消失。

---

## 8. UnoCSS 对齐

> **落地状态（2026-09-19，T1.5 完成）**：第一代引擎已整体退役，新引擎即 `@vean/theme`（`packages/theme`）。`packages/unocss/src/theme.ts` 是唯一适配器：语义 token 与 26 个调色板都走 `hsl(var(--x) / <alpha-value>)`；调色板层 + 默认主题别名块作为 preflight 静态产物随预设发布（无需运行时 JS 即生效）。运行时侧 `SConfigProvider` 独占 head 内的 `<style id="vean-theme">`，主题状态与派生 CSS 同词汇（无映射层），经单一防抖写入者落入 `__VEAN_THEME` 信封。其余 theme key 已接管**视觉中性**的那部分（`borderRadius` / `fontSize`+`leading` / `fontFamily` / `zIndex` / `duration` / `easing` / `lineWidth` / `ringWidth` → `--vean-*`）；`globalCSS` 的基础样式（`body` 前景/背景、默认边框色、根字号）同步读 `--vean-*` 变量，避免"页面背景与 `bg-background` 取自两套状态"。`boxShadow` 与 `spacing` 因会改变渲染，随 VRT 基线更新一起切。

### 8.1 theme key 归属表（哪些 key 由主题拥有）

UnoCSS preset-mini 的 `theme` 共 38 个 key（`_theme/` 下 `colors` / `font` / `misc` / `filters` / `size` / `preflight` / `transition` 聚合而来）。**只接管与设计决策相关的一小部分，其余保留 UnoCSS 默认**——避免把 UnoCSS 的完整刻度搬进来形成第二套 token 表。

| UnoCSS theme key                                                                                                                                                                                                                                                        | 归属             | Vean 侧映射                                                                                                         |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------- | :------------------------------------------------------------------------------------------------------------------ |
| `colors`                                                                                                                                                                                                                                                                | **主题拥有**     | 语义色 → `hsl(var(--vean-{token}) / <alpha-value>)`；26 调色板 → 同名通道引用                                       |
| `borderRadius`                                                                                                                                                                                                                                                          | **主题拥有**     | `DEFAULT`/`sm`/`md`/`lg`/`xl`/`2xl` → `var(--vean-radius-*)`；`none`/`full`/`3xl` 保留                              |
| `boxShadow`                                                                                                                                                                                                                                                             | **主题拥有**     | `xs`/`sm`/`md`/`lg` → `var(--vean-shadow-*)`；`none`/`inner` 与更多档保留                                           |
| `fontSize`                                                                                                                                                                                                                                                              | **主题拥有**     | `4xs`…`2xl` → `[var(--vean-text-*), var(--vean-leading-*)]`                                                         |
| `fontFamily`                                                                                                                                                                                                                                                            | **主题拥有**     | `sans`/`heading`（新增）/`mono` → `var(--vean-font-*)`；`serif` 保留                                                |
| `zIndex`                                                                                                                                                                                                                                                                | **主题拥有**     | `layout`/`base`/`toast`/`max` → `var(--vean-z-*)`；`auto` 保留（浮层内部顺序由 DOM 决定，§4.11）                    |
| `duration`                                                                                                                                                                                                                                                              | **主题拥有**     | `fast`/`base`/`slow` → `var(--vean-duration-*)`；数字 key 保留                                                      |
| `easing`                                                                                                                                                                                                                                                                | **主题拥有**     | `out`/`in-out`/`spring` → `var(--vean-ease-*)`                                                                      |
| `lineWidth`                                                                                                                                                                                                                                                             | **主题拥有**     | `DEFAULT` → `var(--vean-border-width)`；`strong` → `var(--vean-border-width-strong)`                                |
| `ringWidth`                                                                                                                                                                                                                                                             | **主题拥有**     | `DEFAULT` → `var(--vean-ring-width)`；其余保留                                                                      |
| `spacing`                                                                                                                                                                                                                                                               | 部分             | 仅新增语义 key：`gutter`/`section`/`gap`/`control-x`/`control-y` → `var(--vean-space-*)`；数字 key 保留 UnoCSS 行为 |
| `breakpoints` `verticalBreakpoints` `containers` `width`/`height`/`max*`/`min*`/`inline*`/`block*` `blur` `dropShadow` `textShadow` `textIndent` `textStrokeWidth` `letterSpacing` `lineHeight` `fontWeight` `wordSpacing` `transitionProperty` `preflightBase` `media` | 保留 UnoCSS 默认 | 与主题决策无关，或 UnoCSS 已提供完备刻度                                                                            |

**关于 `fontSize` 的现状**：当前预设额外注入了 `4xs`/`3xs`/`2xs` 与 `root: var(--size)`（第一代仍在用 `--size`；v2 侧已产出 `--vean-text-*` / `--vean-leading-*`，切换见 §12 决议 #1 的后续）。新方案把这 3 个小档纳入 `--text-*` token；`root` 删除（它是根字号缩放的别名，不是字号档位）。

**关于 `spacing` 的实测事实**：UnoCSS 的 `spacing` 是**具名**刻度（`none`/`xs`/`sm`/`DEFAULT`/`lg`/`xl`/`2xl`…`9xl`），而数字用法（`p-4` → `1rem`、`p-13` → `3.25rem`、`p-0.5` → `0.125rem`）由 preset-mini 内部按 `n × 0.25rem` 计算，**不经过 theme**。因此数字间距无法通过 token 覆盖——这也正是"采用语义间距"（§12 决议 #2）的技术前提。

### 8.2 颜色引用机制（实测依据，实现时不可省略）

**必须用"函数 + 通道"形式**，否则透明度修饰符会被静默丢弃。实测（UnoCSS 生成器实跑）：

| `theme.colors` 取值                  | `bg-x/50` 的产出                                                       | 结论              |
| :----------------------------------- | :--------------------------------------------------------------------- | :---------------- |
| `var(--vean-x)`                      | `background-color:var(--vean-x)`                                       | ❌ **alpha 丢失** |
| `hsl(var(--vean-x))`                 | `hsl(var(--vean-x) / 0.5)`                                             | ✅                |
| `oklch(var(--vean-x))`               | `oklch(var(--vean-x) / 0.5)`                                           | ✅                |
| `hsl(var(--vean-x) / <alpha-value>)` | 无修饰：`hsl(var(--vean-x) / var(--un-bg-opacity))`；有修饰：`… / 0.5` | ✅ **推荐**       |

因此：

```ts
// @vean/unocss 的颜色映射：外层函数由 format 决定；语义 token 带 --vean- 前缀，调色板不带
const colorRef = (varName: string, format: ColorFormat) => `${format}(var(${varName}) / <alpha-value>)`;
const semantic = (token: string) => colorRef(`--vean-${token}`, format);
const palette = (name: string) => colorRef(`--${name}`, format);

theme.colors = {
  // 语义层（前缀由 colorRef 补上）
  canvas: semantic('canvas'),
  surface: semantic('surface'),
  primary: { DEFAULT: semantic('primary') /* … */ },
  'content-muted': semantic('content-muted'),
  // 26 调色板（同名通道引用：`bg-indigo-500/50` 可用且与主题同源）
  indigo: { 500: palette('indigo-500'), 600: palette('indigo-600') /* … */ }
};
```

> 副作用是**单事实源**：UnoCSS 的调色板不再使用内置字面量，而是引用注入的变量；改调色板（含自定义色板）时工具类同步变化。

---

## 9. 引擎 API 与包结构

### 9.1 `@vean/theme` 导出面（引擎已实现）

引擎在 `packages/theme`（`@vean/theme`）中开发与验证；第一代实现已删除，全部调用点（UnoCSS 适配器 / SConfigProvider / 首帧 / 持久化）直连该包。

```ts
// —— 核心 ——
resolveThemeMap(options: ThemeOptions): ThemeMap     // 「映射表」纯数据（别名 CSS 的中间表示）
emitThemeCss(map: ThemeMap, options?: EmitThemeOptions): string   // Layer 2（别名 + alpha 伴生 + 非颜色层）
generatePaletteCss(options?: { format }): string     // Layer 1（26 × 11 + white/black，静态）
// 注：不带 createTheme —— 旧名由第一代占用；M3 切换调用点后再谈命名

// —— JS 侧的颜色解析（对应 §3.1：完整色不进 CSS 变量，由函数算出）——
resolveTokenColor(options: ThemeOptions, token: SemanticToken, mode: ThemeMode, format?: ColorFormat): string
resolveThemeColors(options: ThemeOptions, mode: ThemeMode, format?: ColorFormat): Record<SemanticToken, string>
// 两者都走同一个 resolveThemeMap（含护栏修正），所以结果与生成的 CSS 必然一致；纯函数，SSR / worker / 原生端可用

// —— 数据（护栏、文档与生成的共同来源）——
PALETTE_KEYS / PALETTE_LEVELS / NEUTRAL_PALETTES     // 26 色板、11 级、中性族判定
SEMANTIC_TOKENS / CORE_RULES / ALPHA_RULES           // token 词表 + 级别规则 + alpha 规则
CORE_TEXT_PAIRS / REGION_TEXT_PAIRS / CORE_NON_TEXT_PAIRS / CORE_ON_SOLID_PAIRS / LADDER_PAIRS   // 护栏契约
FEEDBACK_SCHEMES / CHART_SCHEMES                     // 状态与图表方案（纯数据，可换）
LITERAL_DEFAULTS / DARK_LITERALS / DEFAULT_OPTIONS    // 非颜色层与引擎默认值

// —— 类型 ——
ThemeOptions / ThemeMap / TokenValue / PaletteLevelRef / SemanticToken / ContrastReport / EmitThemeOptions
```

**实现期新增的能力**（规格原表未列，已实现并有测试）：

| 能力                      | 说明                                                                                                                                                                  |
| :------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `overrides`               | 按 token 覆盖（`palette.level` 引用或**完整色**），最高优先级；被覆盖的配对**只报告不修正**（`ContrastCorrection.overridden = true`），避免"用户显式覆盖却被静默改掉" |
| `solidVars`               | 逃生舱：`chart` / `all` 时额外产出完整色变量 `--vean-{token}-solid`，默认 `none`                                                                                      |
| `borderOpacity`           | 装饰性边框 alpha 的倍数（乘在 `--vean-border-alpha` 上）                                                                                                              |
| `EmitThemeOptions.format` | 只影响 `solidVars` 产出的完整色格式（通道值本身与格式无关）                                                                                                           |
| `dist/palette.css`        | Layer 1 的静态产物（`pnpm build` 时由 `scripts/emit-palette.mts` 写出，实测 9,240 B / gzip 2,780 B）                                                                  |

`ThemeMap` 是本次架构的核心中间表示（CSS 与 JS 两条路径都读它，因此不会分叉）：

```ts
type PaletteLevelRef = `${PaletteKey}.${PaletteLevel}`; // 如 'indigo.600'
type TokenValue =
  | { kind: 'palette'; palette: PaletteKey; level: PaletteLevel } // → var(--indigo-600)
  | { kind: 'simple'; name: 'white' | 'black' } // → var(--white)
  | { kind: 'color'; value: string }; // 完整色覆盖 → 原样输出
type ThemeMap = {
  light: Record<SemanticToken, TokenValue>;
  dark: Record<SemanticToken, TokenValue>; // 由 resolveThemeMap 保证两模式都完整
  alpha: Record<AlphaToken, { light: number; dark: number }>; // 边框族 alpha 伴生
  literal: Record<LiteralToken, string>; // 尺寸 / 圆角 / 阴影 / 动效 / z / 字体
  report: ContrastReport; // 护栏修正记录（测试与 dev 警告用）
};
```

`ThemeOptions`：

```ts
interface ThemeOptions {
  base?: PaletteKey;                                  // 9 个中性色板
  primary?: PaletteKey;                               // 26 个色板任选（含中性）
  feedback?: FeedbackSchemeKey;                       // classic / vivid / subtle / modern / professional
  chart?: ChartSchemeKey;                             // vivid / cool / warm / natural / minimal
  // 注：sidebar 不再是 scheme —— 区域 token 由全局角色镜像而来（§4.8）
  overrides?: { light?: Partial<Record<SemanticToken, TokenOverride>>; dark?: … };  // TokenOverride = palette.level 引用 | 完整色
  lightLevel?: 0 | 1 | 2;
  darkLevel?: 0 | 1 | 2 | 3;
  surfaceStyle?: 'layered' | 'flat';
  contrast?: 'off' | 'aa' | 'aaa';
  size?: ThemeSizeValue;                              // 整体缩放（根字号）
  radius?: ThemeRadiusValue;
  format?: ColorFormat;                               // 仅影响 Layer 1 产出（构建期）
  darkSelector?: DarkSelectorValue;
  styleTarget?: StyleTarget;
}
```

### 9.2 包职责

| 包             | 职责                                                                                                           |
| :------------- | :------------------------------------------------------------------------------------------------------------- |
| `@vean/theme`  | Layer 1 生成 + Layer 2 映射与护栏 + 静态样式表产物（`dist/palette.css`）+ 类型 + 存储/首帧（**引擎唯一实现**） |
| `@vean/unocss` | `theme` 映射（§8.1）+ Layer 1 的 preflight；现有 animations / scrollbar / webFonts / globalCSS 不变            |
| `@vean/ui`     | `SConfigProvider`：解析 `ThemeOptions` → 注入 Layer 2 的 `<style>`；持久化只存**选项**（不再存颜色）           |

### 9.3 持久化与首帧（已实现；机制在实施中修正过一次）

持久化的内容从"整份 CSS 快照（7.2 KB）"降级为**选项集（百字节级）+ 一份别名块快照（≈5 KB，防抖写入）**；Layer 1 静态、Layer 2 的默认值已在静态样式中，**只有非默认主题才需要快照**。

首帧机制——**单一 `<style id="vean-theme">`，由首帧脚本创建/改写、Provider 接管**：

1. 静态层（Layer 1 调色板 + 默认 Layer 2 别名块）由预设 preflight / `palette.css` 产出，位于样式表内 —— 默认主题**零 JS 即可正确**。
2. `<head>` 最前的内联脚本读 v2 信封；信封里有 `style` 载荷时，`getElementById('vean-theme')` 命中则改写、未命中则创建后写入；再切暗色 class 并设 `documentElement.style.colorScheme`。
3. hydration 后 `SConfigProvider` **接管同一个元素**（存在即复用，不存在则创建），响应式更新其内容；组件树内不再渲染任何 `<style>`，因此没有 SSR/客户端样式内容不一致的问题。

**实施中修正的一点（重要）**：原定"改写 head 里已存在的元素"在物理上不成立 —— head 内联脚本必然在 body 元素之前执行，且排在样式表之前，`getElementById` 那时还找不到运行时元素；而"注入到 head 末尾"又不可能（head 尚未解析完）。因此脚本必须**自己创建**元素，于是"谁赢"不能靠源码顺序决定。解法是让**静态默认层降权到零特异性**（`:where(:root)` / `:where(.dark)`，由 `emitThemeCss({ weakSelectors: true })` 产出）：运行时/快照用普通选择器即可胜出，**既不需要 `!important`，也不需要"注入再移除"的舞蹈**。`weakSelectors` 用的是 Baseline 2021 的 `:where()`，比 `@layer`（2022）兼容面更宽。

其余要点：

- 信封为**单键** `__VEAN_THEME`（`v` 版本 + `options` + `mode` + `style` 载荷），读写全部 `try/catch`；写入由**一个防抖写入者**（250ms）独占，`flush()` 供卸载/隐藏时使用。
- `parseThemeOptions` **逐字段**校验：非法字段丢弃、其余保留（不再因一个未知枚举丢掉整份配置，审计 P1-4）。
- 首帧脚本仍须是 `<head>` 里**第一个** `<script>`，并在有 CSP 时带上 `nonce`；运行时创建/接管的 `<style>` 也会带上 `nonce`（`SConfigProvider` 的 `nonce` prop 透传）。

不采纳"把映射表内联进首帧脚本、现场算别名块"：它能彻底去掉快照，但要在两个运行时维护同一套映射逻辑（约 1–2 KB JS + 常量表），而快照方案的内联脚本只有百字节级，且产出物就是引擎的真实输出、不存在与引擎漂移的可能。若后续真要去掉快照，这条路径保留为备选（见 §12）。

配套要求：脚本必须是 `<head>` 里**第一个** `<script>`，支持 `nonce`，读写存储全部 `try/catch`（这三条是原「持久化与 FOUC」文档与审计 P1-6 的既有结论，架构简化不改变它们）。

### 9.4 持久化与 FOUC 选型（SSG / SSR）

> 本节合并第一代的「主题持久化与 FOUC 策略」文档（2026-09-10 基线）。原理结论不变，实现细节已按新引擎更新。

**结论**：SSR 与 SSG 的差异只有一条主线——**服务端能否知道"当前用户"的主题**。

- **SSR**：每个请求能读 cookie / session，服务端直接渲染正确主题 → 天然零闪烁。
- **SSG**：HTML 构建时生成、所有用户共享，服务端只能渲染默认主题 → 首帧必须由客户端脚本补正。

因此 FOUC 只有两条根治路径：服务端渲染正确 CSS，或客户端首帧脚本在首次绘制前写入正确 CSS。Vean 选后者（应用侧零服务端改动）。

**现状实现（SSG）**：Layer 1 调色板 + 默认 Layer 2 别名块随预设静态产出（默认主题零 JS 即正确）；非默认主题由 `SConfigProvider` 把 options + 别名块快照写入 `__VEAN_THEME` 信封（防抖单写者），`<head>` 首个内联脚本（`createThemeInitScript()`）在首帧读信封、自建/改写 `<style id="vean-theme">`、切暗色 class 并设 `color-scheme`；hydration 后 provider 接管同一元素。细节见 §9.3。

**已知边界**（新一代实现下仍然成立）：

- 清缓存/换设备后的**第一次**访问还没有快照 → 仍可能闪一次（首帧用默认主题，mount 后补写）。
- 首帧依赖 localStorage；隐私模式 / 存储被禁时退化为默认主题（不会报错）。
- 严格 CSP 下脚本与样式都需要 `nonce`（`SConfigProvider` 透传，脚本标签由应用侧加）。

**若切 SSR**：应用侧把主题写进 cookie → 作为 `themeConfig`（完整信封）传入 `SConfigProvider` → 服务端渲染正确 CSS，首帧脚本退化为可选。代价是引入 Node 运行时、自维护 cookie ↔ localStorage 一致性（注意 `themeConfig` 在客户端也优先于 localStorage，两端必须同源，否则 hydration 不一致）。

**主流框架的 5 类 FOUC 方案（选型参考，勿重复调研）**：

| 方案                             | 代表                                    | 适用前提 / 我们的适配度                                               |
| :------------------------------- | :-------------------------------------- | :-------------------------------------------------------------------- |
| 1. 预生成多套 CSS + 首帧改 class | next-themes / Mantine / MUI / VitePress | 主题是**有限集合**；Vean 的 base/primary/size 会派生整份 CSS → 不适用 |
| 2. SSR 按 cookie 渲染            | @nuxtjs/color-mode / Nuxt `useCookie`   | 服务端可见偏好；作为 SSR 演进路径保留                                 |
| 3. 服务端提取并内联动态 CSS      | emotion / styled-components / antd      | 本引擎的 SSG 简化版 = 快照 + 首帧写入（当前方案）                     |
| 4. 首帧隐藏内容直到就绪          | 少量站点                                | 把颜色闪烁换成空白闪烁，体验更差 → 不采纳                             |
| 5. 弱化闪烁（默认跟随系统偏好）  | 多数库的兜底                            | 不根治，仅作为默认值策略参考                                          |

参考：[next-themes](https://github.com/coffee-cup/next-themes) · [Nuxt hydration / useCookie 最佳实践](https://nuxt.com/docs/4.x/guide/best-practices/hydration) · [Mantine ColorSchemeScript](https://github.com/mantinedev/mantine/blob/master/apps/mantine.dev/src/pages/theming/color-schemes.mdx) · [MUI CSS theme variables](https://mui.com/system/experimental-api/css-theme-variables/)

---

## 10. 体积与运行时预算（实测）

| 项                            | 今天                            | 新架构（实测）                                                                                             |
| :---------------------------- | :------------------------------ | :--------------------------------------------------------------------------------------------------------- |
| Layer 1（静态，构建期）       | 无（ramp 混在运行时 CSS 里）    | 288 条声明 / 9,239 B / **gzip 2,779 B**（hsl 通道；oklch 更小）                                            |
| Layer 2（动态，每次主题变更） | 7,243 B / gzip 2,271 B / 207 条 | 222 条声明 / 9,008 B / **gzip 1,735 B**（51 色 token + 角色 ramp 55 + 1 alpha + 非颜色族 55 + 暗色差异块） |
| 主题切换的重算量              | 全量 CSS 重算 + 7.2 KB 重写     | 155 行模板插值（引用替换）+ 6.4 KB 重写（**无颜色数学**）                                                  |
| 可主题化维度                  | 1（颜色）                       | 5（颜色 / 尺寸 / 层级 / 动效 / 层次）                                                                      |
| 颜色继承                      | 仅 6 条 ramp（语义随模式漂移）  | 26 × 11 级通道变量，语义层只做级别引用，稳定不漂移                                                         |

> 结论：把 ramp 从"运行时全量输出"搬到"构建期静态产物"（审计 §3.4.2 P1-8）后，**动态层 gzip 从 2,271 B 降到 1,735 B（−24%；新增角色 ramp 55 条引用后仍显著低于旧实现）**，且它现在覆盖 51 个语义 token + 55 个非颜色 token（旧实现只有 40 个颜色 token）。静态层（288 条）一次性、可缓存，gzip 2,779 B 且不随主题变化。
>
> 早期估算的"≈110 条 / ≈3.3 KB"只算了颜色 token 而漏掉非颜色族；上表为实测值（M1 实现后测定）。

---

## 11. 验收标准（测试清单）

1. **对比度契约**：26 色板 × 2 模式 × 全部配对（§7.1，含区域配对）在 `contrast: 'aa'` 下无一低于阈值；`'aaa'` 下文本类 ≥ 7 或显式列出例外。
2. **护栏确定性**：同样输入产出同样的修正报告；步数不超过上限；`ContrastReport` 做快照测试。
3. **阶梯不变量**：任意档位组合下 `lum(background) < lum(surface) ≤ lum(elevated)`；`lightLevel = 2` 时 `canvas ≠ card`（今天必失败）。
4. **别名完整性**：`SEMANTIC_TOKENS` 的**每一个** token 在生成的 CSS 中都存在一条声明（防"某开关删变量"复发，如 P0-3）。
5. **调色板层完整性**：26 × 11 + `white`/`black` 的完整色与通道都存在；`--{palette}-{level}` 可用 `colord` 解析为合法颜色。
6. **JS 与 CSS 同源**：`resolveTokenColor(options, token, mode)` 的结果必须等于生成的 CSS 中该 token（包裹后）解析出的颜色——两条路径共用 `resolveThemeMap`，此测试防止将来分叉。
7. **UnoCSS 映射**：`bg-primary/50`、`text-content-muted/70`、`border-border/20`、`bg-indigo-500/30` 均产出带 alpha 的合法声明（守住 §8.2 的坑）。
8. **体积预算**：Layer 2 ≤ 6 KB 原始；Layer 1 gzip ≤ 4.5 KB（默认 hsl，含通道）。
9. **格式等价**：`hsl` 与 `oklch` 下 token 数量、映射表、护栏报告完全一致（只有值写法不同）。
10. **档位联动**：每档 `canvas` 级别符合 §6.1；`surface` 不参与亮色位移。
11. **前缀一致性**：语义 token 全部以 `--vean-` 开头，调色板 token 全部不加前缀；两者都不与既有键混用（防"一半加了前缀"）。
12. **z-index 纪律**：库内样式除 `--z-layout` / `--z-base` / `--z-toast` / `--z-max` 外**不得出现字面量 z-index**（可用静态扫描断言）。
13. **sidebar 完整性**：6 个区域 token（`--vean-sidebar-{surface,foreground,border,accent,accent-foreground,primary}`）在两种 `surfaceStyle`、两种模式、任意 scheme 下都存在，且区域配对通过对比度校验。
14. **通道约定**：库内与 docs 的样式/示例中不得出现以裸 `var(--vean-*)` 作颜色值（正则可判）；`solidVars: 'none'`（默认）时不得产出完整色变量。
15. **无遗留命名**：全仓不得出现旧类名（`bg-card` / `bg-popover` / `bg-sidebar`）与未加前缀的语义变量（`--background` / `--primary` / `--sidebar` 等裸名）、`--soybean-*`（可用静态扫描断言）。

---

## 12. 决议记录

本轮的六个决定（含理由，便于日后回溯）：

| #   | 议题         | 决定                                                                                                                                                                 | 理由摘要                                                                                                                                                              |
| :-- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | 首帧策略     | **单一 `<style>` 就地改写 + 防抖的别名块快照**（§9.3）                                                                                                               | 去掉 `!important` 与"注入再移除"；内联脚本保持百字节级；产出物即引擎输出，无漂移风险                                                                                  |
| 2   | spacing 粒度 | **采用语义间距**（5 个 `--space-*`），不做数字全量 token 化（§4.9）                                                                                                  | 数字间距是布局层且随根字号缩放；密度由 `--control-height*` 表达，收益/成本比更高                                                                                      |
| 3   | 浮层层级     | **不用具名阶梯**，改为 `--z-layout` / `--z-base` / `--z-toast` / `--z-max` 四个 token（§4.11）                                                                       | 现状是"全部 teleport 到 body + 共用 `z-50` + 打开顺序决定层级"，阶梯会破坏"后开在上"的语义                                                                            |
| 4   | 行高 token   | **产出 `--leading-*`（9 组，与 `--text-*` 配对）**（§4.9）                                                                                                           | 行高属于排版决策，应可主题化；UnoCSS `fontSize` 元组直接引用两个 token                                                                                                |
| 5   | token 命名   | **沿用 shadcn 词汇 + `--vean-` 前缀**：`background` / `foreground`（含 `-muted` / `-subtle` / `-carbon`）/ `muted` / `accent`；区域 = 区域前缀 + 全局角色名（§4.10） | 词汇与生态一致、迁移面最小；`content-muted` 与 `subtle-foreground` 合并为 `muted-foreground`（实测同值可共用）                                                        |
| 6   | 颜色变量形态 | **只保留裸通道，完整色由 `resolveTokenColor` / `resolveThemeColors` 函数提供**（§3.1）                                                                               | 实测：库内 + docs 160 处消费全部包裹、裸用 0 处；双变量无真实消费者，且省 1.6 KB gzip（静态）+ ≈0.2 KB（动态）                                                        |
| 7   | primary 档位 | **名义档 `{p}.500`（shadcn 谱系 / 旧引擎同档），on-solid 配对走组件阈值 3:1（`OnSolidPair.min`）**（2026-09-19 用户决议）                                            | 600 是为白字 4.5:1 定的档；500 上白字 ≈4.4:1 低于 AA 正文但高于组件下限；亮色系（yellow 等）护栏自动改用深色文字。按钮正文严格 AA 的场景应换更深填充或调高 `contrast` |
| 8   | 角色 ramp    | **五个角色各携带 50–950 调色板面板（`--vean-{role}-{level}`，55 条引用，随别名块重发）**（§4.6.1）                                                                   | 恢复第一代语义 ramp 的能力但保持主题跟随：primary 跟主色板、状态色跟 feedback scheme；模式无关的字面档位，模式自适应仍走 `-subtle`/`-text` 角色                       |

| 9 | 反相表面命名 | **`inverse` 改回 `carbon`（文字 token 同名复原为 `carbon-foreground`；值与"表面不配前景"架构不变）**（2026-09-19 用户决议） | 生态先例（M3 surface-inverse / Naive）让位于历史连续性；120 处旧消费回到原名，认知成本最低 |
仍待实施时确认（不影响 token 契约）：

1. **`solidVars` 的默认值**：默认 `'none'`（只产通道）。若将来出现"CSS 侧必须拿到完整色"的消费者，可开启为 `'chart'`（只给图表 token）或 `'all'`（全量），代价是引入第二种色值形态（§3.1 逃生舱）。
2. **`--scrim` 的浓度是否要 token 化**：当前由组件用法决定（`bg-scrim/50`、`bg-scrim/30`）；若设计上希望 dialog / drawer 的遮罩浓度可被主题统一调配，再加 `--vean-scrim-alpha`（一个数值 token 即可）。
3. **是否把"映射表内联进首帧脚本"**（§9.3 的备选路径），取决于后续是否希望彻底取消快照。

---

## 13. 相关

- [主题系统审计报告](./info/theme-system-audit.md) — 重构前现状的 13 条问题与实测数据（**历史快照**，本文的事实依据）
- [nuxt-theme.md](./research/nuxt-theme.md) — Nuxt UI 主题系统与 Theme Studio 专题（选型调研）
- [architecture.md](./architecture.md) — 工作区架构与依赖方向
- `packages/theme/README.md` — 包级用法（本文的精简版）
- 决策固化：`docs/adr/NNNN-*` —— 主题 ADR 待补（收尾项，见跟踪器 T7.5）
