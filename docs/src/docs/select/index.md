---
title: Select 选择器
---

# Select 选择器

当选项过多时，使用下拉菜单展示并选择内容。

## 基础用法

```demo
demos/basic.vue
```

## API

### Select Props

| 名称          | 类型                 | 默认值     | 说明             |
| :------------ | :------------------- | :--------- | :--------------- |
| `modelValue`  | `DefinedValue`       | -          | 绑定值           |
| `items`       | `SelectOptionData[]` | `[]`       | 选项数据         |
| `size`        | `ThemeSize`          | `'medium'` | 尺寸             |
| `placeholder` | `string`             | -          | 占位文本         |
| `disabled`    | `boolean`            | `false`    | 是否禁用         |
| `showArrow`   | `boolean`            | `false`    | 是否显示下拉箭头 |

### Select Slots

| 名称               | 说明             |
| :----------------- | :--------------- |
| `trigger-leading`  | 触发器左侧内容   |
| `trigger-value`    | 触发器值显示内容 |
| `trigger-trailing` | 触发器右侧内容   |
| `item-text`        | 选项文本内容     |
| `item-leading`     | 选项左侧内容     |
| `item-trailing`    | 选项右侧内容     |

### Select Events

| 名称                | 参数                    | 说明             |
| :------------------ | :---------------------- | :--------------- |
| `update:modelValue` | `(value: DefinedValue)` | 绑定值改变时触发 |
| `select`            | `(value: DefinedValue)` | 选中选项时触发   |
