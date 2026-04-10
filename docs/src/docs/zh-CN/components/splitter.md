# Splitter

## 概述

用于将一个区域拆分为多个可拖拽调整尺寸面板的布局组件。

## 用法

```vue
<script setup lang="ts">
import { SSplitterGroup, SSplitterPanel, SSplitterResizeHandle } from '@soybeanjs/ui';
</script>

<template>
  <SSplitterGroup>
    <SSplitterPanel :default-size="30">侧边栏</SSplitterPanel>
    <SSplitterResizeHandle with-handle aria-label="调整面板尺寸" />
    <SSplitterPanel>主内容</SSplitterPanel>
  </SSplitterGroup>
</template>
```

## 演示

```playground
basic
vertical
collapsible
disabled
custom-handle
```

## API

### Group 属性

<DataTable preset="props" :data="[
  { name: 'direction', type: '`horizontal` | `vertical`', default: '`horizontal`', description: 'Splitter 的排列方向。' },
  { name: 'dir', type: '`ltr` | `rtl`', default: '`ltr`', description: '水平方向下键盘与拖拽交互的阅读方向。' },
  { name: 'defaultLayout', type: 'number[]', default: '-', description: '面板初始化布局百分比。' },
  { name: 'keyboardResizeBy', type: 'number', default: '10', description: '键盘调整尺寸时使用的百分比步进值。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '分组根元素自定义类名。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '为内部元素自定义类名。' },
]"/>

### Panel 属性

<DataTable preset="props" :data="[
  { name: 'defaultSize', type: 'number', default: '-', description: '面板初始百分比尺寸。' },
  { name: 'minSize', type: 'number', default: '10', description: '展开状态下的最小面板尺寸百分比。' },
  { name: 'maxSize', type: 'number', default: '100', description: '面板最大尺寸百分比。' },
  { name: 'collapsible', type: 'boolean', default: 'false', description: '面板是否允许折叠。' },
  { name: 'collapsedSize', type: 'number', default: '0', description: '面板折叠后的尺寸。' },
  { name: 'order', type: 'number', default: '-', description: '条件渲染场景下显式指定面板顺序。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '面板根元素自定义类名。' },
]"/>

### Resize Handle 属性

<DataTable preset="props" :data="[
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用拖拽手柄。' },
  { name: 'tabindex', type: 'number', default: '0', description: '拖拽手柄的 Tab 顺序。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '拖拽手柄自定义类名。' },
  { name: 'withHandle', type: 'boolean', default: 'false', description: '是否渲染默认的握柄视觉样式。' },
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'layout', parameters: '(value: number[]) => void', description: '分组布局变化时触发。' },
  { name: 'collapse', parameters: '() => void', description: '面板折叠时触发。' },
  { name: 'expand', parameters: '() => void', description: '面板展开时触发。' },
  { name: 'resize', parameters: '(size: number, prevSize?: number) => void', description: '面板尺寸变化时触发。' },
  { name: 'dragging', parameters: '(value: boolean) => void', description: '拖拽手柄开始或结束拖拽时触发。' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ layout }', description: 'Splitter 分组内容。', required: true },
  { name: 'default (panel)', parameters: '{ isCollapsed, isExpanded, collapse, expand, resize }', description: '面板内容与命令式操作方法。' },
  { name: 'default (resize handle)', parameters: '{ active, focused }', description: '自定义拖拽手柄内容。' },
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Splitter 的自定义类名映射。',
    fields: [
      { name: 'root', type: 'string', description: '分组根容器类名。' },
      { name: 'panel', type: 'string', description: '面板根元素类名。' },
      { name: 'resizeHandle', type: 'string', description: '拖拽手柄类名。' },
    ],
  }
]"/>
