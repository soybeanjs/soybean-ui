<script setup lang="ts">
import { computed, shallowRef } from 'vue';
import { useForwardListeners, useHideOthers, usePresence } from '../../composables';
import type { FocusOutsideEvent } from '../../types';
import { useMenuRootContext } from './context';
import MenuContentImpl from './menu-content-impl.vue';
import type { MenuContentEmits, MenuContentProps } from './types';

defineOptions({
  name: 'MenuContent'
});

const props = defineProps<MenuContentProps>();

const emit = defineEmits<MenuContentEmits>();

const { contentElement, open, modal } = useMenuRootContext('MenuContent');

const listeners = useForwardListeners(emit);

useHideOthers(contentElement, modal);

const isPresent = props.forceMount ? shallowRef(true) : usePresence(contentElement, open);

const trapFocus = computed(() => modal.value && open.value);

const focusOutside = (event: FocusOutsideEvent) => {
  emit('focusOutside', event);
  if (modal.value) {
    event.preventDefault();
  }
};
</script>

<template>
  <MenuContentImpl
    v-if="isPresent"
    v-bind="props"
    :trap-focus="trapFocus"
    :disable-outside-pointer-events="trapFocus"
    v-on="{ ...listeners, focusOutside }"
  >
    <slot />
  </MenuContentImpl>
</template>
