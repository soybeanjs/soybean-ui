<p align="center">
  <a href="https://github.com/soybeanjs/soybean-ui">
    <img src="./public/logo.svg" alt="Logo" width="150" />
  </a>
</p>

# SoybeanUI

English | [中文](./README.zh-CN.md)

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![github stars](https://img.shields.io/github/stars/soybeanjs/soybean-ui)](https://github.com/soybeanjs/soybean-ui)

SoybeanUI is an elegant, modern, accessible and high-quality UI component library with shadcn-like design for Vue 3, built on top of a robust headless foundation. It provides a comprehensive set of accessible, customizable, and performant components.

## 📚 Architecture

SoybeanUI consists of two main packages:

- **@soybeanjs/headless**: The logic layer. It handles state management, accessibility (A11y), keyboard interactions, and focus management. It is completely unstyled, giving you maximum control if you want to build your own design system.
- **@soybeanjs/ui**: The presentation layer. It wraps the headless components with beautiful, customizable styles using UnoCSS (via `tailwind-variants`). It is ready to use out of the box.

## 📦 Installation

### Using the Styled UI Library (Recommended)

If you want ready-to-use components with a modern design:

```bash
pnpm add @soybeanjs/ui
```

### Using the Headless Library

If you want to build your own design system from scratch:

```bash
pnpm add @soybeanjs/headless
```

## 🚀 Usage

### @soybeanjs/ui

1. **Import Styles**

   Import the CSS file in your main entry file (e.g., `main.ts`):

```ts
import '@soybeanjs/ui/styles.css';
```

2. **Global Registration (Optional)**

   You can register components globally or import them on demand.

3. **On-demand Import (Recommended)**

   We recommend using `unplugin-vue-components` for auto-importing components.

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

4. **Nuxt Module**

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@soybeanjs/ui/nuxt']
});
```

### @soybeanjs/headless

The headless components provide the functionality without the styles.

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

## ✨ Features

- **Accessible**: Follows WAI-ARIA patterns for accessibility.
- **Headless**: Logic and styles are separated.
- **Type Safe**: Written in TypeScript with full type support.
- **Customizable**: Built with UnoCSS and `tailwind-variants` for easy theming.
- **Lightweight**: Tree-shakable components.

## 💝 Credits

- [reka-ui](https://github.com/unovue/reka-ui)
- [oku-ui](https://github.com/oku-ui/primitives)
- [shadcn-vue](https://github.com/unovue/shadcn-vue)
- [shadcn/ui](https://github.com/shadcn/ui)
- [nuxt-ui](https://github.com/nuxt/ui)
- [unocss](https://github.com/unocss/unocss)

## 🗺️ Roadmap

### Components

✅: Completed ✨: Implemented

✅ 48 / total: 108

| No  | Priority | Name            | Status       | Alias                    | 📝 Note                  |
| --- | -------- | --------------- | ------------ | ------------------------ | ------------------------ |
| 1   | 1        | Accordion       | ✅ Completed |                          |                          |
| 2   | 1        | Alert           | ✅ Completed |                          |                          |
| 3   | 1        | AlertDialog     | ✅ Completed |                          |                          |
| 4   | 1        | Arrow           | ✅ Completed |                          |                          |
| 5   | 1        | AspectRatio     | ✅ Completed |                          |                          |
| 6   | 1        | Avatar          | ✅ Completed |                          |                          |
| 7   | 1        | Badge           | ✅ Completed | Chip                     |                          |
| 8   | 1        | Breadcrumb      | ✅ Completed |                          |                          |
| 9   | 1        | Button          | ✅ Completed |                          | ✨ support loading       |
| 10  | 1        | Card            | ✅ Completed |                          |                          |
| 11  | 1        | Checkbox        | ✅ Completed |                          | ✨ support checkbox card |
| 12  | 1        | Collapsible     | ✅ Completed |                          |                          |
| 13  | 1        | Command         | ✅ Completed |                          |                          |
| 14  | 1        | ConfigProvider  | ✅ Completed |                          |                          |
| 15  | 1        | ContextMenu     | ✅ Completed |                          |                          |
| 16  | 1        | Dialog          | ✅ Completed |                          |                          |
| 17  | 1        | Drawer          | ✅ Completed | Sheet                    |                          |
| 18  | 1        | DropdownMenu    | ✅ Completed |                          | ✨ support hover trigger |
| 19  | 1        | Form            | ✅ Completed |                          |                          |
| 20  | 1        | Icon            | ✅ Completed |                          | ✨ based on iconify      |
| 21  | 1        | Input           | ✅ Completed |                          |                          |
| 22  | 1        | InputNumber     | ✅ Completed | NumberField, NumberInput |                          |
| 23  | 1        | Kbd             | ✅ Completed |                          |                          |
| 24  | 1        | Label           | ✅ Completed |                          |                          |
| 25  | 1        | Layout          | ✅ Completed |                          |                          |
| 26  | 1        | Link            | ✅ Completed |                          |                          |
| 27  | 1        | List            | ✅ Completed |                          |                          |
| 28  | 1        | Listbox         | ✅ Completed |                          |                          |
| 29  | 1        | Menu            | ✅ Completed |                          |                          |
| 30  | 1        | NavigationMenu  | ✅ Completed |                          |                          |
| 31  | 1        | Pagination      | ✅ Completed |                          |                          |
| 32  | 1        | Password        | ✅ Completed |                          |                          |
| 33  | 1        | Popover         | ✅ Completed |                          |                          |
| 34  | 1        | RadioGroup      | ✅ Completed |                          | ✨ support radio card    |
| 35  | 1        | Segment         | ✅ Completed |                          |                          |
| 36  | 1        | Select          | ✅ Completed |                          |                          |
| 37  | 1        | Separator       | ✅ Completed | Divider                  |                          |
| 38  | 1        | Switch          | ✅ Completed |                          | ✨ support switch card   |
| 39  | 1        | Tabs            | ✅ Completed |                          |                          |
| 40  | 1        | Tag             | ✅ Completed | Badge(shadcn-ui)         |                          |
| 41  | 1        | Textarea        | ✅ Completed |                          | ✨ support auto size     |
| 42  | 1        | Toast           | ✅ Completed | Sonner                   | migrate from vue-sonner  |
| 43  | 1        | Tooltip         | ✅ Completed |                          |                          |
| 44  | 1        | Tree            | ✅ Completed |                          | ✨ support virtualized   |
| 45  | 1        | TreeMenu        | ✅ Completed |                          |                          |
| 46  | 1        | Virtualizer     | ✅ Completed |                          |                          |
| 47  | 1        | VisuallyHidden  | ✅ Completed |                          |                          |
| 48  | 2        | PageTabs        | ✅ Completed |                          |                          |
| 49  | 2        | ColorPicker     |              |                          |                          |
| 50  | 2        | Combobox        |              |                          | support virtualized      |
| 51  | 2        | DataTable       |              |                          | support virtualized      |
| 52  | 2        | Menubar         |              |                          |                          |
| 53  | 2        | PinInput        |              | InputOPT, OPTInput       |                          |
| 54  | 2        | Popconfirm      |              |                          |                          |
| 55  | 2        | Progress        |              |                          | include circle           |
| 56  | 2        | ScrollArea      |              |                          |                          |
| 57  | 2        | Skeleton        |              |                          |                          |
| 58  | 2        | Slider          |              |                          |                          |
| 59  | 2        | Table           |              |                          |                          |
| 60  | 2        | Toggle          |              |                          |                          |
| 61  | 2        | ToggleGroup     |              |                          |                          |
| 62  | 3        | BottomSheet     |              | Drawer(shadcn-ui)        |                          |
| 63  | 3        | Calendar        |              |                          | v-calendar               |
| 64  | 3        | Carousel        |              |                          |                          |
| 65  | 3        | DateField       |              |                          |                          |
| 66  | 3        | DatePicker      |              |                          |                          |
| 67  | 3        | DateRangeField  |              |                          |                          |
| 68  | 3        | DateRangePicker |              |                          |                          |
| 69  | 3        | Editable        |              |                          |                          |
| 70  | 3        | HoverCard       |              |                          |                          |
| 71  | 3        | RangeCalendar   |              |                          | v-calendar               |
| 72  | 3        | Resizable       |              |                          |                          |
| 73  | 3        | Splitter        |              |                          |                          |
| 74  | 3        | Stepper         |              |                          |                          |
| 75  | 3        | TagsInput       |              |                          |                          |
| 76  | 3        | TimeField       |              |                          |                          |
| 77  | 3        | Timeline        |              |                          | ui things                |
| 78  | 3        | TimePicker      |              |                          | element-plus             |
| 79  | 3        | Toolbar         |              |                          |                          |
| 80  | 4        | Affix           |              |                          |                          |
| 81  | 4        | Anchor          |              |                          |                          |
| 82  | 4        | AutoComplete    |              |                          | support virtualized      |
| 83  | 4        | Backtop         |              |                          |                          |
| 84  | 4        | Cascader        |              |                          | support virtualized      |
| 85  | 4        | Clipboard       |              |                          |                          |
| 86  | 4        | Code            |              |                          |                          |
| 87  | 4        | Comment         |              |                          |                          |
| 88  | 4        | Countdown       |              |                          |                          |
| 89  | 4        | CurrencyInput   |              |                          |                          |
| 90  | 4        | Descriptions    |              |                          |                          |
| 91  | 4        | Ellipsis        |              |                          |                          |
| 92  | 4        | Empty           |              |                          |                          |
| 93  | 4        | Equation        |              |                          | based on katex           |
| 94  | 4        | InfiniteScroll  |              |                          |                          |
| 95  | 4        | Mention         |              |                          | element-plus             |
| 96  | 4        | Navbar          |              |                          |                          |
| 97  | 4        | NumberAnimation |              |                          | naive-ui                 |
| 98  | 4        | QRCode          |              |                          |                          |
| 99  | 4        | Rating          |              | Rate                     | element-plus             |
| 100 | 4        | Result          |              |                          |                          |
| 101 | 4        | Spinner         |              | Loader, Spin             | github ldrs              |
| 102 | 4        | Statistic       |              |                          |                          |
| 103 | 4        | Tour            |              |                          |                          |
| 104 | 4        | Transfer        |              |                          |                          |
| 105 | 4        | TreeSelect      |              |                          |                          |
| 106 | 4        | Typography      |              |                          | shadcn-ui                |
| 107 | 4        | Upload          |              | FileUpload, Dropfile     |                          |
| 108 | 4        | Watermark       |              |                          |                          |

### Utilities

✅ 12 / total: 13

| No. | Priority | Name                | Status       | 📝 Note        |
| --- | -------- | ------------------- | ------------ | -------------- |
| 1   | 1        | Popper              | ✅ Completed |                |
| 2   | 1        | Portal              | ✅ Completed | alias Teleport |
| 3   | 1        | Primitive           | ✅ Completed |                |
| 4   | 1        | RovingFocus         | ✅ Completed |                |
| 5   | 1        | Slot                | ✅ Completed |                |
| 6   | 1        | useCollection       | ✅ Completed |                |
| 7   | 1        | useDismissableLayer | ✅ Completed |                |
| 8   | 1        | useFocusGuards      | ✅ Completed |                |
| 9   | 1        | useFocusScope       | ✅ Completed |                |
| 10  | 1        | usePresence         | ✅ Completed |                |
| 11  | 1        | useDialog           | ✅ Completed |                |
| 12  | 1        | useToast            | ✅ Completed |                |
| 13  | 2        | useLoadingBar       |              |                |
