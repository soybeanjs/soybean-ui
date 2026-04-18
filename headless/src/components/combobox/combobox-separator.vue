<script setup lang="ts">
import { Primitive } from '../primitive';
import { useComboboxUi } from './context';
import type { ComboboxSeparatorProps } from './types';

defineOptions({
  name: 'ComboboxSeparator'
});

const props = defineProps<ComboboxSeparatorProps>();

const cls = useComboboxUi('separator');
</script>

<template>
  <Primitive v-bind="props" :class="cls" role="separator" aria-orientation="horizontal" data-slot="separator">
    <slot />
  </Primitive>
</template>
