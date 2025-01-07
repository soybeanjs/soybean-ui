<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed } from 'vue';
import { useCollection, useForwardExpose, useId } from '../../composables';
import { handleAndDispatchCustomEvent } from '../../shared';
import type { AcceptableValue, SelectEvent } from '../../types';
import { Primitive } from '../primitive';
import { injectListboxRootContext, provideListboxItemContext } from './context';
import { valueComparator } from './shared';
import type { ListboxItemEmits, ListboxItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'ListboxItem',
  inheritAttrs: false
});

const LISTBOX_SELECT = 'listbox.select';

const props = withDefaults(defineProps<ListboxItemPropsWithPrimitive<T>>(), {
  as: 'div'
});
const emit = defineEmits<ListboxItemEmits<T>>();

const id = useId(undefined, 'soybean-listbox-item');
const { CollectionItem } = useCollection();
const { forwardRef, currentElement } = useForwardExpose();
const rootContext = injectListboxRootContext();

const isHighlighted = computed(() => currentElement.value === rootContext.highlightedElement.value);
const isSelected = computed(() => valueComparator(rootContext.modelValue.value, props.value, rootContext.by));

const disabled = computed(() => rootContext.disabled.value || props.disabled);

async function handleSelect(ev: SelectEvent<T>) {
  emit('select', ev);
  if (ev?.defaultPrevented) return;

  if (!disabled.value && ev) {
    rootContext.onValueChange(props.value);
    rootContext.changeHighlight(currentElement.value);
  }
}

function handleSelectCustomEvent(ev: PointerEvent) {
  const eventDetail = { originalEvent: ev, value: props.value as T };
  handleAndDispatchCustomEvent(LISTBOX_SELECT, handleSelect, eventDetail);
}

function onPointermove() {
  if (rootContext.highlightedElement.value === currentElement.value) return;

  if (rootContext.highlightOnHover.value) {
    rootContext.changeHighlight(currentElement.value, false);
  } else if (!rootContext.focusable.value) {
    rootContext.changeHighlight(currentElement.value, false);
  }
}

provideListboxItemContext({
  isSelected
});
</script>

<template>
  <CollectionItem :value="value">
    <Primitive
      v-bind="$attrs"
      :id="id"
      :ref="forwardRef"
      v-memo="[isHighlighted, isSelected]"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      role="option"
      :tabindex="rootContext.focusable.value ? (isHighlighted ? '0' : '-1') : -1"
      :aria-selected="isSelected"
      :disabled="disabled ? '' : undefined"
      :data-disabled="disabled ? '' : undefined"
      :data-highlighted="isHighlighted ? '' : undefined"
      :data-state="isSelected ? 'checked' : 'unchecked'"
      @click="handleSelectCustomEvent"
      @keydown.space.prevent="handleSelectCustomEvent"
      @pointermove="onPointermove"
    >
      <slot />
    </Primitive>
  </CollectionItem>
</template>
