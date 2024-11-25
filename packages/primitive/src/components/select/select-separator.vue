<script setup lang="ts">
import { Primitive } from '../primitive';
import type { SelectSeparatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'SelectSeparator'
});

const props = defineProps<SelectSeparatorPropsWithPrimitive>();
</script>

<template>
  <Primitive v-bind="props" aria-hidden="true">
    <slot />
  </Primitive>
</template>
