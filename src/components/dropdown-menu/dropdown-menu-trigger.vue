<script setup lang="ts">
import { computed, nextTick } from 'vue';
import { SELECTION_KEYS } from '../../constants';
import { MenuAnchor } from '../menu';
import { Primitive } from '../primitive';
import { useDropdownMenuHoverContext, useDropdownMenuRootContext, useDropdownMenuThemeContext } from './context';
import type { DropdownMenuTriggerProps } from './types';

defineOptions({
  name: 'DropdownMenuTrigger'
});

const props = withDefaults(defineProps<DropdownMenuTriggerProps>(), {
  as: 'button'
});

const themeContext = useDropdownMenuThemeContext();
const cls = computed(() => [themeContext?.ui?.value?.trigger, props.class]);

const { open, dataState, onOpenToggle, onOpenChange, triggerId, contentId, initTriggerId, setTriggerElement } =
  useDropdownMenuRootContext('DropdownMenuTrigger');

const { isPointerInTransitRef, hoverable, onTriggerEnter, onTriggerLeave, onClose } =
  useDropdownMenuHoverContext('DropdownMenuTrigger');

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

const ariaControls = computed(() => (open.value ? contentId : undefined));
const dataDisabled = computed(() => (props.disabled ? '' : undefined));

const onClick = async (event: MouseEvent) => {
  if (props.disabled || hoverable.value) return;

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

let hasPointerMoveOpened = false;

const onPointerMove = (event: PointerEvent) => {
  if (props.disabled) return;

  if (event.pointerType === 'touch') return;

  if (!hasPointerMoveOpened && !isPointerInTransitRef.value) {
    onTriggerEnter();
    hasPointerMoveOpened = true;
  }
};

const onPointerLeave = () => {
  if (props.disabled) return;

  onTriggerLeave();
  hasPointerMoveOpened = false;
};

const hoverListeners = computed(() =>
  hoverable.value
    ? {
        blur: onClose,
        pointermove: onPointerMove,
        pointerleave: onPointerLeave
      }
    : {
        click: onClick
      }
);

initTriggerId();
</script>

<template>
  <MenuAnchor as-child>
    <Primitive
      v-bind="props"
      :id="triggerId"
      :ref="setTriggerElement"
      :class="cls"
      :disabled="disabled"
      :type="tag"
      :aria-controls="ariaControls"
      :aria-expanded="open"
      aria-haspopup="menu"
      :data-disabled="dataDisabled"
      :data-state="dataState"
      @keydown.enter.space.arrow-down="onKeyDown"
      v-on="hoverListeners"
    >
      <slot />
    </Primitive>
  </MenuAnchor>
</template>
