<script setup lang="ts">
import { computed, toRefs, watch } from 'vue';
import { useStyleTag } from '@vueuse/core';
import { ConfigProvider, useOmitForwardProps } from '@soybean-ui/primitives';
import { generateCSSVars } from '@soybean-ui/unocss-preset';
import type { ThemeSize } from '@soybean-ui/variants';
import { provideConfigProviderContext } from '../context';
import { getThemeName, isIncludeByDefaultTheme } from '../shared';
import type { ConfigProviderProps } from '../types';

defineOptions({
  name: 'SConfigProvider',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  theme: () => ({ color: 'default' }),
  size: 'md'
});

const delegatedProps = useOmitForwardProps(props, ['theme', 'size']);

const { theme, size } = toRefs(props);

provideConfigProviderContext({ theme, size });

const cssVars = computed(() => {
  if (isIncludeByDefaultTheme(theme.value)) return '';

  return generateCSSVars(theme.value, theme.value.color === 'default');
});

useStyleTag(cssVars, { id: '__SOYBEAN_UI_THEME_VARS__' });

function addThemeClass(newThemeName: string, oldThemeName: string) {
  if (newThemeName === oldThemeName) {
    return;
  }

  if (newThemeName !== 'default') {
    document.documentElement.classList.add(`theme-${newThemeName}`);
  }

  document.documentElement.classList.remove(`theme-${oldThemeName}`);
}

function addSizeClass(_size: ThemeSize) {
  const sizes: ThemeSize[] = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];

  document.documentElement.classList.add(`size-${_size}`);

  const removedSizes = sizes.filter(s => s !== _size).map(s => `size-${s}`);

  document.documentElement.classList.remove(...removedSizes);
}

watch(
  () => theme.value.color,
  (newVal, oldVal) => {
    const newThemeName = getThemeName(newVal);
    const oldThemeName = getThemeName(oldVal);

    addThemeClass(newThemeName, oldThemeName);
  },
  { immediate: true, flush: 'post' }
);

watch(
  () => size.value,
  newVal => {
    addSizeClass(newVal);
  },
  { immediate: true, flush: 'post' }
);
</script>

<template>
  <ConfigProvider v-bind="delegatedProps">
    <slot />
  </ConfigProvider>
</template>
