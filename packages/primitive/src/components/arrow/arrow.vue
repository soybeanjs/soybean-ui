<script setup lang="ts">
import { Primitive } from '../primitive';
import type { ArrowPropsWithPrimitive } from './types';

defineOptions({
  name: 'Arrow'
});

const props = withDefaults(defineProps<ArrowPropsWithPrimitive>(), {
  as: 'svg',
  width: 10,
  height: 5
});
</script>

<template>
  <Primitive
    :class="props.class"
    :as="as"
    :as-child="asChild"
    :width="width"
    :height="height"
    :view-box="asChild ? undefined : '0 0 12 6'"
  >
    <slot>
      <path v-if="!rounded" d="M0 0L6 6L12 0" />
      <path v-else d="M0 0L4.58579 4.58579C5.36683 5.36683 6.63316 5.36684 7.41421 4.58579L12 0" />
    </slot>
  </Primitive>
</template>
