<script setup lang="ts">
import { computed, shallowRef, useAttrs } from 'vue';
import { isClient, isMouseEvent } from '../../shared';
import { useExposedElement, useForwardListeners, useOmitProps, usePresence } from '../../composables';
import { useNavigationMenuItemContext, useNavigationMenuRootContext } from './context';
import NavigationMenuContentImpl from './navigation-menu-content-impl.vue';
import type { NavigationMenuContentEmits, NavigationMenuContentProps } from './types';

defineOptions({
  name: 'NavigationMenuContent',
  inheritAttrs: false
});

const props = defineProps<NavigationMenuContentProps>();

const emit = defineEmits<NavigationMenuContentEmits>();

const attrs = useAttrs();

const forwardedProps = useOmitProps(props, ['forceMount'], attrs);

const listeners = useForwardListeners(emit);

const { modelValue, viewportElement, previousValue, unmountOnHide, onContentEnter, onContentLeave } =
  useNavigationMenuRootContext('NavigationMenuContent');
const { value } = useNavigationMenuItemContext('NavigationMenuContent');

const [contentElement, setContentElement] = useExposedElement();

const open = computed(() => modelValue.value === value);

// We persist the last active content value as the viewport may be animating out
// and we want the content to remain mounted for the lifecycle of the viewport.
const isLastActiveValue = computed(() => {
  if (!viewportElement.value) {
    return false;
  }

  if (modelValue.value || !previousValue.value) {
    return false;
  }

  return previousValue.value === value;
});

const isPresent = props.forceMount
  ? shallowRef(true)
  : usePresence(contentElement, () => open.value || isLastActiveValue.value);

const to = computed(() => (isClient && viewportElement.value ? viewportElement.value : 'body'));
const disabledTeleport = computed(() => !isClient || !viewportElement.value);

const onPointerEnter = () => {
  onContentEnter(value);
};

const onPointerLeave = (event: PointerEvent) => {
  if (!isMouseEvent(event)) return;
  onContentLeave();
};
</script>

<template>
  <Teleport :to="to" :disabled="disabledTeleport">
    <NavigationMenuContentImpl
      v-if="isPresent"
      v-bind="forwardedProps"
      :ref="setContentElement"
      :hidden="!isPresent"
      v-on="listeners"
      @pointerenter="onPointerEnter"
      @pointerleave="onPointerLeave"
    >
      <slot v-if="!unmountOnHide || isPresent" />
    </NavigationMenuContentImpl>
  </Teleport>
</template>
