<script setup lang="ts">
import { ref, toRefs, watch, watchEffect } from 'vue';
import { Primitive } from '../primitive';
import { useForwardExpose, useId } from '../../composables';
import { isBrowser } from '../../shared';
import { useWindowSplitterResizeHandlerBehavior } from './composables';
import { injectSplitterGroupContext } from './context';
import { registerResizeHandle } from './utils/registry';
import { assert } from './utils/assert';
import type {
  ResizeEvent,
  ResizeHandler,
  ResizeHandlerAction,
  ResizeHandlerState,
  SplitterResizeHandleEmits,
  SplitterResizeHandlePropsWithPrimitive
} from './types';

defineOptions({
  name: 'SplitterResizeHandle'
});

const props = withDefaults(defineProps<SplitterResizeHandlePropsWithPrimitive>(), {
  tabindex: 0
});
const emit = defineEmits<SplitterResizeHandleEmits>();

const { forwardRef, currentElement } = useForwardExpose();
const { disabled } = toRefs(props);

const panelGroupContext = injectSplitterGroupContext();
if (panelGroupContext === null) {
  throw new Error('PanelResizeHandle components must be rendered within a PanelGroup container');
}

const {
  direction,
  groupId,
  registerResizeHandle: registerResizeHandleWithParentGroup,
  startDragging,
  stopDragging,
  panelGroupElement
} = panelGroupContext;

const resizeHandleId = useId(props.id, 'soybean-splitter-resize-handle');
const state = ref<ResizeHandlerState>('inactive');
const isFocused = ref(false);
const resizeHandler = ref<ResizeHandler | null>(null);

watch(
  disabled,
  () => {
    if (!isBrowser) return;
    if (disabled.value) resizeHandler.value = null;
    else resizeHandler.value = registerResizeHandleWithParentGroup(resizeHandleId);
  },
  { immediate: true }
);

watchEffect(onCleanup => {
  if (disabled.value || resizeHandler.value === null) return;

  const element = currentElement.value;
  if (!element) return;

  assert(element);

  const setResizeHandlerState = (action: ResizeHandlerAction, isActive: boolean, event: ResizeEvent) => {
    if (isActive) {
      // eslint-disable-next-line default-case
      switch (action) {
        case 'down': {
          state.value = 'drag';

          startDragging(resizeHandleId, event);
          emit('dragging', true);
          break;
        }
        case 'move': {
          if (state.value !== 'drag') state.value = 'hover';

          resizeHandler.value?.(event);
          break;
        }
        case 'up': {
          state.value = 'hover';

          stopDragging();
          emit('dragging', false);
          break;
        }
      }
    } else {
      state.value = 'inactive';
    }
  };

  onCleanup(
    registerResizeHandle(
      resizeHandleId,
      element,
      direction,
      {
        // Coarse inputs (e.g. finger/touch)
        coarse: props.hitAreaMargins?.coarse ?? 15,
        // Fine inputs (e.g. mouse)
        fine: props.hitAreaMargins?.fine ?? 5
      },
      setResizeHandlerState
    )
  );
});

useWindowSplitterResizeHandlerBehavior({
  disabled,
  resizeHandler,
  handleId: resizeHandleId,
  panelGroupElement
});
</script>

<template>
  <Primitive
    :id="resizeHandleId"
    :ref="forwardRef"
    :style="{
      touchAction: 'none',
      userSelect: 'none'
    }"
    :as
    :as-child
    role="separator"
    data-resize-handle=""
    :tabindex="tabindex"
    :data-state="state"
    :data-disabled="disabled ? '' : undefined"
    :data-orientation="direction"
    :data-panel-group-id="groupId"
    :data-resize-handle-active="state === 'drag' ? 'pointer' : isFocused ? 'keyboard' : undefined"
    :data-resize-handle-state="state"
    :data-panel-resize-handle-enabled="!disabled"
    :data-panel-resize-handle-id="resizeHandleId"
    @blur="isFocused = false"
    @focus="isFocused = false"
  >
    <slot />
  </Primitive>
</template>
