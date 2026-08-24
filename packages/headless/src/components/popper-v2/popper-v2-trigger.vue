<script setup lang="ts">
import { computed, watchEffect } from 'vue';
import type { ComponentPublicInstance, CSSProperties } from 'vue';
import { useForwardElement, useOmitProps } from '../../composables';
import { Button } from '../button';
import { Primitive } from '../primitive';
import { usePopperV2RootContext, usePopperV2Ui } from './context';
import type { PopperV2TriggerProps } from './types';
import { usePopperV2Trigger } from './use-popper-v2-trigger';

defineOptions({
  name: 'PopperV2Trigger'
});

const props = withDefaults(defineProps<PopperV2TriggerProps>(), {
  as: 'button',
  trigger: 'click',
  openOnFocus: undefined
});

const forwardedProps = useOmitProps(props, [
  'id',
  'class',
  'trigger',
  'reference',
  'openDelay',
  'closeDelay',
  'skipDelayDuration',
  'pressOpenDelay',
  'openOnFocus',
  'focusVisibleOnly',
  'focusOpenDelay'
]);

const cls = usePopperV2Ui('trigger');
const anchorCls = usePopperV2Ui('anchor');
const context = usePopperV2RootContext('PopperV2Trigger');
const {
  open,
  dataState,
  disabled,
  hasCustomAnchor,
  popupId,
  triggerId,
  dir,
  onTriggerElementChange,
  onAnchorElementChange,
  requestPositionerUpdate
} = context;

const [_, setTriggerElement] = useForwardElement(onTriggerElementChange);
const [__, setAnchorElement] = useForwardElement(el => {
  if (props.reference) return;

  onAnchorElementChange(el);
});

// The headless `PopperAnchor` used to set the anchor on the same node as the trigger; alias both
// refs so the trigger element doubles as the anchor when there is no custom `PopperV2Anchor`.
function setTriggerAnchorRef(node: Element | ComponentPublicInstance | null | undefined) {
  setTriggerElement(node as HTMLElement | undefined);
  setAnchorElement(node as HTMLElement | undefined);
}

watchEffect(() => {
  if (props.reference && !hasCustomAnchor.value) {
    onAnchorElementChange(props.reference);
  }
});

// The modal layer disables body pointer events while open; the contextmenu trigger must stay
// interactive so repeated right-clicks keep reaching it and can reposition the popup.
const triggerStyle = computed<CSSProperties | undefined>(() =>
  props.trigger === 'contextmenu' ? { WebkitTouchCallout: 'none', pointerEvents: 'auto' } : undefined
);

const {
  reference,
  onBlur,
  onClick,
  onContextMenu,
  onFocus,
  onPointerCancel,
  onPointerDown,
  onPointerEnter,
  onPointerLeave,
  onPointerMove,
  onPointerUp
} = usePopperV2Trigger(props, context, { onVirtualPointChange: requestPositionerUpdate });
</script>

<template>
  <Primitive
    v-if="!hasCustomAnchor"
    :id="triggerId"
    :ref="setTriggerAnchorRef"
    as-child
    :reference="reference"
    :class="[anchorCls, cls]"
    :dir="dir"
    data-soybean-popper-v2-trigger
    data-grace-area-trigger
    :data-state="dataState"
    :data-disabled="disabled ? '' : undefined"
    :aria-expanded="open"
    :aria-controls="open ? popupId : undefined"
    @blur="onBlur"
    @click="onClick"
    @contextmenu="onContextMenu"
    @focus="onFocus"
    @pointercancel="onPointerCancel"
    @pointerdown="onPointerDown"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
  >
    <Button v-bind="forwardedProps" :style="triggerStyle" :disabled="disabled">
      <slot />
    </Button>
  </Primitive>

  <Button
    v-else
    :id="triggerId"
    :ref="setTriggerElement"
    v-bind="forwardedProps"
    :style="triggerStyle"
    data-soybean-popper-v2-trigger
    data-grace-area-trigger
    :class="cls"
    :disabled="disabled"
    :data-state="dataState"
    :aria-expanded="open"
    :aria-controls="open ? popupId : undefined"
    @blur="onBlur"
    @click="onClick"
    @contextmenu="onContextMenu"
    @focus="onFocus"
    @pointercancel="onPointerCancel"
    @pointerdown="onPointerDown"
    @pointerenter="onPointerEnter"
    @pointerleave="onPointerLeave"
    @pointermove="onPointerMove"
    @pointerup="onPointerUp"
  >
    <slot />
  </Button>
</template>
