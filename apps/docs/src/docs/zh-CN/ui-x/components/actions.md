# 操作

## 概述

`SxActions` 是紧凑的操作工具栏，渲染一排横向按钮，每个按钮代表对 AI 消息的一个用户操作（如复制、点赞、点踩、分享、重新生成）。

用于消息气泡下方，提供快速的行内操作。每个条目由 `ActionItem` 对象定义，包含 `key`、`label`、可选 `icon` 与可选 `disabled` 状态。禁用条目会自动以 `disabled` 与 `data-disabled` 属性渲染，且不会触发事件。

`SxActions` 与 `SxActionsCopy`（专用复制操作）、`SxActionsFeedback`（点赞/点踩切换）、`SxFolder`（可折叠文件夹）为同族组件。它是最灵活的操作栏，适合任意自定义操作集合。

## 用法

<UsageCode component="actions" />

## 特性

- 🔘 每个操作一个按钮 — 为 `items` 数组中的每个条目渲染一个 `button`
- 🚫 禁用状态 — `disabled: true` 的条目以 `:disabled` 与 `data-disabled` 渲染；点击被抑制
- 🧩 自定义插槽 — 每个条目的 `icon` 与 `label` 插槽接收 `{ item }`，支持完整自定义
- 🔔 `action` 事件 — 点击时携带被点击的 `ActionItem` 对象（跳过禁用条目）
- ♿ 无障碍 — 每个按钮根据条目的 `label` 字段设置 `aria-label`
- 🔒 类型安全 — `ActionItem` 与 `ActionsProps` 提供完整的 TypeScript 接口

## 演示

<PlaygroundGallery component="actions" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根节点类名。' },
  { name: 'items', type: 'ActionItem[]', default: '-', description: '要展示的操作。每个条目含 `key`、`label`、可选 `icon` 与可选 `disabled`。' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'action', parameters: '[item: ActionItem]', description: '点击非禁用操作时触发，携带操作条目。' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'icon', parameters: '{ item: ActionItem }', description: '每个操作按钮的自定义图标渲染。' },
  { name: 'label', parameters: '{ item: ActionItem }', description: '每个操作按钮的自定义标签渲染。' },
]"/>

## 注意事项

### 架构与行业对标

`SxActions` 是 `@soybeanjs/ui-x` 中带样式、单包的 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上：它是纯粹的展示组件，不依赖任何 headless 组合式函数——`ActionItem` 类型与 `action` 事件构成了全部 API 面。SFC 负责 `actionsVariants` 配方接线，并遍历条目、透传插槽。

| 能力                    | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :---------------------- | :---------: | :-----------: | :-------: | :-------------: |
| 可配置操作工具栏        |     ✅      |       —       |     —     |       ✅        |
| 逐条目禁用状态          |     ✅      |       —       |     —     |       ✅        |
| 自定义图标/标签插槽     |     ✅      |       —       |     —     |        —        |
| 每个按钮的 `aria-label` |     ✅      |       —       |     —     |        —        |
| 类型安全的操作条目      |     ✅      |       —       |     —     |        —        |

`—` = 不支持或以其他方式处理。

### 使用注意

- `items` 可选——未提供条目时组件渲染为空容器。
- 禁用条目仍会渲染在 DOM 中，但带有 `disabled` 与 `data-disabled` 属性。禁用条目不会触发 `action` 事件。
- `icon` 插槽缺省时，若条目存在 `icon` 字符串则会渲染之。使用插槽可用自定义组件替换图标。
- `action` 事件携带整个 `ActionItem` 对象，而非仅 key——处理函数中可访问 `key`、`label`、`icon` 与 `disabled`。

## 常见问题

### 如何添加自定义操作？

在 `items` 数组中添加一个条目，包含唯一的 `key` 与 `label`：

```ts
const items = [{ key: 'regenerate', label: '重新生成', icon: '🔄' }];
```

### 如何让某个操作禁用？

在 `ActionItem` 上设置 `disabled: true`。按钮以 `disabled` 与 `data-disabled` 属性渲染，且不会触发事件。

### 如何判断点击的是哪个操作？

监听 `action` 事件并检查 `$event.key`：

```vue
<SxActions :items="items" @action="onAction" />
```

```ts
function onAction(item: ActionItem) {
  if (item.key === 'copy') copyToClipboard();
}
```

### 如何为特定操作自定义图标？

使用 `icon` 插槽——它接收 `{ item }`，可据此条件渲染不同图标：

```vue
<template #icon="{ item }">
  <MyIcon :name="item.key" />
</template>
```
