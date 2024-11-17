<script lang="ts">
import type { PrimitiveProps } from '../primitive';
</script>

<script setup lang="ts">
import { Primitive } from '../primitive';

export interface CalendarGridBodyProps extends PrimitiveProps {}

const props = withDefaults(defineProps<CalendarGridBodyProps>(), { as: 'tbody' });
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
