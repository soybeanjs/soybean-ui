<script lang="ts">
import { type Ref, computed } from 'vue';
import { useCollection } from '../../composables';
import { createContext, handleAndDispatchCustomEvent, useForwardExpose, useId } from '../../_shared';
</script>

<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { Primitive, type PrimitiveProps } from '..';
import type { AcceptableValue } from '../../_shared/types';
import { injectListboxRootContext } from './listbox-root.vue';
import { valueComparator } from './utils';

export interface ListboxItemProps<T = AcceptableValue> extends PrimitiveProps {
  /** The value given as data when submitted with a `name`. */
  value: T;
  /** When `true`, prevents the user from interacting with the item. */
  disabled?: boolean;
}
export type SelectEvent<T> = CustomEvent<{ originalEvent: PointerEvent; value?: T }>;

export type ListboxItemEmits<T = AcceptableValue> = {
  /** Event handler called when the selecting item. <br> It can be prevented by calling `event.preventDefault`. */
  select: [event: SelectEvent<T>];
};

const LISTBOX_SELECT = 'listbox.select';

interface ListboxItemContext {
  isSelected: Ref<boolean>;
}

export const [injectListboxItemContext, provideListboxItemContext] = createContext<ListboxItemContext>('ListboxItem');

const props = withDefaults(defineProps<ListboxItemProps<T>>(), {
  as: 'div'
});
const emits = defineEmits<ListboxItemEmits<T>>();

const id = useId(undefined, 'soybean-listbox-item');
const { CollectionItem } = useCollection();
const { forwardRef, currentElement } = useForwardExpose();
const rootContext = injectListboxRootContext();

const isHighlighted = computed(() => currentElement.value === rootContext.highlightedElement.value);
const isSelected = computed(() => valueComparator(rootContext.modelValue.value, props.value, rootContext.by));

const disabled = computed(() => rootContext.disabled.value || props.disabled);

async function handleSelect(ev: SelectEvent<T>) {
  emits('select', ev);
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

provideListboxItemContext({
  isSelected
});
</script>

<template>
  <CollectionItem :value="value">
    <Primitive
      :id="id"
      v-bind="$attrs"
      :ref="forwardRef"
      v-memo="[isHighlighted, isSelected]"
      role="option"
      :tabindex="rootContext.focusable.value ? (isHighlighted ? '0' : '-1') : -1"
      :aria-selected="isSelected"
      :as
      :as-child
      :disabled="disabled ? '' : undefined"
      :data-disabled="disabled ? '' : undefined"
      :data-highlighted="isHighlighted ? '' : undefined"
      :data-state="isSelected ? 'checked' : 'unchecked'"
      @click="handleSelectCustomEvent"
      @keydown.space.prevent="handleSelectCustomEvent"
      @pointermove="
        event => {
          if (rootContext.highlightedElement.value === currentElement) return;

          if (rootContext.highlightOnHover.value) rootContext.changeHighlight(currentElement, false);
          else rootContext.focusable.value ? undefined : rootContext.changeHighlight(currentElement, false);
        }
      "
    >
      <slot />
    </Primitive>
  </CollectionItem>
</template>
