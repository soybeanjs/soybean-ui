<script setup lang="ts">
import { DialogClose } from '@headless';
import type { DialogCloseProps } from '@headless';
import { useSizeContext } from '@theme';

defineOptions({
  name: 'SDialogClose'
});

defineProps<DialogCloseProps>();

const { size } = useSizeContext('DialogClose');
</script>

<template>
  <DialogClose :size="size" as-child>
    <slot />
  </DialogClose>
</template>
