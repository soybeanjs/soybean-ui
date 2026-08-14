# Mermaid 图表

## 概述

`SxMermaid` 是面向 AI 输出的带样式 Mermaid 图表渲染器。它通过 `mermaid` 将图表源码（`code`）渲染为内联 SVG，并提供图片 / 代码模式切换。

用于展示助手在聊天回复中生成的流程图、时序图等图表。渲染通过 `dynamic import('mermaid')` 按需执行（`startOnLoad: false`），当 `code` 或 `mode` 变化时会自动重新渲染。`mermaid` 是可选 peer 依赖——如果缺失或渲染失败，会显示优雅的回退提示。

在 `@soybeanjs/ui-x` 中，`SxMermaid` 可与 `SxMarkdown`（在聊天内容中嵌入图表）搭配，也可结合 `SxCodeBlock` 查看原始图表源码。

## 用法

<UsageCode component="mermaid" />

## 特性

- 📊 内联 SVG — 将图表渲染为内联 SVG（通过 `v-html`），而非外部图片
- 🔄 图表 / 代码切换 — `mode` 在渲染后的图表与原始源码之间切换
- 🪄 懒加载 — 通过 `dynamic import('mermaid')` 按需加载，`startOnLoad: false`
- 🔁 响应式重渲染 — `code` 或 `mode` 变化时自动重新渲染
- 🛟 优雅降级 — peer 依赖缺失或渲染失败时显示友好回退，而不是崩溃
- 🎛️ 开关控制 — `showToggle` 隐藏工具栏，只渲染纯图表

## 演示

<PlaygroundGallery component="mermaid" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根节点类名。' },
  { name: 'code', type: 'string', default: '-', description: 'Mermaid 图表源码。必填。' },
  { name: 'mode', type: `'image' | 'code'`, default: `'image'`, description: '显示模式（渲染图表或源码）。' },
  { name: 'showToggle', type: 'boolean', default: 'true', description: '是否显示图片 / 代码切换。' },
]"/>

### Emits

无自定义事件 — `SxMermaid` 是自包含的展示组件。

### Slots

无插槽 — 图表内容与工具栏完全由组件内部实现。

## 注意事项

### 架构与行业对标

`SxMermaid` 是 `@soybeanjs/ui-x` 中的带样式、单包 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上。它刻意将可选的 `mermaid` peer 依赖排除在核心包之外，仅在真正渲染图表时懒加载——主流 AI 聊天库要么完全不支持图表，要么急切地打包 `mermaid`。

| 能力 | SoybeanUI-X `SxMermaid` | Vercel AI SDK | shadcn AI（React） | Ant Design Chat（ProChat） | React markdown 库 |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Vue 3 原生 | ✅ | — | — | — | — |
| Mermaid 图表渲染 | ✅ | — | — | — | — |
| 内联 SVG 输出 | ✅ | — | — | — | — |
| 图表 / 代码切换 | ✅ | — | — | — | — |
| 可选 peer 依赖（懒加载） | ✅ | — | — | — | — |

`—` = 不支持或需要额外接线。

### 使用注意

- `mermaid` 是可选 peer 依赖——请安装（`pnpm add mermaid`）以启用渲染；未安装时会显示回退提示。
- 渲染使用浏览器 API，SSR 场景下无意义；图表在挂载后于客户端生成。
- `code` 必填且变化时会重新渲染——超大图表请保持源码聚焦，避免频繁变更。
- 切换工具栏仅在 `showToggle` 为 `true` 时渲染；可直接设置 `mode` 控制初始显示。

## 常见问题

### 如何渲染图表？

在 `code` 中传入合法的 Mermaid 源码，并安装可选依赖 `mermaid`：

```vue
<SxMermaid :code="code" />
```

### 如何默认显示源码？

设置 `mode="code"`——将直接展示原始图表源码而非渲染图。

### 可以隐藏图表 / 代码切换吗？

设置 `show-toggle="false"`；工具栏消失，初始 `mode` 决定显示内容。

### 为什么图表显示回退提示？

可选的 `mermaid` peer 依赖缺失，或源码解析失败——请安装 `mermaid` 并检查图表语法。

### `SxMermaid` 能配合 `SxMarkdown` 使用吗？

可以——通过自定义渲染器将 `SxMermaid` 嵌入 Markdown 内容，即可将富文本与实时图表结合。
