<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';

import Primitive from '../primitive/primitive';

export interface RangeCalendarHeadCellProps extends PrimitiveProps {}

const props = withDefaults(defineProps<RangeCalendarHeadCellProps>(), { as: 'th' });
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
