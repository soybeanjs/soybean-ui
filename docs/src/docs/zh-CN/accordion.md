# Accordion

## 示例

```playground
single
always-one
multiple
custom-icon
custom-styling
```

## API

### 属性

<PropsTable :data="[
  { name: 'v-model', type: 'string', default: '——', description: '当前激活项', required: true },
  { name: 'items', type: 'array', typeSimple: '{ title: string, description: string, icon: string, value: string, disabled: boolean }', default: '——', description: '数据项', required: true },
  { name: 'size', type: 'enum', typeSimple: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: 'md', description: 'According 尺寸' },
  { name: 'multiple', type: 'boolean', default: 'false', description: '是否允许同时多个展开' },
  { name: 'ui', type: 'object', typeSimple: '{ header: string, content: string, item: string, root: string, trigger: string, triggerIcon: string, triggerLeadingIcon: string }', default: '{}', description: '给对应容器添加class类名' },
  { name: 'collapsible', type: 'boolean', default: 'false', description: '是否可以单独折叠' },
]"/>

### 事件

<EmitsTable :data="[
  { name: 'update:modelValue', parameters: '(value: string \| array) => void', description: '当前激活项发生变化时触发' },
]"/>

### 插槽

<SlotsTable :data="[
  { name: 'title', parameters: '{ item: object, modelValue: string \| array, open: boolean }', description: '自定义折叠项标题' },
  { name: 'leading', parameters: '{ item: object, modelValue: string \| array, open: boolean }', description: '自定义折叠项前置内容' },
  { name: 'content', parameters: '{ item: object, modelValue: string \| array, open: boolean }', description: '自定义折叠项内容' },
  { name: 'trigger-icon', parameters: '{ item: object, modelValue: string \| array, open: boolean }', description: '自定义折叠项目图标的内容' },
]"/>
