<script setup lang="ts">
import { Presence } from '../presence';
import { useForwardExpose, useForwardPropsEmits, useId } from '../../composables';
import { injectPopoverRootContext } from './context';
import PopoverContentModal from './popover-content-modal.vue';
import PopoverContentNonModal from './popover-content-non-modal.vue';
import type { PopoverContentEmits, PopoverContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'PopoverContent'
});

const props = defineProps<PopoverContentPropsWithPrimitive>();

const emit = defineEmits<PopoverContentEmits>();

const rootContext = injectPopoverRootContext();

const forwarded = useForwardPropsEmits(props, emit);

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
