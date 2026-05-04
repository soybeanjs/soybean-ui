<script setup lang="ts">
import { computed, useSlots, mergeProps } from 'vue';
import { vAutoAnimate } from '@formkit/auto-animate/vue';
import { useOmitProps } from '../../composables';
import { useFormCompactContext } from './context';
import FormField from './form-field.vue';
import FormLabel from './form-label.vue';
import FormControl from './form-control.vue';
import FormDescription from './form-description.vue';
import FormError from './form-error.vue';
import type { FormFieldBaseCompactProps } from './types';

defineOptions({
  name: 'FormFieldBaseCompact'
});

const props = defineProps<FormFieldBaseCompactProps>();

const slots = useSlots();

const forwardedProps = useOmitProps(props, [
  'orientation',
  'label',
  'description',
  'error',
  'labelProps',
  'controlProps',
  'descriptionProps',
  'errorProps'
]);

const context = useFormCompactContext('FormFieldCompact');

const orientation = computed(() => props.orientation ?? context.orientation.value ?? 'vertical');

const fieldProps = computed(() => {
  const p = props.isFieldArray ? context.fieldArrayProps.value : context.fieldProps.value;

  return mergeProps({ ...p }, forwardedProps.value);
});
const labelProps = computed(() => mergeProps({ ...context.labelProps.value }, { ...props.labelProps }));
const controlProps = computed(() => mergeProps({ ...context.controlProps.value }, { ...props.controlProps }));
const descriptionProps = computed(() =>
  mergeProps({ ...context.descriptionProps.value }, { ...props.descriptionProps })
);
const errorProps = computed(() => mergeProps({ ...context.errorProps.value }, { ...props.errorProps }));
</script>

<template>
  <FormField
    v-slot="slotProps"
    v-bind="fieldProps"
    :data-orientation="orientation"
    :data-error="error ? '' : undefined"
  >
    <FormLabel v-if="slots.label || label" v-bind="labelProps">
      <slot name="label">{{ label }}</slot>
    </FormLabel>
    <FormControl v-auto-animate v-bind="controlProps">
      <slot v-bind="slotProps" />
      <FormError v-if="error" v-bind="errorProps">{{ error }}</FormError>
    </FormControl>
    <FormDescription v-if="slots.description || description" v-bind="descriptionProps">
      <slot name="description">{{ description }}</slot>
    </FormDescription>
  </FormField>
</template>
