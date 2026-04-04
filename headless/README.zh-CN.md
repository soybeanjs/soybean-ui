# @soybeanjs/headless

## [English](./README.md) | 中文

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![github stars](https://img.shields.io/github/stars/soybeanjs/soybean-ui)](https://github.com/soybeanjs/soybean-ui)

一套用于 Vue 3 的无样式、可访问的 UI 组件集合。

## 📖 简介

`@soybeanjs/headless` 为 UI 组件提供了核心逻辑和可访问性功能，但不包含任何样式。它专为希望构建自己的设计系统并完全控制视觉外观的开发者而设计。

## 📦 安装

```bash
pnpm add @soybeanjs/headless
```

## 🚀 使用方法

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

## ✨ 特性

- **无样式**: 不包含 CSS。您可以使用自己的样式。
- **可访问性**: 处理 WAI-ARIA 角色、焦点管理和键盘导航。
- **可组合**: 组件设计为可组合使用。
- **Vue 3**: 使用 Composition API 为 Vue 3 构建。

## 📚 包结构

```
headless/src/
├── components/    # 50 个原语组件（accordion、dialog、select…）
├── composables/   # 26 个共享 hook（状态、焦点、浮层、选择…）
├── shared/        # 纯 TS 工具函数（DOM、焦点、树、表单、守卫）
├── constants/     # ARIA 属性常量、组件标识键
├── types/         # 全局类型（ClassValue、UiClass、PropsToContext…）
└── index.ts        # 主 barrel 导出
```

### 子路径导出

```ts
import { AccordionRoot } from '@soybeanjs/headless'; // 组件 + 类型
import { useControllableState } from '@soybeanjs/headless/composables'; // 26 个 composable
import { transformPropsToContext } from '@soybeanjs/headless/shared'; // 纯 TS 工具
import * as H from '@soybeanjs/headless/namespaced'; // 命名空间导入
import type { AccordionUiSlot } from '@soybeanjs/headless/accordion'; // 单组件类型
```

## 🧩 Composables

26 个 hook，按功能分类：

| 分类     | Composables                                                    |
| -------- | -------------------------------------------------------------- |
| **状态** | `useContext`、`useControllableState`、`useStateMachine`        |
| **焦点** | `useFocusScope`、`useFocusGuards`、`useArrowNavigation`        |
| **层叠** | `useDismissableLayer`、`useEscapeKeyDown`、`useBodyScrollLock` |
| **浮层** | `useFloating`、`useGraceArea`、`usePopupEvents`                |
| **DOM**  | `useForwardElement`、`useExposedElement`、`useHideOthers`      |
| **选择** | `useSelection`、`useCollection`、`useTypeahead`                |
| **桥接** | `useUiContext`、`useOmitProps`、`useForwardListeners`          |

## 🎨 接入自定义样式层

每个多插槽组件都提供 `provide{Name}Ui` 函数。在样式包装组件中调用它并传入计算好的类名 map：

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { AccordionRoot, provideAccordionUi } from '@soybeanjs/headless';

const props = defineProps<{ size?: 'sm' | 'md' | 'lg' }>();

// 用任何方式计算类名（CSS Modules、CVA、tv() 等）
const ui = computed(() => ({
  root: 'space-y-1',
  item: 'border rounded-md',
  trigger: `flex w-full items-center py-3 px-4 font-medium ${props.size === 'lg' ? 'text-lg' : 'text-sm'}`,
  content: 'px-4 pb-3 text-sm',
  header: 'flex',
  description: ''
}));

provideAccordionUi(ui);
</script>

<template>
  <AccordionRoot v-bind="$props">
    <slot />
  </AccordionRoot>
</template>
```

对于单元素组件（如 `Button`），没有 UiContext，直接在组件上绑定 `:class` 即可。

## 📖 文档

完整文档和带样式的组件，请访问 [SoybeanUI 仓库](https://github.com/soybeanjs/soybean-ui)。

## 💝 致谢

- [reka-ui](https://github.com/unovue/reka-ui)
- [oku-ui](https://github.com/oku-ui/primitives)
