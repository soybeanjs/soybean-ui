<script setup lang="ts">
import { Primitive } from '../primitive';
import { useComboboxUi } from './context';
import type { ComboboxSeparatorProps } from './types';

defineOptions({
  name: 'ComboboxSeparator'
});

defineProps<ComboboxSeparatorProps>();

const cls = useComboboxUi('separator');
</script>

<template>
  <Primitive as="div" role="separator" :class="cls">
    <slot />
  </Primitive>
</template>
