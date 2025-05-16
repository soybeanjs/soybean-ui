<script setup lang="ts">
import { computed, toValue } from 'vue';
import { cn, formVariants } from '@soybean-ui/variants';
import { ErrorMessage } from 'vee-validate';
import { useFormField } from '../hooks';
import type { FormMessageProps } from '../types';

defineOptions({
  name: 'SFormMessage'
});

const { class: cls } = defineProps<FormMessageProps>();

const { name, formMessageId } = useFormField();

const { message } = formVariants();

const mergedCls = computed(() => cn(message(), cls));
</script>

<template>
  <ErrorMessage :id="formMessageId" as="p" :name="toValue(name)" :class="mergedCls" />
</template>
