<script lang="ts">
import { ref } from 'vue';
import type { MenuContentEmits, MenuContentProps } from '../Menu';
import { MenuContent } from '../menu';
import { useForwardExpose, useForwardPropsEmits } from '../../_shared';
</script>

<script setup lang="ts">
import { injectContextMenuRootContext } from './context-menu-root.vue';

export type ContextMenuContentEmits = MenuContentEmits;

export interface ContextMenuContentProps
  extends Omit<MenuContentProps, 'side' | 'sideOffset' | 'align' | 'arrowPadding' | 'updatePositionStrategy'> {}

const props = withDefaults(defineProps<ContextMenuContentProps>(), {
  alignOffset: 0,
  avoidCollisions: true,
  collisionBoundary: () => [],
  collisionPadding: 0,
  sticky: 'partial',
  hideWhenDetached: false
});
const emits = defineEmits<ContextMenuContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);

useForwardExpose();
const rootContext = injectContextMenuRootContext();
const hasInteractedOutside = ref(false);
</script>

<template>
  <MenuContent
    v-bind="forwarded"
    side="right"
    :side-offset="2"
    align="start"
    :style="{
      '--soybean-context-menu-content-transform-origin': 'var(--soybean-popper-transform-origin)',
      '--soybean-context-menu-content-available-width': 'var(--soybean-popper-available-width)',
      '--soybean-context-menu-content-available-height': 'var(--soybean-popper-available-height)',
      '--soybean-context-menu-trigger-width': 'var(--soybean-popper-anchor-width)',
      '--soybean-context-menu-trigger-height': 'var(--soybean-popper-anchor-height)'
    }"
    @close-auto-focus="
      event => {
        if (!event.defaultPrevented && hasInteractedOutside) {
          event.preventDefault();
        }
        hasInteractedOutside = false;
      }
    "
    @interact-outside="
      event => {
        if (!event.defaultPrevented && !rootContext.modal.value) hasInteractedOutside = true;
      }
    "
  >
    <slot />
  </MenuContent>
</template>
