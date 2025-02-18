<script setup lang="ts">
import { computed } from 'vue';
import { useForwardPropsEmits } from '../../composables';
import { Presence } from '../presence';
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

const { open } = injectMenuContext();

const { modal } = injectMenuRootContext();

const present = computed(() => props.forceMount || open.value);
</script>

<template>
  <Presence :present="present">
    <MenuRootContentModal v-if="modal" v-bind="{ ...$attrs, ...forwarded }">
      <slot />
    </MenuRootContentModal>
    <MenuRootContentNonModal v-else v-bind="{ ...$attrs, ...forwarded }">
      <slot />
    </MenuRootContentNonModal>
  </Presence>
</template>
