# @soybeanjs/theme 配置模型与预设扩展重构设计

> 版本：v1.0（评审稿）
> 范围：`packages/theme`（发布名 `@soybeanjs/theme`）及关联的 `packages/ui`（`SConfigProvider`）、`apps/playground`（主题生成器）、未来的主题商店
> 目标读者：组件库维护者
> 前置：当前 `packages/theme` 已实现 **最小核心 token → 确定性派生 → 确定性 CSS 生成 → 运行时注入 / SSR 同步** 管线（`createTheme` / `resolveTheme` / `ThemeStore`）

---

## 1. 背景与目标

### 1.1 现状概述

`@soybeanjs/theme` 是轻量主题引擎：输入 `ThemeOptions`，输出可注入的 CSS 字符串。当前配置模型已同时具备两种机制的雏形：

- **方案一（扩展 preset 字段）**：`ColorTokens` 已按场景扩展出 `success/warning/info/carbon`（feedback）、`chart1–chart5`（chart）、`sidebar*`（sidebar），并配套确定性派生（`deriveFeedbackColors` / `CHART_TEMPLATE` / `deriveSidebarPreset`）。
- **方案二（全量 CSS 变量自定义）**：`ThemeOptions.css` + `generateRawCss`，完全绕过派生管线原样输出。

### 1.2 核心问题（本次要解决）

| 编号 | 问题                                                                                                                                                        | 证据                                                                                               |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| P-01 | **字段与逻辑维度不一致**：`base`/`primary` 是"选一整条 Tailwind ramp"（palette 维度），而 `feedback`/`chart` 是"写死的语义色模板"（无维度），扩展心智不统一 | [derive.ts](packages/theme/src/derive.ts) `deriveFeedbackColors` / `CHART_TEMPLATE`                |
| P-02 | **fEEDBACK/chart/sidebar 无法便捷扩展**：新增方案必须改源码（`core-template.ts` / `derive.ts`），非数据驱动                                                 | 同上                                                                                               |
| P-03 | **`css` 是绕过一切的"黑洞"**：产物无法进入 `ThemeConfigState`、无法持久化、无法 SSR、无法进主题商店                                                         | [core.ts](packages/theme/src/core.ts) L27-29                                                       |
| P-04 | **`preset` 名语义过载**：同时承载"内联覆盖""`{ name }` 引用""整包预设"，与 `ThemePreset`/`StoredThemePreset`/主题商店概念撞车                               | [types.ts](packages/theme/src/types.ts) `ThemePreset`                                              |
| P-05 | **palette 值表 / core 模板 / 类型 / 存储校验四处写死**：`BaseColorKey`/`PrimaryColorKey` 是封闭 union，新增 palette 必须改源码发版                          | [types.ts](packages/theme/src/types.ts) L527、[storage.ts](packages/theme/src/storage.ts) L163-167 |
| P-06 | **新增视觉层无通用入口**：无"分类"模型，未来加 `layout`/新 scheme 无统一扩展点                                                                              | —                                                                                                  |

### 1.3 目标

1. **统一扩展心智**：把配置维度收敛为 `palette`（选 ramp）+ `scheme`（选命名方案）+ `overrides`（覆盖单 token）三类；
2. **数据驱动扩展**：palette 与 scheme 都抽象为**带元数据的数据对象**，通过**运行时注册表**注入，主题商店只"组装数据 + register"，不改派生源码；
3. **收敛配置入口**：移除 `css` / `preset` / `complete`，新增 `feedback` / `chart` / `sidebar` scheme 选择与 `overrides`，暴露 `resolveTheme`；
4. **向后兼容**：默认注册表 = 现有全部内置，`resolveTheme` 输出与现状逐字节一致，零破坏。

### 1.4 非目标（本期不做）

- 不改变既有 CSS 变量契约（`COLOR_VARIABLES` 39+ 键）；
- 不实现主题商店本身，仅定义其接入的扩展 API 与数据形态；
- 不迁移 `packages/theme` 到新包名（沿用 `@soybeanjs/theme`）。

---

