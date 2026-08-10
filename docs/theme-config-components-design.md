# 主题配置组件设计（应用内配置 + 主题商店）

> 版本：v3.0（评审稿，新增 §5.8 内置预设体系：feedback/sidebar/chart）
> 范围：`@soybeanjs/ui`（`S*` 组件 + 主题配置 composable）⊕ `packages/theme`（内置预设先决 + 消费）
> 定位：主题配置组件**全部实现于 UI 层**，不进入 `@soybeanjs/headless`。headless 是样式无关基元层，主题是 `@soybeanjs/ui` 基于 `@soybeanjs/theme` 的样式化职责，故相关组件/composable 直接在 UI 层实现。
> 目标读者：组件库维护者
> 前置：`@soybeanjs/theme` 引擎管线已落地（`createTheme`/`resolveTheme`/`registerThemePresets`/运行时注册表/存储/SSR）；`SConfigProvider` + `useTheme()` 已有；playground 已有 `theme-configurator.vue` 与 `theme-generator/`
> 关联决策：[ADR-8](adr/0008-theme-provider-architecture.md)、[theme-config-model-redesign.md](theme-config-model-redesign.md)、[config-provider-theme-persist-plan.md](config-provider-theme-persist-plan.md)

---

## 1. 背景与目标

### 1.1 现状

主题引擎能力已经齐备，但**面向用户的配置 UI 尚未沉淀为可复用组件**：

| 能力                                                             | 现状                     | 归属                                                                                   |
| ---------------------------------------------------------------- | ------------------------ | -------------------------------------------------------------------------------------- |
| 引擎（解析/CSS/注册表/存储/SSR）                                 | 已落地                   | `@soybeanjs/theme`                                                                     |
| 运行时主题上下文（base/primary/radius/size/mode + preset 管理）  | 已落地                   | `SConfigProvider` → `useTheme()`                                                       |
| 完整主题状态编辑（feedback/chart/sidebar/levels/menu/overrides） | 仅存在于 playground 内部 | `apps/playground/src/components/theme-generator/`（`useThemeGenerator` + `index.vue`） |
| 简单配置器（base/primary/radius/size + preset 保存）             | 仅存在于 playground 内部 | `apps/playground/src/components/theme-configurator.vue`                                |

playground 内部的两套实现（`theme-configurator` / `theme-generator`）**不可复用、与 playground 强耦合**（`useTheme('ThemeConfigurator')` 的命名上下文、`tailwindPalette` 直读、无 headless/UI 分层）。

### 1.2 两个场景

需要把配置 UI 产品化为组件，服务两类消费：

- **场景一 · 应用内主题配置**：真实项目里的“设置面板/抽屉”，用户实时切换 base / primary / mode / radius / size / scheme / overrides，改动即时生效并持久化。
- **场景二 · 主题商店**：主题商店应用（浏览 → 预览 → 应用 → 自定义/新建主题），围绕 `ThemePackage` 中间表示（[redesign §8](theme-config-model-redesign.md)）做“组装数据 + register”，不改任何派生源码。

### 1.3 目标

1. **沉淀可复用主题配置组件**：覆盖上述两个场景，**全部实现于 `@soybeanjs/ui` 层**（组件 + composable）；
2. **一套状态核心，两处复用**：应用内设置与主题商店自定义器共用同一 UI 层状态 composable（`useThemeSettings`），避免第二套实现；
3. **不改引擎**：组件只消费 `@soybeanjs/theme` 既有 API（`createTheme`/`resolveTheme`/`registerThemePresets`/存储），新增能力全部在 UI 层 composable 与组件组合层；
4. **与 `useTheme()` / `SConfigProvider` 协同**：应用内组件优先走既有 `ThemeContext`，商店组件走 `ThemePackage` 生命周期。

### 1.4 非目标（本期不做）

- 不实现主题商店产品本身，只交付其**可复用的组件与 composable 积木**；
- 不重构 `SConfigProvider`（ADR-8 的 ThemeProvider 拆分为后续项，本设计定义组件消费的“主题上下文契约”，对最终落点无强依赖）；
- 不新增引擎 API；`useTheme()` 现有字段不删除；
- **不在 `@soybeanjs/headless` 中新增任何主题配置逻辑**：headless 定位为样式无关基元（颜色/表单等通用交互），主题属 UI 层样式化职责，全部沉淀到 `@soybeanjs/ui`。

---

## 2. 总体架构与分层

```
┌────────────────────────────────────────────────────────────────────┐
│ 场景二 主题商店应用(第三方)   ThemeShop(未来产品)                    │
│   SThemeGallery SThemeCard SThemeCustomizer SThemePackageActions   │
├────────────────────────────────────────────────────────────────────┤
│ 场景一 真实应用                                                   │
│   SThemeSettingsPanel SThemeModeToggle SThemePalettePicker         │
│   SThemeRadiusPicker SThemeSizePicker SThemeSchemeSelect          │
├───────────────────────────────────────────────┬────────────────────┤
│ UI 层 @soybeanjs/ui                            │ UI styles/*.ts     │
│  S* 组件 (components/theme-*/)                 │  (styles/theme-*)   │
│  composables (theme/use-theme-*.ts)            │                    │
│  复用 SColorPicker/SSelect/SPopover/SDrawer…   │                    │
├───────────────────────────────────────────────┴────────────────────┤
│ 引擎 @soybeanjs/theme  createTheme/resolveTheme/registerThemePresets │
│        registry / storage(ThemeConfigState, StoredThemePreset) / ssr│
└─────────────────────────────────────────────────────────────────────┘
```

**分层原则**：

- 主题配置组件与 composable **全部位于 `@soybeanjs/ui`**（`components/theme-*/` + `theme/use-theme-*.ts`），不新增任何 headless 代码；
- `@soybeanjs/ui` 复用既有颜色/表单/浮层控件（`SColorPicker`/`SSelect`/`SPopover`/`SDrawer`/`STabs`…）。这些控件的**样式无关基元**（颜色/表单交互）保留在 `@soybeanjs/headless`，本设计不新增；
- `@soybeanjs/headless` 定位为样式无关基元层，**不承载任何 `@soybeanjs/theme` 相关逻辑**；
- 状态/持久化/register 逻辑在 UI 层 composable（`theme/use-theme-*.ts`），`S*` 组件做组装 + 类注入 + prop/slot 转发。

---

## 3. 核心状态模型（UI 层 composables）

### 3.1 `useThemeSettings` —— 主题配置状态核心

