# 全新主题引擎方案：ThemeProvider + ThemeGenerator

> 版本：v1.0（评审稿）
> 范围：`@soybeanjs/ui` 新增 `ThemeProvider` / `ThemeGenerator` 组件 + `@soybeanjs/headless` 新增 `useThemeGenerator` 组合式函数 + ConfigProvider 主题属性迁移
> 前置：`@soybeanjs/theme`（P0 引擎，提供 `generateCss` / 类型）、[theme-refactor-plan.md](theme-refactor-plan.md)、[config-provider-theme-persist-plan.md](config-provider-theme-persist-plan.md)
> 决策：[ADR-8](adr/0008-theme-provider-architecture.md)
> 术语：[CONTEXT.md](../CONTEXT.md)

---

## 1. 背景与目标

### 1.1 现状

- 主题渲染逻辑全部内嵌在 `SConfigProvider`（`useConfigProviderTheme`）：`createTheme` 派生 CSS、内联 `<style>` 注入、持久化读取/合并、自定义 preset 解析、SSR cookie 同步。
- `@soybeanjs/theme` 提供 `createTheme(ThemeOptions)` → CSS，以及 `generateCss(preset: ThemeColorPreset, options)` → CSS（已具备从**完整 token 集合**输出 CSS 的能力）。
- 项目遵循 **headless/UI 分层**：headless 持有逻辑与状态，UI 持有样式与渲染。

### 1.2 目标

1. **主题引擎组件化**：移除 ConfigProvider 中与主题相关的属性，独立 `ThemeProvider`。
2. **token 分类与预设**：`ThemeGenerator` 处理 base / primary / feedback 等预设，输出完整主题预设配置。
3. **SSR 兼容（仅 preset）**：借鉴项目现有 SSR 方案与 antdv-style 的 SSR 处理。
4. **集成与文档**：与既有模块兼容、完整类型定义与 API 文档。

### 1.3 非目标（本期不做）

- 不改变 `@soybeanjs/theme` 的 CSS 契约与 `generateCss` 行为。
- 不做 ConfigProvider 的 config 级持久化迁移（`persistTheme` / `themeConfig` / cookie 整体持久化不再下沉，见 §5）。
- 不引入 CSS-in-JS 运行时（antdv-style 的 `StyleCache` 动态插入类方案），仅借鉴其 SSR 一致性原则。

---

## 2. 架构总览

```
┌──────────────────────────────────────────────────────────────┐
│ 应用层  apps/playground · apps/nuxt · 文档/设置面板             │
├──────────────────────────────────────────────────────────────┤
│ UI 层   packages/ui                                         │
│   ThemeProvider  <-- tokens(light/dark) + styleTarget/       │
│                      darkSelector/format/size/radius/menu    │
│   ThemeGenerator  <-- base/primary/overrides → 渲染 ThemeProvider│
│                     并通过 slot 暴露完整 tokens                 │
├──────────────────────────────────────────────────────────────┤
│ Headless 层  packages/headless                              │
│   useThemeGenerator  (计算要素 → 完整 tokens 纯逻辑)           │
├──────────────────────────────────────────────────────────────┤
│ 引擎层  @soybeanjs/theme                                     │
│   generateCss(ThemeColorPreset, options) → CSS 字符串         │
└──────────────────────────────────────────────────────────────┘
```

依赖方向：`UI → headless → @soybeanjs/theme`（headless 不依赖 UI，theme 不依赖 headless/UI）。

### 2.1 关键决策（ADR-8）

| 决策           | 结论                                                                                                                                                                             |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D1 tokens 模型 | `tokens` 是**原始、用户编写的语义 token 对象**（`{ light, dark }`），ThemeProvider 直接转 CSS（复用 `generateCss`）；base/primary/feedback 仅为 ThemeGenerator 填充 token 的输入 |
| D2 tokens 形状 | `{ light: Partial<ThemeColors>; dark?: Partial<ThemeColors> }`（即现有 `CustomThemeColorPreset`），字段可选、缺失回退默认                                                        |
| D3 默认兜底    | ThemeProvider 内置默认主题（zinc / indigo 派生全集）填充缺失键，零配置即用                                                                                                       |
| D4 完整主题    | `size/radius/menuColor/menuAccent` 一并移入 ThemeProvider，ThemeProvider 成为完整主题渲染组件                                                                                    |
| D5 feedback    | feedback 是**分类 token 组**，非可选预设维度（与 ADR-6/D9 一致）；用户按组覆盖                                                                                                   |
| D6 组成方式    | `useThemeGenerator`（headless 计算要素）+ 薄 `ThemeGenerator`（渲染 ThemeProvider + slot 暴露 tokens）                                                                           |
| D7 持久化范围  | 最小化：丢弃 config 级持久化，**仅保留 preset 的 SSR 解析**（`presetProvider` + `isServer`）                                                                                     |

