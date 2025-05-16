<script setup lang="ts">
import { computed } from 'vue';
import { cn, layoutVariants } from '@soybean-ui/variants';
import type { LayoutMainProps } from '../types';

defineOptions({
  name: 'SLayoutMain'
});

const { class: cls, variant, collapsible } = defineProps<LayoutMainProps>();

const mergedCls = computed(() => {
  const { main } = layoutVariants({ variant, collapsible });

  return cn(main(), cls);
});
</script>

<template>
  <main :class="mergedCls">
    <slot />
  </main>
</template>
