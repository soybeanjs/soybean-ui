<script setup lang="ts">
import { computed, reactive, watchEffect, onWatcherCleanup, useAttrs } from 'vue';
import { usePopperV2RootContext } from '../popper-v2/context';
import { useForwardElement, useOmitProps } from '../../composables';
import { MenuAnchor } from '../menu';
import type { PopperV2TriggerProps } from '../popper-v2/types';
import { usePopperV2Trigger } from '../popper-v2/use-popper-v2-trigger';
import { Primitive } from '../primitive';
import { useContextMenuRootContext } from './context';
import type { ContextMenuTriggerProps } from './types';

defineOptions({
  name: 'ContextMenuTrigger',
  inheritAttrs: false
});

const props = withDefaults(defineProps<ContextMenuTriggerProps>(), {
  as: 'span'
});

const attrs = useAttrs();

const forwardedProps = useOmitProps(props, ['reference'], attrs);

const { pressOpenDelay } = useContextMenuRootContext('ContextMenuTrigger');
const popperContext = usePopperV2RootContext('ContextMenuTrigger');
const { dataState } = popperContext;

const [_, setTriggerElement] = useForwardElement(element => {
  popperContext.onTriggerElementChange(element);
});

const dataDisabled = computed(() => (props.disabled ? '' : undefined));

// Right-click opening, touch long-press and the click-point virtual reference all run on the
// shared PopperV2 trigger machine (stable virtual reference: repeated right-clicks reposition
// via `update()` instead of polling).
const shellTriggerProps: PopperV2TriggerProps = reactive({
  trigger: 'contextmenu',
  get pressOpenDelay() {
    return pressOpenDelay.value;
  },
  get disabled() {
    return props.disabled;
  }
});

const {
  reference: virtualReference,
  onContextMenu,
  onPointerCancel,
  onPointerDown,
  onPointerMove,
  onPointerUp
} = usePopperV2Trigger(shellTriggerProps, popperContext, {
  onVirtualPointChange: popperContext.requestPositionerUpdate
});

// With an external `reference` the trigger element is that element and the shell handlers are
// attached there instead of the inline wrapper.
watchEffect(() => {
  if (!props.reference) return;

  popperContext.onTriggerElementChange(props.reference);
  props.reference.addEventListener('contextmenu', onContextMenu);
  props.reference.addEventListener('pointerdown', onPointerDown);
  props.reference.addEventListener('pointermove', onPointerMove);
  props.reference.addEventListener('pointercancel', onPointerCancel);
  props.reference.addEventListener('pointerup', onPointerUp);

  onWatcherCleanup(() => {
    props.reference?.removeEventListener('contextmenu', onContextMenu);
    props.reference?.removeEventListener('pointerdown', onPointerDown);
    props.reference?.removeEventListener('pointermove', onPointerMove);
    props.reference?.removeEventListener('pointercancel', onPointerCancel);
    props.reference?.removeEventListener('pointerup', onPointerUp);
  });
});
</script>

<template>
  <MenuAnchor as="template" :reference="virtualReference" />
  <Primitive
    v-if="!props.reference"
    :ref="setTriggerElement"
    v-bind="forwardedProps"
    data-soybean-context-menu-trigger
    :data-disabled="dataDisabled"
    :data-state="dataState"
    :style="{
      WebkitTouchCallout: 'none',
      pointerEvents: 'auto'
    }"
    @contextmenu="onContextMenu"
    @pointerdown="onPointerDown"
    @pointermove="onPointerMove"
    @pointercancel="onPointerCancel"
    @pointerup="onPointerUp"
  >
    <slot />
  </Primitive>
</template>
