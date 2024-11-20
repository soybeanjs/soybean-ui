<script setup lang="ts">
import type { SelectProviderProps } from './types';
import { provideSelectContentContext, provideSelectRootContext } from './context';

defineOptions({
  name: 'SelectProvider',
  inheritAttrs: false
});

const props = defineProps<SelectProviderProps>();

provideSelectRootContext(props.context);
provideSelectContentContext({
  onViewportChange: () => {},
  itemTextRefCallback: () => {},
  itemRefCallback: () => {}
});
</script>

<template>
  <slot />
</template>
