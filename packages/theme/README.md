# @soybeanjs/theme

Soybean UI 的轻量主题引擎：**最小核心 token → 确定性派生 → 确定性 CSS 生成 → 运行时注入 / SSR 同步**。

它不依赖运行时魔法，也不做副作用的 DOM 操作。输入一组 `ThemeOptions`，输出一段可直接注入的 CSS 字符串，并附带一套可选的持久化 / SSR 工具，供 `@soybeanjs/ui` 的 `SConfigProvider` 在运行时注入主题。

## 特性

- **最小核心 token**：只需 `base`（中性色）+ `primary`（主色）两个 Seed，即可派生出完整色板。
- **确定性派生**：亮色 / 暗色模式、`lightLevel` / `darkLevel` 偏移、`menuColor` / `menuAccent` 均由同一套纯函数生成，结果可复现、可快照测试。
- **多种输出格式**：`hsl` 与 `oklch`，适配不同设计体系。
- **自定义 preset**：既支持内联写入自定义颜色，也支持 `{ name }` 引用持久化表。
- **SSR 友好**：`/ssr` 子路径提供 cookie 解析、`createThemeInitScript`、`createThemeStore`，保证服务端与客户端首帧一致、无闪烁（FOUC）。
- **零 UI 依赖**：纯逻辑 + 单依赖 `@soybeanjs/colord`，可独立使用。

## 安装

```bash
pnpm add @soybeanjs/theme
```

## 快速开始

最直接的使用方式：调用 `createTheme` 生成 CSS 并注入。

```ts
import { createTheme } from '@soybeanjs/theme';

const css = createTheme({
  base: 'zinc',
  primary: 'indigo',
  radius: 'md',
  size: 'md',
  darkSelector: 'class',
  styleTarget: ':root',
  format: 'hsl'
});

// → 返回一段 CSS 字符串，注入到 <style> 即可生效
document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
```

###### 在 `@soybeanjs/ui` 中使用

大多数场景下你不需要手动调用 `createTheme`。`SConfigProvider` 已内置主题注入，只要你传入 `theme` 配置即可：

```vue
<script setup lang="ts">
import { SConfigProvider } from '@soybeanjs/ui';
</script>

<template>
  <SConfigProvider
    :theme="{
      base: 'zinc',
      primary: 'indigo',
      radius: 'md',
      size: 'md'
    }"
  >
    <slot />
  </SConfigProvider>
</template>
```

## 核心概念

### Seed 派生

引擎从两个 Seed 出发，派生出完整色板：

- `base`：中性色（`zinc` / `neutral` / `stone` …），决定背景、前景、边框、input 等。
- `primary`：品牌主色（`indigo` / `blue` / `emerald` …），决定 primary / ring / chart 等强调色。

### 亮暗偏移

- `lightLevel`（0–2）：亮色模式表面亮度偏移，数值越大表面越深。
- `darkLevel`（0–3）：暗色模式背景亮度偏移，数值越大背景越浅。

### 自定义 preset

两种方式：

```ts
// 1) 内联自定义颜色（直接覆盖）
createTheme({
  base: 'zinc',
  primary: 'indigo',
  preset: {
    light: { primary: 'blue.600', ring: 'blue.500' },
    dark: { primary: 'blue.400', ring: 'blue.300' }
  }
});

// 2) 引用持久化 preset（需配合 ConfigProvider 的 persistTheme）
//    引擎内部只消费内联值；{ name } 由 ConfigProvider 解析后再传入。
createTheme({
  base: 'zinc',
  primary: 'indigo',
  preset: { name: 'my-brand' }
});
```

## API 参考

### 主入口 `@soybeanjs/theme`

| 导出                                                 | 说明                                            |
| ---------------------------------------------------- | ----------------------------------------------- |
| `createTheme`                                        | 根据 `ThemeOptions` 生成 CSS 字符串（核心函数） |
| `DEFAULT_PRESET_OPTIONS`                             | 默认主题选项（zinc / indigo / md / md）         |
| `THEME_SIZE` / `themeSizeKeys`                       | 尺寸枚举与合法键列表（xs…2xl）                  |
| `THEME_RADIUS` / `themeRadiusKeys`                   | 圆角枚举与合法键列表（2xs…2xl）                 |
| `builtinBasePresetKeys` / `builtinPrimaryPresetKeys` | 内置 base / primary 色板键列表                  |

