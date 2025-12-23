# Card

## 示例

```playground
base
only-content
split
title-slot
```

## API

### 属性

<DataTable preset="props" :data="[
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: 'md', description: 'Card 尺寸' },
  { name: 'title', type: 'string', default: '-', description: '描述' },
  { name: 'description', type: 'string', default: '-', description: '头部描述' },
  { name: 'split', type: 'boolean', default: false, description: '展示分割线' },
  { name: 'scrollable', type: 'boolean', default: false, description: '内容是否可滚动' },
  { name: 'headerProps', type: 'object', default: '{}', description: '头部容器属性' },
  { name: 'contentProps', type: 'object', default: '{}', description: '内容容器属性' },
  { name: 'footerProps', type: 'object', default: '{}', description: '底部容器属性' },
  { name: 'titleRootProps', type: 'object', default: '{}', description: '标题根容器属性' },
  { name: 'titleProps', type: 'object', default: '{}', description: '标题容器属性' },
  { name: 'descriptionProps', type: 'object', default: '{}', description: '描述容器属性' },
  { name: 'ui', type: 'Ui', default: '{}', description: '给对应容器添加 class 类名' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', params: '-', description: '自定义默认内容' },
  { name: 'title-leading', params: '-', description: '自定义标题前置内容' },
  { name: 'title', params: '-', description: '自定义标题' },
  { name: 'title-trailing', params: '-', description: '自定义标题尾部内容' },
  { name: 'extra', params: '-', description: '自定义额外内容' },
  { name: 'footer', params: '-', description: '自定义底部内容' },
  { name: 'description', params: '-', description: '自定义描述内容' },
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Card 组件的自定义 class 名',
    fields: [
      { name: 'root', type: 'string', description: '应用到根容器的 class 名' },
      { name: 'header', type: 'string', description: '应用到头部容器的 class 名' },
      { name: 'titleRoot', type: 'string', description: '应用到标题根容器的 class 名' },
      { name: 'title', type: 'string', description: '应用到标题容器的 class 名' },
      { name: 'description', type: 'string', description: '应用到头部描述容器的 class 名' },
      { name: 'content', type: 'string', description: '应用到内容容器的 class 名' },
      { name: 'footer', type: 'string', description: '应用到底部容器的 class 名' },
    ],
  }
]"/>
