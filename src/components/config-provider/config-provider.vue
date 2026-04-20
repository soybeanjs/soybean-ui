<script setup lang="ts">
import { computed, h, watch, watchEffect } from 'vue';
import { useStorage } from '@vueuse/core';
import { ConfigProvider, Primitive } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { isClient, transformPropsToContext } from '@soybeanjs/headless/shared';
import { createShadcnTheme } from '@soybeanjs/shadcn-theme';
import type { ThemeSize } from '@/theme';
import { themeSizes } from '@/constants/common';
import DialogProvider from '../dialog/dialog-provider.vue';
import Icon from '../icon/icon.vue';
import type { IconValue } from '../icon/types';
import ProgressProvider from '../progress/progress-provider.vue';
import Toaster from '../toast/toaster.vue';
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

const forwardedProps = useOmitProps(props, [
  'iconRender',
  'theme',
  'size',
  'iconify',
  'progress',
  'loadingBar',
  'toast',
  'customToast'
]);

const iconRender = props.iconRender ?? ((icon: IconValue) => h(Icon, { icon }));

provideConfigProviderContext({
  ...transformPropsToContext(props),
  iconRender
});

const { getCss } = createShadcnTheme(props.theme);

const generateCss = () => getCss(props.theme, props.theme.radius);

const cssVars = useStorage('__SoybeanUI_themeVars', generateCss());

const progressProps = computed(() => props.progress ?? props.loadingBar);

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
  cssVars.value = generateCss();
});
</script>

<template>
  <ConfigProvider v-bind="forwardedProps" :icon-render="iconRender">
    <Primitive id="__SoybeanUI_themeVars" as="style">
      {{ cssVars }}
    </Primitive>
    <ProgressProvider v-bind="progressProps">
      <slot />
    </ProgressProvider>
    <Toaster v-if="!props.customToast" v-bind="props.toast" />
    <DialogProvider />
  </ConfigProvider>
</template>
