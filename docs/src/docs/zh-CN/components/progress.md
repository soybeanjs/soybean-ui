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

## API

<ComponentApi component="progress" />
