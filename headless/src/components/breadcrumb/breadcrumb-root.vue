<script setup lang="ts">
import { useBreadcrumbUi } from './context';
import type { BreadcrumbRootProps } from './types';

defineOptions({
  name: 'BreadcrumbRoot'
});

defineProps<BreadcrumbRootProps>();

const cls = useBreadcrumbUi('root');
</script>

<template>
  <nav :class="cls" aria-label="breadcrumb">
    <slot />
  </nav>
</template>
