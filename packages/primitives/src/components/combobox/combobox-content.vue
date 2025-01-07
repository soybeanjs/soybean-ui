<script setup lang="ts">
import { Presence } from '../presence';
import { useForwardExpose, useForwardPropsEmits, useId } from '../../composables';
import { injectComboboxRootContext } from './context';
import ComboboxContentImpl from './combobox-content-impl.vue';
import type { ComboboxContentEmits, ComboboxContentPropsWithPrimitive } from './types';

defineOptions({
  name: 'ComboboxContent',
  inheritAttrs: false
});

const props = defineProps<ComboboxContentPropsWithPrimitive>();

const emit = defineEmits<ComboboxContentEmits>();

const forwarded = useForwardPropsEmits(props, emit);

const { forwardRef } = useForwardExpose();

const rootContext = injectComboboxRootContext();

rootContext.contentId ||= useId(undefined, 'soybean-combobox-content');
</script>

<template>
  <Presence :present="forceMount || rootContext.open.value">
    <ComboboxContentImpl v-bind="{ ...forwarded, ...$attrs }" :ref="forwardRef">
      <slot />
    </ComboboxContentImpl>
  </Presence>
</template>