---

## 3. API 文档

### 3.1 类型

#### `ThemeTokens`（token 集合）

复用以 `@soybeanjs/theme` 的 `CustomThemeColorPreset`，别名提升可读性。

```ts
import type { CustomThemeColorPreset } from '@soybeanjs/theme';

/** 主题 token 集合：light/dark 各一份，字段全可选，缺失键回退默认 */
export type ThemeTokens = CustomThemeColorPreset;
// = { light: Partial<ThemeColors>; dark?: Partial<ThemeColors> }
```

#### `ThemeTokensInput`（token 输入）

```ts
import type { CustomThemeColorPreset, ThemePresetRef } from '@soybeanjs/theme';

/**
 * token 输入：内联 token 集合，或按名引用的持久化 preset。
 * 按名引用仅在 SSR 预设解析场景使用（D7）。
 */
export type ThemeTokensInput = CustomThemeColorPreset | ThemePresetRef;
// ThemePresetRef = { presetName: string }
```

#### `ThemeTokenGroup`（token 分类）

```ts
export type ThemeTokenGroup = 'base' | 'primary' | 'feedback' | 'sidebar' | 'chart';
```

#### `ThemeProviderProps`

```ts
import type {
  ColorFormat,
  CustomThemeColorPreset,
  DarkSelector,
  MenuAccent,
  MenuColor,
  StyleTarget,
  ThemeRadius,
  ThemeSize
} from '@soybeanjs/theme';

export interface ThemeProviderProps {
  /**
   * 主题 token 集合（light/dark，字段可选），或按名引用的持久化 preset。
   * 缺失键回退内置默认主题（zinc / indigo 派生全集）。
   */
  tokens?: ThemeTokensInput;
  /** 样式注入目标。`'html'` 或 `':root'`。默认 `':root'`。 */
  styleTarget?: StyleTarget;
  /** 暗色选择器。`'class'`（`.dark`）/ `'media'`（系统偏好）/ 自定义选择器。默认 `'class'`。 */
  darkSelector?: DarkSelector | (string & {});
  /** 颜色输出格式。`'hsl'` 或 `'oklch'`。默认 `'hsl'`。 */
  format?: ColorFormat;
  /** 根字号 / 密度（`xs`…`2xl`）。默认 `'md'`。 */
  size?: ThemeSize | (string & {});
  /** 圆角（`2xs`…`2xl`）。默认 `'md'`。 */
  radius?: ThemeRadius | (string & {});
  /** 菜单配色。默认 `'default'`。 */
  menuColor?: MenuColor;
  /** 菜单强调。默认 `'subtle'`。 */
  menuAccent?: MenuAccent;
  /** 内联 `<style>` 的 nonce（CSP）。 */
  nonce?: string;
  /**
   * 服务端预设解析器：把 `{ presetName }` 引用映射为 `CustomThemeColorPreset` 定义，
   * 使 SSR 无需访问 localStorage 即可渲染自定义 preset。仅 `isServer` 时生效。
   */
  presetProvider?: (name: string) => CustomThemeColorPreset | null | undefined;
  /**
   * 显式运行时环境。UI 库为预构建产物，`import.meta.env.SSR` 在构建时固化，
   * 需应用注入（如 Nuxt 的 `import.meta.server`）。默认 `isServerRuntime()`。
   */
  isServer?: boolean;
}
```

#### `ThemeGeneratorOverrides`（按分类覆盖）

