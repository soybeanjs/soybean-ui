# Avatar

## 示例

```playground
base
fallback
delay
size
```

## Avatar Api

### Props

<DataTable preset="props" :data="[
  { name: 'src', type: 'string', default: '-', description: '头像图片地址', required: true },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: 'md', description: '头像大小' },
  { name: 'delay-ms', type: 'number', default: 0, description: '头像图片加载延迟时间，单位：毫秒' },
  { name: 'fallback-label', type: 'string', default: '{}', description: '头像图片加载失败时显示的文本' },
  { name: 'image-props', type: 'object', default: '{}', description: '添加给 image 标签的属性' },
  { name: 'fallback-props', type: 'object', default: '{}', description: '添加给 fallback 标签的属性' },
  { name: 'ui', type: 'Ui', default: '{}', description: '给对应容器添加 class 类名' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'fallback', type: 'string', default: '-', description: '自定义头像加载失败时显示的内容' },
]"/>

### Emits

<DataTable preset="emits" :data="[
  { name: 'loading-status-change', parameters: `(status: 'loading' | 'loaded' | 'error') => void`, description: `头像加载状态改变时触发` },
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Avatar 组件的自定义 class 名',
    fields: [
      { name: 'root', type: 'string', description: '应用到根容器的 class 名' },
      { name: 'image', type: 'string', description: '应用到 image 元素的 class 名' },
      { name: 'fallback', type: 'string', description: '应用到 fallback 元素的 class 名' },
    ],
  }
]"/>
