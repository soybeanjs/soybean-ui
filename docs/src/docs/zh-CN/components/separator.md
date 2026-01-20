# 分隔线

## 概述

用于在内容之间进行视觉分隔的分隔线组件。

## 用法

```vue
<script setup lang="ts">
import { SSeparator } from '@soybeanjs/ui';
</script>

<template>
  <div>
    <div class="space-y-1">
      <h4 class="text-sm font-medium leading-none">Radix Primitives</h4>
      <p class="text-sm text-muted-foreground">An open-source UI component library.</p>
    </div>
    <SSeparator class="my-4" />
    <div class="flex h-5 items-center space-x-4 text-sm">
      <div>Blog</div>
      <SSeparator orientation="vertical" />
      <div>Docs</div>
      <SSeparator orientation="vertical" />
      <div>Source</div>
    </div>
  </div>
</template>
```

## 演示

```playground
orientation
align
border
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'orientation', type: `'horizontal' \| 'vertical'`, default: `'horizontal'`, description: 'Separator orientation.' },
  { name: 'decorative', type: 'boolean', default: 'true', description: '分隔线是否仅用于装饰（aria-hidden）。' },
  { name: 'label', type: 'string', default: '-', description: 'Text label displayed in the middle.' },
  { name: 'align', type: `'start' \| 'center' \| 'end'`, default: `'center'`, description: 'Label alignment.' },
  { name: 'border', type: `'solid' \| 'dashed' \| 'dotted'`, default: `'solid'`, description: 'Border style.' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根元素类名。' },
      { name: 'label', type: 'string', description: 'Label text class.' },
    ]
  }
]"/>
