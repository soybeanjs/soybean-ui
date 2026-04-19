<script setup lang="ts">
import { Primitive } from '../primitive';

import { useDatePickerRootContext, useDatePickerUi } from './context';
import type { DatePickerTriggerProps } from './types';

defineOptions({
  name: 'DatePickerTrigger'
});

withDefaults(defineProps<DatePickerTriggerProps>(), {
  as: 'button'
});

const cls = useDatePickerUi('trigger');
const rootContext = useDatePickerRootContext('DatePickerTrigger');

const handleClick = () => {
  if (rootContext.disabled.value || rootContext.readonly.value) {
    return;
  }

  rootContext.setOpen(!rootContext.open.value);
};
</script>

<template>
  <Primitive
    :as="as"
    :as-child="asChild"
    :aria-disabled="rootContext.disabled.value ? true : undefined"
    :aria-expanded="rootContext.open.value ? true : false"
    :class="cls"
    :data-disabled="rootContext.disabled.value ? '' : undefined"
    :data-state="rootContext.open.value ? 'open' : 'closed'"
    data-slot="trigger"
    type="button"
    @click="handleClick"
  >
    <slot />
  </Primitive>
</template>
