# Empty

## 概述

用于展示空状态信息的轻量级组件，可组合提示文案、操作按钮与引导信息。

## 用法

```vue
<script setup lang="ts">
import { SButton, SEmpty } from '@soybeanjs/ui';
</script>

<template>
  <SEmpty
    class="min-h-72"
    title="暂无项目"
    description="创建第一个项目以开始组织工作。"
    icon="lucide:folder-plus"
    media-variant="icon"
  >
    <SButton>创建项目</SButton>
  </SEmpty>
</template>
```

## 演示

```playground
basic
icon
slot
custom-styling
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根元素自定义类名。' },
  { name: 'title', type: 'string', default: '-', description: '空状态标题文本。' },
  { name: 'description', type: 'string', default: '-', description: '辅助说明文本。' },
  { name: 'icon', type: 'IconValue', default: '-', description: '渲染在 media 插槽中的快捷图标。' },
  { name: 'mediaVariant', type: 'EmptyMediaVariant', default: `'default'`, description: 'media 区域的视觉样式。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '为内部元素自定义类名。' },
  { name: 'headerProps', type: 'object', default: '{}', description: '传递给头部容器的 Props。' },
  { name: 'mediaProps', type: 'object', default: '{}', description: '传递给 media 容器的 Props。' },
  { name: 'contentProps', type: 'object', default: '{}', description: '传递给内容容器的 Props。' },
  { name: 'titleProps', type: 'object', default: '{}', description: '传递给标题元素的 Props。' },
  { name: 'descriptionProps', type: 'object', default: '{}', description: '传递给描述元素的 Props。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '位于标题区下方的操作区或自定义内容。' },
  { name: 'media', parameters: '-', description: '显示在文案上方的自定义媒体内容。' },
  { name: 'title', parameters: '-', description: '自定义标题内容。' },
  { name: 'description', parameters: '-', description: '自定义描述内容。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'header', type: 'string', description: '头部容器类名。' },
      { name: 'media', type: 'string', description: '媒体容器类名。' },
      { name: 'content', type: 'string', description: '内容容器类名。' },
      { name: 'title', type: 'string', description: '标题元素类名。' },
      { name: 'description', type: 'string', description: '描述元素类名。' },
    ],
  }
]"/>

<UnionType name="EmptyMediaVariant" description="media 区域样式变体" type="'default' | 'icon'" />
