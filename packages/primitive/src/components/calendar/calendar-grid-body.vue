<script setup lang="ts">
import { Primitive } from '../primitive';
import type { CalendarGridBodyPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarGridBody'
});

const { class: className, as = 'tbody' } = defineProps<CalendarGridBodyPropsWithPrimitive>();
</script>

<template>
  <Primitive :class="className" :as :as-child>
    <slot />
  </Primitive>
</template>
