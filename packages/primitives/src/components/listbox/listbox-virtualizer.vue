<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { Fragment, cloneVNode, computed } from 'vue';
import type { Ref, VNode } from 'vue';
import { useParentElement } from '@vueuse/core';
import { refAutoReset } from '@vueuse/shared';
import { useVirtualizer } from '@tanstack/vue-virtual';
import { useCollection } from '../../composables';
import { findValuesBetween, getActiveElement, getNextMatch } from '../../shared';
import type { AcceptableValue, NavigationKeys } from '../../types';
import { MAP_KEY_TO_FOCUS_INTENT } from '../roving-focus/shared';
import { injectListboxRootContext } from './context';
import { compare, queryCheckedElement } from './shared';
import type { ListboxVirtualizerProps, ListboxVirtualizerSlots } from './types';

defineOptions({
  name: 'ListboxVirtualizer'
});

const props = defineProps<ListboxVirtualizerProps<T>>();

const slots = defineSlots<ListboxVirtualizerSlots<T>>();
const rootContext = injectListboxRootContext();
const parentEl = useParentElement() as Ref<HTMLElement>;
const { getItems } = useCollection<{ value: T }>();

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
    return props.options.length;
  },
  get horizontal() {
    return rootContext.orientation.value === 'horizontal';
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
    const defaultNode = slots.default({
      option: props.options[item.index],
      virtualizer: virtualizer.value,
      virtualItem: item
    })[0];

    const targetNode =
      defaultNode.type === Fragment && Array.isArray(defaultNode.children)
        ? (defaultNode.children[0] as VNode)
        : defaultNode;

    return {
      item,
      is: cloneVNode(targetNode, {
        key: `${item.key}`,
        'data-index': item.index,
        'aria-setsize': props.options.length,
        'aria-posinset': item.index + 1,
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          transform: `translateY(${item.start}px)`,
          overflowAnchor: 'none'
        }
      })
    };
  })
);

rootContext.virtualFocusHook.on(event => {
  const index = props.options.findIndex(option => {
    if (Array.isArray(rootContext.modelValue.value))
      return compare(option, rootContext.modelValue.value[0], rootContext.by);
    return compare(option, rootContext.modelValue.value!, rootContext.by);
  });
  if (index !== -1) {
    event?.preventDefault();

    virtualizer.value.scrollToIndex(index, { align: 'start' });
    requestAnimationFrame(() => {
      const item = queryCheckedElement(parentEl.value);
      if (item) {
        rootContext.changeHighlight(item);
        if (event) item?.focus();
      }
    });
  } else {
    rootContext.highlightFirstItem();
  }
});

rootContext.virtualHighlightHook.on(value => {
  const index = props.options.findIndex(option => {
    return compare(option, value, rootContext.by);
  });
  virtualizer.value.scrollToIndex(index, { align: 'start' });
  requestAnimationFrame(() => {
    const item = queryCheckedElement(parentEl.value);
    if (item) rootContext.changeHighlight(item);
  });
});

// Reset `search` 1 second after it was last updated
const search = refAutoReset('', 1000);
const optionsWithMetadata = computed(() => {
  const parseTextContent = (option: T) => {
    if (props.textContent) {
      return props.textContent(option);
    }
    return option?.toString()?.toLowerCase();
  };

  return props.options.map((option, index) => ({
    index,
    textContent: parseTextContent(option)
  }));
});

function handleMultipleReplace(_event: Event, intent: 'first' | 'last' | 'prev' | 'next') {
  if (!rootContext.firstValue?.value || !rootContext.multiple.value || !Array.isArray(rootContext.modelValue.value))
    return;

  const collection = getItems().filter(i => i.ref.dataset.disabled !== '');
  const lastValue = collection.find(i => i.ref === rootContext.highlightedElement.value)?.value;
  if (!lastValue) return;

  let value: T[] | null = null;
  // eslint-disable-next-line default-case
  switch (intent) {
    case 'prev':
    case 'next': {
      value = findValuesBetween(props.options, rootContext.firstValue.value as T, lastValue);
      break;
    }
    case 'first': {
      value = findValuesBetween(props.options, rootContext.firstValue.value as T, props.options?.[0]);
      break;
    }
    case 'last': {
      value = findValuesBetween(
        props.options,
        rootContext.firstValue.value as T,
        props.options?.[props.options.length - 1]
      );
      break;
    }
  }
  rootContext.modelValue.value = value;
}

rootContext.virtualKeydownHook.on(event => {
  const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
  const isTabKey = event.key === 'Tab' && !isMetaKey;
  if (isTabKey) return;

  let intent = MAP_KEY_TO_FOCUS_INTENT[event.key as NavigationKeys];

  // Meta + A, select all feature
  if (isMetaKey && event.key === 'a' && rootContext.multiple.value) {
    event.preventDefault();
    rootContext.modelValue.value = [...props.options];
    // purposely make the focus to last
    intent = 'last';
  } else if (event.shiftKey && intent) {
    handleMultipleReplace(event, intent);
  }

  if (['first', 'last'].includes(intent)) {
    event.preventDefault();

    const index = intent === 'first' ? 0 : props.options.length - 1;
    virtualizer.value.scrollToIndex(index);
    requestAnimationFrame(() => {
      const items = getItems();
      const item = intent === 'first' ? items[0] : items[items.length - 1];
      if (item) rootContext.changeHighlight(item.ref);
    });
  } else if (!intent && !isMetaKey) {
    search.value += event.key;
    const currentIndex = Number(getActiveElement()?.getAttribute('data-index'));
    const currentMatch = optionsWithMetadata.value[currentIndex].textContent;
    const filteredOptions = optionsWithMetadata.value.map(i => i.textContent || '');
    const next = getNextMatch(filteredOptions, search.value, currentMatch);

    const nextMatch = optionsWithMetadata.value.find(option => option.textContent === next);
    if (nextMatch) {
      virtualizer.value.scrollToIndex(nextMatch.index, { align: 'start' });
      requestAnimationFrame(() => {
        const item = parentEl.value.querySelector(`[data-index="${nextMatch.index}"]`);
        if (item instanceof HTMLElement) rootContext.changeHighlight(item);
      });
    }
  }
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
    <component :is="is" v-for="{ is, item } in virtualizedItems" :key="item.index" />
  </div>
</template>
