<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '../primitive';
import { useComboboxRootContext, useComboboxUi } from './context';
import type { ComboboxCancelProps } from './types';

defineOptions({
  name: 'ComboboxCancel'
});

const props = withDefaults(defineProps<ComboboxCancelProps>(), {
  as: 'button'
});

const cls = useComboboxUi('cancel');

const { inputElement, filterSearch, resetModelValueOnClear, resetModelValue } =
  useComboboxRootContext('ComboboxCancel');

const tag = computed(() => (props.as === 'button' ? 'button' : undefined));

const onClick = () => {
  filterSearch.value = '';

  if (inputElement.value) {
    inputElement.value.value = '';
    inputElement.value.focus();
  }

  if (resetModelValueOnClear.value) {
    resetModelValue();
  }
};
</script>

<template>
  <Primitive :as="as" :as-child="asChild" :class="cls" :type="tag" tabindex="-1" data-slot="cancel" @click="onClick">
    <slot />
  </Primitive>
</template>
