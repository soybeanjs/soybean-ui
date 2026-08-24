<script setup lang="ts">
import { computed, reactive } from 'vue';
import { SELECTION_KEYS } from '../../constants';
import { useMenuContext } from '../menu/context';
import { usePopperV2RootContext } from '../popper-v2/context';
import { useForwardElement } from '../../composables';
import { MenuAnchor } from '../menu';
import type { PopperV2TriggerProps } from '../popper-v2/types';
import { usePopperV2Trigger } from '../popper-v2/use-popper-v2-trigger';
import { Primitive } from '../primitive';
import { useDropdownMenuRootContext } from './context';
import type { DropdownMenuTriggerProps } from './types';

defineOptions({
  name: 'DropdownMenuTrigger'
});

const props = withDefaults(defineProps<DropdownMenuTriggerProps>(), {
  as: 'button'
});

const { popupId, triggerId, initTriggerId, onTriggerElementChange } = useMenuContext('DropdownMenuTrigger');
const popperContext = usePopperV2RootContext('DropdownMenuTrigger');
const { open, dataState } = popperContext;

const { trigger, hoverable, delayDuration, skipDelayDuration } = useDropdownMenuRootContext('DropdownMenuTrigger');

const [_, setTriggerElement] = useForwardElement(element => {
  onTriggerElementChange(element);
  popperContext.onTriggerElementChange(element);
});

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

const ariaControls = computed(() => (open.value ? popupId.value : undefined));
const ariaDisabled = computed(() => (props.disabled ? true : undefined));
const dataDisabled = computed(() => (props.disabled ? '' : undefined));

// Hover timing (open delay, skip-delay window, touch handling) runs on the shared PopperV2
// trigger machine; click toggling stays domain-side to keep the open-time focus competition
// handling (`preventDefault` so the popup keeps focus).
const shellTriggerProps: PopperV2TriggerProps = reactive({
  get trigger() {
    return trigger.value;
  },
  get openDelay() {
    return delayDuration.value;
  },
  get skipDelayDuration() {
    return skipDelayDuration.value;
  },
  openOnFocus: false,
  get disabled() {
    return props.disabled;
  }
});

const { onPointerCancel, onPointerDown, onPointerEnter, onPointerLeave, onPointerMove, onPointerUp } =
  usePopperV2Trigger(shellTriggerProps, popperContext, { onVirtualPointChange: () => {} });

const onClick = (event: MouseEvent) => {
  if (props.disabled || hoverable.value) return;

  // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
  // but not when the control key is pressed (avoiding MacOS right click)
  if (event.button === 0 && event.ctrlKey === false) {
    popperContext.onOpenToggle('trigger-click');

    // prevent trigger focusing when opening; this allows the content to be given focus
    // without competition
    if (open.value) {
      event.preventDefault();
    }
  }
};

const onKeyDown = (event: KeyboardEvent) => {
  if (props.disabled) return;

  if (SELECTION_KEYS.includes(event.key)) {
    popperContext.onOpenToggle('trigger-click');
  }
  if (event.key === 'ArrowDown') {
    popperContext.onOpenChange(true, 'trigger-click');
  }
  // prevent keydown from scrolling window / first focused item to execute
  // that keydown (inadvertently closing the menu)
  if ([...SELECTION_KEYS, 'ArrowDown'].includes(event.key)) {
    event.preventDefault();
  }
};

const onBlurClose = () => {
  if (props.disabled) return;
  popperContext.onOpenChange(false, 'trigger-hover');
};

const hoverListeners = computed(() =>
  hoverable.value
    ? {
        blur: onBlurClose,
        pointerenter: onPointerEnter,
        pointerleave: onPointerLeave,
        pointermove: onPointerMove
      }
    : {
        click: onClick,
        pointerdown: onPointerDown,
        pointerup: onPointerUp,
        pointercancel: onPointerCancel
      }
);

initTriggerId();
</script>

<template>
  <MenuAnchor as-child>
    <Primitive
      :id="triggerId"
      :ref="setTriggerElement"
      :as="as"
      :as-child="asChild"
      data-soybean-dropdown-menu-trigger
      :type="tag"
      :aria-controls="ariaControls"
      :aria-disabled="ariaDisabled"
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
