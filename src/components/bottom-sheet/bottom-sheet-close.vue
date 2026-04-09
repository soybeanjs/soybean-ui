<script setup lang="ts">
import { DialogClose } from '@soybeanjs/headless';
import type { DialogCloseProps } from '@soybeanjs/headless';
import { useSizeContext } from '@/theme';

defineOptions({
  name: 'SBottomSheetClose'
});

defineProps<DialogCloseProps>();

const { size } = useSizeContext('BottomSheetClose');
</script>

<template>
  <DialogClose :size="size" as-child>
    <slot />
  </DialogClose>
</template>
