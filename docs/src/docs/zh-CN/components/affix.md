# Affix

## 概述

Affix 可以在页面或自定义滚动容器滚动时，将内容固定在顶部或底部边缘。

> 注意：除了 SAffix，headless 层还导出了 AffixRoot、AffixPlaceholder、AffixContent 和 provideAffixUi，可用于自定义组合与样式注入。

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
  { name: 'class', type: 'ClassValue', default: '-', description: '附着内容容器的自定义类名' },
  { name: 'offsetTop', type: 'number', default: '0', description: '距离顶部达到指定偏移后开始固定' },
  { name: 'offsetBottom', type: 'number', default: '-', description: '距离底部达到指定偏移后开始固定' },
  { name: 'target', type: 'AffixTarget', default: 'window', description: '需要监听的滚动目标，可以是选择器、元素、window 或返回元素的函数' },
  { name: 'ui', type: 'Partial<AffixUi>', default: '{}', description: '分别为 root、placeholder、content 三个节点注入类名' },
  { name: 'placeholderProps', type: 'AffixPlaceholderProps', default: '-', description: '传递给占位节点的原生属性' },
  { name: 'contentProps', type: 'AffixContentProps', default: '-', description: '传递给内容节点的原生属性' },
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
    description: '用于解析滚动容器的目标类型',
    fields: [
      { name: 'value', type: 'string | Window | HTMLElement | (() => HTMLElement)', description: '选择器、window、元素实例或返回元素的函数' },
    ],
  },
  {
    name: 'AffixUi',
    description: 'Affix 各个节点的自定义类名',
    fields: [
      { name: 'root', type: 'ClassValue', description: '根节点类名' },
      { name: 'placeholder', type: 'ClassValue', description: '占位节点类名' },
      { name: 'content', type: 'ClassValue', description: '内容节点类名' },
    ],
  }
]"/>

## Headless 组合

当你需要分别控制根节点、占位节点和内容节点时，可以直接组合 headless 组件：

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { AffixContent, AffixPlaceholder, AffixRoot, provideAffixUi } from '@soybeanjs/headless';

const ui = computed(() => ({
  content: 'data-[state=fixed]:z-50'
}));

provideAffixUi(ui);
</script>

<template>
  <AffixRoot :offset-top="24">
    <AffixPlaceholder />
    <AffixContent>
      <button type="button">返回顶部</button>
    </AffixContent>
  </AffixRoot>
</template>
```
