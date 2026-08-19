# 统计数值

## 概述

用于展示带标签的数值组件，支持可选的前缀、后缀与本地化风格格式化。`SStatistic` 通过 `StatisticCompact` 聚合 headless 组件家族——`StatisticRoot`（格式化上下文）、`StatisticLabel`、`StatisticValueRow`、`StatisticValue`、`StatisticPrefix`、`StatisticSuffix`——并注入 `statisticVariants` 样式配方（6 种尺寸、可选 `trend`）。适用于仪表盘、KPI 卡片与报表头部等需要高亮展示单个数值并附带标签与单位的场景。多个相关数值请优先使用 `table` 或 `list`；加载状态可与 `skeleton` 搭配。

## 用法

<UsageCode component="statistic" />

## 特性

- 🧩 headless/styled 分离 — `StatisticCompact` 负责 label/value/prefix/suffix 的组合；`SStatistic` 仅注入样式并透传插槽
- 🔢 纯函数数值格式化 — `formatNumber` 共享工具支持 `precision`、`groupSeparator`、`decimalSeparator` 以及自定义 `formatter` 覆盖
- 📊 `trend`（`up`/`down`）渲染默认趋势箭头图标并通过样式配方将前缀着色（success/destructive）
- 🎚 `value` 响应式——格式化展示字符串在每次变化时自动重算
- 🧭 `dir`（ltr/rtl）从 `SConfigProvider` 解析并反射到根元素，支持 RTL 布局
- 🎨 `statisticVariants` — 6 种尺寸（xs–2xl）等比缩放 label/value/prefix/suffix
- 🧩 可覆盖插槽 — `label`、`value`、`prefix`、`suffix` 可分别替换为自定义内容
- ♿ 语义化 `<div>`/`<span>` 结构，无冗余 ARIA——数值保持可被机器读取的文本

## 演示

<PlaygroundGallery component="statistic" />

## API

<ComponentApi component="statistic" />

## 注意事项

### 架构与行业对标

SoybeanUI 将统计数值拆分为 headless 原语（格式化上下文 + 插槽结构）与带样式的 `SStatistic` 包装。数值格式化位于 `packages/headless/src/shared` 的纯函数 `formatNumber` 中，无需挂载组件即可保持 SSR 安全且可测试。与 Ant Design `Statistic`、Chakra `Stat`、Element Plus `el-statistic`、Naive UI `n-statistic` 相比，SoybeanUI 是唯一同时具备 headless/styled 分离与逐插槽 `ui` 类覆盖能力的对标库；此外还提供 `trend` 变体与 RTL 支持。

| 能力                 | SoybeanUI | Ant Design | Chakra (`Stat`) | Element Plus | Naive UI |
| :------------------- | :-------: | :--------: | :-------------: | :----------: | :------: |
| headless/styled 分离 |    ✅     |     —      |        —        |      —       |    —     |
| 标签 + 数值          |    ✅     |     ✅     |       ✅        |      ✅      |    ✅    |
| 前缀/后缀            |    ✅     |     ✅     |        —        |      ✅      |    ✅    |
| 精度/千分位          |    ✅     |     ✅     |        —        |      ✅      |    ✅    |
| 自定义格式化函数     |    ✅     |     ✅     |        —        |      —       |    —     |
| 趋势指示             |    ✅     |     —      |        —        |      —       |    —     |
| RTL 支持             |    ✅     |     —      |        —        |      —       |    —     |
| 逐插槽 `ui` 覆盖     |    ✅     |     —      |        —        |      —       |    —     |

### 使用注意

- `prefix`/`suffix` 属性接受纯文本或图标字形；富内容请改用 `prefix`/`suffix` 插槽。
- 设置 `trend` 且未提供 `prefix` 时，前缀位置会渲染默认趋势箭头图标；提供 `prefix` 后由其替换。
- `precision` 基于 `toFixed`，浮点展示遵循标准四舍五入规则。

## 常见问题

### 如何显示千分位分隔符？

设置 `precision`（如 `2`），使数值进入分组逻辑；若本地化使用不同分隔字符，可通过 `group-separator`/`decimal-separator` 自定义。

### 如何将数值格式化为货币或自定义格式？

传入 `formatter` 函数：`:formatter="(value) => \`\$\${value.toFixed(2)}\`"`。其优先级高于 `precision` 与分隔符属性。

### 如何添加趋势箭头？

设置 `trend="up"` 或 `trend="down"`。默认前缀会变为 success/destructive 着色的趋势图标。

### 如何仅用自定义内容替换数值？

使用 `value` 插槽：`<template #value><MyCustomNumber /></template>`。
