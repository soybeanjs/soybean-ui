<script setup lang="ts">
import { useForwardExpose, useForwardPropsEmits, useHideOthers } from '../../composables';
import MenuContentImpl, { type MenuContentImplEmits, type MenuRootContentTypeProps } from './menu-content-impl.vue';
import { injectMenuContext } from './menu-root.vue';

const props = defineProps<MenuRootContentModalProps>();
const emits = defineEmits<MenuRootContentModalEmits>();
const forwarded = useForwardPropsEmits(props, emits);

const menuContext = injectMenuContext();

interface MenuRootContentModalProps extends MenuRootContentTypeProps {}
type MenuRootContentModalEmits = MenuContentImplEmits;

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
    @focus-outside.prevent="emits('focusOutside', $event)"
  >
    <slot />
  </MenuContentImpl>
</template>
