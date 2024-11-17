<script setup lang="ts">
import { computed, nextTick, onMounted, ref, useTemplateRef, watch } from 'vue';
import { useEventListener } from '@vueuse/core';
import { useForwardExpose } from '../../composables';
import { Primitive } from '../primitive';
import { Presence } from '../presence';
import { injectCollapsibleRootContext } from './context';
import type { CollapsibleContentEmits, CollapsibleContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'CollapsibleContent',
  inheritAttrs: false
});

const props = defineProps<CollapsibleContentPropsWithPrimitive>();
const emit = defineEmits<CollapsibleContentEmits>();

const presentRef = useTemplateRef('presentRef');
const { forwardRef, currentElement } = useForwardExpose();

const rootContext = injectCollapsibleRootContext();
rootContext.initContentId();

const present = computed(() => props.forceMount || rootContext.open.value);

const width = ref(0);
const height = ref(0);

// when opening we want it to immediately open to retrieve dimensions
// when closing we delay `present` to retrieve dimensions before closing
const isOpen = computed(() => rootContext.open.value);
const isMountAnimationPrevented = ref(isOpen.value);
const currentStyle = ref<Record<string, string>>();

const hidden = computed(() => {
  if (present.value) return undefined;

  if (rootContext.unmountOnHide.value) return '';

  return 'until-found';
});
const skipAnimation = computed(() => isMountAnimationPrevented.value && rootContext.open.value);
const dataState = computed(() => (skipAnimation.value ? undefined : rootContext.dataState.value));

async function handleAnimation() {
  await nextTick();
  const node = currentElement.value;
  if (!node) return;

  currentStyle.value ||= {
    transitionDuration: node.style.transitionDuration,
    animationName: node.style.animationName
  };

  // block any animations/transitions so the element renders at its full dimensions
  node.style.transitionDuration = '0s';
  node.style.animationName = 'none';

  // get width and height from full dimensions
  const rect = node.getBoundingClientRect();
  height.value = rect.height;
  width.value = rect.width;

  // kick off any animations/transitions that were originally set up if it isn't the initial mount
  if (!isMountAnimationPrevented.value) {
    node.style.transitionDuration = currentStyle.value.transitionDuration;
    node.style.animationName = currentStyle.value.animationName;
  }
}

watch(() => [isOpen.value, presentRef.value?.present], handleAnimation, { immediate: true });

onMounted(() => {
  requestAnimationFrame(() => {
    isMountAnimationPrevented.value = false;
  });
});

useEventListener(currentElement, 'beforematch', () => {
  requestAnimationFrame(() => {
    rootContext.onOpenToggle();
    emit('contentFound');
  });
});
</script>

<template>
  <Presence ref="presentRef" :present force-mount>
    <Primitive
      v-bind="$attrs"
      :id="rootContext.contentId"
      :ref="forwardRef"
      :as-child
      :as
      :hidden
      :data-state
      :data-disabled="rootContext.dataDisabled"
      :class="props.class"
      :style="{
        [`--soybean-collapsible-content-height`]: `${height}px`,
        [`--soybean-collapsible-content-width`]: `${width}px`
      }"
    >
      <slot />
    </Primitive>
  </Presence>
</template>
