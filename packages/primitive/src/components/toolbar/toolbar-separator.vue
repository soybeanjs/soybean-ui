<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { Separator } from '../separator';
import type { ToolbarSeparatorPropsWithPrimitive } from './types';
import { injectToolbarRootContext } from './context';

defineOptions({
  name: 'ToolbarSeparator'
});

const props = defineProps<ToolbarSeparatorPropsWithPrimitive>();

const { orientation } = injectToolbarRootContext();

useForwardExpose();
</script>

<template>
  <Separator :class="props.class" :as="as" :as-child="asChild" :orientation="orientation">
    <slot />
  </Separator>
</template>
