<script setup lang="ts">
import type { SelectSeparatorProps } from './types';
import { useSelectUi } from './context';

defineOptions({
  name: 'SelectSeparator'
});

defineProps<SelectSeparatorProps>();

const cls = useSelectUi('separator');
</script>

<template>
  <div :class="cls" role="separator" aria-orientation="horizontal">
    <slot />
  </div>
</template>
