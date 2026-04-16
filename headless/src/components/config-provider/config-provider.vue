<script setup lang="ts">
import { watchEffect } from 'vue';
import { useTextDirection } from '@vueuse/core';
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
  nonce: undefined,
  nuxt: false
});

provideConfigProviderContext({
  ...transformPropsToContext(props),
  iconRender: props.iconRender
});

const dir = useTextDirection({
  initialValue: props.dir
});

watchEffect(() => {
  if (dir.value !== props.dir) {
    dir.value = props.dir;
  }
});
</script>

<template>
  <slot />
</template>
