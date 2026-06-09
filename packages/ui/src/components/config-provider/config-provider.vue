<script setup lang="ts">
import { h, shallowRef, watch, watchEffect } from 'vue';
import { useStyleTag } from '@vueuse/core';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { ConfigProvider } from '@soybeanjs/headless/config-provider';
import { isClient, transformPropsToContext } from '@soybeanjs/headless/shared';
import { createShadcnTheme } from '@soybeanjs/shadcn-theme';
import { themeSizeMap } from '@/theme';
import DialogProvider from '../dialog/dialog-provider.vue';
import Icon from '../icon/icon.vue';
import type { IconValue } from '../icon/types.js';
import ProgressProvider from '../progress/progress-provider.vue';
import ToastProvider from '../toast/toast-provider.vue';
import { provideConfigProviderContext } from './context.js';
import type { ConfigProviderProps } from './types.js';

defineOptions({
  name: 'SConfigProvider'
});

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  theme: () => ({}),
  size: 'md',
  iconify: () => ({
    width: '1.25em',
    height: '1.25em'
  })
});

const forwardedProps = useOmitProps(props, [
  'iconRender',
  'theme',
  'size',
  'iconify',
  'progress',
  'toast',
  'customToast'
]);

const iconRender = props.iconRender ?? ((icon: IconValue) => h(Icon, { icon, ssr: import.meta.env.SSR }));

provideConfigProviderContext({
  ...transformPropsToContext(props),
  iconRender
});

const css = shallowRef('');

const generateCss = () => {
  const { getCss } = createShadcnTheme(props.theme);
  const value = getCss(props.theme, props.theme.radius);
  css.value = value;
};

useStyleTag(css, {
  id: '__SoybeanUI_theme'
});

watchEffect(
  () => {
    if (!isClient) return;
    const size = props.size ?? 'md';
    const fontSize = themeSizeMap[size];
    document.documentElement.style.fontSize = `${fontSize}px`;
  },
  { flush: 'post' }
);

watch(
  () => props.theme,
  () => {
    if (!isClient) return;

    generateCss();
  },
  { deep: true, flush: 'post', immediate: true }
);
</script>

<template>
  <ConfigProvider v-bind="forwardedProps" :icon-render="iconRender">
    <slot />
    <ToastProvider v-if="!props.customToast" v-bind="props.toast" />
    <DialogProvider />
    <ProgressProvider v-bind="props.progress" />
  </ConfigProvider>
</template>
