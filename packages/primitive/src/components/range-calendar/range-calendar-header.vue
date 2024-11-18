<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';

import Primitive from '../primitive/primitive';

export interface RangeCalendarHeaderProps extends PrimitiveProps {}

const props = withDefaults(defineProps<RangeCalendarHeaderProps>(), { as: 'div' });
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
