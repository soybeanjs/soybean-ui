<script setup lang="ts">
import type { PrimitiveProps } from '../primitive';

import { Primitive } from '../primitive';

export interface RangeCalendarGridHeadProps extends PrimitiveProps {}

const props = withDefaults(defineProps<RangeCalendarGridHeadProps>(), { as: 'thead' });
</script>

<template>
  <Primitive v-bind="props" aria-hidden="true">
    <slot />
  </Primitive>
</template>
