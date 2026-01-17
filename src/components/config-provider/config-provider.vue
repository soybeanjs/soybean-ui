<script setup lang="ts">
import { watch } from 'vue';
import { ConfigProvider } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { isClient, transformPropsToContext } from '@soybeanjs/headless/shared';
import { createShadcnTheme } from '@soybeanjs/shadcn-theme';
import type { ThemeSize } from '@/theme';
import DialogProvider from '../dialog/dialog-provider.vue';
import ToastProvider from '../toast/toast-provider.vue';
import { provideConfigProviderContext } from './context';
import type { ConfigProviderProps } from './types';

defineOptions({
  name: 'SConfigProvider'
});

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  size: 'md',
  dir: 'ltr'
});

const forwardedProps = useOmitProps(props, ['theme', 'size', 'iconify', 'toast']);

provideConfigProviderContext(transformPropsToContext(props));

function addSizeClass(_size: ThemeSize) {
  if (!isClient) return;
  const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  document.documentElement.classList.add(`size-${_size}`);

  const removedSizes = sizes.filter(s => s !== _size).map(s => `size-${s}`);

  document.documentElement.classList.remove(...removedSizes);
}

watch(
  () => props.theme,
  () => {
    createShadcnTheme(props.theme);
  },
  { immediate: true, deep: true, flush: 'post' }
);

watch(
  () => props.size,
  newVal => {
    addSizeClass(newVal);
  },
  { immediate: true, flush: 'post' }
);
</script>

<template>
  <ConfigProvider v-bind="forwardedProps">
    <DialogProvider>
      <ToastProvider v-bind="toast">
        <slot />
      </ToastProvider>
    </DialogProvider>
  </ConfigProvider>
</template>
