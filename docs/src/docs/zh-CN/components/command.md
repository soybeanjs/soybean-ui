# 命令面板

## 概述

用于快速搜索与执行命令的命令面板组件。

## 用法

```vue
<script setup lang="ts">
import { SCommand } from '@soybeanjs/ui';

const items = [
  { label: 'Profile', value: 'profile', icon: 'lucide:user' },
  { label: 'Settings', value: 'settings', icon: 'lucide:settings' },
  { separator: true },
  { label: 'Logout', value: 'logout', icon: 'lucide:log-out' }
];
</script>

<template>
  <SCommand :items="items" placeholder="Type a command..." />
</template>
```

> `SCommand` 现在会把过滤、分组条目聚合与默认条目组合逻辑委托给 headless `CommandCompact`。如果需要无样式、数据驱动的组合入口，可从 `@soybeanjs/headless/command` 直接导入 `CommandCompact`。

## 演示

```playground
base
dialog
```

## API

<ComponentApi component="command" />
