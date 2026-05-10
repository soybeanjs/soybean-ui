<script setup lang="ts" generic="T extends AutocompleteSingleOptionData = AutocompleteSingleOptionData">
import { computed } from 'vue';
import { AutocompleteCompact, provideAutocompleteUi } from '@soybeanjs/headless/autocomplete';
import type { AutocompleteSingleOptionData } from '@soybeanjs/headless/autocomplete';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants } from '@/theme';
import { autocompleteVariants } from './variants';
import type { AutocompleteEmits, AutocompleteProps, AutocompleteSlots } from './types';

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

  return mergeVariants(variants, props.ui, { root: props.class });
});

provideAutocompleteUi(ui);
</script>

<template>
  <AutocompleteCompact v-bind="forwardedProps" :items="items" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <!-- @vue-ignore ignore vue slot props type -->
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </AutocompleteCompact>
</template>
