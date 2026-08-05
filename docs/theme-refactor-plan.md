# @soybeanjs/shadcn-theme 重构方案

> 版本：v2.0（评审稿）
> 范围：`packages/shadcn-theme` 及关联的 `packages/unocss-shadcn`、`packages/sbean`、`apps/playground`
> 目标读者：组件库维护者
> 变更记录：v2.0 引入**精简 token + 算法派生 + 双 level 明暗控制**核心模型（v1.0 评审决策汇总）

---

## 1. 背景与目标

### 1.1 现状概述

`@soybeanjs/shadcn-theme` 是 shadcn/ui 风格的主题生成器：内置 base / primary / feedback 三类色彩预设，支持 light/dark 双模式、hsl/oklch 双格式、class/media 暗色选择器，为 UI 层提供 CSS 变量注入。核心数据集中在 `packages/shadcn-theme/src/constants.ts`（1509 行）。

### 1.2 问题清单（已核实）

| 编号 | 问题                                                                                                                      | 证据                                                  |
| ---- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| P-01 | **配置数据过度集中**：单文件 1509 行，纯预设数据约 1220 行（81%），常量/映射/CSS 片段/数据混合                            | [constants.ts](src/constants.ts)                      |
| P-02 | **数据高度冗余且可推导但未利用**：9 个 base 预设结构完全一致仅前缀不同；primary 中性族只有两套 chart 模板、色相族为纯规则 | 对比 `builtinBasePreset` / `builtinPrimaryPreset`     |
| P-03 | **死代码残留**：`sidebarCssVars`、`darkSidebarCss`、`generateCustomPreset` 全局零引用                                     | grep 全仓库无消费方                                   |
| P-04 | **声明与实现不符**：`ThemeScope: 'all'` 类型已导出，`core.ts` 未实现                                                      | [types.ts](src/types.ts) L228、[core.ts](src/core.ts) |
| P-05 | **零测试**：预设数据 + 字符串拼接 CSS 生成无任何单测/快照                                                                 | `docs/optimize.md` 已记载                             |
| P-06 | **扩展性受限**：预设键为固定字面量联合类型，新增预设族/语义色组需改源码发版                                               | `BuiltinBasePresetKey` 等类型                         |
| P-07 | **合并能力单一**：自定义覆盖为单层扁平 `mergeObjects`，无继承/组合/运行时切换                                             | [preset.ts](src/preset.ts)                            |
| P-08 | **明暗亮度不可调**：light/dark 预设均为固定明度（light 表面恒 `white`、dark 背景恒 `{p}.950`），无法整体调暗/调亮         | 需求新增                                              |
| P-09 | **token 冗余**：39 个语义键中大量为可推导值（重复 Foreground、chart、border/input），需显式配置                           | [COLOR_VARIABLES](src/constants.ts)                   |

### 1.3 重构目标与非目标

**目标：**

1. **精简 token 模型**：base 仅显式定义 10 个核心键、primary 仅 2 个（`primary`/`ring`），其余按默认规则派生；CSS 变量契约（39 个）保留不变；
2. **双 level 明暗控制**：`lightLevel`（3 档）调暗亮色、`darkLevel`（4 档）调亮暗色，档位 0 输出与现状一致（chart 除外，见 §3.3）；
3. 数据与逻辑分离、可机器生成、可独立消费；
4. 补上测试与 CI 护栏，消除死代码。

**非目标（本期不做）：**

- 不改变 CSS 变量契约与 `createShadcnTheme` 调用形式（兼容优先，见 §3.3 行为变更清单）；
- 不新增运行时框架绑定；
- 不做完整设计令牌体系化，仅保留 shadcn 语义键模型。

---

## 2. 目标架构总览

### 2.1 分层模型

```
┌────────────────────────────────────────────────────────┐
│ 适配器层  unocss-shadcn / sbean / ui config-provider   │
├────────────────────────────────────────────────────────┤
│ 引擎层    @soybeanjs/shadcn-theme  (core/css/preset)    │
├────────────────────────────────────────────────────────┤
│ 数据层    @soybeanjs/theme-presets (JSON + 生成产物)     │
└────────────────────────────────────────────────────────┘
```

