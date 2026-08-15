# 附件列表

## 概述

`SxAttachments` 是 AI 对话的附件条——一个纵向的附件预览列表，内置选择与移除操作。它为每个附件渲染一个 `SxFileCard`，并把图标、名称、元信息等视觉细节全部委托给这个同级组件。

可在 `SxSender` 上方使用，用于展示消息发送前待定的附件；也可放在 `SxBubble` 内展示已发送消息携带的附件。它内部组合了 `SxFileCard`，因此两者共用同一套 `Attachment` 数据模型与基于类型的图标映射。

## 用法

<UsageCode component="attachments" />

## 特性

- 🧱 组合 `SxFileCard` — 每个附件渲染为完整的文件卡片，含类型图标、名称与元信息
- 🖱 点击选择 — 点击卡片触发 `select`（例如打开预览）
- 🗑 单项移除 — 默认 `actions` 插槽渲染移除按钮，通过 `click.stop` 触发 `remove`
- 🎨 自定义插槽 — `prepend`、`item`、`actions`、`remove-icon` 覆盖大部分布局需求
- 📏 紧凑纵向布局 — 细窄的根容器列，可随附件数量自适应伸缩
- 🔒 类型安全 — 直接接收 `@soybeanjs/ui-x/types` 的 `Attachment[]`

## 演示

<PlaygroundGallery component="attachments" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根节点类名。' },
  { name: 'attachments', type: 'Attachment[]', default: '-', description: '要渲染的附件。', required: true },
  { name: 'showIcons', type: 'boolean', default: 'true', description: '是否渲染图标列。' },
  { name: 'onRemove', type: '(attachment: Attachment) => void', default: '-', description: '用户请求移除附件时调用的回调。' },
  { name: 'onSelect', type: '(attachment: Attachment) => void', default: '-', description: '附件被点击时调用的回调。' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'remove', parameters: '[attachment: Attachment]', description: '通过移除按钮移除附件时触发。' },
  { name: 'select', parameters: '[attachment: Attachment]', description: '附件被点击时触发。' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'prepend', parameters: '-', description: '渲染在附件列表上方的内容。' },
  { name: 'item', parameters: '{ attachment: Attachment }', description: '自定义单项内容，替换默认的 SxFileCard。' },
  { name: 'actions', parameters: '{ attachment: Attachment }', description: '每个附件的自定义操作（覆盖默认移除按钮）。' },
  { name: 'remove-icon', parameters: '-', description: '自定义移除按钮图标。' },
]"/>

## 注意事项

### 架构与行业对标

`SxAttachments` 是 `@soybeanjs/ui-x` 中带样式、单包的 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上。它只负责列表迭代与选择/移除的接线；单项展示完全委托给同级的 `SxFileCard` 组件，使图标映射与元信息渲染集中在一处。`@soybeanjs/ui-x` 中没有对应的 headless 列表壳——它是对共享 `Attachment` 类型的轻量样式化组合。

| 能力                       | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :------------------------- | :---------: | :-----------: | :-------: | :-------------: |
| 附件预览列表               |     ✅      |       —       |     —     |       ✅        |
| 点击选择附件               |     ✅      |       —       |     —     |        —        |
| 单项移除操作               |     ✅      |       —       |     —     |       ✅        |
| 可组合插槽（item/actions） |     ✅      |       —       |     —     |        —        |
| 共享 `Attachment` 数据模型 |     ✅      |       —       |     —     |        —        |

`—` = 不支持或以其他方式处理。

### 使用注意

- 默认 `actions` 插槽渲染的移除按钮会触发 `remove`——组件**不会**修改你的 `attachments` 数组，请在处理器中自行过滤。
- 移除按钮使用 `click.stop`，因此点击它不会同时触发 `select`。
- 提供 `item` 插槽后，默认的 `SxFileCard`（及其点击选择接线）会被替换——若仍需选择，请自行绑定点击处理器。
- `showIcons` 只隐藏图标列；图标*内容*由 `SxFileCard` 依据 `attachment.kind` 决定。

## 常见问题

### 如何移除一个附件？

监听 `remove` 并更新数组：`@remove="attachments = attachments.filter(a => a.id !== $event.id)"`。

### 附件被点击时如何打开预览？

监听 `select` 并打开你自己的预览——`@select="openPreview($event)"`。每个卡片点击都会携带被点击的 `Attachment` 触发 `select`。

### 如何在列表上方添加标题？

使用 `prepend` 插槽——它渲染在根容器的最顶部。

### 可以完全自定义每个附件的展示吗？

可以——`item` 插槽接收 `{ attachment }`，会完全替换默认的 `SxFileCard`。参见 02-custom-item 演示。

### 如何更换移除图标？

使用 `remove-icon` 插槽，或覆盖 `actions` 渲染自己的控件（该插槽接收 `{ attachment }`）。
