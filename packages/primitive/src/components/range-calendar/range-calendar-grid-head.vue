<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';

import Primitive from '../primitive/primitive';

export interface RangeCalendarGridHeadProps extends PrimitiveProps {}

const props = withDefaults(defineProps<RangeCalendarGridHeadProps>(), { as: 'thead' });
</script>

<template>
  <Primitive v-bind="props" aria-hidden="true">
    <slot />
  </Primitive>
</template>
