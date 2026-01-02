<script setup lang="ts">
import { useField, useFieldArray } from '../../forms/core';
import { provideFormFieldContext, useFormFieldUi } from './context';
import type { FormFieldArrayProps } from './types';

defineOptions({
  name: 'FormFieldArray'
});

const props = defineProps<FormFieldArrayProps>();

const cls = useFormFieldUi('fieldArray');

const { dirty, error, touched } = useField(() => props.name);

const { fields, ...methods } = useFieldArray(() => props.name);

const { formFieldId, formDescriptionId, formErrorId } = provideFormFieldContext();
</script>

<template>
  <div :class="cls">
    <slot
      v-bind="methods"
      :fields="fields"
      :dirty="dirty"
      :error="error"
      :touched="touched"
      :form-field-id="formFieldId"
      :form-description-id="formDescriptionId"
      :form-error-id="formErrorId"
    />
  </div>
</template>
