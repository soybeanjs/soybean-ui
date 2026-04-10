<script setup lang="ts">
import { computed, shallowRef, useId } from 'vue';
import { useControllableState } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { ListboxRoot, provideListboxUi } from '../listbox';
import { PopperRoot } from '../popper';
import { providePopoverRootContext } from '../popover/context';
import { provideAutocompleteRootContext, useAutocompleteUi } from './context';
import type { AutocompleteRootEmits, AutocompleteRootProps } from './types';

defineOptions({
  name: 'AutocompleteRoot'
});

const props = withDefaults(defineProps<AutocompleteRootProps>(), {
  modelValue: undefined,
  open: undefined,
  defaultOpen: false,
  highlightOnHover: true,
  openOnFocus: false,
  openOnClick: false
});

const emit = defineEmits<AutocompleteRootEmits>();

defineSlots<{
  default?: (props: {
    open: boolean | undefined;
    modelValue: string | undefined;
  }) => any;
}>();

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value ?? '');
  },
  props.defaultValue ?? ''
);

const open = useControllableState(
  () => props.open,
  value => {
    emit('update:open', value ?? false);
  },
  props.defaultOpen
);

const ui = useAutocompleteUi();

const listboxUi = computed(() => ({
  root: ui.value?.root,
  filterRoot: ui.value?.inputRoot,
  filterControl: ui.value?.inputControl,
  content: ui.value?.viewport,
  item: ui.value?.item,
  itemIndicator: ui.value?.itemIndicator,
  group: ui.value?.group,
  groupLabel: ui.value?.groupLabel,
  virtualizer: ''
}));

const inputElement = shallowRef<HTMLInputElement>();
const inputId = shallowRef('');
const contentId = shallowRef('');

const initInputId = () => {
  if (inputId.value) return;

  inputId.value = `soybean-autocomplete-input-${useId()}`;
};

const initContentId = () => {
  if (contentId.value) return;

  contentId.value = `soybean-autocomplete-content-${useId()}`;
};

const onOpenChange = (value: boolean) => {
  open.value = value;
};

const onModelValueChange = (value: string) => {
  modelValue.value = value;
};

provideListboxUi(listboxUi);
providePopoverRootContext({
  modal: computed(() => false),
  open
});
provideAutocompleteRootContext({
  ...transformPropsToContext(props, ['dir', 'disabled', 'highlightOnHover', 'openOnClick', 'openOnFocus']),
  modelValue,
  open,
  inputElement,
  setInputElement(element) {
    inputElement.value = element;
  },
  inputId,
  initInputId,
  contentId,
  initContentId,
  onOpenChange,
  onModelValueChange
});
</script>

<template>
  <PopperRoot>
    <ListboxRoot
      :model-value="modelValue"
      :dir="dir"
      :disabled="disabled"
      :highlight-on-hover="highlightOnHover"
      :name="name"
      :required="required"
      selection-behavior="replace"
      @update:model-value="onModelValueChange(Array.isArray($event) ? ($event[0] ?? '') : ($event ?? ''))"
      @highlight="emit('highlight', $event)"
    >
      <slot :open="open" :model-value="modelValue" />
    </ListboxRoot>
  </PopperRoot>
</template>
