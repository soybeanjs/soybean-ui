<script setup lang="ts">
import { computed, useAttrs } from 'vue';
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

const attrs = useAttrs();

const forwarded = useForwardPropsEmits(props, emit);

const { open } = injectMenuContext();

const { modal } = injectMenuRootContext();

const present = computed(() => props.forceMount || open.value);

const bindAttrs = computed(() => ({ ...attrs, ...forwarded.value }));
</script>

<template>
  <Presence :present="present">
    <MenuRootContentModal v-if="modal" v-bind="bindAttrs">
      <slot />
    </MenuRootContentModal>
    <MenuRootContentNonModal v-else v-bind="bindAttrs">
      <slot />
    </MenuRootContentNonModal>
  </Presence>
</template>
