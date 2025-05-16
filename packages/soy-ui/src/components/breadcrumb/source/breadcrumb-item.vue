<script setup lang="ts">
import { computed } from 'vue';
import { breadcrumbVariants, cn } from '@soybean-ui/variants';
import type { BreadcrumbItemProps } from '../types';

defineOptions({
  name: 'SBreadcrumbItem'
});

const { class: cls, size } = defineProps<BreadcrumbItemProps>();

const mergedCls = computed(() => {
  const { item } = breadcrumbVariants({ size });

  return cn(item(), cls);
});
</script>

<template>
  <li :class="mergedCls">
    <slot />
  </li>
</template>
