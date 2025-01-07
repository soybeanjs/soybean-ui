<script setup lang="ts">
import { Primitive } from '../primitive';
import type { MenuSeparatorPropsWithPrimitive } from './types';

defineOptions({
  name: 'MenuSeparator'
});

const props = defineProps<MenuSeparatorPropsWithPrimitive>();
</script>

<template>
  <Primitive v-bind="props" role="separator" aria-orientation="horizontal">
    <slot />
  </Primitive>
</template>
