# Affix

## 概述

Affix 可以在页面或自定义滚动容器滚动时，将内容固定在顶部或底部边缘。

## 用法

```vue
<script setup lang="ts">
import { SAffix, SButton } from '@soybeanjs/ui';
</script>

<template>
  <SAffix :offset-top="24">
    <SButton>返回顶部</SButton>
  </SAffix>
</template>
```

## 演示

```playground
basic
target
offset-bottom
custom-styling
```

## Affix API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '固定容器的自定义类名' },
  { name: 'offsetTop', type: 'number', default: '0', description: '距离顶部达到指定偏移后开始固定' },
  { name: 'offsetBottom', type: 'number', default: '-', description: '距离底部达到指定偏移后开始固定' },
  { name: 'target', type: 'AffixTarget', default: 'window', description: '返回需要监听的滚动容器的函数' },
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'change', parameters: '(affixed: boolean) => void', description: '固定状态变化时触发' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ affixed: boolean }', description: '需要固定的内容', required: true },
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'AffixTarget',
    description: '用于解析滚动容器的工厂函数',
    fields: [
      { name: '()', type: 'string | Window | HTMLElement | (() => HTMLElement)', description: '返回目标容器' },
    ],
  }
]"/>
