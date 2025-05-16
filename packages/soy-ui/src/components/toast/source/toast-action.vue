<script setup lang="ts">
import { computed } from 'vue';
import { ToastAction, useForwardProps } from '@soybean-ui/primitives';
import { cn, toastVariants } from '@soybean-ui/variants';
import { SButton } from '../../button';
import type { ToastActionProps } from '../types';

defineOptions({
  name: 'SToastAction'
});

const { class: cls, altText, size = 'sm', ...delegatedProps } = defineProps<ToastActionProps>();

const { action } = toastVariants();

const forwardedButtonProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => cn(action(), cls));
</script>

<template>
  <ToastAction :class="mergedCls" :alt-text="altText" as-child>
    <SButton v-bind="forwardedButtonProps" :size="size">
      <slot />
    </SButton>
  </ToastAction>
</template>
