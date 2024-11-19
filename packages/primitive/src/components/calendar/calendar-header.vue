<script setup lang="ts">
import { Primitive } from '../primitive';
import type { CalendarHeaderPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarHeader'
});

const { class: className, as = 'div' } = defineProps<CalendarHeaderPropsWithPrimitive>();
</script>

<template>
  <Primitive :class="className" :as :as-child>
    <slot />
  </Primitive>
</template>
