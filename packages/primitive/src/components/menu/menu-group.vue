<script setup lang="ts">
import type { PrimitiveProps } from '../primitive';

import { Primitive } from '../primitive';

export interface MenuGroupProps extends PrimitiveProps {}

const props = defineProps<MenuGroupProps>();
</script>

<template>
  <Primitive role="group" v-bind="props">
    <slot />
  </Primitive>
</template>
