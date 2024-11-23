<script setup lang="ts">
import { Primitive } from '../primitive';
import PopperAnchor from '../popper/popper-anchor.vue';
import { useForwardExpose } from '../../composables';
import type { ComboboxAnchorPropsWithPrimitive } from './types';

defineOptions({
  name: 'ComboboxAnchor',
  inheritAttrs: false
});

const props = defineProps<ComboboxAnchorPropsWithPrimitive>();

const { forwardRef } = useForwardExpose();
</script>

<template>
  <PopperAnchor as-child :reference="reference">
    <Primitive v-bind="$attrs" :ref="forwardRef" :class="props.class" :as="as" :as-child="asChild">
      <slot />
    </Primitive>
  </PopperAnchor>
</template>
