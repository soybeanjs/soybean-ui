<script setup lang="ts">
import { computed, nextTick } from 'vue';
import MenuAnchor from '../popper/popper-anchor.vue';
import { Primitive } from '../primitive';
import { SELECTION_KEYS } from '../menu/shared';
import { useDropdownMenuRootContext } from './context';
import type { DropdownMenuTriggerProps } from './types';

defineOptions({
  name: 'DropdownMenuTrigger'
});

const props = withDefaults(defineProps<DropdownMenuTriggerProps>(), {
  as: 'button'
});

const { open, dataState, onOpenToggle, onOpenChange, triggerId, contentId, initTriggerId, setTriggerElement } =
  useDropdownMenuRootContext('DropdownMenuTrigger');

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

const ariaControls = computed(() => (open.value ? contentId : undefined));
const dataDisabled = computed(() => (props.disabled ? '' : undefined));

const onClick = async (event: MouseEvent) => {
  if (props.disabled) return;

  // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
  // but not when the control key is pressed (avoiding MacOS right click)
  if (event.button === 0 && event.ctrlKey === false) {
    onOpenToggle();
    await nextTick();
    // prevent trigger focusing when opening
    // this allows the content to be given focus without competition
    if (open.value) {
      event.preventDefault();
    }
  }
};

const onKeyDown = (event: KeyboardEvent) => {
  if (props.disabled) return;

  if (SELECTION_KEYS.includes(event.key)) {
    onOpenToggle();
  }
  if (event.key === 'ArrowDown') {
    onOpenChange(true);
  }
  // prevent keydown from scrolling window / first focused item to execute
  // that keydown (inadvertently closing the menu)
  if ([...SELECTION_KEYS, 'ArrowDown'].includes(event.key)) {
    event.preventDefault();
  }
};

initTriggerId();
</script>

<template>
  <MenuAnchor as-child>
    <Primitive
      v-bind="props"
      :id="triggerId"
      :ref="setTriggerElement"
      :disabled="disabled"
      :type="tag"
      :aria-controls="ariaControls"
      :aria-expanded="open"
      aria-haspopup="menu"
      :data-disabled="dataDisabled"
      :data-state="dataState"
      @click="onClick"
      @keydown.enter.space.arrow-down="onKeyDown"
    >
      <slot />
    </Primitive>
  </MenuAnchor>
</template>
