---
title: Input 输入框
---

# Input 输入框

通过鼠标或键盘输入内容，是最基础的表单域的包装。

## 基础用法

```demo
demos/basic.vue
```

## API

### Input Props

| 名称          | 类型               | 默认值     | 说明           |
| :------------ | :----------------- | :--------- | :------------- |
| `modelValue`  | `string \| number` | -          | 绑定值         |
| `size`        | `ThemeSize`        | `'medium'` | 输入框尺寸     |
| `clearable`   | `boolean`          | `false`    | 是否可清空     |
| `placeholder` | `string`           | -          | 输入框占位文本 |
| `disabled`    | `boolean`          | `false`    | 是否禁用       |

### Input Slots

| 名称       | 说明                     |
| :--------- | :----------------------- |
| `leading`  | 输入框头部内容（如图标） |
| `trailing` | 输入框尾部内容（如图标） |

### Input Events

| 名称                | 参数                        | 说明               |
| :------------------ | :-------------------------- | :----------------- |
| `update:modelValue` | `(value: string \| number)` | 输入框值改变时触发 |
