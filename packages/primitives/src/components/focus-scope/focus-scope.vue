<script setup lang="ts">
import { nextTick, reactive, ref, watchEffect } from 'vue';
import { isClient } from '@vueuse/shared';
import { useForwardExpose } from '../../composables';
import { getActiveElement } from '../../shared';
import { Primitive } from '../primitive';
import {
  AUTOFOCUS_ON_MOUNT,
  AUTOFOCUS_ON_UNMOUNT,
  EVENT_OPTIONS,
  focus,
  focusFirst,
  getTabbableCandidates,
  getTabbableEdges
} from './shared';
import { createFocusScopesStack, removeLinks } from './stack';
import type { FocusScopeEmits, FocusScopePropsWithPrimitive } from './types';

defineOptions({
  name: 'FocusScope'
});

const props = withDefaults(defineProps<FocusScopePropsWithPrimitive>(), {
  loop: false,
  trapped: false
});

const emit = defineEmits<FocusScopeEmits>();

const { currentRef, currentElement } = useForwardExpose();

const lastFocusedElementRef = ref<HTMLElement | null>(null);
const focusScopesStack = createFocusScopesStack();

const focusScope = reactive({
  paused: false,
  pause() {
    this.paused = true;
  },
  resume() {
    this.paused = false;
  }
});

function handleKeyDown(event: KeyboardEvent) {
  if (!props.loop && !props.trapped) return;
  if (focusScope.paused) return;

  const container = currentElement.value;

  const isTabKey = event.key === 'Tab' && !event.altKey && !event.ctrlKey && !event.metaKey;
  const focusedElement = getActiveElement() as HTMLElement | null;

  if (isTabKey && focusedElement) {
    const [first, last] = getTabbableEdges(container);
    const hasTabbableElementsInside = first && last;

    // we can only wrap focus if we have tabbable edges
    if (!hasTabbableElementsInside) {
      if (focusedElement === container) event.preventDefault();
    } else if (!event.shiftKey && focusedElement === last) {
      event.preventDefault();
      if (props.loop) focus(first, { select: true });
    } else if (event.shiftKey && focusedElement === first) {
      event.preventDefault();
      if (props.loop) focus(last, { select: true });
    }
  }
}

watchEffect(cleanupFn => {
  if (!isClient) return;
  const container = currentElement.value;
  if (!props.trapped) return;

  function handleFocusIn(event: FocusEvent) {
    if (focusScope.paused || !container) return;

    const target = event.target as HTMLElement | null;

    if (container.contains(target)) {
      lastFocusedElementRef.value = target;
    } else focus(lastFocusedElementRef.value, { select: true });
  }

  function handleFocusOut(event: FocusEvent) {
    if (focusScope.paused || !container) return;

    const relatedTarget = event.relatedTarget as HTMLElement | null;

    // A `focusout` event with a `null` `relatedTarget` will happen in at least two cases:
    //
    // 1. When the user switches app/tabs/windows/the browser itself loses focus.
    // 2. In Google Chrome, when the focused element is removed from the DOM.
    //
    // We let the browser do its thing here because:
    //
    // 1. The browser already keeps a memory of what's focused for when the page gets refocused.
    // 2. In Google Chrome, if we try to focus the deleted focused element (as per below), it
    //    throws the CPU to 100%, so we avoid doing anything for this reason here too.
    if (relatedTarget === null) return;

    // If the focus has moved to an actual legitimate element (`relatedTarget !== null`)
    // that is outside the container, we move focus to the last valid focused element inside.
    if (!container.contains(relatedTarget)) {
      focus(lastFocusedElementRef.value, { select: true });
    }
  }

  // When the focused element gets removed from the DOM, browsers move focus
  // back to the document.body. In this case, we move focus to the container
  // to keep focus trapped correctly.
  // -- related: https://github.com/unovue/soybean-ui/issues/518
  // Reka UI tentative solution:
  // instead of leaning on document.activeElement, we use lastFocusedElementRef.value to check
  // if the element still exist inside the container,
  // if not then we focus to the container
  function handleMutations(_mutations: MutationRecord[]) {
    if (!container) return;

    const isLastFocusedElementExist = container.contains(lastFocusedElementRef.value);
    if (!isLastFocusedElementExist) {
      focus(container);
    }
  }

  document.addEventListener('focusin', handleFocusIn);
  document.addEventListener('focusout', handleFocusOut);
  const mutationObserver = new MutationObserver(handleMutations);
  if (container) {
    mutationObserver.observe(container, { childList: true, subtree: true });
  }

  cleanupFn(() => {
    document.removeEventListener('focusin', handleFocusIn);
    document.removeEventListener('focusout', handleFocusOut);
    mutationObserver.disconnect();
  });
});

watchEffect(async cleanupFn => {
  const container = currentElement.value;

  await nextTick();
  if (!container) return;
  focusScopesStack.add(focusScope);
  const previouslyFocusedElement = getActiveElement() as HTMLElement | null;
  const hasFocusedCandidate = container.contains(previouslyFocusedElement);

  if (!hasFocusedCandidate) {
    const mountEvent = new CustomEvent(AUTOFOCUS_ON_MOUNT, EVENT_OPTIONS);
    container.addEventListener(AUTOFOCUS_ON_MOUNT, (ev: Event) => emit('mountAutoFocus', ev));
    container.dispatchEvent(mountEvent);

    if (!mountEvent.defaultPrevented) {
      focusFirst(removeLinks(getTabbableCandidates(container)), {
        select: true
      });
      if (getActiveElement() === previouslyFocusedElement) {
        focus(container);
      }
    }
  }

  cleanupFn(() => {
    container.removeEventListener(AUTOFOCUS_ON_MOUNT, (ev: Event) => emit('mountAutoFocus', ev));

    const unmountEvent = new CustomEvent(AUTOFOCUS_ON_UNMOUNT, EVENT_OPTIONS);
    const unmountEventHandler = (ev: Event) => {
      emit('unmountAutoFocus', ev);
    };
    container.addEventListener(AUTOFOCUS_ON_UNMOUNT, unmountEventHandler);
    container.dispatchEvent(unmountEvent);

    setTimeout(() => {
      if (!unmountEvent.defaultPrevented) focus(previouslyFocusedElement ?? document.body, { select: true });

      // we need to remove the listener after we `dispatchEvent`
      container.removeEventListener(AUTOFOCUS_ON_UNMOUNT, unmountEventHandler);

      focusScopesStack.remove(focusScope);
    }, 0);
  });
});
</script>

<template>
  <Primitive ref="currentRef" :class="props.class" :as="as" :as-child="asChild" tabindex="-1" @keydown="handleKeyDown">
    <slot />
  </Primitive>
</template>
