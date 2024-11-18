<script setup lang="ts">
import Primitive from '../primitive/primitive';
import { useForwardExpose } from '../../composables';
import type { PopoverClosePropsWithPrimitive } from './types';
import { injectPopoverRootContext } from './context';

defineOptions({
  name: 'PopoverClose'
});

const props = withDefaults(defineProps<PopoverClosePropsWithPrimitive>(), {
  as: 'button'
});

useForwardExpose();
const rootContext = injectPopoverRootContext();
</script>

<template>
  <Primitive
    :type="as === 'button' ? 'button' : undefined"
    :as
    :as-child="props.asChild"
    @click="rootContext.onOpenChange(false)"
  >
    <slot />
  </Primitive>
</template>
