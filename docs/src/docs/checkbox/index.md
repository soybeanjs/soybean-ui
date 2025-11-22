---
title: Checkbox 复选框
---

# Checkbox 复选框

在一组备选项中进行多选。

## 基础用法

```demo
demos/basic.vue
```

## API

### Checkbox Props

| 名称         | 类型            | 默认值      | 说明       |
| :----------- | :-------------- | :---------- | :--------- |
| `modelValue` | `boolean`       | -           | 绑定值     |
| `label`      | `string`        | -           | 复选框文本 |
| `color`      | `ThemeColor`    | `'primary'` | 颜色       |
| `size`       | `ThemeSize`     | `'medium'`  | 尺寸       |
| `shape`      | `CheckboxShape` | `'rounded'` | 形状       |
| `disabled`   | `boolean`       | `false`     | 是否禁用   |

### Checkbox Slots

| 名称        | 说明               |
| :---------- | :----------------- |
| `default`   | 复选框文本内容     |
| `indicator` | 选中时的指示器图标 |

### Checkbox Events

| 名称                | 参数               | 说明             |
| :------------------ | :----------------- | :--------------- |
| `update:modelValue` | `(value: boolean)` | 绑定值改变时触发 |
