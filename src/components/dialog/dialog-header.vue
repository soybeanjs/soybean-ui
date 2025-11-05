<script setup lang="ts">
import { computed } from 'vue';
import { useDialogThemeContext } from './context';
import type { DialogHeaderProps } from './types';

defineOptions({
  name: 'DialogHeader'
});

defineProps<DialogHeaderProps>();

const themeContext = useDialogThemeContext();

const cls = computed(() => themeContext?.ui?.value?.header);
</script>

<template>
  <div :class="cls">
    <slot />
  </div>
</template>
