<script setup lang="ts">
import { Primitive } from '../primitive';
import { useSelectItemContext } from './context';
import type { SelectItemIndicatorProps } from './types';

defineOptions({
  name: 'SelectItemIndicator'
});

const props = withDefaults(defineProps<SelectItemIndicatorProps>(), {
  as: 'span'
});

const { isSelected } = useSelectItemContext('SelectItemIndicator');
</script>

<template>
  <Primitive v-if="isSelected" v-bind="props" aria-hidden="true">
    <slot />
  </Primitive>
</template>
