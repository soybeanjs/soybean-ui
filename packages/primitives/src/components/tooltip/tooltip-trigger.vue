<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useForwardExpose, useId } from '../../composables';
import { PopperAnchor } from '../popper';
import { Primitive } from '../primitive';
import { injectTooltipProviderContext, injectTooltipRootContext } from './context';
import type { TooltipTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'TooltipTrigger'
});

const props = withDefaults(defineProps<TooltipTriggerPropsWithPrimitive>(), {
  as: 'button'
});
const rootContext = injectTooltipRootContext();
const providerContext = injectTooltipProviderContext();

rootContext.contentId ||= useId(undefined, 'soybean-tooltip-content');

const { forwardRef, currentElement: triggerElement } = useForwardExpose();

const isPointerDown = ref(false);
const hasPointerMoveOpened = ref(false);

const tooltipListeners = computed(() => {
  if (rootContext.disabled.value) return {};

  return {
    click: handleClick,
    focus: handleFocus,
    pointermove: handlePointerMove,
    pointerleave: handlePointerLeave,
    pointerdown: handlePointerDown,
    blur: handleBlur
  };
});

onMounted(() => {
  rootContext.onTriggerChange(triggerElement.value);
});

function handlePointerUp() {
  setTimeout(() => {
    isPointerDown.value = false;
  }, 1);
}

function handlePointerDown() {
  if (rootContext.open && !rootContext.disableClosingTrigger.value) {
    rootContext.onClose();
  }
  isPointerDown.value = true;
  document.addEventListener('pointerup', handlePointerUp, { once: true });
}

function handlePointerMove(event: PointerEvent) {
  if (event.pointerType === 'touch') return;
  if (!hasPointerMoveOpened.value && !providerContext.isPointerInTransitRef.value) {
    rootContext.onTriggerEnter();
    hasPointerMoveOpened.value = true;
  }
}

function handlePointerLeave() {
  rootContext.onTriggerLeave();
  hasPointerMoveOpened.value = false;
}

function handleFocus(event: FocusEvent) {
  if (isPointerDown.value) return;

  if (rootContext.ignoreNonKeyboardFocus.value && !(event.target as HTMLElement).matches?.(':focus-visible')) return;

  rootContext.onOpen();
}

function handleBlur() {
  rootContext.onClose();
}

function handleClick() {
  if (!rootContext.disableClosingTrigger.value) rootContext.onClose();
}
</script>

<template>
  <PopperAnchor as-child :reference="reference">
    <Primitive
      :ref="forwardRef"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :aria-describedby="rootContext.open.value ? rootContext.contentId : undefined"
      :data-state="rootContext.stateAttribute.value"
      data-grace-area-trigger
      v-on="tooltipListeners"
    >
      <slot />
    </Primitive>
  </PopperAnchor>
</template>
