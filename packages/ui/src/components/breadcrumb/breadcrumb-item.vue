<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { breadcrumbVariants, cn } from '@soybean-ui/variants';
import type { BreadcrumbItemProps } from './types';

defineOptions({
  name: 'SBreadcrumbItem'
});

const { class: cls } = defineProps<BreadcrumbItemProps>();

const { item } = breadcrumbVariants();

const mergedCls = computed(() => cn(item(), cls));
</script>

<template>
  <Primitive as="li" :class="mergedCls">
    <slot />
  </Primitive>
</template>
