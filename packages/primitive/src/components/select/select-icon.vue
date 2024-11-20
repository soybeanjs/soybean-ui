<script setup lang="ts">
import { Primitive } from '../primitive';
import type { SelectIconPropsWithPrimitive } from './types';

defineOptions({
  name: 'SelectIcon'
});

withDefaults(defineProps<SelectIconPropsWithPrimitive>(), {
  as: 'span'
});
</script>

<template>
  <Primitive aria-hidden="true" :as :as-child>
    <slot>▼</slot>
  </Primitive>
</template>
