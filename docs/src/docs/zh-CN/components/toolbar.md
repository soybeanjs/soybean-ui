# Toolbar

## 概述

用于将相关操作、链接和切换控件组织到同一个支持 roving focus 的紧凑工具栏中。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SToolbar, SToolbarButton, SToolbarSeparator, SToolbarToggleGroup, SToolbarToggleItem } from '@soybeanjs/ui';

const value = ref('bold');
</script>

<template>
  <SToolbar>
    <SToolbarButton>剪切</SToolbarButton>
    <SToolbarButton>复制</SToolbarButton>
    <SToolbarSeparator />
    <SToolbarToggleGroup v-model="value">
      <SToolbarToggleItem value="bold">加粗</SToolbarToggleItem>
      <SToolbarToggleItem value="italic">斜体</SToolbarToggleItem>
    </SToolbarToggleGroup>
  </SToolbar>
</template>
```

## 演示

```playground
basic
link
toggle-group
vertical
```

## API

### SToolbar 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '工具栏自定义类名' },
  { name: 'orientation', type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: '工具栏方向' },
  { name: 'dir', type: `'ltr' | 'rtl'`, default: '-', description: '阅读方向' },
  { name: 'loop', type: 'boolean', default: 'false', description: '是否循环 roving focus' },
  { name: 'as', type: 'string | Component', default: `'div'`, description: '渲染元素' },
  { name: 'asChild', type: 'boolean', default: 'false', description: '是否将属性合并到子元素' }
]"/>

### SToolbarButton 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '按钮自定义类名' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用按钮' },
  { name: 'type', type: `'button' | 'submit' | 'reset'`, default: `'button'`, description: '作为 button 渲染时的原生类型' },
  { name: 'as', type: 'string | Component', default: `'button'`, description: '渲染元素' },
  { name: 'asChild', type: 'boolean', default: 'false', description: '是否将属性合并到子元素' }
]"/>

### SToolbarLink 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '链接自定义类名' },
  { name: 'href', type: 'string', default: '-', description: '链接地址' },
  { name: 'to', type: 'RouteLocationRaw', default: '-', description: '路由目标' },
  { name: 'disabled', type: 'boolean', default: '-', description: '是否禁用链接' },
  { name: 'target', type: 'string', default: '-', description: '链接打开目标' }
]"/>

### SToolbarSeparator 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '分隔线自定义类名' },
  { name: 'decorative', type: 'boolean', default: 'false', description: '是否仅作为装饰元素' }
]"/>

### SToolbarToggleGroup 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '切换组自定义类名' },
  { name: 'modelValue', type: 'string | string[]', default: '-', description: '受控选中值' },
  { name: 'defaultValue', type: 'string | string[]', default: '-', description: '初始选中值' },
  { name: 'multiple', type: 'boolean', default: 'false', description: '是否支持多选' },
  { name: 'singleClearable', type: 'boolean', default: 'true', description: '单选模式下是否允许取消当前值' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用整个切换组' },
  { name: 'orientation', type: `'horizontal' | 'vertical'`, default: '继承工具栏方向', description: '切换组方向' }
]"/>

### SToolbarToggleItem 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '切换项自定义类名' },
  { name: 'value', type: 'string | number', default: '-', description: '唯一值', required: true },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用切换项' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'click', parameters: '(event: MouseEvent) => void', description: '点击工具栏按钮时触发' },
  { name: 'update:modelValue', parameters: '(value: string | string[]) => void', description: '工具栏切换组值变化时触发' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '工具栏内容', required: true }
]"/>
