# 消息输入框

## 概述

`SxSender` 是 AI 对话的输入组合组件——一个富文本域，支持可选的附件、斜杠（`/`）命令建议与提及（`@`）建议。它提交输入文本，并将建议的过滤与选择委托给 `useSender` 组合式函数。

用作聊天界面的主输入框，可与 `SxBubbleList`（展示消息）和 `SxAttachments`（在文本域上方渲染附件预览）搭配。提供 `attachments` 时内部会使用 `SxAttachments`。

## 用法

<UsageCode component="sender" />

## 特性

- 📝 富文本域 — 可配置 `rows` 与 `placeholder`，支持 `disabled` / `loading` 状态
- 📎 附件支持 — 在输入框上方渲染文件预览，并触发 `removeAttachment` 事件
- ⚡ 斜杠命令 — 输入 `/` 触发建议弹层（`slashSuggestions`），按输入内容过滤
- 📢 提及 — 输入 `@` 触发建议弹层（`mentionSuggestions`），按输入内容过滤
- ⌨️ 键盘驱动 — `Enter` 提交（`shiftEnter` 需 Ctrl+Enter）；`Escape` 关闭建议
- 🧩 三个插槽 — `actions`（提交按钮左侧）、`submit-icon`、`suggestion`（自定义单个建议项）
- 🚦 提交守卫 — `loading` 与 `disabled` 会禁用提交按钮；空文本同样阻止提交
- 🔒 类型安全 — `SenderSuggestion` / `Attachment` / `Attachment[]` 类型，其中 `SenderSuggestion` 由 UI-X composables 子路径导出

## 演示

<PlaygroundGallery component="sender" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根节点类名。' },
  { name: 'placeholder', type: 'string', default: `''`, description: '占位文本。' },
  { name: 'slashSuggestions', type: 'SenderSuggestion[]', default: '-', description: '斜杠（`/`）命令建议。' },
  { name: 'mentionSuggestions', type: 'SenderSuggestion[]', default: '-', description: '提及（`@`）建议。' },
  { name: 'loading', type: 'boolean', default: 'false', description: '是否禁用发送操作（例如请求进行中时）。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用整个输入框。' },
  { name: 'attachments', type: 'Attachment[]', default: '-', description: '显示在输入框上方的附件。' },
  { name: 'rows', type: 'number', default: '3', description: '文本域行数。' },
  { name: 'submitType', type: `'enter' | 'shiftEnter'`, default: `'enter'`, description: '提交行为。`enter` 按 Enter 提交；`shiftEnter` 按 Ctrl+Enter 提交（普通 Enter 为换行）。' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'submit', parameters: '[text: string]', description: '消息提交时触发。' },
  { name: 'removeAttachment', parameters: '[attachment: Attachment]', description: '附件被移除时触发。' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'actions', parameters: '-', description: '渲染在左侧操作区的自定义操作。' },
  { name: 'submit-icon', parameters: '-', description: '自定义提交按钮图标。' },
  { name: 'suggestion', parameters: '{ suggestion }', description: '自定义单个建议项的渲染。' },
]"/>

## 注意事项

### 架构与行业对标

`SxSender` 是 `@soybeanjs/ui-x` 中带样式、单包的 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上：建议的检测、过滤与选择委托给 `@soybeanjs/ui-x` 的 `useSender` 组合式函数，附件渲染委托给同级的 `SxAttachments` 组件。SFC 本身只负责 `senderVariants` 配方接线、键盘处理（`Enter` / `Escape`）、提交守卫与插槽透传。`useSender` 只扫描输入末尾 32 个字符内、且以空白或字符串开头为前导的触发字符（`/` 或 `@`），检测快速且对 SSR 安全。

| 能力 | SoybeanUI-X | Vercel AI SDK | shadcn AI | Ant Design Chat |
| :--- | :---: | :---: | :---: | :---: |
| 富文本域并提交 | ✅ | — | ✅ | ✅ |
| 斜杠命令建议 | ✅ | — | — | — |
| 提及建议 | ✅ | — | — | — |
| 附件预览 | ✅ | — | — | ✅ |
| `Enter` / `Ctrl+Enter` 提交 | ✅ | — | ✅ | ✅ |
| 建议逻辑的 headless 组合式函数 | ✅ | — | — | — |

`—` = 不支持或以其他方式处理。

### 使用注意

- `loading` 会禁用提交按钮并阻止提交，但不会清空文本域——等待期间用户仍可编辑。
- 当内部 `SxAttachments` 触发移除事件时，会发出 `removeAttachment`。请自行维护 `attachments` 数组（组件不会修改它）。
- `mentionSuggestions` 与 `slashSuggestions` 会按 `label` 与 `key` 进行不区分大小写的过滤。触发字符后无输入时展示全部建议。
- 触发检测只查看末尾 32 个字符——文本更早位置出现的 `/` 或 `@` 会被忽略。这保证了组合式函数的性能，并避免粘贴内容造成的误触发。

## 常见问题

### 如何改为按 Ctrl+Enter 提交？

设置 `submit-type="shiftEnter"`——此后普通 Enter 为换行，Ctrl+Enter 提交。

### 如何添加自定义操作按钮（如上传）？

使用 `actions` 插槽——它渲染在输入框左侧操作区。可在此接入自己的上传按钮或文件选择器。

### 如何处理附件？

向 `attachments` 传入 `Attachment[]` 数组，并监听 `removeAttachment` 以保持数组同步。参见 03-with-attachments 演示。

### AI 回复期间如何展示加载状态？

设置 `loading`——提交按钮被禁用，文本域保持可编辑。可与最新助手消息的 `SxBubble` `loading` 属性搭配使用。

### 如何自定义建议列表项？

使用 `suggestion` 插槽——它接收 `{ suggestion }`（`SenderSuggestion`，含 `key`、`label`、`description`、`icon`），可自定义渲染布局。

### 提交成功后如何重置输入框？

提交时组件会自动清空输入值并关闭建议弹层，无需额外操作。
