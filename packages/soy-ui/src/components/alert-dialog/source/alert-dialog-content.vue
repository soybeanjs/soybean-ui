<script setup lang="ts">
import { computed } from 'vue';
import { AlertDialogContent, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, dialogVariants } from '@soybean-ui/variants';
import type { AlertDialogContentEmits, AlertDialogContentProps } from '../types';

defineOptions({
  name: 'SAlertDialogContent'
});

const { class: cls, size, ...delegatedProps } = defineProps<AlertDialogContentProps>();

const emit = defineEmits<AlertDialogContentEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { content } = dialogVariants({ size });

  return cn(content(), cls);
});
</script>

<template>
  <AlertDialogContent v-bind="forwarded" :class="mergedCls">
    <slot />
  </AlertDialogContent>
</template>
