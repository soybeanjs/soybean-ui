<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { useForwardElement } from '../../composables';
import { PopoverPositioner } from '../popover';
import { usePopoverRootContext } from '../popover/context';
import { PopperPopup } from '../popper';
import { popperCssVars } from '../popper/shared';
import type { ComboboxContentEmits, ComboboxContentProps } from './types';

defineOptions({
  name: 'ComboboxContent'
});

withDefaults(defineProps<ComboboxContentProps>(), {
  avoidCollisions: true,
  prioritizePosition: true
});

const emit = defineEmits<ComboboxContentEmits>();

const { dataState, popupId, initPopupId, onPopupElementChange } = usePopoverRootContext('ComboboxContent');
const [_, setPopupElement] = useForwardElement(onPopupElementChange);

const cssVarsStyle: CSSProperties = {
  ['--soybean-combobox-content-transform-origin']: `var(${popperCssVars.transformOrigin})`,
  ['--soybean-combobox-content-available-width']: `var(${popperCssVars.availableWidth})`,
  ['--soybean-combobox-content-available-height']: `var(${popperCssVars.availableHeight})`,
  ['--soybean-combobox-trigger-width']: `var(${popperCssVars.anchorWidth})`,
  ['--soybean-combobox-trigger-height']: `var(${popperCssVars.anchorHeight})`
};

initPopupId();
</script>

<template>
  <PopoverPositioner
    :side="side"
    :align="align"
    :side-offset="sideOffset"
    :align-offset="alignOffset"
    :sticky="sticky"
    :avoid-collisions="avoidCollisions"
    :collision-boundary="collisionBoundary"
    :collision-padding="collisionPadding"
    :arrow-padding="arrowPadding"
    :prioritize-position="prioritizePosition"
    :hide-when-detached="hideWhenDetached"
    :update-position-strategy="updatePositionStrategy"
    :position-strategy="positionStrategy"
    :force-mount="forceMount"
    @close-auto-focus="emit('closeAutoFocus', $event)"
    @escape-key-down="emit('escapeKeyDown', $event)"
    @pointer-down-outside="emit('pointerDownOutside', $event)"
    @focus-outside="emit('focusOutside', $event)"
    @interact-outside="emit('interactOutside', $event)"
  >
    <PopperPopup
      :id="popupId"
      :ref="setPopupElement"
      data-dismissable-layer
      :data-state="dataState"
      :style="cssVarsStyle"
      v-bind="popupProps"
    >
      <slot />
    </PopperPopup>
  </PopoverPositioner>
</template>
