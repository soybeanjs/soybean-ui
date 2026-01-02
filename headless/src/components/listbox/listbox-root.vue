<script setup lang="ts" generic="M extends boolean">
import { computed, nextTick, watch } from 'vue';
import { useSelection } from '../../composables';
import { isFormControl, transformPropsToContext } from '../../shared';
import VisuallyHiddenInput from '../visually-hidden/visually-hidden-input.vue';
import { provideListboxRootContext, useListboxUi } from './context';
import type { ListboxRootEmits, ListboxRootProps } from './types';

defineOptions({
  name: 'ListboxRoot'
});

const props = withDefaults(defineProps<ListboxRootProps<M>>(), {
  modelValue: undefined,
  selectionBehavior: 'toggle',
  orientation: 'vertical'
});

const emit = defineEmits<ListboxRootEmits<M>>();

const cls = useListboxUi('root');

const { modelValue, isMultiple } = useSelection(props, value => {
  emit('update:modelValue', value);
});

const {
  rootElement,
  setRootElement,
  isUserAction,
  highlightedElement,
  highlightSelected,
  highlightFirstItem,
  highlightItem,
  getItems
} = provideListboxRootContext({
  ...transformPropsToContext(props, ['dir', 'orientation', 'disabled', 'highlightOnHover', 'selectionBehavior']),
  modelValue,
  isMultiple,
  onHighlight(item) {
    emit('highlight', item);
  },
  onEntryFocus(event) {
    emit('entryFocus', event);
  },
  onLeave(event) {
    emit('leave', event);
  }
});
const formControl = computed(() => isFormControl(rootElement.value));

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
</script>

<template>
  <div
    :ref="setRootElement"
    :class="cls"
    :data-disabled="disabled ? '' : undefined"
    :dir="dir"
    @pointerleave="onLeave"
    @focusout="onFocusout"
  >
    <slot :model-value="modelValue" />

    <VisuallyHiddenInput
      v-if="formControl && name"
      :name="name"
      :value="modelValue"
      :disabled="disabled"
      :required="required"
    />
  </div>
</template>
