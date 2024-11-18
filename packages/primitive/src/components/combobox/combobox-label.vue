<script setup lang="ts">
import Primitive from '../primitive/primitive';
import { useForwardExpose, useId } from '../../composables';
import { injectComboboxGroupContext } from './context';
import type { ComboboxLabelPropsWithPrimitive } from './types';

const props = withDefaults(defineProps<ComboboxLabelPropsWithPrimitive>(), {
  as: 'div'
});

useForwardExpose();
const groupContext = injectComboboxGroupContext({ id: '', labelId: '' });

groupContext.labelId ||= useId(undefined, 'soybean-combobox-group-label');
</script>

<template>
  <Primitive v-bind="props" :id="groupContext.labelId">
    <slot />
  </Primitive>
</template>