统一承载“可编辑的完整主题配置”，被**应用内设置面板**与**主题商店自定义器**复用。位于 `@soybeanjs/ui` 的 `theme/` 目录，纯逻辑、可单测（依赖 `@soybeanjs/theme` 存储与校验，不依赖组件渲染）。

```ts
// packages/ui/src/theme/use-theme-settings.ts
export interface UseThemeSettingsOptions {
  /** 初始配置（例如来自 useTheme() 的当前 theme） */
  initial?: ThemeConfigState;
  /** 持久化开关与存储键（默认 THEME_STORAGE_KEY） */
  persist?: boolean;
  storageKey?: string;
  /** 提交到运行时：把 state 应用到 SConfigProvider / ThemeProvider */
  apply?: (state: ThemeConfigState) => void;
}

export interface UseThemeSettingsReturn {
  /** 完整可写配置（含 overrides），即 §ThemeConfigState 全字段 */
  state: Ref<ThemeConfigState>;
  /** 局部更新（base/primary/… 单字段或对象），不可变更新 state */
  setState: (patch: Partial<ThemeConfigState>) => void;

  /** 可编辑的 light/dark 单 token 覆盖 */
  overrides: Ref<ThemeOverrides>;
  setOverride: (mode: 'light' | 'dark', key: ColorKey, value: ColorValue | '') => void;

  /** 合并后的 ThemeOptions，供 createTheme / 预览 / 提交直接使用 */
  resolved: ComputedRef<ThemeOptions>;

  /** 保存为命名预设（策略 Y）与预设管理 */
  presets: PresetManager; // { list, save(name), apply(name), remove(name), appliedName }

  /** 提交：持久化 + 调用 apply 应用到运行时 */
  commit: () => void;
  /** 重置为引擎默认（DEFAULT_PRESET_OPTIONS + 清空 overrides） */
  reset: () => void;
}
```

**要点**：

- `state` 的字段即 `ThemeConfigState`（base/primary/feedback/chart/sidebar/size/radius/menuColor/menuAccent/mode/format/lightLevel/darkLevel/overrides），补全了 `useTheme()` 当前未暴露为可写的 feedback/chart/sidebar/levels/menu/overrides；
- `resolved` 由 `state` 派生（`{ ...state }`），**不重复实现派生**（派生归引擎 `resolveTheme`）；
- `commit()` 复用引擎存储 API（`setStoredThemeConfig`），`apply` 回调由宿主注入（应用内接 `useTheme().setThemeState`，商店接 `SThemeCustomizer` 自己的 scope）；
- `overrides` 编辑复用引擎色值校验（`isValidColorValue` 逻辑，见 storage.ts），非法输入不进入 state。

### 3.2 `useThemePackage` —— 主题包状态机（场景二）

围绕 `ThemePackage`（[redesign §8](theme-config-model-redesign.md)）的生命周期管理。

```ts
// packages/ui/src/theme/use-theme-package.ts
export interface UseThemePackageOptions {
  pkg?: ThemePackage;                 // 外部传入的包（浏览/导入）
  apply?: (resolved: ThemeOptions) => void;  // 应用到预览 scope
  persistPresets?: boolean;           // extras 是否持久化（localStorage 注册表）
}

export interface UseThemePackageReturn {
  pkg: Ref<ThemePackage>;
  /** 校验 + 注册 extras（registerThemePresets），幂等 */
  register: () => void;
  /** 解析出完整 ThemeOptions（spec + overrides），供 createTheme / 预览 */
  resolved: ComputedRef<ThemeOptions>;
  /** 应用：register + apply(resolved) */
  apply: () => void;
  /** 序列化为可分享 JSON（导出） */
  serialize: () => string;
  /** 从 JSON 解析 + 校验（导入），非法返回 null */
  static parse(json: string): ThemePackage | null;
  /** 从当前已编辑状态打包（自定义器输出） */
  static buildFromSettings(s: UseThemeSettingsReturn): ThemePackage;
}
```

### 3.3 `useThemeGallery`（场景二）

商店列表逻辑：主题数组 + 选中/应用态。

```ts
export interface UseThemeGalleryReturn {
  themes: Ref<ThemePackage[]>;
  appliedName: Ref<string | null>;
  previewName: Ref<string | null>;
  select: (name: string) => void; // 仅预览
  apply: (name: string) => void; // 应用（经 useThemePackage）
}
```

### 3.4 `useThemePreview`（场景二）

对某个 `ThemeOptions` 做**隔离预览**：在嵌套 scope 中 `createTheme` → 注入 `<style>`，与运行时主主题互不影响。

```ts
export interface UseThemePreviewReturn {
  /** 注入到预览容器的 CSS（基于 previewOptions） */
  styleCss: ComputedRef<string>;
  /** 预览容器 ref（内部 <style> 由其挂载） */
  containerRef: Ref<HTMLElement | null>;
}
```

---

## 4. 场景一：应用内主题配置组件

真实项目“设置面板”，改动即时生效 + 持久化。全部组件消费 `useTheme()`（`ThemeContext`）或 `useThemeSettings`。

### 4.1 组件清单

| 组件                  | 文件名                 | 模式         | 说明                                                           |
| --------------------- | ---------------------- | ------------ | -------------------------------------------------------------- |
| `SThemeModeToggle`    | `theme-mode-toggle`    | Single-class | light/dark/system 三态切换（segment/switch）                   |
| `SThemePalettePicker` | `theme-palette-picker` | Multi-slot   | base/primary 色板网格选择，含“自定义”入口                      |
| `SThemeRadiusPicker`  | `theme-radius-picker`  | Single-class | 圆角分段控件（none/sm/md/lg/xl）                               |
| `SThemeSizePicker`    | `theme-size-picker`    | Single-class | 密度分段控件（xs…2xl）                                         |
| `SThemeSchemeSelect`  | `theme-scheme-select`  | Single-class | feedback/chart/sidebar 方案选择（含 5 内置预设预览色块，§5.8） |
| `SThemeSidebarToggle` | `theme-sidebar-toggle` | Single-class | Switch：是否启用侧边栏独立 skin / 派生（§5.8.2）               |
| `SThemeSettingsPanel` | `theme-settings-panel` | Compact 聚合 | 聚合上述控件的设置主体内容（无容器壳，容器由调用方提供）       |

### 4.2 `SThemeSettingsPanel`（核心组合）

**目标**：一个真实应用可复用、可自定义编排的主题设置**主体内容**，替代 playground 内部 `theme-configurator.vue`。**不承担容器形态**（popover/drawer/侧栏等），只渲染设置内容本身，让调用方自由决定放入何种容器。

