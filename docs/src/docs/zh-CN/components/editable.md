# 可编辑文本

## 概述

用于在预览态与编辑态之间切换的内联文本编辑组件。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SEditable } from '@soybeanjs/ui';

const value = ref('Click to edit');
</script>

<template>
  <SEditable v-model="value" placeholder="Enter text" />
</template>
```

## 演示

```playground
basic
size
disabled
activation-mode
custom-styling
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根元素自定义类名。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '组件尺寸。' },
  { name: 'v-model', type: 'string', default: '-', description: '受控值。' },
  { name: 'defaultValue', type: 'string', default: '-', description: '非受控初始值。' },
  { name: 'placeholder', type: 'string | { edit?: string; preview?: string }', default: '-', description: '编辑态与预览态占位文本。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用交互。' },
  { name: 'readonly', type: 'boolean', default: 'false', description: '是否只读。' },
  { name: 'activationMode', type: `'focus' | 'dblclick' | 'none'`, default: `'focus'`, description: '进入编辑态的触发方式。' },
  { name: 'submitMode', type: `'blur' | 'enter' | 'none' | 'both'`, default: `'blur'`, description: '提交值的触发方式。' },
  { name: 'selectOnFocus', type: 'boolean', default: 'false', description: '进入编辑态时是否选中文本。' },
  { name: 'startWithEditMode', type: 'boolean', default: 'false', description: '是否初始为编辑态。' },
  { name: 'maxLength', type: 'number', default: '-', description: '允许输入的最大字符数。' },
  { name: 'autoResize', type: 'boolean', default: 'false', description: '是否根据内容自动调整输入区尺寸。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '为内部元素自定义类名。' },
  { name: 'areaProps', type: 'EditableAreaProps', default: '-', description: 'EditableArea 的透传属性。' },
  { name: 'previewProps', type: 'EditablePreviewProps', default: '-', description: 'EditablePreview 的透传属性。' },
  { name: 'inputProps', type: 'EditableInputProps', default: '-', description: 'EditableInput 的透传属性。' },
  { name: 'editTriggerProps', type: 'EditableEditTriggerProps', default: '-', description: '编辑按钮的透传属性。' },
  { name: 'submitTriggerProps', type: 'EditableSubmitTriggerProps', default: '-', description: '提交按钮的透传属性。' },
  { name: 'cancelTriggerProps', type: 'EditableCancelTriggerProps', default: '-', description: '取消按钮的透传属性。' }
]"/>

> Note: `SEditable` 继承 `id`、`name`、`required` 等原生表单属性。

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: '值变化时触发。' },
  { name: 'submit', parameters: '(value: string) => void', description: '提交编辑内容时触发。' },
  { name: 'update:state', parameters: '(state: \'edit\' | \'submit\' | \'cancel\') => void', description: '编辑状态变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ modelValue, inputValue, isEditing, isEmpty, edit, cancel, submit }', description: '完全自定义内容。' },
  { name: 'preview', parameters: '{ modelValue, inputValue, isEditing, isEmpty, edit, cancel, submit }', description: '自定义预览区域。' },
  { name: 'input', parameters: '{ modelValue, inputValue, isEditing, isEmpty, edit, cancel, submit }', description: '自定义输入区域。' },
  { name: 'edit-trigger', parameters: '{ modelValue, inputValue, isEditing, isEmpty, edit, cancel, submit }', description: '自定义编辑按钮。' },
  { name: 'submit-trigger', parameters: '{ modelValue, inputValue, isEditing, isEmpty, edit, cancel, submit }', description: '自定义提交按钮。' },
  { name: 'cancel-trigger', parameters: '{ modelValue, inputValue, isEditing, isEmpty, edit, cancel, submit }', description: '自定义取消按钮。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义类名映射。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'area', type: 'string', description: '编辑区域类名。' },
      { name: 'preview', type: 'string', description: '预览文本类名。' },
      { name: 'input', type: 'string', description: '输入框类名。' },
      { name: 'controls', type: 'string', description: '操作按钮容器类名。' },
      { name: 'editTrigger', type: 'string', description: '编辑按钮类名。' },
      { name: 'submitTrigger', type: 'string', description: '提交按钮类名。' },
      { name: 'cancelTrigger', type: 'string', description: '取消按钮类名。' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
