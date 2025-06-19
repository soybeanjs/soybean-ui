<script setup lang="ts">
import { nextTick, onMounted, shallowRef } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { useExposedElement } from '../../composables';
import { clamp } from '../../shared';
import { Primitive } from '../primitive';
import {
  provideSelectItemAlignedPositionContext,
  useCollectionContext,
  useSelectContentContext,
  useSelectRootContext
} from './context';
import { CONTENT_MARGIN } from './shared';
import type { SelectItemAlignedPositionEmits, SelectItemAlignedPositionProps } from './types';

defineOptions({
  name: 'SelectItemAlignedPosition',
  inheritAttrs: false
});

const props = defineProps<SelectItemAlignedPositionProps>();

const emit = defineEmits<SelectItemAlignedPositionEmits>();

const { dir, triggerElement, valueElement } = useSelectRootContext('SelectItemAlignedPosition');
const { viewportElement, selectedItemElement, selectedItemTextElement, focusSelectedItem } =
  useSelectContentContext('SelectItemAlignedPosition');
const { getOrderedElements } = useCollectionContext('SelectItemAlignedPosition');

const [contentElement, setContentElement] = useExposedElement();

const contentWrapperElement = shallowRef<HTMLElement>();

const shouldExpandOnScroll = shallowRef(false);

let shouldReposition = true;

function position() {
  if (
    !triggerElement.value ||
    !valueElement.value ||
    !contentWrapperElement.value ||
    !contentElement.value ||
    !viewportElement.value ||
    !selectedItemElement.value ||
    !selectedItemTextElement.value
  )
    return;

  const triggerRect = triggerElement.value.getBoundingClientRect();

  // -----------------------------------------------------------------------------------------
  //  Horizontal positioning
  // -----------------------------------------------------------------------------------------
  const contentRect = contentElement.value.getBoundingClientRect();
  const valueNodeRect = valueElement.value.getBoundingClientRect();
  const itemTextRect = selectedItemTextElement.value.getBoundingClientRect();

  if (dir.value !== 'rtl') {
    const itemTextOffset = itemTextRect.left - contentRect.left;
    const left = valueNodeRect.left - itemTextOffset;
    const leftDelta = triggerRect.left - left;
    const minContentWidth = triggerRect.width + leftDelta;
    const contentWidth = Math.max(minContentWidth, contentRect.width);
    const rightEdge = window.innerWidth - CONTENT_MARGIN;
    const clampedLeft = clamp(left, CONTENT_MARGIN, Math.max(CONTENT_MARGIN, rightEdge - contentWidth));

    contentWrapperElement.value.style.minWidth = `${minContentWidth}px`;
    contentWrapperElement.value.style.left = `${clampedLeft}px`;
  } else {
    const itemTextOffset = contentRect.right - itemTextRect.right;
    const right = window.innerWidth - valueNodeRect.right - itemTextOffset;
    const rightDelta = window.innerWidth - triggerRect.right - right;
    const minContentWidth = triggerRect.width + rightDelta;
    const contentWidth = Math.max(minContentWidth, contentRect.width);
    const leftEdge = window.innerWidth - CONTENT_MARGIN;
    const clampedRight = clamp(right, CONTENT_MARGIN, Math.max(CONTENT_MARGIN, leftEdge - contentWidth));

    contentWrapperElement.value.style.minWidth = `${minContentWidth}px`;
    contentWrapperElement.value.style.right = `${clampedRight}px`;
  }

  // -----------------------------------------------------------------------------------------
  // Vertical positioning
  // -----------------------------------------------------------------------------------------
  const items = getOrderedElements();
  const availableHeight = window.innerHeight - CONTENT_MARGIN * 2;
  const itemsHeight = viewportElement.value.scrollHeight;

  const contentStyles = window.getComputedStyle(contentElement.value);
  const contentBorderTopWidth = Number.parseInt(contentStyles.borderTopWidth, 10);
  const contentPaddingTop = Number.parseInt(contentStyles.paddingTop, 10);
  const contentBorderBottomWidth = Number.parseInt(contentStyles.borderBottomWidth, 10);
  const contentPaddingBottom = Number.parseInt(contentStyles.paddingBottom, 10);

  const fullContentHeight =
    contentBorderTopWidth + contentPaddingTop + itemsHeight + contentPaddingBottom + contentBorderBottomWidth;
  const minContentHeight = Math.min(selectedItemElement.value.offsetHeight * 5, fullContentHeight);

  const viewportStyles = window.getComputedStyle(viewportElement.value);
  const viewportPaddingTop = Number.parseInt(viewportStyles.paddingTop, 10);
  const viewportPaddingBottom = Number.parseInt(viewportStyles.paddingBottom, 10);

  const topEdgeToTriggerMiddle = triggerRect.top + triggerRect.height / 2 - CONTENT_MARGIN;
  const triggerMiddleToBottomEdge = availableHeight - topEdgeToTriggerMiddle;

  const selectedItemHalfHeight = selectedItemElement.value.offsetHeight / 2;
  const itemOffsetMiddle = selectedItemElement.value.offsetTop + selectedItemHalfHeight;
  const contentTopToItemMiddle = contentBorderTopWidth + contentPaddingTop + itemOffsetMiddle;
  const itemMiddleToContentBottom = fullContentHeight - contentTopToItemMiddle;

  const willAlignWithoutTopOverflow = contentTopToItemMiddle <= topEdgeToTriggerMiddle;

  if (willAlignWithoutTopOverflow) {
    const isLastItem = selectedItemElement.value === items[items.length - 1];
    contentWrapperElement.value.style.bottom = `${0}px`;
    const viewportOffsetBottom =
      contentElement.value.clientHeight - viewportElement.value.offsetTop - viewportElement.value.offsetHeight;
    const clampedTriggerMiddleToBottomEdge = Math.max(
      triggerMiddleToBottomEdge,
      selectedItemHalfHeight +
        // viewport might have padding bottom, include it to avoid a scrollable viewport
        (isLastItem ? viewportPaddingBottom : 0) +
        viewportOffsetBottom +
        contentBorderBottomWidth
    );
    const height = contentTopToItemMiddle + clampedTriggerMiddleToBottomEdge;
    contentWrapperElement.value.style.height = `${height}px`;
  } else {
    const isFirstItem = selectedItemElement.value === items[0];
    contentWrapperElement.value.style.top = `${0}px`;
    const clampedTopEdgeToTriggerMiddle = Math.max(
      topEdgeToTriggerMiddle,
      contentBorderTopWidth +
        viewportElement.value.offsetTop +
        // viewport might have padding top, include it to avoid a scrollable viewport
        (isFirstItem ? viewportPaddingTop : 0) +
        selectedItemHalfHeight
    );
    const height = clampedTopEdgeToTriggerMiddle + itemMiddleToContentBottom;
    contentWrapperElement.value.style.height = `${height}px`;
    viewportElement.value.scrollTop = contentTopToItemMiddle - topEdgeToTriggerMiddle + viewportElement.value.offsetTop;
  }

  contentWrapperElement.value.style.margin = `${CONTENT_MARGIN}px 0`;
  contentWrapperElement.value.style.minHeight = `${minContentHeight}px`;
  contentWrapperElement.value.style.maxHeight = `${availableHeight}px`;
  // -----------------------------------------------------------------------------------------

  emit('placed');

  // we don't want the initial scroll position adjustment to trigger "expand on scroll"
  // so we explicitly turn it on only after they've registered.
  requestAnimationFrame(() => {
    shouldExpandOnScroll.value = true;
  });
}

