<script setup lang="ts">
import { computed } from 'vue';
import { useLayoutThemeContext } from './context';
import type { LayoutTabProps } from './types';

defineOptions({
  name: 'LayoutTab'
});

defineProps<LayoutTabProps>();

const themeContext = useLayoutThemeContext();

const cls = computed(() => themeContext?.ui?.value?.tab);
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
