<script setup lang="ts" generic="T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData">
import { computed } from 'vue';
import { AutocompleteCompact, provideAutocompleteUi } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeSlotVariants } from '@/theme';
import { autocompleteVariants } from './variants';
import type {
  AutocompleteEmits,
  AutocompleteProps,
  AutocompleteSlots,
  AutocompleteSingleOptionData
} from './types';

defineOptions({
  name: 'SAutocomplete'
});

const props = withDefaults(defineProps<AutocompleteProps<T>>(), {
  modelValue: undefined,
  open: undefined,
  clearable: false,
  clearLabel: 'Clear input',
  emptyLabel: 'No results found.'
});

const emit = defineEmits<AutocompleteEmits<T>>();

const slots = defineSlots<AutocompleteSlots<T>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const variants = autocompleteVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideAutocompleteUi(ui);
</script>

<template>
  <AutocompleteCompact v-bind="forwardedProps" :items="items" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <!-- @vue-expect-error ignore vue slot props type -->
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </AutocompleteCompact>
</template>
