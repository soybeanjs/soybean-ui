<script setup lang="ts">
import type { PrimitiveProps } from '../primitive';

import { Primitive } from '../primitive';

export interface RangeCalendarHeaderProps extends PrimitiveProps {}

const props = withDefaults(defineProps<RangeCalendarHeaderProps>(), { as: 'div' });
</script>

<template>
  <Primitive v-bind="props">
    <slot />
  </Primitive>
</template>
