<script setup lang="ts">
import { computed } from 'vue';
import { DialogClose } from '@headless';
import type { DialogCloseProps } from '@headless';
import { useDrawerSizeContext } from './context';

defineOptions({
  name: 'SDrawerClose'
});

const props = defineProps<DialogCloseProps>();

const sizeContext = useDrawerSizeContext();

const size = computed(() => sizeContext?.size?.value ?? 'md');
</script>

<template>
  <DialogClose v-bind="props" :size="size" as-child>
    <slot />
  </DialogClose>
</template>
