<script setup lang="ts">
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

const { label } = selectVariants();
</script>

<template>
  <SelectLabel v-bind="forwardedProps" :class="cn(label(), props.class)">
    <slot />
  </SelectLabel>
</template>

<style scoped></style>
