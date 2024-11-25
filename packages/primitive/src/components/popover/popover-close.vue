<script setup lang="ts">
import { Primitive } from '../primitive';
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
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :type="as === 'button' ? 'button' : undefined"
    @click="rootContext.onOpenChange(false)"
  >
    <slot />
  </Primitive>
</template>
