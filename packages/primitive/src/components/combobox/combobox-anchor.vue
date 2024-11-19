<script setup lang="ts">
import { Primitive } from '../primitive';
import PopperAnchor from '../popper/popper-anchor.vue';
import { useForwardExpose } from '../../composables';
import type { ComboboxAnchorPropsWithPrimitive } from './types';

defineOptions({
  name: 'ComboboxAnchor',
  inheritAttrs: false
});

const { class: className } = defineProps<ComboboxAnchorPropsWithPrimitive>();

const { forwardRef } = useForwardExpose();
</script>

<template>
  <PopperAnchor as-child :reference="reference">
    <Primitive :ref="forwardRef" :class="className" :as :as-child v-bind="$attrs">
      <slot />
    </Primitive>
  </PopperAnchor>
</template>
