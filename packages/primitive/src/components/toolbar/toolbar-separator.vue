<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { Separator } from '../separator';
import type { ToolbarSeparatorPropsWithPrimitive } from './types';
import { injectToolbarRootContext } from './context';

defineOptions({
  name: 'ToolbarSeparator'
});

defineProps<ToolbarSeparatorPropsWithPrimitive>();

const rootContext = injectToolbarRootContext();
useForwardExpose();
</script>

<template>
  <Separator :orientation="rootContext.orientation.value" :as-child="asChild" :as="as">
    <slot />
  </Separator>
</template>
