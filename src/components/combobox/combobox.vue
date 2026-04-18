<script setup lang="ts" generic="M extends boolean = false">
import { computed } from 'vue';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { ComboboxCompact, provideComboboxUi } from '@soybeanjs/headless';
import { keysOf } from '@soybeanjs/utils';
import { mergeSlotVariants } from '@/theme';
import { comboboxVariants } from './variants';
import type { ComboboxEmits, ComboboxProps, ComboboxSlots } from './types';

defineOptions({
  name: 'SCombobox'
});

const props = withDefaults(defineProps<ComboboxProps<M>>(), {
  open: undefined,
  clearable: true
});

const emit = defineEmits<ComboboxEmits<M>>();

const slots = defineSlots<ComboboxSlots<M>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const variants = comboboxVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { trigger: props.class });
});

provideComboboxUi(ui);
</script>

<template>
  <ComboboxCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <!-- @vue-expect-error ignore vue slot props type -->
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </ComboboxCompact>
</template>