```ts
export interface ThemeGeneratorOverrides {
  /** base 分类覆盖（background / foreground / card / muted / accent / border / input / carbon 等） */
  base?: Partial<ThemeColors>;
  /** primary 分类覆盖（primary / primaryForeground / ring） */
  primary?: Partial<ThemeColors>;
  /** feedback 分类覆盖（destructive / success / warning / info 及其 Foreground） */
  feedback?: Partial<ThemeColors>;
  /** sidebar 分类覆盖（sidebar* 8 键） */
  sidebar?: Partial<ThemeColors>;
  /** chart 分类覆盖（chart1-5） */
  chart?: Partial<ThemeColors>;
}
```

#### `ThemeGeneratorProps`

```ts
export interface ThemeGeneratorProps extends Omit<ThemeProviderProps, 'tokens'> {
  /** 中性 base 预设键。默认 `'zinc'`。 */
  base?: BaseColorKey;
  /** 主色 primary 预设键。默认 `'indigo'`。 */
  primary?: PrimaryColorKey;
  /** 按 token 分类的覆盖，优先级最高。 */
  overrides?: ThemeGeneratorOverrides;
  /** 亮色调暗档位（0-2）。默认 0。 */
  lightLevel?: LightLevelOffset;
  /** 暗色调亮档位（0-3）。默认 0。 */
  darkLevel?: DarkLevelOffset;
}
```

#### `useThemeGeneratorOptions`

```ts
export interface UseThemeGeneratorOptions {
  base?: BaseColorKey;
  primary?: PrimaryColorKey;
  overrides?: ThemeGeneratorOverrides;
  lightLevel?: LightLevelOffset;
  darkLevel?: DarkLevelOffset;
}
```

### 3.2 组件

#### `ThemeProvider`

- **定位**：完整主题渲染组件，接收 `tokens`（light/dark）与渲染参数，输出并注入 CSS。
- **行为**：将 `tokens` 与内置默认主题合并为完整 `ThemeColorPreset`，调用 `generateCss` 生成 CSS，内联 `<style id="__SoybeanUI_theme">` 注入（服务端与客户端都渲染，保证 SSR 水合一致）。
- **默认 slot**：包裹内容。
- **props**：见 `ThemeProviderProps`。

```vue
<script setup lang="ts">
import { SThemeProvider } from '@soybeanjs/ui';

const tokens = {
  light: { primary: 'indigo.500' },
  dark: { primary: 'indigo.400' }
};
</script>

<template>
  <SThemeProvider :tokens="tokens" format="oklch" dark-selector="class">
    <App />
  </SThemeProvider>
</template>
```

#### `ThemeGenerator`

- **定位**：预设驱动的主题生成器。按 `base` / `primary` 预设 + 按分类 `overrides` + `lightLevel` / `darkLevel` 计算完整 tokens，并渲染 `ThemeProvider`。
- **行为**：内部使用 `useThemeGenerator` 计算 `tokens`；以 `#default="{ tokens }"` 插槽作用域暴露完整 tokens，供应用读取/持久化。
- **props**：见 `ThemeGeneratorProps`（继承 `ThemeProviderProps` 除 `tokens`，另含预设选择与覆盖）。

```vue
<script setup lang="ts">
import { SThemeGenerator } from '@soybeanjs/ui';
</script>

<template>
  <SThemeGenerator
    base="slate"
    primary="violet"
    :overrides="{ feedback: { success: 'emerald.500' } }"
    #default="{ tokens }"
  >
    <App />
    <!-- tokens 可被读取/持久化 -->
  </SThemeGenerator>
</template>
```

### 3.3 组合式函数 `useThemeGenerator`（headless）

- **定位**：纯计算要素，无渲染。输入 `base` / `primary` / `overrides` / `lightLevel` / `darkLevel`，返回响应式完整 `tokens`。
- **返回值**：`{ tokens: ComputedRef<ThemeTokens> }`。
- **可测性**：无 DOM 依赖，可直接单测。

```ts
import { useThemeGenerator } from '@soybeanjs/headless';

const { tokens } = useThemeGenerator({
  base: 'slate',
  primary: 'violet',
  overrides: { feedback: { success: 'emerald.500' } }
});
```

### 3.4 token 分类（ThemeTokenGroup）