```ts
// packages/ui/src/components/theme-settings-panel/types.ts
export interface ThemeSettingsPanelProps {
  /** 展示的分组（默认全部） */
  sections?: ('mode' | 'palette' | 'radius' | 'size' | 'scheme' | 'advanced')[];
  /** 透传给底层控件的尺寸 */
  size?: ThemeSize;
  /** 是否启用持久化（默认跟随 ConfigProvider persistTheme） */
  persist?: boolean;
  /** 是否显示底部操作区（保存预设 / 重置）；默认 true */
  showActions?: boolean;
}
```

**内部组成**：

- **状态**：`useThemeSettings`（`theme/use-theme-settings.ts`，初始化自 `useTheme().theme`，`apply` 接 `useTheme().setThemeState`）；
- **UI**：纯**分组布局 + 各控件**（无 SPopover/SDrawer 壳）；底部“保存为命名预设 / 重置”操作走 `presets` / `reset`（`showActions=false` 时隐藏）。

> **容器由调用方负责**：将 `SThemeSettingsPanel` 放入 `SPopover`/`SDrawer`/自定义侧栏均可；本组件只输出设置内容，不持有浮层/抽屉状态与 `#trigger`。示例：
>
> ```vue
> <SPopover>
>   <template #trigger><SButton>主题设置</SButton></template>
>   <SThemeSettingsPanel :sections="['mode','palette','radius']" />
> </SPopover>
> ```

**分组与控件映射**：

| 分组     | 控件                                                               | 写入字段                                                      |
| -------- | ------------------------------------------------------------------ | ------------------------------------------------------------- |
| mode     | `SThemeModeToggle`                                                 | `mode`                                                        |
| palette  | `SThemePalettePicker`（base + primary）                            | `base` / `primary`                                            |
| radius   | `SThemeRadiusPicker`                                               | `radius`                                                      |
| size     | `SThemeSizePicker`                                                 | `size`                                                        |
| scheme   | `SThemeSchemeSelect` ×3（feedback/chart/sidebar，含预设预览）      | `feedback` / `chart` / `sidebar`                              |
| sidebar  | `SThemeSidebarToggle`（Switch，控制是否启用独立 sidebar skin）     | `sidebarDerive`（§5.8.2）                                     |
| advanced | 折叠：levels/menuColor/menuAccent + 全量 variants 联动覆盖（§5.6） | `lightLevel`/`darkLevel`/`menuColor`/`menuAccent`/`overrides` |

### 4.3 `SThemePalettePicker`（色板选择）

```ts
export interface ThemePalettePickerProps {
  /** base（中性）或 primary（品牌） */
  palette: 'base' | 'primary';
  modelValue?: BaseColorKey | PrimaryColorKey;
  /** 可选：自定义候选（默认取注册表 builtin*PresetKeys） */
  items?: ThemePaletteKey[];
  /** 允许从种子色新增自定义 palette（SColorPicker → generatePalette → registerThemePresets） */
  allowCustom?: boolean;
}
```

- **UI 层 composable** `useThemePalettePicker`（`theme/use-theme-palette-picker.ts`）：候选来自 `getRegistry()`（`base`/`primary` 键集合）；`allowCustom` 时提供“自定义”入口 → `@soybeanjs/colord` `generatePalette(seedColor, format)` 生成 ramp → 组装 `ThemePalette` → `registerThemePresets({ base/primary: { name: palette } })` → 选中该 key；
- **UI 组件**：`SColorSwatchPicker` 风格网格（圆点/方块 + 名称 tooltip），自定义项触发 `SColorPicker`。

---

## 5. 场景二：主题商店组件

围绕 `ThemePackage` 的浏览、预览、应用、自定义/新建。商店应用（第三方或未来 ThemeShop 产品）用这些积木组装。

### 5.1 组件清单

| 组件                   | 文件名                  | 模式         | 说明                                                     |
| ---------------------- | ----------------------- | ------------ | -------------------------------------------------------- |
| `SThemeCard`           | `theme-card`            | Multi-slot   | 单主题卡片：预览缩略 + 名称/meta + 应用按钮              |
| `SThemeGallery`        | `theme-gallery`         | Compact 聚合 | 主题网格：浏览 + 选中预览 + 应用                         |
| `SThemePreview`        | `theme-preview`         | Compact 聚合 | 隔离预览面（迷你组件集反映该主题）                       |
| `SThemeCustomizer`     | `theme-customizer`      | Compact 聚合 | 完整自定义/新建主题（生成器产品化），输出 `ThemePackage` |
| `SThemePackageActions` | `theme-package-actions` | Single-class | 导出/导入/另存主题包（ThemePackage JSON）                |

### 5.2 `SThemeCard`

```ts
export interface ThemeCardProps {
  pkg: ThemePackage;
  applied?: boolean;
  selected?: boolean;
  /** 卡片内预览面使用的主题（默认解析 pkg） */
  previewOptions?: ThemeOptions;
}
```

- **UI 层组合**：`useThemePackage(pkg)` → `resolved` → `useThemePreview` 渲染隔离缩略；
- **UI 组件**：`SCard` 布局 + `#preview`（默认迷你按钮/卡片渲染）/ `#content`（meta）/ `#actions`（应用/收藏）。

### 5.3 `SThemeGallery`

```ts
export interface ThemeGalleryProps {
  themes?: ThemePackage[]; // 主题列表
  appliedName?: string;
  columns?: number; // 网格列数
}
```

- **UI 层 composable** `useThemeGallery`（`theme/use-theme-gallery.ts`）：列表 + 选中 + 应用态；
- **UI**：响应式网格渲染 `SThemeCard`，点击“应用” → `useThemePackage.apply`（register extras + 应用到宿主运行时）。

### 5.4 `SThemePreview`（隔离预览）

核心诉求：**在嵌套 scope 中预览主题，不污染运行时主主题**。

```ts
export interface ThemePreviewProps {
  options: ThemeOptions; // 待预览主题
  /** 演示插槽：用预览主题渲染的迷你组件集 */
  // #default 提供已生效的预览 scope
}
```

实现：

- 内部嵌套一个 **`SConfigProvider :theme="options"`**（或未来 `ThemeProvider`），使子插槽组件消费 `useTheme()` 时拿到的是预览主题；
- `useThemePreview` 把 `createTheme(options)` 的 CSS 注入到预览容器内的 `<style data-theme-preview>`，卸载时清理；
- 从而**预览与运行时主题完全隔离**，多主题卡片可并排对比。

### 5.5 `SThemeCustomizer`（自定义/新建主题）

