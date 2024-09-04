<script setup lang="ts">
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

const { itemIndicator } = selectVariants();
</script>

<template>
  <SelectItemIndicator v-bind="forwardedProps" :class="cn(itemIndicator(), props.class)">
    <slot>
      <Check />
    </slot>
  </SelectItemIndicator>
</template>

<style scoped></style>
