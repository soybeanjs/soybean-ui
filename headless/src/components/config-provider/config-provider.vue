<script setup lang="ts">
import { computed } from 'vue';
import { useStyleTag } from '@vueuse/core';
import { transformPropsToContext } from '../../shared';
import { resolveLocaleDirection } from '../../locale/locales';
import { provideConfigProviderContext } from './context';
import type { ConfigProviderProps } from './types';

defineOptions({
  name: 'ConfigProvider'
});

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  locale: 'en',
  scrollBody: true,
  nonce: undefined
});

const dir = computed(() => props.dir ?? resolveLocaleDirection(props.locale));

provideConfigProviderContext({
  ...transformPropsToContext(props),
  dir,
  iconRender: props.iconRender
});

useStyleTag(
  `
.soybean-headless-scrollbar-hidden {
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.soybean-headless-scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.soybean-headless-overflow-y-hidden {
  overflow-y: hidden;
}

.soybean-headless-transition-all-150 {
  transition: all 150ms ease-in-out;
}

.soybean-headless-opacity-0 {
  opacity: 0;
}

.soybean-headless-scale-0 {
  transform: scale(0);
}

.soybean-headless-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
`,
  { id: '__SoybeanHeadless_Styles' }
);
</script>

<template>
  <slot />
</template>
