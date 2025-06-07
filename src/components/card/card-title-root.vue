<script setup lang="ts">
import { computed } from 'vue';
import { useCardThemeContext } from './context';
import type { CardTitleRootProps } from './types';

defineOptions({
  name: 'CardTitleRoot'
});

const props = defineProps<CardTitleRootProps>();

const themeContext = useCardThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.titleRoot, props.class]);
</script>

<template>
  <div v-bind="props" :class="cls">
    <slot />
  </div>
</template>
