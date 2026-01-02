<script setup lang="ts">
import { computed, useSlots } from 'vue';
import { FormDescription, FormError, FormField, FormLabel, Slot, provideFormFieldUi } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { useField } from '@soybeanjs/headless/forms';
import { vAutoAnimate } from '@formkit/auto-animate';
import { mergeSlotVariants } from '@/theme';
import { formVariants } from '@/variants/form';
import { useFormContext } from './context';
import type { FormFieldProps } from './types';

defineOptions({
  name: 'SFormField'
});

const props = defineProps<FormFieldProps>();

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

const { error } = useField(() => props.name);

const size = computed(() => props.size ?? formContext.size.value);

const ui = computed(() => {
  const variants = formVariants({
    size: size.value,
    error: Boolean(error.value)
  });

  return mergeSlotVariants(variants, formContext.ui.value, props.ui, { field: props.class });
});

const labelProps = computed(() => ({ ...formContext.labelProps.value, ...props.labelProps }));
const descriptionProps = computed(() => ({ ...formContext.descriptionProps.value, ...props.descriptionProps }));
const errorProps = computed(() => ({ ...formContext.errorProps.value, ...props.errorProps }));

provideFormFieldUi(ui);
</script>

<template>
  <FormField
    v-slot="{ modelValue, updateModelValue, attrs, dirty, touched, ariaDescribedBy, ariaInvalid }"
    v-auto-animate
    v-bind="forwardedProps"
  >
    <FormLabel v-if="slots.label || label" v-bind="labelProps">
      <slot name="label">{{ label }}</slot>
    </FormLabel>
    <Slot
      :size="size"
      :model-value="modelValue"
      :aria-described-by="ariaDescribedBy"
      :aria-invalid="ariaInvalid"
      @update:model-value="updateModelValue"
      @change="attrs.onChange"
      @input="attrs.onInput"
      @blur="attrs.onBlur"
    >
      <slot :dirty="dirty" :error="error" :touched="touched" />
    </Slot>
    <FormDescription v-if="slots.description || description" v-bind="descriptionProps">
      <slot name="description">{{ description }}</slot>
    </FormDescription>
    <FormError v-if="error" v-bind="errorProps">{{ error }}</FormError>
  </FormField>
</template>
