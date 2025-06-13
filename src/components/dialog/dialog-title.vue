<script setup lang="ts">
import { computed } from 'vue';
import { useDialogRootContext, useDialogThemeContext } from './context';
import type { DialogTitleProps } from './types';

defineOptions({
  name: 'DialogTitle'
});

const props = defineProps<DialogTitleProps>();

const { titleId, initTitleId } = useDialogRootContext('DialogTitle');

const themeContext = useDialogThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.title, props.class]);

initTitleId();
</script>

<template>
  <h2 v-bind="props" :id="titleId" :class="cls">
    <slot />
  </h2>
</template>
