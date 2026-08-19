# 图片

## 概述

响应式图片组件，内置加载、错误、回退处理以及可选的全屏预览。`SImage` 组合 headless `ImageRoot`（通过 `useImageLoadingStatus` 管理加载状态，提供 placeholder/error/mask 插槽）与 `SImagePreview`（支持缩放/旋转/关闭的全屏查看器）。适用于商品图库、用户内容、头像，或任何需要优雅降级的 `<img>` 场景。固定比例盒子请优先使用 `aspect-ratio`，圆形用户头像使用 `avatar`，需要整体布局占位时使用 `skeleton`。

## 用法

<UsageCode component="image" />

## 特性

- 🧩 headless/styled 分离 — `ImageRoot` 负责加载状态（`useImageLoadingStatus`）与插槽结构；`SImage` 仅注入样式与预览接线
- 🖼 `fit`（`cover`/`contain`/`fill`/`none`/`scale-down`）映射为 `object-fit` 变体
- ⏳ 内置加载状态 — 加载期间渲染 `placeholder` 插槽（默认 spinner）
- ❌ 错误处理 — 加载失败时 `fallback` 源自动替换，或通过 `error` 插槽渲染自定义内容
- 🔍 `preview` 打开全屏查看器（`SImagePreview`），支持放大/缩小、重置、旋转、关闭；Esc 与点击背景关闭
- 🔄 `previewSrc` 让预览展示更高分辨率源图
- 🧩 `placeholder`/`error`/`mask` 插槽可完全替换默认遮罩内容
- 🧭 `dir`（ltr/rtl）从 `SConfigProvider` 解析；`rounded` 添加圆角

## 组件家族

- `SImage` — 带加载/错误/预览行为的图片
- `SImagePreview` — 独立全屏查看器，带缩放/旋转工具栏

## 演示

<PlaygroundGallery component="image" />

## API

<ComponentApi component="image" />

## 注意事项

### 架构与行业对标

SoybeanUI 将图片拆分为 headless `ImageRoot`（通过 `useImageLoadingStatus` 管理加载状态，placeholder/error/mask 插槽，预览点击事件）与 headless `ImagePreview`（可控打开状态，通过 CSS 自定义属性缩放/旋转，Esc/背景关闭，页面滚动锁定），由带样式的 `SImage`/`SImagePreview` 包装应用 `imageVariants` 与 `imagePreviewVariants`。与 Ant Design `Image`、Element Plus `el-image`、Mantine `Image` 相比，SoybeanUI 是唯一同时具备 headless/styled 分离、逐插槽 `ui` 类覆盖以及 CSS 变量驱动缩放/旋转的对标库；预览工具栏可通过 `toolbar` 插槽完全替换。

| 能力                 | SoybeanUI | Ant Design | Element Plus | Mantine |
| :------------------- | :-------: | :--------: | :----------: | :-----: |
| headless/styled 分离 |    ✅     |     —      |      —       |    —    |
| 加载占位             |    ✅     |     ✅     |      ✅      |    —    |
| 错误回退             |    ✅     |     ✅     |      ✅      |   ✅    |
| 适配模式             |    ✅     |     —      |      ✅      |   ✅    |
| 全屏预览             |    ✅     |     ✅     |      ✅      |    —    |
| 缩放/旋转            |    ✅     |     ✅     |      ✅      |    —    |
| 预览源覆盖           |    ✅     |     ✅     |      —       |    —    |
| 可替换工具栏         |    ✅     |     —      |      —       |    —    |
| RTL 支持             |    ✅     |     —      |      —       |    —    |

### 使用注意

- `mask` 遮罩为 `pointer-events: none`；点击穿透到图片本身，因此预览在图片上点击时打开。
- 缩放/旋转状态通过 CSS 自定义属性（`--soybean-image-preview-zoom`/`--soybean-image-preview-rotate`）应用；覆盖 `imagePreviewVariants.image` 可能移除 transform。
- `SImagePreview` 传送至 `body` 并在打开时锁定页面滚动；可通过工具栏、背景或 Escape 关闭。

## 常见问题

### 如何在加载时显示占位内容？

默认提供 spinner 占位。替换时使用 `placeholder` 插槽：`<template #placeholder><SSkeleton class="size-full" /></template>`。

### 如何处理加载失败的图片？

传入 `fallback`（回退源）或使用 `error` 插槽渲染自定义内容。

### 如何启用预览？

在 `SImage` 上设置 `preview`。点击已加载图片打开全屏查看器；使用 `preview-src` 指定更高分辨率源图。

### 如何自定义预览工具栏？

使用 `SImagePreview` 的 `toolbar` 插槽，接收 `{ zoomIn, zoomOut, reset, rotate, close, zoom, rotateDeg }`。
