<script setup lang="ts">
import { Presence } from '../presence';
import { useForwardPropsEmits } from '../../composables';
import MenuRootContentModal from './menu-root-content-modal.vue';
import MenuRootContentNonModal from './menu-root-content-non-modal.vue';
import { injectMenuContext, injectMenuRootContext } from './context';
import type { MenuContentImplEmits, MenuContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuContent',
  inheritAttrs: false
});

const props = defineProps<MenuContentPropsWithPrimitive>();

const emit = defineEmits<MenuContentImplEmits>();

const forwarded = useForwardPropsEmits(props, emit);

const menuContext = injectMenuContext();

const rootContext = injectMenuRootContext();
</script>

<template>
  <Presence :present="forceMount || menuContext.open.value">
    <MenuRootContentModal v-if="rootContext.modal.value" v-bind="{ ...$attrs, ...forwarded }">
      <slot />
    </MenuRootContentModal>
    <MenuRootContentNonModal v-else v-bind="{ ...$attrs, ...forwarded }">
      <slot />
    </MenuRootContentNonModal>
  </Presence>
</template>
