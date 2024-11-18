<script setup lang="ts">
import type { PrimitiveProps } from '../primitive';

import { Primitive } from '../primitive';
import { useForwardExpose, useId } from '../../composables';
import { injectComboboxGroupContext } from './combobox-group.vue';

export interface ComboboxLabelProps extends PrimitiveProps {
  for?: string;
}

const props = withDefaults(defineProps<ComboboxLabelProps>(), {
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
