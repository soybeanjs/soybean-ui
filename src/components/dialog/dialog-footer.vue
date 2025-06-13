<script setup lang="ts">
import { computed } from 'vue';
import { useDialogThemeContext } from './context';
import type { DialogFooterProps } from './types';

defineOptions({
  name: 'DialogFooter'
});

const props = defineProps<DialogFooterProps>();

const themeContext = useDialogThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.footer, props.class]);
</script>

<template>
  <div v-bind="props" :class="cls">
    <slot />
  </div>
</template>
