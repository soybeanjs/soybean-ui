# AppLogo

## 概览

`SAppLogo` 渲染品牌块——图标（iconify 名）与可选标题——用于后台侧边栏与头部区域，并提供浅色与反色（深色侧边栏）两种样式。

## 用法

<UsageCode component="app-logo" />

## 特性

- 🖼️ Iconify 图标——通过 `logo` 传入任意图标名（如 `lucide:command`）
- 🏷️ 可选标题——`title` 在图标旁渲染，可通过 `showTitle` 隐藏
- 🌗 反色变体——`inverted` 将标题切换为 `text-sidebar-foreground`，适配深色表面
- 📏 主题尺寸——根节点高度/间距来自 recipe

## 示例

<PlaygroundGallery component="app-logo" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'logo', type: 'string', default: '-', description: 'Logo 来源——iconify 名（如 `lucide:command`）或图片 URL。' },
  { name: 'title', type: 'string', default: '-', description: 'Logo 旁的标题文本。' },
  { name: 'showTitle', type: 'boolean', default: 'true', description: '是否显示标题。' },
  { name: 'inverted', type: 'boolean', default: 'false', description: '是否使用反色（深底浅字）样式。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '根类名。' },
]"/>

### Emits

此组件不触发任何事件。

### Slots

此组件不暴露具名插槽。
