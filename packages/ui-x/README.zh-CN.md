# @soybeanjs/ui-x

> SoybeanUI-X —— 基于 SoybeanUI 的 AI 对话 UI 组件。

20 个样式组件，用于构建对话式 AI 界面：聊天气泡、流式 Markdown（含 markstream-vue 底层）、语法高亮代码块、Mermaid 图表、思考链、文件附件、提示与建议等。基于 `@soybeanjs/headless` + `@soybeanjs/ui` 构建，借助 `@soybeanjs/ui-x` 的 composable 实现流式、打字机效果和发送器状态管理。

## 安装

```bash
pnpm add @soybeanjs/ui-x
```

## 组件

| 分类 | 组件                                                        |
| ---- | ----------------------------------------------------------- |
| 核心 | `SxBubble`, `SxBubbleList`, `SxSender`                      |
| 内容 | `SxMarkdown`, `SxCodeBlock`, `SxMermaid`                    |
| 附件 | `SxAttachments`, `SxFileCard`                               |
| 对话 | `SxConversations`, `SxWelcome`, `SxPrompts`, `SxSuggestion` |
| 推理 | `SxThink`, `SxThoughtChain`, `SxSources`                    |
| 操作 | `SxActions`, `SxActionsCopy`, `SxActionsFeedback`           |
| 其他 | `SxFolder`, `SxNotification`                                |

## 快速开始

```vue
<script setup lang="ts">
import { SxBubble } from '@soybeanjs/ui-x';
</script>

<template>
  <SxBubble role="ai" placement="start" content="你好！有什么可以帮你的？" />
</template>
```

## 特性

- 20 个 AI 对话组件
- 通过 `markstream-vue` 实现流式 Markdown 渲染
- 打字机与淡入文本效果
- 发送器中的斜杠（`/`）和提及（`@`）命令建议
- 复制到剪贴板与点赞/倒赞反馈操作
- Mermaid 图表渲染（可选 peer dep）
- Shiki 语法高亮（可选 peer dep）
- TypeScript 类型安全
- 暗色模式支持

## 许可

MIT
