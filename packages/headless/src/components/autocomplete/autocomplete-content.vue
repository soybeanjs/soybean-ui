<script setup lang="ts">
import { useForwardListeners } from '../../composables';
import { ComboboxContent } from '../combobox';
import type { AutocompleteContentEmits, AutocompleteContentProps } from './types';

defineOptions({
  name: 'AutocompleteContent'
});

const props = defineProps<AutocompleteContentProps>();

const emit = defineEmits<AutocompleteContentEmits>();

const listeners = useForwardListeners(emit);
</script>

<template>
  <ComboboxContent v-bind="props" data-soybean-autocomplete-content v-on="listeners">
    <slot />
  </ComboboxContent>
</template>
