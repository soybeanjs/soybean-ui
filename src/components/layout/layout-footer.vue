<script setup lang="ts">
import { computed } from 'vue';
import { useLayoutThemeContext } from './context';
import type { LayoutFooterProps } from './types';

defineOptions({
  name: 'LayoutFooter'
});

defineProps<LayoutFooterProps>();

const themeContext = useLayoutThemeContext();

const cls = computed(() => themeContext?.ui?.value?.footer);
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
