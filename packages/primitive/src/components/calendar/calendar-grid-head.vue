<script lang="ts">
import type { PrimitiveProps } from '../primitive';
</script>

<script setup lang="ts">
import { Primitive } from '../primitive';

export interface CalendarGridHeadProps extends PrimitiveProps {}

const props = withDefaults(defineProps<CalendarGridHeadProps>(), { as: 'thead' });
</script>

<template>
  <Primitive v-bind="props" aria-hidden="true">
    <slot />
  </Primitive>
</template>
