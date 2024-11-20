<script lang="ts" setup>
import { computed } from 'vue';
import { useForwardProps } from '@soybean-ui/primitive';
import { Toaster } from 'vue-sonner';
import type { SonnerProps } from './types';

defineOptions({
  name: 'SonnerToaster'
});

const { toastOptions, ...delegatedProps } = defineProps<SonnerProps>();

const forwardedProps = useForwardProps(delegatedProps);

const opts = computed<SonnerProps['toastOptions']>(() => ({
  ...toastOptions,
  unstyled: true
}));
</script>

<template>
  <Toaster v-bind="forwardedProps" :duration :toast-options="opts" />
</template>

<style scoped>
:deep([data-sonner-toaster][data-theme='dark']),
:deep([data-sonner-toaster][data-theme='light']) {
  --normal-bg: hsl(var(--background));
  --normal-border: hsl(var(--border));
  --normal-text: hsl(var(--foreground));
  --border-radius: var(--radius - 2px);
  --success-text: hsl(var(--success));
  --info-text: hsl(var(--info));
  --warning-text: hsl(var(--warning));
  --error-text: hsl(var(--destructive));
  pointer-events: auto;
}

:deep([data-sonner-toast][data-type='success'] [data-icon]) {
  color: var(--success-text);
}
:deep([data-sonner-toast][data-type='info'] [data-icon]) {
  color: var(--info-text);
}
:deep([data-sonner-toast][data-type='warning'] [data-icon]) {
  color: var(--warning-text);
}
:deep([data-sonner-toast][data-type='error'] [data-icon]) {
  color: var(--error-text);
}

:deep([data-sonner-toast]) {
  --uno: flex items-center gap-1.5 w-[var(--width)] p-4 border border-border rounded-md bg-card text-card-foreground shadow-md;
}
:deep([data-sonner-toast][data-expanded='false'][data-front='false'] > *) {
  opacity: 0;
}
:deep([data-sonner-toaster] [data-button]) {
  --uno: inline-flex items-center justify-center h-7 px-2 gap-2 text-sm rounded-md font-medium whitespace-nowrap;
}
:deep([data-sonner-toaster] [data-button]:focus-visible) {
  --uno: shadow-none outline outline-2 outline-offset-2 outline-primary;
}
:deep([data-sonner-toaster] [data-button]:disabled) {
  --uno: pointer-events-none opacity-50;
}
:deep([data-sonner-toaster] [data-button][data-action]) {
  --uno: bg-primary text-primary-foreground;
}
:deep([data-sonner-toaster] [data-button][data-action]:hover) {
  --uno: bg-primary/80;
}
:deep([data-sonner-toaster] [data-button][data-action]:active) {
  --uno: bg-primary-600;
}
:deep([data-sonner-toaster] [data-button][data-cancel]) {
  --uno: border border-border bg-background text-foreground;
}
:deep([data-sonner-toaster] [data-button][data-cancel]:hover) {
  --uno: border-primary text-primary;
}
:deep([data-sonner-toaster] [data-button][data-cancel]:active) {
  --uno: shadow-md;
}
</style>
