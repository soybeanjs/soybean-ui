<script setup lang="ts">
import { ListboxContent } from '../listbox';
import { useAutocompleteRootContext } from './context';
import type { AutocompleteViewportProps } from './types';

defineOptions({
  name: 'AutocompleteViewport'
});

const props = defineProps<AutocompleteViewportProps>();

const { contentId, initContentId } = useAutocompleteRootContext('AutocompleteViewport');

initContentId();
</script>

<template>
  <ListboxContent v-bind="props" :id="contentId">
    <slot />
  </ListboxContent>
</template>