把 playground `theme-generator/` 产品化为可复用组件，输出 `ThemePackage`。这是场景二里最重的组件。

```ts
export interface ThemeCustomizerProps {
  modelValue?: ThemePackage; // 受控：正在编辑的包
  /** 编辑模式：new（从默认开始）/ edit（改现有） */
  mode?: 'new' | 'edit';
  /** 是否包含“预览”分栏 */
  showPreview?: boolean;
  /** 语言（默认继承 ConfigProvider locale） */
  locale?: string;
}

// emits: update:modelValue / save / export
```

**内部组成**：

- **UI 层 composable**：`useThemeSettings`（编辑全量配置）+ `useThemePackage.buildFromSettings`（产出 `ThemePackage`）+ `useThemeVariants`（§5.6 双栏联动数据）；`extras`（新增 palette/scheme）经 `registerThemePresets` 注册；
- **UI**：三栏布局 —— 左 `Theme Generator`（§5.6.1 高层配置）、右 `全量 variants`（§5.6.2 联动覆盖）、`SThemePreview` 实时预览；
- **联动模型**：左栏生成结果 → 右栏派生默认值；右栏逐 token 绑定 `overrides`，无值即集成左栏派生结果（详见 §5.6）；
- 输出 `ThemePackage` 给 `SThemePackageActions` 导出/保存。

### 5.6 全量 variants 联动数据模型（`SThemeCustomizer` / 面板 advanced 共用）

**目标**：让“高层配置（Theme Generator）的派生结果”与“底层逐 token 覆盖（overrides）”**双向联动**，而非两套互相割裂的 UI。下列模型由 `SThemeCustomizer` 与 `SThemeSettingsPanel` 的 advanced 分组共用。

```ts
// packages/ui/src/theme/use-theme-variants.ts
export type VariantGroupKey = 'surfaces' | 'palette' | 'hairlines' | 'sidebar' | 'charts' | 'feedback';

export interface VariantTokenMeta {
  key: ColorKey;
  group: VariantGroupKey;
  /** 派生来源：base（中性预设）/ primary / scheme（feedback·chart·sidebar） */
  source: 'base' | 'primary' | 'scheme';
  /** 随 Background Shade（lightLevel/darkLevel）联动 */
  shadeLinked?: boolean;
  /** 国际化 label key，如 'theme.variant.background' */
  i18n: I18nKey;
}

export interface UseThemeVariantsReturn {
  groups: VariantGroupMeta[]; // 分组 → tokens
  derived: ComputedRef<Record<ColorKey, ColorValue>>; // 来自左栏 Generator 的派生结果
  getOverride: (key: ColorKey) => Ref<ColorValue | ''>; // 绑定 overrides[key]
  /** 合并规则：override 有值用 override，否则回落 derived */
  final: ComputedRef<Record<ColorKey, ColorValue>>;
  /** 是否有用户显式覆盖 */
  hasOverrides: ComputedRef<boolean>;
  clearOverride: (key: ColorKey) => void;
}
```

#### 5.6.1 Background Shade 扩展：base 派生 token 全量映射

playground 的 Background Shade（`lightLevel`/`darkLevel`）仅作用于 3 个 surface；本设计扩展为**完整 base 表面族**。下列 token 全部由 base 预设派生（数据源 `deriveBasePreset`），带 **Shade** 标记者会随 `lightLevel`/`darkLevel` 偏移，未带者由 base 色板直接派生：

| 分组          | token                                                                                           | 派生值（light / dark）                             | Shade |
| ------------- | ----------------------------------------------------------------------------------------------- | -------------------------------------------------- | ----- |
| Surfaces      | `background`                                                                                    | base.50 / base.950                                 | ✓     |
|               | `card`                                                                                          | base.50 / base.900                                 | ✓     |
|               | `popover`                                                                                       | base.50 / base.900                                 | ✓     |
|               | `foreground`                                                                                    | base.900 / base.50                                 |       |
|               | `cardForeground`                                                                                | base.900 / base.50                                 |       |
|               | `popoverForeground`                                                                             | base.900 / base.50                                 |       |
| Palette       | `secondary`                                                                                     | base.100→200 / base.900→800                        | ✓     |
|               | `secondaryForeground`                                                                           | base.900 / base.50                                 |       |
|               | `muted`                                                                                         | base.100→200 / base.900→800                        | ✓     |
|               | `mutedForeground`                                                                               | base.500 / base.400                                | ✓     |
|               | `accent`                                                                                        | base.100→200 / base.900→800                        | ✓     |
|               | `accentForeground`                                                                              | base.900 / base.50                                 |       |
| Hairlines     | `border`                                                                                        | base.200 / DARK_BORDER                             |       |
|               | `input`                                                                                         | base.200 / DARK_INPUT                              |       |
| Feedback-Fg   | `destructiveForeground`/`successForeground`/`warningForeground`/`infoForeground`                | base.50 / base.900                                 |       |
|               | `carbon` / `carbonForeground`                                                                   | base.800 / base.100；base.50 / base.900            |       |
| Sidebar(下游) | `sidebar`/`sidebarForeground`/`sidebarPrimary`/`sidebarAccent`/`sidebarBorder`/`sidebarRing` 等 | 自 surface 族下游派生（仅当 `sidebarDerive=true`） | ✓     |

> `primary`/`ring` 来自 primary 预设（`derivePrimaryPreset`，neutral/chromatic 双族）；`destructive`/`success`/`warning`/`info` 来自 feedback scheme；`chart1..5` 来自 chart scheme。这三类由 `source: 'primary' | 'scheme'` 标记，不在 base 表面族内。
>
> Sidebar 特殊：当 `sidebarDerive=false`（§5.8.2 的 Switch 关闭）时，sidebar token **不派生**，直接取 base 的 `background`/`foreground`/`border` 等（即无独立 sidebar skin）；当 `sidebarDerive=true` 时按 `sidebar` scheme（`derived` 或命名预设）派生。

#### 5.6.2 双栏联动：派生默认值 + overrides 覆盖

```
┌───────────────────────────────┬──────────────────────────────────────┐
│ 左栏 Theme Generator          │ 右栏 全量 variants（联动）             │
│  Base / Primary / Mode        │  Surfaces / Palette / Hairlines /     │
│  Background Shade(light/dark) │  Sidebar / Charts / Feedback          │
│  Radius / Size / Menu / Scheme│  每行: [色块·派生默认值] [覆盖输入]     │
│                               │  override 为空 → 集成左栏派生结果      │
│                               │  override 有值 → 写入 overrides[key]   │
└───────────────────────────────┴──────────────────────────────────────┘
```

