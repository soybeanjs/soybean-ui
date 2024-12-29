<script setup lang="ts">
import { computed } from 'vue';
import { useCollection, useForwardExpose, useForwardPropsEmits } from '../../composables';
import { wrapArray } from '../../shared';
import { MenuSubContent } from '../menu';
import { injectMenubarMenuContext, injectMenubarRootContext } from './context';
import type { MenubarSubContentEmits, MenubarSubContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenubarSubContent'
});

const props = defineProps<MenubarSubContentPropsWithPrimitive>();
const emit = defineEmits<MenubarSubContentEmits>();
const forwarded = useForwardPropsEmits(props, emit);
useForwardExpose();

const { getItems } = useCollection({ key: 'Menubar' });

const rootContext = injectMenubarRootContext();
const menuContext = injectMenubarMenuContext();

const style = computed<Record<string, string>>(() => ({
  '--soybean-menubar-content-transform-origin': 'var(--soybean-popper-transform-origin)',
  '--soybean-menubar-content-available-width': 'var(--soybean-popper-available-width)',
  '--soybean-menubar-content-available-height': 'var(--soybean-popper-available-height)',
  '--soybean-menubar-trigger-width': 'var(--soybean-popper-anchor-width)',
  '--soybean-menubar-trigger-height': 'var(--soybean-popper-anchor-height)'
}));

function handleArrowNavigation(event: KeyboardEvent) {
  const target = event.target as HTMLElement;
  const targetIsSubTrigger = target.hasAttribute('data-soybean-menubar-sub-trigger');

  // Prevent navigation when we're opening a submenu
  if (targetIsSubTrigger) return;

  let candidateValues = getItems()
    .filter(i => i.ref.dataset.disabled !== '')
    .map(i => i.ref.dataset.value);
  const currentIndex = candidateValues.indexOf(menuContext.value);

  candidateValues = rootContext.loop.value
    ? wrapArray(candidateValues, currentIndex + 1)
    : candidateValues.slice(currentIndex + 1);

  const [nextValue] = candidateValues;
  if (nextValue) rootContext.onMenuOpen(nextValue);
}
</script>

<template>
  <MenuSubContent
    v-bind="forwarded"
    data-soybean-menubar-content=""
    :style="style"
    @keydown.arrow-right="handleArrowNavigation"
  >
    <slot />
  </MenuSubContent>
</template>
