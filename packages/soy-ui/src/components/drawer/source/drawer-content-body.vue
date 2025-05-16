<script setup lang="ts">
import { computed } from 'vue';
import { cn, drawerVariants } from '@soybean-ui/variants';
import type { DrawerContentBodyProps } from '../types';

defineOptions({
  name: 'SDrawerContentBody'
});

const { class: cls, size } = defineProps<DrawerContentBodyProps>();

const mergedCls = computed(() => {
  const { contentBody } = drawerVariants({ size });

  return cn(contentBody(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
