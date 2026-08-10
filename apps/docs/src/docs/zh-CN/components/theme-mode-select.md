# 主题模式选择

## 概述

`SThemeModeSelect` 是一个绑定到当前 `SConfigProvider` 主题的上下文下拉选择。它提供 `ThemeModePreference` 的三种选项 —— `auto`（跟随系统 `prefers-color-scheme`）、`light` 与 `dark` —— 每项均带方案图标，让用户直接选择色彩方案偏好。

## 用法

<UsageCode component="theme-mode-select" />

## 特性

- 🌓 三种选项 —— `auto` / `light` / `dark`，与主题 `mode` 类型一致
- 🎚 选择通过共享的主题上下文写入偏好
- 🎨 继承主题的 `size`，默认给每个选项带方案图标
- 🧩 `showIcon` 控制触发器与选项中显示器 / 太阳 / 月亮图标是否显示

## 演示

<PlaygroundGallery component="theme-mode-select" />

## API

<ComponentApi component="theme-mode-select" />

## 注意事项

### 适用范围

与 `SThemeModeSwitch` 类似，`SThemeModeSelect` 属于主题层组件，直接操作父级 `SConfigProvider` 的主题上下文。它不接受 `modelValue`；偏好由 provider 持有并在所有主题组件间共享。

### 提醒

- 组件必须渲染在提供主题上下文的 `SConfigProvider` 内部，否则 `useTheme` 会抛出异常。
- `auto` 是一种*偏好* —— 实际解析后的方案（`light` / `dark`）仍取决于系统 `prefers-color-scheme`，并通过主题上下文的 `effectiveMode` 暴露。
