---
applyTo: 'playground/examples/**/*.vue'
---

# SoybeanUI Playground 规范

组件主体和正式出口稳定后，再补 playground。

不要在组件 API、slots、variants 还频繁变化时先写 playground。

## 目录结构

每个组件的 playground 放在 `playground/examples/{component}/`。

推荐结构：

- `index.vue`
- `basic.vue`
- `color.vue`
- `size.vue`
- `disabled.vue`
- `custom-styling.vue`

并非每个组件都必须拥有全部示例，但每个文件只演示一个特性。

## 编写顺序

1. 先写 `index.vue`
2. 再补 `basic.vue`
3. 再根据公开能力补 `color.vue`、`size.vue`、`disabled.vue`、`custom-styling.vue`

## index.vue

- 统一写成：导入 `../../components/playground-gallery.vue`，并渲染 `<PlaygroundGallery component="{component}" />`
- `component` 值使用目录名本身，例如 `accordion`、`date-range-picker`
- 不要在 `index.vue` 中手动导入和拼装所有子示例
- 不要再用 `<SCard title="{Name}" ...>` 作为组件 playground 入口页容器

## 子示例

- 文件名使用 kebab-case
- 一个文件只展示一个能力点；标题由 `PlaygroundGallery` 基于 `playground.examples.{component}.{file}` 国际化 key 统一渲染
- 子示例文件内不要再写 `<h3 class="playground-title">` 这类局部标题
- 没有布局意义时，不要为了包一层根节点而额外套 `<div>`；能直接渲染组件就直接渲染
- 如果确实需要布局容器、滚动容器、宽度约束或多节点分组，可以保留最小必要包装
- 一个文件只展示一个能力点
- 受控状态用 `ref` 或 `shallowRef`
- 静态数据用 `const`

## 路由与发现

- playground 自动发现 `examples/**/index.vue`
- 新建组件目录后无需手动注册路由
- `PlaygroundGallery` 会自动发现同目录下除 `index.vue` 之外的示例文件，并按 `basic` 优先的顺序展示

## 质量要求

- 示例要覆盖主要公开能力，而不是重复展示同一场景
- 如果组件有 `color`、`size`、`disabled`、`ui` 等公开能力，示例应体现这些能力
- 子示例文件名要准确表达能力点，因为它同时决定国际化标题 key 和展示语义
- playground 是组件从 0 到 1 的正式交付面之一，不是可选附属物
