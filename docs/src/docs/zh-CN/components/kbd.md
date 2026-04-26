# 键盘按键

## 概述

用于表示键盘输入元素，常用于展示快捷键。

## 用法

```vue
<script setup lang="ts">
import { SKbd } from '@soybeanjs/ui';
</script>

<template>
  <SKbd>⌘</SKbd>
  +
  <SKbd>K</SKbd>
  <SKbd value="Ctrl" />
  <SKbd value="command" />
  <SKbd :raised="false" value="shift" />
</template>
```

## 演示

```playground
base
size
variant
raised
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '自定义类名。' },
  { name: 'value', type: 'KbdValue | KbdValue[]', default: '-', description: '要显示的按键值，支持单个按键或按键组合。' },
  { name: 'symbolize', type: 'boolean', default: 'true', description: '是否将已知按键名称转换为符号形式。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '按键尺寸。' },
  { name: 'variant', type: 'KbdVariant', default: `'outline'`, description: '视觉样式变体。' },
  { name: 'raised', type: 'boolean', default: 'true', description: '是否启用凸起阴影效果；传入 false 可关闭。' },
  { name: 'as', type: 'string | Component', default: `'kbd'`, description: '渲染的元素。' },
  { name: 'asChild', type: 'boolean', default: 'false', description: '将属性合并到子元素。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '按键内容。' }
]"/>

### 类型

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />

<UnionType name="KbdVariant" description="按键视觉样式变体" type="'solid' | 'outline' | 'ghost'" />
