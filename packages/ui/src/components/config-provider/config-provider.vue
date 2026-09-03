<script setup lang="ts">
import { h, shallowReadonly } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { ConfigProvider } from '@soybeanjs/headless/config-provider';
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

// 直接以 shallowReadonly 快照注入 props：保持响应式追踪，同时避免深层 readonly 将
// 嵌套对象（如 `tooltip`、`theme`）冻结为不兼容的 DeepReadonly 形态。
provideConfigProviderContext(shallowReadonly(props));

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
