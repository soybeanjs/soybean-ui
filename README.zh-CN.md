<p align="center">
  <a href="https://github.com/soybeanjs/soybean-ui">
    <img src="./public/logo.svg" alt="Logo" width="150" />
  </a>
</p>

# SoybeanUI

[English](./README.md) | 中文

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)
[![npm version](https://img.shields.io/npm/v/@soybeanjs/ui)](https://www.npmjs.com/package/@soybeanjs/ui)
[![npm downloads](https://img.shields.io/npm/dt/@soybeanjs/ui)](https://www.npmjs.com/package/@soybeanjs/ui)
[![github stars](https://img.shields.io/github/stars/soybeanjs/soybean-ui)](https://github.com/soybeanjs/soybean-ui)

SoybeanUI 是一个优雅、现代、可访问且高质量的 UI 组件库，具有 shadcn-like 设计，适用于 Vue 3，构建在强大的 Headless 基础之上。它提供了一套全面、可访问、可定制且高性能的组件。

## 📚 架构

SoybeanUI 采用严格的**双层分离**设计：

```
┌─────────────────────────────────────────┐
│           @soybeanjs/ui (packages/ui/)  │
│  S 前缀组件   (SButton、SDialog…)        │
│  UnoCSS 类名 · @soybeanjs/cva            │
│  provideXUi(ui)  ──────────────────┐    │
└────────────────────────────────────┼────┘
                                     │ 样式注入
┌────────────────────────────────────▼────┐
│  @soybeanjs/headless (packages/headless/) │
│  逻辑 · 状态 · A11y · 键盘导航             │
│  useUiContext() 读取注入的样式类名      │
│  零样式 — 可配合任意 CSS 方案         │
└─────────────────────────────────────────┘
```

### 包结构

| 包                      | 职责                                         | 组件数量                        |
| ----------------------- | -------------------------------------------- | ------------------------------- |
| **@soybeanjs/headless** | 逻辑、状态、a11y，零样式                     | 95 个组件目录，25 个 composable |
| **@soybeanjs/ui**       | 样式包装层。UnoCSS + `@soybeanjs/cva` recipe | 91 个带 `S` 前缀的组件          |

**数据流严格单向**：`headless` → `src`。样式层不会导入 headless 的内部实现，而是通过 `provideXUi(computedUi)` 注入样式 token，headless 组件再通过 `useUiContext()` 读取。

部分多插槽 headless 组件还会暴露 `Compact` 聚合层，例如 `AccordionCompact` 和 `TableCompact`。它们把条目遍历以及默认内容 / 图标组合放在 headless 层完成，而 UI 层只负责样式和 props 转发。

目前采用这类 Compact 约定式组合的能力还覆盖了 card、date-field、dialog、editable、hover-card、layout、navigation-menu、pagination、popover、stepper 等稳定结构场景。

### 样式注入机制

每个多插槽的 headless 组件都有对应的 `provide{Name}Ui` 函数。样式层通过 `@soybeanjs/cva` 的 recipe 计算类名后注入：

```ts
// 样式包装层 (packages/ui/) 中
const ui = computed(() => accordionVariants({ size: props.size }, props.ui, { root: props.class }));
provideAccordionUi(ui); // headless 通过 useAccordionUi() 读取
```

### 主题系统

- **`ThemeColor`** — 8 种语义色：`primary` · `destructive` · `success` · `warning` · `info` · `carbon` · `secondary` · `accent`
- **`ThemeSize`** — 6 种尺寸：`xs` · `sm` · `md` · `lg` · `xl` · `2xl`（基准尺寸 `md` = 16px）
- **`ConfigProvider`** — 全局设置 `dir`、`locale`、`nonce` 及默认 `tooltip` 配置，应用于整个组件树，并支持 RTL 布局切换

### 语言支持

`ConfigProvider` 当前支持以下 locale 文案包：

| 代码    | 语言         |
| ------- | ------------ |
| `zh-CN` | 简体中文     |
| `zh-TW` | 繁體中文     |
| `en`    | 英语         |
| `ar`    | 阿拉伯语     |
| `ja`    | 日语         |
| `ko`    | 韩语         |
| `de`    | 德语         |
| `fr`    | 法语         |
| `es`    | 西班牙语     |
| `pt-BR` | 巴西葡萄牙语 |
| `ru`    | 俄语         |
| `tr`    | 土耳其语     |
| `id`    | 印度尼西亚语 |

默认只有 `en` 和 `zh-CN` 会被预注册。`registerLocale` 支持两种注册方式：

- 直接传入 `LocaleRegistry` 对象。`@soybeanjs/headless/locale/{code}` 导出的内置语言文件已经是这种结构，并且自带 `dir` 元数据。
- 传入 locale key 和 `LocaleMessages`，用于快速注册一个轻量自定义语言。

简写形式 `registerLocale(key, messages)` 会将 key 作为语言名，并在未显式提供方向时回退到 `ltr`。如果你需要像 `ar` 这样的 `rtl` 元数据，请优先使用对象形式。

```ts
import { en, registerLocale } from '@soybeanjs/headless/locale';
import type { LocaleMessages } from '@soybeanjs/headless/locale';
import ar from '@soybeanjs/headless/locale/ar';

registerLocale(ar);

const customMessages: LocaleMessages = {
  ...en.messages,
  pagination: {
    ...en.messages.pagination,
    nextPage: '下一页 →',
    prevPage: '← 上一页'
  }
};

registerLocale('custom', customMessages);
```

### 包导出

**@soybeanjs/headless** 提供精细化子路径导出：

```ts
import { AccordionRoot } from '@soybeanjs/headless'; // 所有组件
import { useControllableState } from '@soybeanjs/headless/composables'; // 25 个 composable
import { transformPropsToContext } from '@soybeanjs/headless/shared'; // 纯 TS 工具
import { createMonth } from '@soybeanjs/headless/date'; // 日期工具
import * as Headless from '@soybeanjs/headless/namespaced'; // 命名空间导入
import type { AccordionUiSlot } from '@soybeanjs/headless/accordion'; // 单组件类型
import type { UiClass } from '@soybeanjs/headless/types'; // 共享类型导出
```

**@soybeanjs/ui** 导出：

```ts
import { SButton, SAccordion } from '@soybeanjs/ui'; // 所有组件
import '@soybeanjs/ui/styles.css'; // 预构建的 UnoCSS 样式表
// 同时提供：@soybeanjs/ui/nuxt · @soybeanjs/ui/resolver
```

## 🛠 开发工作流

如果您在仓库内新增公共组件、调整导出入口或修改 API 描述，请通过官方脚本同步生成产物，而不是手动编辑生成文件。

```bash
pnpm sui headless                 # 同步 headless 组件名称与命名空间导出
pnpm sui ui                       # 同步 ui 组件名称
pnpm sui api                      # 重新生成 docs api json 与 locale 英文基线数据
pnpm sui api-locales              # 仅刷新 api locale 模板数据
pnpm sui changelog                # 重新生成 docs changelog json 与 locale 英文基线数据
pnpm sui api-translate -- --locale zh-CN
pnpm sui changelog-translate -- --locale zh-CN
```

当前文档站默认通过 `UsageCode`、`PlaygroundGallery` 与 `ComponentApi` 渲染组件文档；组件详情页与 `/releases` 还会消费 `apps/docs/src/generated/changelog/` 和 `apps/docs/src/generated/changelog-locales/` 下的版本日志生成数据。

因此，一旦公共 API 或示例交付面变化，也要同步维护 docs、playground 示例和 API 生成数据；如果调整了 changelog 映射、发布页展示或 changelog locale 模板，也要同步更新 changelog 生成数据。

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

对于数据驱动的多插槽场景，如果组件提供了 `Compact` 版本，优先使用它。它是 headless 层的约定式组合入口，而基础分片仍然保留给需要完全手动拼装的场景。

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

- **可访问性**：遵循 WAI-ARIA 模式，内置角色、焦点管理与键盘导航。
- **RTL 就绪**：通过 `ConfigProvider` 即可在已支持组件间切换 LTR / RTL 布局。
- **Headless 优先**：逻辑与样式完全分离—单独使用 `@soybeanjs/headless` 可构建任意设计系统。
- **类型安全**：严格 TypeScript 编写，所有 props、emits、slot 及 context 均有完整类型。
- **多级自定义**：通过 `ui` prop 覆盖单个橪位类名，也可替换整个样式层。
- **轻量可摇树**：每个组件独立 Tree-shakable，按需引入。
- **Nuxt 就绪**：提供官方 Nuxt 模块，支持组件自动注册（`@soybeanjs/ui/nuxt`）。
- **unplugin 支持**：提供 `unplugin-vue-components` 自动导入解析器（`@soybeanjs/ui/resolver`）。

## 💝 致谢

- [reka-ui](https://github.com/unovue/reka-ui)
- [oku-ui](https://github.com/oku-ui/primitives)
- [shadcn-vue](https://github.com/unovue/shadcn-vue)
- [shadcn/ui](https://github.com/shadcn/ui)
- [nuxt-ui](https://github.com/nuxt/ui)
- [unocss](https://github.com/unocss/unocss)