## 2. 目标架构总览

### 2.1 分层模型

```
┌──────────────────────────────────────────────────────────────┐
│ 消费层   SConfigProvider / useTheme / 主题商店 / 配置 UI      │
├──────────────────────────────────────────────────────────────┤
│ 扩展层   registerThemePresets(…)  ← 主题商店面板调用          │
├──────────────────────────────────────────────────────────────┤
│ 引擎层   resolveTheme / createTheme / 派生 / CSS 生成          │
├──────────────────────────────────────────────────────────────┤
│ 数据层   内置注册表(默认)  ⊕  用户注入注册表(运行时合并)        │
└──────────────────────────────────────────────────────────────┘
```

### 2.2 配置维度总览

| 维度        | 心智            | 承载字段                 | 解析策略                           |
| ----------- | --------------- | ------------------------ | ---------------------------------- |
| `base`      | 选 neutral ramp | `ThemeOptions.base`      | palette（已有）                    |
| `primary`   | 选品牌 ramp     | `ThemeOptions.primary`   | palette（已有）                    |
| `feedback`  | 选状态方案      | `ThemeOptions.feedback`  | scheme（新增）                     |
| `chart`     | 选图表方案      | `ThemeOptions.chart`     | scheme（新增）                     |
| `sidebar`   | 选皮肤方案      | `ThemeOptions.sidebar`   | scheme（新增，值可引用 token）     |
| `overrides` | 覆盖单 token    | `ThemeOptions.overrides` | 逐键覆盖（替代原 preset 内联部分） |

---

## 3. 配置模型收敛

### 3.1 移除的三项及理由

| 移除项     | 理由                                                       | 替代                                                                                                 |
| ---------- | ---------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `css`      | 绕过派生的黑洞，无法持久化/SSR/进商店；与受管体系冲突      | 若需"全量变量"导入，未来走独立 `serializeTheme` / `parseThemeVariables` API（放 `/ssr`，不进主入口） |
| `preset`   | 语义过载，与 scheme/命名预设撞车                           | 内联部分改名 `overrides`；`{ name }` 引用由 store 层解析，`ThemeOptions` 不再看到名字                |
| `complete` | 仅服务于"完整 preset 跳过派生"，移除 `preset` 后无触发条件 | 删除                                                                                                 |

### 3.2 新增的 scheme 选择

```ts
/** feedback / chart / sidebar 三类 scheme 的命名 key（开放 string，运行时由注册表校验） */
export type FeedbackSchemeKey = 'classic' | (string & {});
export type ChartSchemeKey = 'vivid' | (string & {});
export type SidebarSchemeKey = 'derived' | (string & {});
```

### 3.3 最终 `ThemeOptions`

```ts
export interface ThemeOptions extends BaseGenerateCSSOptions {
  /** base 色板 key（palette 维度，选 neutral ramp） */
  base?: BaseColorKey;
  /** primary 色板 key（palette 维度，选品牌 ramp） */
  primary?: PrimaryColorKey;
  /** feedback 语义方案 key（scheme 维度，默认 'classic'） */
  feedback?: FeedbackSchemeKey;
  /** chart 语义方案 key（scheme 维度，默认 'vivid'） */
  chart?: ChartSchemeKey;
  /** sidebar 皮肤方案 key（scheme 维度，默认 'derived'） */
  sidebar?: SidebarSchemeKey;
  /** 内联覆盖单个 token（原 preset 的内联部分） */
  overrides?: ThemeOverrides;
  /** light 模式表面亮度偏移（0–2） */
  lightLevel?: LightLevelOffset;
  /** dark 模式背景亮度偏移（0–3） */
  darkLevel?: DarkLevelOffset;
}
```

### 3.4 覆盖类型与解析结果

```ts
/** overrides：仅 light/dark 部分 token，不含 name */
export interface ThemeOverrides {
  light?: Partial<ColorTokens>;
  dark?: Partial<ColorTokens>;
}

/** 解析结果：自动得名 + 完整 token */
export interface FullThemePreset extends Required<BaseTokens> {
  name: string; // `${base}-${primary}` 或 store 打标名，仅作引用标识
  light: ColorTokens;
  dark: Partial<ColorTokens>;
}
```

