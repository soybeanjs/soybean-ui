<script setup lang="ts" generic="T extends DefinedValue = DefinedValue">
import { computed, nextTick, onMounted, shallowRef, useAttrs, useTemplateRef, watch } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { keysOf } from '@soybeanjs/utils';
import { isClient } from '../../shared';
import { useForwardListeners, usePickProps } from '../../composables';
import type { DefinedValue } from '../../types';
import TreeNavTop from './tree-nav-top.vue';
import type { TreeNavCompactProps, TreeNavCompactEmits, TreeNavCompactSlots } from './types';

defineOptions({
  name: 'TreeNavCompact',
  inheritAttrs: false
});

const props = defineProps<TreeNavCompactProps<T>>();

const emit = defineEmits<TreeNavCompactEmits<T>>();

const slots = defineSlots<TreeNavCompactSlots<T>>();

// Forwarding -----------------------------------------------------------------

const attrs = useAttrs();

const forwardedListeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const optionSlotNames = computed(() => slotNames.value.filter(key => key !== 'more-trigger'));

const topForwardKeys: Array<Exclude<keyof TreeNavCompactProps, 'items' | 'collapsible'>> = [
  'as',
  'asChild',
  'modelValue',
  'defaultValue',
  'dir',
  'trigger',
  'delayDuration',
  'skipDelayDuration',
  'placement',
  'showArrow',
  'disabled',
  'moreLabel',
  'moreIcon',
  'moreProps',
  'linkProps',
  'itemProps',
  'groupLabelProps',
  'shortcutProps',
  'separatorProps',
  'subTriggerProps',
  'subContentProps',
  'portalProps',
  'popupProps',
  'arrowProps'
];

const forwardedTopProps = usePickProps(props, [...topForwardKeys], attrs);

// Overflow collapsing --------------------------------------------------------
//
// Mirrors the proven `MenubarCompact` reflow mechanism: when `collapsible` is
// enabled the bar is wrapped in a measurement container; trailing items are
// moved into a "more" popup one at a time against real layout until everything
// fits. Selection state and rendering are delegated to `TreeNavTop`.

const overflowElement = useTemplateRef<HTMLElement>('overflowElement');

const collapsedCount = shallowRef(0);

const hiddenCount = computed(() => Math.min(collapsedCount.value, props.items.length));
const visibleItems = computed(() => props.items.slice(0, props.items.length - hiddenCount.value));
const moreItems = computed(() => props.items.slice(props.items.length - hiddenCount.value));

let reflowRunning = false;
let reflowQueued = false;

function isOverflowing(container: HTMLElement): boolean {
  const root = container.querySelector('[data-soybean-tree-nav]') as HTMLElement | null;

  return root ? root.scrollWidth > container.clientWidth : false;
}

async function reflow() {
  if (!isClient) return;

  if (reflowRunning) {
    reflowQueued = true;
    return;
  }

  reflowRunning = true;

  try {
    const container = overflowElement.value;
    if (!container) return;

    await nextTick();

    // Restore items from the "more" menu while they fit again.
    while (collapsedCount.value > 0) {
      collapsedCount.value -= 1;
      await nextTick();
      if (isOverflowing(container)) {
        collapsedCount.value += 1;
        await nextTick();
        break;
      }
    }

    // Collapse trailing items while the content overflows the container.
    while (collapsedCount.value < props.items.length && isOverflowing(container)) {
      collapsedCount.value += 1;
      await nextTick();
    }
  } finally {
    reflowRunning = false;
    if (reflowQueued) {
      reflowQueued = false;
      reflow();
    }
  }
}

useResizeObserver(overflowElement, () => {
  if (props.collapsible) {
    reflow();
  }
});

watch(
  () => props.items,
  () => {
    if (!props.collapsible) return;
    collapsedCount.value = 0;
    reflow();
  }
);

watch(
  () => props.collapsible,
  enabled => {
    if (enabled) {
      reflow();
    }
  }
);

onMounted(() => {
  if (props.collapsible) {
    reflow();
  }
});
</script>

<template>
  <div v-if="collapsible" ref="overflowElement" data-soybean-tree-nav-overflow>
    <TreeNavTop v-bind="forwardedTopProps" :items="visibleItems" :more-items="moreItems" v-on="forwardedListeners">
      <template #more-trigger="entry">
        <slot name="more-trigger" :label="entry.label" :icon="entry.icon" />
      </template>
      <template v-for="slotName in optionSlotNames" :key="slotName" #[slotName]="slotProps">
        <slot :name="slotName" v-bind="slotProps" />
      </template>
    </TreeNavTop>
  </div>
  <TreeNavTop v-else v-bind="forwardedTopProps" :items="visibleItems" :more-items="moreItems" v-on="forwardedListeners">
    <template #more-trigger="entry">
      <slot name="more-trigger" :label="entry.label" :icon="entry.icon" />
    </template>
    <template v-for="slotName in optionSlotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </TreeNavTop>
</template>
