# 描述列表

## 概述

结构化键值展示组件，在响应式网格中渲染带标签的字段。`SDescriptions` 提供网格上下文与 `descriptionsVariants` 样式配方（bordered/borderless × horizontal/vertical × 标签对齐）；`SDescriptionsItem` 组合 headless `DescriptionsItem`（标签 + 内容单元格）并应用逐项 `span`。适用于详情页、订单摘要、个人资料视图等"字段：值"的只读布局。多行表格数据请优先使用 `table`，可编辑输入使用 `form`，单个高亮数值使用 `statistic`。

## 用法

<UsageCode component="descriptions" />

## 特性

- 🧩 headless/styled 分离 — `DescriptionsRoot` + `DescriptionsItem` 负责网格结构与子项注册；`SDescriptions*` 包装仅注入样式
- 🔢 `column`（默认 3）— 通过根元素上的 `grid-template-columns` 内联样式设置每行条目数
- 📐 `layout`（`horizontal`/`vertical`）— 标签在内容旁或上方
- 🧱 `bordered` — 表格风格单元格，标签与内容间带分隔线
- ↔️ `labelAlign`（`start`/`center`/`end`）— 标签单元格对齐
- 🧩 `SDescriptionsItem` `span` — 条目跨越多个列（`grid-column: span N`）
- 🧩 `label` 属性 / `#label` 插槽 + 默认内容插槽，支持完全自定义
- 🧭 `dir`（ltr/rtl）从 `SConfigProvider` 解析并反射到根元素
- ♿ 语义化 `<div>` 网格，带 `data-layout`/`data-bordered`/`data-span` 状态属性

## 演示

<PlaygroundGallery component="descriptions" />

## API

<ComponentApi component="descriptions" />

## 注意事项

### 架构与行业对标

SoybeanUI 将描述列表拆分为 headless `DescriptionsRoot`（网格上下文 + 布局状态）与 `DescriptionsItem`（带 span 的标签/内容单元格），由带样式的 `SDescriptions`/`SDescriptionsItem` 包装应用 `scv()` 配方与 column/span 网格样式。与 Ant Design `Descriptions`、Naive UI `n-descriptions`、Arco `Descriptions`、TDesign `Descriptions` 相比，SoybeanUI 是唯一同时具备 headless/styled 分离、逐插槽 `ui` 类覆盖与 RTL 支持的对标库；Ant Design 的 `column` 支持响应式对象，而本里程碑提供固定数量（需要响应式列数时请使用 `ui` 根覆盖配合 UnoCSS 断点类）。

| 能力                 | SoybeanUI | Ant Design | Naive UI | Arco | TDesign |
| :------------------- | :-------: | :--------: | :------: | :--: | :-----: |
| headless/styled 分离 |    ✅     |     —      |    —     |  —   |    —    |
| 列数                 |    ✅     |     ✅     |    ✅    |  ✅  |   ✅    |
| 边框变体             |    ✅     |     ✅     |    ✅    |  ✅  |   ✅    |
| 水平/垂直            |    ✅     |     ✅     |    ✅    |  ✅  |   ✅    |
| 条目跨列             |    ✅     |     ✅     |    —     |  —   |    —    |
| 标签对齐             |    ✅     |     ✅     |    —     |  —   |    —    |
| RTL 支持             |    ✅     |     —      |    —     |  —   |    —    |
| 逐插槽 `ui` 覆盖     |    ✅     |     —      |    —     |  —   |    —    |

### 使用注意

- `column` 数量以根元素内联 `grid-template-columns` 样式应用；条目 `span` 映射为 `grid-column: span N`。
- `bordered` 模式下单元格通过根元素 `gap-px bg-border` 技巧绘制——根背景从 1px 缝隙透出形成网格线。
- 未内置响应式列预设（如 `{ xs: 1, md: 3 }`）；如需响应式，请用 UnoCSS 断点工具覆盖根 `ui` 类（`grid-cols-1 md:grid-cols-3`）并省略 `column`。

## 常见问题

### 如何让值跨多列？

在 `SDescriptionsItem` 上设置 `span`（`:span="2"`）。该条目的网格单元格将跨越相应列数。

### 如何实现响应式列数？

固定列数使用 `column`；或通过 `ui: { root: 'grid-cols-1 md:grid-cols-3' }` 覆盖根元素并保持 `column` 默认（内联样式会被响应式类覆盖）。

### 如何用富内容自定义标签？

使用 `#label` 插槽：`<template #label><SIcon icon="..." /> 标签</template>`。

### 如何让它看起来像表格？

设置 `bordered`。每个条目变为带边框单元格，内部在标签与内容之间绘制分隔线。