| 分类       | 键                                                                                                                                                                                                                   |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `base`     | `background` `foreground` `card` `cardForeground` `popover` `popoverForeground` `muted` `mutedForeground` `accent` `accentForeground` `secondary` `secondaryForeground` `border` `input` `carbon` `carbonForeground` |
| `primary`  | `primary` `primaryForeground` `ring`                                                                                                                                                                                 |
| `feedback` | `destructive` `destructiveForeground` `success` `successForeground` `warning` `warningForeground` `info` `infoForeground`                                                                                            |
| `sidebar`  | `sidebar` `sidebarForeground` `sidebarPrimary` `sidebarPrimaryForeground` `sidebarAccent` `sidebarAccentForeground` `sidebarBorder` `sidebarRing`                                                                    |
| `chart`    | `chart1` `chart2` `chart3` `chart4` `chart5`                                                                                                                                                                         |

- 分类仅用于组织覆盖与文档，**不改变** `ThemeColors` 扁平键契约。
- feedback 为固定 classic（`red/green/amber/blue`），不提供预设选择器（D5），仅可按组覆盖。

---

## 4. 文件结构与分层

```
packages/ui/src/components/theme-provider/
├── index.ts        # 导出 SThemeProvider / 类型
├── theme-provider.vue
└── types.ts

packages/ui/src/components/theme-generator/
├── index.ts        # 导出 SThemeGenerator / 类型
├── theme-generator.vue
└── types.ts

packages/headless/src/components/theme-generator/
├── index.ts        # 导出 useThemeGenerator
├── use-theme-generator.ts
└── types.ts
```

- headless 持有 `useThemeGenerator`（计算 + 暴露 override 分类），UI 持有两个 SFC。
- 公共导出变更后需重跑 `pnpm sui ui` / `pnpm sui headless` 同步生成元数据。

---

## 5. ConfigProvider 迁移与兼容

### 5.1 移除的主题属性

从 `SConfigProvider` 移除，迁移到 `ThemeProvider`：

| ConfigProvider 现值                                                                        | 去向                                                         |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------ |
| `theme`                                                                                    | `ThemeProvider.tokens`（由 ThemeGenerator 生成或直接内联）   |
| `size`（已废弃，= theme.size）                                                             | `ThemeProvider.size`                                         |
| `persistTheme` / `cacheThemeConfig` / `themeStorageKey` / `themeCookieKey` / `themeConfig` | **移除**（config 级持久化不再下沉，应用自行持有状态）        |
| `presetProvider` / `isServer`                                                              | `ThemeProvider.presetProvider` / `isServer`（仅 preset SSR） |

### 5.2 保留的非主题属性

`iconify` / `progress` / `toast` / `customToast` / `dir` / `locale` / `nonce` / `messages` 等保留于 `SConfigProvider`，与主题无关。

### 5.3 示例

```vue
<!-- 之前：主题内嵌 ConfigProvider -->
<SConfigProvider :theme="{ base: 'slate', primary: 'violet' }">
  <App />
</SConfigProvider>

<!-- 之后：主题拆到 ThemeProvider，ConfigProvider 只管非主题配置 -->
<SThemeProvider base="slate" primary="violet">
  <SConfigProvider :iconify="{ width: '1.25em' }" dir="ltr">
    <App />
  </SConfigProvider>
</SThemeProvider>
<!-- 或直接用 ThemeGenerator 组合 -->
```

---

## 6. SSR 兼容性说明

> 本期仅针对 **preset** 实现 SSR 兼容（D7），不做 config 级持久化 SSR。

### 6.1 问题：预构建库的运行时检测

`@soybeanjs/theme` 与 UI 库为预构建产物，`import.meta.env.SSR` 在构建时被固化，无法反映消费方实际运行时。因此：

- 组件默认用 `isServerRuntime()`（检测 `window` / `document` 是否存在）做运行时判断；
- 应用应显式传 `isServer`（如 Nuxt 的 `import.meta.server`）覆盖，驱动 SSR 专用路径。

### 6.2 CSS 注入：服务端/客户端同时渲染

与 [hooks.ts](../packages/ui/src/components/config-provider/hooks.ts) 现有 `ThemeStyle` 一致：

- 内联 `<style id="__SoybeanUI_theme">{css}</style>` 在**服务端与客户端都渲染**，保证 SSR 输出包含主题变量、水合一致；
- 响应式 `tokens` 变化时，客户端就地更新样式，无需整页重载。

