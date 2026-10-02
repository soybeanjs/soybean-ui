---
head:
  title: 主题模式分段控制
  description: SThemeModeSegment 是一个绑定到当前 SConfigProvider 主题的上下文分段控制。它将 ThemeModePreference 的三种选项 —— auto（跟随系统 prefers-color-scheme）、light 与 dark —— 以图标为主的分段按钮呈现，让用户直接选择色彩方案偏好。视觉属性继承自 Segment 组件，shape 默认为 rounded。
---

# 主题模式分段控制

## 概述

`SThemeModeSegment` 是一个绑定到当前 `SConfigProvider` 主题的上下文分段控制。它将 `ThemeModePreference` 的三种选项 —— `auto`（跟随系统 `prefers-color-scheme`）、`light` 与 `dark` —— 以图标为主的分段按钮呈现，让用户直接选择色彩方案偏好。适合在顶栏、设置面板或主题自定义器中一眼展示全部三种偏好。

## 用法

<UsageCode component="theme-mode-segment" />

## 特性

- 🌓 三种选项 —— `auto` / `light` / `dark`，与主题 `mode` 类型一致
- 🎚 选择通过共享的主题上下文写入偏好
- 🎨 继承 `Segment` 的视觉属性（`size` / `shape` / `fill` 等），`shape` 默认为 `rounded`
- 🖼 方案图标（显示器 / 太阳 / 月亮）常驻显示；`showLabel` 控制是否在图标旁显示本地化标签（隐藏的标签仍保留可访问名称）

## 演示

<PlaygroundGallery component="theme-mode-segment" />

## API

<ComponentApi component="theme-mode-segment" />

## 注意事项

### 适用范围

与 `SThemeModeSelect`、`SThemeModeSwitch` 类似，`SThemeModeSegment` 属于主题层组件，直接操作父级 `SConfigProvider` 的主题上下文。它不接受 `modelValue`；偏好由 provider 持有并在所有主题组件间共享。它是 `SThemeModeSelect` 的分段形态 —— 选项相同，无需下拉展开。

### 提醒

- 组件必须渲染在提供主题上下文的 `SConfigProvider` 内部，否则 `useTheme` 会抛出异常。
- `auto` 是一种*偏好* —— 实际解析后的方案（`light` / `dark`）仍取决于系统 `prefers-color-scheme`，并通过主题上下文的 `effectiveMode` 暴露。
- `items`、`modelValue` 与 `defaultValue` 不对外暴露：选项列表固定，状态由主题上下文持有。
