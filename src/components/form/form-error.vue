<script setup lang="ts">
import { computed } from 'vue';
import { useFormFieldContext, useFormThemeContext } from './context';
import type { FormErrorProps } from './types';

defineOptions({
  name: 'FormError'
});

defineProps<FormErrorProps>();

const { formErrorId } = useFormFieldContext('FormError');

const themeContext = useFormThemeContext();

const cls = computed(() => themeContext?.ui?.value?.error);
</script>

<template>
  <p :id="formErrorId" :class="cls">
    <slot />
  </p>
</template>
