# AppBreadcrumb

## 概览

`SAppBreadcrumb` 渲染面包屑路径，并支持子级下拉：带 `children` 的节点渲染为悬停下拉；叶子节点渲染为可点击页面项。

## 用法

<UsageCode component="app-breadcrumb" />

## 特性

- 🧱 条目模型——`AppBreadcrumbItem[]`，含 `value`、`label`、`icon`、`disabled`
- 📂 子级下拉——带 `children` 的条目在悬停时渲染 `SDropdownMenu`
- 🖱️ 交互——页面节点触发 `click`，下拉子项选中触发 `select-child`
- 🎨 插槽类覆盖——`ui` 将各插槽类合并进面包屑 recipe

## 示例

<PlaygroundGallery component="app-breadcrumb" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'items', type: 'AppBreadcrumbItem[]', default: '-', description: '组件渲染的条目。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '根类名。' },
  { name: 'ui', type: 'Partial<BreadcrumbUi>', default: '-', description: '各插槽类覆盖。' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'click', parameters: '[item: AppBreadcrumbItem]', description: '点击叶子条目时触发。' },
  { name: 'select-child', parameters: '[item: AppBreadcrumbItem]', description: '选中子级下拉条目时触发。' },
]"/>

### Slots

此组件不暴露具名插槽。
