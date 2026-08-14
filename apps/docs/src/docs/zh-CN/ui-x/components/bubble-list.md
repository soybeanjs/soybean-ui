# 消息列表

## 概述

`SxBubbleList` 根据 `ChatMessage[]` 渲染数据驱动的对话记录。它负责滚动容器，当用户位于底部时自动跟随新消息，并通过默认的 `SxBubble` 渲染每条消息——用户消息放在 `end`，其余放在 `start`。

任何一组聊天消息都适用：静态对话记录、由 `SxSender` 驱动的实时对话，或流式会话。可与 `SxSender`（输入）、`SxMarkdown`（富文本）以及 `SxAttachments`（文件项）搭配，构建完整的聊天面板。

## 用法

<UsageCode component="bubble-list" />

## 特性

- 📜 滚动容器 — `scrollable` 时设置 `role="log"`；否则按内容自适应高度
- 🔒 自动跟随 — 用户已在底部附近时，新消息到达会自动钉到底部（`useBubbleListScroll`）
- 🎯 可配置阈值 — `scrollThreshold`（px）定义「位于底部」，默认 `40`
- ⬇️ 返回底部按钮 — 上滑浏览时自动出现，带 `back-to-bottom-icon` 插槽
- 🧩 `items` 插槽 — 完全替换默认渲染
- 🧩 `content` 插槽 — 保留默认气泡外观，仅覆盖每条消息主体
- 🔠 按角色定位 — `role === 'user'` 使用 `end` 位置，否则用 `start`
- ♿ 无障碍 — 可滚动容器上的 `role="log"` 实时区域
- 🔒 类型安全 — 要求 `items: ChatMessage[]`；每条消息需有唯一 `id`

## 演示

<PlaygroundGallery component="bubble-list" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根节点类名。' },
  { name: 'items', type: 'ChatMessage[]', default: '-', description: '要渲染的消息列表。必填。' },
  { name: 'scrollable', type: 'boolean', default: 'true', description: '容器是否有约束高度并应可滚动。设为 `false` 时列表按内容自适应高度。' },
  { name: 'scrollThreshold', type: 'number', default: '40', description: '与底部距离小于该值（px）视为「位于底部」。' },
  { name: 'showBackToBottom', type: 'boolean', default: 'true', description: '是否显示「返回底部」按钮。' },
]"/>

### Emits

该组件不触发任何事件。

### Slots

<DataTable preset="slots" :data="[
  { name: 'items', parameters: '{ items }', description: '替换整个默认气泡列表。' },
  { name: 'content', parameters: '{ message, content }', description: '覆盖单条消息主体（`ChatMessage` + 展示文本）。' },
  { name: 'back-to-bottom-icon', parameters: '-', description: '替换默认的「↓」返回底部图标。' },
]"/>

## 注意事项

### 架构与行业对标

`SxBubbleList` 是 `@soybeanjs/ui-x` 中带样式、单包的 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上：滚动状态（近底部检测、跟随与距离测量）委托给 `@soybeanjs/ui-x` 的 `useBubbleListScroll` 组合式函数，默认条目渲染组合同级的 `SxBubble` 组件。SFC 本身只负责 `bubbleListVariants` 配方接线、自动钉底监听与插槽透传。由于组合的是 `SxBubble` 而非重新实现气泡，气泡的全部能力（变体、打字、加载）在列表场景下开箱即用。

| 能力 | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :--- | :---: | :---: | :---: | :---: |
| 数据驱动消息列表 | ✅ | — | ✅ | ✅ |
| 位于底部时自动跟随 | ✅ | — | ✅ | ✅ |
| 返回底部按钮 | ✅ | — | — | — |
| `role="log"` 实时区域 | ✅ | — | ✅ | — |
| 逐条消息内容插槽 | ✅ | — | — | ✅ |
| 组合单个气泡组件 | ✅ | — | — | — |

`—` = 不支持或以其他方式处理。

### 使用注意

- `scrollable` 仅在容器有约束高度时才有意义——请给列表一个高度（如演示中的 `h-80` / `h-full`），否则它会按内容自适应高度而永远不会滚动。
- 自动跟随是按位置感知而非强制：只有当用户已在底部附近时列表才会钉到底部。浏览旧消息会暂停跟随（设计如此），直到用户回到底部。
- 每条消息都需要稳定且唯一的 `id`——它用作渲染 `key`（`message.id`）。

## 常见问题

### 如何让列表成为固定高度的滚动区域？

传入 `scrollable` 并用类名约束高度，例如 `<SxBubbleList class="h-80" :items="items" scrollable />`（参见 01-basic 演示）。

### 如何为 AI 消息渲染 Markdown？

使用 `content` 插槽配合 `SxMarkdown`——02-custom-item 演示展示了 AI 用 Markdown、用户用纯文本的拆分写法。

### 如何完全替换默认气泡？

使用 `items` 插槽；它会收到完整的 `items` 数组，你可以自行渲染任意布局。

### 可以隐藏或改造返回底部按钮吗？

用 `show-back-to-bottom="false"` 隐藏，或通过 `back-to-bottom-icon` 插槽替换其图标。

### 为什么我浏览旧消息时不会自动滚动？

自动跟随是按位置感知的：只有当你已位于底部时才会钉底。滚动回底部（或点击返回底部按钮）即可恢复跟随。
