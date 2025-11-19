# @soybeanjs/headless

English | [中文](./README.zh-CN.md)

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![github stars](https://img.shields.io/github/stars/soybeanjs/soybean-ui)](https://github.com/soybeanjs/soybean-ui)

A collection of unstyled, accessible UI primitives for Vue 3.

## 📖 Introduction

`@soybeanjs/headless` provides the core logic and accessibility features for UI components, without any styles. It is designed for developers who want to build their own design systems with full control over the visual appearance.

## 📦 Installation

```bash
pnpm add @soybeanjs/headless
```

## 🚀 Usage

Import the components and compose them to build your UI.

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

## ✨ Features

- **Unstyled**: No CSS included. You bring your own styles.
- **Accessible**: Handles WAI-ARIA roles, focus management, and keyboard navigation.
- **Composable**: Components are designed to be composed together.
- **Vue 3**: Built for Vue 3 using Composition API.

## 📚 Documentation

For full documentation and styled components, visit the [SoybeanUI repository](https://github.com/soybeanjs/soybean-ui).

## 💝 Credits

- [reka-ui](https://github.com/unovue/reka-ui)
- [oku-ui](https://github.com/oku-ui/primitives)
