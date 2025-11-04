<script setup lang="ts">
import { computed } from 'vue';
import { useLayoutThemeContext } from './context';
import type { LayoutMainProps } from './types';

defineOptions({
  name: 'LayoutMain'
});

defineProps<LayoutMainProps>();

const theme = useLayoutThemeContext();

const cls = computed(() => theme?.ui?.value?.main);
</script>

<template>
  <main :class="cls">
    <slot />
  </main>
</template>
