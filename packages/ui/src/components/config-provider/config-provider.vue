<script setup lang="ts">
import { h, computed } from 'vue';
import { useStyleTag } from '@vueuse/core';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { ConfigProvider } from '@soybeanjs/headless/config-provider';
import { transformPropsToContext } from '@soybeanjs/headless/shared';
import { createShadcnTheme } from '@soybeanjs/shadcn-theme';
import DialogProvider from '../dialog/dialog-provider.vue';
import Icon from '../icon/icon.vue';
import type { IconValue } from '../icon/types';
import ProgressProvider from '../progress/progress-provider.vue';
import ToastProvider from '../toast/toast-provider.vue';
import { provideConfigProviderContext } from './context';
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

const iconRender = props.iconRender ?? ((icon: IconValue) => h(Icon, { icon, ssr: import.meta.env.SSR }));

const css = computed(() => {
  const { getCss } = createShadcnTheme({
    ...props.theme,
    size: props.theme.size || props.size || 'md'
  });

  const result = getCss();
  return result;
});

useStyleTag(css, { id: '__SoybeanUI_theme' });

provideConfigProviderContext({
  ...transformPropsToContext(props),
  iconRender
});
</script>

<template>
  <ConfigProvider v-bind="forwardedProps" :icon-render="iconRender">
    <slot />
    <ToastProvider v-if="!props.customToast" v-bind="props.toast" />
    <DialogProvider />
    <ProgressProvider v-bind="props.progress" />
  </ConfigProvider>
</template>
