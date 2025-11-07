<script setup lang="ts">
import { DialogClose } from '@soybeanjs/headless';
import type { DialogCloseProps } from '@soybeanjs/headless';
import { useSizeContext } from '@/theme';

defineOptions({
  name: 'SDrawerClose'
});

defineProps<DialogCloseProps>();

const { size } = useSizeContext('DrawerClose');
</script>

<template>
  <DialogClose :size="size" as-child>
    <slot />
  </DialogClose>
</template>
