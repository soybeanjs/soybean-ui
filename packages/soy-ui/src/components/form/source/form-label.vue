<script setup lang="ts">
import { computed } from 'vue';
import { cn, formVariants } from '@soybean-ui/variants';
import SLabel from '../../label/source/label.vue';
import { useFormField } from '../hooks';
import type { FormLabelProps } from '../types';

defineOptions({
  name: 'SFormLabel'
});

const { class: cls, size } = defineProps<FormLabelProps>();

const { error, formItemId } = useFormField();

const mergedCls = computed(() => {
  const { label } = formVariants({ size, error: Boolean(error.value) });

  return cn(label(), cls);
});
</script>

<template>
  <SLabel :for="formItemId" :class="mergedCls" :size="size">
    <slot>{{ label }}</slot>
  </SLabel>
</template>
