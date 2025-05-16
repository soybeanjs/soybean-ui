<script setup lang="ts">
import { computed } from 'vue';
import { DialogContent, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, sheetVariants } from '@soybean-ui/variants';
import type { SheetContentEmits, SheetContentProps } from '../types';

defineOptions({
  name: 'SSheetContent'
});

const { class: cls, side, ...delegatedProps } = defineProps<SheetContentProps>();

const emit = defineEmits<SheetContentEmits>();

const forwardedContent = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { content } = sheetVariants({ side });

  return cn(content(), cls);
});
</script>

<template>
  <DialogContent v-bind="forwardedContent" :class="mergedCls">
    <slot />
  </DialogContent>
</template>
