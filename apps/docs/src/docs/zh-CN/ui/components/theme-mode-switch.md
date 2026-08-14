# 主题模式开关

## 概述

`SThemeModeSwitch` 是一个绑定到当前 `SConfigProvider` 主题的上下文开关。它反映当前*生效*的色彩方案（因此 `auto` 偏好会呈现为系统解析后的明暗状态），并在切换时锁定为显式的 `light` / `dark`。适合作为头部或工具栏中的快捷明暗切换。

## 用法

<UsageCode component="theme-mode-switch" />

## 特性

- 🌓 反映*生效*方案 —— 使用 `auto` 时拇指跟随系统 `prefers-color-scheme`
- 🎚 切换时锁定显式偏好，覆盖任何 `auto` 解析
- 🎨 继承主题的 `size` 与 `color`，默认带太阳/月亮图标
- ♿ 将无障碍标签转发到 `role="switch"` 控件（axe 零违规）
- 🧩 `showIcon` 控制太阳/月亮图形是否显示

## 演示

<PlaygroundGallery component="theme-mode-switch" />

## API

<ComponentApi component="theme-mode-switch" />

## 注意事项

### 适用范围

`SThemeModeSwitch` 属于主题层组件，直接操作父级 `SConfigProvider` 的主题上下文。它不接受 `modelValue`；状态由 provider 持有并在所有主题组件间共享。要选择 `auto`（二元开关无法表达），请配合 `SThemeModeSelect` 使用。

### 提醒

- 组件必须渲染在提供主题上下文的 `SConfigProvider` 内部，否则 `useTheme` 会抛出异常。
- 当开关当前跟随 `auto` 时，切换会锁定为显式的 `light` / `dark`；如需回到 `auto` 请使用 `SThemeModeSelect`。
