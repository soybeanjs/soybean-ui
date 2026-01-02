<script setup lang="ts" generic="M extends boolean = false">
import { computed, shallowRef } from 'vue';
import { useSelection } from '../../composables';
import { transformPropsToContext } from '../../shared';
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

const ui = useAccordionUi();

const cls = computed(() => ui?.value?.root);

const rootElement = shallowRef<HTMLElement>();

const { modelValue, isMultiple, onModelValueChange } = useSelection(props, value => {
  emit('update:modelValue', value);
});

provideAccordionRootContext({
  rootElement,
  modelValue,
  isMultiple,
  onModelValueChange,
  ...transformPropsToContext(props, ['collapsible', 'disabled', 'orientation', 'dir', 'unmountOnHide'])
});
</script>

<template>
  <div ref="rootElement" :class="cls">
    <slot :model-value="modelValue" />
  </div>
</template>
