<script setup lang="ts">
import { computed } from 'vue';
import { useFormFieldContext, useFormThemeContext } from './context';
import type { FormDescriptionProps } from './types';

defineOptions({
  name: 'FormDescription'
});

defineProps<FormDescriptionProps>();

const { formDescriptionId } = useFormFieldContext('FormDescription');

const themeContext = useFormThemeContext();

const cls = computed(() => themeContext?.ui?.value?.description);
</script>

<template>
  <p :id="formDescriptionId" :class="cls">
    <slot />
  </p>
</template>
