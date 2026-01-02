<script setup lang="ts">
import { useFormFieldContext, useFormFieldUi } from './context';
import type { FormErrorProps } from './types';

defineOptions({
  name: 'FormError'
});

defineProps<FormErrorProps>();

const { formErrorId } = useFormFieldContext('FormError');

const cls = useFormFieldUi('error');
</script>

<template>
  <p :id="formErrorId" :class="cls">
    <slot />
  </p>
</template>
