# 思维链

## 概述

`SxThoughtChain` 是结构化的推理步骤展示组件，以有序列表渲染 AI 的各个思考阶段。每个步骤展示状态符号、标题、可选图标，以及带详情步骤的可展开正文内容。

用于可视化 AI 模型的分步推理过程——从解析查询、检索知识库、生成回复，到格式化输出。每个步骤的生命周期状态（`pending`、`loading`、`success`、`error`）都通过视觉呈现，带有额外内容的步骤可在行内展开。

`SxThoughtChain` 可与 `SxThink`（可折叠推理面板）和 `SxBubble`（整体消息）搭配使用。它由 `@soybeanjs/ui-x` 的 `useThoughtChain` 组合式函数驱动。

## 用法

<UsageCode component="thought-chain" />

## 特性

- 📋 有序列表 — 渲染为无障碍的 `<ol>`，每个步骤对应一个 `<li>`
- 🟢 状态符号 — `·` 待处理、`⟳` 加载中、`✓` 成功、`✕` 失败
- 🔽 可展开步骤 — 带 `content` 的步骤渲染带 `aria-expanded` 的可切换头部按钮
- 🧩 自定义插槽 — `title` 与 `content` 插槽支持按步骤自定义渲染
- 🎨 基于状态的样式 — 通过插槽的 `item` 属性按 `status` 差异化样式
- 🚫 静态头部 — 无 `content` 的步骤渲染普通头部（无按钮、无箭头）
- 🔒 类型安全 — `ThoughtChainItem` 接口提供完整的 TypeScript 支持

## 演示

<PlaygroundGallery component="thought-chain" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根节点类名。' },
  { name: 'items', type: 'ThoughtChainItem[]', default: '-', description: '要展示的推理步骤。必填。' },
  { name: 'defaultExpand', type: 'boolean', default: 'false', description: '可展开步骤默认是否展开。' },
]"/>

### Emits

此组件不触发任何事件。

### Slots

<DataTable preset="slots" :data="[
  { name: 'title', parameters: '{ item: ThoughtChainItem }', description: '每个步骤的自定义标题渲染。' },
  { name: 'content', parameters: '{ item: ThoughtChainItem }', description: '每个可展开步骤的自定义内容渲染。' },
]"/>

## 注意事项

### 架构与行业对标

`SxThoughtChain` 是 `@soybeanjs/ui-x` 中带样式、单包的 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上：迭代、展开状态与状态跟踪委托给 `@soybeanjs/ui-x` 的 `useThoughtChain` 组合式函数，SFC 本身只负责 `thoughtChainVariants` 配方接线、状态符号与插槽透传。`useThoughtChain` 组合式函数维护一个可展开项映射，并提供 `toggle()` 与 `isExpanded()` 方法。

| 能力 | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :--- | :---: | :---: | :---: | :---: |
| 结构化推理步骤 | ✅ | — | — | — |
| 四种生命周期状态（pending/loading/success/error） | ✅ | — | — | — |
| 可展开的步骤内容 | ✅ | — | — | — |
| 自定义标题/内容插槽 | ✅ | — | — | — |
| 无障碍 `<ol>` 列表 | ✅ | — | — | — |
| 链状态的 headless 组合式函数 | ✅ | — | — | — |

`—` = 不支持或以其他方式处理。

### 使用注意

- `items` **必填**——不传则组件不渲染任何内容。
- 无 `content` 的步骤渲染静态头部，不含按钮或箭头。只有带 `content` 的步骤才可展开。
- `defaultExpand` 对所有可展开步骤统一生效——无法在挂载时单独展开某一步骤。
- `ThoughtChainItem` 类型从 `@soybeanjs/ui-x/types` 导入。每个条目至少需要 `key` 与 `title`。

## 常见问题

### `ThoughtChainItem` 类型是什么？

```ts
interface ThoughtChainItem {
  key: string;
  title: string;
  status?: 'pending' | 'loading' | 'success' | 'error';
  content?: string;
  icon?: string;
}
```

### 如何让所有步骤默认展开？

设置 `default-expand`（或 `:defaultExpand`）为 `true`。所有可展开步骤（带 `content`）都会默认展开。

### 如何为每个步骤显示自定义图标？

在 `ThoughtChainItem` 上设置 `icon`——它会在标题前以文本节点渲染。可使用 emoji 或短字符串。

### 如何自定义标题或内容渲染？

使用 `title` 与 `content` 插槽。两者都接收 `{ item }`，可访问步骤的全部字段：

```vue
<template #title="{ item }">
  <strong>{{ item.title }}</strong>
</template>
```