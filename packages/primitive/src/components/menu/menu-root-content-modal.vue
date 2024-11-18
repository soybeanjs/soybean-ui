<script setup lang="ts">
import { useForwardExpose, useForwardPropsEmits, useHideOthers } from '../../composables';
import MenuContentImpl from './menu-content-impl.vue';
import { injectMenuContext } from './context';
import type { MenuRootContentModalEmits, MenuRootContentModalPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuRootContentModal'
});

const props = defineProps<MenuRootContentModalPropsWithPrimitive>();

const emit = defineEmits<MenuRootContentModalEmits>();

const forwarded = useForwardPropsEmits(props, emit);

const menuContext = injectMenuContext();

const { forwardRef, currentElement } = useForwardExpose();

useHideOthers(currentElement);
</script>

<template>
  <MenuContentImpl
    v-bind="forwarded"
    :ref="forwardRef"
    :trap-focus="menuContext.open.value"
    :disable-outside-pointer-events="menuContext.open.value"
    :disable-outside-scroll="true"
    @dismiss="menuContext.onOpenChange(false)"
    @focus-outside.prevent="emit('focusOutside', $event)"
  >
    <slot />
  </MenuContentImpl>
</template>
