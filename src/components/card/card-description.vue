<script setup lang="ts">
import { computed } from 'vue';
import { useCardThemeContext } from './context';
import type { CardDescriptionProps } from './types';

defineOptions({
  name: 'CardDescription'
});

defineProps<CardDescriptionProps>();

const themeContext = useCardThemeContext();

const cls = computed(() => themeContext?.ui?.value?.description);
</script>

<template>
  <p :class="cls">
    <slot />
  </p>
</template>
