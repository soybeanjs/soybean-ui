# 会话列表

## 概述

`SxConversations` 是 AI 会话侧栏列表——一个分组、可选择的会话项列表，带有当前会话状态跟踪。它按 `group` 字段对项分组，并自动渲染分组标题。

用作聊天界面的左侧栏，列出用户的所有会话。它与 `SxSender`（消息输入）和 `SxBubbleList`（消息展示）搭配，构成完整的聊天外壳。带有 `group` 值的项渲染在分组标题下；没有 `group` 的项则不带分组标题直接渲染。

## 用法

<UsageCode component="conversations" />

## 特性

- 🗂 自动分组 — 按 `item.group` 分组；空分组不渲染标题
- ✅ 选中状态 — 匹配 `id` 的当前项获得 `aria-current="true"` 与选中类名
- 🖱 可选择 — 点击项触发 `change` 并携带完整 `ConversationItem` 调用 `onChange`
- 🧩 两个插槽 — `groupTitle`（携带分组 key）与 `item`（携带完整项）
- 🎨 无障碍 — 每个项都是 `<button>`，当前项带 `aria-current`
- 🔒 类型安全 — 接收来自 `@soybeanjs/ui-x/types` 的 `ConversationItem[]`

## 演示

<PlaygroundGallery component="conversations" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根节点类名。' },
  { name: 'items', type: 'ConversationItem[]', default: '-', description: '要展示的会话列表。', required: true },
  { name: 'active', type: 'string | null', default: 'null', description: '当前选中的会话 id。' },
  { name: 'onChange', type: '(item: ConversationItem) => void', default: '-', description: '会话被选中时调用的回调。' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'change', parameters: '[item: ConversationItem]', description: '会话被选中时触发。' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'groupTitle', parameters: '{ group: string }', description: '自定义分组标题内容。' },
  { name: 'item', parameters: '{ item: ConversationItem }', description: '自定义单项内容。' },
]"/>

## 注意事项

### 架构与行业对标

`SxConversations` 是 `@soybeanjs/ui-x` 中带样式、单包的 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上。分组逻辑通过本地 `Map` 计算——由于算法极为简单（一次 `group by` 遍历），没有对应的 headless 组合式函数。组件只负责分组、选中类名切换与选择事件的接线。`ConversationItem` 类型与 `@soybeanjs/ui-x/types` 共享。

| 能力 | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :--- | :---: | :---: | :---: | :---: |
| 分组会话列表 | ✅ | — | — | ✅ |
| 带 `aria-current` 的选中项 | ✅ | — | — | — |
| 自定义分组标题插槽 | ✅ | — | — | — |
| 自定义单项插槽 | ✅ | — | — | — |
| 带 `group` 的 `ConversationItem` 类型 | ✅ | — | — | ✅ |

`—` = 不支持或以其他方式处理。

### 使用注意

- `active` 按身份比较（`item.id === active`），而非引用。请使用字符串或原始类型 id。
- 没有 `group` 字段的项会被归入空分组 key 下并隐藏标题——它们仍渲染为可点击的项。
- `change` 事件会同时触发 `onChange` 与 Vue 事件。若只监听 `@change`，回调属性不会被调用，反之亦然。
- 组件不处理排序——请按期望的展示顺序传入项。分组按 `Map` 的插入顺序出现。

## 常见问题

### 如何设置当前选中的会话？

将其 `id` 传入 `active`：`:active="currentId"`，并在 `@change` 中更新。

### 如何为分组标题添加图标？

使用 `groupTitle` 插槽——它接收 `{ group }`，可加前缀：`#groupTitle="{ group }">📂 {{ group }}</template>`。参见 02-custom-title 演示。

### 如何自定义项的渲染？

使用 `item` 插槽——它接收 `{ item }`，包含完整的 `ConversationItem`（`id`、`title`、`group`、`updatedAt`）。

### 项没有 group 时会怎样？

没有 group 的项归入空 key 下，不渲染标题，但仍可选择。

### 如何添加「新建会话」按钮？

在 `SxConversations` 外部渲染——该组件是纯列表，不包含新建操作。
