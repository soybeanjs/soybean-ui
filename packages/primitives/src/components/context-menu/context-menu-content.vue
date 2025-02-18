<script setup lang="ts">
import { computed, ref } from 'vue';
import { useForwardExpose, useForwardPropsEmits } from '../../composables';
import MenuContent from '../menu/menu-content.vue';
import type { FocusOutsideEvent, PointerDownOutsideEvent } from '../../types';
import { injectContextMenuRootContext } from './context';
import type { ContextMenuContentEmits, ContextMenuContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'ContextMenuContent'
});

const props = withDefaults(defineProps<ContextMenuContentPropsWithPrimitive>(), {
  alignOffset: 0,
  avoidCollisions: true,
  collisionBoundary: () => [],
  collisionPadding: 0,
  sticky: 'partial',
  hideWhenDetached: false
});

const emit = defineEmits<ContextMenuContentEmits>();

const forwarded = useForwardPropsEmits(props, emit);

const { modal } = injectContextMenuRootContext();

const hasInteractedOutside = ref(false);

const style = computed<Record<string, string>>(() => ({
  '--soybean-context-menu-content-transform-origin': 'var(--soybean-popper-transform-origin)',
  '--soybean-context-menu-content-available-width': 'var(--soybean-popper-available-width)',
  '--soybean-context-menu-content-available-height': 'var(--soybean-popper-available-height)',
  '--soybean-context-menu-trigger-width': 'var(--soybean-popper-anchor-width)',
  '--soybean-context-menu-trigger-height': 'var(--soybean-popper-anchor-height)'
}));

function onCloseAutoFocus(event: Event) {
  if (!event.defaultPrevented && hasInteractedOutside.value) {
    event.preventDefault();
  }
  hasInteractedOutside.value = false;
}

function onInteractOutside(event: PointerDownOutsideEvent | FocusOutsideEvent) {
  if (!event.defaultPrevented && !modal.value) {
    hasInteractedOutside.value = true;
  }
}

useForwardExpose();
</script>

<template>
  <MenuContent
    v-bind="forwarded"
    side="right"
    :side-offset="2"
    align="start"
    update-position-strategy="always"
    :style="style"
    @close-auto-focus="onCloseAutoFocus"
    @interact-outside="onInteractOutside"
  >
    <slot />
  </MenuContent>
</template>
