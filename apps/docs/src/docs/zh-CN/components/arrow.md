# 箭头

## 概述

`SArrow` 是一个基础 SVG 组件，渲染一个向下指的三角形，用作 Popover、Tooltip 等浮层元素的视觉指示器。主要供 SoybeanUI 浮层组件（popover、tooltip、hover-card 等）内部使用，也可在构建自定义浮层 UI 时直接使用。

## 用法

<UsageCode component="arrow" />

## 演示

<PlaygroundGallery component="arrow" />

## API

<ComponentApi component="arrow" />

## 注意事项

### 架构

`SArrow` 是 headless 原语——UI 层（`@soybeanjs/ui`）直接重新导出 headless `Arrow`，不添加样式变体。SVG 渲染固定 `viewBox="0 0 12 6"` 路径（`M 0,0 L 6,6 L 12,0`），使用 `preserveAspectRatio="none"` 以拉伸至任意容器尺寸。样式（填充、描边、尺寸）通过 `class` 透传由父组件控制。

### 无障碍

箭头始终为装饰性元素——默认 `aria-hidden="true"` 和 `focusable="false"`，确保屏幕阅读器忽略它，旧版浏览器不将其纳入 tab 顺序。这些属性硬编码在 headless 模板中，因为箭头不承载语义信息。

### 样式

箭头通过 CSS 类继承填充和描边。常见模式：

- `fill-popover stroke-border` — 匹配 popover 背景与边框
- `fill-popover-foreground` — 纯前景色箭头
- `w-8 h-4` — 控制箭头尺寸

箭头由父浮层组件（如 `SPopover`、`STooltip`）通过 CSS transform 旋转和定位。
