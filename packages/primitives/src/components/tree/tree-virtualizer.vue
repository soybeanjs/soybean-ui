<script setup lang="ts">
import { cloneVNode, computed, nextTick } from 'vue';
import type { Ref, VNode } from 'vue';
import { refAutoReset, useParentElement } from '@vueuse/core';
import { useVirtualizer } from '@tanstack/vue-virtual';
import type { VirtualItem, Virtualizer } from '@tanstack/vue-virtual';
import { useCollection } from '../../composables';
import { getActiveElement, getNextMatch } from '../../shared';
import type { NavigationKeys } from '../../types';
import { MAP_KEY_TO_FOCUS_INTENT } from '../roving-focus/shared';
import { injectTreeRootContext } from './context';
import type { FlattenedItem, TreeVirtualizerProps } from './types';

defineOptions({
  name: 'TreeVirtualizer'
});

const props = defineProps<TreeVirtualizerProps>();

type Slots = {
  default: (props: {
    item: FlattenedItem<Record<string, any>>;
    virtualizer: Virtualizer<HTMLElement, Element>;
    virtualItem: VirtualItem;
  }) => VNode[];
};

const slots = defineSlots<Slots>();
const rootContext = injectTreeRootContext();
const parentEl = useParentElement() as Ref<HTMLElement>;
const { getItems } = useCollection();

// Reset `search` 1 second after it was last updated
const search = refAutoReset('', 1000);
const optionsWithMetadata = computed(() => {
  const parseTextContent = (option: Record<string, any>) => {
    if (props.textContent) return props.textContent(option);
    return option.toString().toLowerCase();
  };

  return rootContext.expandedItems.value.map((option, index) => ({
    index,
    textContent: parseTextContent(option.value)
  }));
});

// set virtual true when this component mounted
rootContext.isVirtual.value = true;

const padding = computed(() => {
  const el = parentEl.value;
  if (!el) {
    return { start: 0, end: 0 };
  }

  const styles = window.getComputedStyle(el);
  return {
    start: Number.parseFloat(styles.paddingBlockStart || styles.paddingTop),
    end: Number.parseFloat(styles.paddingBlockEnd || styles.paddingBottom)
  };
});

const virtualizer = useVirtualizer({
  get scrollPaddingStart() {
    return padding.value.start;
  },
  get scrollPaddingEnd() {
    return padding.value.end;
  },
  get count() {
    return rootContext.expandedItems.value.length ?? 0;
  },
  get horizontal() {
    return false;
  },
  getItemKey(index) {
    return index + rootContext.getKey(rootContext.expandedItems.value[index].value);
  },
  estimateSize() {
    return props.estimateSize ?? 28;
  },
  getScrollElement() {
    return parentEl.value;
  },
  overscan: props.overscan ?? 12
});

const virtualizedItems = computed(() =>
  virtualizer.value.getVirtualItems().map(item => {
    return {
      item,
      is: cloneVNode(
        slots.default({
          item: rootContext.expandedItems.value[item.index],
          virtualizer: virtualizer.value,
          virtualItem: item
        })![0],
        {
          'data-index': item.index,
          style: {
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `translateY(${item.start}px)`,
            overflowAnchor: 'none'
          }
        }
      )
    };
  })
);

function scrollToIndexAndFocus(index: number) {
  virtualizer.value.scrollToIndex(index, { align: 'start' });
  requestAnimationFrame(() => {
    const item = parentEl.value.querySelector(`[data-index="${index}"]`) as HTMLElement;
    if (item instanceof HTMLElement) item.focus();
  });
}

rootContext.virtualKeydownHook.on(event => {
  const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
  const isTabKey = event.key === 'Tab' && !isMetaKey;
  if (isTabKey) return;

  const intent = MAP_KEY_TO_FOCUS_INTENT[event.key as NavigationKeys];

  if (['first', 'last'].includes(intent)) {
    event.preventDefault();

    const index = intent === 'first' ? 0 : rootContext.expandedItems.value.length - 1;
    virtualizer.value.scrollToIndex(index);
    requestAnimationFrame(() => {
      const items = getItems();
      const item = intent === 'first' ? items[0] : items[items.length - 1];
      item.ref.focus();
    });
  } else if (intent === 'prev' && event.key !== 'ArrowUp') {
    const currentElement = getActiveElement() as HTMLElement;
    const currentIndex = Number(currentElement.getAttribute('data-index'));
    const currentLevel = Number(currentElement.getAttribute('data-indent'));
    const list = rootContext.expandedItems.value
      .slice(0, currentIndex)
      .map((item, index) => ({ ...item, index }))
      .reverse();

    const parentItem = list.find(item => item.level === currentLevel - 1);
    if (parentItem) scrollToIndexAndFocus(parentItem.index);
  } else if (!intent && !isMetaKey) {
    search.value += event.key;
    const currentIndex = Number(getActiveElement()?.getAttribute('data-index'));
    const currentMatch = optionsWithMetadata.value[currentIndex].textContent;
    const filteredOptions = optionsWithMetadata.value.map(i => i.textContent);
    const next = getNextMatch(filteredOptions, search.value, currentMatch);

    const nextMatch = optionsWithMetadata.value.find(option => option.textContent === next);
    if (nextMatch) scrollToIndexAndFocus(nextMatch.index);
  }

  nextTick(() => {
    if (event.shiftKey && intent)
      rootContext.handleMultipleReplace(
        intent,
        getActiveElement(),
        getItems,
        rootContext.expandedItems.value.map(i => i.value)
      );
  });
});
</script>

<template>
  <div
    data-soybean-virtualizer
    :style="{
      position: 'relative',
      width: '100%',
      height: `${virtualizer.getTotalSize()}px`
    }"
  >
    <component :is="is" v-for="{ is, item } in virtualizedItems" :key="item.key" />
  </div>
</template>
