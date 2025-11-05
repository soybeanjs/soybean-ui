<script setup lang="ts">
import { computed } from 'vue';
import { useCardThemeContext } from './context';
import type { CardTitleProps } from './types';

defineOptions({
  name: 'CardTitle'
});

defineProps<CardTitleProps>();

const themeContext = useCardThemeContext();

const cls = computed(() => themeContext?.ui?.value?.title);
</script>

<template>
  <h3 :class="cls">
    <slot />
  </h3>
</template>
