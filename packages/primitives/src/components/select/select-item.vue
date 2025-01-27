<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { computed, nextTick, onMounted, ref, toRefs } from 'vue';
import { useCollection, useForwardExpose, useId } from '../../composables';
import { handleAndDispatchCustomEvent } from '../../shared';
import type { AcceptableValue } from '../../types';
import { Primitive } from '../primitive';
import { injectSelectContentContext, injectSelectRootContext, provideSelectItemContext } from './context';
import { SELECTION_KEYS, valueComparator } from './shared';
import type { SelectItemEmits, SelectItemEvent, SelectItemPropsWithPrimitive } from './types';

defineOptions({
  name: 'SelectItem'
});

const props = defineProps<SelectItemPropsWithPrimitive<T>>();
const emit = defineEmits<SelectItemEmits<T>>();

const { disabled } = toRefs(props);

const rootContext = injectSelectRootContext();
const contentContext = injectSelectContentContext();
const { forwardRef, currentElement } = useForwardExpose();
const { CollectionItem } = useCollection();

const isSelected = computed(() => valueComparator(rootContext.modelValue?.value, props.value, rootContext.by));
const isFocused = ref(false);
const textValue = ref(props.textValue ?? '');
const textId = useId(undefined, 'soybean-select-item-text');
const SELECT_SELECT = 'select.select';

async function handleSelectCustomEvent(ev: PointerEvent | KeyboardEvent) {
  if (ev.defaultPrevented) return;

  const eventDetail = { originalEvent: ev, value: props.value as T };
  handleAndDispatchCustomEvent(SELECT_SELECT, handleSelect, eventDetail);
}

async function handleSelect(ev: SelectItemEvent<T>) {
  await nextTick();
  emit('select', ev);
  if (ev.defaultPrevented) return;

  if (!disabled.value) {
    rootContext.onValueChange(props.value);
    if (!rootContext.multiple.value) rootContext.onOpenChange(false);
  }
}

async function handlePointerMove(event: PointerEvent) {
  await nextTick();
  if (event.defaultPrevented) return;
  if (disabled.value) {
    contentContext.onItemLeave?.();
  } else {
    // even though safari doesn't support this option, it's acceptable
    // as it only means it might scroll a few pixels when using the pointer.
    (event.currentTarget as HTMLElement).focus({ preventScroll: true });
  }
}

async function handlePointerLeave(event: PointerEvent) {
  await nextTick();
  if (event.defaultPrevented) return;
  if (event.currentTarget === document.activeElement) contentContext.onItemLeave?.();
}

async function handleKeyDown(event: KeyboardEvent) {
  await nextTick();
  if (event.defaultPrevented) return;
  const isTypingAhead = contentContext.searchRef?.value !== '';
  if (isTypingAhead && event.key === ' ') return;
  if (SELECTION_KEYS.includes(event.key)) {
    handleSelectCustomEvent(event);
  }
  // prevent page scroll if using the space key to select an item
  if (event.key === ' ') {
    event.preventDefault();
  }
}

if (props.value === '') {
  throw new Error(
    'A <SelectItem /> must have a value prop that is not an empty string. This is because the Select value can be set to an empty string to clear the selection and show the placeholder.'
  );
}

function onPointerDown(event: PointerEvent) {
  (event.currentTarget as HTMLElement).focus({ preventScroll: true });
}

onMounted(() => {
  if (!currentElement.value) return;
  contentContext.itemRefCallback(currentElement.value, props.value, props.disabled);
});

provideSelectItemContext({
  value: props.value,
  disabled,
  textId,
  isSelected,
  onItemTextChange: node => {
    textValue.value = ((textValue.value || node?.textContent) ?? '').trim();
  }
});
</script>

<template>
  <CollectionItem :value="{ textValue }">
    <Primitive
      :ref="forwardRef"
      :class="props.class"
      :as="as"
      :as-child="asChild"
      :aria-labelledby="textId"
      :data-highlighted="isFocused ? '' : undefined"
      :aria-selected="isSelected"
      :data-state="isSelected ? 'checked' : 'unchecked'"
      :aria-disabled="disabled || undefined"
      :data-disabled="disabled ? '' : undefined"
      role="option"
      :tabindex="disabled ? undefined : -1"
      @focus="isFocused = true"
      @blur="isFocused = false"
      @pointerup="handleSelectCustomEvent"
      @pointerdown="onPointerDown"
      @touchend.prevent.stop
      @pointermove="handlePointerMove"
      @pointerleave="handlePointerLeave"
      @keydown="handleKeyDown"
    >
      <slot />
    </Primitive>
  </CollectionItem>
</template>
