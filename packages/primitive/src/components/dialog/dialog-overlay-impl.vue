<script setup lang="ts">
import { Primitive } from '../primitive';
import { useBodyScrollLock, useForwardExpose } from '../../composables';
import { injectDialogRootContext } from './context';
import type { DialogOverlayImplPropsWithPrimitive } from './types';

defineOptions({
  name: 'DialogOverlayImpl'
});

const props = defineProps<DialogOverlayImplPropsWithPrimitive>();

const { dataState } = injectDialogRootContext();

useBodyScrollLock(true);
useForwardExpose();
</script>

<template>
  <Primitive :class="props.class" :as="as" :as-child="asChild" :data-state="dataState" style="pointer-events: auto">
    <slot />
  </Primitive>
</template>
