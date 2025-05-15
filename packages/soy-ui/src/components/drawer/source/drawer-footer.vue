<script setup lang="ts">
import { computed } from 'vue';
import { cn, dialogVariants } from '@soybean-ui/variants';
import type { DrawerFooterProps } from '../types';

defineOptions({
  name: 'SDrawerFooter'
});

const { class: cls, size } = defineProps<DrawerFooterProps>();

const mergedCls = computed(() => {
  const { footer } = dialogVariants({ size });

  return cn(footer(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
