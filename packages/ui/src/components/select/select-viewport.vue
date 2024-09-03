<script setup lang="ts">
import { computed } from 'vue';
import { SelectViewport, useForwardProps } from 'radix-vue';
import { cn, selectVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { SelectViewportProps } from './types';

defineOptions({
  name: 'SSelectViewport'
});

const props = defineProps<SelectViewportProps>();

const delegatedProps = computedOmit(props, ['class', 'position']);

const forwardedProps = useForwardProps(delegatedProps);

const cls = computed(() => {
  const { viewport } = selectVariants({ position: props.position });

  return cn(viewport(), props.class);
});
</script>

<template>
  <SelectViewport v-bind="forwardedProps" :class="cls">
    <slot />
  </SelectViewport>
</template>

<style scoped></style>
