<script setup lang="ts">
import { computed } from 'vue';
import { useToastThemeContext } from './context';
import type { ToastTitleProps } from './types';

defineOptions({
  name: 'ToastTitle'
});

defineProps<ToastTitleProps>();

const themeContext = useToastThemeContext();

const cls = computed(() => themeContext?.ui?.value?.title);
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
