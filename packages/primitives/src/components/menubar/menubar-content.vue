<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCollection, useForwardExpose, useForwardPropsEmits, useId } from '../../composables';
import { wrapArray } from '../../shared';
import type { FocusOutsideEvent, PointerDownOutsideEvent } from '../../types';
import { MenuContent } from '../menu';
import { injectMenubarMenuContext, injectMenubarRootContext } from './context';
import { isTriggerLink } from './shared';
import type { MenubarContentEmits, MenubarContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenubarContent'
});

const props = withDefaults(defineProps<MenubarContentPropsWithPrimitive>(), {
  align: 'start'
});

const emit = defineEmits<MenubarContentEmits>();

const forwarded = useForwardPropsEmits(props, emit);

const rootContext = injectMenubarRootContext();
const menuContext = injectMenubarMenuContext();

menuContext.contentId ||= useId(undefined, 'soybean-menubar-content');

const { getItems } = useCollection({ key: 'Menubar' });

const hasInteractedOutsideRef = ref(false);

const style = computed<Record<string, string>>(() => ({
  '--soybean-menubar-content-transform-origin': 'var(--soybean-popper-transform-origin)',
  '--soybean-menubar-content-available-width': 'var(--soybean-popper-available-width)',
  '--soybean-menubar-content-available-height': 'var(--soybean-popper-available-height)',
  '--soybean-menubar-trigger-width': 'var(--soybean-popper-anchor-width)',
  '--soybean-menubar-trigger-height': 'var(--soybean-popper-anchor-height)'
}));

function onCloseAutoFocus(event: Event) {
  const menubarOpen = Boolean(rootContext.modelValue.value);
  if (!menubarOpen && !hasInteractedOutsideRef.value) {
    menuContext.triggerElement.value?.focus();
  }

  hasInteractedOutsideRef.value = false;
  // Always prevent auto focus because we either focus manually or want user agent focus
  event.preventDefault();
}

function onFocusOutside(event: FocusOutsideEvent) {
  const target = event.target as HTMLElement;
  const isMenubarTrigger = getItems()
    .filter(i => i.ref.dataset.disabled !== '')
    .some(i => i.ref.contains(target));
  if (isMenubarTrigger) {
    event.preventDefault();
  }
}

function onInteractOutside(_event: PointerDownOutsideEvent | FocusOutsideEvent) {
  hasInteractedOutsideRef.value = true;
}

function onEntryFocus(event: Event) {
  if (!menuContext.wasKeyboardTriggerOpenRef.value) {
    event.preventDefault();
  }
}

function onArrowNavigation(event: KeyboardEvent) {
  const target = event.target as HTMLElement;
  const targetIsSubTrigger = target.hasAttribute('data-soybean-menubar-sub-trigger');

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
  if (!nextValue) return;

  if (!isTriggerLink(nextValue)) {
    rootContext.onMenuOpen(nextValue);
    return;
  }
  focusTriggerLink(nextValue);
}

function focusTriggerLink(id: string) {
  rootContext.setTriggerLink();
  const el = document.getElementById(id);
  el?.focus();
}

useForwardExpose();
</script>

<template>
  <MenuContent
    v-bind="forwarded"
    :id="menuContext.contentId"
    data-soybean-menubar-content=""
    :aria-labelledby="menuContext.triggerId"
    :style="style"
    @close-auto-focus="onCloseAutoFocus"
    @focus-outside="onFocusOutside"
    @interact-outside="onInteractOutside"
    @entry-focus="onEntryFocus"
    @keydown.arrow-right.arrow-left="onArrowNavigation"
  >
    <slot />
  </MenuContent>
</template>
