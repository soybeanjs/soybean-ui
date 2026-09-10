# CONTEXT

> 主题体系领域术语表。仅收录术语与精确定义，不含实现细节。

## 主题（theme）

一套完整的视觉令牌集合，覆盖全部 40 个 CSS 颜色语义变量（light/dark 各一份）。`@soybeanjs/theme` 是主题生成引擎；用户自定义预设（`CustomThemeColorPreset`）可经 ConfigProvider 持久化，覆盖内置派生结果。

## 引擎（engine）

`@soybeanjs/theme` 包。持有内置基线（核心 token 模板 + 派生规则），消费外部传入的 preset 覆盖后输出 CSS。

## 内置（builtin）

引擎内置的基线数据与规则：9 个中性 base 模板、26 个 primary 模板、固定 feedback（classic）与固定 chart 模板。

## 预设（preset）

预设体系的最小单位，一个可被 `createTheme({ preset })` 消费的 token 集合（引擎 `CustomThemeColorPreset` 的实例，light/dark 各一份、字段全可选）。

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

ConfigProvider 上控制是否启用持久化主题读取（localStorage）的属性，默认关闭。关闭时只消费显式 `theme` props；开启后按「显式 props > 存储配置 > 内置默认」的解析管道合并存储配置，且为 `{ presetName }` 引用解析提供前提。存储读取在组件实例初始化时解析一次并写入内存状态，后续渲染复用该状态，无需额外缓存开关。

## SSR 主题配置（themeConfig）

由应用层解析后注入 ConfigProvider 的持久化配置。SSR 时作为存储配置参与合并（仅补位未显式声明的键），客户端以 localStorage 为权威源。主题不通过 cookie 传输：服务端首帧渲染默认主题，由 `createThemeInitScript()` 内联脚本在客户端首帧前从 localStorage 应用持久化主题，避免闪烁。

## 预设注册表（presetProvider）

服务端自定义 preset 解析器：把 `{ presetName }` 引用映射为 `CustomThemeColorPreset` 定义，使 SSR 无需访问 localStorage 即可渲染自定义 preset；客户端忽略，以 localStorage 的 presets 表为准。

## 持久化预设条目（StoredThemePreset）

持久化 presets 表中的最小单位：`CustomThemeColorPreset` + `name`（唯一标识，同为存储对象键）+ `version`（semver）。整体以 `StoredThemePresets`（schema `version` + 条目表）存入 `__SOYBEAN_THEME_PRESETS`（localStorage）。

## 运行时环境判断（isServerRuntime）

`isServerRuntime()` 在调用时检测全局对象（`window`/`document` 是否存在）判断服务端运行。由于 `@soybeanjs/theme` 与 UI 库为预构建产物，`import.meta.env.SSR` 在构建时被固化而无法反映消费方运行时；应用应显式传 `isServer`（如 Nuxt 的 `import.meta.server`）驱动 SSR 专用存储路径。

## 主题提供者（ConfigProvider）

`@soybeanjs/ui` 的完整主题渲染组件（`SConfigProvider`）。接收 `tokens`（light/dark 部分语义 token 集合，或 `{ presetName }` 持久化预设引用）、`persistTheme`、`themeConfig`、`presetProvider`，将 tokens 与内置默认主题合并为完整主题后经 `createTheme` 派生并输出 CSS，以内联 `<style>` 注入（服务端与客户端都渲染以保证水合一致）。

## 主题 token（tokens）

`SConfigProvider` 的 `tokens` 属性输入，`{ light: Partial<ThemeColors>; dark?: Partial<ThemeColors> }`（即 `CustomThemeColorPreset`）。字段全可选，缺失键回退内置默认主题。可为内联 token 集合，也可为按名引用的持久化 preset（`{ presetName }`）。

## 主题定制面板（SThemeCustomizer）

`@soybeanjs/ui` 的可视化主题定制组件。按 `base` / `primary` / `feedback` / `sidebar` / `chart` 分类选择内置模板与档位（`lightLevel` / `darkLevel`），产出 `CustomThemeColorPreset` 供 `SConfigProvider` 消费或持久化。

## token 分类（ThemeTokenGroup）

主题 token 的组织维度：`base` / `primary` / `feedback` / `sidebar` / `chart`。仅用于组织覆盖与文档，不改变 `ThemeColors` 扁平键契约。feedback 为固定 classic 规则，不提供预设选择器，仅可按组覆盖。

## 文档站主题配置器（docs ThemeConfigurator）

文档站侧的主题入口组件（`apps/docs/src/components/theme-configurator.vue`）：一个薄 `SPopover` 包装，内部渲染库组件 `SThemeCustomizer`，将定制结果写回持久化预设并经 `SConfigProvider` 实时生效。它不是自包含编辑器，也不直接输出 raw css。

## 外围包（peripheral package）

围绕核心 `@soybeanjs/headless` + `@soybeanjs/ui` 构建的领域扩展包。当前仅有 `@soybeanjs/ui-x`（AI 组件）一条线；未来可扩展 `@soybeanjs/ui-pro`、`@soybeanjs/ui-lowcode` 等。每个外围包为单一包（领域逻辑与样式同居），不另建"领域逻辑包"。图表不作为外围包：文档站直接基于 [TanStack Charts](https://tanstack.com/charts) 展示 shadcn 风格示例（`@soybeanjs/admin`、`@soybeanjs/chart` 曾规划，已于 v0.40.0 移除）。

## 原子原语（atomic primitive）

具备全新原子功能（如新的无障碍模式、焦点管理变体、新交互原语）的组件。唯一允许进入核心 `@soybeanjs/headless` 的外围贡献类型。判断标准是"提供了 headless 现有 primitives 无法组合而成的新原子能力"；不满足该标准的组件一律作为包装型组件留在外围包内。

## 包装型组件（wrapper component）

由现有 headless primitives 组合/包装而成的外围组件，不引入新原子能力。外围包中绝大多数组件属于此类；其领域逻辑（composables/types）与样式同居于所属外围包内部，不下沉到核心 headless。

## 组件前缀（component prefix）

跨包组件命名规则。核心 `@soybeanjs/ui` 用 `S`；具备强领域词汇表的包用 2 字母前缀（`@soybeanjs/ui-x` 用 `Sx`）；其余未来外围包用 `S` + 领域名词前缀防撞（如 `S` + `App*`、`S` + `Chart*`）。判据是"领域词汇表强度"：当组件名构成该领域专属词汇表（如 AI 的 Bubble/Sender/ThoughtChain）时用 2 字母前缀，否则用领域名词前缀防撞。

## 命名空间 registry item（namespaced registry item）

sbean registry 中的条目形式：name 以 `包名/组件名` 命名（如 `ui-x/bubble`；未来外围包同理，如 `<pkg>/<component>`），并附 `package` 字段标识归属。单一 `registry.json` 承载所有外围包条目，CLI 通过命名空间路径寻址（`sbean add ui-x/bubble`），文档站按 `package` 字段分组展示。
