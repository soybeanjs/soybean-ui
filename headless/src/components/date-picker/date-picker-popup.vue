<script setup lang="ts">
import { Primitive } from '../primitive';

import { useDatePickerRootContext, useDatePickerUi } from './context';
import type { DatePickerPopupProps } from './types';

defineOptions({
  name: 'DatePickerPopup'
});

withDefaults(defineProps<DatePickerPopupProps>(), {
  as: 'div'
});

const cls = useDatePickerUi('popup');
const rootContext = useDatePickerRootContext('DatePickerPopup');
</script>

<template>
  <Primitive
    v-if="rootContext.open.value"
    :as="as"
    :as-child="asChild"
    aria-label="Date picker"
    :class="cls"
    data-slot="popup"
    role="dialog"
  >
    <slot />
  </Primitive>
</template>
