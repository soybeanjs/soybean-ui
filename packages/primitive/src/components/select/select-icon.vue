<script setup lang="ts">
import type { PrimitiveProps } from '../primitive';

import { Primitive } from '../primitive';

export interface SelectIconProps extends PrimitiveProps {}

withDefaults(defineProps<SelectIconProps>(), {
  as: 'span'
});
</script>

<template>
  <Primitive aria-hidden="true" :as :as-child>
    <slot>▼</slot>
  </Primitive>
</template>
