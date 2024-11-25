<script setup lang="ts">
import { computed } from 'vue';
import { isClient, reactiveOmit } from '@vueuse/shared';
import { Presence } from '../presence';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import type { NavigationMenuContentEmits, NavigationMenuContentPropsWithPrimitive } from './types';
import { injectNavigationMenuItemContext, injectNavigationMenuRootContext } from './context';
import { getOpenState, whenMouse } from './shared';
import NavigationMenuContentImpl from './navigation-menu-content-impl.vue';

defineOptions({
  name: 'NavigationMenuContent',
  inheritAttrs: false
});

const props = defineProps<NavigationMenuContentPropsWithPrimitive>();
const emit = defineEmits<NavigationMenuContentEmits>();

const forwarded = useForwardPropsEmits(reactiveOmit(props, 'forceMount'), emit);
const { forwardRef } = useForwardExpose();

const menuContext = injectNavigationMenuRootContext();
const itemContext = injectNavigationMenuItemContext();

const open = computed(() => itemContext.value === menuContext.modelValue.value);

// We persist the last active content value as the viewport may be animating out
// and we want the content to remain mounted for the lifecycle of the viewport.
const isLastActiveValue = computed(() => {
  if (menuContext.viewport.value) {
    if (!menuContext.modelValue.value && menuContext.previousValue.value)
      return menuContext.previousValue.value === itemContext.value;
  }
  return false;
});
</script>

<template>
  <Teleport
    :to="isClient && menuContext.viewport.value ? menuContext.viewport.value : 'body'"
    :disabled="isClient && menuContext.viewport.value ? !menuContext.viewport.value : true"
  >
    <Presence
      v-slot="{ present }"
      :present="forceMount || open || isLastActiveValue"
      :force-mount="!menuContext.unmountOnHide.value"
    >
      <NavigationMenuContentImpl
        v-bind="{ ...$attrs, ...forwarded }"
        :ref="forwardRef"
        :data-state="getOpenState(open)"
        :style="{
          pointerEvents: !open && menuContext.isRootMenu ? 'none' : undefined
        }"
        :hidden="!present"
        @pointerenter="menuContext.onContentEnter(itemContext.value)"
        @pointerleave="whenMouse(() => menuContext.onContentLeave())($event)"
        @pointer-down-outside="emit('pointerDownOutside', $event)"
        @focus-outside="emit('focusOutside', $event)"
        @interact-outside="emit('interactOutside', $event)"
      >
        <slot />
      </NavigationMenuContentImpl>
    </Presence>
  </Teleport>
</template>
