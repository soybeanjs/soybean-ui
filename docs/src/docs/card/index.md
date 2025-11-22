---
title: Card 卡片
---

# Card 卡片

将信息聚合在卡片容器中展示。

## 基础用法

```demo
demos/basic.vue
```

## API

### Card Props

| 名称          | 类型        | 默认值     | 说明           |
| :------------ | :---------- | :--------- | :------------- |
| `title`       | `string`    | -          | 卡片标题       |
| `description` | `string`    | -          | 卡片描述       |
| `size`        | `ThemeSize` | `'medium'` | 卡片尺寸       |
| `scrollable`  | `boolean`   | `true`     | 内容是否可滚动 |
| `split`       | `boolean`   | `false`    | 是否显示分割线 |

### Card Slots

| 名称          | 说明           |
| :------------ | :------------- |
| `default`     | 卡片内容       |
| `header`      | 卡片头部       |
| `title`       | 标题内容       |
| `description` | 描述内容       |
| `extra`       | 头部右侧操作区 |
| `footer`      | 卡片底部       |
