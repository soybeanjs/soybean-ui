<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useComboboxRootContext, useComboboxUi } from './context';
import type { ComboboxEmptyProps } from './types';

defineOptions({
  name: 'ComboboxEmpty'
});

defineProps<ComboboxEmptyProps>();

const { filterState } = useComboboxRootContext('ComboboxEmpty');
const cls = useComboboxUi('empty');
const visible = computed(() => filterState.value.count === 0);
</script>

<template>
  <Primitive v-if="visible" as="div" :class="cls">
    <slot />
  </Primitive>
</template>
