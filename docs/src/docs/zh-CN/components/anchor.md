# 锚点

## 概述

Anchor 用于长内容区域的页内导航，并会在滚动时自动高亮当前所在的章节。

## 用法

```vue
<script setup lang="ts">
import { shallowRef } from 'vue';
import { SAnchor } from '@soybeanjs/ui';

const containerRef = shallowRef<HTMLElement>();

const items = [
  { href: '#overview', title: '概述' },
  { href: '#api', title: 'API' }
];

const getContainer = () => containerRef.value ?? window;
</script>

<template>
  <div class="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
    <SAnchor :items="items" :get-container="getContainer" />
    <div ref="containerRef" class="max-h-80 overflow-auto">
      <section id="overview" class="min-h-60">...</section>
      <section id="api" class="min-h-60">...</section>
    </div>
  </div>
</template>
```

## 演示

```playground
basic
size
sticky
custom-styling
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'items', type: 'AnchorItemData[]', default: '[]', description: '要渲染的锚点项。', required: true },
  { name: 'class', type: 'ClassValue', default: '-', description: '根容器类名。' },
  { name: 'bounds', type: 'number', default: '5', description: '滚动时判定当前激活锚点的额外阈值。' },
  { name: 'dir', type: `'ltr' \| 'rtl'`, default: `'ltr'`, description: '文本方向。' },
  { name: 'getContainer', type: '() => HTMLElement | Window', default: '() => window', description: '返回用于锚点追踪的滚动容器。' },
  { name: 'getCurrentAnchor', type: '(activeHref: string) => string', default: '-', description: '将内部检测到的激活 href 映射为自定义 href。' },
  { name: 'linkProps', type: 'Omit<AnchorLinkProps, `href`>', default: '-', description: '会透传给每个锚点链接的共享 props。' },
  { name: 'modelValue', type: 'string', default: '-', description: '受控的当前激活 href。' },
  { name: 'offsetTop', type: 'number', default: '0', description: '滚动定位和 sticky 模式共用的顶部偏移量。' },
  { name: 'orientation', type: `'vertical' \| 'horizontal'`, default: `'vertical'`, description: '锚点布局方向。' },
  { name: 'replace', type: 'boolean', default: 'false', description: '使用 history.replaceState 替代 history.pushState 更新 hash。' },
  { name: 'size', type: 'ThemeSize', default: `'md'`, description: '锚点尺寸。' },
  { name: 'sticky', type: 'boolean', default: 'true', description: '是否在容器内保持吸附。' },
  { name: 'targetOffset', type: 'number', default: '-', description: '覆盖 offsetTop，用于滚动目标计算。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '自定义类名。' }
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string) => void', description: '当前激活 href 变化时触发。' },
  { name: 'activeChange', parameters: '(value: string) => void', description: '滚动追踪激活新 href 时触发。' },
  { name: 'itemSelect', parameters: '(event: MouseEvent, payload: { href: string }) => void', description: '点击锚点项时触发。' }
]"/>

### 插槽

<DataTable preset="slots" :data="[]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: '自定义样式类。',
    fields: [
      { name: 'root', type: 'string', description: '根容器类名。' },
      { name: 'link', type: 'string', description: '锚点链接类名。' },
      { name: 'item', type: 'string', description: '锚点项容器类名。' },
      { name: 'indicator', type: 'string', description: '激活指示器类名。' },
      { name: 'children', type: 'string', description: '嵌套子项容器类名。' }
    ]
  },
  {
    name: 'AnchorItemData',
    description: '锚点项树节点。',
    fields: [
      { name: 'href', type: 'string', description: '目标 hash href。' },
      { name: 'title', type: 'string', description: '显示文本。' },
      { name: 'target', type: 'string', description: '可选链接 target。' },
      { name: 'disabled', type: 'boolean', description: '是否禁用该项。' },
      { name: 'children', type: 'AnchorItemData[]', description: '嵌套子项。' }
    ]
  }
]"/>

<UnionType name="ThemeSize" description="主题尺寸类型" type="'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'" />
