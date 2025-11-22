---
title: Dialog 对话框
---

# Dialog 对话框

在当前页面正中打开一个浮层，告知用户并承载相关操作。

## 基础用法

```demo
demos/basic.vue
```

## API

### Dialog Props

| 名称          | 类型        | 默认值     | 说明             |
| :------------ | :---------- | :--------- | :--------------- |
| `open`        | `boolean`   | -          | 是否显示对话框   |
| `defaultOpen` | `boolean`   | `false`    | 默认是否显示     |
| `title`       | `string`    | -          | 标题             |
| `description` | `string`    | -          | 描述             |
| `size`        | `ThemeSize` | `'medium'` | 尺寸             |
| `modal`       | `boolean`   | `true`     | 是否为模态对话框 |
| `closable`    | `boolean`   | `true`     | 是否显示关闭按钮 |

### Dialog Slots

| 名称          | 说明                 |
| :------------ | :------------------- |
| `trigger`     | 触发对话框显示的元素 |
| `default`     | 对话框内容           |
| `header`      | 头部内容             |
| `title`       | 标题内容             |
| `description` | 描述内容             |
| `footer`      | 底部内容             |
| `close`       | 关闭按钮内容         |

### Dialog Events

| 名称          | 参数               | 说明               |
| :------------ | :----------------- | :----------------- |
| `update:open` | `(value: boolean)` | 显示状态改变时触发 |
