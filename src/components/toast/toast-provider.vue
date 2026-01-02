<script setup lang="ts">
import { computed, onBeforeUnmount } from 'vue';
import { ToastProvider, ToastViewport, provideToastViewportUi } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { transformPropsToContext } from '@soybeanjs/headless/shared';
import { cn } from '@/theme';
import { toastViewportVariants } from '@/variants/toast';
import { provideToastProviderContext } from './context';
import Toast from './toast.vue';
import type { ToastProviderProps } from './types';

defineOptions({
  name: 'SToast'
});

const props = withDefaults(defineProps<ToastProviderProps>(), {
  size: 'md',
  ui: () => ({}),
  limits: 3,
  removeDelay: 5000,
  position: 'top-right'
});

const forwardedProps = useOmitProps(props, ['size', 'ui', 'limits', 'removeDelay', 'position', 'viewportProps']);

const { states, ids, clear, remove, position } = provideToastProviderContext(
  transformPropsToContext(props, ['size', 'ui', 'limits', 'removeDelay', 'position'])
);

const viewportUi = computed(() => {
  const variants = toastViewportVariants({
    size: props.size,
    position: position.value
  });

  return cn(variants, props.ui?.viewport);
});

provideToastViewportUi(viewportUi);

onBeforeUnmount(() => {
  clear();
});
</script>

<template>
  <ToastProvider v-bind="forwardedProps">
    <ToastViewport v-bind="viewportProps" />
    <Toast
      v-for="{ id, title, description, content, ...rest } in states"
      :key="id"
      v-bind="rest"
      :open="ids.includes(id)"
      @update:open="remove(id)"
    >
      <template v-if="title" #title>
        <template v-if="typeof title === 'string'">{{ title }}</template>
        <component :is="title" v-else />
      </template>
      <template v-if="description" #description>
        <template v-if="typeof description === 'string'">{{ description }}</template>
        <component :is="description" v-else />
      </template>
      <component :is="content" v-if="content" />
    </Toast>
    <slot />
  </ToastProvider>
</template>
