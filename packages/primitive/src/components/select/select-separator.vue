<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';

import Primitive from '../primitive/primitive';

export interface SelectSeparatorProps extends PrimitiveProps {}

const props = defineProps<SelectSeparatorProps>();
</script>

<template>
  <Primitive aria-hidden="true" v-bind="props">
    <slot />
  </Primitive>
</template>
