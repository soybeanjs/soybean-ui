<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { injectCalendarRootContext } from './context';
import type { CalendarGridPropsWithPrimitive } from './types';

defineOptions({
  name: 'CalendarGrid'
});

const props = withDefaults(defineProps<CalendarGridPropsWithPrimitive>(), {
  as: 'table'
});

const { disabled, readonly } = injectCalendarRootContext();

const ariaReadonly = computed(() => (readonly.value ? true : undefined));
const ariaDisabled = computed(() => (disabled.value ? true : undefined));
const dataReadonly = computed(() => (readonly.value ? '' : undefined));
const dataDisabled = computed(() => (disabled.value ? '' : undefined));
</script>

<template>
  <Primitive
    :class="props.class"
    role="grid"
    :as="as"
    :as-child="asChild"
    tabindex="-1"
    :aria-disabled="ariaDisabled"
    :aria-readonly="ariaReadonly"
    :data-disabled="dataDisabled"
    :data-readonly="dataReadonly"
  >
    <slot />
  </Primitive>
</template>
