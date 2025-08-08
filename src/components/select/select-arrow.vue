<script setup lang="ts">
import { computed } from 'vue';
import { PopperArrow } from '../popper';
import { useSelectContentContext, useSelectRootContext } from './context';
import type { SelectArrowProps } from './types';

defineOptions({
  name: 'SelectArrow'
});

const props = defineProps<SelectArrowProps>();

const { open } = useSelectRootContext('SelectArrow');
const { position } = useSelectContentContext('SelectArrow');

const showArrow = computed(() => open.value && position.value === 'popper');
</script>

<template>
  <PopperArrow v-if="showArrow" v-bind="props">
    <slot />
  </PopperArrow>
</template>
