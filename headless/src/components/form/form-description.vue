<script setup lang="ts">
import { useFormFieldContext, useFormFieldUi } from './context';
import type { FormDescriptionProps } from './types';

defineOptions({
  name: 'FormDescription'
});

defineProps<FormDescriptionProps>();

const { formDescriptionId } = useFormFieldContext('FormDescription');

const cls = useFormFieldUi('description');
</script>

<template>
  <p :id="formDescriptionId" :class="cls">
    <slot />
  </p>
</template>
