<script setup lang="ts">
import { computed } from 'vue';
import { useCascaderRootContext, useCascaderUi } from './context';
import type { CascaderSearchInputProps } from './types';

defineOptions({
  name: 'CascaderSearchInput'
});

defineProps<CascaderSearchInputProps>();

const { searchPattern, placeholder, disabled, open, onOpenChange, contentId } =
  useCascaderRootContext('CascaderSearchInput');

const cls = useCascaderUi('searchInput');

const isDisabled = computed(() => Boolean(disabled.value));

const onInput = (event: Event) => {
  searchPattern.value = (event.target as HTMLInputElement).value;
  if (!open.value) {
    onOpenChange(true);
  }
};

const onFocus = () => {
  if (!open.value) {
    onOpenChange(true);
  }
};
</script>

<template>
  <input
    data-soybean-cascader-search-input
    :class="cls"
    :value="searchPattern"
    :placeholder="placeholder"
    :disabled="isDisabled || undefined"
    :aria-controls="contentId"
    :aria-expanded="open || false"
    aria-autocomplete="list"
    autocomplete="off"
    spellcheck="false"
    type="text"
    @input="onInput"
    @focus="onFocus"
  />
</template>
