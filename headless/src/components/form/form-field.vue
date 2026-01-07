<script setup lang="ts">
import { computed } from 'vue';
import { provideFormFieldContext, useFormFieldUi } from './context';
import type { FormFieldProps } from './types';

defineOptions({
  name: 'FormField'
});

const props = defineProps<FormFieldProps>();

const cls = computed(() => (props.isFieldArray ? useFormFieldUi('field').value : useFormFieldUi('fieldArray').value));

const error = computed(() => props.error);

const { formFieldId, ariaDescribedBy, ariaInvalid } = provideFormFieldContext({ error });
</script>

<template>
  <div :id="isFieldArray ? formFieldId : undefined" :class="cls">
    <slot :form-field-id="formFieldId" :aria-described-by="ariaDescribedBy" :aria-invalid="ariaInvalid" />
  </div>
</template>
