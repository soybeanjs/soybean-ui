<script setup lang="ts">
import { computed, toRefs, watch } from 'vue';
import { useStyleTag } from '@vueuse/core';
import { ConfigProvider, useOmitForwardProps } from '@soybean-ui/primitives';
import { builtinColors, generateCSSVars } from '@soybean-ui/unocss-preset';
import type { ThemeOptions } from '@soybean-ui/unocss-preset';
import { provideConfigProviderContext } from './context';
import type { ConfigProviderProps } from './types';

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
  const keys = Object.keys(theme.value);

  if (!keys.length) return '';

  if (keys.length === 1 && keys.includes('color')) {
    if (typeof theme.value.color === 'string' && builtinColors.includes(theme.value.color)) {
      return '';
    }
  }

  return generateCSSVars(theme.value);
});

useStyleTag(cssVars, { id: '__SOYBEAN_UI_THEME_VARS__' });

function getThemeName(color: ThemeOptions['color']) {
  let themeName = 'default';

  if (typeof color === 'string') {
    themeName = color;
  }

  if (typeof color === 'object') {
    if ('base' in color) {
      themeName = color.base || color.name;
    } else {
      themeName = color.name;
    }
  }

  return themeName;
}

function addThemeClass(newThemeName: string, oldThemeName: string) {
  if (newThemeName === oldThemeName) {
    if (newThemeName === 'default') {
      document.documentElement.classList.add(`theme-${newThemeName}`);
    }

    return;
  }

  document.documentElement.classList.add(`theme-${newThemeName}`);
  document.documentElement.classList.remove(`theme-${oldThemeName}`);
}

watch(
  () => theme.value.color,
  (newVal, oldVal) => {
    const newThemeName = getThemeName(newVal);
    const oldThemeName = getThemeName(oldVal);

    addThemeClass(newThemeName, oldThemeName);
  },
  { flush: 'post' }
);
</script>

<template>
  <ConfigProvider v-bind="delegatedProps">
    <slot />
  </ConfigProvider>
</template>
