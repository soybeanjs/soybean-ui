<script setup lang="ts">
import { Primitive } from '../primitive';
import { PopperAnchor, type PopperAnchorProps } from '../popper';
import { useForwardExpose } from '../../composables';
export interface ComboboxAnchorProps extends PopperAnchorProps {}

defineProps<ComboboxAnchorProps>();

const { forwardRef } = useForwardExpose();
</script>

<template>
  <PopperAnchor as-child :reference="reference">
    <Primitive :ref="forwardRef" :as :as-child v-bind="$attrs">
      <slot />
    </Primitive>
  </PopperAnchor>
</template>
