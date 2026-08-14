# 主题定制

## 主题令牌

UI-X 继承 `@soybeanjs/ui` 的主题系统。所有主题令牌（颜色、尺寸、圆角）在 UI 和 UI-X 组件间共享。

## 暗色模式

UI-X 组件完整支持暗色模式，使用相同的主题系统：

```vue
<script setup lang="ts">
import { SxBubble, SxMarkdown } from '@soybeanjs/ui-x';
</script>

<template>
  <SxBubble role="ai" placement="start">
    <SxMarkdown content="**Markdown** 在亮色和暗色模式下均可渲染。" />
  </SxBubble>
</template>
```

## 自定义样式

每个 UI-X 组件接受 `class` prop，并支持 `ui` prop 进行分插槽定制：

```vue
<SxBubble content="自定义样式气泡" class="rounded-2xl" :ui="{ root: 'bg-primary/10 border-primary/20' }" />
```

## 颜色变体

`SxNotification` 和 `SxActionsFeedback` 等组件使用与主题调色板对齐的语义颜色：

- `primary` — 默认强调色
- `success` — 正面反馈 / 成功通知
- `warning` — 警告通知
- `error` / `danger` — 错误状态
- `info` — 信息通知
