# 复制操作

## 概述

`SxActionsCopy` 是单按钮的复制操作组件，将指定文本复制到剪贴板，并展示 1.5 秒的短暂成功状态（✓/已复制）。

用于 AI 消息、代码块或任何用户可能想复制的生成内容上，作为「复制」操作。它从 `text` 属性读取文本（缺省时回退到默认插槽内容），并在复制尝试后调用 `onCopy` 回调。

`SxActionsCopy` 是操作族的专用成员，与 `SxActions`（通用操作工具栏）、`SxActionsFeedback`（点赞/点踩）、`SxFolder`（可折叠文件夹）同级。

## 用法

<UsageCode component="actions-copy" />

## 特性

- 📋 剪贴板复制 — 通过 `navigator.clipboard` 复制 `text` 属性
- ✅ 成功反馈 — 展示 ✓ 与「已复制」1.5 秒，并带有 `data-copied` 属性
- 🧩 自定义插槽 — `icon` 与 `label` 插槽接收 `{ copied }`，支持状态感知渲染
- 🚫 禁用状态 — `disabled` 会完全阻止复制操作
- 📞 `onCopy` 回调 — 每次尝试后都以复制文本调用，无论剪贴板是否成功
- 🛡️ 失败安全 — 剪贴板错误（权限、SSR）会被静默忽略
- ♿ 无障碍 — 按钮带有来自 `label` 属性的 `aria-label`

## 演示

<PlaygroundGallery component="actions-copy" />

## API

<ComponentApi component="actions-copy" />

## 注意事项

### 架构与行业对标

`SxActionsCopy` 是 `@soybeanjs/ui-x` 中带样式、单包的 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上：它是自包含的展示组件，不依赖任何 headless 组合式函数。SFC 负责 `actionsCopyVariants` 配方接线、调用 `navigator.clipboard.writeText`、管理短暂的 `copied` 状态并透传插槽。`onCopy` 属性在每次复制尝试后都会调用——即使剪贴板写入失败——因此调用方总能收到通知。

| 能力                              | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :-------------------------------- | :---------: | :-----------: | :-------: | :-------------: |
| 一键复制到剪贴板                  |     ✅      |       —       |     —     |       ✅        |
| 复制成功反馈                      |     ✅      |       —       |     —     |       ✅        |
| 带 `copied` 状态的自定义图标/标签 |     ✅      |       —       |     —     |        —        |
| 每次尝试都触发 `onCopy` 回调      |     ✅      |       —       |     —     |        —        |
| 失败安全（SSR/权限）              |     ✅      |       —       |     —     |        —        |

`—` = 不支持或以其他方式处理。

### 使用注意

- 仅当 `navigator.clipboard` 可用且获得授权时复制才会成功。在 SSR 或受限环境中写入会静默失败——但 `onCopy` 仍会触发。
- `copied` 会在 1.5 秒后通过 `setTimeout` 重置为 `false`。快速重复点击会重启计时器。
- `text` 缺省时回退到默认插槽内容。若使用默认插槽，被复制的文本是插槽渲染后的文本内容。
- `disabled` 会完全阻止复制——按钮以 `disabled` 渲染，且不会触发 `onCopy`。

## 常见问题

### 复制的是什么文本？

`text` 属性是唯一来源。当 `text` 为空时，组件回退到默认插槽内容。

### 如何得知复制已完成？

传入 `onCopy` 回调。每次尝试后都会以被复制的文本调用，包括失败的情况。

### 能否自定义复制后的状态文案？

可以——使用 `label` 插槽，它接收 `{ copied }`：

```vue
<template #label="{ copied }">{{ copied ? '已复制！' : '复制句子' }}</template>
```

### 为什么在某些环境下没有反应？

`navigator.clipboard` 需要安全上下文与用户授权。若该 API 不可用（SSR、权限被拒），写入会被静默忽略——组件不会抛出异常。

### 此组件会触发事件吗？

不会——`SxActionsCopy` 没有 emits。请使用 `onCopy` 属性响应复制尝试。
