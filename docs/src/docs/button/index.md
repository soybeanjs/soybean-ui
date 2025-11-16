# <i18n-t keypath="components.button.title" scope="global" />

<i18n-t keypath="components.button.desc" scope="global" />

## <i18n-t keypath="components.common.demo" scope="global" />

```demo
color.vue
variant.vue
size.vue
shape.vue
shadow.vue
slot.vue
disabled.vue
loading.vue
icon.vue
link.vue
group.vue
```

## API

### Button Props

| 名称           | 类型                                                                                                 | 默认值    | 说明               |
| -------------- | ---------------------------------------------------------------------------------------------------- | --------- | ------------------ |
| **color**      | "primary" \| "secondary" \| "destructive" \| "success" \| "warning" \| "info" \| "muted" \| "accent" | "primary" | 按钮颜色           |
| **size**       | "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"                                                        | "md"      | 按钮尺寸           |
| **variant**    | "solid" \| "outline" \| "dashed" \| "soft" \| "ghost" \| "link"                                      | "solid"   | 样式变体           |
| **shape**      | "auto" \| "rounded" \| "square" \| "circle"                                                          | "auto"    | 按钮形状           |
| **shadow**     | "none" \| "sm" \| "md" \| "lg"                                                                       | "none"    | 阴影效果           |
| **fitContent** | boolean                                                                                              | false     | 根据内容自适应尺寸 |
| **disabled**   | boolean                                                                                              | false     | 是否禁用           |

### Button Emits

| 事件名 | 参数                    | 说明           |
| ------ | ----------------------- | -------------- |
| click  | **(event: MouseEvent)** | 点击按钮时触发 |

### Button Slots

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

- 🎨 6 种样式变体：solid、outline、dashed、soft、ghost、link
- 🌈 8 种颜色主题：primary、secondary、destructive、success、warning、info、muted、accent
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

## 相关资源

- [Playground 演示](/playground/examples/button)
- [快速开始](/guide/quick-start)
