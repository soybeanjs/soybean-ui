<script setup lang="ts">
import { computed } from 'vue';
import { useAlertThemeContext } from './context';
import type { AlertTitleProps } from './types';

defineOptions({
  name: 'AlertTitle'
});

defineProps<AlertTitleProps>();

const themeContext = useAlertThemeContext();

const cls = computed(() => themeContext?.ui?.value?.title);
</script>

<template>
  <h3 :class="cls">
    <slot />
  </h3>
</template>