> 该方案与 antdv-style 的 `StyleProvider` + `ssrInline` 殊途同归：两者都保证「SSR HTML 中已含样式」。antdv-style 因 CSS-in-JS 动态插入需要 `StyleCache` 与把样式提取注入 `<head>`；本项目是确定性 CSS 字符串，单个内联 `<style>` 即可，无需缓存。

### 6.3 preset 的 SSR 解析

自定义 preset 通过 `{ presetName }` 引用（`ThemeTokensInput`）。SSR 下无法访问 localStorage，需服务端解析：

```
tokens = { presetName }
  ├─ isServer=true  → presetProvider(presetName)  // 应用层注册表
  └─ isServer=false → localStorage presets 表
```

- **`presetProvider`**：服务端解析器，把 preset 名映射为 `CustomThemeColorPreset` 定义；未命中时回退内置默认并 `console.warn`。
- **由谁传 presetName**：应用层从 `@soybeanjs/theme` 的 `createThemeStore().readAppliedPreset()`（读 `soybean-ui-applied-preset` cookie）或自有状态取得当前 preset 名，作为 `tokens: { presetName }` 传入。
- **首帧暗色**：应用可用 `@soybeanjs/theme` 的 `createThemeInitScript` 在 `<head>` 内联脚本，首帧前应用暗色 class 并把 localStorage 镜像到 cookie。

### 6.4 与 antdv-style 的对照

| 维度           | antdv-style                                               | 本项目（ThemeProvider）              |
| -------------- | --------------------------------------------------------- | ------------------------------------ |
| 样式来源       | CSS-in-JS 动态插入                                        | 确定性 CSS 字符串（`generateCss`）   |
| SSR 输出含样式 | `StyleProvider` + `ssrInline`（或 cache 提取入 `<head>`） | 内联 `<style>` 服务端/客户端同时渲染 |
| 缓存           | `StyleCache`                                              | 无（计算即得）                       |
| 运行时环境     | 同构构建判断                                              | 显式 `isServer` 注入                 |

**借鉴点**：SSR 输出必须与客户端一致以保证水合（Watermark），故采用「两端都渲染同一 `<style>`」；不引入 CSS-in-JS 运行时。

### 6.5 验收标准

- [ ] SSR 输出 HTML 含 `__SoybeanUI_theme` 样式与完整主题变量；
- [ ] `{ presetName }` 在服务端经 `presetProvider` 解析、客户端经 localStorage 解析，结果一致；
- [ ] `isServer` 未注入时，`isServerRuntime()` 运行时检测正确；
- [ ] Nuxt 应用：SSR 首屏渲染主题与客户端水合后一致（e2e 校验）；
- [ ] 未命中 preset 时回退内置默认并告警，无崩溃。

---

## 7. 实施计划

1. headless：`useThemeGenerator` + `ThemeGeneratorOverrides` / `UseThemeGeneratorOptions` 类型 + 导出；
2. UI：`ThemeProvider`（tokens 合并 + `generateCss` + 内联 `<style>`）+ `ThemeGenerator`（slot 暴露 tokens）；
3. ConfigProvider 移除主题属性，示例/文档迁移；
4. playground 示例 + docs 页面 + API 生成数据 + 测试（组件 + 派生快照）；
5. `pnpm sui headless` / `pnpm sui ui` / `pnpm sui api` 同步元数据；
6. Nuxt 应用 SSR 校验（preset 解析 + 首屏一致性）。

## 8. 风险与回滚

| 风险                                     | 缓解                                                                        |
| ---------------------------------------- | --------------------------------------------------------------------------- |
| ConfigProvider 移除 `theme` 破坏现有调用 | 迁移期保留 `theme` 并标记 deprecated，经 `ThemeProvider` 转发；文档迁移指引 |
| SSR 水合不一致                           | 两端同一 `<style>` + 快照/e2e 校验                                          |
| 语义键分类与派生键冲突                   | 覆盖仅作用于扁平 `ThemeColors`，分类不改变契约                              |
| 回滚                                     | 各阶段独立提交，可单独 revert                                               |

## 9. 待办/后续（非本期）

- 重新引入 config 级持久化（`persistTheme` 等）到 ThemeProvider（如需）。
- 可选 feedback 预设维度（D5 的能力扩展，需引擎改动）。
