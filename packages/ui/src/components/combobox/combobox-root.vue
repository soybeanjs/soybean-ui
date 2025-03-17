<script setup lang="ts" generic="T extends AcceptableValue = AcceptableValue">
import { ComboboxRoot, useForwardPropsEmits } from '@soybean-ui/primitives';
import type { AcceptableValue } from '@soybean-ui/primitives';
import type { ComboboxRootEmits, ComboboxRootProps } from './types';

defineOptions({
  name: 'SComboboxRoot'
});

const props = defineProps<ComboboxRootProps<T>>();

const emit = defineEmits<ComboboxRootEmits<T>>();

const forwarded = useForwardPropsEmits(props, emit);
</script>

<template>
  <ComboboxRoot v-bind="forwarded">
    <slot />
  </ComboboxRoot>
</template>
