# 提示列表

## 概述

`SxPrompts` 是 AI 的提示胶囊行——一排可点击的提示按钮，为用户提供快速的一键启动问题。它是 `SxWelcome` 内部的可复用构建块，也可独立放在 `SxSender` 下方使用。

可放在任何你想推荐问题、命令或操作的地方。每个提示渲染为一个胶囊按钮，标签前可选地显示原始图标字形，按 `prompt.key` 作为 key。

## 用法

<UsageCode component="prompts" />

## 特性

- 💊 胶囊按钮 — 每个提示一个按钮，通过 `promptsVariants` UnoCSS 配方定义样式
- 🖱 一键选择 — 点击胶囊携带完整 `Prompt` 触发 `select`
- ✨ 可选图标字形 — 存在时在标签前以原始文本（emoji）渲染 `prompt.icon`
- 🧩 自定义标签插槽 — `label` 插槽接收 `{ prompt }`，完全控制标签
- 🎨 响应式布局 — 可与自己的栅格类组合（如 `grid grid-cols-2 gap-2`）
- 🔒 类型安全 — 来自 `@soybeanjs/ui-x/types` 的 `Prompt[]`

## 演示

<PlaygroundGallery component="prompts" />

## API

<ComponentApi component="prompts" />

## 注意事项

### 架构与行业对标

`SxPrompts` 是 `@soybeanjs/ui-x` 中带样式、单包的 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上。它是一个轻量的数据驱动渲染器：迭代 `prompts`、触发 `select`、透传 `label` 插槽——扁平胶囊列表无需 headless 组合式函数。`Prompt` 类型（`key`、`label`、`icon`、`description`）与 `@soybeanjs/ui-x/types` 共享，同时也支撑 `SxWelcome`、`SxSuggestion` 与输入框的建议逻辑。

| 能力               | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :----------------- | :---------: | :-----------: | :-------: | :-------------: |
| 提示胶囊行         |     ✅      |       —       |     —     |       ✅        |
| 一键选择回调       |     ✅      |       —       |     —     |        —        |
| 每个提示的图标字形 |     ✅      |       —       |     —     |       ✅        |
| 自定义标签插槽     |     ✅      |       —       |     —     |        —        |
| 共享 `Prompt` 类型 |     ✅      |       —       |     —     |        —        |

`—` = 不支持或以其他方式处理。

### 使用注意

- 每个胶囊以 `prompt.key` 作为 key——同一 `prompts` 数组中 key 必须唯一，否则 Vue 会告警并错误重渲染。
- `icon` 字段以原始文本渲染（用于 emoji）。请勿传入 HTML 或任意标记。
- `select` 在每次点击时都会触发，即使提示已处于「选中」——组件没有内部选中状态。
- 除配方外，组件默认不负责胶囊的布局；请自行添加容器类（如 `grid` / `flex`）实现自定义排布。

## 常见问题

### 提示被点击时如何响应？

监听 `select`（或传入 `onSelect`）——处理器会收到完整 `Prompt`。参见 02-select 演示。

### 如何为提示添加图标？

在 `Prompt` 对象上设置 `icon`——它会在标签前以原始文本渲染（emoji 效果很好）。

### 如何自定义标签文本？

使用 `label` 插槽——它接收 `{ prompt }`，可渲染任意内容。

### 可以更改胶囊的布局吗？

可以——通过 `class` 给根节点应用类，例如 `class="grid grid-cols-2 gap-2"` 实现两列栅格。

### 与 `SxSuggestion` 有何不同？

两者都渲染提示胶囊，但 `SxSuggestion` 使用更小的 chip 样式（通常放在 `SxBubble` 内），而 `SxPrompts` 是更大的独立行（如放在 `SxWelcome` 中）。它们共用相同的 `Prompt` 结构。
