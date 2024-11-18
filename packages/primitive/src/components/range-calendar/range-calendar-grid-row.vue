<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';

import Primitive from '../primitive/primitive';

export interface RangeCalendarGridRowProps extends PrimitiveProps {}

const props = withDefaults(defineProps<RangeCalendarGridRowProps>(), { as: 'tr' });
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
