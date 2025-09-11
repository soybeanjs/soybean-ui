<script setup lang="ts">
import { computed } from 'vue';
import { useCardThemeContext } from './context';
import type { CardFooterProps } from './types';

defineOptions({
  name: 'CardFooter'
});

const props = defineProps<CardFooterProps>();

const themeContext = useCardThemeContext();

const cls = computed(() => themeContext?.ui?.value?.footer);
</script>

<template>
  <div v-bind="props" :class="cls">
    <slot />
  </div>
</template>
