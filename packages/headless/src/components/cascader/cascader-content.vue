<script setup lang="ts">
import { computed, shallowRef, useAttrs } from 'vue';
import type { ComponentPublicInstance, CSSProperties } from 'vue';
import {
  useDismissableLayer,
  useForwardElement,
  useForwardListeners,
  useOmitProps,
  usePresence
} from '../../composables';
import { PopperPositioner } from '../popper';
import { useCascaderRootContext, useCascaderUi } from './context';
import CascaderEmpty from './cascader-empty.vue';
import CascaderMenu from './cascader-menu.vue';
import type { CascaderContentProps, CascaderContentEmits } from './types';

defineOptions({
  name: 'CascaderContent',
  inheritAttrs: false
});

const props = withDefaults(defineProps<CascaderContentProps>(), {
  side: 'bottom',
  sideOffset: 4,
  align: 'start',
  avoidCollisions: true,
  collisionPadding: 10,
  disableOutsidePointerEvents: true,
  menuProps: () => ({}),
  emptyProps: () => ({})
});

const emit = defineEmits<CascaderContentEmits>();

const attrs = useAttrs();

const forwardedProps = useOmitProps(
  props,
  ['forceMount', 'disableOutsidePointerEvents', 'menuProps', 'emptyProps'],
  attrs
);

const listeners = useForwardListeners(emit);

const {
  open,
  onOpenChange,
  dataState,
  dir,
  contentId,
  contentElement,
  onContentElementChange,
  handleKeydown,
  isSearchMode,
  searchLoading,
  menus,
  searchResults
} = useCascaderRootContext('CascaderContent');

const cls = useCascaderUi('popup');
const panelCls = useCascaderUi('panel');

const [positionerElement, setPositionerElement] = useForwardElement();

// Manual ref callback for the content element so the context ref is properly
// cleared on unmount (useForwardElement's callback is not invoked with undefined).
const setContentElement = (el: Element | ComponentPublicInstance | null) => {
  const node = (el as ComponentPublicInstance)?.$el ?? el;
  onContentElementChange(node instanceof HTMLElement ? node : undefined);
};

const isPresent = props.forceMount ? shallowRef(true) : usePresence(contentElement, open);

const { pointerEvents } = useDismissableLayer(positionerElement, {
  disableOutsidePointerEvents: () => props.disableOutsidePointerEvents,
  onEscapeKeyDown: event => emit('escapeKeyDown', event),
  onPointerDownOutside: event => emit('pointerDownOutside', event),
  onFocusOutside: event => event.preventDefault(),
  onDismiss: () => onOpenChange(false)
});

const popupStyle = computed<CSSProperties>(() => ({
  outline: 'none',
  pointerEvents: pointerEvents.value
}));

/** Whether the panel has nothing to show and falls back to the empty state. */
const isEmpty = computed(() => {
  if (isSearchMode.value) {
    // Suppress "no data" while a remote search is still loading.
    if (searchLoading.value) return false;
    return searchResults.value.length === 0;
  }
  return menus.value.length === 0 || menus.value[0]!.length === 0;
});
</script>

<template>
  <PopperPositioner
    v-if="isPresent"
    :ref="setPositionerElement"
    data-soybean-cascader-content
    v-bind="forwardedProps"
    v-on="listeners"
    @contextmenu.prevent
    @keydown="handleKeydown"
  >
    <div
      :id="contentId"
      :ref="setContentElement"
      data-soybean-cascader-popup
      :class="cls"
      :data-state="dataState"
      :dir="dir"
      :style="popupStyle"
    >
      <div data-soybean-cascader-panel :class="panelCls" role="tree">
        <template v-if="isSearchMode">
          <CascaderMenu :level="0" v-bind="menuProps">
            <template #default="slotProps">
              <slot name="option" v-bind="slotProps">
                {{ slotProps.node.label }}
              </slot>
            </template>
          </CascaderMenu>
        </template>
        <template v-else>
          <CascaderMenu v-for="(_menu, level) in menus" :key="level" :level="level" v-bind="menuProps">
            <template #default="slotProps">
              <slot name="option" v-bind="slotProps">
                {{ slotProps.node.label }}
              </slot>
            </template>
          </CascaderMenu>
        </template>
        <slot v-if="isEmpty" name="empty">
          <CascaderEmpty v-bind="emptyProps" />
        </slot>
        <slot />
      </div>
    </div>
  </PopperPositioner>
</template>