### 3.5 引擎 API 拆分

```ts
/** 解析出完整主题 preset（含自动名），不生成 CSS；供 store 复用 */
export function resolveTheme(options: ThemeOptions): FullThemePreset;

/** 生成 CSS（内部调用 resolveTheme，与现状 createTheme 行为一致） */
export function createTheme(options: ThemeOptions): string;
```

> `name` 是**标识符**，不是重建钥匙。重建信息由 `ThemeConfigState`（构建输入）+ `StoredThemePreset`（命名覆盖）在 store 层保有。

---

## 4. 预设分类模型（统一扩展心智）

### 4.1 分类原则

**只有"不由 palette 驱动的 token 组"才值得分类。** `base`/`primary` 本身就是分类（palette ramp，surface/brand 语义），**不重复造层**。需要"进一步分类"的只有现状写死、且与 base/primary 不重叠的两组——`feedback`（status）、`chart`（data）——以及可选升级的 `sidebar`（skin）。

| Token 组                                                           | 现状归属                      | 是否再分类 | 分类维度          |
| ------------------------------------------------------------------ | ----------------------------- | ---------- | ----------------- |
| surface 语义（background/card/popover/muted/accent/border/input…） | 已由 `base`（palette）驱动    | 否         | 复用 `base`       |
| brand 语义（primary/secondary/ring）                               | 已由 `primary`（palette）驱动 | 否         | 复用 `primary`    |
| status 语义（destructive/success/warning/info/carbon）             | 写死，未分类                  | **是**     | `feedback` scheme |
| data 语义（chart1–5）                                              | 写死，未分类                  | **是**     | `chart` scheme    |
| skin 语义（sidebar*）                                              | 跟随 base⊕primary 派生        | **是**     | `sidebar` scheme  |

### 4.2 三类 scheme 的对称性

| 分类       | 语义   | 值类型                 | 默认方案  | 解析策略                    |
| ---------- | ------ | ---------------------- | --------- | --------------------------- |
| `feedback` | status | 直接色值               | `classic` | scheme                      |
| `chart`    | data   | 直接色值               | `vivid`   | scheme                      |
| `sidebar`  | skin   | 色值 **或** token 引用 | `derived` | scheme（引用 base⊕primary） |

sidebar 的特殊性：默认值引用既有 token（`sidebar: 'background'`），而非硬编码色值，因此需支持 `SidebarColorValue = ColorValue | SidebarTokenRef`。

---

## 5. 数据驱动扩展（核心破局）

### 5.1 palette 抽象为数据对象

```ts
/** 一个 palette = 名称 + 家族元数据 + 10 级 ramp 数据 */
export interface ThemePalette {
  name: string; // 注册表 key
  family: 'neutral' | 'chromatic'; // 决定 base/primary 走哪套 core 模板与暗色派生
  colors: Record<PaletteColorLevel, { hsl: string; oklch: string }>;
}
```

- `family` 统一替代散落的 `NEUTRAL_FAMILY` / `CHROMATIC_FAMILY` / `DARK_PRIMARY_600` 判断；
- `colors` 可由 `@soybeanjs/colord` 的 `generatePalette(color, format)` 从**一个种子色**自动生成，为主题商店"加一个 palette"提供现成能力。

### 5.2 scheme 抽象为数据对象

```ts
/** feedback / chart / sidebar 共用 */
export interface SemanticScheme {
  light: Record<RoleKey, ColorValue | TokenRef>;
  dark: Record<RoleKey, ColorValue | TokenRef>;
}
```

### 5.3 统一运行时注册表 + 注入 API

