<script setup lang="ts">
import { SeparatorRoot } from '../separator';
import { useAutocompleteUi } from './context';
import type { AutocompleteSeparatorProps } from './types';

defineOptions({
  name: 'AutocompleteSeparator'
});

const props = defineProps<AutocompleteSeparatorProps>();

const cls = useAutocompleteUi('separator');
</script>

<template>
  <SeparatorRoot v-bind="props" :class="cls">
    <slot />
  </SeparatorRoot>
</template>
