<script setup lang="ts">
import { computed, nextTick, onMounted, shallowRef, watch } from 'vue';
import { useForwardElement, usePresence } from '../../composables';
import { Primitive } from '../primitive';
import { useCollapsibleRootContext } from './context';
import { collapsibleContentCssVars } from './shared';
import type { CollapsibleContentProps } from './types';

defineOptions({
  name: 'CollapsibleContent'
});

const props = defineProps<CollapsibleContentProps>();

const [contentElement, setContentElement] = useForwardElement();

const { contentId, initContentId, open, dataDisabled, dataState, unmountOnHide } =
  useCollapsibleRootContext('CollapsibleContent');

const isPresent = props.forceMount ? shallowRef(true) : usePresence(contentElement, open, handleNodeStyle);

// when opening we want it to immediately open to retrieve dimensions
// when closing we delay `present` to retrieve dimensions before closing
const isOpen = computed(() => isPresent.value || open.value);
let isMountAnimationPrevented = open.value;
let originalStyles: Pick<CSSStyleDeclaration, 'transitionDuration' | 'animationName'>;

const hidden = computed(() => {
  if (isOpen.value) {
    return undefined;
  }

  return unmountOnHide.value ? '' : 'until-found';
});

function handleNodeStyle() {
  const node = contentElement.value;

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

  if (!isMountAnimationPrevented) {
    // kick off any animations/transitions that were originally set up if it isn't the initial mount
    nodeStyle.transitionDuration = originalStyles.transitionDuration;
    nodeStyle.animationName = originalStyles.animationName;
  }
}

watch(
  isOpen,
  async () => {
    await nextTick();
    handleNodeStyle();
  },
  { immediate: true, flush: 'post' }
);

initContentId();

onMounted(() => {
  requestAnimationFrame(() => {
    isMountAnimationPrevented = false;
  });
});
</script>

<template>
  <Primitive
    v-bind="props"
    :id="contentId"
    :ref="setContentElement"
    :data-disabled="dataDisabled"
    :data-state="dataState"
    :hidden="hidden"
    :style="{
      [collapsibleContentCssVars.width]: '0px',
      [collapsibleContentCssVars.height]: '0px'
    }"
  >
    <slot v-if="unmountOnHide ? isOpen : true" />
  </Primitive>
</template>
