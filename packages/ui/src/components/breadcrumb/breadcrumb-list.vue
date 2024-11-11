<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'reka-ui';
import { breadcrumbVariants, cn } from '@soybean-ui/variants';
import type { BreadcrumbListProps } from './types';

defineOptions({
  name: 'SBreadcrumbList'
});

const { class: cls } = defineProps<BreadcrumbListProps>();

const { list } = breadcrumbVariants();

const mergedCls = computed(() => cn(list(), cls));
</script>

<template>
  <Primitive as="ol" :class="mergedCls">
    <slot />
  </Primitive>
</template>

<style scoped></style>
