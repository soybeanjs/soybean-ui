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

SoybeanUI 目前提供以下 13 套内置组件文案，用于驱动无障碍标签、空状态文案等内置文字。

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

默认只有 `en` 和 `zh-CN` 会被预注册。其余受支持的 locale 文件需要从 `@soybeanjs/headless/locale/{code}` 导入后手动注册。

当未显式传入 `dir` 时，`ConfigProvider` 会自动跟随 `locale` 对应的方向。例如 `locale="ar"` 会推导出 `dir="rtl"`，`locale="en"` 会推导出 `dir="ltr"`。如果你需要覆盖该规则，仍然可以显式传入 `dir`。

### 切换预注册 locale

直接把 locale 代码传给 `SConfigProvider` 即可：

```vue
<SConfigProvider locale="zh-CN">
  <!-- 内置组件文案将自动切换为简体中文 -->
</SConfigProvider>
```

### 加载其他受支持的 locale

`registerLocale` 支持两种形式：

- `registerLocale(localeRegistry)`：适合直接注册内置语言文件，或者需要显式提供 `name` 与 `dir` 元数据的自定义语言。
- `registerLocale(key, messages)`：适合只按消息表快速注册一个轻量自定义语言。

把语言文件按默认导入方式引入，在应用初始化时注册一次，然后再把同样的 locale 代码传给 `SConfigProvider`：

```ts
import { registerLocale } from '@soybeanjs/headless/locale';
import ar from '@soybeanjs/headless/locale/ar';

registerLocale(ar);
```

```vue
<SConfigProvider locale="ar">
  <!-- 组件文案将切换为阿拉伯语，dir 默认推导为 rtl -->
</SConfigProvider>
```

如果你想基于某个受支持的 locale 做扩展，也可以从 `@soybeanjs/headless/locale/{code}` 对应子路径导入语言文件作为基础。

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

以 `en` 这个基础注册表为起点，从 `en.messages` 展开并覆盖所需键，然后用简写形式注册为自定义名称：

```ts
import { registerLocale, en } from '@soybeanjs/headless/locale';
import type { LocaleMessages } from '@soybeanjs/headless/locale';

const myLocale: LocaleMessages = {
  ...en.messages,
  pagination: {
    ...en.messages.pagination,
    nextPage: '下一页 →',
    prevPage: '← 上一页'
  }
};

registerLocale('custom', myLocale);
```

再将 `locale="custom"` 传给 `SConfigProvider`。如果你还需要自定义显示名称或显式指定 `dir`，请改用完整的 `LocaleRegistry` 对象形式调用 `registerLocale(...)`。

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
