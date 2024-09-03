<script setup lang="ts">
import { SelectItem, useForwardProps } from 'radix-vue';
import { cn, selectVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { SelectItemProps } from './types';

defineOptions({
  name: 'SSelectItem'
});

const props = defineProps<SelectItemProps>();

const delegatedProps = computedOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);

const { item } = selectVariants();
</script>

<template>
  <SelectItem v-bind="forwardedProps" :class="cn(item(), props.class)">
    <slot />
  </SelectItem>
</template>

<style scoped></style>
