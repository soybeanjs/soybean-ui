<script setup lang="ts">
import { computed, nextTick, onMounted, watch, mergeProps } from 'vue';
import { useControllableState, useOmitProps } from '../../composables';
import { ListboxFilter } from '../listbox';
import { useListboxRootContext } from '../listbox/context';
import type { InputControlProps } from '../input/types';
import { useComboboxRootContext } from './context';
import type { ComboboxInputEmits, ComboboxInputProps } from './types';

defineOptions({
  name: 'ComboboxInput'
});

const props = defineProps<ComboboxInputProps>();

const emit = defineEmits<ComboboxInputEmits>();

const {
  modelValue: selectedModelValue,
  open,
  openOnFocus,
  openOnClick,
  isUserInputted,
  isMultiple,
  resetSearchTermOnSelect,
  parentElement,
  contentId,
  filterSearch,
  filterState,
  isVirtual,
  onInputElementChange,
  onOpenChange,
  onResetSearchTerm
} = useComboboxRootContext('ComboboxInput');
const { highlightFirstItem } = useListboxRootContext('ComboboxInput');

const forwardedProps = useOmitProps(props, ['displayValue']);

const inputValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value ?? '');
  },
  props.defaultValue ?? ''
);

const inputRef = (element: HTMLInputElement) => {
  props.inputRef?.(element);
  onInputElementChange(element);
};

const onKeydown = (event: KeyboardEvent) => {
  if (!['ArrowDown', 'ArrowUp'].includes(event.key) || open.value) {
    return;
  }

  onOpenChange(true);
};

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  isUserInputted.value = true;

  if (!open.value) {
    onOpenChange(true);

    nextTick(() => {
      if (target.value) {
        filterSearch.value = target.value;
        highlightFirstItem();
      }
    });

    return;
  }

  filterSearch.value = target.value;
};

const onFocus = () => {
  if (openOnFocus.value && !open.value) {
    onOpenChange(true);
  }
};

const onBlur = (event: FocusEvent) => {
  if (!open.value) {
    return;
  }

  const nextFocus = event.relatedTarget as Element | null;

  if (!nextFocus) {
    return;
  }

  const isInsideRoot = parentElement.value?.contains(nextFocus);
  const isInsideContent = document.getElementById(contentId.value)?.contains(nextFocus);

  if (!isInsideRoot && !isInsideContent) {
    onOpenChange(false);
  }
};

const onClick = () => {
  if (openOnClick.value && !open.value) {
    onOpenChange(true);
  }
};

const resetSearchTerm = () => {
  const currentValue = selectedModelValue.value;

  if (props.displayValue) {
    inputValue.value = props.displayValue(currentValue);
    return;
  }

  if (!isMultiple.value && typeof currentValue === 'string') {
    inputValue.value = currentValue;
    return;
  }

  inputValue.value = '';
};

onResetSearchTerm(() => {
  resetSearchTerm();
});

const controlProps = computed<InputControlProps>(() =>
  mergeProps(
    {
      ...props.controlProps
    },
    {
      'data-slot': 'input-control',
      role: 'combobox',
      'aria-autocomplete': 'list',
      autocomplete: 'off',
      'aria-controls': contentId.value || undefined,
      'aria-expanded': open.value ?? false,
      onBlur,
      onClick,
      onFocus,
      onInput,
      onKeydown
    }
  )
);

watch(
  selectedModelValue,
  () => {
    if (!isUserInputted.value && resetSearchTermOnSelect.value) {
      resetSearchTerm();
    }
  },
  {
    immediate: true,
    deep: true
  }
);

watch(filterState, (_, previous) => {
  if (!isVirtual.value && previous?.count === 0) {
    highlightFirstItem();
  }
});

onMounted(() => {
  resetSearchTerm();
});
</script>

<template>
  <ListboxFilter
    v-bind="forwardedProps"
    v-model="inputValue"
    data-slot="input-root"
    :control-props="controlProps"
    :input-ref="inputRef"
  >
    <template #leading="slotProps">
      <slot name="leading" v-bind="slotProps" />
    </template>
    <template #trailing="slotProps">
      <slot name="trailing" v-bind="slotProps" />
    </template>
  </ListboxFilter>
</template>
