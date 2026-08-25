<script setup lang="ts">
import { computed } from 'vue';
import { PopperV2Arrow } from '../popper-v2';
import { useSelectContentContext } from './context';
import type { SelectArrowProps } from './types';

defineOptions({
  name: 'SelectArrow'
});

defineProps<SelectArrowProps>();

const { position } = useSelectContentContext('SelectArrow');

const showArrow = computed(() => position.value === 'popper');
</script>

<template>
  <PopperV2Arrow v-if="showArrow" data-soybean-select-arrow>
    <slot />
  </PopperV2Arrow>
</template>
