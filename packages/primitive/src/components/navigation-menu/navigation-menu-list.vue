<script setup lang="ts">
import { onMounted } from 'vue';
import { Primitive } from '../primitive';
import { useForwardExpose } from '../../composables';
import { injectNavigationMenuRootContext } from './context';
import type { NavigationMenuListPropsWithPrimitive } from './types';

defineOptions({
  name: 'NavigationMenuList',
  inheritAttrs: false
});

const props = withDefaults(defineProps<NavigationMenuListPropsWithPrimitive>(), {
  as: 'ul'
});

const menuContext = injectNavigationMenuRootContext();
const { forwardRef, currentElement } = useForwardExpose();

onMounted(() => {
  menuContext.onIndicatorTrackChange(currentElement.value);
});
</script>

<template>
  <Primitive :ref="forwardRef" style="position: relative">
    <Primitive
      v-bind="$attrs"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :data-orientation="menuContext.orientation"
    >
      <slot />
    </Primitive>
  </Primitive>
</template>
