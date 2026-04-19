<script setup lang="ts">
import { Primitive } from '../primitive';

import { useYearRangePickerRootContext, useYearRangePickerUi } from './context';
import type { YearRangePickerTriggerProps } from './types';

defineOptions({
  name: 'YearRangePickerTrigger'
});

withDefaults(defineProps<YearRangePickerTriggerProps>(), {
  as: 'button'
});

const cls = useYearRangePickerUi('trigger');
const rootContext = useYearRangePickerRootContext('YearRangePickerTrigger');

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
    :aria-controls="rootContext.popupId"
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
