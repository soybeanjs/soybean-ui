<script lang="ts">
import { reactiveOmit } from '@vueuse/shared';
import type { DismissableLayerEmits, DismissableLayerProps } from '../DismissableLayer';
import type { FocusScopeProps } from '../focus-scope';
import type { PopperContentProps } from '../popper';
</script>

<script setup lang="ts">
import { PopperContent } from '../popper';
import { DismissableLayer } from '../dismissable-layer';
import { FocusScope } from '../focus-scope';
import { useFocusGuards, useForwardExpose, useForwardProps } from '../../_shared';
import { injectPopoverRootContext } from './popover-root.vue';

export type PopoverContentImplEmits = DismissableLayerEmits & {
  /** Event handler called when auto-focusing on open. Can be prevented. */
  openAutoFocus: [event: Event];
  /** Event handler called when auto-focusing on close. Can be prevented. */
  closeAutoFocus: [event: Event];
};

export interface PopoverContentImplProps extends PopperContentProps, DismissableLayerProps {
  /**
   * Whether focus should be trapped within the `MenuContent`
   *
   * @defaultValue false
   */
  trapFocus?: FocusScopeProps['trapped'];
}

const props = defineProps<PopoverContentImplProps>();
const emits = defineEmits<PopoverContentImplEmits>();

const forwarded = useForwardProps(reactiveOmit(props, 'trapFocus', 'disableOutsidePointerEvents'));
const { forwardRef } = useForwardExpose();

const rootContext = injectPopoverRootContext();
useFocusGuards();
</script>

<template>
  <FocusScope
    as-child
    loop
    :trapped="trapFocus"
    @mount-auto-focus="emits('openAutoFocus', $event)"
    @unmount-auto-focus="emits('closeAutoFocus', $event)"
  >
    <DismissableLayer
      as-child
      :disable-outside-pointer-events="disableOutsidePointerEvents"
      @pointer-down-outside="emits('pointerDownOutside', $event)"
      @interact-outside="emits('interactOutside', $event)"
      @escape-key-down="emits('escapeKeyDown', $event)"
      @focus-outside="emits('focusOutside', $event)"
      @dismiss="rootContext.onOpenChange(false)"
    >
      <PopperContent
        v-bind="forwarded"
        :id="rootContext.contentId"
        :ref="forwardRef"
        :data-state="rootContext.open.value ? 'open' : 'closed'"
        :aria-labelledby="rootContext.triggerId"
        :style="{
          '--soybean-popover-content-transform-origin': 'var(--soybean-popper-transform-origin)',
          '--soybean-popover-content-available-width': 'var(--soybean-popper-available-width)',
          '--soybean-popover-content-available-height': 'var(--soybean-popper-available-height)',
          '--soybean-popover-trigger-width': 'var(--soybean-popper-anchor-width)',
          '--soybean-popover-trigger-height': 'var(--soybean-popper-anchor-height)'
        }"
        role="dialog"
      >
        <slot />
      </PopperContent>
    </DismissableLayer>
  </FocusScope>
</template>
