# 提示

## 概述

用于向用户展示重要信息或状态提示的组件。

## 用法

```vue
<script setup lang="ts">
import { SAlert } from '@soybeanjs/ui';
</script>

<template>
  <SAlert title="Info" description="This is an info alert" />
  <SAlert title="Error" description="Something went wrong" color="destructive" variant="soft" />
</template>
```

> `SAlert` 现在会把默认的图标、标题、描述和关闭按钮结构组合委托给 headless `AlertCompact`。如果需要直接使用无样式的组合入口，可从 `@soybeanjs/headless/alert` 导入。

## 演示

```playground
color
variant
description
icon
desc-icon
closable
slot
size
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根节点类名。' },
  { name: 'open', type: 'boolean', default: 'true', description: '控制提示是否显示。' },
  { name: 'title', type: 'string', default: '-', description: 'Alert title.' },
  { name: 'description', type: 'string', default: '-', description: 'Alert description.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Alert size.' },
  { name: 'color', type: `'primary' \| 'destructive' \| 'success' \| 'warning' \| 'info' \| 'carbon' \| 'secondary' \| 'accent'`, default: `'primary'`, description: '主题颜色。' },
  { name: 'variant', type: `'solid' \| 'outline' \| 'soft' \| 'ghost' \| 'pure'`, default: `'ghost'`, description: '视觉样式变体。' },
  { name: 'icon', type: 'string | Component', default: '-', description: 'Custom icon.' },
  { name: 'closable', type: 'boolean', default: 'false', description: '是否显示关闭按钮。' },
  { name: 'contentProps', type: 'AlertContentProps', default: '-', description: '透传给内容容器的原生属性。' },
  { name: 'titleProps', type: 'AlertTitleProps', default: '-', description: '透传给标题节点的原生属性。' },
  { name: 'descriptionProps', type: 'AlertDescriptionProps', default: '-', description: '透传给描述节点的原生属性。' },
  { name: 'closeProps', type: 'AlertCloseProps', default: '-', description: '透传给关闭触发器的原生属性。' },
  { name: 'ui', type: 'AlertExtendedUi', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: '提示显隐状态变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: 'Main content.' },
  { name: 'leading', parameters: '-', description: '自定义前置内容，会替换默认图标渲染。' },
  { name: 'title', parameters: '-', description: 'Custom title slot.' },
  { name: 'description', parameters: '-', description: 'Custom description slot.' },
  { name: 'trailing', parameters: '-', description: '自定义后置内容。' },
  { name: 'close', parameters: '-', description: 'Custom close button slot.' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'AlertExtendedUi',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根元素类名。' },
      { name: 'icon', type: 'string', description: 'Icon container class.' },
      { name: 'content', type: 'string', description: 'Content wrapper class.' },
      { name: 'title', type: 'string', description: 'Title text class.' },
      { name: 'description', type: 'string', description: 'Description text class.' },
      { name: 'close', type: 'string', description: 'Close button class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
