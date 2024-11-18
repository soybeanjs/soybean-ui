<script setup lang="ts">
import { useForwardPropsEmits } from '../../composables';
import MenuContentImpl from './menu-content-impl.vue';
import { injectMenuContext } from './context';
import type { MenuRootContentNonModalEmits, MenuRootContentNonModalPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuRootContentNonModal'
});

const props = defineProps<MenuRootContentNonModalPropsWithPrimitive>();
const emit = defineEmits<MenuRootContentNonModalEmits>();
const forwarded = useForwardPropsEmits(props, emit);

const menuContext = injectMenuContext();
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
