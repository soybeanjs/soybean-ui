<script setup lang="ts">
import { computed } from 'vue';
import { vAutoAnimate } from '@formkit/auto-animate';
import { useField, useFieldArray } from '../../form/core';
import { provideFormFieldContext, useFormThemeContext } from './context';
import type { FormFieldArrayProps } from './types';

defineOptions({
  name: 'FormFieldArray'
});

const props = defineProps<FormFieldArrayProps>();

const themeContext = useFormThemeContext();

const cls = computed(() => themeContext?.ui?.value?.field);

const { dirty, error, touched } = useField(() => props.name);

const { fields, ...methods } = useFieldArray(() => props.name);

const { formFieldId, formDescriptionId, formErrorId } = provideFormFieldContext();
</script>

<template>
  <div v-auto-animate :class="cls">
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
