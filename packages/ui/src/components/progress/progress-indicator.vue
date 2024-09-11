<script setup lang="ts">
import { computed } from 'vue';
import { ProgressIndicator, useForwardProps } from 'radix-vue';
import { cn, progressVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { ProgressIndicatorProps } from './types';

defineOptions({
  name: 'SProgressIndicator'
});

const props = withDefaults(defineProps<ProgressIndicatorProps>(), {
  modelValue: 0
});

const delegatedProps = computedOmit(props, ['class']);

const forwarded = useForwardProps(delegatedProps);

const cls = computed(() => {
  const { indicator } = progressVariants();
  return cn(indicator({ color: props.color }), props.class);
});
</script>

<template>
  <ProgressIndicator
    v-bind="forwarded"
    :class="cls"
    :style="`transform: translateX(-${100 - (props.modelValue ?? 0)}%);`"
  />
</template>

<style scoped></style>
