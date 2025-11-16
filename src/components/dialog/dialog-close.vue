<script setup lang="ts">
import { DialogClose } from '@soybeanjs/headless';
import type { DialogCloseProps } from '@soybeanjs/headless';
import { useSizeContext } from '@/theme';

defineOptions({
  name: 'SDialogClose'
});

defineProps<DialogCloseProps>();

const { size } = useSizeContext('DialogClose');
</script>

<template>
  <DialogClose :size="size" as-child :before-close="beforeClose">
    <slot />
  </DialogClose>
</template>
