# CONTEXT

> 主题体系领域术语表。仅收录术语与精确定义，不含实现细节。
> 相关实现方案见 [docs/theme-refactor-plan.md](docs/theme-refactor-plan.md)、[docs/theme-presets-plan.md](docs/theme-presets-plan.md) 与 [docs/config-provider-theme-persist-plan.md](docs/config-provider-theme-persist-plan.md)。

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

ConfigProvider 上控制是否启用持久化主题读取（localStorage / cookie）的属性，默认关闭。关闭时只消费显式 `theme` props；开启后按「显式 props > 存储配置 > 内置默认」的解析管道合并存储配置，且为 `{ presetName }` 引用解析提供前提。

## 存储态内存缓存（cacheThemeConfig）

ConfigProvider 上控制「存储读取结果记忆化」的属性，默认开启。开启后在组件实例生命周期内只解析一次存储并缓存，由相关 prop 变化或跨标签页 `storage` 事件失效；仅在 `persistTheme` 开启时生效。

## SSR 主题配置（themeConfig）

由应用层（如 Nuxt 的 `useRequestHeaders` + `getThemeConfigFromCookie`）从 cookie 解析后注入 ConfigProvider 的持久化配置。SSR 时作为存储配置参与合并（仅补位未显式声明的键），客户端以 localStorage 为权威源。

## 预设注册表（presetProvider）

服务端自定义 preset 解析器：把 `{ presetName }` 引用映射为 `CustomThemeColorPreset` 定义，使 SSR 无需访问 localStorage 即可渲染自定义 preset；客户端忽略，以 localStorage 的 presets 表为准。

## 持久化预设条目（StoredThemePreset）

持久化 presets 表中的最小单位：`CustomThemeColorPreset` + `name`（唯一标识，同为存储对象键）+ `version`（semver）。整体以 `StoredThemePresets`（schema `version` + 条目表）存入 `soybean-ui-theme-presets`（localStorage，不入 cookie）。

## 主题存储门面（ThemeStore）

`createThemeStore` 返回的统一、环境感知的主题存储门面，把持久化主题配置、自定义 presets 表、当前已应用 preset 汇聚为一个对象。所有读写按运行时环境路由：服务端读注入的 `cookieHeader`（写为 no-op），客户端读写 localStorage 与 `document.cookie`。cookie 作为跨环境同步通道，保证服务端与客户端读取一致。

## 运行时环境判断（isServerRuntime）

`isServerRuntime()` 在调用时检测全局对象（`window`/`document` 是否存在）判断服务端运行。由于 `@soybeanjs/theme` 与 UI 库为预构建产物，`import.meta.env.SSR` 在构建时被固化而无法反映消费方运行时；应用应显式传 `isServer`（如 Nuxt 的 `import.meta.server`）驱动 SSR 专用存储路径。
