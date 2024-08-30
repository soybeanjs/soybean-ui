<script setup lang="ts">
import { computed } from 'vue';
import { RadioGroupIndicator, useForwardProps } from 'radix-vue';
import { cn, radioVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { RadioIndicatorProps } from './types';

defineOptions({
  name: 'SRadioIndicator'
});

const props = defineProps<RadioIndicatorProps>();

const delegatedProps = computedOmit(props, ['class']);

const forwarded = useForwardProps(delegatedProps);

const cls = computed(() => {
  const { indicator } = radioVariants();
  return cn(indicator({ color: props.color }), props.class);
});
</script>

<template>
  <RadioGroupIndicator v-bind="forwarded" :class="cls" />
</template>

<style scoped></style>
