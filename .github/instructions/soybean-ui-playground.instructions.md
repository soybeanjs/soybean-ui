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

- 用 `<SCard title="{Name}" split :ui="{ content: 'flex-c gap-4' }">` 包裹子示例
- 从 `@soybeanjs/ui` 导入组件，而不是直接走源码路径

## 子示例

- 文件名使用 kebab-case
- 标题统一使用 `<h3 class="playground-title">`
- 一个文件只展示一个能力点
- 受控状态用 `ref` 或 `shallowRef`
- 静态数据用 `const`

## 路由与发现

- playground 自动发现 `examples/**/index.vue`
- 新建组件目录后无需手动注册路由

## 质量要求

- 示例要覆盖主要公开能力，而不是重复展示同一场景
- 如果组件有 `color`、`size`、`disabled`、`ui` 等公开能力，示例应体现这些能力
- playground 是组件从 0 到 1 的正式交付面之一，不是可选附属物
