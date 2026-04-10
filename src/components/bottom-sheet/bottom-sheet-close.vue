<script setup lang="ts">
import { DialogClose } from '@soybeanjs/headless';
import type { DialogCloseProps } from '@soybeanjs/headless';
import { useSizeContext } from '@/theme';

defineOptions({
  name: 'SBottomSheetClose'
});

const props = defineProps<DialogCloseProps>();

const { size } = useSizeContext('BottomSheetClose');
</script>

<template>
  <DialogClose v-bind="props" :size="size" as-child>
    <slot />
  </DialogClose>
</template>
