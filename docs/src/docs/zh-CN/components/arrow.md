# 箭头

## 概述

用于在 Popover、Tooltip 等浮层中渲染箭头的基础组件，通常由其他组件内部使用。

## 演示

```playground
base
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'width', type: 'number', default: '10', description: '箭头宽度（像素）。' },
  { name: 'height', type: 'number', default: '5', description: '箭头高度（像素）。' },
  { name: 'as', type: 'string | Component', default: `'svg'`, description: '渲染的元素。' },
  { name: 'asChild', type: 'boolean', default: 'false', description: '将属性合并到子元素。' }
]"/>
