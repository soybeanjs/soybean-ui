# 卡片

## 概述

用于承载内容的卡片容器组件，可组合标题、描述与操作区等结构。

## 用法

```vue
<script setup lang="ts">
import { SCard, SButton } from '@soybeanjs/ui';
</script>

<template>
  <SCard title="Notifications" description="You have 3 unread messages.">
    <div class="py-4">
      <p>Your subscription expires soon.</p>
    </div>
    <template #footer>
      <SButton class="w-full">Mark all as read</SButton>
    </template>
  </SCard>
</template>
```

## 演示

```playground
base
only-content
split
title-slot
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'title', type: 'string', default: '-', description: 'Card title.' },
  { name: 'description', type: 'string', default: '-', description: 'Card description text.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Padding size of the card.' },
  { name: 'split', type: 'boolean', default: 'false', description: '是否显示 dividers between sections.' },
  { name: 'scrollable', type: 'boolean', default: 'false', description: '内容区域是否可滚动。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '为内部元素自定义类名。' },
  { name: 'headerProps', type: 'object', default: '{}', description: 'Props passed to the header container.' },
  { name: 'contentProps', type: 'object', default: '{}', description: 'Props passed to the content container.' },
  { name: 'footerProps', type: 'object', default: '{}', description: 'Props passed to the footer container.' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Main content area.' },
  { name: 'header', parameters: '-', description: 'Header content (replaces title/desc).' },
  { name: 'footer', parameters: '-', description: 'Footer content.' },
  { name: 'title', parameters: '-', description: 'Custom title content.' },
  { name: 'description', parameters: '-', description: 'Custom description content.' },
  { name: 'extra', parameters: '-', description: 'Extra content in the header (top-right).' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根元素类名。' },
      { name: 'header', type: 'string', description: '头部容器类名。' },
      { name: 'titleRoot', type: 'string', description: 'Title wrapper class.' },
      { name: 'title', type: 'string', description: 'Title text class.' },
      { name: 'description', type: 'string', description: 'Description text class.' },
      { name: 'content', type: 'string', description: 'Content area class.' },
      { name: 'footer', type: 'string', description: '底部容器类名。' },
    ],
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
