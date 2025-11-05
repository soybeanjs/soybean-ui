<script setup lang="ts" generic="T extends SingleOrMultipleValue, M extends boolean">
import { computed, shallowRef } from 'vue';
import { useSingleOrMultipleValue } from '../../composables';
import { transformPropsToContext } from '../../shared';
import type { SingleOrMultipleValue } from '../../types';
import { provideAccordionRootContext, useAccordionThemeContext } from './context';
import type { AccordionRootEmits, AccordionRootProps } from './types';

defineOptions({
  name: 'AccordionRoot'
});

const props = withDefaults(defineProps<AccordionRootProps<T, M>>(), {
  disabled: false,
  orientation: 'vertical',
  collapsible: false,
  unmountOnHide: true
});

const emit = defineEmits<AccordionRootEmits<T>>();

const themeContext = useAccordionThemeContext();

const cls = computed(() => themeContext?.ui?.value?.root);

const rootElement = shallowRef<HTMLElement>();

const { modelValue, isMultiple, onModelValueChange } = useSingleOrMultipleValue(props, value => {
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
    <slot :model-value="modelValue as T" />
  </div>
</template>
