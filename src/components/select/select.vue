<script setup lang="ts" generic="T extends DefinedValue, M extends boolean = false">
import { computed } from 'vue';
import { SelectCompact, provideSelectUi } from '@soybeanjs/headless';
import type { DefinedValue } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeSlotVariants } from '@/theme';
import { selectVariants } from './variants';
import type { SelectEmits, SelectProps, SelectSlots } from './types';

defineOptions({
  name: 'SSelect',
  inheritAttrs: false
});

const props = withDefaults(defineProps<SelectProps<T, M>>(), {
  open: undefined,
  clearable: true
});

const emit = defineEmits<SelectEmits<T, M>>();

const slots = defineSlots<SelectSlots<T, M>>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'size']);

const listeners = useForwardListeners(emit);
const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const variants = selectVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { trigger: props.class });
});

provideSelectUi(ui);
</script>

<template>
  <SelectCompact v-bind="forwardedProps" :items="items" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <!-- @vue-ignore ignore vue slot props type -->
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </SelectCompact>
</template>
