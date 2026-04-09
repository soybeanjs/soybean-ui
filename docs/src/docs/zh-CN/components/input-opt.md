# 验证码输入

## 概述

用于输入一次性验证码或短校验码的分槽输入组件。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SInputOpt, SInputOptGroup, SInputOptSlot } from '@soybeanjs/ui';

const value = ref('');
</script>

<template>
  <SInputOpt v-model="value" :maxlength="6">
    <SInputOptGroup>
      <SInputOptSlot v-for="index in 6" :key="index" :index="index - 1" />
    </SInputOptGroup>
  </SInputOpt>
</template>
```

## 演示

```playground
basic
controlled
disabled
separator
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'string', default: '-', description: '受控验证码值。' },
  { name: 'defaultValue', type: 'string', default: '`空字符串`', description: '非受控模式下的默认值。' },
  { name: 'maxlength', type: 'number', default: '-', description: '验证码槽位数量。', required: true },
  { name: 'placeholder', type: 'string', default: '-', description: '按字符映射到每个空槽位的占位内容。' },
  { name: 'pattern', type: 'string | RegExp', default: '-', description: '用于校验整段输入值的模式。' },
  { name: 'textAlign', type: '`left` | `center` | `right`', default: '`left`', description: '隐藏输入层的文字对齐方式。' },
  { name: 'inputmode', type: 'InputHTMLAttributes[`inputmode`]', default: '`numeric`', description: '移动端虚拟键盘类型。' },
  { name: 'autocomplete', type: 'string', default: '`one-time-code`', description: '自动填充提示。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用输入。' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '是否只读。' },
  { name: 'required', type: 'boolean', default: 'false', description: '是否必填。' },
  { name: 'name', type: 'string', default: '-', description: '表单提交字段名。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '根元素自定义类名。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '根容器与隐藏输入层的自定义类名。' },
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: '输入值变化时触发。' },
  { name: 'complete', parameters: '(value: string) => void', description: '输入长度达到 maxlength 时触发。' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ slots, isFocused, isHovering }', description: '自定义验证码槽位内容。', required: true },
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'InputOpt 自定义类名映射。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'input', type: 'string', description: '隐藏输入层类名。' },
    ],
  },
  {
    name: 'InputOptSlotData',
    description: '单个槽位的渲染状态。',
    fields: [
      { name: 'char', type: 'string | null', description: '当前槽位字符。' },
      { name: 'placeholderChar', type: 'string | null', description: '空槽位占位字符。' },
      { name: 'isActive', type: 'boolean', description: '槽位是否处于激活态。' },
      { name: 'hasFakeCaret', type: 'boolean', description: '槽位是否显示模拟光标。' },
    ],
  }
]"/>
