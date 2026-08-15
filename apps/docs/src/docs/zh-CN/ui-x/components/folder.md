# 文件夹

## 概述

`SxFolder` 是可折叠的文件夹组件，在可切换的内容区上方展示文件夹式头部（名称、可选图标与可选条目数徽标）。

用于将相关内容——如附件、来源或子文档——归类到类似文件夹的头部之下。文件夹的开关状态由 `defaultOpen` 初始化（仅初始值，不会监听），头部按钮设置 `aria-expanded`，且仅在提供默认插槽时才渲染内容。

`SxFolder` 与操作族（`SxActions`、`SxActionsCopy`、`SxActionsFeedback`）为同级组件，但专注于组织内容而非触发操作。

## 用法

<UsageCode component="folder" />

## 特性

- 📁 可折叠文件夹 — 头部按钮通过 `aria-expanded` 切换内容区
- 🔢 计数徽标 — `count` 渲染条目数徽标；`undefined` 时隐藏
- 🧩 自定义插槽 — `icon`（接收 `{ open }`）、`name`（无参数）与默认内容插槽
- 🚦 条件内容 — 仅在提供默认插槽时渲染内容，并以 `v-show` 显示
- ⚙️ 仅初始状态 — `defaultOpen` 仅作为内部 `open` ref 的种子，之后不再监听
- 🔒 类型安全 — `FolderProps` 必填 `name` 字符串属性

## 演示

<PlaygroundGallery component="folder" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根节点类名。' },
  { name: 'name', type: 'string', default: '-', description: '文件夹名称。必填。' },
  { name: 'count', type: 'number', default: '-', description: '以徽标显示的条目数。`undefined` 时隐藏。' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: '文件夹默认是否展开。' },
]"/>

### Emits

此组件不触发任何事件。

### Slots

<DataTable preset="slots" :data="[
  { name: 'icon', parameters: '{ open: boolean }', description: '自定义文件夹图标。接收当前开关状态。' },
  { name: 'name', parameters: '-', description: '自定义文件夹名称渲染。' },
  { name: 'default', parameters: '-', description: '文件夹内容，展开时显示。' },
]"/>

## 注意事项

### 架构与行业对标

`SxFolder` 是 `@soybeanjs/ui-x` 中带样式、单包的 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上：它是自包含的展示组件，不依赖任何 headless 组合式函数。SFC 负责 `folderVariants` 配方接线，并管理一个由 `defaultOpen` 初始化的内部 `open` ref。与 `SxThink`（其 `defaultOpen` 会被监听以支持外部控制）不同，`SxFolder` 仅将 `defaultOpen` 视为初始值——挂载后开关状态为内部状态。

| 能力                       | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :------------------------- | :---------: | :-----------: | :-------: | :-------------: |
| 可折叠文件夹头部           |     ✅      |       —       |     —     |        —        |
| 条目数徽标                 |     ✅      |       —       |     —     |        —        |
| 带 `open` 状态的自定义图标 |     ✅      |       —       |     —     |        —        |
| 条件内容渲染               |     ✅      |       —       |     —     |        —        |
| 内部开关状态（非受控）     |     ✅      |       —       |     —     |        —        |

`—` = 不支持或以其他方式处理。

### 使用注意

- `name` **必填**——它渲染为文件夹头部文本（或通过 `name` 插槽）。
- `defaultOpen` 仅在初始化时读取**一次**。之后修改不会重新展开/收起文件夹；开关状态为内部状态。
- 仅在提供默认插槽时渲染内容区，并以 `v-show` 显示。无默认插槽时组件只渲染头部。
- `count` 徽标在 `count` 为 `undefined` 时隐藏——传入数字才会显示。

## 常见问题

### 如何让文件夹初始展开？

设置 `default-open`（或 `:defaultOpen`）为 `true`。文件夹首次渲染即为展开状态。

### 挂载后能否从外部控制文件夹？

不能——与 `SxThink` 不同，`SxFolder` 仅在初始化时读取一次 `defaultOpen`。挂载后开关状态变为内部状态。

### 如何修改文件夹图标？

使用 `icon` 插槽，它接收 `{ open }`：

```vue
<template #icon="{ open }">{{ open ? '📂' : '📁' }}</template>
```

### 如何显示条目数？

向 `count` 属性传入数字。`count` 为 `undefined` 时徽标隐藏。

### 内容区何时渲染？

仅当你提供默认插槽时。否则 `SxFolder` 只渲染头部按钮。
