<script setup lang="ts">
import { computed } from 'vue';
import { useField } from '../../forms/core';
import { provideFormFieldContext, useFormFieldUi } from './context';
import type { FormFieldProps } from './types';

defineOptions({
  name: 'FormField'
});

const props = defineProps<FormFieldProps>();

const cls = useFormFieldUi('field');

const { value: modelValue, attrs, dirty, error, touched } = useField(() => props.name);

const { formFieldId, formDescriptionId, formErrorId } = provideFormFieldContext();

const ariaDescribedBy = computed(() => (error.value ? `${formDescriptionId} ${formErrorId}` : formDescriptionId));

const ariaInvalid = computed(() => Boolean(error.value));

function updateModelValue(val: any) {
  modelValue.value = val;
}
</script>

<template>
  <div :class="cls">
    <slot
      :model-value="modelValue"
      :attrs="attrs"
      :dirty="dirty"
      :error="error"
      :touched="touched"
      :form-field-id="formFieldId"
      :form-description-id="formDescriptionId"
      :form-error-id="formErrorId"
      :aria-described-by="ariaDescribedBy"
      :aria-invalid="ariaInvalid"
      :update-model-value="updateModelValue"
    />
  </div>
</template>
