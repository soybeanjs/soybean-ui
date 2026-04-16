<script setup lang="ts">
import { useComboboxUi } from './context';
import type { ComboboxSeparatorProps } from './types';

defineOptions({
  name: 'ComboboxSeparator'
});

defineProps<ComboboxSeparatorProps>();

const cls = useComboboxUi('separator');
</script>

<template>
  <div :class="cls" role="separator" aria-orientation="horizontal" data-slot="separator">
    <slot />
  </div>
</template>
