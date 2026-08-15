# 对话气泡

## 概述

`SxBubble` 渲染单条对话气泡——AI 对话 UI 中的原子消息单元。它展示一条消息（用户 / AI / 系统 / 分隔线），支持可配置的位置、视觉变体、加载状态与可选打字机动画。

任何需要展示单条消息的场景都适用：固定的用户/AI 对话、流式助手消息或「思考中」占位。`SxBubbleList` 在内部组合 `SxBubble` 作为默认条目渲染——用户消息放在 `end`，其余放在 `start`。可与 `SxSender`（产生消息）以及 `SxMarkdown` / `SxAttachments`（丰富消息内容）搭配使用。

## 用法

<UsageCode component="bubble" />

## 特性

- 🧩 消息或拆分传参 — 通过 `message` 传入完整的 `ChatMessage`，或直接传 `content` + `role`
- 🎨 三种变体 — `filled`、`outlined`、`shadow`，由 `bubbleVariants` 配方驱动
- ↔️ 位置 — `start`（AI/系统）与 `end`（用户）
- 📏 主题尺寸 — `avatarSize` 接受任意 `ThemeSize`（xs–2xl）
- ⏳ 加载状态 — `loading` 时显示弱化的「Thinking…」占位
- ⌨️ 打字机效果 — 由 `useTyping({ effect: 'typing', step: 2, interval: 16 })` 驱动的逐字动画
- 🧩 三个插槽 — `header`、`content`（接收打字进度）与 `footer`
- ♿ 无障碍 — 语义化结构，加载文本弱化显示，不干扰读屏
- 🔒 类型安全 — `ChatMessage` / `ChatRole` / `ThemeSize` / `ClassValue` 全部严格类型化，无 `any`

## 演示

<PlaygroundGallery component="bubble" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根节点类名。' },
  { name: 'message', type: 'ChatMessage', default: '-', description: '要渲染的消息。省略时使用 `content` / `role` 属性。' },
  { name: 'content', type: 'string', default: '-', description: '消息文本内容（未提供 `message` 时使用）。' },
  { name: 'role', type: 'ChatRole', default: '-', description: '消息角色（未提供 `message` 时使用）。`ChatRole` = `\'ai\' | \'user\' | \'system\' | \'divider\' | string`。' },
  { name: 'placement', type: `'start' | 'end'`, default: `'start'`, description: '消息位置。' },
  { name: 'variant', type: `'filled' | 'outlined' | 'shadow'`, default: `'filled'`, description: '视觉变体。' },
  { name: 'avatarSize', type: 'ThemeSize', default: `'md'`, description: '头像尺寸。' },
  { name: 'loading', type: 'boolean', default: 'false', description: '是否显示加载指示。' },
  { name: 'typing', type: 'boolean', default: 'false', description: '是否对内容启用打字机 / 淡入效果。' },
]"/>

### Emits

该组件不触发任何事件。

### Slots

<DataTable preset="slots" :data="[
  { name: 'header', parameters: '-', description: '消息主体上方的内容。' },
  { name: 'content', parameters: '{ content: string }', description: '自定义消息主体；`content` 为展示文本，包含打字机进度。' },
  { name: 'footer', parameters: '-', description: '消息主体下方的自定义内容。' },
]"/>

## 注意事项

### 架构与行业对标

`SxBubble` 是 `@soybeanjs/ui-x` 中带样式、单包的 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上：它复用 `cv()` 配方方式以及 `ThemeSize`、`ClassValue` 类型，同时把打字机动画委托给 `@soybeanjs/ui-x` 中与框架无关的 `useTyping` 组合式函数，基础消息类型来自 `@soybeanjs/ui-x/types`。SFC 本身保持轻量——只负责样式配方接线、属性/状态透传与插槽渲染，不含任何 DOM 或定时器逻辑。

| 能力                               | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :--------------------------------- | :---------: | :-----------: | :-------: | :-------------: |
| 单个带样式消息气泡                 |     ✅      |       —       |    ✅     |       ✅        |
| 变体（filled / outlined / shadow） |     ✅      |       —       |     —     |       ✅        |
| 打字机效果                         |     ✅      |       —       |     —     |        —        |
| 「Thinking…」加载状态              |     ✅      |       —       |     —     |       ✅        |
| Headless/样式逻辑分离              |     ✅      |       —       |     —     |        —        |
| 渲染完整 `ChatMessage` 对象        |     ✅      |       —       |     —     |        —        |

`—` = 不支持或需在组件外部处理（Vercel AI SDK 提供 headless 消息原语，展示交由应用自行实现）。

### 使用注意

- `typing` 纯粹是视觉效果——它只动画展示已有的文本，不负责获取、节流或生成 token。真实流式场景下请持续传入增长的 `content` / `message.content`，并切换 `typing` 来动画呈现。
- 启用 `typing` 时 `content` 插槽收到的是逐字展开的文本；设置 `loading`（且未打字）时回退内容显示「Thinking…」。若提供自定义 `content` 插槽，回退/打字渲染由你自行负责。
- `placement` 只影响对齐与颜色样式，不改变消息顺序；排序由父组件负责（如 `SxBubbleList`）。

## 常见问题

### 如何渲染我存储的消息？

把完整消息对象传给 `message`（`<SxBubble :message="item" />`），或分别传 `content` 与 `role`。`SxBubbleList` 正是对每条消息这样处理。

### 如何展示助手「思考中」？

设置 `loading`——气泡会用弱化的「Thinking…」占位替代内容。

### 如何让流式消息动起来？

设置 `typing`；文本会经 `useTyping` 逐字展示。参见 04-typing 演示。

### 用户与 AI 消息各用哪个位置？

惯例是用户用 `end`、AI/系统用 `start`。`SxBubbleList` 会根据 `role` 自动应用。

### 如何在气泡内渲染 Markdown？

使用 `content` 插槽配合 `SxMarkdown`（参见 bubble-list 的 02-custom-item 演示）。插槽会收到包含打字机进度的展示文本。
