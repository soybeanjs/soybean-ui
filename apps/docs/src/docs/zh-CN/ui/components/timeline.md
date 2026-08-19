# 时间线

## 概述

按时间顺序展示事件的组件，在垂直或水平轴上用标记呈现事件序列。`STimeline` 提供时间线上下文（`orientation`、`mode`、`reverse`、`dir`）与 `timelineVariants` 样式配方；`STimelineItem` 组合 headless 的 `TimelineItem`、`TimelineSeparator`、`TimelineDot`、`TimelineContent`。适用于订单流转、发布历史、流程步骤或动态时间轴。多步骤表单流程请优先使用 `stepper`；无序扁平内容使用 `list`。

## 用法

<UsageCode component="timeline" />

## 特性

- 🧩 headless/styled 分离 — `STimeline` + `STimelineItem` 组合 5 个 headless 原语（`TimelineRoot`/`Item`/`Separator`/`Dot`/`Content`），headless 层零样式
- 📐 `orientation`（`vertical`/`horizontal`）— 默认垂直带连接线；水平按行排列并贯穿横线
- 🧭 `mode`（`left`/`right`/`alternate`）— 交替模式通过 `data-position` 将奇偶项置于两侧
- 🔄 `reverse` 反转视觉顺序，用于最新在前布局
- 🎨 `STimelineItem` 的 `color` 通过 `data-[color=...]` 选择器映射 8 种主题色到圆点
- 🧩 `dot` 插槽可用任意图标或自定义内容替换标记；`label` 插槽渲染时间戳
- 🧭 `dir`（ltr/rtl）从 `SConfigProvider` 解析并反射到根元素
- ♿ 语义化 `<ol>`/`<li>` 结构，装饰性圆点对无障碍树隐藏

## 演示

<PlaygroundGallery component="timeline" />

## API

<ComponentApi component="timeline" />

## 注意事项

### 架构与行业对标

SoybeanUI 将时间线拆分为 5 个 headless 原语（`TimelineRoot` 提供 orientation/mode/reverse/dir 上下文与子项注册；`TimelineItem` 组合 separator + dot + content 并解析交替定位）以及带样式的 `STimeline`/`STimelineItem` 包装。与 Ant Design `Timeline`、MUI `Timeline` 家族、Element Plus `el-timeline`、Naive UI `n-timeline` 相比，SoybeanUI 是唯一同时具备 headless/styled 分离、逐插槽 `ui` 类覆盖、RTL 支持以及同一组件上同时提供 `mode` 与 `orientation` 的对标库；MUI 需要手动组装 6 个独立原语，Ant Design 的交替模式固定为单一布局。

| 能力                 | SoybeanUI | Ant Design | MUI Timeline | Element Plus | Naive UI |
| :------------------- | :-------: | :--------: | :----------: | :----------: | :------: |
| headless/styled 分离 |    ✅     |     —      |      —       |      —       |    —     |
| 垂直/水平            |    ✅     |     ✅     |      ✅      |      —       |    —     |
| 交替模式             |    ✅     |     ✅     |      —       |      —       |    —     |
| 反转顺序             |    ✅     |     ✅     |      —       |      —       |    —     |
| 圆点颜色             |    ✅     |     ✅     |      ✅      |      ✅      |    ✅    |
| 自定义圆点（插槽）   |    ✅     |     ✅     |      ✅      |      ✅      |    —     |
| 时间戳标签           |    ✅     |     ✅     |      ✅      |      ✅      |    ✅    |
| RTL 支持             |    ✅     |     —      |      —       |      —       |    —     |
| 逐插槽 `ui` 覆盖     |    ✅     |     —      |      —       |      —       |    —     |

### 使用注意

- `mode` 仅对垂直方向生效；水平方向各项始终按行排列，忽略 `mode`。
- 连接线由 separator 的 `::before`/`::after` 伪元素绘制；通过 `ui` 覆盖隐藏伪元素将移除该项的连接线。
- `color` 属性通过主题色选择器样式化圆点；任意 CSS 颜色请使用 `dot` 插槽。

## 常见问题

### 如何将内容放在右侧？

在 `STimeline` 上设置 `mode="right"`（垂直方向）。两侧交替使用 `mode="alternate"`。

### 如何自定义圆点？

使用 `STimelineItem` 的 `dot` 插槽：`<template #dot><SIcon icon="..." /></template>`。可结合 `color` 设置标记颜色。

### 如何让最新事件显示在最前？

在 `STimeline` 上设置 `reverse`。视觉顺序反转，同时语义化 `<ol>` 顺序保持不变。

### 如何水平使用？

设置 `orientation="horizontal"`。每个条目变为一列，标签在上、内容在下。
