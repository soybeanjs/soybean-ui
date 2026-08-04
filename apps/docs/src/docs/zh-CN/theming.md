# 主题

## 概览

Soybean UI 提供了灵活的主题系统，允许你根据应用的设计需求自定义组件外观。你可以轻松调整颜色、圆角以及全局尺寸等设置。

## 实现原理

使用独立的主题引擎 [@soybeanjs/theme](https://github.com/soybeanjs/soybean-ui) 来创建丰富的主题。其 `createTheme(options)` 纯函数返回一段 CSS 字符串，`SConfigProvider` 会根据 `theme` prop 在运行时将其内联到页面中。

## 主题配置

你可以在应用根节点使用 `SConfigProvider`，通过传入 `theme` 对象来配置主题。

```vue
<script setup lang="ts">
import { SConfigProvider } from '@soybeanjs/ui';
</script>

<template>
  <SConfigProvider
    :theme="{
      base: 'gray',
      primary: 'violet',
      radius: '0.625rem'
    }"
  >
    <App />
  </SConfigProvider>
</template>
```

### 可自定义的主题

```ts
{
  base: 'gray',
  primary: 'violet',
  radius: '0.625rem',
  // 覆盖任意 shadcn 颜色键（浅色 / 暗色）
  preset: {
    light: {
      background: 'oklch(100% 0 0)',
      foreground: 'stone.950',
      card: 'oklch(100% 0 0)',
      cardForeground: 'stone.950',
      primary: 'violet.700',
      ring: 'violet.500',
      border: 'stone.200',
      input: 'stone.200'
    },
    dark: {
      background: 'stone.950',
      foreground: 'stone.50',
      card: 'stone.900',
      cardForeground: 'stone.50',
      primary: 'violet.400',
      ring: 'violet.600',
      border: 'oklch(100% 0 0 / 0.1)',
      input: 'oklch(100% 0 0 / 0.15)'
    }
  }
}
```

### 颜色

主题系统使用 Tailwind CSS 的颜色预设。

<TailwindPalette />

## 组件级样式定制

除了全局主题配置，你还可以通过 `ui` prop 对单个组件的样式进行精细控制。

### 使用 ui prop

多插槽组件支持通过 `ui` prop 覆盖每个插槽的样式类：

```vue
<script setup lang="ts">
import { SAccordion } from '@soybeanjs/ui';

const items = [
  { title: '标题 1', value: 'item-1', description: '内容 1' },
  { title: '标题 2', value: 'item-2', description: '内容 2' }
];
</script>

<template>
  <SAccordion
    :items="items"
    :ui="{
      root: 'border-2 border-primary',
      item: 'bg-card hover:bg-accent',
      trigger: 'text-lg font-bold',
      content: 'text-sm text-muted-foreground'
    }"
  />
</template>
```

### class prop 合并

所有组件都支持 `class` prop，它会与默认样式智能合并：

```vue
<template>
  <SButton class="w-full rounded-full">自定义按钮</SButton>
</template>
```