**联动规则**：

- `useThemeVariants` 为每个 token 提供 `derived`（左栏 `resolved` 派生默认值）与 `override`（绑定 `state.overrides[key]`）双通道；
- 每行默认展示 `derived` 色块（`SColorSwatch` + hex）；用户编辑该行 → 写入 `override`（`SColorPicker`）；再次清空 → 回落 `derived`；
- **合并规则**：`final[key] = override[key] !== '' ? override[key] : derived[key]`；
- 于是左栏任何改动 → 右侧所有 `derived` 实时刷新；未被覆盖的 token 自动集成最新派生结果；已被覆盖的 token 保持用户值，仅当清空才回落——这就是“全量 variants 联动数据”。

**输出**：`ThemePackage.overrides` 仅含用户**显式覆盖**的稀疏项（与 `spec` 派生结果分离），对齐 redesign §8 的 overrides/spec 分离语义；`resolved` 始终消费合并后的 `final`。

### 5.7 `SThemePackageActions`

```ts
export interface ThemePackageActionsProps {
  pkg: ThemePackage;
}
// slots: 触发按钮
```

- 导出：`useThemePackage.serialize()` → 下载 `.theme.json`（或复制到剪贴板）；
- 导入：文件/文本 → `useThemePackage.parse` 校验 → `register` → 应用；
- 另存为命名预设：`spec` + `overrides` 固化为 `StoredThemePreset`（复用 `setStoredThemePreset`）。

### 5.8 内置预设体系（feedback / sidebar / chart）

本设计为三类**语义 scheme**（`feedback` / `chart` / `sidebar`，均为 `@soybeanjs/theme` 的 `ThemePresetRegistry` 分节）提供**系统内置预设**，并集成进主题配置组件。数据来源参照 main 分支 `packages/shadcn-theme` 的预设定义，统一遵循**一致性 / 美观性 / 实用性**三原则筛选。

> **沉淀位置**：三类内置预设作为引擎内置项写入 `packages/theme/src/registry.ts` 的 `builtinRegistry`（当前 feedback 仅 `classic`、chart 仅 `vivid`、sidebar 仅 `derived`），组件只做选择与预览。自定义预设仍走 `registerThemePresets` 扩展点。

#### 5.8.1 Feedback：5 个内置预设

从 shadcn-theme 的 15 个 feedback 预设中选出 5 个（`classic`/`vivid`/`subtle`/`modern`/`professional`），覆盖“标准 / 鲜艳 / 柔和 / 现代 / 商务”五大使用面，其余 10 个因过于细分、对比度不足或与选中项语义重叠而排除：

| Key            | 适用面                         | light（destructive/success/warning/info）       | dark                                            |
| -------------- | ------------------------------ | ----------------------------------------------- | ----------------------------------------------- |
| `classic`      | 通用标准（默认，保留引擎默认） | red.500 / green.500 / amber.500 / blue.500      | red.400 / green.400 / amber.400 / blue.400      |
| `vivid`        | 年轻化/创意，高饱和            | red.500 / emerald.500 / amber.500 / sky.500     | red.400 / emerald.400 / amber.400 / sky.400     |
| `subtle`       | 高端/优雅，低对比              | rose.500 / emerald.500 / amber.500 / indigo.500 | rose.300 / emerald.300 / amber.300 / indigo.300 |
| `modern`       | SaaS/科技，现代                | red.500 / emerald.500 / orange.500 / sky.500    | red.400 / emerald.400 / orange.400 / sky.400    |
| `professional` | 企业/B2B，稳重大气             | red.500 / green.600 / amber.600 / blue.600      | red.300 / green.300 / amber.300 / blue.300      |

> 每个预设为 `SemanticScheme<ColorValue>`，作为 `builtinRegistry.feedback` 的条目；light/dark 各自维护（深色下抬升亮度保证对比）。选型原则：`classic` 保底、`vivid` 与 `subtle` 提供对比两极、`modern` 与 `professional` 覆盖主流产品形态。

#### 5.8.2 Sidebar：派生开关 + 内置预设 + 反转深色

**（a）派生开关 `sidebarDerive`**

新增 `ThemeConfigState.sidebarDerive: boolean`（默认 `true`）。由 `SThemeSidebarToggle`（`SSwitch`）控制：

- `true`（默认）：应用 `sidebar` scheme（`derived` 或命名预设），sidebar 拥有独立 skin（含 §5.6.1 的下游派生）；
- `false`：**不派生**，sidebar 退化为 base token（`background`/`foreground`/`border`），即“无独立侧边栏样式”。

> 语义上即 shadcn-theme `generateSidebarPreset` 的开关化：开启时按 base⊕primary 表面族生成 sidebar 色，关闭时直接沿用主题背景。

**（b）内置 sidebar 预设**

shadcn-theme 仅提供 `extended`（即本引擎的 `derived`）一种 sidebar 派生；本设计在其之上扩展命名预设（`builtinRegistry.sidebar`），均用 `SidebarColorValue`（可为色值或 base 派生 token 引用 `SidebarTokenRef`）表达：

| Key             | light（sidebar/foreground/accent/border 摘要）    | dark                                      | 说明                                         |
| --------------- | ------------------------------------------------- | ----------------------------------------- | -------------------------------------------- |
| `derived`       | background / foreground / accent / border         | card / foreground / accent / border       | 默认，跟随 base⊕primary 表面族               |
| `inverted-dark` | zinc.950 / zinc.50 / zinc.900 / zinc.800          | zinc.900 / zinc.100 / zinc.800 / zinc.700 | **反转深色**：全局 light 下 sidebar 呈现深色 |
| `soft`          | secondary / secondaryForeground / accent / border | muted / foreground / accent / border      | 柔和浅色 skin，与背景轻微区分                |
| `contrast`      | foreground / background / primary / border        | foreground / card / primary / border      | 高对比皮肤（文字底反转）                     |

**（c）`inverted-dark`（反转深色）——特别实现**

核心需求：**全局 light 模式下，sidebar 呈现深色主题效果**。实现要点：

- 该 scheme 的 **light 槽**填充深色面（sidebar=zinc.950、foreground=zinc.50、accent=zinc.900、border=zinc.800），故在全局 light（`:root`/light）下 sidebar 即为深色；
- **dark 槽**仍保持深色（zinc.900 等），因此在全局 dark 下 sidebar 也维持深色——深色皮肤在双模式下恒定，符合导航侧栏“沉浸深色”惯例；
- `sidebarPrimary` 等品牌 token 引用 `primary`/`primaryForeground`（`SidebarTokenRef`），保证与主品牌一致；
- 仅当 `sidebarDerive=true` 时生效；关闭则回落到背景同色。

