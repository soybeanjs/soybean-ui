<script setup lang="ts">
import { computed, watch } from 'vue';
import { useStyleTag } from '@vueuse/core';
import { generateCSSVars } from '@soybean-ui/unocss-preset';
import { ConfigProvider } from '@headless';
import { useOmitProps } from '@headless/composables';
import { isClient, transformPropsToContext } from '@headless/shared';
import type { ThemeSize } from '@theme';
import { provideConfigProviderContext } from './context';
import { getThemeName, isIncludeByDefaultTheme } from './shared';
import type { ConfigProviderProps } from './types';

defineOptions({
  name: 'SConfigProvider'
});

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  theme: () => ({
    color: 'default'
  }),
  size: 'md',
  dir: 'ltr'
});

const forwardedProps = useOmitProps(props, ['theme', 'size', 'iconify']);

const cssVars = computed(() => {
  if (isIncludeByDefaultTheme(props.theme)) return '';

  return generateCSSVars(props.theme, getThemeName(props.theme.color) === 'default');
});

provideConfigProviderContext(transformPropsToContext(props));
useStyleTag(cssVars, { id: '__SOYBEAN_UI_THEME_VARS__' });

function addThemeClass(newThemeName: string, oldThemeName: string) {
  if (!isClient) return;
  if (newThemeName === oldThemeName) {
    return;
  }

  if (newThemeName !== 'default') {
    document.documentElement.classList.add(`theme-${newThemeName}`);
  }

  document.documentElement.classList.remove(`theme-${oldThemeName}`);
}

function addSizeClass(_size: ThemeSize) {
  if (!isClient) return;
  const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  document.documentElement.classList.add(`size-${_size}`);

  const removedSizes = sizes.filter(s => s !== _size).map(s => `size-${s}`);

  document.documentElement.classList.remove(...removedSizes);
}

watch(
  () => props.theme.color,
  (newVal, oldVal) => {
    const newThemeName = getThemeName(newVal);
    const oldThemeName = getThemeName(oldVal);

    addThemeClass(newThemeName, oldThemeName);
  },
  { immediate: true, flush: 'post' }
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
    <slot />
  </ConfigProvider>
</template>
