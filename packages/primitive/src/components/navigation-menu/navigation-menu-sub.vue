<script setup lang="ts">
import { ref } from 'vue';
import type { Ref } from 'vue';
import { useVModel } from '@vueuse/core';
import { Primitive } from '../primitive';
import { useCollection, useForwardExpose } from '../../composables';
import { injectNavigationMenuRootContext, provideNavigationMenuRootContext } from './context';
import type { NavigationMenuSubEmits, NavigationMenuSubPropsWithPrimitive } from './types';

defineOptions({
  name: 'NavigationMenuSub'
});

const props = withDefaults(defineProps<NavigationMenuSubPropsWithPrimitive>(), {
  orientation: 'horizontal',
  defaultValue: ''
});

const emit = defineEmits<NavigationMenuSubEmits>();

const modelValue = useVModel(props, 'modelValue', emit, {
  defaultValue: props.defaultValue,
  passive: (props.modelValue === undefined) as false
}) as Ref<string>;

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
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :data-orientation="orientation"
      data-soybean-navigation-menu
    >
      <slot :model-value="modelValue" />
    </Primitive>
  </CollectionSlot>
</template>
