<script setup lang="ts">
import { Label } from '../label';
import { useFormFieldContext, useFormFieldUi } from './context';
import type { FormLabelProps } from './types';

defineOptions({
  name: 'FormLabel'
});

defineProps<FormLabelProps>();

const { formFieldId } = useFormFieldContext('FormLabel');

const cls = useFormFieldUi('label');
</script>

<template>
  <Label :for="formFieldId" :class="cls">
    <slot />
  </Label>
</template>
