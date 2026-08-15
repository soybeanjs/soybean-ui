# 文件卡片

## 概述

`SxFileCard` 是 AI 包中的原子文件预览卡片——将单个附件渲染为类型图标、文件名与元信息行（`mimeType · size`）。它是 `SxAttachments` 用于渲染列表项的基础构建块。

用于在消息内部、上传队列或任何文件列表中预览单个附件。它内部不组合任何组件，但设计为嵌套在 `SxAttachments` 中使用，后者在卡片之上提供了选择/移除行为。

## 用法

<UsageCode component="file-card" />

## 特性

- 🗂 基于类型的图标映射 — 📄 文件、🖼 图片、🎬 视频、🎵 音频、🔗 链接、🗄 数据库、❔ 未知（默认文件）
- 📋 自动元信息行 — 用 `·` 连接 `mimeType` 与 `size`，两者皆空时隐藏
- 🖱 可选点击处理 — 传入 `onClick` 打开预览；根节点变为可聚焦的 `role="button"` 并带 `tabindex=0`
- 🧩 四个插槽 — `icon`、`name`、`meta`、`actions` 完全控制卡片表面
- 🎨 基于 Token 的样式 — 通过 `fileCardVariants` UnoCSS 配方定义，继承你的主题
- 🔒 类型安全 — 渲染来自 `@soybeanjs/ui-x/types` 的任意 `Attachment`

## 演示

<PlaygroundGallery component="file-card" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根节点类名。' },
  { name: 'attachment', type: 'Attachment', default: '-', description: '要渲染的附件。', required: true },
  { name: 'onClick', type: '() => void', default: 'undefined', description: '可选的点击处理（如打开预览）。' },
]"/>

### Emits

此组件不触发任何事件（点击通过 `onClick` 属性传递）。

### Slots

<DataTable preset="slots" :data="[
  { name: 'icon', parameters: '{ kind: AttachmentKind }', description: '针对给定类型的自定义图标内容。' },
  { name: 'name', parameters: '{ attachment: Attachment }', description: '自定义文件名渲染。' },
  { name: 'meta', parameters: '{ meta: string }', description: '自定义元信息行渲染（mimeType · size）。' },
  { name: 'actions', parameters: '{ attachment: Attachment }', description: '渲染在卡片右侧的操作。' },
]"/>

## 注意事项

### 架构与行业对标

`SxFileCard` 是 `@soybeanjs/ui-x` 中带样式、单包的 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上。它是一个叶子组件：仅从单个 `Attachment` 渲染卡片表面，不持有任何状态——类型→图标映射为纯常量，元信息行由计算属性派生。点击行为通过 `onClick` 属性选择加入，同时切换键盘可聚焦的 `role="button"` 语义。`SxAttachments` 组合此卡片并添加列表级别的选择/移除接线。

| 能力                      | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :------------------------ | :---------: | :-----------: | :-------: | :-------------: |
| 单个文件预览卡片          |     ✅      |       —       |     —     |       ✅        |
| 基于类型的图标映射        |     ✅      |       —       |     —     |       ✅        |
| MIME + 大小元信息行       |     ✅      |       —       |     —     |        —        |
| 键盘可聚焦的点击卡片      |     ✅      |       —       |     —     |        —        |
| 图标/名称/元信息/操作插槽 |     ✅      |       —       |     —     |        —        |

`—` = 不支持或以其他方式处理。

### 使用注意

- `icon` 插槽接收 `{ kind }` 而非整个附件——可根据类型渲染自定义图标。
- 元信息行仅在 `mimeType` 或 `size` 至少有一个存在时渲染；此时 `meta` 插槽也会为空。
- `onClick` 为根节点添加 `role="button"` 与 `tabindex=0`，但组件本身未实现键盘激活——若需通过键盘激活卡片，请自行绑定 `keydown` 处理。
- 点击卡片仅触发 `onClick`，不会触发任何 Vue 事件。如需基于事件的选择，请将卡片放入 `SxAttachments`。

## 常见问题

### 卡片被点击时如何打开预览？

传入 `onClick`——`:on-click="openPreview"`。提供后卡片变为键盘可聚焦。参见 02-clickable 演示。

### 如何更改特定类型的图标？

使用 `icon` 插槽——它接收 `{ kind }`，可按类型映射到自己的图标：`#icon="{ kind }"`。

### 为什么元信息行不显示？

元信息行连接 `mimeType` 与 `size`；若两者在你的 `Attachment` 上都为空，则不会渲染。请至少提供其中之一。

### 如何添加操作按钮（如下载）？

使用 `actions` 插槽——它渲染在卡片右侧，携带 `{ attachment }`。

### 支持哪些类型的图标？

`file`、`image`、`video`、`audio`、`link`、`database` 与 `unknown`。缺少 `kind` 时默认使用 `file`。
