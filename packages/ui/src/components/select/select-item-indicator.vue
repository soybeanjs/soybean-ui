<script setup lang="ts">
import { computed } from 'vue';
import { SelectItemIndicator, useForwardProps } from 'radix-vue';
import { Check } from 'lucide-vue-next';
import { cn, selectVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { SelectItemIndicatorProps } from './types';

defineOptions({
  name: 'SSelectItemIndicator'
});

const props = defineProps<SelectItemIndicatorProps>();

const delegatedProps = computedOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);

const cls = computed(() => {
  const { itemIndicator } = selectVariants({ size: props.size });

  return cn(itemIndicator(), props.class);
});
</script>

<template>
  <SelectItemIndicator v-bind="forwardedProps" :class="cls">
    <slot>
      <Check />
    </slot>
  </SelectItemIndicator>
</template>

<style scoped></style>
