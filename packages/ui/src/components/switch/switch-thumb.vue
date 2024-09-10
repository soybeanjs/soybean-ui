<script setup lang="ts">
import { computed } from 'vue';
import { cn, switchVariants } from '@soybean-ui/variants';
import { SwitchThumb } from 'radix-vue';
import type { SwitchThumbProps } from './types';

defineOptions({
  name: 'SSwitchThumb'
});

const props = defineProps<SwitchThumbProps>();

const cls = computed(() => {
  const { thumb } = switchVariants();

  return cn(thumb({ size: props.size, round: props.round }), props.class);
});
</script>

<template>
  <SwitchThumb :class="cls">
    <slot />
  </SwitchThumb>
</template>

<style lang="scss" scoped></style>
