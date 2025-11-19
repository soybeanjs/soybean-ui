# @soybeanjs/headless

## [English](./README.md) | 中文

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![github stars](https://img.shields.io/github/stars/soybeanjs/soybean-ui)](https://github.com/soybeanjs/soybean-ui)

一套用于 Vue 3 的无样式、可访问的 UI 组件集合。

## 简介

`@soybeanjs/headless` 为 UI 组件提供了核心逻辑和可访问性功能，但不包含任何样式。它专为希望构建自己的设计系统并完全控制视觉外观的开发者而设计。

## 安装

```bash
pnpm add @soybeanjs/headless
```

## 使用方法

引入组件并组合它们以构建您的 UI。

```vue
<script setup>
import {
  DialogRoot,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose
} from '@soybeanjs/headless';
</script>

<template>
  <DialogRoot>
    <DialogTrigger>Open Dialog</DialogTrigger>
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 bg-black/50" />
      <DialogContent class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-md">
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>Make changes to your profile here.</DialogDescription>
        <DialogClose>Save changes</DialogClose>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
```

## 特性

- **无样式**: 不包含 CSS。您可以使用自己的样式。
- **可访问性**: 处理 WAI-ARIA 角色、焦点管理和键盘导航。
- **可组合**: 组件设计为可组合使用。
- **Vue 3**: 使用 Composition API 为 Vue 3 构建。

## 文档

有关完整文档和带样式的组件，请访问 [SoybeanUI 仓库](https://github.com/soybeanjs/soybean-ui)。
