<script setup lang="ts">
import { computed } from 'vue';
import { useDialogRootContext, useDialogThemeContext } from './context';
import type { DialogDescriptionProps } from './types';

defineOptions({
  name: 'DialogDescription'
});

defineProps<DialogDescriptionProps>();

const { descriptionId, initDescriptionId } = useDialogRootContext('DialogDescription');

const themeContext = useDialogThemeContext();

const cls = computed(() => themeContext?.ui?.value?.description);

initDescriptionId();
</script>

<template>
  <p :id="descriptionId" :class="cls">
    <slot />
  </p>
</template>