```ts
export interface ThemePresetRegistry {
  base: Record<string, ThemePalette>; // 默认 = 9 个内置 neutral
  primary: Record<string, ThemePalette>; // 默认 = 26 个内置
  feedback: Record<string, SemanticScheme>; // 默认 = { classic }
  chart: Record<string, SemanticScheme>; // 默认 = { vivid }
  sidebar: Record<string, SemanticScheme>; // 默认 = { derived }
}

/** 注入/合并扩展；内置项不可覆盖，自定义项可覆盖自定义项 */
export function registerThemePresets(extra: Partial<ThemePresetRegistry>): void;
```

派生管线（`resolveTheme`）全部改为**从注册表查表**，不再直连 `builtin*CoreTemplate`：

```ts
const palette = registry.base[options.base];
const feedback = registry.feedback[options.feedback];
```

### 5.4 三种扩展路径（按复用度从高到低）

| 路径                   | 操作                                        | 是否改派生源码 |
| ---------------------- | ------------------------------------------- | -------------- |
| 选方案                 | `ThemeOptions.feedback/chart/sidebar = key` | 否             |
| 加方案                 | 在 scheme 注册表注入一项数据                | 否             |
| 加角色/加层            | 扩展 `RoleKey` / `COLOR_VARIABLES` / 注册表 | 低频，受控     |
| overrides 覆盖单 token | `ThemeOptions.overrides`                    | 否             |

---

## 6. 类型与校验开放化

```ts
// 在现有封闭 union 基础上扩展支持任意 string（保留内置 key 的字面量提示）
export type BaseColorKey = TailwindNeutralPaletteKey | (string & {});
export type PrimaryColorKey = TailwindPaletteKey | (string & {});

// 注册表辅助（替代 builtin*PresetKeys 白名单）
export function isBaseKey(k: string): boolean;
export function isPrimaryKey(k: string): boolean;
export function isFeedbackScheme(k: string): boolean;
export function isChartScheme(k: string): boolean;
export function isSidebarScheme(k: string): boolean;
```

> 采用 `TailwindNeutralPaletteKey | (string & {})` 形式：编辑器对内置 key 仍有精确补全与类型校验，同时允许 `registerThemePresets` 注入的自定义 palette 传入任意字符串 key，运行时由注册表兜底校验。

[storage.ts](packages/theme/src/storage.ts) 的 `isBaseKey` / `isPrimaryKey` 改为查注册表，而非 `builtinBasePresetKeys`，使自定义 palette 也能持久化 / SSR。

---

## 7. 存储与 SSR 联动

### 7.1 `ThemeConfigState` 扩展

```ts
export interface ThemeConfigState {
  base?: BaseColorKey;
  primary?: PrimaryColorKey;
  feedback?: FeedbackSchemeKey; // 新增
  chart?: ChartSchemeKey; // 新增
  sidebar?: SidebarSchemeKey; // 新增
  size?: ThemeSizeValue;
  radius?: ThemeRadiusValue;
  menuColor?: MenuColor;
  menuAccent?: MenuAccent;
  mode?: 'light' | 'dark';
  format?: ColorFormat;
  lightLevel?: LightLevelOffset;
  darkLevel?: DarkLevelOffset;
  /** overrides 随配置持久化于 localStorage（体积约束，不进 cookie），见 §7.3 */
  overrides?: ThemeOverrides;
}
```

> `ThemeConfigState` 是**可重建的完整构建输入**：命名 key（base/primary/feedback/chart/sidebar/levels）+ `overrides` 一起持久化于 **localStorage**，`resolveTheme({ ...state, overrides })` 即可完整还原。命名 key 同时镜像到 cookie 供服务端首帧预置 `<html>` 的 `dark` class / `data-theme`；`overrides` 因体积约束**不进 cookie**（见 §7.3）。

### 7.2 命名预设表（store 层，独立于 ThemeOptions）

```ts
export interface StoredThemePreset {
  name: string; // store 赋名的引用键
  version: string;
  light: Partial<ColorTokens>;
  dark?: Partial<ColorTokens>;
}
```

SSR 恢复流程：`createThemeStore` 读到已注册的自定义 palette/scheme 数据 → 重新 `registerThemePresets` → `resolveTheme` 解析，保证首帧一致、无 FOUC。

### 7.3 overrides 与存储/SSR 的三种场景与策略

