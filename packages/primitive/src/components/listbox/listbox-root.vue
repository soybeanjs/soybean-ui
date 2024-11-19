<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { nextTick, ref, toRefs, watch } from 'vue';
import { createEventHook } from '@vueuse/core';
import {
  useCollection,
  useDirection,
  useFormControl,
  useKbd,
  usePrimitiveElement,
  useTypeAhead
} from '../../composables';
import { findValuesBetween } from '../../shared';
import type { AcceptableValue } from '../../types';
import { VisuallyHiddenInput } from '../visually-hidden';
import { Primitive } from '../primitive';
import { getFocusIntent } from '../roving-focus/shared';
import { compare } from './shared';
import { provideListboxRootContext } from './context';
import type { ListboxRootContext, ListboxRootEmits, ListboxRootPropsWithPrimitive } from './types';

defineOptions({
  name: 'ListboxRoot'
});

const props = withDefaults(defineProps<ListboxRootPropsWithPrimitive<T>>(), {
  selectionBehavior: 'toggle',
  orientation: 'vertical'
});

const emit = defineEmits<ListboxRootEmits>();

const { multiple, highlightOnHover, orientation, disabled, selectionBehavior, dir: propDir } = toRefs(props);
const { getItems } = useCollection<{ value: T }>({ isProvider: true });
const { handleTypeAheadSearch } = useTypeAhead();
const { primitiveElement, currentElement } = usePrimitiveElement();
const kbd = useKbd();
const dir = useDirection(propDir);

const isFormControl = useFormControl(currentElement);

const firstValue = ref<T>();
const isUserAction = ref(false);
const focusable = ref(true);

const modelValue = defineModel<T | T[] | undefined>('modelValue', {
  default: props.defaultValue ?? (multiple.value ? [] : undefined)
});

function onValueChange(val: T) {
  isUserAction.value = true;
  if (Array.isArray(modelValue.value)) {
    const index = modelValue.value.findIndex(i => compare(i, val, props.by));
    if (props.selectionBehavior === 'toggle') {
      const modelArray = [...modelValue.value];
      // index === -1 ? modelArray.push(val) : modelArray.splice(index, 1);
      if (index === -1) {
        modelArray.push(val);
      } else {
        modelArray.splice(index, 1);
      }
      modelValue.value = modelArray;
    } else {
      modelValue.value = [val];
      firstValue.value = val;
    }
  } else if (props.selectionBehavior === 'toggle') {
    if (compare(modelValue.value, val, props.by)) modelValue.value = undefined;
    else modelValue.value = val;
  } else {
    modelValue.value = val;
  }
  setTimeout(() => {
    isUserAction.value = false;
  }, 1);
}

const highlightedElement = ref<HTMLElement | null>(null);
const previousElement = ref<HTMLElement | null>(null);
const isVirtual = ref(false);
const virtualFocusHook = createEventHook<Event | null | undefined>();
const virtualKeydownHook = createEventHook<KeyboardEvent>();
const virtualHighlightHook = createEventHook<T>();

function getCollectionItem() {
  return getItems()
    .map(i => i.ref)
    .filter(i => i.dataset.disabled !== '');
}

function changeHighlight(el: HTMLElement, scrollIntoView = true) {
  if (!el) return;

  highlightedElement.value = el;
  if (focusable.value) highlightedElement.value.focus();
  if (scrollIntoView) highlightedElement.value.scrollIntoView({ block: 'nearest' });

  const highlightedItem = getItems().find(i => i.ref === el);
  emit('highlight', highlightedItem);
}

function highlightItem(value: T) {
  if (isVirtual.value) {
    virtualHighlightHook.trigger(value);
  } else {
    const item = getItems().find(i => compare(i.value, value, props.by));
    if (item) {
      highlightedElement.value = item.ref;
      changeHighlight(item.ref);
    }
  }
}

function onKeydownEnter(event: KeyboardEvent) {
  if (highlightedElement.value) {
    event.preventDefault();
    event.stopPropagation();

    highlightedElement.value.click();
  }
}

function onKeydownTypeAhead(event: KeyboardEvent) {
  isUserAction.value = true;
  if (isVirtual.value) {
    virtualKeydownHook.trigger(event);
  } else {
    const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;

    if (isMetaKey && event.key === 'a' && multiple.value) {
      const collection = getItems();
      const values = collection.map(i => i.value);
      modelValue.value = [...values];
      event.preventDefault();
      changeHighlight(collection[collection.length - 1].ref);
    } else if (!isMetaKey) {
      const el = handleTypeAheadSearch(event.key, getCollectionItem());
      if (el) changeHighlight(el);
    }
  }
  setTimeout(() => {
    isUserAction.value = false;
  }, 1);
}

