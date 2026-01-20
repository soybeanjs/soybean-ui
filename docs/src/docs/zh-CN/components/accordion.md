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

<DataTable preset="props" :data="[
  { name: 'v-model', type: 'string', default: '—', description: '绑定值', required: true },
  { name: 'items', type: 'Array<AccordionOptionData>', default: '-', description: '数据项', required: true },
  { name: 'size', type: `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`, default: `'md'`, description: 'According 尺寸' },
  { name: 'multiple', type: 'boolean', default: 'false', description: '是否启用多项同时展开' },
  { name: 'collapsible', type: 'boolean', default: 'false', description: '是否可折叠' },
  { name: 'ui', type: 'Ui', default: '{}', description: '给对应容器添加 class 类名' },
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', parameters: '(value: string | array) => void', description: '当 modelValue 发生变化时触发' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'title', parameters: 'AccordionSlotProps', description: '自定义 AccordingItem 的标题' },
  { name: 'leading', parameters: 'AccordionSlotProps', description: '自定义 AccordingItem 的前置内容' },
  { name: 'content', parameters: 'AccordionSlotProps', description: '自定义 AccordionContent 的内容' },
  { name: 'trigger-icon', parameters: 'AccordionSlotProps', description: '自定义 AccordingItem 的触发图标' },
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'AccordionSlotProps',
    description: 'Accordion 插槽的 props',
    fields: [
      { name: 'item', type: 'AccordionOptionData', required: true, description: '当前项的数据' },
      { name: 'modelValue', type: 'string | string[]', required: true, description: '当前激活的值（或值数组）' },
      { name: 'open', type: 'boolean', required: true, description: '当前项是否展开' },
    ]
  },
  {
    name: 'AccordionOptionData',
    description: 'Accordion 数据项',
    fields: [
      { name: 'value', type: 'string', required: true, description: '折叠项的值，所有项应保持唯一' },
      { name: 'disabled', type: 'boolean', description: '为 true 时，阻止用户与该项交互' },
      { name: 'title', type: 'string', description: '折叠项标题' },
      { name: 'description', type: 'string', description: '折叠项内容描述' },
      { name: 'icon', type: 'string', description: '折叠项图标' },
    ]
  },
  {
    name: 'Ui',
    description: 'Accordion 组件的自定义 class 名',
    fields: [
      { name: 'header', type: 'string', description: '应用到 header 元素的 class 名' },
      { name: 'content', type: 'string', description: '应用到 content 区域的 class 名' },
      { name: 'item', type: 'string', description: '应用到每一项 item 的 class 名' },
      { name: 'root', type: 'string', description: '应用到根容器的 class 名' },
      { name: 'trigger', type: 'string', description: '应用到 trigger 区域的 class 名' },
      { name: 'triggerIcon', type: 'string', description: '应用到 trigger 图标的 class 名' },
      { name: 'triggerLeadingIcon', type: 'string', description: '应用到 trigger 前置图标的 class 名' },
    ],
  }
]" />
