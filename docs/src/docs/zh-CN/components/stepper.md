# 步骤条

## 概述

用于表示多步骤流程当前进度的步骤条组件。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SStepper } from '@soybeanjs/ui';

const value = ref(2);

const items = [
  { title: 'Account', description: 'Create your account' },
  { title: 'Profile', description: 'Complete your profile' },
  { title: 'Review', description: 'Confirm and submit' }
];
</script>

<template>
  <SStepper v-model="value" :items="items" />
</template>
```

## 演示

```playground
basic
vertical
linear
custom-styling
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'items', type: 'StepperOptionData[]', default: '-', description: '步骤数据。', required: true },
  { name: 'modelValue', type: 'number', default: '-', description: '当前激活步骤。' },
  { name: 'defaultValue', type: 'number', default: '1', description: '默认激活步骤。' },
  { name: 'orientation', type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: '布局方向。' },
  { name: 'linear', type: 'boolean', default: 'true', description: '是否按顺序完成步骤。' },
  { name: 'color', type: 'ThemeColor', default: `'primary'`, description: '步骤条颜色。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '步骤条尺寸。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '根元素自定义类名。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义内部元素类名。' },
  { name: 'itemProps', type: 'StepperItemProps', default: '-', description: 'StepperItem 的透传属性。' },
  { name: 'triggerProps', type: 'StepperTriggerProps', default: '-', description: 'StepperTrigger 的透传属性。' },
  { name: 'indicatorProps', type: 'StepperIndicatorProps', default: '-', description: 'StepperIndicator 的透传属性。' },
  { name: 'separatorProps', type: 'StepperSeparatorProps', default: '-', description: 'StepperSeparator 的透传属性。' },
  { name: 'titleProps', type: 'StepperTitleProps', default: '-', description: 'StepperTitle 的透传属性。' },
  { name: 'descriptionProps', type: 'StepperDescriptionProps', default: '-', description: 'StepperDescription 的透传属性。' },
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: number) => void', description: '当前步骤变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'item', parameters: '{ step: number; state: StepperState; modelValue: number }', description: '自定义整个步骤项内容。' },
  { name: 'indicator', parameters: '{ step: number; state: StepperState; modelValue: number }', description: '自定义步骤指示器内容。' },
  { name: 'title', parameters: '{ step: number; state: StepperState; modelValue: number }', description: '自定义步骤标题内容。' },
  { name: 'description', parameters: '{ step: number; state: StepperState; modelValue: number }', description: '自定义步骤描述内容。' },
  { name: 'separator', parameters: '{ step: number; state: StepperState; modelValue: number }', description: '自定义步骤分隔线内容。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'StepperOptionData',
    description: '步骤数据结构。',
    fields: [
      { name: 'step', type: 'number', description: '步骤索引，未传时按数组顺序自动生成。' },
      { name: 'title', type: 'string', description: '步骤标题。' },
      { name: 'description', type: 'string', description: '步骤描述。' },
      { name: 'disabled', type: 'boolean', description: '是否禁用该步骤。' },
      { name: 'completed', type: 'boolean', description: '是否强制标记为已完成。' },
    ]
  },
  {
    name: 'Ui',
    description: '自定义类名映射。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'item', type: 'string', description: '步骤项类名。' },
      { name: 'trigger', type: 'string', description: '步骤触发器类名。' },
      { name: 'indicator', type: 'string', description: '步骤指示器类名。' },
      { name: 'separator', type: 'string', description: '步骤分隔线类名。' },
      { name: 'title', type: 'string', description: '步骤标题类名。' },
      { name: 'description', type: 'string', description: '步骤描述类名。' },
      { name: 'itemContent', type: 'string', description: '标题与描述容器类名。' },
      { name: 'indicatorIcon', type: 'string', description: '完成状态图标类名。' },
    ]
  }
]"/>

<UnionType name="ThemeColor" description="主题颜色类型" type="'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'carbon' | 'secondary' | 'accent'" />

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
