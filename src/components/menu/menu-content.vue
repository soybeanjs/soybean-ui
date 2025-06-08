<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useForwardElement, useForwardListeners, useOmitProps, usePresence } from '../../composables';
import type { FocusOutsideEvent } from '../../types';
import { useMenuContext, useMenuRootContext } from './context';
import MenuContentImpl from './menu-content-impl.vue';
import type { MenuContentEmits, MenuContentPrivateProps } from './types';

defineOptions({
  name: 'MenuContent'
});

const props = defineProps<MenuContentPrivateProps>();

const emit = defineEmits<MenuContentEmits>();

const forwardedProps = useOmitProps(props, ['forceMount', 'elRef']);

const listeners = useForwardListeners(emit);

const { open } = useMenuContext('MenuContent');
const { modal } = useMenuRootContext('MenuContent');

const [contentElement, setContentElement] = useForwardElement(props.elRef);

const isPresent = props.forceMount ? shallowRef(true) : usePresence(contentElement, open);

const trapFocus = computed(() => modal.value && open.value);

const focusOutside = (event: FocusOutsideEvent) => {
  if (modal.value) {
    event.preventDefault();
  }
};
</script>

<template>
  <MenuContentImpl
    v-if="isPresent"
    v-bind="forwardedProps"
    :ref="setContentElement"
    :trap-focus="trapFocus"
    :disable-outside-pointer-events="trapFocus"
    v-on="listeners"
    @focus-outside="focusOutside"
  >
    <slot />
  </MenuContentImpl>
</template>
