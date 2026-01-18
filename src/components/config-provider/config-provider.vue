<script setup lang="ts">
import { watch, watchEffect } from 'vue';
import { useStorage, useStyleTag } from '@vueuse/core';
import { ConfigProvider } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { isClient, transformPropsToContext } from '@soybeanjs/headless/shared';
import { createShadcnTheme } from '@soybeanjs/shadcn-theme';
import type { ThemeOptions } from '@soybeanjs/shadcn-theme';
import type { ThemeSize } from '@/theme';
import DialogProvider from '../dialog/dialog-provider.vue';
import ToastProvider from '../toast/toast-provider.vue';
import { provideConfigProviderContext } from './context';
import type { ConfigProviderProps } from './types';

defineOptions({
  name: 'SConfigProvider'
});

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  theme: () =>
    ({
      base: 'gray',
      primary: 'indigo',
      feedback: 'classic',
      radius: '0.625rem'
    }) satisfies ThemeOptions,
  size: 'md',
  dir: 'ltr'
});

const forwardedProps = useOmitProps(props, ['theme', 'size', 'iconify', 'toast']);

provideConfigProviderContext(transformPropsToContext(props));

const { getCss } = createShadcnTheme(props.theme);

const cssVars = useStorage('themeCssVars', getCss(props.theme, props.theme.radius));

useStyleTag(cssVars, { id: '__SOYBEAN_UI_THEME_VARS__' });

function addSizeClass(_size: ThemeSize) {
  if (!isClient) return;
  const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  document.documentElement.classList.add(`size-${_size}`);

  const removedSizes = sizes.filter(s => s !== _size).map(s => `size-${s}`);

  document.documentElement.classList.remove(...removedSizes);
}

watch(
  () => props.size,
  newVal => {
    addSizeClass(newVal);
  },
  { immediate: true, flush: 'post' }
);

watchEffect(() => {
  const theme = props.theme || {};
  cssVars.value = getCss(theme, theme.radius);
});
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
