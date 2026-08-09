<script setup lang="ts">
import { h } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { ConfigProvider } from '@soybeanjs/headless/config-provider';
import { transformPropsToContext } from '@soybeanjs/headless/shared';
import { isServerRuntime } from '@soybeanjs/theme/ssr';
import DialogProvider from '../dialog/dialog-provider.vue';
import IconComponent from '../icon/icon.vue';
import type { IconValue } from '../icon/types';
import ProgressProvider from '../progress/progress-provider.vue';
import ToastProvider from '../toast/toast-provider.vue';
import { provideConfigProviderContext } from './context';
import { useConfigProviderTheme } from './hooks';
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
  }),
  persistTheme: false,
  isServer: isServerRuntime
});

const forwardedProps = useOmitProps(props, [
  'iconRender',
  'theme',
  'size',
  'iconify',
  'progress',
  'toast',
  'customToast',
  'persistTheme',
  'themeConfig',
  'presetProvider',
  'isServer'
]);

const iconRender = props.iconRender ?? ((icon: IconValue) => h(IconComponent, { icon, ssr: props.isServer }));

// 主题相关逻辑（存储缓存 / 有效主题合并 / preset 解析 / CSS 派生）统一收敛到 hooks.ts
const { themeCss, ThemeStyle, commitThemeConfig } = useConfigProviderTheme(props);

// 新持久化属性仅在组件内部消费，不进入 context（避免 transformPropsToContext
// 对函数型 prop 执行调用）；显式列出原有键，行为与改造前一致。
provideConfigProviderContext({
  ...transformPropsToContext(props, [
    'dir',
    'locale',
    'nonce',
    'tooltip',
    'messages',
    'theme',
    'size',
    'iconify',
    'progress',
    'toast',
    'customToast'
  ]),
  iconRender
});

defineExpose({ commitThemeConfig });
</script>

<template>
  <ConfigProvider v-bind="forwardedProps" :icon-render="iconRender">
    <ThemeStyle :css="themeCss" :nonce="nonce" />
    <slot />
    <ToastProvider v-if="!customToast" v-bind="toast" />
    <DialogProvider />
    <ProgressProvider v-bind="progress" />
  </ConfigProvider>
</template>