依赖方向：`适配器 → 引擎 → 数据`。引擎不再内嵌预设数据。

### 2.2 关键决策记录（ADR）

- **ADR-1**：数据模型保留 base/primary 维度（**移除 feedback 维度**，固定 classic 规则，ADR-6）；消费端新增扁平 `theme` 入口。
- **ADR-2**：预设数据以"**核心键 + 派生规则**"表达，JSON 为单一数据源，TS 产物由生成器产出。
- **ADR-3**：明暗调节采用**双 level 档位模型**：`lightLevel: 0|1|2`（亮色调暗）、`darkLevel: 0|1|2|3`（暗色调亮，v2.0 由 v1.0 的 0-3 档确认合并为统一模型）。
- **ADR-4**：重构全程以**快照测试**为护栏；chart 默认值因色相派生发生主动变更（§3.3），快照以新预期为准。
- **ADR-5**：**token 精简模型**：核心显式 + 算法派生 + 自定义覆盖兜底（覆盖优先级最高）。
- **ADR-6**：feedback 色（destructive/success/warning/info）**固定 classic 规则**（red/green/amber/blue），不再作为可选维度。

---

## 3. 核心模型：精简 token + 算法派生

> 本章是 v2.0 的核心。原则：**只显式定义少量核心 token，其余全部由确定性算法派生；派生结果可被自定义配置覆盖。**

### 3.1 核心显式 token

| 维度    | 核心键                                                                                                                       | 说明                     |
| ------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| base    | `background, foreground, card, cardForeground, popover, popoverForeground, muted, mutedForeground, accent, accentForeground` | 10 键，light/dark 各一份 |
| primary | `primary, ring`                                                                                                              | 2 键，light/dark 各一份  |

### 3.2 默认派生规则表（确定性算法）

以下规则对 base 预设全部 9 个中性色适用（`{p}` = 调色板名，如 slate）：

| 派生 token                                     | light                                                            | dark                                                             |
| ---------------------------------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `secondary`                                    | = `muted`                                                        | = `muted`                                                        |
| `secondaryForeground`                          | `{p}.900`                                                        | = `foreground`（50）                                             |
| `primaryForeground`                            | = base 浅极值（`{p}.50`）                                        | = base 深极值（`{p}.900`）                                       |
| `destructive` / `success` / `warning` / `info` | 固定 classic：`red.500` / `green.500` / `amber.500` / `blue.500` | 固定 classic：`red.400` / `green.400` / `amber.400` / `blue.400` |
| 上述 4 色 Foreground                           | = base 浅极值（`{p}.50`）                                        | = base 深极值（`{p}.900`）                                       |
| `carbon`                                       | `{p}.800`                                                        | `{p}.100`                                                        |
| `carbonForeground`                             | = base 浅极值（`{p}.50`）                                        | = base 深极值（`{p}.900`）                                       |
| `border` / `input`                             | `{p}.200`                                                        | 固定 `DARK_BORDER` / `DARK_INPUT`（不随 level 变化）             |
| `chart1-5`                                     | 固定中性族模板（§3.3）                                           | 同左（light/dark 各一套模板）                                    |
| `sidebar*`（8 键）                             | 沿用 `generateSidebarPreset`（base ⊕ primary 派生）              | 同左                                                             |

**派生规则要点：**

- **Foreground 一律取 base 极值**（light 浅 / dark 深），不依赖父色相——因为模板保证 light 的 primary/feedback 恒深、dark 恒浅，极值恒有足够对比度；
- 同一 `kind` 内键空间互斥的保证依然成立（核心键 ∪ 派生键 = 完整 `ThemeColorKey` 分区）；
- 所有派生规则确定性、可快照。

### 3.3 行为变更清单（相对现状，主动变更项）

