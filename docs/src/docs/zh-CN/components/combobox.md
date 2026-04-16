# 组合框

## 概述

用于搜索并从选项列表中快速选择值的组合框组件，支持显式锚点包装、可清空输入以及更完整的弹层/过滤交互。

## 用法

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { SCombobox } from '@soybeanjs/ui';

const value = ref<string>();
const items = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' }
];
</script>

<template>
  <SCombobox v-model="value" :items="items" placeholder="Select a fruit" />
</template>
```

## 演示

```playground
basic
clearable
disabled
group
multiple
custom-styling
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'items', type: 'ComboboxOptionData[]', default: '-', description: '选项数据。', required: true },
  { name: 'modelValue', type: 'string | string[]', default: '-', description: '当前选中的值。' },
  { name: 'placeholder', type: 'string', default: '-', description: '触发器占位文本。' },
  { name: 'searchPlaceholder', type: 'string', default: '-', description: '搜索输入框占位文本。' },
  { name: 'clearable', type: 'boolean', default: 'false', description: '是否显示清空按钮。' },
  { name: 'clearLabel', type: 'string', default: `'Clear input'`, description: '清空按钮的可访问名称。' },
  { name: 'multiple', type: 'boolean', default: 'false', description: '是否允许多选。' },
  { name: 'resetModelValueOnClear', type: 'boolean', default: 'false', description: '点击清空按钮时是否同时清空选中值。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '尺寸。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '触发器自定义类名。' },
  { name: 'anchorProps', type: 'ComboboxAnchorProps', default: '-', description: '锚点包装组件的属性。' },
  { name: 'cancelProps', type: 'ComboboxCancelProps', default: '-', description: '清空按钮组件的属性。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '内部元素自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string | string[]) => void', description: '选中项变化时触发。' },
  { name: 'update:open', parameters: '(open: boolean) => void', description: '下拉面板开关时触发。' },
  { name: 'select', parameters: '(event: SelectEvent<string>) => void', description: '选择某个选项时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'trigger-leading', parameters: '-', description: '触发器前置内容。' },
  { name: 'trigger-value', parameters: '{ modelValue: string | string[] | undefined; selectedLabels: string[]; slotText: string | undefined }', description: '自定义触发器文本。' },
  { name: 'trigger-icon', parameters: '-', description: '触发器尾部图标。' },
  { name: 'input-leading', parameters: '{ clear: () => void }', description: '搜索输入框前置内容。' },
  { name: 'input-trailing', parameters: '{ clear: () => void }', description: '搜索输入框后置内容。' },
  { name: 'empty', parameters: '-', description: '无结果时的内容。' },
  { name: 'group-label', parameters: '{ item: ComboboxGroupOptionData }', description: '分组标题内容。' },
  { name: 'item-leading', parameters: '{ item: ComboboxSingleOptionData }', description: '选项前置内容。' },
  { name: 'item-text', parameters: '{ item: ComboboxSingleOptionData }', description: '选项文本内容。' },
  { name: 'item-trailing', parameters: '{ item: ComboboxSingleOptionData }', description: '选项后置内容。' },
  { name: 'item-indicator', parameters: '{ item: ComboboxSingleOptionData }', description: '选中指示器内容。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'ComboboxSingleOptionData',
    description: '普通选项数据。',
    fields: [
      { name: 'label', type: 'string', description: '展示文本。' },
      { name: 'value', type: 'string', description: '唯一值。' },
      { name: 'icon', type: 'IconValue', description: '可选图标。' },
      { name: 'disabled', type: 'boolean', description: '是否禁用。' },
      { name: 'separator', type: 'boolean', description: '是否在该项前显示分隔线。' }
    ]
  },
  {
    name: 'ComboboxGroupOptionData',
    description: '分组选项数据。',
    fields: [
      { name: 'label', type: 'string', description: '分组标题。' },
      { name: 'items', type: 'ComboboxSingleOptionData[]', description: '分组内选项。' },
      { name: 'separator', type: 'boolean', description: '是否在该分组前显示分隔线。' }
    ]
  },
  {
    name: 'Ui',
    description: '组合框内部元素样式映射。',
    fields: [
      { name: 'trigger', type: 'string', description: '触发器类名。' },
      { name: 'triggerIcon', type: 'string', description: '触发器图标类名。' },
      { name: 'anchor', type: 'string', description: '锚点容器类名。' },
      { name: 'cancel', type: 'string', description: '清空按钮类名。' },
      { name: 'positioner', type: 'string', description: '定位容器类名。' },
      { name: 'popup', type: 'string', description: '弹层容器类名。' },
      { name: 'arrow', type: 'string', description: '弹层箭头类名。' },
      { name: 'viewport', type: 'string', description: '选项列表类名。' },
      { name: 'inputRoot', type: 'string', description: '输入框根节点类名。' },
      { name: 'inputControl', type: 'string', description: '输入框控件类名。' },
      { name: 'group', type: 'string', description: '分组容器类名。' },
      { name: 'groupLabel', type: 'string', description: '分组标题类名。' },
      { name: 'item', type: 'string', description: '选项类名。' },
      { name: 'itemIndicator', type: 'string', description: '选中指示器类名。' },
      { name: 'empty', type: 'string', description: '空状态类名。' },
      { name: 'separator', type: 'string', description: '分隔线类名。' },
      { name: 'virtualizer', type: 'string', description: '虚拟列表容器类名。' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
