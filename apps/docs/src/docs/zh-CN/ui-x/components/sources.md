# 引用来源

## 概述

`SxSources` 是 AI 的引用来源列表——用于回答某条消息的参考来源的纵向列表。每个条目以回形针符号开头，要么渲染为外部链接，要么渲染为纯文本标签。

放在助手 `SxBubble` 下方，展示哪些文档、页面或内部条目支撑了回答。带 `url` 的条目渲染为 `<a target="_blank" rel="noopener noreferrer">`，点击时触发 `select`；不带 `url` 的条目渲染为普通 span。

## 用法

<UsageCode component="sources" />

## 特性

- 📎 回形针前缀 — 每个条目都以 📎 字形开头
- 🔗 外部链接 — 带 `url` 的条目渲染为 `<a target="_blank" rel="noopener noreferrer">`，在新标签页打开
- 🖱 点击回调 — 点击链接携带完整 `Source` 触发 `select`
- 🚫 纯文本回退 — 不带 `url` 的条目渲染为非链接 span（不跳转）
- 🧩 自定义标签插槽 — `label` 插槽接收 `{ source }`，完全控制内容
- 🔒 类型安全 — 来自 `@soybeanjs/ui-x/types` 的 `Source[]`

## 演示

<PlaygroundGallery component="sources" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根节点类名。' },
  { name: 'sources', type: 'Source[]', default: '-', description: '要展示的来源。', required: true },
  { name: 'onSelect', type: '(source: Source) => void', default: '-', description: '来源被点击时调用的回调。' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'select', parameters: '[source: Source]', description: '来源链接被点击时触发。' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'label', parameters: '{ source: Source }', description: '每个来源的自定义标签内容。' },
]"/>

## 注意事项

### 架构与行业对标

`SxSources` 是 `@soybeanjs/ui-x` 中带样式、单包的 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上。它是一个轻量的数据驱动渲染器：迭代 `sources`，依据 `source.url` 选择链接或 span 分支，并透传 `label` 插槽——扁平引用列表无需 headless 组合式函数。`Source` 类型（`key`、`title`、`url`、`author`）与 `@soybeanjs/ui-x/types` 共享。

| 能力                | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :------------------ | :---------: | :-----------: | :-------: | :-------------: |
| 引用/来源列表       |     ✅      |       —       |     —     |       ✅        |
| 新标签页打开链接    |     ✅      |       —       |     —     |       ✅        |
| 点击选择回调        |     ✅      |       —       |     —     |        —        |
| 无 URL 的纯文本回退 |     ✅      |       —       |     —     |        —        |
| 自定义标签插槽      |     ✅      |       —       |     —     |        —        |

`—` = 不支持或以其他方式处理。

### 使用注意

- `select` 仅对带 `url` 的条目触发——纯 span 不渲染链接，也不触发任何事件。
- 链接默认在新标签页打开（`target="_blank"`）；无法通过组件覆盖——如需拦截，请在点击处理器中阻止。
- 条目以 `source.key` 作为 key——同一 `sources` 数组中 key 必须唯一。
- `author` 字段属于 `Source` 类型，但默认不渲染；请使用 `label` 插槽展示它。

## 常见问题

### 如何展示没有链接的来源？

省略该 `Source` 的 `url`——它会渲染为纯文本标签而非链接。参见 02-without-url 演示。

### 来源被点击时如何响应？

监听 `select`（或传入 `onSelect`）——每当链接条目被点击时，它会携带完整 `Source` 触发。

### 为什么某些条目的点击不触发？

只有带 `url` 的条目渲染为链接并触发 `select`。不带 `url` 的条目渲染为普通 span，没有点击行为。

### 如何展示作者？

使用 `label` 插槽——它接收 `{ source }`，可在标题旁渲染 `source.author`。

### 应该把来源列表放在哪里？

放在引用它们的助手 `SxBubble` 下方——通常紧贴消息正文之下，作为引用轨迹。