| 变更                            | 影响                 | 说明                                                                                                                                                                                                                                                                                                        |
| ------------------------------- | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `chart1-5` 默认值               | **默认输出改变**     | 固定复用内置中性族模板：light `orange.600/teal.600/cyan.900/amber.400/amber.500`、dark `blue.700/emerald.500/amber.500/purple.500/rose.500`（§12.2 决策 D7，替代 v2.0 色相派生方案）。9 个中性 primary 输出不变；17 个色相族由同色相明度模板（`{p}.300/500/600/700/800`）变为多色相协调。可被 `preset` 覆盖 |
| `PresetKeyConfig.feedback` 移除 | **类型破坏（v1.0）** | 迁移期保留字段并标记 deprecated，v1.0 删除                                                                                                                                                                                                                                                                  |
| 新增 `lightLevel` / `darkLevel` | 非破坏               | 默认 0，输出不变                                                                                                                                                                                                                                                                                            |
| CSS 变量契约                    | 无变化               | 39 个变量照常输出（派生补全），UI 层零改动                                                                                                                                                                                                                                                                  |
| 其余 token 默认值               | 无变化               | 派生规则复刻现有模板，快照校验                                                                                                                                                                                                                                                                              |

### 3.4 兼容性与覆盖

- 自定义配置覆盖优先级最高：`preset: CustomThemeColorPreset` 保留，可覆盖任意键（含 chart/border 等派生键）；
- CSS 变量契约（[COLOR_VARIABLES 39 键](src/constants.ts)）与 unocss-shadcn 映射均不修改；
- `BaseColorKey` / `PrimaryColorKey` 联合类型保留，`FeedbackPresetKey` 进入废弃期。

---

## 4. 双 level 明暗控制

> v2.0 由 v1.0 的 `darkLevelOffset`（仅暗色调亮）扩展为 **light/dark 双向调节**。机制统一为"档位偏移"。

### 4.1 API

```ts
/** 亮色整体调暗档位：0 不变；1 表面 white→{p}.50；2 →{p}.100 */
export type LightLevelOffset = 0 | 1 | 2;
/** 暗色整体调亮档位：0 不变；1 背景 950→900；2 →800；3 →700 */
export type DarkLevelOffset = 0 | 1 | 2 | 3;

// ThemeOptions 新增可选字段，默认 0
lightLevel?: LightLevelOffset;
darkLevel?: DarkLevelOffset;
```

### 4.2 档位表与偏移规则

**只对"表面类"token 偏移；前景类固定极值、强调色（primary/ring/chart）与 border/input 不偏移**（见 §3.2 与下方注释）。

| 档位表（浅→深方向移动 = 变暗）          | 基准 token                          |
| --------------------------------------- | ----------------------------------- |
| `LIGHT_SURFACE = [white, 50, 100, 200]` | background / card / popover         |
| `LIGHT_WEAK = [100, 200, 300, 400]`     | muted / accent / secondary / carbon |
| `LIGHT_MUTED_FG = [500, 600, 700, 800]` | mutedForeground                     |

| 档位表（深→浅方向移动 = 变亮）         | 基准 token                          |
| -------------------------------------- | ----------------------------------- |
| `DARK_SURFACE = [950, 900, 800, 700]`  | background                          |
| `DARK_CARD = [900, 800, 700, 600]`     | card / popover                      |
| `DARK_WEAK = [800, 700, 600, 500]`     | muted / accent / secondary / carbon |
| `DARK_MUTED_FG = [400, 300, 200, 100]` | mutedForeground                     |

**偏移规则：** 每个 token 在档位表中取基准索引，level 参数整体前移，clamp 到表末。示例（slate，`darkLevel=2`）：

```
background  950 → 800
card/popover 900 → 700
muted/accent 800 → 600
mutedForeground 400 → 200
foreground 系  50  固定（保持最浅，对比度优先）
border/input   DARK_BORDER / DARK_INPUT 固定（ADR-5 决策：不随 level 变化）
```

