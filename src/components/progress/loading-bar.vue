<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue';
import { transformPropsToContext } from '@soybeanjs/headless/shared';
import { mergeUi } from '@/theme';
import SProgress from './progress.vue';
import { provideLoadingBarProviderContext } from './context';
import type { LoadingBarProviderProps } from './types';

defineOptions({
  name: 'SLoadingBar'
});

const props = withDefaults(defineProps<LoadingBarProviderProps>(), {
  color: 'primary',
  errorColor: 'destructive',
  size: 'xs',
  ui: () => ({})
});

const defaultUi = {
  root: 'pointer-events-none fixed inset-x-0 top-0 z-100 rounded-none bg-transparent shadow-none',
  indicator: 'rounded-none shadow-sm transition-[transform,width] duration-200 ease-out'
};

const { clear, color, modelValue, visible } = provideLoadingBarProviderContext(
  transformPropsToContext(props, ['color', 'errorColor'])
);

const ui = computed(() => mergeUi(defaultUi, props.ui));

onBeforeUnmount(() => {
  clear();
});
</script>

<template>
  <SProgress v-if="visible" :model-value="modelValue" :color="color" :size="size" :ui="ui" aria-label="Loading" />
  <slot />
</template>
