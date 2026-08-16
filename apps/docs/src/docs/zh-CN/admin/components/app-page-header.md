# AppPageHeader

## 概览

`SAppPageHeader` 渲染页面级头部——可选返回按钮、标题、描述与操作区——用于内容页顶部。

## 用法

<UsageCode component="app-page-header" />

## 特性

- ⬅️ 返回按钮——`showBack` 渲染幽灵返回按钮并触发 `back`
- 📝 标题 + 描述——`title` / `description` 在截断的 `min-w-0` 块中渲染
- 🎬 操作区——默认插槽承载页面操作（按钮、筛选等）
- 📌 吸顶——`sticky` 将头部固定在滚动容器顶部并带背景模糊

## 示例

<PlaygroundGallery component="app-page-header" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'title', type: 'string', default: '-', description: '页面标题。' },
  { name: 'description', type: 'string', default: '-', description: '标题下的页面描述。' },
  { name: 'showBack', type: 'boolean', default: 'false', description: '是否显示返回按钮。' },
  { name: 'sticky', type: 'boolean', default: 'false', description: '头部是否固定在内容区顶部。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '根类名。' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'back', parameters: '[]', description: '点击返回按钮时触发。' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '渲染在右侧的操作内容。' },
]"/>
