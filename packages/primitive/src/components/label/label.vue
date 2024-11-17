<script lang="ts">
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
export interface LabelProps extends PrimitiveProps {
  /** The id of the element the label is associated with. */
  for?: string;
}

const props = withDefaults(defineProps<LabelProps>(), {
  as: 'label'
});

useForwardExpose();
</script>

<template>
  <Primitive
    v-bind="props"
    @mousedown="
      event => {
        // prevent text selection when double clicking label
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    "
  >
    <slot />
  </Primitive>
</template>
