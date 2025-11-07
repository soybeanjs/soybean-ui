<script setup lang="ts">
import { computed } from 'vue';
import { useCardThemeContext } from './context';
import type { CardTitleRootProps } from './types';

defineOptions({
  name: 'CardTitleRoot'
});

defineProps<CardTitleRootProps>();

const themeContext = useCardThemeContext();

const cls = computed(() => themeContext?.ui?.value?.titleRoot);
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
