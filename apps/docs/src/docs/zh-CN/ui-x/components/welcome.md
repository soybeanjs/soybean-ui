# 欢迎页

## 概述

`SxWelcome` 是 AI 聊天的问候界面——一个居中的欢迎面板，包含可选的标题、描述与推荐提示列表。它是用户在新会话中首先看到的内容。

用作聊天应用在没有消息时的空状态。它内部组合 `SxPrompts` 渲染提示胶囊，传入 `prompts` 即可为用户提供一键启动问题。它自然地与下方的 `SxSender` 搭配；会话开始后可替换为 `SxBubbleList`。

## 用法

<UsageCode component="welcome" />

## 特性

- 👋 问候文案 — `title`（渲染为 `h2`）与 `description`（渲染为 `p`），均可选
- 💡 推荐提示 — 内部组合 `SxPrompts`；胶囊按钮以 `selectPrompt` 重新发出
- 🧩 自定义插槽 — `title` 与 `description` 插槽完全替换默认标题与段落
- 🚫 条件渲染 — 标题/描述仅在非空时才回退到对应标题元素；提示仅在 `prompts?.length` 时渲染
- 🔗 一键启动 — 点击提示将 `Prompt` 对象交给你的处理器
- 🔒 类型安全 — `Prompt[]` 与 `SxPrompts` 共享，来自 `@soybeanjs/ui-x/types`

## 演示

<PlaygroundGallery component="welcome" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根节点类名。' },
  { name: 'title', type: 'string', default: `''`, description: '问候标题。' },
  { name: 'description', type: 'string', default: `''`, description: '描述文本。' },
  { name: 'prompts', type: 'Prompt[]', default: '-', description: '显示在文案下方的推荐提示。' },
  { name: 'onSelectPrompt', type: '(prompt: Prompt) => void', default: '-', description: '提示被点击时调用的回调。' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'selectPrompt', parameters: '[prompt: Prompt]', description: '提示被点击时触发。' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'title', parameters: '-', description: '自定义标题内容（替换默认 h2）。' },
  { name: 'description', parameters: '-', description: '自定义描述内容（替换默认 p）。' },
]"/>

## 注意事项

### 架构与行业对标

`SxWelcome` 是 `@soybeanjs/ui-x` 中带样式、单包的 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上。它是一个纯组合壳：渲染文案块，并把提示胶囊列表委托给同级的 `SxPrompts` 组件，将其 `select` 事件重新发出为 `selectPrompt`。没有对应的 headless 实现——组件除属性透传与条件渲染外不持有任何状态。

| 能力                | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :------------------ | :---------: | :-----------: | :-------: | :-------------: |
| 问候标题 + 描述     |     ✅      |       —       |     —     |        —        |
| 推荐提示胶囊        |     ✅      |       —       |     —     |       ✅        |
| 提示选择回调        |     ✅      |       —       |     —     |        —        |
| 自定义标题/描述插槽 |     ✅      |       —       |     —     |        —        |
| 聊天应用空状态      |     ✅      |       —       |     —     |       ✅        |

`—` = 不支持或以其他方式处理。

### 使用注意

- 默认 `h2` / `p` 仅在对应字符串属性非空时才渲染——请同时传入 `title` 与 `description`，避免出现孤零零的提示列表。
- `title` 与 `description` 与对应插槽互斥：提供插槽后，该区域的字符串属性被忽略。
- 提示区块仅在 `prompts?.length` 为真时渲染——空数组会完全隐藏它。
- `selectPrompt` 重新发出内部 `SxPrompts` 的 `select` 事件，因此每次点击都会携带完整的 `Prompt` 对象（`key`、`label`、`icon`、`description`）。

## 常见问题

### 如何让欢迎页显示启动提示？

传入 `prompts`——一个 `Prompt` 对象数组。胶囊会自动出现在文案下方。

### 提示被点击时如何响应？

监听 `selectPrompt`（或传入 `onSelectPrompt`）——处理器会收到完整 `Prompt`，可按 `key` 映射到操作：`@select-prompt="startChat($event)"`。

### 如何用自定义标记完全替换标题？

使用 `title` 插槽——它完全替换默认 `h2`。`description` 插槽对段落做同样的事。参见 02-custom-slots 演示。

### 可以隐藏提示区块吗？

可以——省略 `prompts` 或传入空数组。该区块仅在 `prompts?.length` 为真时渲染。

### 这适合放在聊天应用的什么位置？

在有任何消息之前用作空状态：上方 `SxWelcome`，下方 `SxSender`。会话开始后将其替换为 `SxBubbleList`。
