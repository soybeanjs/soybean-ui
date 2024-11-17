<script setup lang="ts">
import { useForwardPropsEmits } from '../../_shared';
import MenuContentImpl, { type MenuContentImplEmits, type MenuRootContentTypeProps } from './menu-content-impl.vue';
import { injectMenuContext } from './menu-root.vue';

const props = defineProps<MenuRootContentNonModalProps>();
const emits = defineEmits<MenuRootContentModalEmits>();
const forwarded = useForwardPropsEmits(props, emits);

const menuContext = injectMenuContext();

interface MenuRootContentNonModalProps extends MenuRootContentTypeProps {}
type MenuRootContentModalEmits = MenuContentImplEmits;
</script>

<template>
  <MenuContentImpl
    v-bind="forwarded"
    :trap-focus="false"
    :disable-outside-pointer-events="false"
    :disable-outside-scroll="false"
    @dismiss="menuContext.onOpenChange(false)"
  >
    <slot />
  </MenuContentImpl>
</template>
