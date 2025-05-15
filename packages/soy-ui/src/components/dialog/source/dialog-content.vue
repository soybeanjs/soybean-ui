<script setup lang="ts">
import { computed } from 'vue';
import { DialogContent, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, dialogVariants } from '@soybean-ui/variants';
import type { DialogContentEmits, DialogContentProps } from '../types';

defineOptions({
  name: 'SDialogContent'
});

const { class: cls, size, ...delegatedProps } = defineProps<DialogContentProps>();

const emit = defineEmits<DialogContentEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { content } = dialogVariants({ size });

  return cn(content(), cls);
});
</script>

<template>
  <DialogContent v-bind="forwarded" :class="mergedCls">
    <slot />
  </DialogContent>
</template>
