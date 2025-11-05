<script setup lang="ts">
import { computed } from 'vue';
import Link from '../link/link.vue';
import { useBreadcrumbThemeContext } from './context';
import type { BreadcrumbLinkProps } from './types';

defineOptions({
  name: 'BreadcrumbLink'
});

const props = defineProps<BreadcrumbLinkProps>();

const themeContext = useBreadcrumbThemeContext();

const cls = computed(() => themeContext?.ui?.value?.link);
</script>

<template>
  <Link v-bind="props" :class="cls">
    <slot />
  </Link>
</template>
