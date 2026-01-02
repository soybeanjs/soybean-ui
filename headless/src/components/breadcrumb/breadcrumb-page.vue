<script setup lang="ts">
import { useBreadcrumbUi } from './context';
import type { BreadcrumbPageProps } from './types';

defineOptions({
  name: 'BreadcrumbPage'
});

defineProps<BreadcrumbPageProps>();

const cls = useBreadcrumbUi('page');
</script>

<template>
  <span :class="cls" role="link" aria-disabled="true" aria-current="page">
    <slot />
  </span>
</template>
