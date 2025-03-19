<script setup lang="ts">
import { computed } from 'vue';
import { DialogTitle } from '@soybean-ui/primitives';
import { cn, dialogVariants } from '@soybean-ui/variants';
import type { DialogTitleProps } from './types';

defineOptions({
  name: 'SDialogTitle'
});

const { class: cls } = defineProps<DialogTitleProps>();

const { title } = dialogVariants();

const mergedCls = computed(() => cn(title(), cls));
</script>

<template>
  <DialogTitle :class="mergedCls">
    <slot />
  </DialogTitle>
</template>
