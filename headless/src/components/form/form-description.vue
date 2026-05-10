<script setup lang="ts">
import { computed } from 'vue';
import { useFormFieldContext, useFormUi, useFormFieldUi } from './context';
import { mergeClasses } from './shared';
import type { FormDescriptionProps } from './types';

defineOptions({
  name: 'FormDescription'
});

defineProps<FormDescriptionProps>();

const { formDescriptionId } = useFormFieldContext('FormDescription');

const formCls = useFormUi('description');
const fieldCls = useFormFieldUi('description');

const cls = computed(() => mergeClasses(formCls.value, fieldCls.value));
</script>

<template>
  <p :id="formDescriptionId" data-soybean-form-description :class="cls">
    <slot />
  </p>
</template>
