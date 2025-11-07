<script setup lang="ts">
import { computed } from 'vue';
import type { SelectSeparatorProps } from './types';
import { useSelectThemeContext } from './context';

defineOptions({
  name: 'SelectSeparator'
});

defineProps<SelectSeparatorProps>();

const themeContext = useSelectThemeContext();

const cls = computed(() => themeContext?.ui?.value?.separator);
</script>

<template>
  <div :class="cls" role="separator" aria-orientation="horizontal">
    <slot />
  </div>
</template>
