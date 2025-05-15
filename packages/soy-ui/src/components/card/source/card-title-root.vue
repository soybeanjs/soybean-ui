<script setup lang="ts">
import { computed } from 'vue';
import { cardVariants, cn } from '@soybean-ui/variants';
import type { CardTitleRootProps } from '../types';

defineOptions({
  name: 'SCardTitleRoot'
});

const { class: cls, size } = defineProps<CardTitleRootProps>();

const mergedCls = computed(() => {
  const { titleRoot } = cardVariants({ size });

  return cn(titleRoot(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot name="leading" />
    <slot />
    <slot name="trailing" />
  </div>
</template>
