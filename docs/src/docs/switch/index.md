---
title: Switch 开关
---

# Switch 开关

表示两种相互对立的状态间的切换，多用于触发「开/关」。

## 基础用法

```demo
demos/basic.vue
```

## API

### Switch Props

| 名称         | 类型                          | 默认值      | 说明         |
| :----------- | :---------------------------- | :---------- | :----------- |
| `modelValue` | `boolean \| string \| number` | -           | 绑定值       |
| `trueValue`  | `boolean \| string \| number` | `true`      | 选中时的值   |
| `falseValue` | `boolean \| string \| number` | `false`     | 未选中时的值 |
| `color`      | `ThemeColor`                  | `'primary'` | 颜色         |
| `size`       | `ThemeSize`                   | `'medium'`  | 尺寸         |
| `shape`      | `SwitchShape`                 | `'pill'`    | 形状         |
| `disabled`   | `boolean`                     | `false`     | 是否禁用     |

### Switch Slots

| 名称       | 说明             |
| :--------- | :--------------- |
| `default`  | 开关滑块内的内容 |
| `leading`  | 开关左侧内容     |
| `trailing` | 开关右侧内容     |

### Switch Events

| 名称                | 参数                                   | 说明             |
| :------------------ | :------------------------------------- | :--------------- |
| `update:modelValue` | `(value: boolean \| string \| number)` | 绑定值改变时触发 |
