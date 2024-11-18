<script setup lang="ts">
import Primitive from '../primitive/primitive';
import type { CalendarGridHeadPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarGridHead'
});

const { class: className, as = 'thead' } = defineProps<CalendarGridHeadPropsWithPrimitive>();
</script>

<template>
  <Primitive :class="className" :as :as-child aria-hidden="true">
    <slot />
  </Primitive>
</template>
