<script setup lang="ts">
import { computed } from 'vue';
import { ToastClose } from '@soybean-ui/primitives';
import { cn, toastVariants } from '@soybean-ui/variants';
import { X } from 'lucide-vue-next';
import { SButtonIcon } from '../../button';
import type { ToastCloseProps } from '../types';

defineOptions({
  name: 'SToastClose'
});

const { class: cls, size } = defineProps<ToastCloseProps>();

const mergedCls = computed(() => {
  const { close } = toastVariants({ size });

  return cn(close(), cls);
});
</script>

<template>
  <ToastClose :class="mergedCls" as-child>
    <SButtonIcon fit-content>
      <X />
    </SButtonIcon>
  </ToastClose>
</template>
