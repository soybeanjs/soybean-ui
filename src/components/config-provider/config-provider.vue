<script setup lang="ts">
import { h, watchEffect } from 'vue';
import { useStorage } from '@vueuse/core';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { ConfigProvider } from '@soybeanjs/headless/config-provider';
import { Primitive } from '@soybeanjs/headless/primitive';
import { isClient, transformPropsToContext } from '@soybeanjs/headless/shared';
import { createShadcnTheme } from '@soybeanjs/shadcn-theme';
import { themeSizeMap } from '@/theme';
import DialogProvider from '../dialog/dialog-provider.vue';
import Icon from '../icon/icon.vue';
import type { IconValue } from '../icon/types';
import ProgressProvider from '../progress/progress-provider.vue';
import ToastProvider from '../toast/toast-provider.vue';
import { provideConfigProviderContext } from './context';
import globalStyles from './global.css?raw';
import type { ConfigProviderProps } from './types';

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

const iconRender = props.iconRender ?? ((icon: IconValue) => h(Icon, { icon }));

provideConfigProviderContext({
  ...transformPropsToContext(props),
  iconRender
});

const { getCss } = createShadcnTheme(props.theme);

const generateCss = () => {
  const cssVars = getCss(props.theme, props.theme.radius);

  return `${globalStyles}\n${cssVars}`;
};

const cssVars = useStorage('__SoybeanUI_themeVars', generateCss());

watchEffect(
  () => {
    if (!isClient) return;
    const size = props.size ?? 'md';
    const fontSize = themeSizeMap[size];
    document.documentElement.style.fontSize = `${fontSize}px`;
  },
  { flush: 'post' }
);

watchEffect(() => {
  cssVars.value = generateCss();
});
</script>

<template>
  <ConfigProvider v-bind="forwardedProps" :icon-render="iconRender">
    <Primitive id="__SoybeanUI_themeVars" as="style">
      {{ cssVars }}
    </Primitive>
    <slot />
    <ToastProvider v-if="!props.customToast" v-bind="props.toast" />
    <DialogProvider />
    <ProgressProvider v-bind="props.progress" />
  </ConfigProvider>
</template>
