<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import type { CSSProperties } from 'vue';
import { useDismissableLayer, useForwardElement, usePresence } from '../../composables';
import { PopperPositioner } from '../popper';
import { useTreeSelectRootContext, useTreeSelectUi } from './context';
import type { TreeSelectContentEmits, TreeSelectContentProps } from './types';

defineOptions({
  name: 'TreeSelectContent',
  inheritAttrs: false
});

const props = withDefaults(defineProps<TreeSelectContentProps>(), {
  side: 'bottom',
  sideOffset: 4,
  align: 'start',
  avoidCollisions: true,
  collisionPadding: 10,
  disableOutsidePointerEvents: true
});

const emit = defineEmits<TreeSelectContentEmits>();

const { open, onOpenChange, dataState, dir, contentId, multiple } = useTreeSelectRootContext('TreeSelectContent');

const cls = useTreeSelectUi('popup');
const panelCls = useTreeSelectUi('panel');

const [positionerElement, setPositionerElement] = useForwardElement();

const isPresent = props.forceMount ? shallowRef(true) : usePresence(positionerElement, open);

const { pointerEvents, onFocusCapture, onBlurCapture } = useDismissableLayer(positionerElement, {
  disableOutsidePointerEvents: () => props.disableOutsidePointerEvents,
  onEscapeKeyDown: event => emit('escapeKeyDown', event),
  onPointerDownOutside: event => emit('pointerDownOutside', event),
  onFocusOutside: event => event.preventDefault(),
  onDismiss: () => onOpenChange(false)
});

const popupStyle = computed(() => ({
  outline: 'none',
  pointerEvents: pointerEvents.value as CSSProperties['pointerEvents']
}));
</script>

<template>
  <PopperPositioner
    v-if="isPresent"
    :ref="setPositionerElement"
    data-soybean-tree-select-content
    v-bind="props"
    @focus.capture="onFocusCapture"
    @blur.capture="onBlurCapture"
    @contextmenu.prevent
  >
    <div
      :id="contentId"
      data-soybean-tree-select-popup
      :class="cls"
      :data-state="dataState"
      :dir="dir"
      :style="popupStyle"
    >
      <div
        data-soybean-tree-select-panel
        :class="panelCls"
        role="tree"
        :aria-multiselectable="multiple ? true : undefined"
      >
        <slot />
      </div>
    </div>
  </PopperPositioner>
</template>
