<script setup lang="ts">
import { computed } from 'vue';
import { SwitchThumb } from 'radix-vue';
import { cn, switchVariants } from '@soybean-ui/variants';
import type { SwitchThumbProps } from './types';

defineOptions({
  name: 'SSwitchThumb'
});

const props = defineProps<SwitchThumbProps>();

const cls = computed(() => {
  const { thumb } = switchVariants({ size: props.size });

  return cn(thumb(), props.class);
});
</script>

<template>
  <SwitchThumb :class="cls">
    <slot />
  </SwitchThumb>
</template>

<style scoped></style>
