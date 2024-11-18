<script setup lang="ts">
import type { PrimitiveProps } from '../primitive/types';

import Primitive from '../primitive/primitive';

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
