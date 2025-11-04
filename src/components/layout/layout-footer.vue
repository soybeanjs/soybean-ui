<script setup lang="ts">
import { computed } from 'vue';
import { useLayoutThemeContext } from './context';
import type { LayoutFooterProps } from './types';

defineOptions({
  name: 'LayoutFooter'
});

defineProps<LayoutFooterProps>();

const theme = useLayoutThemeContext();

const cls = computed(() => theme?.ui?.value?.footer);
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
