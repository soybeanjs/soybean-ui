<script setup lang="ts">
import { computed } from 'vue';
import { Label } from '../label';
import { useFormFieldContext, useFormUi, useFormFieldUi } from './context';
import { mergeClasses } from './shared';
import type { FormLabelProps } from './types';

defineOptions({
  name: 'FormLabel'
});

defineProps<FormLabelProps>();

const { formFieldId } = useFormFieldContext('FormLabel');

const formCls = useFormUi('label');
const fieldCls = useFormFieldUi('label');

const cls = computed(() => mergeClasses(formCls.value, fieldCls.value));
</script>

<template>
  <Label :for="formFieldId" :class="cls">
    <slot />
  </Label>
</template>
