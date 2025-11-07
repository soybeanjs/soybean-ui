<script setup lang="ts">
import { computed } from 'vue';
import { useListThemeContext } from './context';
import type { ListRootProps } from './types';

defineOptions({
  name: 'ListRoot'
});

defineProps<ListRootProps>();

const themeContext = useListThemeContext();

const cls = computed(() => themeContext?.ui?.value?.root);
</script>

<template>
  <ul :class="cls">
    <slot />
  </ul>
</template>
