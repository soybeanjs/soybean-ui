# 折叠面板

## 概述

用于展开/折叠内容面板的交互组件。

## 用法

```vue
<script setup lang="ts">
import { SCollapsible, SButton } from '@soybeanjs/ui';

const open = ref(false);
</script>

<template>
  <SCollapsible v-model:open="open">
    <template #trigger>
      <SButton variant="outline">切换</SButton>
    </template>
    <div class="p-4 border rounded-md mt-2">内容在这里。</div>
  </SCollapsible>
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
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: '首次渲染时的默认打开状态。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '为 true 时，阻止用户与折叠面板交互。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '折叠面板尺寸。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: '打开状态变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '折叠面板的内容。' },
  { name: 'trigger', parameters: '-', description: '用于切换折叠状态的触发元素。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根元素类名。' },
      { name: 'trigger', type: 'string', description: '触发元素类名。' },
      { name: 'content', type: 'string', description: '内容容器类名。' },
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
