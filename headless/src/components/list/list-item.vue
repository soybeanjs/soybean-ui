<script setup lang="ts">
import { computed } from 'vue';
import { useListThemeContext } from './context';
import type { ListItemProps } from './types';

defineOptions({
  name: 'ListItem'
});

defineProps<ListItemProps>();

const themeContext = useListThemeContext();

const cls = computed(() => themeContext?.ui?.value?.item);
</script>

<template>
  <li :class="cls">
    <slot />
  </li>
</template>
