<script setup lang="ts">
import { computed } from 'vue';
import { useDialogThemeContext } from './context';
import type { DialogHeaderProps } from './types';

defineOptions({
  name: 'DialogHeader'
});

const props = defineProps<DialogHeaderProps>();

const themeContext = useDialogThemeContext();

const cls = computed(() => themeContext?.ui?.value?.header);
</script>

<template>
  <div v-bind="props" :class="cls">
    <slot />
  </div>
</template>
