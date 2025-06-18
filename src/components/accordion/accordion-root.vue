<script
  setup
  lang="ts"
  generic="T extends AcceptableValue | NonNullable<AcceptableValue>[], S extends SingleOrMultipleType"
>
import { computed, shallowRef } from 'vue';
import { useOmitProps, useSingleOrMultipleValue } from '../../composables';
import { transformPropsToContext } from '../../shared';
import type { AcceptableValue, SingleOrMultipleType } from '../../types';
import { provideAccordionRootContext, useAccordionThemeContext } from './context';
import type { AccordionRootEmits, AccordionRootProps } from './types';

defineOptions({
  name: 'AccordionRoot'
});

const props = withDefaults(defineProps<AccordionRootProps<T, S>>(), {
  disabled: false,
  orientation: 'vertical',
  collapsible: false,
  unmountOnHide: true
});

const emit = defineEmits<AccordionRootEmits>();

const forwardedProps = useOmitProps(props, ['class', 'collapsible', 'disabled', 'orientation', 'unmountOnHide']);

const themeContext = useAccordionThemeContext();

const cls = computed(() => [themeContext?.ui?.value?.root, props.class]);

const rootElement = shallowRef<HTMLElement>();

const { modelValue, isSingle, toggleModelValue } = useSingleOrMultipleValue(props, value => {
  emit('update:modelValue', value);
});

provideAccordionRootContext({
  rootElement,
  modelValue,
  isSingle,
  toggleModelValue,
  ...transformPropsToContext(props, ['collapsible', 'disabled', 'orientation', 'dir', 'unmountOnHide'])
});
</script>

<template>
  <div v-bind="forwardedProps" ref="rootElement" :class="cls">
    <slot :model-value="modelValue as T" />
  </div>
</template>
