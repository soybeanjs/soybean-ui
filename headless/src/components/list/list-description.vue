<script setup lang="ts">
import { computed } from 'vue';
import { useListThemeContext } from './context';
import type { ListDescriptionProps } from './types';

defineOptions({
  name: 'ListDescription'
});

defineProps<ListDescriptionProps>();

const themeContext = useListThemeContext();

const cls = computed(() => themeContext?.ui?.value?.description);
</script>

<template>
  <p :class="cls">
    <slot />
  </p>
</template>
