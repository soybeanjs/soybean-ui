<script setup lang="ts">
import { computed } from 'vue';
import { useCardThemeContext } from './context';
import type { CardDescriptionProps } from './types';

defineOptions({
  name: 'CardDescription'
});

const props = defineProps<CardDescriptionProps>();

const themeContext = useCardThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.description, props.class]);
</script>

<template>
  <p v-bind="props" :class="cls">
    <slot />
  </p>
</template>
