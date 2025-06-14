<script setup lang="ts">
import { computed } from 'vue';
import { DialogClose } from '@headless';
import { useDialogSizeContext } from './context';
import type { DialogCloseProps } from './types';

defineOptions({
  name: 'SDialogClose'
});

const props = defineProps<DialogCloseProps>();

const sizeContext = useDialogSizeContext();

const size = computed(() => sizeContext?.size?.value ?? 'md');
</script>

<template>
  <DialogClose v-bind="props" :size="size" as-child>
    <slot />
  </DialogClose>
</template>
