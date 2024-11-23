<script setup lang="ts">
import { Primitive } from '../primitive';
import { useForwardExpose, useId } from '../../composables';
import { injectComboboxGroupContext } from './context';
import type { ComboboxLabelPropsWithPrimitive } from './types';

const props = withDefaults(defineProps<ComboboxLabelPropsWithPrimitive>(), {
  as: 'div'
});

const groupContext = injectComboboxGroupContext({ id: '', labelId: '' });
groupContext.labelId ||= useId(undefined, 'soybean-combobox-group-label');

useForwardExpose();
</script>

<template>
  <Primitive v-bind="props" :id="groupContext.labelId">
    <slot />
  </Primitive>
</template>
