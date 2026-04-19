<script setup lang="ts">
import { Primitive } from '../primitive';

import { useDateRangePickerRootContext, useDateRangePickerUi } from './context';
import type { DateRangePickerPopupProps } from './types';

defineOptions({
  name: 'DateRangePickerPopup'
});

const props = withDefaults(defineProps<DateRangePickerPopupProps>(), {
  as: 'div'
});

const cls = useDateRangePickerUi('popup');
const rootContext = useDateRangePickerRootContext('DateRangePickerPopup');
</script>

<template>
  <Primitive
    v-if="rootContext.open"
    :as="as"
    :as-child="asChild"
    :class="cls"
    data-slot="popup"
    role="dialog"
  >
    <slot />
  </Primitive>
</template>
