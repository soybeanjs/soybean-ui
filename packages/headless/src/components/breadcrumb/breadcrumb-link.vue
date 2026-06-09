<script setup lang="ts">
import Link from '../link/link.vue';
import { useBreadcrumbUi } from './context.js';
import type { BreadcrumbLinkProps } from './types.js';

defineOptions({
  name: 'BreadcrumbLink'
});

const props = defineProps<BreadcrumbLinkProps>();

const cls = useBreadcrumbUi('link');
</script>

<template>
  <Link v-slot="slotProps" v-bind="props" data-soybean-breadcrumb-link :class="cls">
    <slot v-bind="slotProps" />
  </Link>
</template>
