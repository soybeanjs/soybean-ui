<script setup lang="ts">
import { computed } from 'vue';
import { breadcrumbVariants, cn } from '@soybean-ui/variants';
import type { BreadcrumbPageProps } from '../types';

defineOptions({
  name: 'SBreadcrumbPage'
});

const { class: cls } = defineProps<BreadcrumbPageProps>();

const { page } = breadcrumbVariants();

const mergedCls = computed(() => cn(page(), cls));
</script>

<template>
  <span role="link" aria-disabled="true" aria-current="page" :class="mergedCls">
    <slot />
  </span>
</template>
