# Badge

## 示例

```playground
color
content
position
slot
open
```

## Badge API

### Props

<DataTable preset="props" :data="[
  { name: 'content', type: 'string', default: '-', description: 'Badge 内容' },
  { name: 'open', type: 'boolean', default: undefined, description: 'Badge 是否打开' },
  { name: 'class', type: 'string', default: '-', description: '根容器class名'},
  { name: 'position', type: `'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'`, default: 'top-right', description: 'Badge 位置' },
  { name: 'contentProps', type: 'HTMLAttributes', default: '{}', description: 'Badge 内容属性' },
  { name: 'size', type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`, default: 'md', description: 'Badge 大小' },
  { name: 'ui', type: 'Ui', default: '{}', description: '给对应容器添加 class 类名' },
]"/>

### Slots

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '自定义默认内容', required: true },
  { name: 'content', parameters: '-', description: 'Badge 内容' },
]"/>

### Types

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Badge 组件的自定义 class 名',
    fields: [
      { name: 'root', type: 'string', description: '应用到根容器的 class 名' },
      { name: 'content', type: 'string', description: '应用到 Badge 内容容器的 class 名' },
    ],
  }
]"/>
