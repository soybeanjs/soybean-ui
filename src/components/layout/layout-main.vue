<script setup lang="ts">
import { computed } from 'vue';
import { useLayoutThemeContext } from './context';
import type { LayoutMainProps } from './types';

defineOptions({
  name: 'LayoutMain'
});

defineProps<LayoutMainProps>();

const themeContext = useLayoutThemeContext();

const cls = computed(() => themeContext?.ui?.value?.main);
</script>

<template>
  <main :class="cls">
    <slot />
  </main>
</template>
