<script setup lang="ts">
import { watchEffect } from 'vue';
import { useTextDirection, useStyleTag } from '@vueuse/core';
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
`,
  { id: '__SoybeanHeadless_Styles' }
);

watchEffect(() => {
  if (dir.value !== props.dir) {
    dir.value = props.dir;
  }
});
</script>

<template>
  <slot />
</template>
