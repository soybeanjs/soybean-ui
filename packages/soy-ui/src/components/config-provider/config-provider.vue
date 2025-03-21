<script setup lang="ts">
import { computed, toRefs, watch } from 'vue';
import { useStyleTag } from '@vueuse/core';
import { ConfigProvider, useOmitForwardProps } from '@soybean-ui/primitives';
import { generateCSSVars } from '@soybean-ui/unocss-preset';
import { provideConfigProviderContext } from './context';
import { DEFAULT_THEME, getThemeName, getThemeOptionStr } from './shared';
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
  const defaultThemeStr = getThemeOptionStr(DEFAULT_THEME);
  const currentThemeStr = getThemeOptionStr(theme.value);

  if (defaultThemeStr.includes(currentThemeStr)) {
    return '';
  }

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
