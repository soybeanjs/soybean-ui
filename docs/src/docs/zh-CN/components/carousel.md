# Carousel

## 概述

Carousel 基于 Embla Carousel 构建，用于在有限空间内按水平或垂直方向浏览一组内容。

## 用法

```vue
<script setup lang="ts">
import { SCarousel, SCarouselContent, SCarouselItem, SCarouselNext, SCarouselPrevious } from '@soybeanjs/ui';
</script>

<template>
  <SCarousel aria-label="示例轮播" class="max-w-xs">
    <SCarouselContent>
      <SCarouselItem>Slide 1</SCarouselItem>
      <SCarouselItem>Slide 2</SCarouselItem>
      <SCarouselItem>Slide 3</SCarouselItem>
    </SCarouselContent>
    <SCarouselPrevious />
    <SCarouselNext />
  </SCarousel>
</template>
```

## 演示

```playground
basic
vertical
rtl
custom-styling
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'class', type: 'ClassValue', default: '-', description: '根元素自定义类名' },
  { name: 'orientation', type: `'horizontal' | 'vertical'`, default: `'horizontal'`, description: '轮播方向' },
  { name: 'dir', type: `'ltr' | 'rtl'`, default: '继承全局配置', description: '阅读方向' },
  { name: 'opts', type: 'CarouselOptions', default: '-', description: 'Embla Carousel 配置项' },
  { name: 'plugins', type: 'CarouselPlugins', default: '-', description: 'Embla Carousel 插件列表' },
  { name: 'ui', type: 'Ui', default: '{}', description: '为内部元素自定义类名' },
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'initApi', parameters: '(api: CarouselApi) => void', description: 'Embla API 初始化完成后触发' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '默认内容，通常包含 CarouselContent、CarouselItem 和控制按钮', required: true },
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义类名映射',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名' },
      { name: 'content', type: 'string', description: '视口容器类名' },
      { name: 'container', type: 'string', description: '滑动轨道类名' },
      { name: 'item', type: 'string', description: '单个 slide 类名' },
      { name: 'previous', type: 'string', description: '上一张按钮类名' },
      { name: 'next', type: 'string', description: '下一张按钮类名' },
    ],
  }
]"/>
