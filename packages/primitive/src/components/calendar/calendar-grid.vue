<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { injectCalendarRootContext } from './context';
import type { CalendarGridPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarGrid'
});

const { class: className, as = 'table' } = defineProps<CalendarGridPropsWithPrimitive>();

const { disabled, readonly } = injectCalendarRootContext();

const ariaReadonly = computed(() => (readonly.value ? true : undefined));
const ariaDisabled = computed(() => (disabled.value ? true : undefined));
const dataReadonly = computed(() => (readonly.value ? '' : undefined));
const dataDisabled = computed(() => (disabled.value ? '' : undefined));
</script>

<template>
  <Primitive
    :class="className"
    role="grid"
    :as
    :as-child
    tabindex="-1"
    :aria-readonly
    :aria-disabled
    :data-readonly
    :data-disabled
  >
    <slot />
  </Primitive>
</template>
