<script setup lang="ts">
import type { PrimitiveProps } from '../primitive';

import { Primitive } from '../primitive';

export interface RangeCalendarHeadCellProps extends PrimitiveProps {}

const props = withDefaults(defineProps<RangeCalendarHeadCellProps>(), { as: 'th' });
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
