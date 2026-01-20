# 弹出层

## 概述

用于展示与触发元素相关联内容的弹出层组件。

## 用法

```vue
<script setup lang="ts">
import { SPopover, SButton } from '@soybeanjs/ui';
</script>

<template>
  <SPopover>
    <template #trigger>
      <SButton variant="outline">Open Popover</SButton>
    </template>
    <div class="p-4">
      <h3 class="font-medium">Popover Title</h3>
      <p class="text-sm text-muted-foreground">This is the popover content.</p>
    </div>
  </SPopover>
</template>
```

## 演示

```playground
base
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'open', type: 'boolean', default: '-', description: '受控的打开状态。' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: '默认打开状态。' },
  { name: 'placement', type: 'Placement', default: `'bottom'`, description: '首选弹出位置。' },
  { name: 'showArrow', type: 'boolean', default: 'false', description: '是否显示箭头。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: '打开状态变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: 'The element that triggers the popover.' },
  { name: 'default', parameters: '-', description: 'Popover content.' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'content', type: 'string', description: '内容容器类名。' },
      { name: 'arrow', type: 'string', description: 'Arrow element class.' },
    ]
  }
]"/>
