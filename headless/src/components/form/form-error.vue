<script setup lang="ts">
import { computed } from 'vue';
import { useFormFieldContext, useFormUi, useFormFieldUi } from './context';
import { mergeClasses } from './shared';
import type { FormErrorProps } from './types';

defineOptions({
  name: 'FormError'
});

defineProps<FormErrorProps>();

const { formErrorId } = useFormFieldContext('FormError');

const formCls = useFormUi('error');
const fieldCls = useFormFieldUi('error');

const cls = computed(() => mergeClasses(formCls.value, fieldCls.value));
</script>

<template>
  <p :id="formErrorId" :class="cls">
    <slot />
  </p>
</template>
