<script setup lang="ts">
import { computed } from 'vue';
import { useMenuContext } from '../menu/context';
import { usePopperRootContext } from '../popper/context';
import { PopperTrigger } from '../popper';
import type { PopperTriggerType } from '../popper/types';
import { useDropdownMenuRootContext } from './context';
import type { DropdownMenuTriggerProps } from './types';

defineOptions({
  name: 'DropdownMenuTrigger'
});

const props = withDefaults(defineProps<DropdownMenuTriggerProps>(), {
  as: 'button'
});

const { popupId, triggerId, initTriggerId } = useMenuContext('DropdownMenuTrigger');
const popperContext = usePopperRootContext('DropdownMenuTrigger');
const { hoverable, delayDuration, skipDelayDuration } = useDropdownMenuRootContext('DropdownMenuTrigger');

initTriggerId();

const triggerMode = computed<PopperTriggerType>(() => (hoverable.value ? 'hover' : 'click'));

// ArrowDown opens the menu; Enter/Space toggle through the native button click the shell handles.
function onKeyDown(event: KeyboardEvent) {
  if (props.disabled) return;
  if (event.key !== 'ArrowDown') return;

  popperContext.onOpenChange(true, 'trigger-click');
  // prevent keydown from scrolling window / first focused item to execute
  // that keydown (inadvertently closing the menu)
  event.preventDefault();
}

// Hover-mode dropdowns close on trigger blur without opening on focus.
function onBlurClose() {
  if (props.disabled || !hoverable.value) return;

  popperContext.onOpenChange(false, 'trigger-hover');
}
</script>

<template>
  <PopperTrigger
    v-bind="props"
    :id="triggerId"
    :trigger="triggerMode"
    :open-delay="delayDuration"
    :skip-delay-duration="skipDelayDuration"
    :open-on-focus="false"
    :aria-controls="popperContext.open ? popupId : undefined"
    aria-haspopup="menu"
    data-soybean-dropdown-menu-trigger
    @keydown="onKeyDown"
    @blur="onBlurClose"
  >
    <slot />
  </PopperTrigger>
</template>
