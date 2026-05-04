<script setup lang="ts">
import { computed } from 'vue';
import { provideFormFieldContext, useFormUi, useFormFieldUi } from './context';
import { mergeClasses } from './shared';
import type { FormFieldProps } from './types';

defineOptions({
  name: 'FormField'
});

const props = defineProps<FormFieldProps>();

const fieldType = props.isFieldArray ? 'fieldArray' : 'field';

const formCls = useFormUi(fieldType);
const fieldCls = useFormFieldUi(fieldType);

const cls = computed(() => mergeClasses(formCls.value, fieldCls.value));

const error = computed(() => props.error);

const { formFieldId, ariaDescribedBy, ariaInvalid } = provideFormFieldContext({ error });
</script>

<template>
  <div :id="isFieldArray ? formFieldId : undefined" :class="cls" :data-field-type="isFieldArray ? 'array' : 'field'">
    <slot :form-field-id="formFieldId" :aria-described-by="ariaDescribedBy" :aria-invalid="ariaInvalid" />
  </div>
</template>
