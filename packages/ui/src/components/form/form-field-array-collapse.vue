<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineOptions({
  name: 'SFormFieldArrayCollapse',
  inheritAttrs: false
});

const COLLAPSE_TRANSITION = 'height 200ms cubic-bezier(0.4, 0, 0.2, 1)';
const COLLAPSE_SAFETY_MS = 400;

const rootRef = ref<HTMLElement>();

let observer: MutationObserver | null = null;
let lastHeight = 0;
let clearTimer: ReturnType<typeof setTimeout> | null = null;

function clearCollapse(node: HTMLElement) {
  node.style.height = '';
  node.style.overflow = '';
  node.style.transition = '';

  if (clearTimer !== null) {
    clearTimeout(clearTimer);
    clearTimer = null;
  }
}

function collapseBetween(node: HTMLElement, previous: number, next: number) {
  lastHeight = next;
  clearCollapse(node);
  node.style.overflow = 'hidden';
  node.style.height = `${previous}px`;
  // Force a style recalc so the browser interpolates from the pinned height.
  void node.scrollHeight;
  node.style.transition = COLLAPSE_TRANSITION;
  node.style.height = `${next}px`;
  node.addEventListener('transitionend', () => clearCollapse(node), { once: true });
  clearTimer = setTimeout(() => clearCollapse(node), COLLAPSE_SAFETY_MS);
}

onMounted(() => {
  const node = rootRef.value;

  if (!node) return;

  lastHeight = node.scrollHeight;

  // Test environments have no CSS transition support; skip the observer there.
  if (import.meta.env.MODE === 'test') return;

  observer = new MutationObserver(mutations => {
    // Only direct-child structure changes (array rows added/removed) collapse;
    // input or text changes inside a row must not animate the container.
    const structural = mutations.some(mutation =>
      [...mutation.addedNodes, ...mutation.removedNodes].some(child => child.nodeType === Node.ELEMENT_NODE)
    );

    if (!structural) return;

    const previous = lastHeight;
    const next = node.scrollHeight;

    if (previous !== next) {
      collapseBetween(node, previous, next);
    }
  });

  observer.observe(node, { childList: true });
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;

  if (clearTimer !== null) {
    clearTimeout(clearTimer);
    clearTimer = null;
  }
});
</script>

<template>
  <!--
    Layout properties mirror the control box (computed styles inherit from the
    parent), so array rows keep whatever layout the consumer declared on the
    control slot classes while the container can still animate its height.
  -->
  <div
    ref="rootRef"
    data-soybean-form-array-content
    :style="{
      display: 'inherit',
      flexDirection: 'inherit',
      flexWrap: 'inherit',
      alignItems: 'inherit',
      justifyContent: 'inherit',
      gap: 'inherit',
      rowGap: 'inherit',
      columnGap: 'inherit'
    }"
  >
    <slot />
  </div>
</template>
