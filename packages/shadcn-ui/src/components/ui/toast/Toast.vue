<script setup lang="ts">
import { computed } from 'vue';
import { ToastRoot, type ToastRootEmits, useForwardPropsEmits } from 'radix-vue';
import { cn } from '@ui/lib/utils';
import { type ToastProps, toastVariants } from '.';

const props = defineProps<ToastProps>();

const emit = defineEmits<ToastRootEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emit);
</script>

<template>
  <ToastRoot v-bind="forwarded" :class="cn(toastVariants({ variant }), props.class)" @update:open="onOpenChange">
    <slot />
  </ToastRoot>
</template>
