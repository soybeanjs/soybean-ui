<script setup lang="ts">
import { computed } from 'vue';
import { PopperV2Arrow } from '../popper-v2';
import { useComboboxContentContext, useComboboxRootContext, useComboboxUi } from './context';
import type { ComboboxArrowProps } from './types';

defineOptions({
  name: 'ComboboxArrow'
});

defineProps<ComboboxArrowProps>();

const cls = useComboboxUi('arrow');

const { open } = useComboboxRootContext('ComboboxArrow');
const { position } = useComboboxContentContext('ComboboxArrow');

const showArrow = computed(() => open.value && position.value === 'popper');
</script>

<template>
  <PopperV2Arrow v-if="showArrow" data-soybean-combobox-arrow :class="cls">
    <slot />
  </PopperV2Arrow>
</template>
