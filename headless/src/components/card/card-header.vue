<script setup lang="ts">
import { computed } from 'vue';
import { useCardThemeContext } from './context';
import type { CardHeaderProps } from './types';

defineOptions({
  name: 'CardHeader'
});

defineProps<CardHeaderProps>();

const themeContext = useCardThemeContext();

const cls = computed(() => themeContext?.ui?.value?.header);
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
