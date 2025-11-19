# SoybeanUI

[English](./README.md) | 中文

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![github stars](https://img.shields.io/github/stars/soybeanjs/soybean-ui)](https://github.com/soybeanjs/soybean-ui)

SoybeanUI 是一个优雅、现代、可访问且高质量的 UI 组件库，具有 shadcn-like 设计，适用于 Vue 3，构建在强大的 Headless 基础之上。它提供了一套全面、可访问、可定制且高性能的组件。

## 📚 架构

SoybeanUI 由两个主要包组成：

- **@soybeanjs/headless**: 逻辑层。它处理状态管理、可访问性 (A11y)、键盘交互和焦点管理。它完全不包含样式，如果您想构建自己的设计系统，它能为您提供最大的控制权。
- **@soybeanjs/ui**: 表现层。它使用 UnoCSS (通过 `tailwind-variants`) 为 Headless 组件包装了美观、可定制的样式。它开箱即用。

## 📦 安装

### 使用带样式的 UI 库 (推荐)

如果您想要具有现代设计的现成组件：

```bash
pnpm add @soybeanjs/ui
```

### 使用 Headless 库

如果您想从头开始构建自己的设计系统：

```bash
pnpm add @soybeanjs/headless
```

## 🚀 使用方法

### @soybeanjs/ui

1. **引入样式**

   在您的主入口文件 (例如 `main.ts`) 中引入 CSS 文件：

```ts
import '@soybeanjs/ui/styles.css';
```

2. **全局注册 (可选)**

   您可以全局注册组件，也可以按需引入。

3. **按需引入 (推荐)**

   我们推荐使用 `unplugin-vue-components` 来自动引入组件。

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite';
import UiResolver from '@soybeanjs/ui/resolver';

export default defineConfig({
  plugins: [
    Components({
      resolvers: [UiResolver()]
    })
  ]
});
```

4. **Nuxt 模块**

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@soybeanjs/ui/nuxt']
});
```

### @soybeanjs/headless

Headless 组件提供功能但不包含样式。

```vue
<script setup>
import { AccordionRoot, AccordionItem, AccordionTrigger, AccordionContent } from '@soybeanjs/headless';
</script>

<template>
  <AccordionRoot>
    <AccordionItem value="item-1">
      <AccordionTrigger>Is it accessible?</AccordionTrigger>
      <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
    </AccordionItem>
  </AccordionRoot>
</template>
```

## ✨ 特性

- **可访问性**: 遵循 WAI-ARIA 模式以实现可访问性。
- **Headless**: 逻辑与样式分离。
- **类型安全**: 使用 TypeScript 编写，提供完整的类型支持。
- **可定制**: 基于 UnoCSS 和 `tailwind-variants` 构建，易于主题化。
- **轻量级**: 支持 Tree-shaking 的组件。

## 💝 致谢

- [reka-ui](https://github.com/unovue/reka-ui)
- [oku-ui](https://github.com/oku-ui/primitives)
- [shadcn-vue](https://github.com/unovue/shadcn-vue)
- [shadcn/ui](https://github.com/shadcn/ui)
- [nuxt-ui](https://github.com/nuxt/ui)
- [unocss](https://github.com/unocss/unocss)

## 🗺️ 路线图

### 组件

✅: 已完成 ✨: 已实现

✅ 46 / 总计: 107

| 序号 | 优先级 | 名称            | 状态         | 别名                 | 📝 备注                  |
| ---- | ------ | --------------- | ------------ | -------------------- | ------------------------ |
| 1    | 1      | Accordion       | ✅ Completed |                      |                          |
| 2    | 1      | Alert           | ✅ Completed |                      |                          |
| 3    | 1      | AlertDialog     | ✅ Completed |                      |                          |
| 4    | 1      | Arrow           | ✅ Completed |                      |                          |
| 5    | 1      | AspectRatio     | ✅ Completed |                      |                          |
| 6    | 1      | Avatar          | ✅ Completed |                      |                          |
| 7    | 1      | Badge           | ✅ Completed | Chip                 |                          |
| 8    | 1      | Breadcrumb      | ✅ Completed |                      |                          |
| 9    | 1      | Button          | ✅ Completed |                      | ✨ support loading       |
| 10   | 1      | Card            | ✅ Completed |                      |                          |
| 11   | 1      | Checkbox        | ✅ Completed |                      | ✨ support checkbox card |
| 12   | 1      | Collapsible     | ✅ Completed |                      |                          |
| 13   | 1      | Command         | ✅ Completed |                      |                          |
| 14   | 1      | ConfigProvider  | ✅ Completed |                      |                          |
| 15   | 1      | ContextMenu     | ✅ Completed |                      |                          |
| 16   | 1      | Dialog          | ✅ Completed |                      |                          |
| 17   | 1      | Drawer          | ✅ Completed | Sheet                |                          |
| 18   | 1      | DropdownMenu    | ✅ Completed |                      | ✨ support hover trigger |
| 19   | 1      | Form            | ✅ Completed |                      |                          |
| 20   | 1      | Icon            | ✅ Completed |                      | ✨ based on iconify      |
| 21   | 1      | Input           | ✅ Completed |                      |                          |
| 22   | 1      | Kbd             | ✅ Completed |                      |                          |
| 23   | 1      | Label           | ✅ Completed |                      |                          |
| 24   | 1      | Layout          | ✅ Completed |                      |                          |
| 25   | 1      | Link            | ✅ Completed |                      |                          |
| 26   | 1      | List            | ✅ Completed |                      |                          |
| 27   | 1      | Listbox         | ✅ Completed |                      |                          |
| 28   | 1      | Menu            | ✅ Completed |                      |                          |
| 29   | 1      | NavigationMenu  | ✅ Completed |                      |                          |
| 30   | 1      | NumberInput     | ✅ Completed | NumberField          |                          |
| 31   | 1      | Pagination      | ✅ Completed |                      |                          |
| 32   | 1      | Password        | ✅ Completed |                      |                          |
| 33   | 1      | Popover         | ✅ Completed |                      |                          |
| 34   | 1      | RadioGroup      | ✅ Completed |                      | ✨ support radio card    |
| 35   | 1      | Segment         | ✅ Completed |                      |                          |
| 36   | 1      | Select          | ✅ Completed |                      |                          |
| 37   | 1      | Separator       | ✅ Completed | Divider              |                          |
| 38   | 1      | Switch          | ✅ Completed |                      | ✨ support switch card   |
| 39   | 1      | Tabs            | ✅ Completed |                      |                          |
| 40   | 1      | Tag             | ✅ Completed | Badge(shadcn-ui)     |                          |
| 41   | 1      | Textarea        | ✅ Completed |                      | ✨ support auto size     |
| 42   | 1      | Toast           | ✅ Completed | Sonner               | migrate from vue-sonner  |
| 43   | 1      | Tooltip         | ✅ Completed |                      |                          |
| 44   | 1      | Tree            | ✅ Completed |                      | ✨ support virtualized   |
| 45   | 1      | TreeMenu        | ✅ Completed |                      |                          |
| 46   | 1      | Virtualizer     | ✅ Completed |                      |                          |
| 47   | 1      | VisuallyHidden  | ✅ Completed |                      |                          |
| 48   | 2      | ColorPicker     |              |                      |                          |
| 49   | 2      | Combobox        |              |                      | support virtualized      |
| 50   | 2      | DataTable       |              |                      | support virtualized      |
| 51   | 2      | Menubar         |              |                      |                          |
| 52   | 2      | PinInput        |              | InputOPT, OPTInput   |                          |
| 53   | 2      | Popconfirm      |              |                      |                          |
| 54   | 2      | Progress        |              |                      | include circle           |
| 55   | 2      | ScrollArea      |              |                      |                          |
| 56   | 2      | Skeleton        |              |                      |                          |
| 57   | 2      | Slider          |              |                      |                          |
| 58   | 2      | Table           |              |                      |                          |
| 59   | 2      | Toggle          |              |                      |                          |
| 60   | 2      | ToggleGroup     |              |                      |                          |
| 61   | 3      | BottomSheet     |              | Drawer(shadcn-ui)    |                          |
| 62   | 3      | Calendar        |              |                      | v-calendar               |
| 63   | 3      | Carousel        |              |                      |                          |
| 64   | 3      | DateField       |              |                      |                          |
| 65   | 3      | DatePicker      |              |                      |                          |
| 66   | 3      | DateRangeField  |              |                      |                          |
| 67   | 3      | DateRangePicker |              |                      |                          |
| 68   | 3      | Editable        |              |                      |                          |
| 69   | 3      | HoverCard       |              |                      |                          |
| 70   | 3      | RangeCalendar   |              |                      | v-calendar               |
| 71   | 3      | Resizable       |              |                      |                          |
| 72   | 3      | Splitter        |              |                      |                          |
| 73   | 3      | Stepper         |              |                      |                          |
| 74   | 3      | TagsInput       |              |                      |                          |
| 75   | 3      | TimeField       |              |                      |                          |
| 76   | 3      | Timeline        |              |                      | ui things                |
| 77   | 3      | TimePicker      |              |                      | element-plus             |
| 78   | 3      | Toolbar         |              |                      |                          |
| 79   | 4      | Affix           |              |                      |                          |
| 80   | 4      | Anchor          |              |                      |                          |
| 81   | 4      | AutoComplete    |              |                      | support virtualized      |
| 82   | 4      | Backtop         |              |                      |                          |
| 83   | 4      | Cascader        |              |                      | support virtualized      |
| 84   | 4      | Clipboard       |              |                      |                          |
| 85   | 4      | Code            |              |                      |                          |
| 86   | 4      | Comment         |              |                      |                          |
| 87   | 4      | Countdown       |              |                      |                          |
| 88   | 4      | CurrencyInput   |              |                      |                          |
| 89   | 4      | Descriptions    |              |                      |                          |
| 90   | 4      | Ellipsis        |              |                      |                          |
| 91   | 4      | Empty           |              |                      |                          |
| 92   | 4      | Equation        |              |                      | based on katex           |
| 93   | 4      | InfiniteScroll  |              |                      |                          |
| 94   | 4      | Mention         |              |                      | element-plus             |
| 95   | 4      | Navbar          |              |                      |                          |
| 96   | 4      | NumberAnimation |              |                      | naive-ui                 |
| 97   | 4      | PageTab         |              |                      |                          |
| 98   | 4      | QRCode          |              |                      |                          |
| 99   | 4      | Rating          |              | Rate                 | element-plus             |
| 100  | 4      | Result          |              |                      |                          |
| 101  | 4      | Spinner         |              | Loader, Spin         | github ldrs              |
| 102  | 4      | Statistic       |              |                      |                          |
| 103  | 4      | Tour            |              |                      |                          |
| 104  | 4      | Transfer        |              |                      |                          |
| 105  | 4      | TreeSelect      |              |                      |                          |
| 106  | 4      | Typography      |              |                      | shadcn-ui                |
| 107  | 4      | Upload          |              | FileUpload, Dropfile |                          |
| 108  | 4      | Watermark       |              |                      |                          |

### 工具函数

✅ 12 / 总计: 13

| 序号 | 优先级 | 名称                | 状态         | 📝 备注        |
| ---- | ------ | ------------------- | ------------ | -------------- |
| 1    | 1      | Popper              | ✅ Completed |                |
| 2    | 1      | Portal              | ✅ Completed | alias Teleport |
| 3    | 1      | Primitive           | ✅ Completed |                |
| 4    | 1      | RovingFocus         | ✅ Completed |                |
| 5    | 1      | Slot                | ✅ Completed |                |
| 6    | 1      | useCollection       | ✅ Completed |                |
| 7    | 1      | useDismissableLayer | ✅ Completed |                |
| 8    | 1      | useFocusGuards      | ✅ Completed |                |
| 9    | 1      | useFocusScope       | ✅ Completed |                |
| 10   | 1      | usePresence         | ✅ Completed |                |
| 11   | 1      | useDialog           | ✅ Completed |                |
| 12   | 1      | useToast            | ✅ Completed |                |
| 13   | 2      | useLoadingBar       |              |                |
