<script setup lang="ts">
import { computed } from 'vue';
import { useDialogThemeContext } from './context';
import type { DialogFooterProps } from './types';

defineOptions({
  name: 'DialogFooter'
});

defineProps<DialogFooterProps>();

const themeContext = useDialogThemeContext();

const cls = computed(() => themeContext?.ui?.value?.footer);
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
