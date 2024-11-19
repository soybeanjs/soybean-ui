<script setup lang="ts">
import { computed, ref, toRefs, watchEffect } from 'vue';
import { refAutoReset, useDebounceFn } from '@vueuse/core';
import { Primitive } from '../primitive';
import { useCollection, useDirection, useForwardExpose, useId } from '../../composables';
import { provideNavigationMenuRootContext } from './context';
import type { NavigationMenuRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'NavigationMenuRoot'
});

const props = withDefaults(defineProps<NavigationMenuRootPropsWithPrimitive>(), {
  as: 'nav',
  modelValue: undefined,
  delayDuration: 200,
  skipDelayDuration: 300,
  orientation: 'horizontal',
  disableClickTrigger: false,
  disableHoverTrigger: false,
  unmountOnHide: true
});

const modelValue = defineModel<string>({ default: props.defaultValue ?? '' });

const previousValue = ref('');

const { forwardRef, currentElement: rootNavigationMenu } = useForwardExpose();

const indicatorTrack = ref<HTMLElement>();
const viewport = ref<HTMLElement>();
const activeTrigger = ref<HTMLElement>();

const { getItems, CollectionSlot } = useCollection({ key: 'NavigationMenu', isProvider: true });

const {
  delayDuration,
  skipDelayDuration,
  dir: propDir,
  disableClickTrigger,
  disableHoverTrigger,
  unmountOnHide
} = toRefs(props);
const dir = useDirection(propDir);

const isDelaySkipped = refAutoReset(false, skipDelayDuration);
const computedDelay = computed(() => {
  const isOpen = modelValue.value !== '';
  if (isOpen || isDelaySkipped.value) return 150; // 150ms for user to switch trigger or move into content view
  return delayDuration.value;
});

const debouncedFn = useDebounceFn((val?: string) => {
  // passing `undefined` meant to reset the debounce timer
  if (typeof val === 'string') {
    previousValue.value = modelValue.value;
    modelValue.value = val;
  }
}, computedDelay);

watchEffect(() => {
  if (!modelValue.value) return;

  const items = getItems().map(i => i.ref);
  activeTrigger.value = items.find(item => item.id.includes(modelValue.value));
});

provideNavigationMenuRootContext({
  isRootMenu: true,
  modelValue,
  previousValue,
  baseId: useId(undefined, 'soybean-navigation-menu'),
  disableClickTrigger,
  disableHoverTrigger,
  dir,
  unmountOnHide,
  orientation: props.orientation,
  rootNavigationMenu,
  indicatorTrack,
  activeTrigger,
  onIndicatorTrackChange: val => {
    indicatorTrack.value = val;
  },
  viewport,
  onViewportChange: val => {
    viewport.value = val;
  },
  onTriggerEnter: val => {
    debouncedFn(val);
  },
  onTriggerLeave: () => {
    isDelaySkipped.value = true;
    debouncedFn('');
  },
  onContentEnter: () => {
    debouncedFn();
  },
  onContentLeave: () => {
    if (!props.disablePointerLeaveClose) debouncedFn('');
  },
  onItemSelect: val => {
    // When selecting item we trigger update immediately
    previousValue.value = modelValue.value;
    modelValue.value = val;
  },
  onItemDismiss: () => {
    previousValue.value = modelValue.value;
    modelValue.value = '';
  }
});
</script>

<template>
  <CollectionSlot>
    <Primitive
      :ref="forwardRef"
      aria-label="Main"
      :as
      :as-child
      :data-orientation="orientation"
      :dir="dir"
      data-soybean-navigation-menu
    >
      <slot :model-value="modelValue" />
    </Primitive>
  </CollectionSlot>
</template>
