<script setup lang="ts">
import { computed } from 'vue';
import { SelectItem, useForwardProps } from '@soybean-ui/primitives';
import { cn, selectVariants } from '@soybean-ui/variants';
import type { SelectItemProps } from '../types';

defineOptions({
  name: 'SSelectItem'
});

const { class: cls, size, ...delegatedProps } = defineProps<SelectItemProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { item } = selectVariants({ size });

  return cn(item(), cls);
});
</script>

<template>
  <SelectItem v-bind="forwardedProps" :class="mergedCls">
    <slot />
  </SelectItem>
</template>
