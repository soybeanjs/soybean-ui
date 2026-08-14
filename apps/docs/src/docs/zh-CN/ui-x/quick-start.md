# 快速开始

安装完成后，UI-X 组件的用法与 `@soybeanjs/ui` 组件一致：引入样式表，然后直接渲染 `Sx*` 组件。

## 环境要求

- Vue >= 3.3
- 已安装并配置样式的 `@soybeanjs/ui` —— 见[安装](/ui-x/installation)

## 基础用法

```vue
<script setup lang="ts">
import { SxBubble, SxSender } from '@soybeanjs/ui-x';
</script>

<template>
  <div class="space-y-3">
    <SxBubble role="ai" placement="start" content="你好！有什么可以帮你的？" />
    <SxBubble role="user" placement="end" content="我需要帮助构建一个组件。" />
    <SxSender placeholder="输入消息..." />
  </div>
</template>
```

## 自动导入（推荐）

使用 `unplugin-vue-components` 配合 UI-X resolver，让 `Sx*` 组件自动导入：

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import uiXResolver from '@soybeanjs/ui-x/resolver';

export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [uiXResolver()]
    })
  ]
});
```

之后即可在模板中直接使用组件，无需手动导入：

```vue
<template>
  <SxBubble role="ai" content="自动导入。" />
</template>
```

## 组合一个聊天界面

`SxBubbleList` 渲染可滚动的消息列表，`SxSender` 生成新消息——二者组合即可构成一个极简聊天界面：

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SxBubbleList, SxSender } from '@soybeanjs/ui-x';

const messages = ref<Array<{ id: string; role: 'user' | 'ai'; content: string }>>([]);

function send(text: string) {
  messages.value.push({ id: `msg-${Date.now()}`, role: 'user', content: text });
  messages.value.push({ id: `msg-${Date.now() + 1}`, role: 'ai', content: '这是占位回复。' });
}
</script>

<template>
  <div class="flex h-96 w-full flex-col gap-3">
    <SxBubbleList class="flex-1" :items="messages" />
    <SxSender @submit="send" />
  </div>
</template>
```

## 下一步

- [组件目录](/ui-x) —— 浏览全部 20 个组件及其演示
- [国际化](/ui-x/i18n) —— 本地化的标签与 ARIA 文本
- [主题](/ui-x/theming) —— 暗色模式与插槽级定制
