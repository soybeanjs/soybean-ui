# 进度条

## 概述

用于展示任务完成进度的进度条组件，支持确定值和不确定状态。

## 用法

```vue
<script setup lang="ts">
import { SProgress } from '@soybeanjs/ui';
</script>

<template>
  <SProgress :model-value="45" />
</template>
```

## 演示

```playground
basic
size
color
state
slot
circle
provider
```

## Progress API

### 属性

<DataTable preset="props" :data="[
  { name: 'modelValue', type: 'number | null | undefined', default: 'undefined', description: '当前进度值。`null` 或 `undefined` 时显示为不确定状态。' },
  { name: 'max', type: 'number', default: '100', description: '进度最大值。' },
  { name: 'class', type: 'string', default: '-', description: '根容器类名' },
  { name: 'color', type: `'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'carbon' | 'secondary' | 'accent'`, default: 'primary', description: '进度指示器颜色。' },
  { name: 'size', type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`, default: 'md', description: '进度条尺寸。' },
  { name: 'ui', type: 'Ui', default: '{}', description: '为对应容器添加类名' },
  { name: 'indicatorProps', type: 'HTMLAttributes', default: '{}', description: '传递给指示器元素的属性。' },
  { name: 'getValueLabel', type: '(value, max) => string | undefined', default: '百分比格式化', description: '当前值的无障碍标签生成函数。' },
  { name: 'getValueText', type: '(value, max) => string | undefined', default: '-', description: '当前值的无障碍文本生成函数。' },
]"/>

### 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '{ modelValue, max, progressState, valuePercent }', description: '自定义指示器内容。' },
]"/>

### 事件

<DataTable preset="emits" :data="[
  { name: 'update:modelValue', type: '(value: number | null | undefined) => void', description: '进度值变化时触发。' },
  { name: 'update:max', type: '(value: number) => void', description: '最大值被规范化时触发。' },
]"/>

### 类型

<TypeTable :data="[
  {
    name: 'Ui',
    description: 'Progress / ProgressCircle 的自定义类名',
    fields: [
      { name: 'root', type: 'string', description: '为根容器添加类名。' },
      { name: 'indicator', type: 'string', description: '为指示器容器添加类名。' },
      { name: 'circle', type: 'string', description: '为环形进度根容器添加类名，仅适用于 `SProgressCircle`。' },
      { name: 'track', type: 'string', description: '为环形进度轨道添加类名，仅适用于 `SProgressCircle`。' },
      { name: 'label', type: 'string', description: '为环形进度标签容器添加类名，仅适用于 `SProgressCircle`。' },
    ]
  },
  {
    name: 'ProgressState',
    description: '当前进度状态。',
    fields: [
      { name: 'indeterminate', type: 'string', description: '进度值不可用。' },
      { name: 'loading', type: 'string', description: '进度值位于 0 和 max 之间。' },
      { name: 'complete', type: 'string', description: '进度已达到最大值。' },
    ],
  }
]"/>

## 环形进度

```vue
<script setup lang="ts">
import { SProgressCircle } from '@soybeanjs/ui';
</script>

<template>
  <SProgressCircle :model-value="72" size="xl">
    <template #default="{ valuePercent }">{{ Math.round(valuePercent ?? 0) }}%</template>
  </SProgressCircle>
</template>
```

`SProgressCircle` 支持与 `SProgress` 相同的属性、事件、插槽参数和 `Ui` 类型，并额外提供以下属性：

<DataTable preset="props" :data="[
  { name: 'strokeWidth', type: 'number', default: '8', description: '环形指示器的描边宽度。' },
]"/>

## 进度条 Provider

在调用命令式 `progress(...)` API 之前，需要在应用根部附近挂载一次 `SProgressProvider`。`SConfigProvider` 会自动挂载它，因此大多数场景下可以直接调用 `progress`。

```vue
<script setup lang="ts">
import { SButton, SProgressProvider, progress } from '@soybeanjs/ui';

const handleClick = () => {
  progress.start();

  window.setTimeout(() => {
    progress.done();
  }, 1200);
};
</script>

<template>
  <SProgressProvider />
  <SButton @click="handleClick">开始加载</SButton>
</template>
```

### `progress` 方法

| 方法           | 说明                                                 |
| -------------- | ---------------------------------------------------- |
| `start()`      | 按默认起点和启动延迟显示进度条，并启动自动递增动画。 |
| `set(value)`   | 将原始进度值设置到 `minimum` 到 `maximum` 之间。     |
| `inc()`        | 增加当前进度值。                                     |
| `dec()`        | 减少当前进度值。                                     |
| `trickle()`    | 执行一次自动递增步进。                               |
| `done()`       | 完成进度条并在配置延迟后隐藏。                       |
| `configure()`  | 更新共享进度配置。                                   |
| `pause()`      | 暂停自动递增。                                       |
| `resume()`     | 恢复自动递增。                                       |
| `remove()`     | 立即隐藏进度条。                                     |
| `reset()`      | 重置共享进度状态与配置。                             |
| `isStarted()`  | 检查进度流程是否已启动。                             |
| `isRendered()` | 检查当前是否已挂载进度 provider。                    |
| `promise()`    | 将进度生命周期绑定到 Promise 或 Promise 工厂。       |

### `SProgressProvider` 属性

<DataTable preset="props" :data="[
  { name: 'minimum', type: 'number', default: '0.08', description: '`progress.start()` 使用的最小原始进度值。' },
  { name: 'maximum', type: 'number', default: '1', description: 'provider 使用的最大原始进度值。' },
  { name: 'startPosition', type: 'number', default: '0.3', description: '`progress.start()` 默认使用的起始进度值，更适合页面切换过渡。' },
  { name: 'delay', type: 'number', default: '100', description: '`progress.start()` 的默认启动延迟，避免过快切换时闪烁。' },
  { name: 'stopDelay', type: 'number', default: '300', description: '`progress.stop()` 的默认收尾延迟。' },
  { name: 'forcedStopDelay', type: 'number', default: '0', description: '`progress.stop()` 在收尾延迟前额外等待的时间。' },
  { name: 'easing', type: 'string', default: `'linear'`, description: 'provider 指示器使用的过渡缓动。' },
  { name: 'speed', type: 'number', default: '200', description: '过渡时长与自动隐藏延迟（毫秒）。' },
  { name: 'trickle', type: 'boolean', default: 'true', description: '`progress.start()` 是否持续自动递增。' },
  { name: 'trickleSpeed', type: 'number', default: '200', description: '自动递增步进之间的延迟。' },
  { name: 'direction', type: `'ltr' | 'rtl'`, default: `'ltr'`, description: '顶部进度条指示器的方向。' },
  { name: 'indeterminate', type: 'boolean', default: 'false', description: '是否以不确定状态渲染 provider。' },
  { name: 'class', type: 'string', default: '-', description: '根容器类名。' },
  { name: 'color', type: `'primary' | 'destructive' | 'success' | 'warning' | 'info' | 'carbon' | 'secondary' | 'accent'`, default: `'primary'`, description: '顶部进度条颜色。' },
  { name: 'size', type: `'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'`, default: `'xs'`, description: '顶部进度条粗细。' },
  { name: 'ui', type: 'Partial<Ui>', default: '{}', description: '为 provider 插槽添加自定义类名。' },
  { name: 'indicatorProps', type: 'ProgressIndicatorProps', default: '{}', description: '传递给内部指示器元素的属性。' },
]"/>

### `SProgressProvider` 插槽

<DataTable preset="slots" :data="[
  { name: 'default', parameters: '-', description: '在 provider 之后渲染的内容。' },
]"/>
