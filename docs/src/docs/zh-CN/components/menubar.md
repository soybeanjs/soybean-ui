# 菜单栏

## 概述

用于在应用顶部组织一组菜单触发器，并承载分组、子菜单、单选和多选等桌面风格菜单交互。

## 用法

```vue
<script setup lang="ts">
import {
  SMenubar,
  SMenubarContent,
  SMenubarItem,
  SMenubarMenu,
  SMenubarTrigger
} from '@soybeanjs/ui';
</script>

<template>
  <SMenubar>
    <SMenubarMenu value="file">
      <SMenubarTrigger>File</SMenubarTrigger>
      <SMenubarContent>
        <SMenubarItem>New Tab</SMenubarItem>
        <SMenubarItem>New Window</SMenubarItem>
      </SMenubarContent>
    </SMenubarMenu>
  </SMenubar>
</template>
```

## 演示

```playground
basic
checkbox
radio
```

## API

### 主要组件

<DataTable preset="props" :data="[
  { name: 'SMenubar', type: 'MenubarRootProps', default: '-', description: '菜单栏根节点，负责 roving focus 与当前打开菜单状态。' },
  { name: 'SMenubarMenu', type: 'MenubarMenuProps', default: '-', description: '单个顶级菜单容器。' },
  { name: 'SMenubarTrigger', type: 'MenubarTriggerProps', default: '-', description: '顶级菜单触发器。' },
  { name: 'SMenubarContent', type: 'MenubarContentProps', default: '-', description: '顶级菜单内容层。' },
  { name: 'SMenubarItem', type: 'MenubarItemProps', default: '-', description: '普通菜单项，支持 destructive 与 inset 视觉变体。' },
  { name: 'SMenubarCheckboxItem', type: 'MenubarCheckboxItemProps', default: '-', description: '多选菜单项。' },
  { name: 'SMenubarRadioItem', type: 'MenubarRadioItemProps', default: '-', description: '单选菜单项。' },
  { name: 'SMenubarSubTrigger', type: 'MenubarSubTriggerProps', default: '-', description: '子菜单触发器。' },
  { name: 'SMenubarSubContent', type: 'MenubarSubContentProps', default: '-', description: '子菜单内容层。' },
  { name: 'SMenubarShortcut', type: 'MenubarShortcutProps', default: '-', description: '用于展示快捷键提示的辅助元素。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: 'SMenubar 当前打开菜单变化时触发。' },
  { name: 'select', parameters: '(event: Event) => void', description: 'SMenubarItem / SMenubarCheckboxItem / SMenubarRadioItem 被选择时触发。' },
  { name: 'update:modelValue', parameters: '(value: CheckedState) => void', description: 'SMenubarCheckboxItem 选中状态变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '各组件的默认内容插槽。', required: true },
  { name: 'indicator-icon', parameters: '-', description: 'SMenubarCheckboxItem / SMenubarRadioItem 自定义指示图标。' },
  { name: 'icon', parameters: '-', description: 'SMenubarSubTrigger 自定义尾部图标。' }
]"/>
