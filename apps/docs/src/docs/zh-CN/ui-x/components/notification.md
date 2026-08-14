# 通知

## 概述

`SxNotification` 是面向 AI 输出的带样式内联通知，提供四种视觉风格——`info`、`success`、`warning` 和 `error`。它使用 `role="status"` 宣告状态，并将图标、标题、可选描述与关闭按钮组合在一起。

用于聊天消息或结果面板中的内联状态反馈——例如助手在对话中展示的「工具已完成」「操作成功」或「上传失败」消息。每种风格提供默认图标（info ℹ️、success ✅、warning ⚠️、error ❌），可通过 `icon` 插槽覆盖。关闭通知会调用 `onClose` 属性并触发 `close` 事件。

在 `@soybeanjs/ui-x` 中，`SxNotification` 可与 `SxMarkdown` / `SxCodeBlock` / `SxMermaid` 搭配，构成包含内联状态信息的完整 AI 消息内容。

## 用法

<UsageCode component="notification" />

## 特性

- 🎨 四种风格 — `info` / `success` / `warning` / `error`，每种都有默认 emoji 图标
- ♿ 无障碍状态 — `role="status"` 向辅助技术宣告内容
- ✕ 可关闭 — `closable` 控制关闭按钮；关闭时调用 `onClose` 并触发 `close` 事件
- 🧩 完整插槽控制 — `icon`、`title`、`description`、`close-icon` 均可自定义
- 📝 结构化内容 — `title` 加可选的长 `description`
- 🎛️ Props 驱动 — title/description/type/`onClose` 覆盖常见场景，无需插槽

## 演示

<PlaygroundGallery component="notification" />

## API

### Props

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根节点类名。' },
  { name: 'title', type: 'string', default: `''`, description: '通知标题。' },
  { name: 'description', type: 'string', default: `''`, description: '可选的长描述。' },
  { name: 'type', type: `'info' | 'success' | 'warning' | 'error'`, default: `'info'`, description: '视觉风格。' },
  { name: 'closable', type: 'boolean', default: 'true', description: '是否显示关闭按钮。' },
  { name: 'onClose', type: '() => void', default: '-', description: '点击关闭按钮时调用。' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'close', parameters: '[]', description: '点击关闭按钮时触发。' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'icon', parameters: '{ type }', description: '自定义图标；接收当前 `type`。' },
  { name: 'title', parameters: '-', description: '自定义标题内容。' },
  { name: 'description', parameters: '-', description: '自定义描述内容。' },
  { name: 'close-icon', parameters: '-', description: '自定义关闭按钮内容。' },
]"/>

## 注意事项

### 架构与行业对标

`SxNotification` 是 `@soybeanjs/ui-x` 中的带样式、单包 AI 组件，构建于 `@soybeanjs/headless` / `@soybeanjs/ui` 之上。与完整的 toast 系统不同，它刻意设计为轻量级内联状态组件：保持在文档流中（无 portal、无堆叠管理器），并通过 `role="status"` 进行宣告，而非 ARIA live-region 队列。

| 能力 | SoybeanUI-X `SxNotification` | Vercel AI SDK | shadcn AI（React） | Ant Design Chat（ProChat） | Ant Design Notification |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Vue 3 原生 | ✅ | — | — | — | — |
| 内联（非 portal）展示 | ✅ | — | — | — | — |
| 风格变体 | ✅ | — | — | — | ✅ |
| `role="status"` 宣告 | ✅ | — | — | — | — |
| 完整插槽覆盖 | ✅ | — | — | — | — |
| 命令式 toast 队列 | — | — | — | ✅ | ✅ |

`—` = 不支持或采用不同的交互模型。

### 使用注意

- `SxNotification` 是内联、流内组件——对于全局堆叠的 toast 请使用专门的 toast/message 系统。
- `type` 属性是默认图标的事实来源；覆盖 `icon` 插槽仅改变图标，不影响风格样式。
- 描述仅在设置了 `description` 或提供了 `description` 插槽时渲染——空字符串会隐藏该区域。
- 关闭时总是同时调用 `onClose` 属性和触发 `close` 事件；只需注册其中一个，避免重复逻辑。

## 常见问题

### 如何更改某个风格的图标？

使用 `icon` 插槽，它会接收当前 `type`：

```vue
<SxNotification title="已部署" type="success">
  <template #icon>🚀</template>
</SxNotification>
```

### 如何响应关闭操作？

传入 `onClose` 或监听 `close` 事件：

```vue
<SxNotification :title="title" @close="onDismiss" />
```

### 如何隐藏关闭按钮？

将 `closable` 设为 `false`；通知将变为不可关闭。

### 如何自定义标题或描述？

使用 `title` / `description` 插槽实现富文本内容（带样式的 span、链接或代码）。

### 这是一个 toast 系统吗？

不是——`SxNotification` 是内联、流内组件。对于全局堆叠的 toast 请使用专门的 toast/message 实现。