**（d）组件集成**

- `SThemeSidebarToggle`：`SSwitch`，`modelValue` 绑定 `sidebarDerive`；关闭时禁用 sidebar scheme 选择；
- `SThemeSchemeSelect`（sidebar 维度）：列出 `derived`/`inverted-dark`/`soft`/`contrast`，选项内嵌 `SSidebarPreviewSwatch`（mini 侧栏色块），选中即应用；
- `SThemePreview` 的 sidebar 演示面在 `sidebarDerive` 开启且选中 `inverted-dark` 时渲染深色侧栏，直观反映该预设。

#### 5.8.3 Chart：5 个内置图表预设

参照 shadcn-theme 图表标准（`chart1..chart5` 五色分类色板，light 用中深阶、dark 用亮阶以保证对比与可辨性），定义 5 个 `chart` scheme（`builtinRegistry.chart`）：

| Key       | 风格                   | light（chart1..chart5）                                   | dark                                                       |
| --------- | ---------------------- | --------------------------------------------------------- | ---------------------------------------------------------- |
| `vivid`   | 默认，多彩分类（保留） | orange.600 / teal.600 / cyan.900 / amber.400 / amber.500  | blue.700 / emerald.500 / amber.500 / purple.500 / rose.500 |
| `cool`    | 冷色（科技/数据）      | blue.700 / cyan.600 / sky.500 / indigo.500 / violet.500   | sky.300 / cyan.300 / blue.300 / indigo.300 / violet.300    |
| `warm`    | 暖色（营销/运营）      | orange.600 / amber.500 / rose.500 / red.600 / orange.400  | orange.300 / amber.300 / rose.300 / red.300 / orange.200   |
| `natural` | 自然（健康/环保）      | green.600 / emerald.500 / teal.600 / lime.500 / cyan.600  | green.300 / emerald.300 / teal.300 / lime.300 / cyan.300   |
| `minimal` | 低饱和（企业/极简）    | slate.500 / blue.400 / emerald.400 / amber.400 / rose.400 | slate.300 / blue.300 / emerald.300 / amber.300 / rose.300  |

> 与整体主题一致性：`chart` scheme 与 `primary`/`feedback` 正交，可独立切换；`vivid` 沿用当前引擎默认；其余 4 个在 hue 分布、light/dark 对比上保持同构。

**组件集成**：

- `SThemeSchemeSelect`（chart 维度）：列出 5 预设，选项内嵌 `SChartPreviewSwatch`（5 段迷你图例条）；
- `SThemePreview` 内置一个迷你图表（复用 `SBarChart`/`SAreaChart` 系列）以当前 `chart` scheme 渲染，直观反映所选图表预设；
- 与 §5.6 联动：`chart1..chart5` 属 `source: 'scheme'` 派生，可在右栏逐 token 覆盖。

#### 5.8.4 统一选择 UI：`SThemeSchemeSelect`（增强）

`SThemeSchemeSelect` 由纯下拉升级为**带预览的选择器**，三类维度共用：

```ts
export interface ThemeSchemeSelectProps {
  /** feedback | chart | sidebar */
  kind: 'feedback' | 'chart' | 'sidebar';
  modelValue?: FeedbackSchemeKey | ChartSchemeKey | SidebarSchemeKey;
  /** 候选（默认取 builtin*SchemeKeys，含内置 5/4/5 预设） */
  items?: string[];
  /** 是否允许自定义方案（registerThemePresets） */
  allowCustom?: boolean;
  /** 禁用（如 sidebarDerive=false 时禁用 sidebar 维度） */
  disabled?: boolean;
  /** 预览插槽：默认按 kind 渲染色块/图例 */
  #preview?: (preset) => VNode;
}
```

- 每个候选行：`name`（i18n）+ `#preview` 色块（feedback 4 段 / chart 5 段 / sidebar mini 侧栏）；
- 选中即写 `state.feedback`/`state.chart`/`state.sidebar`；`allowCustom` 打开 `SColorPicker` 自定义 → `registerThemePresets` 注册后可选。

---

## 6. 数据流、持久化与 SSR

### 6.1 数据流总览

```
用户操作 → S* 组件
         → useThemeSettings.setState/overrides      (应用内)
         → useThemePackage.apply                    (商店)
                ↓
         resolved: ThemeOptions
                ↓
   ┌─ 运行时: apply() → useTheme().setThemeState / SConfigProvider theme
   └─ 预览:   createTheme(options) → 注入隔离 <style>
                ↓
         持久化: setStoredThemeConfig / setStoredThemePreset (localStorage)
```

### 6.2 持久化策略（对齐 config-provider-theme-persist-plan）

| 层                                       | 承载                               | 是否含 overrides | 用途                       |
| ---------------------------------------- | ---------------------------------- | ---------------- | -------------------------- |
| localStorage `THEME_STORAGE_KEY`         | `ThemeConfigState`（含 overrides） | 含               | 应用内运行时配置（策略 X） |
| localStorage `THEME_PRESETS_STORAGE_KEY` | `StoredThemePreset` 表             | 含               | 命名可复用预设（策略 Y）   |
| localStorage（extras）                   | 自定义 palette/scheme 注册数据     | —                | 商店自定义主题恢复         |

**SSR**：颜色 CSS 客户端注入；`createThemeInitScript` 内联脚本首帧前从 localStorage 应用主题；应用内组件写 `ThemeConfigState`，商店组件 `extras` 持久化后在 SSR 恢复时重新 `registerThemePresets`（对齐 redesign §7.2 的 `createThemeStore` 重放职责）。

### 6.3 国际化适配

主题配置组件含大量面向用户的文案（控件标签、分组名、palette/scheme 选项名、variant token 名、操作按钮），需随库内建 locale 走，**不硬编码于组件内**。

**策略**：复用 `@soybeanjs/ui` 既有 locale 能力（`useLocale` / `ConfigProvider :locale` / `useNs` 命名空间），在每个组件内通过 `useI18n` 读取，`locale` prop 显式传入时覆盖上下文化名。

**文案命名空间**：`ui.theme`（`packages/ui/src/locale/*.ts` 增加 `theme` 段）。

