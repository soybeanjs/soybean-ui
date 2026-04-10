# 自动完成

## 概述

用于根据输入内容筛选建议项并快速填充文本的自动完成组件。

## 用法

```vue
<script setup lang="ts">
import { SAutocomplete } from '@soybeanjs/ui';

const items = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'blueberry', label: 'Blueberry' }
];
</script>

<template>
  <SAutocomplete :items="items" placeholder="Search a fruit" />
</template>
```

## 演示

```playground
basic
grouped
open-on-focus
disabled
custom-styling
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根元素自定义类名。' },
  { name: 'modelValue', type: 'string', default: '-', description: '当前输入值。' },
  { name: 'defaultValue', type: 'string', default: '-', description: '初始输入值。' },
  { name: 'open', type: 'boolean', default: '-', description: '受控打开状态。' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: '初始打开状态。' },
  { name: 'items', type: 'AutocompleteOptionData[]', default: '-', description: '建议项数据。', required: true },
  { name: 'placeholder', type: 'string', default: '-', description: '输入框占位文本。' },
  { name: 'clearable', type: 'boolean', default: 'false', description: '是否显示清除按钮。' },
  { name: 'openOnFocus', type: 'boolean', default: 'false', description: '输入框聚焦时是否自动展开。' },
  { name: 'openOnClick', type: 'boolean', default: 'false', description: '输入框点击时是否自动展开。' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用组件。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '组件尺寸。' },
  { name: 'emptyLabel', type: 'string', default: `'No results found.'`, description: '无匹配结果时显示的文案。' },
  { name: 'fuseOptions', type: 'UseFuseOptions<AutocompleteSearchOptionData>', default: '-', description: '高级配置。用于自定义内部模糊搜索行为。' },
  { name: 'anchorProps', type: 'AutocompleteAnchorProps', default: '-', description: '高级配置。透传给内部锚点元素的 props。' },
  { name: 'inputProps', type: 'AutocompleteInputProps', default: '-', description: '高级配置。透传给内部输入根节点和输入控件的 props。' },
  { name: 'triggerProps', type: 'AutocompleteTriggerProps', default: '-', description: '高级配置。透传给触发按钮的 props。' },
  { name: 'portalProps', type: 'AutocompletePortalProps', default: '-', description: '高级配置。透传给弹层 Portal 的 props。' },
  { name: 'contentProps', type: 'AutocompleteContentProps', default: '-', description: '高级配置。透传给弹层内容容器的 props。' },
  { name: 'viewportProps', type: 'AutocompleteViewportProps', default: '-', description: '高级配置。透传给弹层视口容器的 props。' },
  { name: 'groupProps', type: 'AutocompleteGroupProps', default: '-', description: '高级配置。透传给分组容器的 props。' },
  { name: 'groupLabelProps', type: 'AutocompleteGroupLabelProps', default: '-', description: '高级配置。透传给分组标题的 props。' },
  { name: 'itemProps', type: 'Omit<AutocompleteItemProps, \'disabled\' | \'value\'>', default: '-', description: '高级配置。透传给建议项的 props。' },
  { name: 'itemIndicatorProps', type: 'AutocompleteItemIndicatorProps', default: '-', description: '高级配置。透传给选中指示器的 props。' },
  { name: 'separatorProps', type: 'AutocompleteSeparatorProps', default: '-', description: '高级配置。透传给分组或建议项之间分隔线的 props。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '内部元素自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: '输入值变化时触发。' },
  { name: 'update:open', parameters: '(open: boolean) => void', description: '弹层开关变化时触发。' },
  { name: 'select', parameters: '(item: AutocompleteSingleOptionData) => void', description: '选择建议项时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'input-leading', parameters: '-', description: '输入框前置内容。' },
  { name: 'input-trailing', parameters: '-', description: '输入框尾部内容。' },
  { name: 'trigger-icon', parameters: '-', description: '触发按钮图标内容。' },
  { name: 'empty', parameters: '-', description: '空状态内容。' },
  { name: 'group-label', parameters: '{ item: AutocompleteGroupOptionData }', description: '分组标题内容。' },
  { name: 'item-leading', parameters: '{ item: AutocompleteSingleOptionData }', description: '建议项前置内容。' },
  { name: 'item-label', parameters: '{ item: AutocompleteSingleOptionData }', description: '建议项文本内容。' },
  { name: 'item-trailing', parameters: '{ item: AutocompleteSingleOptionData }', description: '建议项尾部内容。' },
  { name: 'item-indicator', parameters: '{ item: AutocompleteSingleOptionData }', description: '建议项选中标记内容。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'AutocompleteSingleOptionData',
    description: '单个建议项数据。',
    fields: [
      { name: 'value', type: 'string', description: '写入输入框的值。' },
      { name: 'label', type: 'string', description: '列表中显示的文本。' },
      { name: 'icon', type: 'string', description: '前置图标。' },
      { name: 'keywords', type: 'string[]', description: '额外搜索关键字。' },
      { name: 'disabled', type: 'boolean', description: '是否禁用建议项。' },
      { name: 'separator', type: 'boolean', description: '是否在该项后显示分隔线。' }
    ]
  },
  {
    name: 'Ui',
    description: '自定义样式类映射。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'anchor', type: 'string', description: '输入区容器类名。' },
      { name: 'inputRoot', type: 'string', description: '输入根容器类名。' },
      { name: 'inputControl', type: 'string', description: '输入控件类名。' },
      { name: 'trigger', type: 'string', description: '触发按钮类名。' },
      { name: 'content', type: 'string', description: '弹层内容容器类名。' },
      { name: 'viewport', type: 'string', description: '建议列表容器类名。' },
      { name: 'group', type: 'string', description: '分组容器类名。' },
      { name: 'groupLabel', type: 'string', description: '分组标题类名。' },
      { name: 'item', type: 'string', description: '建议项类名。' },
      { name: 'itemIndicator', type: 'string', description: '选中标记类名。' },
      { name: 'separator', type: 'string', description: '分隔线类名。' },
      { name: 'inputIcon', type: 'string', description: '输入前置图标类名。' },
      { name: 'inputClearable', type: 'string', description: '清除按钮类名。' },
      { name: 'triggerIcon', type: 'string', description: '触发图标类名。' },
      { name: 'itemText', type: 'string', description: '建议项文本类名。' },
      { name: 'itemIcon', type: 'string', description: '建议项图标类名。' },
      { name: 'empty', type: 'string', description: '空状态类名。' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
