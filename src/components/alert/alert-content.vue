<script setup lang="ts">
import { computed } from 'vue';
import { useAlertThemeContext } from './context';
import type { AlertContentProps } from './types';

defineOptions({
  name: 'AlertContent'
});

defineProps<AlertContentProps>();

const themeContext = useAlertThemeContext();

const cls = computed(() => themeContext?.ui?.value?.content);
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
