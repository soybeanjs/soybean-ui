# 全局配置

## 概述

`SConfigProvider` 组件是 SoybeanUI 库的根配置提供者。它管理全局主题、本地化、图标设置以及其他上下文感知功能。它应包裹整个应用程序或需要隔离配置的特定部分。

## 功能

- 🎨 **主题系统**：通过 `theme` 属性配置全局颜色和圆角。
- 📏 **尺寸控制**：管理全局组件尺寸（`xs`、`sm`、`md`、`lg`、`xl`、`2xl`）。
- 🖼️ **图标配置**：为所有 `SIcon` 组件设置默认宽高。
- ⏳ **顶部加载条集成**：配置全局顶部加载条。
- 🍞 **通知集成**：配置全局通知设置。
- 🌐 **方向**：支持 LTR/RTL 布局。
- 🌍 **国际化**：通过 `locale` 和 `messages` 属性驱动组件内置文案。

## 基本用法

将应用程序根组件包裹在 `SConfigProvider` 中。

```vue
<script setup lang="ts">
import { SConfigProvider } from '@soybeanjs/ui';
</script>

<template>
  <SConfigProvider
    size="md"
    :theme="{
      base: 'gray',
      primary: 'violet',
      feedback: 'modern',
      radius: '0.625rem'
    }"
  >
    <App />
  </SConfigProvider>
</template>
```

## 高级主题配置

你可以使用 `theme` 属性完全自定义主题。更多细节请参见[主题文档](/overview/theming)。

## 方向 / RTL

使用 `dir` 属性即可在已支持组件间切换从左到右和从右到左布局。

```vue
<template>
  <SConfigProvider dir="rtl">
    <App />
  </SConfigProvider>
</template>
```

如果你希望在某个子树内强制使用从左到右布局，也可以显式传入 `dir="ltr"`。

## 国际化 / Locale

SoybeanUI 内置了英文（`en`）和简体中文（`zh-CN`）两套组件文案，用于驱动无障碍标签、空状态文案等内置文字。

### 切换内置 locale

默认仅打包 `en`。使用其他语言包时，从对应子路径导入并在应用启动时调用 `registerLocale` 完成注册：

```ts
// main.ts（mount 之前）
import { registerLocale } from '@soybeanjs/headless/locale';
import { zhCN } from '@soybeanjs/headless/locale/zh-CN';

registerLocale('zh-CN', zhCN);
```

然后在 `SConfigProvider` 上传入 locale 代码：

```vue
<SConfigProvider locale="zh-CN">
  <!-- 首批支持的组件将自动显示中文文案 -->
</SConfigProvider>
```

每个 locale 文件独立存放于 `@soybeanjs/headless/locale/{code}` 子路径，支持 tree-shake — 未使用的语言包不会打进产物。

### 覆盖部分文案

使用 `messages` prop 仅替换需要修改的键，其余键继续使用所选 locale 的内置文案。

```vue
<script setup lang="ts">
import type { LocaleMessagesOverrides } from '@soybeanjs/headless';

const messages: LocaleMessagesOverrides = {
  table: {
    emptyTitle: '暂时没有内容',
    emptyDescription: '请添加第一条数据开始使用。'
  }
};
</script>

<template>
  <SConfigProvider locale="zh-CN" :messages="messages">
    <!-- 表格空状态将显示自定义文案 -->
  </SConfigProvider>
</template>
```

### 使用完全自定义的 locale

以 `en` 为基础展开并覆盖所需键，然后注册为自定义名称：

```ts
import { registerLocale, en } from '@soybeanjs/headless/locale';
import type { LocaleMessages } from '@soybeanjs/headless/locale';

const myLocale: LocaleMessages = {
  ...en,
  pagination: {
    ...en.pagination,
    nextPage: '下一页 →',
    prevPage: '← 上一页'
  }
};

registerLocale('custom', myLocale);
```

再将 `locale="custom"` 传给 `SConfigProvider`。

### Locale key 说明

#### `pagination`

| Key         | 默认值（en）    | 说明                                 |
| ----------- | --------------- | ------------------------------------ |
| `firstPage` | `First page`    | 首页按钮的无障碍标签和默认插槽文字   |
| `prevPage`  | `Previous page` | 上一页按钮的无障碍标签和默认插槽文字 |
| `nextPage`  | `Next page`     | 下一页按钮的无障碍标签和默认插槽文字 |
| `lastPage`  | `Last page`     | 末页按钮的无障碍标签和默认插槽文字   |

#### `table`

| Key                | 默认值（en）                             | 占位符     | 说明                       |
| ------------------ | ---------------------------------------- | ---------- | -------------------------- |
| `emptyTitle`       | `No data`                                | —          | 默认空状态的标题           |
| `emptyDescription` | `There is no data to display.`           | —          | 默认空状态的描述           |
| `selectAllRows`    | `Select all rows`                        | —          | 表头全选复选框的无障碍标签 |
| `sortByColumn`     | `Sort by {column}`                       | `{column}` | 无排序时排序按钮的标签     |
| `sortByColumnAsc`  | `Sort by {column}, currently ascending`  | `{column}` | 升序时排序按钮的标签       |
| `sortByColumnDesc` | `Sort by {column}, currently descending` | `{column}` | 降序时排序按钮的标签       |
| `resizeColumn`     | `Resize {column} column`                 | `{column}` | 列宽调整手柄的无障碍标签   |
| `expandRow`        | `Expand row {row}`                       | `{row}`    | 展开行的无障碍标签         |
| `collapseRow`      | `Collapse row {row}`                     | `{row}`    | 收起行的无障碍标签         |
| `selectRow`        | `Select row {row}`                       | `{row}`    | 行选择复选框的无障碍标签   |

### Fallback 规则

1. 优先使用 `messages` prop 中提供的键值。
2. 如果该键未提供，则使用 `locale` 对应的内置文案。
3. 如果 `locale` 未知或未设置，最终回退到 `en`。

### 首批支持组件

本次发布中，以下组件已接入 `ConfigProvider.locale` 和 `ConfigProvider.messages`：

- **Pagination** — 导航按钮标签
- **Table** — 空状态、排序 / 列宽 / 展开 / 选择无障碍标签

后续版本将按相同模式持续扩展支持的组件范围。

## API

<ComponentApi component="config-provider" />