// copy z-index from content to wrapper
const contentZIndex = shallowRef('');
const getContentZIndex = () => {
  if (contentElement.value) {
    contentZIndex.value = window.getComputedStyle(contentElement.value).zIndex;
  }
};

// When the viewport becomes scrollable at the top, the scroll up button will mount.
// Because it is part of the normal flow, it will push down the viewport, thus throwing our
// trigger => selectedItem alignment off by the amount the viewport was pushed down.
// We wait for this to happen and then re-run the positioning logic one more time to account for it.
function onScrollButtonChange(node: HTMLElement | undefined) {
  if (!node || !shouldReposition) return;

  position();
  focusSelectedItem();
  shouldReposition = false;
}

provideSelectItemAlignedPositionContext({
  contentWrapperElement,
  shouldExpandOnScroll,
  onScrollButtonChange
});

// Resize and position when trigger element changes
useResizeObserver(triggerElement, () => {
  position();
});

onMounted(async () => {
  await nextTick();
  position();
  getContentZIndex();
});
</script>

<template>
  <div
    ref="contentWrapperElement"
    style="display: flex; flex-direction: column; position: fixed"
    :style="{
      zIndex: contentZIndex
    }"
  >
    <Primitive
      v-bind="{ ...$attrs, ...props }"
      :ref="setContentElement"
      :style="{
        // When we get the height of the content, it includes borders. If we were to set
        // the height without having `boxSizing: 'border-box'` it would be too big.
        boxSizing: 'border-box',
        // We need to ensure the content doesn't get taller than the wrapper
        maxHeight: '100%'
      }"
    >
      <slot />
    </Primitive>
  </div>
</template>
