<script setup lang="ts">
import { Primitive } from '../primitive';
import { useDateRangePickerRootContext, useDateRangePickerUi } from './context';
import type { DateRangePickerPopupProps } from './types';

defineOptions({
  name: 'DateRangePickerPopup'
});

withDefaults(defineProps<DateRangePickerPopupProps>(), {
  as: 'div'
});

const cls = useDateRangePickerUi('popup');
const { open } = useDateRangePickerRootContext('DateRangePickerPopup');
</script>

<template>
  <Primitive
    v-if="open"
    :as="as"
    :as-child="asChild"
    aria-label="Date range picker"
    :class="cls"
    data-slot="popup"
    role="dialog"
  >
    <slot />
  </Primitive>
</template>