**问题**：`overrides` 是任意 `Partial<ColorTokens>`，会出现"命名 key（base/primary/…）全部相同、仅 overrides 不同"的多个主题。若 `ThemeConfigState` 不含 overrides，它们的序列化字符串完全一致，存储/SSR 无法区分。按差异形态分三种场景：

| 场景 | 差异形态            | 示例                                                                           |
| ---- | ------------------- | ------------------------------------------------------------------------------ |
| A    | 整体 overrides 不同 | ① `overrides: { primary: 'blue.600' }` ② `overrides: { primary: 'green.600' }` |
| B    | overrides 键集不同  | ① `{ primary }` ② `{ primary, ring }`                                          |
| C    | overrides 值不同    | ① `{ primary: 'blue.600' }` ② `{ primary: 'blue.700' }`                        |

**硬约束（与主流方案一致）**：主题**不通过 cookie 传递**。cookie 有 ~4KB 体积上限且随每次请求自动传送，而 `overrides` 是任意大小的 `Partial<ColorTokens>`，既不进 cookie、也不作为跨环境通道。主流做法（next-themes / shadcn-theme-provider / VueUse `useColorMode` 等）已证明：颜色 CSS 由客户端注入即可防 FOUC，主题只存 **localStorage**、由内联脚本在首帧前应用。因此本设计采用**单一存储**：

| 层           | 承载内容                              | 是否含 overrides | 用途                               |
| ------------ | ------------------------------------- | ---------------- | ---------------------------------- |
| localStorage | 完整 `ThemeConfigState` + `overrides` | 含               | 客户端重建主题（容量大，仅浏览器） |

**处理策略**（分层，不互斥）：

- **策略 X（推荐基准，未命名/临时变体）**：`overrides` 并入 `ThemeConfigState`（§7.1），**持久化于 localStorage**。`overrides` 不同 → 序列化字符串不同 → 可区分、可重建。客户端首帧由内联脚本（`createThemeInitScript`）读 localStorage 应用，**无需 SSR 参与**。`parseThemeConfig` 需新增 `overrides` 逐键校验（复用 `pickValidColors` 的颜色合法性校验）。
- **策略 Y（补充，已命名可复用预设）**：`overrides` 固化为 `StoredThemePreset`，应用态只存 `name`（同样存 localStorage）。适用于**用户主动保存、想跨项目分享**的可复用主题。

**两者分工**：

| 变体类别                            | 承载方式                                               | 重建路径                                |
| ----------------------------------- | ------------------------------------------------------ | --------------------------------------- |
| 未命名/临时变体（随手调色、未起名） | localStorage 的 `ThemeConfigState.overrides`（策略 X） | `resolveTheme({ ...state, overrides })` |
| 已命名可复用预设（主动保存/分享）   | `StoredThemePreset`（策略 Y），应用态只存 `name`       | 查表取 `overrides` + `resolveTheme`     |

**对 SSR 的影响**：

- 颜色 CSS 由客户端 `createTheme` 注入（现状如此），SSR 首帧渲染默认主题；`createThemeInitScript()` 内联脚本在客户端首帧前读 localStorage，设置 `dark` class / `data-theme`——**不涉及 overrides、不依赖 cookie**。
- "仅 overrides 不同的未命名主题"首帧用命名默认值渲染，overrides 在 hydrate 后由 localStorage 接管（接受首帧轻微不一致）；若要求首帧精确一致，则固化为命名预设（策略 Y）。

---

## 8. 主题商店接入

```
主题商店面板
  ├─ 新增 palette：输入种子色 → generatePalette() 生成 ramp
  │    → 选 family → 组装 ThemePalette 数据
  │    → registerThemePresets({ base/primary: { 'my-brand': palette } })
  │    → 类型与校验自动放行（查注册表）
  ├─ 新增 feedback/chart/sidebar 方案：编辑 role→色值 映射
  │    → 组装 SemanticScheme 数据
  │    → registerThemePresets({ feedback/chart/sidebar: { 'my-scheme': scheme } })
  └─ 持久化：palette/scheme 数据写入 localStorage（仿现有 preset 表）
      → SSR 时恢复并重新 register
```