**明确不随 level 偏移：** `foreground`/`cardForeground`/`popoverForeground`/`accentForeground`/`secondaryForeground`/`primaryForeground`/feedback 色及其 Foreground（前景类固定极值）；`primary`/`ring`（主色稳定）；`chart1-5`（色相派生，与明暗正交）；`border`/`input`（固定规则）。

### 4.3 应用位置与边界

- 应用位置：`getBuiltinThemePreset` 内，对 base/primary 的 light/dark **先偏移再派生 sidebar**（sidebar 自动联动）；`core.ts` 从 options 解构透传；
- 自定义覆盖不偏移：`customPreset` 显式值优先，保持精确；
- 与 P1 JSON 结合：`kind: theme` 预设可携带 `lightLevel`/`darkLevel` 属性，引擎层选项为全局覆盖（优先）。

### 4.4 验收标准

- [ ] `lightLevel: 0` / `darkLevel: 0` 输出与现状一致（chart 除外，见 §3.3）；
- [ ] 各档位下表面类联动、前景类固定、相对对比度保持；
- [ ] 快照覆盖两维度全档位（3×4=12 组合）。

---

## 5. 阶段 P0：就地重构（先行交付）

### 5.1 constants.ts 拆分

```
src/
├── variables.ts     COLOR_VARIABLES / EXTENDED_THEME_VARIABLES / MENU_VARIABLES / SIZE、RADIUS_VARIABLE / DARK_SELECTOR
├── tokens.ts        THEME_SIZE / THEME_RADIUS / 档位表 LIGHT_SURFACE、DARK_SURFACE 等
├── recipes.ts       menuColorCss / menuAccentCss
├── defaults.ts      DEFAULT_PRESET_OPTIONS（含 lightLevel: 0、darkLevel: 0）
├── core-template.ts 核心 10+2 键模板（每调色板仅存核心值）
├── derive.ts        §3.2 派生规则实现（纯函数）
├── core.ts / css.ts / preset.ts / shared.ts / types.ts
└── index.ts
```

- 删除死代码：`sidebarCssVars`、`darkSidebarCss`、`generateCustomPreset`（后者 P1 扁平化阶段复活）；
- 现有 `builtinBasePreset` / `builtinPrimaryPreset` 字面量由**核心模板 + 派生规则**的运行时推导替代（先保留双实现跑快照对比，见 §5.3）。

### 5.2 派生引擎

`derive.ts` 提供纯函数：

```ts
// 核心 10 键模板（per 调色板 per 模式）+ 派生规则 → 完整 ThemeColorPreset
export function deriveBasePreset(palette: TailwindNeutralPaletteKey, lightLevel: LightLevelOffset): BasePreset;
export function derivePrimaryPreset(palette: TailwindPaletteKey): PrimaryPreset;      // 含 chart 色相派生
export function deriveFeedbackColors(): { destructive: …; success: …; warning: …; info: … };  // 固定 classic
```

- 档位偏移、chart 色相映射、极值 Foreground 均收敛为此处纯函数；
- `shiftLightLevel(color, lightLevel)` / `shiftDarkLevel(color, darkLevel)` 为单一转换函数（§4 档位表）。

### 5.3 快照测试护栏（P-05）

`packages/shadcn-theme/test/` 新增：

- 全组合 CSS 快照（base×primary×feedback 现状基线 + 新模型全档位 3×4）；
- 派生规则单测（`derive.test.ts`）；
- **迁移验证**：先对现状输出建基线快照，再启用新模型——除 §3.3 变更清单外 diff 必须为空。

### 5.4 P0 验收标准

- [ ] constants.ts 数据部分迁出，文件 < 200 行；
- [ ] 派生引擎 + 档位模型落地，快照通过（变更项仅 §3.3）；
- [ ] 死代码清零；
- [ ] `pnpm typecheck` 通过。

---

## 6. 阶段 P1：独立主题包 + JSON 配置

### 6.1 包结构

新增 `packages/theme-presets`（发布名 `@soybeanjs/theme-presets`）：

