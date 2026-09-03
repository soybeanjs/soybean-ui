<script setup lang="ts">
import { shallowReadonly } from 'vue';
import { useStyleTag } from '@vueuse/core';
import { provideConfigProviderContext } from './context';
import type { ConfigProviderProps } from './types';

defineOptions({
  name: 'ConfigProvider'
});

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  locale: 'en',
  nonce: undefined
});

// Shallow readonly keeps nested sections (e.g. `tooltip` config) assignable to their prop
// types; a deep `readonly` would freeze nested objects into incompatible DeepReadonly shapes.
provideConfigProviderContext(shallowReadonly(props));

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
