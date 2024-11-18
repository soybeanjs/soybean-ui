<script setup lang="ts">
import { Presence } from '../presence';
import { useForwardPropsEmits } from '../../composables';
import type { MenuContentImplEmits, MenuRootContentTypeProps } from './MenuContentImpl.vue';

import MenuRootContentModal from './menu-root-content-modal.vue';
import MenuRootContentNonModal from './menu-root-content-non-modal.vue';
import { injectMenuContext, injectMenuRootContext } from './menu-root.vue';

export type MenuContentEmits = Omit<MenuContentImplEmits, 'entryFocus' | 'openAutoFocus'>;

export interface MenuContentProps extends MenuRootContentTypeProps {
  /** Used to force mounting when more control is needed. Useful when controlling animation with Vue animation libraries. */
  forceMount?: boolean;
}

const props = defineProps<MenuContentProps>();
const emits = defineEmits<MenuContentImplEmits>();
const forwarded = useForwardPropsEmits(props, emits);

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
