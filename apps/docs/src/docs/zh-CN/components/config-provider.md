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

## 注意事项

### 架构与对标差异

SoybeanUI 将 `ConfigProvider` 拆分为 headless 层（`@soybeanjs/headless/config-provider`，负责 locale、方向、tooltip 与文案上下文）与 styled 层（`@soybeanjs/ui`，负责主题 CSS 注入、图标渲染与 provider 组合：toast / dialog / progress）。这与 `shadcn/ui` 的 headless/styled 分离一致，区别于 Ant Design、Element Plus、MUI、Mantine、Naive UI 等单包 ConfigProvider。

| 维度          | SoybeanUI                                                                              | Ant Design / Element Plus / MUI / Mantine / Naive UI |
| :------------ | :------------------------------------------------------------------------------------- | :--------------------------------------------------- |
| 架构          | headless + styled 分离，双 `provide/inject` 上下文                                     | 单包，单一 ConfigProvider                            |
| 主题注入      | `createShadcnTheme().getCss()` 写入 `<style id="__SoybeanUI_theme">` 标签              | CSS 变量 / 主题对象 / `ConfigProvider.theme`         |
| 暗色模式      | `theme.darkSelector`（`'class'` → `.dark`、`'media'` → 系统、自定义）；切换 `.dark` 类 | `theme.dark`、`dark-mode` 类、`colorScheme`          |
| RTL           | `dir` prop + `useDirection`；按 `locale` 自动推导，并带 RTL 前缀兜底                   | `direction` prop、`dir` 属性、主题方向               |
| 国际化        | `locale` + `messages` 覆盖；`registerLocale` 注册其他 locale                           | `locale` prop / `LocalizationProvider`               |
| Provider 组合 | 默认插槽内自动渲染 `ToastProvider`、`DialogProvider`、`ProgressProvider`               | 由用户自行挂载独立 provider                          |

### 运行时注意事项

- **SSR**：主题 CSS 与 headless 工具样式通过 `useStyleTag` 注入到 `<head>`。在 `vite-ssg` 下会在 SSR 水合阶段执行；`<style>` 标签按 `id` 去重，客户端水合不会产生重复标签。`SIcon` 接收 `ssr: import.meta.env.SSR`，图标渲染对 SSR 安全。
- **样式标签生命周期**：`<style id="__SoybeanUI_theme">` 与 `<style id="__SoybeanHeadless_Styles">` 在页面生命周期内常驻 `<head>`。它们是响应式的——修改 `theme` prop 会原地更新 CSS 内容。卸载 provider 不会移除它们（全局设计如此）。
- **Locale 注册**：默认仅预注册 `en` 与 `zh-CN`。其他 locale（如 `ar`、`ja`、`fr`）需从 `@soybeanjs/headless/locale/{code}` 导入并在应用初始化时调用 `registerLocale(...)` 注册一次。方向（`dir`）即使未注册 locale 也会兜底到内置 RTL 前缀表（`ar`、`he`、`fa`、`ur` 等），因此 `locale="ar"` 开箱即得 `dir="rtl"`。
- **嵌套**：`SConfigProvider` 支持嵌套。内层 provider 会覆盖外层在其子树的上下文。headless 与 UI 是两套独立的 injection key，因此仅消费 headless 的组件（如 `useDirection`）读取 headless 上下文，而 UI 消费者（如 `SIcon` 的 iconify 默认值）读取 UI 上下文。

### 常见问题

**`SConfigProvider` 应放在哪里？**
在应用根节点包裹一次，通常放在 `App.vue` 或根布局中。它必须是所有依赖主题、locale、方向、toast、dialog、progress 上下文的组件的祖先。

**`dir` 与 `locale` 如何协同？**
显式传入 `dir` 时优先使用。未传入时，`ConfigProvider` 按 `locale` 推导方向：已注册的 locale 使用其声明的 `dir`；未注册的 locale 兜底到内置 RTL 前缀表（如 `ar` → `rtl`、`en` → `ltr`）。若 `locale` 也未知，最终回退到 `ltr`。

**如何添加未预注册的 locale？**
导入 locale 文件并注册一次：`registerLocale(ar)`（完整注册表形式）或 `registerLocale('custom', messages)`（简写形式）。再把 `locale="ar"`（或自定义 key）传给 `SConfigProvider`。详见上方「加载其他受支持的 locale」。

**暗色模式如何工作？**
`createShadcnTheme` 始终同时生成浅色与暗色两套 CSS 变量。`theme.darkSelector` 选项决定暗色变量的作用域：`'class'`（默认）将暗色变量置于 `.dark` 选择器下；`'media'` 将其置于 `@media (prefers-color-scheme: dark)` 下；任意自定义字符串会原样作为选择器。使用默认 `'class'` 时，在 `<html>`（或任意祖先节点）切换 `.dark` 类即可切换暗色模式；使用 `'media'` 时，主题会自动跟随系统偏好。

**可以嵌套 `SConfigProvider` 吗？**
可以。嵌套是受支持的——内层 provider 的上下文对其子树覆盖外层。适用于在 LTR 应用中嵌入 RTL 区块，或为微前端使用不同主题。

**如何自定义 toast 渲染？**
传入 `customToast` 以跳过默认 `ToastProvider`：`<SConfigProvider customToast>`。然后自行导入 `SToastProvider`（或 headless `ToastProvider`）渲染自定义 toast 内容。`toast()` 命令式 API 仍然可用，因为 headless toast 状态与渲染 UI 相互独立。
