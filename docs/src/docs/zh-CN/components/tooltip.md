# 文字提示

## 概述

当元素获得键盘焦点或鼠标悬停时，显示与该元素相关信息的弹出层。

## 用法

```vue
<script setup lang="ts">
import { STooltip, SButton } from '@soybeanjs/ui';
</script>

<template>
  <STooltip content="添加到库">
    <template #trigger>
      <SButton variant="outline">悬停查看</SButton>
    </template>
  </STooltip>
</template>
```

## 演示

```playground
base
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'content', type: 'string', default: '-', description: '提示内容。' },
  { name: 'placement', type: 'Placement', default: `'top'`, description: '首选弹出位置。' },
  { name: 'open', type: 'boolean', default: '-', description: '受控的打开状态。' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: '默认打开状态。' },
  { name: 'delay', type: 'number', default: '700', description: '打开延迟（毫秒）。' },
  { name: 'showArrow', type: 'boolean', default: 'true', description: '是否显示箭头。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: '打开状态变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: '触发文字提示的元素。' },
  { name: 'default', parameters: '-', description: '提示内容。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'content', type: 'string', description: '内容容器类名。' },
      { name: 'arrow', type: 'string', description: '箭头元素类名。' },
    ]
  }
]"/>
