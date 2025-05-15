<script setup lang="ts">
import { useForwardProps } from '@soybean-ui/primitives';
import { FieldArray } from 'vee-validate';
import type { FormFieldArrayProps } from '../types';
import SFormField from './form-filed.vue';

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
