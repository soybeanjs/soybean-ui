<script setup lang="ts">
import { computed } from 'vue';
import { DialogDescription } from '@soybean-ui/primitive';
import { cn, dialogVariants } from '@soybean-ui/variants';
import type { DialogDescriptionProps } from './types';

defineOptions({
  name: 'SDialogDescription'
});

const { class: cls } = defineProps<DialogDescriptionProps>();

const { description } = dialogVariants();

const mergedCls = computed(() => cn(description(), cls));
</script>

<template>
  <DialogDescription :class="mergedCls">
    <slot />
  </DialogDescription>
</template>

<style scoped></style>
