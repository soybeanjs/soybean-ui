<script setup lang="ts">
import { toRefs } from 'vue';
import { provideConfigProviderContext } from './context';
import type { ConfigProviderProps } from './types';

defineOptions({
  name: 'ConfigProvider',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  dir: 'ltr',
  locale: 'en',
  scrollBody: true,
  nonce: undefined,
  useId: undefined
});

const { dir, locale, scrollBody, nonce } = toRefs(props);

provideConfigProviderContext({ dir, locale, scrollBody, nonce, useId: props.useId });
</script>

<template>
  <slot />
</template>
