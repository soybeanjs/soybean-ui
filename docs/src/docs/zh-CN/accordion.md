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

| 名称            | 类型                                                                                                                                         | 默认值 | 说明                    |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ------ | ----------------------- |
| **v-model**     | string                                                                                                                                       | ——     | 当前激活项              |
| **items**       | array {? { title: string, description: string, icon: string, value: string, disabled: boolean }}                                             | ——     | 数据项                  |
| **size**        | enum {? 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' }                                                                                      | md     | According 尺寸          |
| **multiple**    | boolean                                                                                                                                      | false  | 是否允许同时多个展开    |
| **ui**          | object {? { header: string, content: string, item: string, root: string, trigger: string, triggerIcon: string, triggerLeadingIcon: string }} | {}     | 给对应容器添加class类名 |
| **collapsible** | boolean                                                                                                                                      | false  | 是否可以单独折叠        |

### 事件

| 名称              | 类型                                           | 说明                     |
| ----------------- | ---------------------------------------------- | ------------------------ |
| update:modelValue | Function {? (value: string \| array) => void } | 当前激活项发生变化时触发 |

### 插槽

| 插槽名       | 类型                                                                    | 说明                     |
| ------------ | ----------------------------------------------------------------------- | ------------------------ |
| title        | object {? { item: object, modelValue: string \| array, open: boolean }} | 自定义折叠项标题         |
| leading      | object {? { item: object, modelValue: string \| array, open: boolean }} | 自定义折叠项前置内容     |
| content      | object {? { item: object, modelValue: string \| array, open: boolean }} | 自定义折叠项内容         |
| trigger-icon | object {? { item: object, modelValue: string \| array, open: boolean }} | 自定义折叠项目图标的内容 |
