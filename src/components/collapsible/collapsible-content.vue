<script setup lang="ts">
import { computed, nextTick, onMounted, shallowRef } from 'vue';
import type { CSSProperties } from 'vue';
import { useForwardElement, usePresence } from '../../composables';
import { Primitive } from '../primitive';
import { useCollapsibleContext } from './context';
import { collapsibleContentCssVars } from './shared';
import type { CollapsibleContentProps } from './types';

const props = defineProps<CollapsibleContentProps>();

const { contentId, initContentId, open, disabled, unmountOnHide } = useCollapsibleContext('CollapsibleContent');

const { elRef, setElRef } = useForwardElement(true);

let originalStyles: Pick<CSSStyleDeclaration, 'transitionDuration' | 'animationName'>;

initContentId();

const isPresent = props.forceMount ? shallowRef(true) : usePresence(elRef, open, handleNodeStyle);

// when opening we want it to immediately open to retrieve dimensions
// when closing we delay `present` to retrieve dimensions before closing
const isOpen = computed(() => isPresent.value || open.value);
const $isOpen = isOpen.value;

const lockAnimationStyles = shallowRef<CSSProperties | undefined>(
  $isOpen ? { transitionDuration: '0s !important', animationName: 'none !important' } : undefined
);

const hidden = computed(() => {
  if (isOpen.value) {
    return undefined;
  }

  return unmountOnHide.value ? '' : 'until-found';
});

const style = computed<CSSProperties>(() => ({
  [collapsibleContentCssVars.width]: '0px',
  [collapsibleContentCssVars.height]: '0px',
  ...lockAnimationStyles.value
}));

function handleNodeStyle() {
  const node = elRef.value;

  if (!node) return;

  const nodeStyle = node.style;

  originalStyles ||= {
    transitionDuration: nodeStyle.transitionDuration,
    animationName: nodeStyle.animationName
  };

  // block any animations/transitions so the element renders at its full dimensions
  nodeStyle.transitionDuration = '0s';
  nodeStyle.animationName = 'none';

  // get width and height from full dimensions
  const rect = node.getBoundingClientRect();
  nodeStyle.setProperty(collapsibleContentCssVars.width, `${rect.width}px`);
  nodeStyle.setProperty(collapsibleContentCssVars.height, `${rect.height}px`);

  // kick off any animations/transitions that were originally set up if it isn't the initial mount
  nodeStyle.transitionDuration = originalStyles.transitionDuration;
  nodeStyle.animationName = originalStyles.animationName;
}

onMounted(async () => {
  if (!$isOpen) return;
  lockAnimationStyles.value = undefined;
  await nextTick();
  handleNodeStyle();
});
</script>

<template>
  <Primitive
    :id="contentId"
    :ref="setElRef"
    :class="props.class"
    :as="props.as"
    :data-disabled="disabled ? '' : undefined"
    :data-state="open ? 'open' : 'closed'"
    :hidden="hidden"
    :style="style"
  >
    <slot v-if="unmountOnHide ? isOpen : true" />
  </Primitive>
</template>