```ts
// packages/ui/src/locale/en-US.ts（示意）
theme: {
  // 控件标签
  appConfig: 'Theme Settings',
  mode: 'Mode',
  palette: 'Palette',
  base: 'Base',
  primary: 'Primary',
  radius: 'Radius',
  size: 'Size',
  scheme: 'Scheme',
  backgroundShade: 'Background Shade',
  menu: 'Menu',
  advanced: 'Advanced',
  savePreset: 'Save as preset',
  reset: 'Reset',
  apply: 'Apply',
  export: 'Export',
  import: 'Import',
  custom: 'Custom',
  // 分组名
  group: {
    surfaces: 'Surfaces',
    palette: 'Palette',
    hairlines: 'Hairlines',
    sidebar: 'Sidebar',
    charts: 'Charts',
    feedback: 'Feedback'
  },
  // variant token 名（ColorKey → label）
  variant: {
    background: 'Background',
    foreground: 'Foreground',
    card: 'Card',
    primary: 'Primary',
    // … 覆盖全部 COLOR_VARIABLES 键
  },
  // 派生来源标注
  source: { base: 'From base', primary: 'From primary', scheme: 'From scheme' },
  // 空 override 提示
  overridePlaceholder: 'Inherited from configuration',
  // 内置预设名（feedback / chart / sidebar）
  feedbackPreset: {
    classic: 'Classic',
    vivid: 'Vivid',
    subtle: 'Subtle',
    modern: 'Modern',
    professional: 'Professional'
  },
  chartPreset: {
    vivid: 'Vivid',
    cool: 'Cool',
    warm: 'Warm',
    natural: 'Natural',
    minimal: 'Minimal'
  },
  sidebarPreset: {
    derived: 'Derived',
    'inverted-dark': 'Inverted Dark',
    soft: 'Soft',
    contrast: 'Contrast'
  },
  // 语义维度标签
  dimension: { feedback: 'Feedback', chart: 'Charts', sidebar: 'Sidebar' },
  sidebarDerive: 'Enable sidebar style'
}
```

**要点**：

- **variant token 名**由 `VariantTokenMeta.i18n` 指向 `theme.variant.<key>`，`useThemeVariants` 在渲染时解析；新增 token 只需在 locale 补 key，无需改组件；
- `SThemePalettePicker` 的 palette/scheme 选项名默认取注册表内置键（`baseOptions`/`primaryOptions` 的 `label: key`），提供 `labelResolver` prop 供接入方自定义展示（如 `primary.booster` → “Booster”）；自定义 palette 名由生成时传入的 `name` 承载（不参与翻译）；
- `SThemeCustomizer` / `SThemeSettingsPanel` 各接收 `locale` prop，默认继承 `ConfigProvider` locale；未接入 ConfigProvider 时回落 `useLocale()` 默认（en-US）；
- 组件边界文案（如 “Save as preset”）走 `theme.*` 命名空间；**变量名**（`--background` 等 CSS 变量）与**色值**始终不翻译；
- **内置预设名**（`feedbackPreset`/`chartPreset`/`sidebarPreset`）走 locale；`SThemeSchemeSelect` 的候选行名优先从对应命名空间解析，未命中（如自定义 scheme）回落为 key 本身。

---

## 7. 与既有系统/决策的一致性

