<script setup lang="ts">
import { computed } from 'vue';
import { SelectTrigger, useForwardProps } from 'radix-vue';
import { cn, selectVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { SelectTriggerProps } from './types';

defineOptions({
  name: 'SSelectTrigger'
});

const props = defineProps<SelectTriggerProps>();

const delegatedProps = computedOmit(props, ['class', 'size']);

const forwardedProps = useForwardProps(delegatedProps);

const cls = computed(() => {
  const { trigger } = selectVariants({ size: props.size });

  return cn(trigger(), props.class);
});
</script>

<template>
  <SelectTrigger v-bind="forwardedProps" :class="cls">
    <slot />
  </SelectTrigger>
</template>

<style scoped></style>
