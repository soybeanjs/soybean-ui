<script lang="ts" setup>
import { computed } from 'vue';
import { useForwardProps } from 'radix-vue';
import { Toaster } from 'vue-sonner';
import { cn, sonnerVariants } from '@soybean-ui/variants';
import type { SonnerProps } from './types';

defineOptions({
  name: 'SSonnerProvider'
});

const { class: cls, richColors = true, toastOptions, ...delegatedProps } = defineProps<SonnerProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => cn(sonnerVariants(), cls));

const opts = computed<SonnerProps['toastOptions']>(() => ({
  ...toastOptions,
  unstyled: true
}));
</script>

<template>
  <Toaster v-bind="forwardedProps" :class="mergedCls" :rich-colors :toast-options="opts" />
</template>

<style scoped>
:deep([data-sonner-toaster][data-theme='dark']),
:deep([data-sonner-toaster][data-theme='light']) {
  --normal-bg: hsl(var(--background));
  --normal-border: hsl(var(--border));
  --normal-text: hsl(var(--foreground));
  --border-radius: var(--radius - 2px);
  --success-bg: hsl(var(--success-100));
  --success-border: hsl(var(--success-200));
  --success-text: hsl(var(--success));
  --info-bg: hsl(var(--info-100));
  --info-border: hsl(var(--info-200));
  --info-text: hsl(var(--info));
  --warning-bg: hsl(var(--warning-100));
  --warning-border: hsl(var(--warning-200));
  --warning-text: hsl(var(--warning));
  --error-bg: hsl(var(--destructive-100));
  --error-border: hsl(var(--destructive-200));
  --error-text: hsl(var(--destructive));
}
</style>
