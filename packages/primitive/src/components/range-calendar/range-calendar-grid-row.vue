<script setup lang="ts">
import type { PrimitiveProps } from '../primitive';

import { Primitive } from '../primitive';

export interface RangeCalendarGridRowProps extends PrimitiveProps {}

const props = withDefaults(defineProps<RangeCalendarGridRowProps>(), { as: 'tr' });
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
