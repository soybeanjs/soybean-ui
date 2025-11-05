<script setup lang="ts">
import { computed } from 'vue';
import { useCardThemeContext } from './context';
import type { CardContentProps } from './types';

defineOptions({
  name: 'CardContent'
});

defineProps<CardContentProps>();

const themeContext = useCardThemeContext();

const cls = computed(() => themeContext?.ui?.value?.content);
</script>

<template>
  <div :class="cls" tabindex="-1">
    <slot />
  </div>
</template>
