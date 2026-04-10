# BottomSheet

## 概述

从视口底部滑出的移动端优先面板，支持拖拽关闭交互。

## 用法

```vue
<script setup lang="ts">
import { SBottomSheet, SButton } from '@soybeanjs/ui';
</script>

<template>
  <SBottomSheet title="分享内容" description="邀请协作者或复制链接继续操作。">
    <template #trigger>
      <SButton variant="outline">打开 BottomSheet</SButton>
    </template>
    <p class="text-sm text-muted-foreground">这里是面板内容。</p>
  </SBottomSheet>
</template>
```

## 演示

```playground
basic
controlled
handle-only
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'open', type: 'boolean', default: '-', description: '受控打开状态。' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: '默认打开状态。' },
  { name: 'modal', type: 'boolean', default: 'true', description: '打开时是否阻止外部交互。' },
  { name: 'class', type: 'ClassValue', default: '-', description: '内容容器自定义类名。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '控制面板内的间距与字号。' },
  { name: 'title', type: 'string', default: '-', description: '面板标题。' },
  { name: 'description', type: 'string', default: '-', description: '面板描述。' },
  { name: 'showHandle', type: 'boolean', default: 'true', description: '是否显示拖拽手柄。' },
  { name: 'handleOnly', type: 'boolean', default: 'false', description: '为 true 时仅允许从手柄区域拖拽。' },
  { name: 'closeThreshold', type: 'number', default: '0.35', description: '触发拖拽关闭所需的面板高度比例。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '内部插槽自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(open: boolean) => void', description: '打开状态变化时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: '打开面板的触发元素。' },
  { name: 'handle', parameters: '-', description: '自定义拖拽手柄内容。' },
  { name: 'header', parameters: '-', description: '自定义头部内容。' },
  { name: 'title', parameters: '-', description: '自定义标题内容。' },
  { name: 'description', parameters: '-', description: '自定义描述内容。' },
  { name: 'default', parameters: '-', description: '主体内容。', required: true },
  { name: 'footer', parameters: '-', description: '底部操作区。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'overlay', type: 'string', description: '遮罩层类名。' },
      { name: 'content', type: 'string', description: '内容容器类名。' },
      { name: 'header', type: 'string', description: '头部容器类名。' },
      { name: 'title', type: 'string', description: '标题类名。' },
      { name: 'description', type: 'string', description: '描述类名。' },
      { name: 'footer', type: 'string', description: '底部容器类名。' },
      { name: 'handle', type: 'string', description: '手柄容器类名。' },
      { name: 'handleIndicator', type: 'string', description: '手柄指示器类名。' },
      { name: 'main', type: 'string', description: '主体包裹层类名。' },
    ],
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
