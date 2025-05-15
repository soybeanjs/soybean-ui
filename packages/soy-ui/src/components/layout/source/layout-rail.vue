<script setup lang="ts">
import { computed } from 'vue';
import { cn, layoutVariants } from '@soybean-ui/variants';
import type { LayoutRailProps } from '../types';

defineOptions({
  name: 'SLayoutRail'
});

const { class: cls, side, variant, collapsible } = defineProps<LayoutRailProps>();

const mergedCls = computed(() => {
  const { rail } = layoutVariants({ side, variant, collapsible });

  return cn(rail(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
