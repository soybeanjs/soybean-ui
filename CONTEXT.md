# CONTEXT

> 主题体系领域术语表。仅收录术语与精确定义，不含实现细节。
> 相关实现方案见 [docs/theme-refactor-plan.md](docs/theme-refactor-plan.md) 与 [docs/theme-presets-plan.md](docs/theme-presets-plan.md)。

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
