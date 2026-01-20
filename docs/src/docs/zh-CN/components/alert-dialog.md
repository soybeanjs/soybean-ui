# AlertDialog

## 示例

```playground
destructive
info
success
warning
action
```

## AlertDialog API

### 属性

<DataTable preset="props" :data="[
  { name: 'v-model:open', type: 'boolean', default: 'undefined', description: 'v-model 绑定值'},
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'AlertDialog 尺寸' },
  { name: 'title', type: 'string', default: '—', description: '标题'},
  { name: 'type', type: `'destructive' \| 'success' \| 'warning' \| 'info'`, default: '—', description: '类型'},
  { name: 'description', type: 'string', default: '—', description: '描述'},
  { name: 'show-icon', type: 'boolean', default: 'true', description: '是否显示图标'},
  { name: 'default-open', type: 'boolean', default: 'false', description: '是否默认打开, 设置 v-model:open 时无效'},
  { name: 'ui', type: 'Ui', default: '{}', description: '给对应容器添加 class 类名' },
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:open', parameters: '(value: boolean) => void', description: '当 open 发生变化时触发' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'trigger', parameters: '-', description: '触发器的插槽', required: true },
  { name: 'default', parameters: '-', description: '内容的插槽', required: true },
  { name: 'footer', parameters: '-', description: '尾部的插槽', required: true },
  { name: 'title', parameters: '-', description: '标题的插槽' },
  { name: 'description', parameters: '-', description: '描述的插槽' },
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'AlertDialog 组件的自定义 class 名',
    fields: [
      { name: 'header', type: 'string', description: '应用到头部的 class 名' },
      { name: 'footer', type: 'string', description: '应用到尾部的 class 名' },
    ]
  }
]"/>

## AlertDialogCancel API

### 属性

<DataTable preset="props" :data="[
  { name: 'text', type: 'string', default: 'Cancel', description: '取消按钮的文本' },
  { name: 'before-close', type: '() => MaybePromise<boolean | void>', default: '() => true', description: '在关闭之前执行的函数' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '—', description: '取消按钮内容的插槽' },
  { name: 'content', parameters: '—', description: '内容的插槽，优先级高于默认插槽' },
]"/>

## AlertDialogAction API

### 属性

<DataTable preset="props" :data="[
  { name: 'text', type: 'string', default: 'Confirm', description: '确认按钮的文本' },
  { name: 'before-close', type: '() => MaybePromise<boolean | void>', default: '() => true', description: '在关闭之前执行的函数' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '—', description: '确认按钮内容的插槽' },
  { name: 'content', parameters: '—', description: '内容的插槽，优先级高于默认插槽' },
]"/>
