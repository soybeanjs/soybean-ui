<script setup lang="ts">
import { computed } from 'vue';
import { useCardThemeContext } from './context';
import type { CardRootProps } from './types';

defineOptions({
  name: 'CardRoot'
});

defineProps<CardRootProps>();

const themeContext = useCardThemeContext();

const cls = computed(() => themeContext?.ui?.value?.root);
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
