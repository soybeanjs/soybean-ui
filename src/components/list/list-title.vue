<script setup lang="ts">
import { computed } from 'vue';
import { useListThemeContext } from './context';
import type { ListTitleProps } from './types';

defineOptions({
  name: 'ListTitle'
});

defineProps<ListTitleProps>();

const themeContext = useListThemeContext();

const cls = computed(() => themeContext?.ui?.value?.title);
</script>

<template>
  <h3 :class="cls">
    <slot />
  </h3>
</template>