function highlightFirstItem() {
  nextTick(() => {
    const event = new KeyboardEvent('keydown', { key: 'PageUp' });
    onKeydownNavigation(event);
  });
}

function onLeave(event: Event) {
  const el = highlightedElement.value;

  if ((el as Node)?.isConnected) {
    previousElement.value = el;
  }

  highlightedElement.value = null;
  emit('leave', event);
}

function onEnter(event: Event) {
  const entryFocusEvent = new CustomEvent('listbox.entryFocus', { bubbles: false, cancelable: true });
  event.currentTarget?.dispatchEvent(entryFocusEvent);
  emit('entryFocus', entryFocusEvent);

  if (entryFocusEvent.defaultPrevented) return;

  if (previousElement.value) {
    changeHighlight(previousElement.value);
  } else {
    const el = getCollectionItem()?.[0];
    changeHighlight(el);
  }
}

function onKeydownNavigation(event: KeyboardEvent) {
  const intent = getFocusIntent(event, orientation.value, dir.value);
  if (!intent) return;

  let collection = getCollectionItem();
  if (highlightedElement.value) {
    if (intent === 'last') {
      collection.reverse();
    } else if (intent === 'prev' || intent === 'next') {
      if (intent === 'prev') collection.reverse();

      const currentIndex = collection.indexOf(highlightedElement.value);
      collection = collection.slice(currentIndex + 1);
    }
    handleMultipleReplace(event, collection[0]);
  }

  if (collection.length) {
    const index = !highlightedElement.value && intent === 'prev' ? collection.length - 1 : 0;
    changeHighlight(collection[index]);
  }

  if (isVirtual.value) return virtualKeydownHook.trigger(event);
}

function handleMultipleReplace(event: KeyboardEvent, targetEl: HTMLElement) {
  if (isVirtual.value || props.selectionBehavior !== 'replace' || !multiple.value || !Array.isArray(modelValue.value))
    return;
  const isMetaKey = event.altKey || event.ctrlKey || event.metaKey;
  if (isMetaKey && !event.shiftKey) return;

  if (event.shiftKey) {
    const collection = getItems().filter(i => i.ref.dataset.disabled !== '');
    let lastValue = collection.find(i => i.ref === targetEl)?.value;

    if (event.key === kbd.END) lastValue = collection[collection.length - 1].value;
    else if (event.key === kbd.HOME) lastValue = collection[0].value;

    if (!lastValue || !firstValue.value) return;

    const values = findValuesBetween(
      collection.map(i => i.value),
      firstValue.value,
      lastValue
    );
    modelValue.value = values;
  }
}

async function highlightSelected(event?: Event) {
  await nextTick();
  if (isVirtual.value) {
    // Trigger on nextTick for Virtualizer to be mounted
    virtualFocusHook.trigger(event);
  } else {
    const collection = getCollectionItem();
    const item = collection.find(i => i.dataset.state === 'checked');
    if (item) changeHighlight(item);
    else if (collection.length) changeHighlight(collection[0]);
  }
}

async function onFocusout(event: FocusEvent) {
  const target = (event.relatedTarget || event.target) as HTMLElement | null;

  await nextTick();

  if (highlightedElement.value && currentElement.value && !currentElement.value.contains(target)) {
    onLeave(event);
  }
}

// watch for only programmatic changes
watch(
  modelValue,
  () => {
    if (!isUserAction.value) {
      nextTick(() => {
        highlightSelected();
      });
    }
  },
  { immediate: true, deep: true }
);

defineExpose({
  highlightedElement,
  highlightItem,
  highlightFirstItem,
  highlightSelected,
  getItems
});

provideListboxRootContext({
  modelValue,
  onValueChange,
  multiple,
  orientation,
  dir,
  disabled,
  highlightOnHover,
  highlightedElement,
  isVirtual,
  virtualFocusHook,
  virtualKeydownHook,
  virtualHighlightHook,
  by: props.by,
  firstValue,
  selectionBehavior,
  focusable,
  onLeave,
  onEnter,
  changeHighlight,
  onKeydownEnter,
  onKeydownNavigation,
  onKeydownTypeAhead,
  highlightFirstItem
} as ListboxRootContext<AcceptableValue>);
</script>

<template>
  <Primitive
    ref="primitiveElement"
    :class="props.class"
    :as
    :as-child
    :dir
    :data-disabled="disabled ? '' : undefined"
    @pointerleave="onLeave"
    @focusout="onFocusout"
  >
    <slot :model-value="modelValue" />

    <VisuallyHiddenInput
      v-if="isFormControl && name"
      :name="name"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
    />
  </Primitive>
</template>
