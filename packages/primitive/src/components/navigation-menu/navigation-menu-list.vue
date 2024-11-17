<script lang="ts">
import { onMounted } from 'vue';
import type { PrimitiveProps } from '../primitive';
import { Primitive } from '../Primitive';
import { useForwardExpose } from '../../composables';
</script>

<script setup lang="ts">
import { injectNavigationMenuContext } from './navigation-menu-root.vue';

export interface NavigationMenuListProps extends PrimitiveProps {}

defineOptions({
  inheritAttrs: false
});

const props = withDefaults(defineProps<NavigationMenuListProps>(), {
  as: 'ul'
});

const menuContext = injectNavigationMenuContext();
const { forwardRef, currentElement } = useForwardExpose();

onMounted(() => {
  menuContext.onIndicatorTrackChange(currentElement.value);
});
</script>

<template>
  <Primitive :ref="forwardRef" style="position: relative">
    <Primitive v-bind="$attrs" :as-child="props.asChild" :as :data-orientation="menuContext.orientation">
      <slot />
    </Primitive>
  </Primitive>
</template>
