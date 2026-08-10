# PalettePicker

## 概述

`SPalettePicker` 是一个基于单一基础色生成完整色板的颜色选择器。其 `modelValue` 是一个 [`ColorValue`](../../../api/theme.md)——可以是 Tailwind 色板键 + 档位（如 `indigo.500`）、简单色板键（`black` / `white` / `transparent` …），或原始自定义颜色（`hsl(...)` / `oklch(...)`）。

## 用法

<UsageCode component="palette-picker" />

## 特性

- 🎯 `modelValue` 为 `ColorValue`，可直接被主题系统消费
- 🎨 选择 Tailwind 色板键后，再选择档位，得到干净的 `key.level` 值
- ⚫ 或选择简单色板键（`black`、`white`、`transparent` …）
- 🌐 内置色板颜色名称支持国际化（跟随当前语言）
- ✨ **Custom** 模式：用 `ColorPicker` 选取任意颜色，查看生成的色板，点击任意档位即可选择并高亮，并可切换 **推荐色板** 将展示吸附到最近的 Tailwind 色板
- 📤 通过 `paletteChange` 事件暴露完整生成色板，供外部将其注册为主题预设
- 🌈 `format`（`hsl` / `oklch`）控制自定义颜色的序列化方式

## 示例

<PlaygroundGallery component="palette-picker" />

## API

<ComponentApi component="palette-picker" />

## 说明

### Custom 模式与主题预设

主题引擎的自定义预设需要注册。当用户编辑自定义颜色时，监听 `paletteChange` 并把 `payload.palette` 交给注册流程；发出的 `payload.value` 即被提交的 `ColorValue`。

### 推荐色板

在 Custom 模式下，生成的色板档位均可点击——点击某档位会高亮它（与内置档位选择器一致）。开启 **推荐色板** 时，`generateNearestPalette` 会把色板吸附到最近的内置 Tailwind 色板，选择某档位会提交该色板的 `key.level` 值。关闭时，则按 `format` 提交原始自定义颜色，点击档位仅做高亮。
