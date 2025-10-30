<script setup lang="ts">
import { computed } from 'vue';
import { useListThemeContext } from './context';
import type { ListContentProps } from './types';

defineOptions({
  name: 'ListContent'
});

defineProps<ListContentProps>();

const themeContext = useListThemeContext();

const cls = computed(() => themeContext?.ui?.value?.content);
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
