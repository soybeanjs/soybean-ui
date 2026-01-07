<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { FormDescription, FormError, FormField, FormLabel, provideFormFieldUi } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { vAutoAnimate } from '@formkit/auto-animate';
import { mergeSlotVariants } from '@/theme';
import { formVariants } from '@/variants/form';
import { useFormContext } from './context';
import type { FormFieldBaseProps } from './types';

defineOptions({
  name: 'SFormFieldBase'
});

const props = defineProps<FormFieldBaseProps>();

const slots = useSlots();

const forwardedProps = useOmitProps(props, [
  'class',
  'size',
  'ui',
  'label',
  'description',
  'labelProps',
  'descriptionProps',
  'errorProps'
]);

const formContext = useFormContext('FormField');

const size = computed(() => props.size ?? formContext.size.value);

const ui = computed(() => {
  const variants = formVariants({
    size: size.value
  });

  return mergeSlotVariants(variants, formContext.ui.value, props.ui, {
    field: props.isFieldArray ? undefined : props.class,
    fieldArray: props.isFieldArray ? props.class : undefined
  });
});

const labelProps = computed(() => ({ ...formContext.labelProps.value, ...props.labelProps }));
const descriptionProps = computed(() => ({ ...formContext.descriptionProps.value, ...props.descriptionProps }));
const errorProps = computed(() => ({ ...formContext.errorProps.value, ...props.errorProps }));

provideFormFieldUi(ui);
</script>

<template>
  <FormField v-slot="slotProps" v-auto-animate v-bind="forwardedProps">
    <FormLabel v-if="slots.label || label" v-bind="labelProps">
      <slot name="label">{{ label }}</slot>
    </FormLabel>
    <slot v-bind="slotProps" />
    <FormDescription v-if="slots.description || description" v-bind="descriptionProps">
      <slot name="description">{{ description }}</slot>
    </FormDescription>
    <FormError v-if="error" v-bind="errorProps">{{ error }}</FormError>
  </FormField>
</template>
