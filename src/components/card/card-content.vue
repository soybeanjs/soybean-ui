<script setup lang="ts">
import { computed } from 'vue';
import { useCardThemeContext } from './context';
import type { CardContentProps } from './types';

defineOptions({
  name: 'SCardContent'
});

const props = defineProps<CardContentProps>();

const themeContext = useCardThemeContext();

const cls = computed(() => themeContext?.ui?.value?.content);
</script>

<template>
  <div v-bind="props" :class="cls">
    <slot />
  </div>
</template>
