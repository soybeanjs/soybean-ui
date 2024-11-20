<script setup lang="ts">
import { Primitive } from '../primitive';
import type { SelectSeparatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'SelectSeparator'
});

const props = defineProps<SelectSeparatorPropsWithPrimitive>();
</script>

<template>
  <Primitive aria-hidden="true" v-bind="props">
    <slot />
  </Primitive>
</template>
