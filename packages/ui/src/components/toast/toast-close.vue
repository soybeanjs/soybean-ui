<script setup lang="ts">
import { computed } from 'vue';
import { ToastClose } from '@soybean-ui/primitive';
import { cn, toastVariants } from '@soybean-ui/variants';
import { X } from 'lucide-vue-next';
import { SButtonIcon } from '../button';
import type { ToastCloseProps } from './types';

defineOptions({
  name: 'SToastClose'
});

const { class: cls } = defineProps<ToastCloseProps>();

const { close } = toastVariants();

const mergedCls = computed(() => cn(close(), cls));
</script>

<template>
  <ToastClose :class="mergedCls" as-child>
    <SButtonIcon size="xs">
      <X />
    </SButtonIcon>
  </ToastClose>
</template>

<style scoped></style>
