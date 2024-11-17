<script lang="ts">
import { ref } from 'vue';
import type { MenuContentEmits, MenuContentProps } from '../menu';
import { useCollection } from '../../composables';
</script>

<script setup lang="ts">
import { MenuContent } from '../menu';
import { useForwardExpose, useForwardPropsEmits, useId } from '../../_shared';
import { wrapArray } from '../../_shared/use-typeahead';
import { injectMenubarMenuContext } from './menubar-menu.vue';
import { injectMenubarRootContext } from './menubar-root.vue';

export type MenubarContentEmits = MenuContentEmits;

export interface MenubarContentProps extends MenuContentProps {}

const props = withDefaults(defineProps<MenubarContentProps>(), {
  align: 'start'
});
const emits = defineEmits<MenubarContentEmits>();
const forwarded = useForwardPropsEmits(props, emits);
useForwardExpose();

const rootContext = injectMenubarRootContext();
const menuContext = injectMenubarMenuContext();

menuContext.contentId ||= useId(undefined, 'soybean-menubar-content');

const { getItems } = useCollection({ key: 'Menubar' });

const hasInteractedOutsideRef = ref(false);

function handleArrowNavigation(event: KeyboardEvent) {
  const target = event.target as HTMLElement;
  const targetIsSubTrigger = target.hasAttribute('data-soybean-menubar-subtrigger');

  const prevMenuKey = rootContext.dir.value === 'rtl' ? 'ArrowRight' : 'ArrowLeft';
  const isPrevKey = prevMenuKey === event.key;
  const isNextKey = !isPrevKey;

  // Prevent navigation when we're opening a submenu
  if (isNextKey && targetIsSubTrigger) return;

  let candidateValues = getItems()
    .filter(i => i.ref.dataset.disabled !== '')
    .map(i => i.ref.dataset.value);
  if (isPrevKey) candidateValues.reverse();

  const currentIndex = candidateValues.indexOf(menuContext.value);

  candidateValues = rootContext.loop.value
    ? wrapArray(candidateValues, currentIndex + 1)
    : candidateValues.slice(currentIndex + 1);

  const [nextValue] = candidateValues;
  if (nextValue) rootContext.onMenuOpen(nextValue);
}
</script>

<template>
  <MenuContent
    v-bind="forwarded"
    :id="menuContext.contentId"
    data-soybean-menubar-content=""
    :aria-labelledby="menuContext.triggerId"
    :style="{
      '--soybean-menubar-content-transform-origin': 'var(--soybean-popper-transform-origin)',
      '--soybean-menubar-content-available-width': 'var(--soybean-popper-available-width)',
      '--soybean-menubar-content-available-height': 'var(--soybean-popper-available-height)',
      '--soybean-menubar-trigger-width': 'var(--soybean-popper-anchor-width)',
      '--soybean-menubar-trigger-height': 'var(--soybean-popper-anchor-height)'
    }"
    @close-auto-focus="
      event => {
        const menubarOpen = Boolean(rootContext.modelValue.value);
        if (!menubarOpen && !hasInteractedOutsideRef) {
          menuContext.triggerElement.value?.focus();
        }

        hasInteractedOutsideRef = false;
        // Always prevent auto focus because we either focus manually or want user agent focus
        event.preventDefault();
      }
    "
    @focus-outside="
      event => {
        const target = event.target as HTMLElement;
        const isMenubarTrigger = getItems()
          .filter(i => i.ref.dataset.disabled !== '')
          .some(i => i.ref.contains(target));
        if (isMenubarTrigger) event.preventDefault();
      }
    "
    @interact-outside="
      event => {
        hasInteractedOutsideRef = true;
      }
    "
    @entry-focus="
      event => {
        if (!menuContext.wasKeyboardTriggerOpenRef.value) event.preventDefault();
      }
    "
    @keydown.arrow-right.arrow-left="handleArrowNavigation"
  >
    <slot />
  </MenuContent>
</template>
