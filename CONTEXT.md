# CONTEXT

> 主题体系领域术语表。仅收录术语与精确定义，不含实现细节。
> 相关实现方案见 [docs/theme-refactor-plan.md](docs/theme-refactor-plan.md)、[docs/theme-presets-plan.md](docs/theme-presets-plan.md)、[docs/config-provider-theme-persist-plan.md](docs/config-provider-theme-persist-plan.md) 与 [docs/theme-provider-plan.md](docs/theme-provider-plan.md)。

## 主题（theme）

一套完整的视觉令牌集合，覆盖全部 39 个 CSS 语义变量（light/dark 各一份）。`@soybeanjs/theme` 是主题生成引擎，`@soybeanjs/theme-presets` 是外部预设数据包。

## 引擎（engine）

`@soybeanjs/theme` 包。持有内置基线（核心 token 模板 + 派生规则），消费外部 preset 覆盖后输出 CSS。

## 数据包（data package）

`@soybeanjs/theme-presets` 包。外部预设集合，作为"覆盖面"供引擎覆盖内置；不拥有核心数据的唯一真相源。

## 内置（builtin）

引擎内置的基线数据与规则：9 个中性 base 模板、26 个 primary 模板、固定 feedback（classic）与固定 chart 模板。

## 预设（preset）

数据包的最小单位，一个可被 `createTheme({ preset })` 消费的 token 集合（引擎 `CustomThemeColorPreset` 的实例，light/dark 各一份、字段全可选）。

## 维度（dimension）

预设的分类标识（`base` / `feedback` / `chart` / `theme`），仅用于组织与文档，不约束预设的键集。

## 核心 token（core token）

需显式声明的少数键：base 维度 10 键、primary 维度 2 键。其余 token 由派生规则补全。

## 派生 token（derived token）

由核心 token 按确定性算法补全的键（secondary、border、chart 等），可被 preset 覆盖。

## 覆盖（override）

外部 preset 对内置派生结果的替换，优先级最高。

## 官方复刻（official replica）

与引擎内置等值的预设，作为修改起点与基线测试锚点。

## 基线等值（baseline equivalence）

官方复刻预设与内置输出完全一致的性质，用作测试基准。

## 档位（level）

明暗调节的偏移量：`lightLevel`（0-2）调暗亮色、`darkLevel`（0-3）调亮暗色。预设可携带档位，引擎选项为全局覆盖。

## 持久化主题（persistTheme）

ConfigProvider 上控制是否启用持久化主题读取（localStorage / cookie）的属性，默认关闭。关闭时只消费显式 `theme` props；开启后按「显式 props > 存储配置 > 内置默认」的解析管道合并存储配置，且为 `{ presetName }` 引用解析提供前提。存储读取在组件实例初始化时解析一次并写入内存状态，后续渲染复用该状态，无需额外缓存开关。

## SSR 主题配置（themeConfig）

由应用层（如 Nuxt 的 `useRequestHeaders` + `getThemeConfigFromCookie`）从 cookie 解析后注入 ConfigProvider 的持久化配置。SSR 时作为存储配置参与合并（仅补位未显式声明的键），客户端以 localStorage 为权威源。

## 预设注册表（presetProvider）

服务端自定义 preset 解析器：把 `{ presetName }` 引用映射为 `CustomThemeColorPreset` 定义，使 SSR 无需访问 localStorage 即可渲染自定义 preset；客户端忽略，以 localStorage 的 presets 表为准。

## 持久化预设条目（StoredThemePreset）

持久化 presets 表中的最小单位：`CustomThemeColorPreset` + `name`（唯一标识，同为存储对象键）+ `version`（semver）。整体以 `StoredThemePresets`（schema `version` + 条目表）存入 `__SOYBEAN_THEME_PRESETS`（localStorage，不入 cookie）。

## 主题存储门面（ThemeStore）

`createThemeStore` 返回的统一、环境感知的主题存储门面，把持久化主题配置、自定义 presets 表、当前已应用 preset 汇聚为一个对象。所有读写按运行时环境路由：服务端读注入的 `cookieHeader`（写为 no-op），客户端读写 localStorage 与 `document.cookie`。cookie 作为跨环境同步通道，保证服务端与客户端读取一致。

## 运行时环境判断（isServerRuntime）

`isServerRuntime()` 在调用时检测全局对象（`window`/`document` 是否存在）判断服务端运行。由于 `@soybeanjs/theme` 与 UI 库为预构建产物，`import.meta.env.SSR` 在构建时被固化而无法反映消费方运行时；应用应显式传 `isServer`（如 Nuxt 的 `import.meta.server`）驱动 SSR 专用存储路径。

## 主题提供者（ThemeProvider）

`@soybeanjs/ui` 的完整主题渲染组件。接收 `tokens`（light/dark 语义 token 集合）与 `styleTarget` / `darkSelector` / `format` / `size` / `radius` / `menuColor` / `menuAccent`，将 tokens 与内置默认主题合并为完整 `ThemeColorPreset` 后经 `generateCss` 输出 CSS，并以内联 `<style>` 注入（服务端与客户端都渲染以保证水合一致）。

## 主题 token（tokens）

`ThemeProvider` 的输入，`{ light: Partial<ThemeColors>; dark?: Partial<ThemeColors> }`（即 `CustomThemeColorPreset`）。字段全可选，缺失键回退内置默认主题。可为内联 token 集合，也可为按名引用的持久化 preset（`{ presetName }`）。

## 主题生成器（ThemeGenerator）

`@soybeanjs/ui` 的预设驱动主题生成器。按 `base` / `primary` 预设 + 按分类 `overrides` + `lightLevel` / `darkLevel` 计算完整 tokens，内部渲染 `ThemeProvider`，并以插槽作用域暴露完整 tokens。

## 主题生成组合式函数（useThemeGenerator）

`@soybeanjs/headless` 的纯计算组合式函数：输入 `base` / `primary` / `overrides` / `lightLevel` / `darkLevel`，返回响应式完整 tokens。无 DOM 依赖，可单测。

## token 分类（ThemeTokenGroup）

主题 token 的组织维度：`base` / `primary` / `feedback` / `sidebar` / `chart`。仅用于组织覆盖与文档，不改变 `ThemeColors` 扁平键契约。feedback 为固定 classic 规则，不提供预设选择器，仅可按组覆盖。

## playground 主题生成器（playground ThemeGenerator）

playground 侧的可视化主题编辑组件（`apps/playground/src/components/theme-generator.vue`），**自包含 + 只输出 raw css**：`v-model:theme` 类型仍为 `ConfigProviderThemeOptions`，但每次改动只 emit `{ css: { base, light, dark } }`（即新增的 `css` 属性类型），由内部状态经 `createTheme` 派生完整 CSS 后拆分而来，写回 `SConfigProvider` 直接消费，实时生效。方向复刻 shadcnthemes 生成器的控制面板，双 tab（`Generate Theme` 可视化生成器 + `Edit Variables` 完整 ColorTokens 编辑）。与库内计划中的「主题生成器（ThemeGenerator）」不同：后者是 `@soybeanjs/ui` 的预设驱动渲染组件，前者是 playground 的编辑器，二者无代码关联。
