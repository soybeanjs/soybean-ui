<script setup lang="ts">
import { FieldArray } from 'vee-validate';
import { useForwardProps } from '@soybean-ui/primitive';
import SFormField from './form-filed.vue';
import type { FormFieldArrayProps } from './types';

defineOptions({
  name: 'SFormFieldArray'
});

const props = defineProps<FormFieldArrayProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <SFormField v-bind="forwardedProps">
    <template #label>
      <slot name="label" />
    </template>
    <template #default="slotProps">
      <FieldArray v-slot="arraySlotProps" :name="name">
        <slot v-bind="{ ...slotProps, ...arraySlotProps }" />
      </FieldArray>
    </template>
  </SFormField>
</template>
