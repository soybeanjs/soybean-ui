# 深度思考

## 概述

`SxThink` 是可折叠的 AI「深度思考」面板，用于展示模型得出答案背后的推理过程。它呈现为一个可切换的区块，包含头部按钮与可展开的内容区域，方便展示或隐藏思考链（chain-of-thought）痕迹。

用于展示 AI 回复的内部推理步骤，帮助用户理解模型如何得出结论。面板默认折叠，保持主答案的整洁，用户可按需展开。

`SxThink` 是 `@soybeanjs/ui-x` 中 `useThink` 组合式函数的轻量封装。常与 `SxThoughtChain`（结构化分步推理）和 `SxBubble`（整体消息展示）搭配使用。

## 用法

<UsageCode component="think" />

## 特性

- 🧠 可折叠面板 — 单击即可展开或收起推理区块
- 🎯 无障碍 — 触发器按钮设置 `aria-expanded`，内容通过 `v-show` 显示/隐藏
- 🔄 通过 `defaultOpen` 受控 — 监听该属性从外部同步开关状态
- 🎛️ 自定义触发器插槽 — 通过 `trigger` 插槽替换默认文案
- 🔔 `toggleChange` 事件 — 以编程方式响应开关状态变化
- 🔒 类型安全 — `ThinkProps` 提供完整的 TypeScript 接口

## 演示

<PlaygroundGallery component="think" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根节点类名。' },
  { name: 'title', type: 'string', default: `''`, description: '折叠 / 展开状态的头部标题。' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: '面板默认是否展开。' },
  { name: 'onToggleChange', type: '(open: boolean) => void', default: '-', description: '面板切换时触发的回调，参数为新开关状态。' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'toggleChange', parameters: '[open: boolean]', description: '面板切换时触发，参数为新开关状态。' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '{ open: boolean }', description: '自定义触发器内容。接收当前开关状态。' },
  { name: 'default', parameters: '-', description: '展开时显示的面板内容。' },
]"/>

## 注意事项

### 架构与行业对标

`SxThink` 是 `@soybeanjs/ui-x` 中带样式、单包的 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上：可折叠面板逻辑委托给 `@soybeanjs/ui-x` 的 `useThink` 组合式函数，SFC 本身只负责 `thinkVariants` 配方接线、`defaultOpen` 同步与插槽透传。`useThink` 组合式函数提供简单的 `open` ref 以及 `toggle()`、`openPanel()`、`close()` 方法。

| 能力                           | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :----------------------------- | :---------: | :-----------: | :-------: | :-------------: |
| 可折叠思考面板                 |     ✅      |       —       |    ✅     |        —        |
| `defaultOpen` 初始状态         |     ✅      |       —       |     —     |        —        |
| 通过属性受控的开关状态         |     ✅      |       —       |     —     |        —        |
| 自定义触发器插槽               |     ✅      |       —       |     —     |        —        |
| 切换逻辑的 headless 组合式函数 |     ✅      |       —       |     —     |        —        |

`—` = 不支持或以其他方式处理。

### 使用注意

- `defaultOpen` 会被监听变化——挂载后将其设为 `true` 会展开面板，设为 `false` 会收起。这允许外部控制。
- `trigger` 插槽接收 `{ open }`——可根据展开状态渲染不同的文案。
- 内容区使用 `v-show`，因此始终存在于 DOM 中，仅在折叠时隐藏。包含重初始化逻辑的内容可考虑改用 `v-if`。
- `onToggleChange` 在每次切换时触发，包括由 `defaultOpen` 同步引起的程序化变化。

## 常见问题

### 如何让面板默认展开？

设置 `default-open`（或 `:defaultOpen`）为 `true`——面板首次渲染即为展开状态。

### 如何修改触发器文案？

使用 `trigger` 插槽。它接收 `{ open }`，可渲染「显示」/「隐藏」等文案：

```vue
<template #trigger="{ open }">{{ open ? '隐藏推理过程' : '显示推理过程' }}</template>
```

### 能否从外部控制面板开关状态？

可以——将 `defaultOpen` 作为属性传入。组件会监听它并同步开关状态。

### `SxThink` 能与 `SxThoughtChain` 一起使用吗？

可以——`SxThink` 是通用的可折叠面板。你可以在其默认插槽中放入 `SxThoughtChain` 或其他任意内容。

### 如何监听开关变化？

监听 `toggleChange` 事件，或传入 `onToggleChange` 回调属性。两者都会携带新的 `boolean` 状态触发。
