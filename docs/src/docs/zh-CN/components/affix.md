# Affix

## 概述

Affix 可以在页面或自定义滚动容器滚动时，将内容固定在顶部或底部边缘。

> 注意：除了 SAffix，headless 层现在还导出了用于默认占位/内容结构组合的 AffixCompact，同时也保留了 AffixRoot、AffixPlaceholder、AffixContent 和 provideAffixUi，便于完全自定义组合与样式注入。

## 用法

```vue
<script setup lang="ts">
import { SAffix, SButton } from '@soybeanjs/ui';
</script>

<template>
  <SAffix :offset-top="24">
    <SButton>返回顶部</SButton>
  </SAffix>
</template>
```

## 演示

```playground
basic
target
offset-bottom
custom-styling
```

## API

<ComponentApi component="affix" />

## Headless 组合

当默认的占位/内容结构已经满足需求时，可以直接从 `@soybeanjs/headless/affix` 使用 `AffixCompact`。如果你需要分别控制根节点、占位节点和内容节点，则可以直接组合 headless 原语组件：

```vue
<script setup lang="ts">
import { computed } from 'vue';
import { AffixContent, AffixPlaceholder, AffixRoot, provideAffixUi } from '@soybeanjs/headless';

const ui = computed(() => ({
  content: 'data-[state=fixed]:z-50'
}));

provideAffixUi(ui);
</script>

<template>
  <AffixRoot :offset-top="24">
    <AffixPlaceholder />
    <AffixContent>
      <button type="button">返回顶部</button>
    </AffixContent>
  </AffixRoot>
</template>
```
