<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { useLocaleMessages } from '../../locale';
import { useCascaderRootContext, useCascaderUi } from './context';
import type { CascaderSearchInputProps } from './types';

defineOptions({
  name: 'CascaderSearchInput'
});

defineProps<CascaderSearchInputProps>();

const attrs = useAttrs();

const messages = useLocaleMessages();

const { searchPattern, placeholder, disabled, open, onOpenChange, contentId } =
  useCascaderRootContext('CascaderSearchInput');

const cls = useCascaderUi('searchInput');

const isDisabled = computed(() => Boolean(disabled.value));

const ariaLabel = computed(() => (attrs['aria-label'] as string) ?? messages.value.cascader.search);

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
    :aria-label="ariaLabel"
    :aria-controls="contentId"
    aria-autocomplete="list"
    autocomplete="off"
    spellcheck="false"
    type="text"
    @input="onInput"
    @focus="onFocus"
  />
</template>
