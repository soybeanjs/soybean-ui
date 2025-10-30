<script setup lang="ts">
import { computed } from 'vue';
import { useAlertThemeContext } from './context';
import type { AlertDescriptionProps } from './types';

defineOptions({
  name: 'AlertDescription'
});

defineProps<AlertDescriptionProps>();

const themeContext = useAlertThemeContext();

const cls = computed(() => themeContext?.ui?.value?.description);
</script>

<template>
  <p :class="cls">
    <slot />
  </p>
</template>
