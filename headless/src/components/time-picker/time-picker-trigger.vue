<script setup lang="ts">
import { Primitive } from '../primitive';

import { useTimePickerRootContext, useTimePickerUi } from './context';
import type { TimePickerTriggerProps } from './types';

defineOptions({
  name: 'TimePickerTrigger'
});

withDefaults(defineProps<TimePickerTriggerProps>(), {
  as: 'button'
});

const cls = useTimePickerUi('trigger');
const rootContext = useTimePickerRootContext('TimePickerTrigger');

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
