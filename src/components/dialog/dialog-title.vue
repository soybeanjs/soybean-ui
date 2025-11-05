<script setup lang="ts">
import { computed } from 'vue';
import { useDialogRootContext, useDialogThemeContext } from './context';
import type { DialogTitleProps } from './types';

defineOptions({
  name: 'DialogTitle'
});

defineProps<DialogTitleProps>();

const { titleId, initTitleId } = useDialogRootContext('DialogTitle');

const themeContext = useDialogThemeContext();

const cls = computed(() => themeContext?.ui?.value?.title);

initTitleId();
</script>

<template>
  <h2 :id="titleId" :class="cls">
    <slot />
  </h2>
</template>
