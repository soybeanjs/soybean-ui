<script setup lang="ts">
import { computed } from 'vue';
import { SelectLabel, useForwardProps } from 'radix-vue';
import { cn, selectVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { SelectLabelProps } from './types';

defineOptions({
  name: 'SSelectLabel'
});

const props = defineProps<SelectLabelProps>();

const delegatedProps = computedOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);

const cls = computed(() => {
  const { label } = selectVariants({ size: props.size });

  return cn(label(), props.class);
});
</script>

<template>
  <SelectLabel v-bind="forwardedProps" :class="cls">
    <slot />
  </SelectLabel>
</template>

<style scoped></style>
