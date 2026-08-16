# AppFooter

## 概览

`SAppFooter` 渲染应用页脚——自定义插槽内容、可选文本行与内置版权行。

## 用法

<UsageCode component="app-footer" />

## 特性

- 🧩 自定义内容——默认插槽优先渲染
- 📝 文本行——`text` 渲染居中的文本块
- ©️ 版权——`showCopyright` 自动渲染 `Copyright © <年份>`
- 🎨 主题感知——使用 recipe 中的弱化前景色

## 示例

<PlaygroundGallery component="app-footer" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'text', type: 'string', default: '-', description: '页脚文本块。' },
  { name: 'showCopyright', type: 'boolean', default: 'false', description: '是否显示内置版权行。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '根类名。' },
]"/>

### Emits

此组件不触发任何事件。

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '页脚内部的自定义内容。' },
]"/>