| 既有项                                                                        | 关系                                                                                                                                                                                                     |
| ----------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useTheme()` / `SConfigProvider`                                              | 场景一控件的运行时上下文来源；`ThemeContext` 需**补齐可写的 feedback/chart/sidebar/levels/menu/overrides**（现状仅 base/primary/radius/size/mode 可写）                                                  |
| [ADR-8](adr/0008-theme-provider-architecture.md) ThemeProvider/ThemeGenerator | 本设计的 `SThemeSettingsPanel`/`SThemeCustomizer` 与 ADR-8 的 Generator 互补：本设计面向**配置编辑**，ADR-8 面向**渲染**；未来 ThemeProvider 拆分后，场景一控件改为消费 ThemeProvider 上下文（契约不变） |
| [redesign §8](theme-config-model-redesign.md) `ThemePackage`                  | 场景二的一等公民类型，`useThemePackage` 直接承载                                                                                                                                                         |
| `@soybeanjs/headless`                                                         | **不新增**。主题配置属 UI 层职责；仅复用其已有的样式无关基元（颜色/表单交互）之上的 UI 控件                                                                                                              |
| playground `theme-configurator.vue` / `theme-generator/`                      | 作为实现参照；落地后逐步迁移到新组件，避免双实现                                                                                                                                                         |
| 颜色控件（SColorPicker/SColorSwatchPicker 等）                                | 底层原语，`SThemePalettePicker`/`SThemeCustomizer` 复用                                                                                                                                                  |

---

## 8. 实施路径（分阶段）

### 阶段 0：引擎内置预设（`packages/theme`，先决条件）

0a. 在 `packages/theme/src/registry.ts` 的 `builtinRegistry` 中补齐内置预设：`feedback` 增补 `vivid`/`subtle`/`modern`/`professional`（保留 `classic`）；`chart` 增补 `cool`/`warm`/`natural`/`minimal`（保留 `vivid`）；`sidebar` 增补 `inverted-dark`/`soft`/`contrast`（保留 `derived`）—— 取值见 §5.8；
0b. `ThemeConfigState` 增加 `sidebarDerive: boolean`（默认 `true`），接入 `resolveTheme` 的 sidebar 分支（`false` 时不派生 sidebar token，退化为 base token）；
0c. 更新 `builtinFeedbackSchemeKeys`/`builtinChartSchemeKeys`/`builtinSidebarSchemeKeys` 快照。

### 阶段 1：UI 层状态 composable（`theme/`）

1. `useThemeSettings`（state/overrides/resolved/commit/reset/presets），配引擎存储与色值校验；
2. `useThemePackage`（register/resolved/apply/serialize/parse/buildFromSettings）；
3. `useThemePreview`（隔离 CSS 注入）；
4. `useThemeVariants`（§5.6 派生映射 + 联动覆盖模型）。
5. 单元测试（§9）。

### 阶段 2：应用内控件（场景一）

5. `SThemeModeToggle` / `SThemeRadiusPicker` / `SThemeSizePicker` / `SThemeSchemeSelect`（Single-class，薄封装；`SThemeSchemeSelect` 含预设预览色块）；
6. `SThemeSidebarToggle`（`SSwitch`，绑定 `sidebarDerive`）；
7. `SThemePalettePicker`（composable + 自定义 palette 注册）；
8. `SThemeSettingsPanel`（Compact 聚合，接入 `useTheme()`）。
9. playground 迁移 `theme-configurator.vue` 到 `SThemeSettingsPanel`。

### 阶段 3：主题商店积木（场景二）

10. `SThemeCard` / `SThemeGallery`（浏览 + 预览 + 应用）；
11. `SThemePreview`（隔离预览面，含 feedback/chart/sidebar 演示面）；
12. `SThemeCustomizer`（生成器产品化）+ `SThemePackageActions`（导入导出）。
13. playground 迁移 `theme-generator/` 到 `SThemeCustomizer`。

### 阶段 4：国际化与收尾

14. 在 `@soybeanjs/ui` locale 包新增 `theme` 命名空间（`../locale/<lang>.ts`），覆盖控件/分组/variant token/内置预设名（§5.8、§6.3）；
15. 文档（API 注释 + docs 页面 + playground examples）；`pnpm sui ui` / `pnpm sui api` 同步生成数据（无 headless 导出变更，若需可跳过 `pnpm sui headless`）。

---

## 9. 测试策略

### 9.1 UI 状态层 composable（vitest 单测）

| 用例                                   | 断言                                                                                   |
| -------------------------------------- | -------------------------------------------------------------------------------------- |
| `useThemeSettings.setState` 局部更新   | `state` 不可变更新，`resolved` 正确派生                                                |
| `overrides` 非法色值                   | 不进入 `state.overrides`                                                               |
| `commit` 持久化                        | 写入 `THEME_STORAGE_KEY`（mock storage）                                               |
| `useThemePackage.parse` 合法/非法 JSON | 合法返回包，非法返回 `null`                                                            |
| `useThemePackage.apply` 带 extras      | `registerThemePresets` 被调用且幂等                                                    |
| `useThemePreview`                      | 注入的 CSS 与 `createTheme` 输出一致，卸载清理                                         |
| `useThemeVariants.derived`             | base 派生映射与 `deriveBasePreset` 一致（含 Background Shade 偏移）                    |
| `useThemeVariants.final` 合并          | override 有值取 override，空回落 derived                                               |
| `useThemeVariants` 联动                | 左栏改动 → 未覆盖 token 的 `derived` 实时刷新                                          |
| 内置预设可用性                         | `getRegistry().feedback/chart/sidebar` 含 §5.8 全部内置键，builtin*SchemeKeys 快照一致 |
| `sidebarDerive` 开关                   | `false` 时 sidebar token 退化为 base；`true` 且 `inverted-dark` 时 light 槽为深色      |

### 9.2 UI（vue-test-utils 组件测试）

| 用例                               | 断言                                                                          |
| ---------------------------------- | ----------------------------------------------------------------------------- |
| `SThemeSettingsPanel` 变更 primary | emit/apply 到运行时主题，持久化写入                                           |
| `SThemePalettePicker` 自定义色板   | `registerThemePresets` 新增项，选中生效                                       |
| `SThemeGallery` 应用主题           | 应用到宿主运行时                                                              |
| `SThemePreview` 隔离性             | 预览 `<style>` 与运行时主题互不污染                                           |
| `SThemeSchemeSelect` 预设预览      | feedback 4 段 / chart 5 段色块渲染正确，选中写 `state.feedback/chart/sidebar` |
| `SThemeSidebarToggle`              | 切换 `sidebarDerive` → sidebar 方案选择禁用/启用，预览随之刷新                |
| `SThemeCustomizer` 双栏联动        | 左栏改 Shade → 右栏未覆盖 token 刷新；覆盖后保持                              |
| `ThemePackage.overrides` 稀疏性    | 仅含用户显式覆盖项，与 spec 派生分离                                          |
| 组件文案国际化                     | 切换 `locale` → 控件/分组/variant 名随之翻译                                  |

### 9.3 浏览器 e2e（vitest-browser + axe）

- 应用内面板改色 → 页面 CSS 变量实时变化、无对比度事故；
- 商店自定义器新建主题 → 导出导入往返一致、预览无 FOUC；
- 切换 feedback/chart/sidebar 内置预设 → 页面对应 token 变化、预览正确、无对比度事故（含 `inverted-dark` 在 light/dark 双模式下的可读性）。

---

## 10. 开放问题

1. **`ThemeContext` 补齐可写字段**：feedback/chart/sidebar/levels/menu/overrides 直接补进 `useTheme()`，还是由 `useThemeSettings` 自持 state 再 `setThemeState` 回写？倾向后者（`useTheme()` 保持精简，避免每个 ConfigProvider 都背完整状态）。
2. **自定义 palette 持久化形态**：`extras`（palette/scheme 数据）存 localStorage 的表结构尚未定稿（redesign §7.2 预留），阶段 3 需先定 `StoredThemeExtras` 类型。
3. **`SThemeSettingsPanel` 是否默认开持久化**：对齐 `ConfigProvider.persistTheme`（默认 false）还是独立开关？倾向面板内 `persist` 默认 true（面板出现即意味着用户在改主题）。
4. **`SThemePreview` 是否内嵌 `SConfigProvider`**：内嵌可让插槽组件自然消费预览主题，但会再跑一遍 Context；或在 UI 层用 `provideThemeContext` 注入预览 scope。倾向后者（轻量，不改 ConfigProvider 语义）。
5. **场景一控件是否依赖 `SConfigProvider` 提供上下文**：库内组件默认从 `useTheme()` 取，允许 `useThemeSettings` 显式注入，保证无 ConfigProvider 时也能用于纯预览/商店场景。
6. **theme locale 命名空间归属**：`theme` 段并入 `@soybeanjs/ui` 现有 locale 包，还是独立 `theme` locale 文件仅在涉及主题组件时按需加载（避免所有使用 `@soybeanjs/ui` 的应用都携带主题文案）？倾向后者（按需）。
7. **自定义 palette/scheme 名的翻译策略**：内置键走 locale，运行时自定义名不翻译；是否提供 `labelResolver` 让接入方统一接管（含自定义名）？
8. **内置预设的沉淀方式**：三类预设（feedback 5 / chart 5 / sidebar 4）作为引擎 `builtinRegistry` 内置项（需改引擎 registry.ts），还是由主题组件在初始化时 `registerThemePresets` 注入？倾向**引擎内置**（保证 `createTheme` 无注册也能解析、SSR 稳定），组件零注册逻辑。
9. **`inverted-dark` 的色板固定值**：当前用 `zinc.xxx` 字面值，未随 `base` 切换。是否改为 `SidebarTokenRef`/动态映射（如取 base 深色档），使反转深色随 base 变化保持一致？倾向后者（用 base 深色档，避免与 base 冲突）。
10. **chart 5 预设取值校验**：`cool`/`warm`/`natural`/`minimal` 的色板为设计初稿，需在实际图表上目测校验对比与可辨性后再定稿（§5.8.3 标注）。