```
packages/theme-presets/
├── schema/theme-preset.schema.json      # JSON Schema v7
├── presets/
│   ├── base.slate.json …                # 核心 10 键（light/dark）
│   ├── primary.indigo.json …            # 核心 2 键
│   └── themes/soybean.json              # 复合主题
├── generated/index.ts                   # 生成器产物（勿手改，CI 校验 drift）
├── src/{index,loader,validate,types}.ts
└── scripts/generate.ts
```

### 6.2 JSON 格式规范（精简后）

```jsonc
{
  "$schema": "https://soybeanjs.dev/schemas/theme-preset.schema.json",
  "name": "base.zinc",
  "version": "1.0.0",
  "kind": "base", // base | primary | theme
  "light": {
    "background": "white",
    "foreground": "zinc.950",
    "card": "white",
    "cardForeground": "zinc.950",
    "popover": "white",
    "popoverForeground": "zinc.950",
    "muted": "zinc.100",
    "mutedForeground": "zinc.500",
    "accent": "zinc.100",
    "accentForeground": "zinc.900"
  },
  "dark": {
    "background": "zinc.950",
    "foreground": "zinc.50",
    "card": "zinc.900",
    "cardForeground": "zinc.50",
    "popover": "zinc.900",
    "popoverForeground": "zinc.50",
    "muted": "zinc.800",
    "mutedForeground": "zinc.400",
    "accent": "zinc.800",
    "accentForeground": "zinc.50"
  }
}
```

- **schema 只约束核心键**；派生键由引擎补全，无需在 JSON 声明（如需覆盖，走 `overrides`/`preset`）；
- `kind: theme` 复合主题：`compose: { base, primary }` + 可选 `overrides` + `lightLevel`/`darkLevel`（§4.3）。

### 6.3 加载与合并、类型安全、兼容性

沿用 v1.0 设计（§4.3-4.5），要点不变：

- 优先级链：内置基线 → 内置覆盖 → 用户 JSON → 运行时参数；语义键级合并；
- 双层类型安全：schema 运行时校验（valibot）+ 生成产物编译期类型（`satisfies`）；
- 公共 API 零破坏（CSS 契约不变），`v0.29.x` 双源迁移、`v1.0` 移除内嵌数据。

---

## 7. 消费端扁平化

- **数据保留 base/primary 维度，消费端扁平**：`createShadcnTheme({ theme: 'soybean' })`，内部解析 `compose: { base: 'zinc', primary: 'indigo' }`；`base`/`primary` 降级为高级覆盖旋钮；
- `kind: theme` 复合预设：参数化（compose）或艺术化（全量扁平键，校验器要求解析后覆盖全部 `ThemeColorKey`）；
- 复用既有资产：复活 `generateCustomPreset` 作为"扁平 ThemeColors → 维度存储"往返转换器；
- 组合空间：9×26 = 234 种主题（较现状 3510 大幅收敛）。

---

## 8. 阶段 P2：运行时多主题（ThemeScope 'all'）

- 实现 `scope: 'all'`：按维度（base × primary）枚举变体，生成 `[data-theme='<base>-<primary>']` 选择器 CSS，运行时热换；
- 体积控制：仅生成用户声明的变体集合（`themes: [...]`），不生成全笛卡尔积；
- 与 `lightLevel`/`darkLevel` 正交：每个变体可携带各自档位值。

---

## 9. 开发与构建流程优化

- **生成器闭环**：改 JSON → `pnpm generate:theme` → 产出 `generated/`；CI drift 检查（`git diff --exit-code generated/`）；
- **schema 校验**：开发期 valibot + CI 全量校验；`vp staged` 钩子追加；
- **测试策略**：`shadcn-theme` 快照（全组合基线 + 新模型 3×4 档位）、派生规则单测、`theme-presets` schema/合并/生成器等价性、`unocss-shadcn` 组合测试；
- **按需加载**：`@soybeanjs/theme-presets/presets/*` 子路径导出，用户仅打包用到的预设。

