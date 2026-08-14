# 组合框

## 概述

用于搜索并从选项列表中快速选择值的组合框组件，支持显式锚点组合、可清空输入以及完整的弹层/过滤交互。输入即过滤，键盘导航遵循 WAI-ARIA combobox 模式。适用于需要输入关键字过滤列表的场景；无需输入的选择请用 `SSelect`；对文本做模糊匹配建议请用 `SAutocomplete`。

## 用法

<UsageCode component="combobox" />

## 特性

- 🔍 输入即过滤，三态过滤模型（有匹配 / 空 / 未参与）
- ⌨️ 完整键盘导航——方向键、Enter/Space 选择、typeahead、Escape 关闭
- 📜 可选虚拟滚动（`ComboboxVirtualizer`）
- 🗂 分组，支持组标签与分隔符
- 🧹 取消/清空按钮，可选 `resetModelValueOnClear`
- 📊 数据驱动 `ComboboxCompact` API——`items`（选项使用 `label` / `value` 字段）+ 分组
- 🎛 受控/非受控，支持 `v-model:open` 与过滤语义（`ignoreFilter`、`resetSearchTermOnBlur`）
- ♿ 完整无障碍支持——`role="combobox"` / `listbox` / `option`、`aria-activedescendant`、axe 零违规

## 演示

<PlaygroundGallery component="combobox" />

## API

<ComponentApi component="combobox" />

## 注意事项

### 架构与对标差异

SoybeanUI 通过复用 listbox 基座与 Popper 定位构建组合框：`ComboboxRoot`（选择状态 + `useControllableState(open)` + 三态过滤）→ `ComboboxInput`（`role="combobox"` + `aria-autocomplete`）→ `ComboboxTrigger` → `ComboboxContentImpl`（DismissableLayer + FocusScope + bodyLock）→ `ComboboxItem` → `ListboxItem`。`scv()` 配方 `comboboxVariants` 声明 15 个插槽与 7 个尺寸变体。这与 reka-ui / shadcn 的 combobox 语义一致，虚拟滚动与数据驱动 compact API 为 SoybeanUI 的差异化增强。

| 能力                     | SoybeanUI | reka-ui `Combobox` | shadcn `Combobox` | Ant Design `Select` (showSearch) |
| :----------------------- | :-------: | :----------------: | :---------------: | :------------------------------: |
| headless/styled 分离     |    ✅     |         ✅         |         —         |                —                 |
| 输入即过滤 + 三态 filter |    ✅     |         ✅         |        ✅         |                ✅                |
| combobox/listbox 角色    |    ✅     |         ✅         |        ✅         |                ✅                |
| 键盘导航 + typeahead     |    ✅     |         ✅         |         —         |                ✅                |
| 虚拟滚动                 |    ✅     |         ✅         |         —         |                ✅                |
| 分组 + 组标签            |    ✅     |         ✅         |        ✅         |                ✅                |
| 取消按钮（clear）        |    ✅     |         ✅         |        ✅         |                ✅                |
| 空态                     |    ✅     |         ✅         |         —         |                —                 |
| 数据驱动 Compact API     |    ✅     |         —          |         —         |                —                 |
| axe 零违规（打开态）     |    ✅     |         —          |        ✅         |                —                 |

### 注意事项

- 输入过滤在客户端进行；远程/异步过滤需自行禁用内置过滤或对 `inputValueChange` 做防抖。
- `resetSearchTermOnBlur` 控制失焦后是否保留搜索词——按你的交互预期设置（如 `false` 保留已输入内容）。
- 根节点 `disabled` 时所有条目都不可选——包括自带 `disabled` 的条目（统一 `rootDisabled || item.disabled` 守卫）。

## 常见问题

### `SCombobox` 与 `SSelect` 有什么区别？

`SCombobox` 随输入过滤选项（`role="combobox"` + `aria-autocomplete`）；`SSelect` 由触发器驱动，仅支持 typeahead。需要输入搜索时选组合框。

### 大数据列表如何启用虚拟滚动？

在内容中加入 `ComboboxVirtualizer`（或对应 compact 开关），会激活内部虚拟列表，同时保留键盘导航。

### 如何清空输入并重置模型值？

传入 `clearable`。`resetModelValueOnClear` 决定清除时是否同时发出空 `modelValue`，还是仅重置搜索词。

### 为什么禁用条目仍可选中？

这曾是真实缺陷（Vue `withDefaults` 的 Boolean prop 隐式默认化问题），现已修复。禁用条目遵循统一 `rootDisabled || item.disabled` 守卫，与 `SSelect` 一致。
