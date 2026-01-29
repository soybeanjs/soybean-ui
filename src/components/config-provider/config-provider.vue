<script setup lang="ts">
import { shallowRef, watch, watchEffect } from 'vue';
import { ConfigProvider, Primitive } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { isClient, transformPropsToContext } from '@soybeanjs/headless/shared';
import { createShadcnTheme } from '@soybeanjs/shadcn-theme';
import type { ThemeSize } from '@/theme';
import { themeSizes } from '@/constants/common';
import DialogProvider from '../dialog/dialog-provider.vue';
import ToastProvider from '../toast/toast-provider.vue';
import { provideConfigProviderContext } from './context';
import type { ConfigProviderProps } from './types';

defineOptions({
  name: 'SConfigProvider'
});

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  theme: () => ({}),
  size: 'md',
  dir: 'ltr',
  iconify: () => ({
    width: '1.25em',
    height: '1.25em'
  })
});

const forwardedProps = useOmitProps(props, ['theme', 'size', 'iconify', 'toast']);

provideConfigProviderContext(transformPropsToContext(props));

const cssVars = shallowRef('');

const { getCss } = createShadcnTheme(props.theme);

function addSizeClass(size: ThemeSize) {
  if (!isClient) return;
  document.documentElement.classList.add(`size-${size}`);
  const removes = themeSizes.filter(s => s !== size).map(s => `size-${s}`);
  document.documentElement.classList.remove(...removes);
}

watch(
  () => props.size,
  newVal => {
    addSizeClass(newVal);
  },
  { immediate: true, flush: 'sync' }
);

watchEffect(() => {
  const theme = props.theme || {};
  cssVars.value = getCss(theme, theme.radius);
});
</script>

<template>
  <ConfigProvider v-bind="forwardedProps">
    <Primitive id="__SOYBEAN_UI_THEME_VARS__" as="style">
      {{ cssVars }}
    </Primitive>
    <DialogProvider>
      <ToastProvider v-bind="toast">
        <slot />
      </ToastProvider>
    </DialogProvider>
  </ConfigProvider>
</template>
