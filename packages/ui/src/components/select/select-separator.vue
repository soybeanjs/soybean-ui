<script setup lang="ts">
import { SelectSeparator, useForwardProps } from 'radix-vue';
import { cn, selectVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { SelectSeparatorProps } from './types';

defineOptions({
  name: 'SSelectSeparator'
});

const props = defineProps<SelectSeparatorProps>();

const delegatedProps = computedOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);

const { separator } = selectVariants();
</script>

<template>
  <SelectSeparator v-bind="forwardedProps" :class="cn(separator(), props.class)" />
</template>

<style scoped></style>
