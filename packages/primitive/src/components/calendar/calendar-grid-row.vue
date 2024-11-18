<script setup lang="ts">
import { Primitive } from '../primitive';
import type { CalendarGridRowPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarGridRow'
});

const { class: className, as = 'tr' } = defineProps<CalendarGridRowPropsWithPrimitive>();
</script>

<template>
  <Primitive :class="className" :as :as-child>
    <slot />
  </Primitive>
</template>
