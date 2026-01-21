# 头像

## 概述

用于展示用户头像的图片组件，支持加载失败时的回退内容。

## 用法

```vue
<script setup lang="ts">
import { SAvatar } from '@soybeanjs/ui';
</script>

<template>
  <SAvatar src="https://github.com/soybeanjs.png" fallback-label="SB" />
</template>
```

## 演示

```playground
base
fallback
delay
size
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'src', type: 'string', default: '-', description: '图片资源地址（URL）。', required: true },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '头像尺寸。' },
  { name: 'fallback-label', type: 'string', default: '-', description: '图片加载失败时显示的文本。' },
  { name: 'delay-ms', type: 'number', default: '0', description: '显示回退内容前的延迟（毫秒）。' },
  { name: 'image-props', type: 'object', default: '{}', description: '传递给内部图片元素的属性。' },
  { name: 'fallback-props', type: 'object', default: '{}', description: '传递给内部回退元素的属性。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'fallback', parameters: '-', description: '自定义回退内容。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'loading-status-change', parameters: `(status: 'loading' | 'loaded' | 'error') => void`, description: '图片加载状态变化时触发。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根元素类名。' },
      { name: 'image', type: 'string', description: '图片元素类名。' },
      { name: 'fallback', type: 'string', description: '回退元素类名。' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
