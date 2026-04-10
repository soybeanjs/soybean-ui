# 悬停卡片

## 概述

当鼠标悬停或元素获得焦点时，显示可承载更丰富内容的预览卡片。

## 用法

```vue
<script setup lang="ts">
import { SButton, SHoverCard } from '@soybeanjs/ui';
</script>

<template>
  <SHoverCard>
    <template #trigger>
      <SButton variant="outline">Hover me</SButton>
    </template>
    <div class="space-y-1.5">
      <p class="font-medium">Hover card</p>
      <p class="text-sm text-muted-foreground">Use it to show richer preview content.</p>
    </div>
  </SHoverCard>
</template>
```

## 演示

```playground
basic
delay
custom-styling
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'open', type: 'boolean', default: '-', description: '受控的打开状态。' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: '默认打开状态。' },
  { name: 'openDelay', type: 'number', default: '700', description: '触发元素悬停后延迟打开的时间（毫秒）。' },
  { name: 'closeDelay', type: 'number', default: '300', description: '离开触发元素或内容后延迟关闭的时间（毫秒）。' },
  { name: 'placement', type: 'Placement', default: `'bottom'`, description: '首选弹出位置。' },
  { name: 'showArrow', type: 'boolean', default: 'true', description: '是否显示箭头。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '弹层容器自定义类名。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义内部元素类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: '打开状态变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: '触发悬停卡片的元素。' },
  { name: 'default', parameters: '-', description: '悬停卡片内容。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'positioner', type: 'string', description: '定位容器类名。' },
      { name: 'popup', type: 'string', description: '内容容器类名。' },
      { name: 'arrow', type: 'string', description: '箭头元素类名。' },
    ]
  }
]"/>
