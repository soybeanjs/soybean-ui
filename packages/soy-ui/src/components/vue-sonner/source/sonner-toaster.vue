<script lang="ts" setup>
import { computed } from 'vue';
import { useStyleTag } from '@vueuse/core';
import { useForwardProps } from '@soybean-ui/primitives';
import { Toaster } from 'vue-sonner';
import type { SonnerProps } from '../types';

defineOptions({
  name: 'SonnerToaster'
});

const { toastOptions, ...delegatedProps } = defineProps<SonnerProps>();

const forwardedProps = useForwardProps(delegatedProps);

const opts = computed<SonnerProps['toastOptions']>(() => ({
  ...toastOptions,
  unstyled: true
}));

const css = `
[data-sonner-toaster][data-theme='dark'],
[data-sonner-toaster][data-theme='light'] {
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
[data-sonner-toast][data-type='success'] [data-icon] {
  color: var(--success-text);
}
[data-sonner-toast][data-type='info'] [data-icon] {
  color: var(--info-text);
}
[data-sonner-toast][data-type='warning'] [data-icon] {
  color: var(--warning-text);
}
[data-sonner-toast][data-type='error'] [data-icon] {
  color: var(--error-text);
}
[data-sonner-toast] {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  width: var(--width);
  padding: 1rem;
  border: 1px solid hsl(var(--border));
  border-radius: calc(var(--radius) - 2px);
  background-color: hsl(var(--card));
  color: hsl(var(--card-foreground));
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}
[data-sonner-toast][data-expanded='false'][data-front='false'] > * {
  opacity: 0;
}
[data-sonner-toaster] [data-button] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 1.75rem;
  padding: 0 0.75rem;
  gap: 0.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  border-radius: calc(var(--radius) - 2px);
  white-space: nowrap;
}
[data-sonner-toaster] [data-button]:focus-visible {
  box-shadow: none;
  outline-style: solid;
  outline-width: 2px;
  outline-offset: 2px;
  outline-color: hsl(var(--primary));
}
[data-sonner-toaster] [data-button]:disabled {
  pointer-events: none;
  opacity: 0.5;
}
[data-sonner-toaster] [data-button][data-action] {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
[data-sonner-toaster] [data-button][data-action]:hover {
  background-color: hsl(var(--background) / 0.8);
}
[data-sonner-toaster] [data-button][data-action]:active {
  background-color: hsl(var(--primary-600));
}
[data-sonner-toaster] [data-button][data-cancel] {
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
}
[data-sonner-toaster] [data-button][data-cancel]:hover {
  border-color: hsl(var(--primary));
  color: hsl(var(--primary));
}
[data-sonner-toaster] [data-button][data-cancel]:active {
  box-shadow:
    0 4px 6px -1px rgb(0 0 0 / 0.1),
    0 2px 4px -2px rgb(0 0 0 / 0.1);
}
`;

useStyleTag(css, { id: 'sonner-toaster-style' });
</script>

<template>
  <Toaster v-bind="forwardedProps" :duration="duration" :toast-options="opts" />
</template>