---

## 10. 实施计划

### 10.1 阶段顺序与依赖

```
P0 就地重构（精简 token + 派生引擎 + 双 level，独立可上线）
 └─→ P1 独立数据包 + JSON（依赖 P0 派生引擎）
      └─→ 消费端扁平化 theme API（P1 二期）
           └─→ P2 运行时多主题（依赖 P1 加载器）
```

### 10.2 任务分解

**P0：**

1. 拆 constants.ts（variables/tokens/recipes/defaults/core-template/derive）；
2. 实现派生引擎 `derive.ts`（核心模板 + §3.2 规则 + §4 档位偏移）；
3. 实现双 level（types → derive → preset → core → index 导出）；
4. 建立基线快照 + 新模型快照，验证变更项仅 §3.3；
5. 删除死代码。

**P1：** 6. 脚手架 `packages/theme-presets`（schema + 核心键 JSON + loader/validate/types）；7. `scripts/generate.ts` 生成产物；8. 引擎改从数据包取数，跑全量快照；9. CI 接入 schema 校验与 drift 检查；消费方（sbean/playground）数据源切换。

**P1 二期：** 10. `kind: theme` 复合预设 + `theme` 扁平 API；11. 复活 `generateCustomPreset`。

**P2：** 12. `scope: 'all'` 变体生成与运行时切换。

### 10.3 风险与回滚

| 风险                       | 缓解                                                          |
| -------------------------- | ------------------------------------------------------------- |
| 派生规则与旧数据不一致     | 基线快照先行，diff 仅允许 §3.3 变更清单项                     |
| chart 色相派生改变默认输出 | 明确列为主动变更（§3.3），快照以新预期为准，`preset` 可覆盖   |
| feedback 维度移除破坏调用  | 迁移期保留字段 deprecated，v1.0 删除；文档迁移指引            |
| level 偏移导致对比度不足   | 前景类固定极值、表面类受控偏移（§4.2），快照 + 抽样对比度校验 |
| 回滚                       | P0/P1 各阶段独立提交、独立发版，可单独 revert                 |

---

## 11. 附录

### 11.1 关键证据文件

| 文件                                     | 说明                                              |
| ---------------------------------------- | ------------------------------------------------- |
| `packages/shadcn-theme/src/constants.ts` | 1509 行集中预设（P-01/P-02/P-09）                 |
| `packages/shadcn-theme/src/preset.ts`    | 组装 + sidebar 派生 + 死代码 generateCustomPreset |
| `packages/shadcn-theme/src/types.ts`     | 键分区类型与 ThemeScope（P-04）                   |
| `packages/shadcn-theme/src/core.ts`      | 入口，未实现 scope                                |
| `docs/optimize.md`                       | 零测试等既有评估结论                              |

### 11.2 术语表

- **核心 token**：需显式定义的语义键（base 10 键 + primary 2 键）；
- **派生 token**：由确定性算法生成的语义键（secondary、Foreground 极值、feedback 固定色、border/input、chart、sidebar）；
- **档位（level offset）**：明暗调节单位，lightLevel 向深偏移（调暗）、darkLevel 向浅偏移（调亮）；
- **复合主题（kind=theme）**：引用维度或直接给出全量键的完整主题定义；
- **基线对照**：将新引擎 level=0 输出与现状 shadcn-theme 输出逐键对比的测试手段，diff 白名单仅允许 §3.3 变更项。

---

## 12. 实施决策记录（P0 评审定案）

> 本节记录 grill-with-docs 评审会话中对方案 v2.0 的定案与修订。引擎落点、API 形态与两处规则修订（chart、carbon）均以此为准。

### 12.1 包结构与落点（D1–D3）

