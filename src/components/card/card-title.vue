<script setup lang="ts">
import { computed } from 'vue';
import { useCardThemeContext } from './context';
import type { CardTitleProps } from './types';

defineOptions({
  name: 'CardTitle'
});

const props = defineProps<CardTitleProps>();

const themeContext = useCardThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.title, props.class]);
</script>

<template>
  <h3 v-bind="props" :class="cls">
    <slot />
  </h3>
</template>
