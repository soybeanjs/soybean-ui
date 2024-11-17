<script lang="ts">
import type { PrimitiveProps } from '../primitive';
</script>

<script setup lang="ts">
import { Primitive } from '../primitive';

export interface CalendarGridRowProps extends PrimitiveProps {}

const props = withDefaults(defineProps<CalendarGridRowProps>(), { as: 'tr' });
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
