<script setup lang="ts">
import { computed } from 'vue';
import { useSeparatorThemeContext } from './context';
import type { SeparatorLabelProps } from './types';

defineOptions({
  name: 'SeparatorLabel'
});

defineProps<SeparatorLabelProps>();

const themeContext = useSeparatorThemeContext();

const cls = computed(() => themeContext?.ui?.value?.label);
</script>

<template>
  <span :class="cls">
    <slot />
  </span>
</template>
