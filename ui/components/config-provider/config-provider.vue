<script setup lang="ts">
import { ConfigProvider } from '@headless';
import { transformPropsToContext } from '@headless/shared';
import { provideConfigProviderContext } from './context';
import type { ConfigProviderProps } from './types';

defineOptions({
  name: 'ConfigProvider'
});

const props = defineProps<ConfigProviderProps>();

provideConfigProviderContext(transformPropsToContext(props));
</script>

<template>
  <ConfigProvider v-bind="props">
    <slot />
  </ConfigProvider>
</template>
