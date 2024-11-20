<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { breadcrumbVariants, cn } from '@soybean-ui/variants';
import type { BreadcrumbRootProps } from './types';

defineOptions({
  name: 'SBreadcrumbRoot'
});

const { class: cls, size } = defineProps<BreadcrumbRootProps>();

const mergedCls = computed(() => {
  const { root } = breadcrumbVariants({ size });

  return cn(root(), cls);
});
</script>

<template>
  <Primitive as="nav" aria-label="breadcrumb" :class="mergedCls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
