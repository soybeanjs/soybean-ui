<script setup lang="ts">
import { computed } from 'vue';
import { PaginationList } from '@soybean-ui/primitives';
import { cn, paginationVariants } from '@soybean-ui/variants';
import type { PaginationListProps } from '../types';

defineOptions({
  name: 'SPaginationList'
});

const { class: cls, size } = defineProps<PaginationListProps>();

const mergedCls = computed(() => {
  const { list } = paginationVariants({ size });

  return cn(list(), cls);
});
</script>

<template>
  <PaginationList v-slot="{ items }" :class="mergedCls">
    <slot :items="items" />
  </PaginationList>
</template>