类型：`ThemeOptions`、`ThemeConfigState`、`ThemeColor`、`ThemeSize`、`ThemeRadius`、`MenuColor`、`MenuAccent`、`CustomThemeColorPreset`、`StoredThemePreset`、`ThemePresetInput` … 等。

### 子路径 `@soybeanjs/theme/storage`

本地存储持久化（localStorage，SSR-safe）。

| 导出                                                                        | 说明                                          |
| --------------------------------------------------------------------------- | --------------------------------------------- |
| `THEME_STORAGE_KEY`                                                         | 默认主题 localStorage 键（`__SOYBEAN_THEME`） |
| `stringifyThemeConfig` / `parseThemeConfig`                                 | 主题配置序列化 / 反序列化（带校验）           |
| `getStoredThemeConfig` / `setStoredThemeConfig` / `removeStoredThemeConfig` | 主题配置读写                                  |
| `THEME_PRESETS_STORAGE_KEY`                                                 | 自定义 preset 表 localStorage 键              |
| `getStoredThemePresets`                                                     | 读取 preset 表                                |
| `setStoredThemePreset` / `removeStoredThemePreset`                          | 增删单个 preset                               |

### 子路径 `@soybeanjs/theme/ssr`

SSR/SSG 兼容工具。

| 导出                    | 说明                                         |
| ----------------------- | -------------------------------------------- |
| `isServerRuntime`       | 运行时检测服务端（`window`/`document` 缺失） |
| `createThemeInitScript` | 生成首帧前内联脚本，避免主题闪烁（FOUC）     |

## SSR 指南

### 1. 客户端首帧前避免闪烁

主题只持久化在 **localStorage**（不下发 cookie）。服务端首帧渲染默认主题，随后由内联脚本在浏览器首帧前读取 localStorage 并应用，因此无主题闪烁：

```html
<script>
  // 由 createThemeInitScript() 生成，放在 <head> 最前
  // 读取 localStorage 中持久化的主题，把 .dark 类与 data-theme 应用到 <html>
</script>
```

### 2. 推荐：直接交给 `SConfigProvider`

上述逻辑在 `@soybeanjs/ui` 的 `SConfigProvider` 中已全部封装。应用只需传入环境标志：

```vue
<template>
  <SConfigProvider :is-server="import.meta.server" persist-theme>
    <slot />
  </SConfigProvider>
</template>
```

设置持久化、CSS 注入、暗色 class 切换均由内部完成；如需首帧应用持久化主题，可在 `<head>` 内联 `createThemeInitScript()`。

## 与 `@soybeanjs/ui` 集成

- 运行时主题注入入口：`SConfigProvider`（唯一入口，不额外提供独立 `ThemeProvider`）。
- 持久化：设置 `persist-theme` 后，主题状态写入 localStorage；`{ name }` 引用解析依赖 `persistTheme`。
- 主题 UI 消费：在 `SConfigProvider` 后代中使用 `useTheme`（来自 `@soybeanjs/ui`）读取/修改 `base` / `primary` / `radius` / `size` / `mode` 与 preset，无需 prop drilling。

## 目录结构

```
packages/theme/src/
  index.ts        # 主入口：createTheme + 枚举 + 类型
  core.ts         # createTheme：合并默认值 → 派生 → 生成 CSS
  defaults.ts     # DEFAULT_PRESET_OPTIONS
  preset.ts       # 色板派生（base / primary / feedback / sidebar）
  derive.ts       # 色值派生工具
  css.ts          # CSS 生成（base + color + 调色板）
  tokens.ts       # 尺寸 / 圆角枚举
  variables.ts    # CSS 变量集合
  types.ts        # 全部公开类型
  storage.ts      # /storage：localStorage 持久化
  ssr.ts          # /ssr：服务端工具 + 首帧内联脚本
  shared.ts       # 内部工具（merge / darkSelector）
```

## 测试

```bash
pnpm --filter @soybeanjs/theme test
```

覆盖核心派生确定性、级别偏移、SSR 解析、存储读写等，含快照测试。

## License

[MIT](https://github.com/soybeanjs/soybean-ui/blob/main/LICENSE)
