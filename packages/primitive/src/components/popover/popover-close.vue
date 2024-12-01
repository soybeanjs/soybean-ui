<script setup lang="ts">
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { injectPopoverRootContext } from './context';
import type { PopoverClosePropsWithPrimitive } from './types';

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
