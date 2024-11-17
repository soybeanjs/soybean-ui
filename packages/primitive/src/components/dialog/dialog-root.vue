<script setup lang="ts">
import { ref, toRef } from 'vue';
import { provideDialogRootContext } from './context';
import type { DialogRootProps } from './types';

defineOptions({
  name: 'DialogRoot',
  inheritAttrs: false
});

const { defaultOpen = false, modal = true } = defineProps<DialogRootProps>();

const open = defineModel<boolean>('open', {
  default: defaultOpen
});

const triggerElement = ref<HTMLElement>();
const contentElement = ref<HTMLElement>();

provideDialogRootContext({
  open,
  modal: toRef(() => modal),
  triggerElement,
  contentElement
});
</script>

<template>
  <slot :open="open" />
</template>
