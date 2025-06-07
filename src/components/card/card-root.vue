<script setup lang="ts">
import { computed } from 'vue';
import { useCardThemeContext } from './context';
import type { CardRootProps } from './types';

defineOptions({
  name: 'CardRoot'
});

const props = defineProps<CardRootProps>();

const themeContext = useCardThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.root, props.class]);
</script>

<template>
  <div v-bind="props" :class="cls">
    <slot />
  </div>
</template>
