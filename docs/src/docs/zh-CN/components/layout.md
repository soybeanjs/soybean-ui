# 布局

## 概述

用于后台管理面板或复杂应用的布局组件结构。它负责管理侧边栏、头部、底部、标签栏以及主内容区域。

## 用法

```vue
<script setup lang="ts">
import { SLayout } from '@soybeanjs/ui';
</script>

<template>
  <SLayout>
    <template #sidebar>侧边栏内容</template>
    <template #header>头部内容</template>
    <template #tab>标签栏内容</template>
    主内容
    <template #footer>底部内容</template>
  </SLayout>
</template>
```

## 演示

```playground
base
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: '布局尺寸配置。' },
  { name: 'sidebarProps', type: 'LayoutSidebarProps', default: '{}', description: '侧边栏的属性。' },
  { name: 'headerProps', type: 'LayoutHeaderProps', default: '{}', description: '头部的属性。' },
  { name: 'mainProps', type: 'LayoutMainProps', default: '{}', description: '主区域的属性。' },
  { name: 'tabProps', type: 'LayoutTabProps', default: '{}', description: '标签栏区域的属性。' },
  { name: 'footerProps', type: 'LayoutFooterProps', default: '{}', description: '底部的属性。' },
  { name: 'railProps', type: 'LayoutRailProps', default: '{}', description: '侧边轨（迷你侧边栏）的属性。' },
  { name: 'mobileProps', type: 'LayoutMobileProps', default: '{}', description: '移动端抽屉的属性。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'sidebar', parameters: '-', description: '侧边栏内容。' },
  { name: 'header', parameters: '-', description: '头部内容。' },
  { name: 'tab', parameters: '-', description: '标签栏内容。' },
  { name: 'default', parameters: '-', description: '主内容区域。' },
  { name: 'footer', parameters: '-', description: '底部内容。' }
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'sidebar', type: 'string', description: '侧边栏容器类名。' },
      { name: 'header', type: 'string', description: '头部容器类名。' },
      { name: 'main', type: 'string', description: '主区域包装器类名。' },
      { name: 'footer', type: 'string', description: '底部容器类名。' },
    ]
  }
]"/>
