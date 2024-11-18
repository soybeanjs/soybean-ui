<script setup lang="ts">
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';

import { injectPopoverRootContext } from './popover-root.vue';

export interface PopoverCloseProps extends PrimitiveProps {}

const props = withDefaults(defineProps<PopoverCloseProps>(), {
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
