<script setup lang="ts">
import type { PrimitiveProps } from '../primitive';

import { Primitive } from '../primitive';

export interface SelectSeparatorProps extends PrimitiveProps {}

const props = defineProps<SelectSeparatorProps>();
</script>

<template>
  <Primitive aria-hidden="true" v-bind="props">
    <slot />
  </Primitive>
</template>
