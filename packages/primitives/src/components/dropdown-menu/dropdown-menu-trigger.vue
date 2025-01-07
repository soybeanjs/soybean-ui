<script setup lang="ts">
import { computed, nextTick, onMounted } from 'vue';
import { useForwardExpose } from '../../composables';
import MenuAnchor from '../popper/popper-anchor.vue';
import { getOpenState } from '../menu/shared';
import { Primitive } from '../primitive';
import { injectDropdownMenuRootContext } from './context';
import type { DropdownMenuTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'DropdownMenuTrigger'
});

const props = withDefaults(defineProps<DropdownMenuTriggerPropsWithPrimitive>(), {
  as: 'button'
});

const { open, onOpenToggle, onOpenChange, triggerId, contentId, initTriggerId, setTriggerElement } =
  injectDropdownMenuRootContext();

initTriggerId();

const { forwardRef, currentElement: triggerElement } = useForwardExpose();

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

const ariaControls = computed(() => (open.value ? contentId : undefined));
const dataDisabled = computed(() => (props.disabled ? '' : undefined));
const dataState = computed(() => getOpenState(open.value));

async function onClick(event: MouseEvent) {
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
}

function onKeyDown(event: KeyboardEvent) {
  if (props.disabled) return;
  if (['Enter', ' '].includes(event.key)) {
    onOpenToggle();
  }
  if (event.key === 'ArrowDown') {
    onOpenChange(true);
  }
  // prevent keydown from scrolling window / first focused item to execute
  // that keydown (inadvertently closing the menu)
  if (['Enter', ' ', 'ArrowDown'].includes(event.key)) {
    event.preventDefault();
  }
}

onMounted(() => {
  setTriggerElement(triggerElement);
});
</script>

<template>
  <MenuAnchor as-child>
    <Primitive
      :id="triggerId"
      :ref="forwardRef"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :type="tag"
      :aria-controls="ariaControls"
      :aria-expanded="open"
      aria-haspopup="menu"
      :data-disabled="dataDisabled"
      :data-state="dataState"
      :disabled="disabled"
      @click="onClick"
      @keydown.enter.space.arrow-down="onKeyDown"
    >
      <slot />
    </Primitive>
  </MenuAnchor>
</template>
