<script setup lang="ts">
import { useForwardListeners } from '../../composables';
import type { FocusOutsideEvent, PointerDownOutsideEvent } from '../../types';
import { MenuContent } from '../menu';
import { useContextMenuRootContext } from './context';
import type { ContextMenuContentEmits, ContextMenuContentProps } from './types';

defineOptions({
  name: 'ContextMenuContent'
});

const props = withDefaults(defineProps<ContextMenuContentProps>(), {
  avoidCollisions: true
});

const emit = defineEmits<ContextMenuContentEmits>();

const listeners = useForwardListeners(emit);

const { modal, triggerElement } = useContextMenuRootContext('ContextMenuContent');

let hasInteractedOutside = false;

function onCloseAutoFocus(event: Event) {
  if (!event.defaultPrevented && hasInteractedOutside) {
    event.preventDefault();
  }
  hasInteractedOutside = false;
}

function onInteractOutside(event: PointerDownOutsideEvent | FocusOutsideEvent) {
  const originalEvent = event.detail.originalEvent as PointerEvent;
  // Prevent closing when right click (button=2) with the trigger element
  if (originalEvent.button === 2 && event.target === triggerElement.value) {
    event.preventDefault();
  }

  if (!event.defaultPrevented && !modal.value) {
    hasInteractedOutside = true;
  }
}
</script>

<template>
  <MenuContent
    v-bind="props"
    side="right"
    :side-offset="2"
    align="start"
    update-position-strategy="always"
    v-on="listeners"
    @close-auto-focus="onCloseAutoFocus"
    @interact-outside="onInteractOutside"
  >
    <slot />
  </MenuContent>
</template>
