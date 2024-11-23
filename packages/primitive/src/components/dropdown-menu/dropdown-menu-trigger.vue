<script setup lang="ts">
import { computed, nextTick, onMounted } from 'vue';
import { Primitive } from '../primitive';
import { MenuAnchor } from '../menu';
import { useForwardExpose, useId } from '../../composables';
import { injectDropdownMenuRootContext } from './context';
import type { DropdownMenuTriggerPropsWithPrimitive } from './types';

defineOptions({
  name: 'DropdownMenuTrigger'
});

const props = withDefaults(defineProps<DropdownMenuTriggerPropsWithPrimitive>(), {
  as: 'button'
});

const rootContext = injectDropdownMenuRootContext();
rootContext.triggerId ||= useId(undefined, 'soybean-dropdown-menu-trigger');

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

const { forwardRef, currentElement: triggerElement } = useForwardExpose();

async function onClick(event: MouseEvent) {
  // only call handler if it's the left button (mousedown gets triggered by all mouse buttons)
  // but not when the control key is pressed (avoiding MacOS right click)
  if (!props.disabled && event.button === 0 && event.ctrlKey === false) {
    rootContext?.onOpenToggle();
    await nextTick();
    // prevent trigger focusing when opening
    // this allows the content to be given focus without competition
    if (rootContext.open.value) event.preventDefault();
  }
}

function onKeyDown(event: KeyboardEvent) {
  if (props.disabled) return;
  if (['Enter', ' '].includes(event.key)) rootContext.onOpenToggle();
  if (event.key === 'ArrowDown') rootContext.onOpenChange(true);
  // prevent keydown from scrolling window / first focused item to execute
  // that keydown (inadvertently closing the menu)
  if (['Enter', ' ', 'ArrowDown'].includes(event.key)) event.preventDefault();
}

onMounted(() => {
  rootContext.triggerElement = triggerElement;
});
</script>

<template>
  <MenuAnchor as-child>
    <Primitive
      :id="rootContext.triggerId"
      :ref="forwardRef"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :type="tag"
      :aria-controls="rootContext.open.value ? rootContext.contentId : undefined"
      :aria-expanded="rootContext.open.value"
      aria-haspopup="menu"
      :data-disabled="disabled ? '' : undefined"
      :data-state="rootContext.open.value ? 'open' : 'closed'"
      :disabled="disabled"
      @click="onClick"
      @keydown.enter.space.arrow-down="onKeyDown"
    >
      <slot />
    </Primitive>
  </MenuAnchor>
</template>
