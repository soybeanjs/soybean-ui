# 抽屉

## 概述

从边缘滑出的抽屉面板组件，用于承载附加内容或操作。

## 用法

```vue
<script setup lang="ts">
import { SDrawer, SButton } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <SDrawer v-model:open="open" title="Menu" side="left">
    <template #trigger>
      <SButton variant="outline">Open Drawer</SButton>
    </template>
    <div class="py-4">
      <p>Navigation links...</p>
    </div>
  </SDrawer>
</template>
```

## 演示

```playground
side
scroll
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'side', type: `'top' \| 'right' \| 'bottom' \| 'left'`, default: `'right'`, description: 'The side of the screen from which the drawer appears.' },
  { name: 'open', type: 'boolean', default: '-', description: 'The controlled open state.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'The default open state.' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: 'Drawer size (width/height depending on side).' },
  { name: 'title', type: 'string', default: '-', description: 'Drawer title.' },
  { name: 'description', type: 'string', default: '-', description: 'Drawer description.' },
  { name: 'closable', type: 'boolean', default: 'true', description: '是否显示关闭按钮。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: '打开状态变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: 'The element that opens the drawer.' },
  { name: 'default', parameters: '-', description: 'Main content.' },
  { name: 'footer', parameters: '-', description: 'Footer content.' },
  { name: 'header', parameters: '-', description: 'Header content.' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类 (inherits from Dialog Ui).',
    fields: [
      { name: 'content', type: 'string', description: '内容容器类名。' },
      { name: 'main', type: 'string', description: 'Main body wrapper class.' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
