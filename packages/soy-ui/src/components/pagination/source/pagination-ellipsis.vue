<script setup lang="ts">
import { computed } from 'vue';
import { PaginationEllipsis } from '@soybean-ui/primitives';
import { cn, paginationVariants } from '@soybean-ui/variants';
import { MoreHorizontal } from 'lucide-vue-next';
import type { PaginationEllipsisProps } from '../types';

defineOptions({
  name: 'SPaginationEllipsis'
});

const { class: cls, size } = defineProps<PaginationEllipsisProps>();

const mergedCls = computed(() => {
  const { ellipsis } = paginationVariants({ size });

  return cn(ellipsis(), cls);
});
</script>

<template>
  <PaginationEllipsis :class="mergedCls">
    <slot>
      <MoreHorizontal />
    </slot>
  </PaginationEllipsis>
</template>
