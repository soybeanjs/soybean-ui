<script setup lang="ts">
import Primitive from '../primitive/primitive';
import type { CalendarHeadCellPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarHeadCell'
});

const { class: className, as = 'th' } = defineProps<CalendarHeadCellPropsWithPrimitive>();
</script>

<template>
  <Primitive :class="className" :as :as-child>
    <slot />
  </Primitive>
</template>
