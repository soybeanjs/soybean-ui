<script setup lang="ts">
import { computed } from 'vue';
import { useLayoutThemeContext } from './context';
import type { LayoutHeaderProps } from './types';

defineOptions({
  name: 'LayoutHeader'
});

defineProps<LayoutHeaderProps>();

const themeContext = useLayoutThemeContext();

const cls = computed(() => themeContext?.ui?.value?.header);
</script>

<template>
  <header :class="cls">
    <slot />
  </header>
</template>
