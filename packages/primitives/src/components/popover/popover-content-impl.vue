<script setup lang="ts">
import { useFocusGuards, useForwardExpose, useForwardProps } from '../../composables';
import { DismissableLayer } from '../dismissable-layer';
import { FocusScope } from '../focus-scope';
import { PopperContent } from '../popper';
import { injectPopoverRootContext } from './context';
import type { PopoverContentImplEmits, PopoverContentImplPropsWithPrimitive } from './types';

defineOptions({
  name: 'PopoverContentImpl'
});

const props = defineProps<PopoverContentImplPropsWithPrimitive>();

const emit = defineEmits<PopoverContentImplEmits>();

const forwarded = useForwardProps(props, ['trapFocus', 'disableOutsidePointerEvents'], 'omit');
const { forwardRef } = useForwardExpose();

const rootContext = injectPopoverRootContext();
useFocusGuards();
</script>

<template>
  <FocusScope
    as-child
    loop
    :trapped="trapFocus"
    @mount-auto-focus="emit('openAutoFocus', $event)"
    @unmount-auto-focus="emit('closeAutoFocus', $event)"
  >
    <DismissableLayer
      as-child
      :disable-outside-pointer-events="disableOutsidePointerEvents"
      @pointer-down-outside="emit('pointerDownOutside', $event)"
      @interact-outside="emit('interactOutside', $event)"
      @escape-key-down="emit('escapeKeyDown', $event)"
      @focus-outside="emit('focusOutside', $event)"
      @dismiss="rootContext.onOpenChange(false)"
    >
      <PopperContent
        v-bind="forwarded"
        :id="rootContext.contentId"
        :ref="forwardRef"
        role="dialog"
        :data-state="rootContext.open.value ? 'open' : 'closed'"
        :aria-labelledby="rootContext.triggerId"
        :style="{
          '--soybean-popover-content-transform-origin': 'var(--soybean-popper-transform-origin)',
          '--soybean-popover-content-available-width': 'var(--soybean-popper-available-width)',
          '--soybean-popover-content-available-height': 'var(--soybean-popper-available-height)',
          '--soybean-popover-trigger-width': 'var(--soybean-popper-anchor-width)',
          '--soybean-popover-trigger-height': 'var(--soybean-popper-anchor-height)'
        }"
      >
        <slot />
      </PopperContent>
    </DismissableLayer>
  </FocusScope>
</template>