面板只做"**组装数据 + register**"，不碰任何派生源码。主题包中间表示：

```ts
interface ThemePackage {
  meta: { name; version; author; preview? };
  spec: { base; primary; radius; size; menuColor; menuAccent; feedback; chart; sidebar };
  overrides?: ThemeOverrides;
  extras?: Partial<ThemePresetRegistry>; // 可选携带新 palette/scheme 数据
}
```

---

## 9. 配置 UI 影响

- **基础层**：`base`/`primary` 色板选择 + `feedback`/`chart`/`sidebar` 方案选择（Select/ColorPicker），字段驱动、可视化、派生规则保证无对比度事故；
- **高级层**：`overrides` 逐 token 编辑 + 实时代理预览；
- 无需"全量 CSS 变量编辑器"（`css` 已移除）；若未来需要，走独立 `parseThemeVariables` API。

---

## 10. 向后兼容性

| 项            | 保证                                                                             |
| ------------- | -------------------------------------------------------------------------------- |
| CSS 变量契约  | 不变（`COLOR_VARIABLES` 39+ 键）                                                 |
| 默认输出      | 默认注册表 = 现有全部内置，`resolveTheme` 输出与 `createTheme` 现状逐字节一致    |
| 内置 key 导出 | `builtinBasePresetKeys` / `builtinPrimaryPresetKeys` 保留为"默认注册表 key 列表" |
| register API  | 纯增量，不注册时行为不变                                                         |

---

## 11. 实施路径（分阶段）

### 阶段 A：scheme 化（feedback / chart / sidebar）

1. 把 `deriveFeedbackColors` / `CHART_TEMPLATE` / `deriveSidebarPreset` 具象化为注册表数据（`classic` / `vivid` / `derived`），默认输出不变；
2. `ThemeOptions` 新增 `feedback` / `chart` / `sidebar`，接入 `resolveTheme`；
3. `ThemeConfigState` + `parseThemeConfig` 增校验。

### 阶段 B：配置入口收敛

4. `preset` 改名 `overrides`，`{ name }` 引用独立为 store 层 `StoredThemePreset`；
5. 移除 `css`（降级为独立工具 API，本期若暂不需要可先删除）；
6. 移除 `complete`；暴露 `resolveTheme`。

### 阶段 C：数据驱动注册表（palette 开放）

7. palette 抽象为 `ThemePalette`（含 `family`），`BaseColorKey`/`PrimaryColorKey` 开放；
8. 引入 `ThemePresetRegistry` + `registerThemePresets`，派生/存储/SSR 全改查表；
9. 主题商店面板接入（组装数据 + register）。

---

## 12. 风险与权衡

| 风险                               | 缓解                                                              |
| ---------------------------------- | ----------------------------------------------------------------- |
| scheme 数量膨胀 → 配置 UI 控件变多 | 基础层只暴露常用方案，高级层折叠                                  |
| 开放 key 丢失类型提示              | 保留内置 key 的字面量建议（`FeedbackSchemeKey = 'classic'         | (string & {})`） |
| 注册表运行时合并的幂等性           | 内置不可覆盖，自定义按注册顺序后者优先，提供 `resetThemeRegistry` |
| SSR 需要恢复自定义注册表           | `createThemeStore` 负责重放注册数据                               |

---

## 13. 决策记录对照

| 决策         | 结论                                                                                                 |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| 双轨制定位   | 方案一（scheme 字段化）为**标准主路径**；方案二（全量 CSS 变量）降级为**独立逃生舱 API**，不进主入口 |
| palette 维度 | `base`/`primary` 保持 palette 维度，不重复造 surface/brand 层                                        |
| scheme 维度  | `feedback`/`chart`/`sidebar` 走 scheme 维度；sidebar 值支持 token 引用                               |
| overrides    | 内联覆盖，替代原 preset 内联部分                                                                     |
| name 语义    | 引用标识符，非重建钥匙                                                                               |
