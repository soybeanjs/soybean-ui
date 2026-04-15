<script setup lang="ts" generic="M extends boolean = false">
import { shallowRef } from 'vue';
import { useSelection } from '../../composables';
import { transformPropsToContext } from '../../shared';
import { useDirection } from '../config-provider/context';
import { provideAccordionRootContext, useAccordionUi } from './context';
import type { AccordionRootEmits, AccordionRootProps } from './types';

defineOptions({
  name: 'AccordionRoot'
});

const props = withDefaults(defineProps<AccordionRootProps<M>>(), {
  disabled: false,
  orientation: 'vertical',
  collapsible: false,
  unmountOnHide: true
});

const emit = defineEmits<AccordionRootEmits<M>>();

const cls = useAccordionUi('root');

const rootElement = shallowRef<HTMLElement>();

const dir = useDirection(() => props.dir);

const { modelValue, isMultiple, onModelValueChange } = useSelection(props, value => {
  emit('update:modelValue', value);
});

provideAccordionRootContext({
  dir,
  rootElement,
  modelValue,
  isMultiple,
  onModelValueChange,
  ...transformPropsToContext(props, ['collapsible', 'disabled', 'orientation', 'unmountOnHide'])
});
</script>

<template>
  <div ref="rootElement" :class="cls" :dir="dir" data-slot="root">
    <slot :model-value="modelValue" />
  </div>
</template>
