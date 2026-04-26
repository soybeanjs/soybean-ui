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
    children: [
      { value: 'new-tab', label: 'New Tab', shortcut: '⌘T' },
      { value: 'share', label: 'Share', children: [{ value: 'mail', label: 'Email Link' }] }
    ]
  },
  {
    value: 'edit',
    label: 'Edit',
    children: [
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

<ComponentApi component="menubar" />
