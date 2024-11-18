<script setup lang="ts">
import type { MenuSubContentEmits, MenuSubContentProps } from '../Menu';
import { useCollection, useForwardExpose, useForwardPropsEmits } from '../../composables';

import { MenuSubContent } from '../menu';
import { wrapArray } from '../../composables/use-typeahead';
import { injectMenubarMenuContext } from './menubar-menu.vue';
import { injectMenubarRootContext } from './menubar-root.vue';

export type MenubarSubContentEmits = MenuSubContentEmits;

export interface MenubarSubContentProps extends MenuSubContentProps {}

const props = defineProps<MenubarSubContentProps>();
const emits = defineEmits<MenubarSubContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
useForwardExpose();

const { getItems } = useCollection({ key: 'Menubar' });

const rootContext = injectMenubarRootContext();
const menuContext = injectMenubarMenuContext();

function handleArrowNavigation(event: KeyboardEvent) {
  const target = event.target as HTMLElement;
  const targetIsSubTrigger = target.hasAttribute('data-soybean-menubar-subtrigger');

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
    :style="{
      '--soybean-menubar-content-transform-origin': 'var(--soybean-popper-transform-origin)',
      '--soybean-menubar-content-available-width': 'var(--soybean-popper-available-width)',
      '--soybean-menubar-content-available-height': 'var(--soybean-popper-available-height)',
      '--soybean-menubar-trigger-width': 'var(--soybean-popper-anchor-width)',
      '--soybean-menubar-trigger-height': 'var(--soybean-popper-anchor-height)'
    }"
    @keydown.arrow-right="handleArrowNavigation"
  >
    <slot />
  </MenuSubContent>
</template>
