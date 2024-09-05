<script setup lang="ts">
import { computed } from 'vue';
import { SelectItem, useForwardProps } from 'radix-vue';
import { cn, selectVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { SelectItemProps } from './types';

defineOptions({
  name: 'SSelectItem'
});

const props = defineProps<SelectItemProps>();

const delegatedProps = computedOmit(props, ['class', 'size']);

const forwardedProps = useForwardProps(delegatedProps);

const cls = computed(() => {
  const { item } = selectVariants({ size: props.size });

  return cn(item(), props.class);
});
</script>

<template>
  <SelectItem v-bind="forwardedProps" :class="cls">
    <slot />
  </SelectItem>
</template>

<style scoped></style>
