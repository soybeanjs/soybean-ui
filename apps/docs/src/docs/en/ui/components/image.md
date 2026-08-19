# Image

## Overview

A responsive image component with built-in loading, error, and fallback handling plus an optional fullscreen preview. `SImage` composes the headless `ImageRoot` (loading status via `useImageLoadingStatus`, placeholder/error/mask slots) and `SImagePreview` (the fullscreen viewer with zoom/rotate/close). Use it for product galleries, user content, avatars, or any `<img>` that needs graceful degradation. Prefer `aspect-ratio` for fixed-ratio boxes, `avatar` for circular user pictures, and `skeleton` when the surrounding layout also needs placeholders.

## Usage

<UsageCode component="image" />

## Features

- 🧩 Headless/styled split — `ImageRoot` owns loading status (`useImageLoadingStatus`) and slot structure; `SImage` only injects styles and preview wiring
- 🖼 `fit` (`cover`/`contain`/`fill`/`none`/`scale-down`) maps to `object-fit` variants
- ⏳ Built-in loading state — a `placeholder` slot (default spinner) renders while the image loads
- ❌ Error handling — a `fallback` src swaps in on failure, or an `error` slot renders custom content
- 🔍 `preview` opens a fullscreen viewer (`SImagePreview`) with zoom in/out, reset, rotate, and close; esc and backdrop-click dismiss
- 🔄 `previewSrc` lets the preview show a higher-resolution source
- 🧩 `placeholder`/`error`/`mask` slots fully replace the default overlay content
- 🧭 `dir` (ltr/rtl) resolved from `SConfigProvider`; `rounded` adds rounded corners

## Component family

- `SImage` — the image with loading/error/preview behavior
- `SImagePreview` — standalone fullscreen viewer with zoom/rotate toolbar

## Demos

<PlaygroundGallery component="image" />

## API

<ComponentApi component="image" />

## Notes

### Architecture and benchmark differences

SoybeanUI splits the image into a headless `ImageRoot` (loading status via `useImageLoadingStatus`, placeholder/error/mask slots, preview click emission) and a headless `ImagePreview` (controllable open state, zoom/rotate via CSS custom properties, esc/backdrop close, body scroll lock), with the styled `SImage`/`SImagePreview` wrappers applying `imageVariants` and `imagePreviewVariants`. Compared with Ant Design `Image`, Element Plus `el-image`, and Mantine `Image`, SoybeanUI is the only benchmarked library with a headless/styled split, per-slot `ui` class overrides, and CSS-variable-driven zoom/rotate; the preview toolbar is fully replaceable via the `toolbar` slot.

| Capability            | SoybeanUI | Ant Design | Element Plus | Mantine |
| :-------------------- | :-------: | :--------: | :----------: | :-----: |
| headless/styled split |    ✅     |     —      |      —       |    —    |
| Loading placeholder   |    ✅     |     ✅     |      ✅      |    —    |
| Error fallback        |    ✅     |     ✅     |      ✅      |   ✅    |
| Fit modes             |    ✅     |     —      |      ✅      |   ✅    |
| Fullscreen preview    |    ✅     |     ✅     |      ✅      |    —    |
| Zoom / rotate         |    ✅     |     ✅     |      ✅      |    —    |
| Preview src override  |    ✅     |     ✅     |      —       |    —    |
| Replaceable toolbar   |    ✅     |     —      |      —       |    —    |
| RTL support           |    ✅     |     —      |      —       |    —    |

### Cautions

- The `mask` overlay is `pointer-events: none`; clicks pass through to the image so the preview opens on the image itself.
- Zoom/rotate state is applied through CSS custom properties (`--soybean-image-preview-zoom`/`--soybean-image-preview-rotate`); overriding `imagePreviewVariants.image` can remove the transform.
- `SImagePreview` teleports to `body` and locks page scroll while open; close via the toolbar, the backdrop, or Escape.

## FAQ

### How do I show a placeholder while loading?

A default spinner placeholder ships out of the box. To replace it, use the `placeholder` slot: `<template #placeholder><SSkeleton class="size-full" /></template>`.

### How do I handle broken images?

Pass `fallback` (a fallback src) or use the `error` slot for custom content.

### How do I enable the preview?

Set `preview` on `SImage`. Clicking a loaded image opens the fullscreen viewer; use `preview-src` for a higher-resolution source.

### How do I customize the preview toolbar?

Use the `toolbar` slot on `SImagePreview`, which receives `{ zoomIn, zoomOut, reset, rotate, close, zoom, rotateDeg }`.
