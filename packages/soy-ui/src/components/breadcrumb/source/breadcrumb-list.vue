<script setup lang="ts">
import { computed } from 'vue';
import { breadcrumbVariants, cn } from '@soybean-ui/variants';
import type { BreadcrumbListProps } from '../types';

defineOptions({
  name: 'SBreadcrumbList'
});

const { class: cls, size } = defineProps<BreadcrumbListProps>();

const mergedCls = computed(() => {
  const { list } = breadcrumbVariants({ size });

  return cn(list(), cls);
});
</script>

<template>
  <ol :class="mergedCls">
    <slot />
  </ol>
</template>
