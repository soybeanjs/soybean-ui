# 菜单栏

## 概述

用于构建常驻应用顶部的菜单栏，支持横向 trigger 漫游焦点、嵌套子菜单和键盘导航。

## 用法

```vue
<script setup lang="ts">
import { SMenubar } from '@soybeanjs/ui';

const items = [
  {
    value: 'file',
    label: 'File',
    items: [
      { value: 'new-tab', label: 'New Tab', shortcut: '⌘T' },
      { value: 'share', label: 'Share', children: [{ value: 'mail', label: 'Email Link' }] }
    ]
  },
  {
    value: 'edit',
    label: 'Edit',
    items: [
      { value: 'undo', label: 'Undo' },
      { value: 'redo', label: 'Redo' }
    ]
  }
];
</script>

<template>
  <SMenubar :items="items" />
</template>
```

## 演示

```playground
basic
controlled
rtl
```

## API

### SMenubar 属性

<DataTable preset="props" :data="[
  { name: 'items', type: 'MenubarMenuData[]', default: '-', description: '顶层菜单栏分区数据。', required: true },
  { name: 'modelValue', type: 'string', default: '-', description: '受控的当前打开菜单值。' },
  { name: 'defaultValue', type: 'string', default: '-', description: '初始打开的菜单值。' },
  { name: 'dir', type: 'Direction', default: '`ltr`', description: '阅读方向。' },
  { name: 'loop', type: 'boolean', default: 'false', description: 'trigger 之间的漫游焦点是否循环。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '应用到菜单栏根节点的类名。' },
  { name: 'size', type: 'ThemeSize', default: '`md`', description: '菜单栏尺寸预设。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义 slot 类名。' },
  { name: 'indicatorPosition', type: '`start` | `end`', default: '`start`', description: '复选项和单选项指示器位置。' },
  { name: 'showArrow', type: 'boolean', default: 'false', description: '是否显示弹层箭头。' },
  { name: 'placement', type: 'Placement', default: '-', description: '首选弹层位置。' },
  { name: 'triggerProps', type: 'MenubarTriggerProps', default: '{}', description: '透传给每个 trigger 的属性。' },
  { name: 'portalProps', type: 'MenubarPortalProps', default: '{}', description: '透传给顶层和子菜单 portal 的属性。' },
  { name: 'contentProps', type: 'MenubarContentProps', default: '{}', description: '透传给顶层弹层内容的属性。' },
  { name: 'popupProps', type: 'MenubarPopupProps', default: '{}', description: '透传给 popup 表面的属性。' },
  { name: 'arrowProps', type: 'MenubarArrowProps', default: '{}', description: '透传给箭头的属性。' },
  { name: 'groupProps', type: 'MenuGroupProps', default: '{}', description: '透传给选项分组的属性。' },
  { name: 'groupLabelProps', type: 'MenuGroupLabelProps', default: '{}', description: '透传给分组标题的属性。' },
  { name: 'itemProps', type: 'MenuItemProps', default: '{}', description: '透传给菜单项的属性。' },
  { name: 'linkProps', type: 'LinkProps', default: '{}', description: '透传给链接菜单项的属性。' },
  { name: 'subProps', type: 'MenuSubProps', default: '{}', description: '透传给子菜单的属性。' },
  { name: 'subTriggerProps', type: 'MenuSubTriggerProps', default: '{}', description: '透传给子菜单 trigger 的属性。' },
  { name: 'subContentProps', type: 'MenuSubContentProps', default: '{}', description: '透传给子菜单内容的属性。' },
  { name: 'separatorProps', type: 'MenuSeparatorProps', default: '{}', description: '透传给分隔线的属性。' },
  { name: 'shortcutProps', type: 'MenuShortcutProps', default: '{}', description: '透传给快捷键徽标的属性。' }
]"/>

### SMenubar 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: '当前活动菜单变化时触发。' },
  { name: 'select', parameters: '(item: MenuOptionData, event: Event) => void', description: '选择内容项时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '{ item: MenubarMenuData }', description: '自定义 trigger 内容。' },
  { name: 'item', parameters: '{ item: MenuOptionData, isTrigger?: boolean }', description: '自定义菜单项内容。' },
  { name: 'item-leading', parameters: '{ item: MenuOptionData }', description: '菜单项前置内容。' },
  { name: 'item-trailing', parameters: '{ item: MenuOptionData }', description: '菜单项后置内容。' },
  { name: 'item-trigger-icon', parameters: '{ item: MenuOptionData }', description: '自定义子菜单 trigger 图标。' },
  { name: 'item-link-icon', parameters: '{ item: MenuOptionData }', description: '自定义外链图标。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'MenubarMenuData',
    description: '顶层菜单分区数据。',
    fields: [
      { name: 'value', type: 'string', description: '唯一菜单值。' },
      { name: 'label', type: 'string', description: 'trigger 文案。' },
      { name: 'disabled', type: 'boolean', description: '是否禁用 trigger。' },
      { name: 'items', type: 'MenuOptionData[]', description: '弹层内渲染的内容项。' }
    ]
  },
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '菜单栏根节点类名。' },
      { name: 'trigger', type: 'string', description: '顶层 trigger 类名。' },
      { name: 'positioner', type: 'string', description: '顶层弹层定位容器类名。' },
      { name: 'popup', type: 'string', description: '顶层弹层类名。' },
      { name: 'arrow', type: 'string', description: '弹层箭头类名。' },
      { name: 'subPositioner', type: 'string', description: '子菜单定位容器类名。' },
      { name: 'subPopup', type: 'string', description: '子菜单弹层类名。' },
      { name: 'subTrigger', type: 'string', description: '子菜单 trigger 类名。' },
      { name: 'group', type: 'string', description: '分组容器类名。' },
      { name: 'groupLabel', type: 'string', description: '分组标题类名。' },
      { name: 'item', type: 'string', description: '菜单项类名。' },
      { name: 'checkboxGroup', type: 'string', description: '复选组类名。' },
      { name: 'checkboxItem', type: 'string', description: '复选项类名。' },
      { name: 'radioGroup', type: 'string', description: '单选组类名。' },
      { name: 'radioItem', type: 'string', description: '单选项类名。' },
      { name: 'itemIndicator', type: 'string', description: '条目标识类名。' },
      { name: 'separator', type: 'string', description: '分隔线类名。' },
      { name: 'subTriggerIcon', type: 'string', description: '子菜单 trigger 图标类名。' },
      { name: 'itemLinkIcon', type: 'string', description: '外链图标类名。' },
      { name: 'shortcut', type: 'string', description: '快捷键徽标类名。' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
