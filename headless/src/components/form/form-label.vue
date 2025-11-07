<script setup lang="ts">
import { computed } from 'vue';
import { Label } from '../label';
import { useFormFieldContext, useFormThemeContext } from './context';
import type { FormLabelProps } from './types';

defineOptions({
  name: 'FormLabel'
});

defineProps<FormLabelProps>();

const { formFieldId } = useFormFieldContext('FormLabel');

const themeContext = useFormThemeContext();

const cls = computed(() => themeContext?.ui?.value?.label);
</script>

<template>
  <Label :for="formFieldId" :class="cls">
    <slot />
  </Label>
</template>
