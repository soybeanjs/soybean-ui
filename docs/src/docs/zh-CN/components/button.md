# 按钮 Button

## 示例

```playground
color
variant
size
shape
shadow
slot
disabled
loading
icon
link
group
```

## API

### 属性

| 名称           | 类型                                                                                                  | 默认值    | 说明               |
| -------------- | ----------------------------------------------------------------------------------------------------- | --------- | ------------------ |
| **color**      | "primary" \| "destructive" \| "success" \| "warning" \| "info" \| "carbon" \| "secondary" \| "accent" | "primary" | 按钮颜色           |
| **size**       | "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"                                                         | "md"      | 按钮尺寸           |
| **variant**    | "solid" \| "outline" \| "dashed" \| "soft" \| "ghost" \| "link" \| "plain" \| "pure"                  | "solid"   | 样式变体           |
| **shape**      | "auto" \| "rounded" \| "square" \| "circle"                                                           | "auto"    | 按钮形状           |
| **shadow**     | "none" \| "sm" \| "md" \| "lg"                                                                        | "none"    | 阴影效果           |
| **fitContent** | boolean                                                                                               | false     | 根据内容自适应尺寸 |
| **disabled**   | boolean                                                                                               | false     | 是否禁用           |

### 事件

| 事件名    | 参数                    | 说明           |
| --------- | ----------------------- | -------------- |
| **click** | **(event: MouseEvent)** | 点击按钮时触发 |

### 插槽

| 插槽名  | 参数 | 说明     |
| ------- | ---- | -------- |
| default | -    | 按钮内容 |

## 组件类型

Button 组件族包含以下组件：

- **SButton** - 基础按钮组件
- **SButtonLink** - 链接按钮，支持路由导航
- **SButtonIcon** - 图标按钮，紧凑设计
- **SButtonLoading** - 加载状态按钮
- **SButtonGroup** - 按钮组组件

## 主要特性

- 🎨 8 种样式变体：solid、outline、dashed、soft、ghost、link、plain、pure
- 🌈 8 种颜色主题：primary、destructive、success、warning、info、carbon、secondary、accent
- 📏 6 种尺寸：xs、sm、md、lg、xl、2xl
- 🔲 4 种形状：auto、rounded、square、circle
- ⚡ 加载状态支持
- 🌐 链接功能支持（SButtonLink）
- ♿ 完全可访问性支持
- 🎯 TypeScript 类型安全

## 基础用法

```vue
<script setup lang="ts">
import { SButton } from '@soybeanjs/ui';
</script>

<template>
  <SButton>Default Button</SButton>
</template>
```
