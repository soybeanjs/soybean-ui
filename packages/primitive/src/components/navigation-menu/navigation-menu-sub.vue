<script setup lang="ts">
import { ref } from 'vue';
import { Primitive } from '../primitive';
import { useCollection, useForwardExpose } from '../../composables';
import type { NavigationMenuSubPropsWithPrimitive } from './types';
import { injectNavigationMenuRootContext, provideNavigationMenuRootContext } from './context';

defineOptions({
  name: 'NavigationMenuSub'
});

const props = withDefaults(defineProps<NavigationMenuSubPropsWithPrimitive>(), {
  orientation: 'horizontal'
});

const modelValue = defineModel<string>({ default: props.defaultValue ?? '' });

const previousValue = ref('');

const menuContext = injectNavigationMenuRootContext();
const { forwardRef, currentElement } = useForwardExpose();

const indicatorTrack = ref<HTMLElement>();
const viewport = ref<HTMLElement>();

const { CollectionSlot } = useCollection({ key: 'NavigationMenu', isProvider: true });

provideNavigationMenuRootContext({
  ...menuContext,
  isRootMenu: false,
  modelValue,
  previousValue,
  orientation: props.orientation,
  rootNavigationMenu: currentElement,
  indicatorTrack,
  onIndicatorTrackChange: val => {
    indicatorTrack.value = val;
  },
  viewport,
  onViewportChange: val => {
    viewport.value = val;
  },

  onTriggerEnter: val => {
    modelValue.value = val;
  },
  onTriggerLeave: () => {
    // do nothing for submenu
  },
  onContentEnter: () => {
    // do nothing for submenu
  },
  onContentLeave: () => {
    // do nothing for submenu
  },
  onItemSelect: val => {
    modelValue.value = val;
  },
  onItemDismiss: () => {
    modelValue.value = '';
  }
});
</script>

<template>
  <CollectionSlot>
    <Primitive
      :ref="forwardRef"
      :data-orientation="orientation"
      :as-child="props.asChild"
      :as
      data-soybean-navigation-menu
    >
      <slot :model-value="modelValue" />
    </Primitive>
  </CollectionSlot>
</template>
