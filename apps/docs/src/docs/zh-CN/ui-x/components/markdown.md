# Markdown 渲染

## 概述

`SxMarkdown` 是一个面向 AI 对话输出的流式 Markdown 渲染器。它是对 `markstream-vue` 中 `MarkdownRender` 的轻量样式封装（引入 `markstream-vue/index.css`），支持对逐步到达的 AI 输出进行增量渲染。

当需要逐 token 展示助手回复——聊天消息、流式补全或实时工具输出时使用它。组件会在每次更新时重新解析 `content`，并将未完成的语法结构渲染为占位符，直到设置 `final`。对于静态、非流式文档，可以一次性传入完整 `content` 并设置 `final`。

在 `@soybeanjs/ui-x` 中，`SxMarkdown` 与 `SxCodeBlock`、`SxMermaid` 天然搭配：Markdown 中的代码块可通过 `codeRenderer`（例如使用 `SxCodeBlock`）高亮，图表可通过 `SxMermaid` 嵌入。

## 用法

<UsageCode component="markdown" />

## 特性

- 🧩 轻量封装 — 渲染委托给 `markstream-vue` 的 `MarkdownRender`，透传所有 props 与插槽
- ⚡ 流式渲染 — 增量重新解析 `content`；设置 `final` 可关闭流式占位符
- 🌙 深色模式 — `isDark` 切换渲染器配色，适配深色界面
- ⌨️ 打字机 — `typewriter` 控制文本逐字输出，呈现聊天式显示效果
- 🌊 平滑流式 — `smoothStreaming`（`boolean` 或 `'auto'`）让输出节奏更平滑
- 🔌 自定义代码渲染器 — `codeRenderer` 可接入 `SxCodeBlock` 或任意自定义高亮器
- 🎛️ 解析控制 — `parseOptions` 与 `htmlPolicy` 调节解析与 HTML 处理策略
- 📦 插槽透传 — `MarkdownRender` 的每个插槽都会被动态重新暴露

## 演示

<PlaygroundGallery component="markdown" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根节点类名。' },
  { name: 'content', type: 'string', default: '-', description: '要渲染的 Markdown 源码。流式输入时会被增量重新解析。' },
  { name: 'final', type: 'boolean', default: 'false', description: '流是否已完成。`true` 时禁用流式占位符。' },
  { name: 'mode', type: 'NodeRendererMode', default: `'chat'`, description: '渲染节奏模式。' },
  { name: 'htmlPolicy', type: 'HtmlPolicy', default: `'safe'`, description: 'HTML 处理策略。' },
  { name: 'isDark', type: 'boolean', default: '-', description: '是否以深色模式渲染。' },
  { name: 'typewriter', type: 'NodeRendererTypewriter', default: 'false', description: '打字机动画。' },
  { name: 'smoothStreaming', type: `boolean | 'auto'`, default: '-', description: '启用平滑（有节奏的）流式输出。' },
  { name: 'codeRenderer', type: 'NodeRendererCodeRenderer', default: '-', description: '代码块渲染器。' },
  { name: 'parseOptions', type: 'ParseOptions', default: '-', description: '转发给 Markdown 引擎的解析选项。' },
  { name: 'rendererProps', type: 'Partial<MarkdownRenderProps>', default: '-', description: '转发给底层 `MarkdownRender` 的额外 props。' },
]"/>

### Emits

无自定义事件 — `SxMarkdown` 是透传封装，props 与插槽直接流向 `MarkdownRender`。

### Slots

所有插槽都会动态转发给底层 `MarkdownRender`（通过 `v-for` 遍历 `useSlots()`）。`MarkdownRender` 支持的任意插槽（例如自定义代码块或标题渲染器）都可以用相同名称和插槽 props 进行覆盖。

## 注意事项

### 架构与行业对标

`SxMarkdown` 是 `@soybeanjs/ui-x` 中的带样式、单包 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上。它刻意保持为纯展示层：渲染逻辑位于 `markstream-vue`，而 SoybeanUI-X 负责 Vue 组件形态、深色模式样式与 props 易用性。主流 AI 库要么自带 Markdown 渲染管线，要么委托给 React-markdown 一类库——没有任何一个开箱即用地提供 Vue 3 原生、且内置打字机与平滑流式节奏控制的流式封装。

| 能力 | SoybeanUI-X `SxMarkdown` | Vercel AI SDK（React `Markdown`） | shadcn AI（React） | Ant Design Chat（ProChat） | React markdown 库 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Vue 3 原生 | ✅ | — | — | — | — |
| 流式 Markdown 渲染 | ✅ | ✅ | — | ✅ | — |
| 打字机动画 | ✅ | — | — | — | — |
| 平滑流式节奏 | ✅ | — | — | — | — |
| 深色模式 | ✅ | ✅ | — | ✅ | — |
| 自定义代码渲染器 | ✅ | — | — | — | ✅ |

`—` = 不支持或需要额外接线。

### 使用注意

- `content` 每次变化都会被重新解析——大型非流式文档请一次性传入完整源码，避免无谓的变更。
- 保持 `final` 与流同步；长期不设置会一直保持占位符渲染状态。
- `htmlPolicy` 默认为 `'safe'`——只有在你信任源 HTML 时才应放宽。
- `rendererProps` 最后合并进 `MarkdownRender`，可覆盖显式 props，请谨慎使用。

## 常见问题

### 如何渲染静态 Markdown 文档？

在 `content` 中传入完整源码并设置 `final`：

```vue
<SxMarkdown :content="content" final />
```

### 如何实现 AI 输出流式渲染？

随数据块到达不断更新 `content`，流结束后将 `final` 设为 `true`——参见流式渲染演示。

### 如何开启打字机效果？

为 `SxMarkdown` 设置 `typewriter`，可结合 `mode` 控制输出节奏。

### 如何使用深色模式？

传入 `:is-dark="true"`（或绑定到你的主题状态）即可切换渲染器配色。

### 能否在 Markdown 内使用 `SxCodeBlock` 高亮代码块？

可以——传入一个渲染 `SxCodeBlock` 的 `codeRenderer`，或覆盖 `MarkdownRender` 暴露的代码相关插槽。