- **D1 引擎新包**：新建 `packages/theme`（发布名 `@soybeanjs/theme`）承载引擎层（P0 全部内容：core/css/preset + 精简 token + 派生引擎 + 双 level）。`@soybeanjs/shadcn-theme` 保持不动，作为生产引擎与基线参照，未来承担兼容层（v1.0 移除）；数据包 `@soybeanjs/theme-presets` 仍按 §6 规划（P1，本会话不做）。依赖方向：适配器 → 引擎（`@soybeanjs/theme`）→ 数据。
- **D2 会话范围**：仅 P0（引擎包 + 测试护栏 + 根接线），P1/P2 留待后续阶段。
- **D3 主入口**：`createTheme(options): string` 直接返回生成的 CSS（无 `getCss` 闭包；P0 的 base/primary/lightLevel/darkLevel 均在创建时定死，无需 per-call 覆盖）。消费方（unocss-shadcn / sbean / playground）本阶段不切换。

### 12.2 规则修订（D7–D9，替代 v2.0 原文）

- **D7 chart 固定模板**：chart1-5 不做色相派生，全部 26 个 primary 固定复用中性族两套模板（light `orange.600/teal.600/cyan.900/amber.400/amber.500`；dark `blue.700/emerald.500/amber.500/purple.500/rose.500`）。影响：9 个中性 primary 输出不变；17 个色相族 chart 输出改变（§3.3 已同步）。删除 §5.2 `derivePrimaryPreset` 的"含 chart 色相派生"职责。
- **D8 carbon 不偏移**：carbon（light `{p}.800` / dark `{p}.100`）视同前景强调色，不随档位偏移。通用规则：**档位表不包含某 token 基准值的，该 token 一律不偏移**（确定性规则，解决 §4.2 表格矛盾）。§4.2 的 LIGHT_WEAK / DARK_WEAK 成员描述相应修正为"muted / accent / secondary"。
- **D9 feedback 移除**：`@soybeanjs/theme` 的 `ThemeOptions` 不包含 `feedback` 字段（ADR-1 固定 classic），导出面剔除全部 feedback 相关符号；兼容负担由 shadcn-theme 兼容层承担（§3.3 迁移期策略不变）。
- **D11 色相族 dark primary 例外**：基线 `builtinPrimaryPreset` 中 3 个浅绿族（`lime`/`green`/`emerald`）dark primary 为 `{p}.600`，其余 14 个色相族为 `{p}.500`。派生引擎复刻该模板（`createChromaticPrimaryCore` 维护 `DARK_PRIMARY_600` 集合），基线对照测试全 9×26 组合逐键校验。

### 12.3 导出面与档位 API（D4–D6）

- **D4 导出面（精简）**：`createTheme`、`DEFAULT_PRESET_OPTIONS`、`THEME_SIZE/themeSizeKeys`、`THEME_RADIUS/themeRadiusKeys`、`builtinBasePresetKeys`、`builtinPrimaryPresetKeys`、全部类型（剔除 feedback 相关，新增 `LightLevelOffset`/`DarkLevelOffset`）。不导出 builtin 字面量数据；derive 纯函数内部使用。
- **D5 档位类型**：`LightLevelOffset = 0 | 1 | 2`、`DarkLevelOffset = 0 | 1 | 2 | 3`，`ThemeOptions` 新增 `lightLevel?` / `darkLevel?`（默认 0）。
- **D6 测试护栏**：vitest（`vp test`）三层：① 基线对照——devDep 引入 shadcn-theme，base×primary 全组合对比 level=0 的 CSS 输出，白名单仅 §3.3 变更（17 个色相族 chart）；② 3×4 档位快照；③ derive 纯函数单测。

### 12.4 文件结构与接线（D10）

- `src/{index,types,core,css,preset,shared,derive,core-template,variables,tokens,recipes,defaults}.ts` + `test/{derive,levels,baseline}.spec.ts`；
- 依赖：runtime `@soybeanjs/colord`；dev `vite-plus`、`typescript`、`vitest`、`@soybeanjs/shadcn-theme`（仅基线对照）；
- 根 `build:libs` 追加 `@soybeanjs/theme` build；typecheck/test 由 `pnpm -r` 自动覆盖。
