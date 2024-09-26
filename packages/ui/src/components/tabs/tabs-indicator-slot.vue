<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'radix-vue';
import { cn, tabsVariants } from '@soybean-ui/variants';
import type { TabsIndicatorSlotProps } from './types';

defineOptions({
  name: 'STabsIndicatorSlot'
});

const { class: cls } = defineProps<TabsIndicatorSlotProps>();

const mergedCls = computed(() => {
  const { indicatorSlot } = tabsVariants();

  return cn(indicatorSlot(), cls);
});
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
