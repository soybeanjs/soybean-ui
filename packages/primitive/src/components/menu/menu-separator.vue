<script lang="ts">
import type { PrimitiveProps } from '../primitive';
</script>

<script setup lang="ts">
import { Primitive } from '../primitive';

export interface MenuSeparatorProps extends PrimitiveProps {}

const props = defineProps<MenuSeparatorProps>();
</script>

<template>
  <Primitive v-bind="props" role="separator" aria-orientation="horizontal">
    <slot />
  </Primitive>
</template>
