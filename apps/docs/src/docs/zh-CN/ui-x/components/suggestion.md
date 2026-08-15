# 建议列表

## 概述

`SxSuggestion` 是 AI 的跟进建议 chip 行——显示在助手消息之后的一排紧凑小 chip。用户可一键继续、重新生成或深入追问上一条回答。

放在助手 `SxBubble` 内部（通常在消息正文之后）提供快速跟进。它复用 `Prompt` 类型，形状与 `SxPrompts` 相同，但采用更小的 chip 样式。每个 chip 以 `suggestion.key` 作为 key，可携带可选图标字形。

## 用法

<UsageCode component="suggestion" />

## 特性

- 🏷 紧凑 chip — 比 `SxPrompts` 更小的胶囊样式，专为气泡内放置设计
- 🖱 一键选择 — 点击 chip 携带完整 `Prompt` 触发 `select`
- ✨ 可选图标字形 — 存在时在标签前以原始文本（emoji）渲染 `suggestion.icon`
- 🧩 自定义标签插槽 — `label` 插槽接收 `{ suggestion }`，完全控制内容
- 🔁 复用 `Prompt` — 与 `SxPrompts` 相同的 `key` / `label` / `icon` / `description` 结构
- 🔒 类型安全 — 来自 `@soybeanjs/ui-x/types` 的 `Prompt[]`

## 演示

<PlaygroundGallery component="suggestion" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根节点类名。' },
  { name: 'suggestions', type: 'Prompt[]', default: '-', description: '要展示的建议。', required: true },
  { name: 'onSelect', type: '(suggestion: Prompt) => void', default: '-', description: '建议被点击时调用的回调。' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'select', parameters: '[suggestion: Prompt]', description: '建议被点击时触发。' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'label', parameters: '{ suggestion: Prompt }', description: '每个建议的自定义标签内容。' },
]"/>

## 注意事项

### 架构与行业对标

`SxSuggestion` 是 `@soybeanjs/ui-x` 中带样式、单包的 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上。它在结构上与 `SxPrompts` 完全相同——迭代数据、触发 `select`、透传 `label` 插槽——但使用 `suggestionVariants` 配方实现更小的 chip 样式，并暴露 `suggestions` 属性名以契合跟进场景。它复用的 `Prompt` 类型与 `SxPrompts`、`SxWelcome` 及输入框的建议逻辑共享。

| 能力                   | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :--------------------- | :---------: | :-----------: | :-------: | :-------------: |
| 跟进建议 chip          |     ✅      |       —       |     —     |        —        |
| 一键选择回调           |     ✅      |       —       |     —     |        —        |
| 每个建议的图标字形     |     ✅      |       —       |     —     |        —        |
| 自定义标签插槽         |     ✅      |       —       |     —     |        —        |
| 复用共享 `Prompt` 类型 |     ✅      |       —       |     —     |        —        |

`—` = 不支持或以其他方式处理。

### 使用注意

- 每个 chip 以 `suggestion.key` 作为 key——同一 `suggestions` 数组中 key 必须唯一。
- `icon` 字段以原始文本渲染（用于 emoji）。请勿传入 HTML 或任意标记。
- `select` 在每次点击时都会触发——组件没有内部选中或禁用状态。
- 组件只渲染 chip 行，不会自动提交跟进消息——请在 `select` 处理器中自行接线。

## 常见问题

### 建议被点击时如何响应？

监听 `select`（或传入 `onSelect`）——处理器会收到完整 `Prompt`（作为 `suggestion`）。参见 02-select 演示。

### 建议行应该放在哪里？

放在助手 `SxBubble` 内部、消息正文之后——提供快捷跟进操作。

### 与 `SxPrompts` 有何不同？

`SxSuggestion` 是同一提示模式的更小、置于气泡内的 chip 变体；`SxPrompts` 是用于 `SxWelcome` 的更大独立行。两者共用 `Prompt` 结构。

### 如何为建议添加图标？

在建议对象上设置 `icon`——它会在标签前以原始文本渲染（emoji 效果很好）。

### 如何自定义 chip 标签？

使用 `label` 插槽——它接收 `{ suggestion }`，可渲染任意内容。
