<script setup lang="ts">
import { transformPropsToContext } from '../../shared';
import { provideConfigProviderContext } from './context';
import type { ConfigProviderProps } from './types';

defineOptions({
  name: 'ConfigProvider'
});

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  dir: 'ltr',
  locale: 'en',
  scrollBody: true,
  nonce: undefined
});

provideConfigProviderContext(transformPropsToContext(props));
</script>

<template>
  <slot />
</template>
