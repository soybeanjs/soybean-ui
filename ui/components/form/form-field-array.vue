<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { FormDescription, FormError, FormFieldArray, FormLabel, provideFormThemeContext, useField } from '@headless';
import { useOmitProps } from '@headless/composables';
import { mergeSlotVariants } from '@theme';
import { formVariants } from '@variants/form';
import { useFormContext } from './context';
import type { FormFieldArrayProps } from './types';

defineOptions({
  name: 'SFormFieldArray'
});

const props = defineProps<FormFieldArrayProps>();

const slots = useSlots();

const forwardedProps = useOmitProps(props, [
  'size',
  'ui',
  'label',
  'description',
  'labelProps',
  'descriptionProps',
  'errorProps'
]);

const formContext = useFormContext('FormFieldArray');

const { error } = useField(() => props.name);

const showError = computed(() => typeof error.value === 'string');

const size = computed(() => props.size ?? formContext.size.value);

const ui = computed(() => {
  const variants = formVariants({
    size: size.value,
    error: Boolean(error.value)
  });

  return mergeSlotVariants(variants, { ...formContext.ui.value, ...props.ui });
});

provideFormThemeContext({
  ui
});

const labelProps = computed(() => ({ ...formContext.labelProps.value, ...props.labelProps }));
const descriptionProps = computed(() => ({ ...formContext.descriptionProps.value, ...props.descriptionProps }));
const errorProps = computed(() => ({ ...formContext.errorProps.value, ...props.errorProps }));
</script>

<template>
  <FormFieldArray v-slot="slotProps" v-bind="forwardedProps">
    <FormLabel v-if="slots.label || label" v-bind="labelProps">
      <slot name="label" v-bind="slotProps">{{ label }}</slot>
    </FormLabel>
    <slot v-bind="slotProps" />
    <FormDescription v-if="slots.description || description" v-bind="descriptionProps">
      <slot name="description" v-bind="slotProps">{{ description }}</slot>
    </FormDescription>
    <FormError v-if="showError" v-bind="errorProps">{{ error }}</FormError>
  </FormFieldArray>
</template>
