<script lang="ts">
import type { PrimitiveProps } from '../primitive';
</script>

<script setup lang="ts">
import { Primitive } from '../primitive';

export interface CalendarHeaderProps extends PrimitiveProps {}

const props = withDefaults(defineProps<CalendarHeaderProps>(), { as: 'div' });
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
