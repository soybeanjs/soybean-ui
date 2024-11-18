<script setup lang="ts">
import Primitive from '../primitive/primitive';
import { useBodyScrollLock, useForwardExpose } from '../../composables';
import { injectDialogRootContext } from './context';
import type { DialogOverlayImplPropsWithPrimitive } from './types';

defineOptions({
  name: 'DialogOverlayImpl'
});

const { class: className } = defineProps<DialogOverlayImplPropsWithPrimitive>();

const { dataState } = injectDialogRootContext();

useBodyScrollLock(true);
useForwardExpose();
</script>

<template>
  <Primitive :class="className" :as :as-child :data-state style="pointer-events: auto">
    <slot />
  </Primitive>
</template>
