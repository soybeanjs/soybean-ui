<script setup lang="ts">
import { computed } from 'vue';
import { useToastThemeContext } from './context';
import type { ToastDescriptionProps } from './types';

defineOptions({
  name: 'ToastDescription'
});

defineProps<ToastDescriptionProps>();

const themeContext = useToastThemeContext();

const cls = computed(() => themeContext?.ui?.value?.description);
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
