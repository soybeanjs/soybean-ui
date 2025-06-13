<script setup lang="ts">
import { ConfigProvider } from '@headless';
import { useOmitProps } from '@headless/composables';
import { transformPropsToContext } from '@headless/shared';
import { provideConfigProviderContext } from './context';
import type { ConfigProviderProps } from './types';

defineOptions({
  name: 'SConfigProvider'
});

const props = withDefaults(defineProps<ConfigProviderProps>(), {
  dir: 'ltr'
});

const forwardedProps = useOmitProps(props, ['iconify']);

provideConfigProviderContext(transformPropsToContext(props));
</script>

<template>
  <ConfigProvider v-bind="forwardedProps">
    <slot />
  </ConfigProvider>
</template>
