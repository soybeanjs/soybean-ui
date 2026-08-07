# ADR-9: playground 受控主题生成器（ThemeGenerator）

## 状态

Accepted（2026-08-07）

## 语境

playground 需要一个可视化主题生成器，方向复刻 `shadcnthemes.app/generator` 的「控制面板」。现有 `theme-configurator.vue` 只覆盖 base/primary/radius/size + 自定义 preset，无法编辑完整颜色 token，也无法覆盖 `format`/`lightLevel`/`darkLevel`/`menuColor`/`menuAccent` 等主题参数。

`SConfigProvider` 的主题入口是唯一的 `theme: ConfigProviderThemeOptions` prop（`packages/ui/src/components/config-provider/types.ts`）。全部主题参数（base/primary/format/lightLevel/darkLevel/styleTarget/darkSelector/complete + `preset{size,radius,menuColor,menuAccent,light,dark}`）都收敛在这里，颜色 token 以 `preset.light` / `preset.dark` 分片存在。

## 决策

新增 `apps/playground/src/components/theme-generator.vue`，作为 **受控组件**：

- **入参即 ConfigProvider 主题配置**：`v-model:theme`，类型 `ConfigProviderThemeOptions`；每次改动 emit 一个新的配置对象（不可变更新）。
- **双 tab**：
  - `Generate Theme`——可视化生成器（base/primary/radius/size/format/lightLevel/darkLevel/menuColor/menuAccent + mode 分片下的 Surfaces 色阶 / Border 透明度 / Chart1-5（palette+level））。
  - `Edit Variables`——完整 `ColorTokens` 矩阵，light/dark 分片切换，逐 token 用颜色输入框编辑（空值即删除该 token 恢复派生）。
- `mode` 不属于 `ConfigProviderThemeOptions`（它是持久化状态 `ThemeConfigState`），**不纳入 v-model**；颜色 token 按 mode 分片，故组件内置一个 Light/Dark 切换来决定当前编辑哪个分片。
- **接线**：`apps/playground/src/theme.ts` 增加 `themeOverride` ref，经 `configProviderProps.theme` 传给 `SConfigProvider`；`index.vue` 用 `useTheme().theme` 初始化后绑定生成器。生成器 emit 直接写回 provider，实时生效，并修复 `index.vue` 中 `<ThemeGenerator />` 未注册的 bug。

## 后果

**积极：**

- 单一入口：生成器直接消费/产出 `ConfigProviderThemeOptions`，与 provider 契合，无额外状态层。
- 完整可编辑：覆盖全部主题参数与全部颜色 token，超出 `theme-configurator` 的能力。
- 实时预览：改动即写回 provider，playground 组件即时反映。

**消极/代价：**

- **与 `theme-configurator` 的取舍**：生成器一旦设置了 `themeOverride`，会覆盖 `useTheme()` 内部持久化状态（`createThemeContext` 中 `props.theme` 优先）。两者并存时生成器优先，语义冲突已接受。
- 受控组件 + 颜色文本输入：为保证真正受控，token 输入以 `:value` + `@input` 驱动 emit，而非内部 `v-model`，键入手感依赖 prop 回流。
- `mode` 不纳入 v-model：生成器内部用 Light/Dark 切换做分片编辑，与 `persistTheme` 的 `mode` 状态解耦。

## 备选方案

1. **运行期 `useTheme()` 直改**（同 `theme-configurator`）：只能写 base/primary/radius/size + 持久化 preset，无法写完整 token 与 `format`/`menuColor` 等。否决——覆盖不全。
2. **仅 shadcn 精选子集 + 预览面板**：受限 + 工作量更大。否决——用户选定「仅控制面板 + 完整主题配置」。
3. **`mode` 纳入 v-model（模型改 `ThemeConfigState`）**：能编辑 mode，但丢失 `styleTarget`/`darkSelector`/`complete` 等 theme prop 字段。否决——保持模型即 `ConfigProviderThemeOptions`，与「入参=ConfigProvider 主题配置参数」一致。
