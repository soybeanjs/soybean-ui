<script setup lang="ts">
import { computed } from 'vue';
import { TabsList } from 'radix-vue';
import { cn, tabsVariants } from '@soybean-ui/variants';
import type { TabsListProps } from './types';

defineOptions({
  name: 'STabsList'
});

const { class: cls, orientation, loop } = defineProps<TabsListProps>();

const mergedCls = computed(() => {
  const { list } = tabsVariants({ orientation });

  return cn(list(), cls);
});
</script>

<template>
  <TabsList :class="mergedCls" :loop>
    <slot />
  </TabsList>
</template>

<style scoped></style>
