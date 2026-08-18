<script setup lang="ts">
import { computed, ref, useAttrs, watch } from 'vue';
import { useLocaleMessages } from '../../locale';
import { useCascaderRootContext, useCascaderUi } from './context';
import type { CascaderSearchInputProps } from './types';

defineOptions({
  name: 'CascaderSearchInput'
});

defineProps<CascaderSearchInputProps>();

const attrs = useAttrs();

const messages = useLocaleMessages();

const { searchPattern, placeholder, disabled, open, onOpenChange, contentId, selectedLabels, multiple, separator } =
  useCascaderRootContext('CascaderSearchInput');

const cls = useCascaderUi('searchInput');

const isDisabled = computed(() => Boolean(disabled.value));

const isFocused = ref(false);

const inputElement = ref<HTMLInputElement>();

const ariaLabel = computed(() => (attrs['aria-label'] as string) ?? messages.value.cascader.search);

/** Text of the current selection, shown in the input when not typing. */
const selectedText = computed(() => {
  if (selectedLabels.value.length === 0) return '';
  return selectedLabels.value.join(multiple.value ? ', ' : (separator.value ?? ' / '));
});

/** Value displayed in the input: the live search pattern, otherwise the selection. */
const displayValue = computed(() => searchPattern.value || selectedText.value);

/** Whether the input is currently displaying the selection (faded while focused). */
const isFaded = computed(() => isFocused.value && !searchPattern.value && selectedLabels.value.length > 0);

const onInput = (event: Event) => {
  searchPattern.value = (event.target as HTMLInputElement).value;
  if (!open.value) {
    onOpenChange(true);
  }
};

const onFocus = () => {
  isFocused.value = true;
  if (!open.value) {
    onOpenChange(true);
  }
};

const onBlur = () => {
  isFocused.value = false;
};

// After the panel closes (e.g. a single selection), drop focus so the input
// shows the selection at full color instead of the faded focus state.
watch(open, openValue => {
  if (!openValue && isFocused.value) {
    inputElement.value?.blur();
  }
});
</script>

<template>
  <input
    ref="inputElement"
    data-soybean-cascader-search-input
    :class="cls"
    :value="displayValue"
    :data-faded="isFaded ? '' : undefined"
    :placeholder="placeholder"
    :disabled="isDisabled || undefined"
    :aria-label="ariaLabel"
    :aria-controls="contentId"
    aria-autocomplete="list"
    autocomplete="off"
    spellcheck="false"
    type="text"
    @input="onInput"
    @focus="onFocus"
    @blur="onBlur"
  />
</template>
