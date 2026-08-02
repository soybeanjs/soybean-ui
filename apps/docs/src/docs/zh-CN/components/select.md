# 选择器

## 概述

用于从选项列表中选择值的选择器组件，由按钮触发。触发器渲染选中值（或占位符），弹层支持键盘导航、typeahead 搜索、分组、多选与可清除模式。适用于从有界集合中选取一个或多个值；需在列表中自由输入搜索请用 `SCombobox`；层级级联数据请用 `SCascader`。

## 用法

<UsageCode component="select" />

## 特性

- 📊 数据驱动 `SelectCompact` API——传 `items`，配合 `labelField` / `valueField`
- ⌨️ 完整 combobox 交互——指针/键盘打开、Arrow/Home/End 导航、typeahead 搜索、Enter/Space 选择、Escape 关闭
- 🗂 分组，支持组标签、分隔符与条目指示器
- ✅ `multiple` 多选，累积与去重
- 🧹 可清除模式（`selectionBehavior` 控制清除是切换还是重置）
- 📍 选中项对齐定位（`position="item-aligned"`）
- 📋 通过隐藏代理 `<select>`（`SelectBubbleSelect`）支持原生表单提交
- ♿ 完整无障碍支持——`role="combobox"` / `listbox` / `option`、axe 零违规

## 演示

<PlaygroundGallery component="select" />

## API

<ComponentApi component="select" />

## 注意事项

### 架构与对标差异

SoybeanUI 基于完整 ComboBox 基座构建选择器：`SelectRoot` → `SelectTrigger`（`role="combobox"`）→ `SelectValue`（collection 标签查找）→ `SelectContentImpl`（DismissableLayer + FocusScope + typeahead + 键盘导航）→ `SelectItem`，并由 `SelectBubbleSelect` 代理原生表单提交。`scv()` 配方 `selectVariants` 声明 15 个插槽与 7 个尺寸变体。这与 reka-ui / shadcn 的 select 语义一致，数据驱动 `SelectCompact` 聚合为 SoybeanUI 的差异化增强。

| 能力                     | SoybeanUI | reka-ui `Select` | shadcn `Select` | Element Plus `el-select` |
| :----------------------- | :-------: | :--------------: | :-------------: | :----------------------: |
| headless/styled 分离     |    ✅     |        ✅        |        —        |            —             |
| combobox 角色 + 键盘导航 |    ✅     |        ✅        |       ✅        |            ✅            |
| typeahead 搜索           |    ✅     |        ✅        |        —        |            ✅            |
| 受控/非受控 + 多选       |    ✅     |        ✅        |        —        |            ✅            |
| 分组 + 组标签            |    ✅     |        ✅        |       ✅        |            ✅            |
| 表单代理（BubbleSelect） |    ✅     |        ✅        |        —        |            ✅            |
| 选中项对齐定位           |    ✅     |        ✅        |        —        |            —             |
| 数据驱动 Compact API     |    ✅     |        —         |        —        |            —             |
| 虚拟滚动                 |     —     |        —         |        —        |            ✅            |
| axe 零违规（打开态）     |    ✅     |        —         |       ✅        |            —             |

### 注意事项

- 弹层首次打开前，标签查找依赖由 `items` 计算的数据驱动 `fallbackLabel`——请传入 `items`（而非仅组合子节点），否则 `defaultValue` / 受控 `modelValue` 的触发器文本无法渲染。
- 虚拟滚动未实现；超大选项列表可能需要自行虚拟化。
- `multiple` 搭配 `clearable` 时，用 `selectionBehavior` 决定清除是切换关闭还是重置选择。

## 常见问题

### 弹层未打开时如何显示选中标签？

向 `SSelect` 传入 `items`。`SelectCompact` 通过 `fallbackLabel` 从 `items` 解析标签，使 `defaultValue` / 受控 `modelValue` 立即渲染在触发器上。

### 如何启用多选？

传入 `multiple`。选项累积并去重，`modelValue` 变为数组。

### 如何分组？

传入分组的 `items`——分组项携带 `label` 与嵌套 `items` 数组。组头通过 `group-label` 插槽渲染，分隔符通过 `separator` 渲染。

### 选择器如何参与原生表单提交？

组件渲染一个镜像当前值的隐藏原生 `<select>`（`SelectBubbleSelect`），原生表单提交与浏览器自动填充即可工作。

### 如何让触发器显示箭头或自定义内容？

使用 `trigger-icon` / `value` 插槽（及 `showArrow` 对应插槽面）；`SSelect` 会转发全部 15 个配方插槽。
