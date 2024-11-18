<script setup lang="ts">
import { Presence } from '../presence';
import { useForwardExpose, useForwardPropsEmits, useId } from '../../composables';
import type { PopoverContentImplEmits, PopoverContentImplProps } from './PopoverContentImpl.vue';

import PopoverContentModal from './popover-content-modal.vue';
import PopoverContentNonModal from './popover-content-non-modal.vue';
import { injectPopoverRootContext } from './popover-root.vue';

export type PopoverContentEmits = PopoverContentImplEmits;

export interface PopoverContentProps extends PopoverContentImplProps {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}

const props = defineProps<PopoverContentProps>();
const emits = defineEmits<PopoverContentEmits>();

const rootContext = injectPopoverRootContext();

const forwarded = useForwardPropsEmits(props, emits);
const { forwardRef } = useForwardExpose();

rootContext.contentId ||= useId(undefined, 'soybean-popover-content');
</script>

<template>
  <Presence :present="forceMount || rootContext.open.value">
    <PopoverContentModal v-if="rootContext.modal.value" v-bind="forwarded" :ref="forwardRef">
      <slot />
    </PopoverContentModal>
    <PopoverContentNonModal v-else v-bind="forwarded" :ref="forwardRef">
      <slot />
    </PopoverContentNonModal>
  </Presence>
</template>
