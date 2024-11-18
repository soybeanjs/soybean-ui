<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';

import Primitive from '../primitive/primitive';

export interface RangeCalendarGridBodyProps extends PrimitiveProps {}

const props = withDefaults(defineProps<RangeCalendarGridBodyProps>(), { as: 'tbody' });
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
