<script setup lang="ts">
import { DialogClose } from '@headless';
import type { DialogCloseProps } from '@headless';
import { useSizeContext } from '@theme';

defineOptions({
  name: 'SDrawerClose'
});

const props = defineProps<DialogCloseProps>();

const { size } = useSizeContext('DrawerClose');
</script>

<template>
  <DialogClose v-bind="props" :size="size" as-child>
    <slot />
  </DialogClose>
</template>
