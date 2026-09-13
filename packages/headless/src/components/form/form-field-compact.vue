<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '../../composables';
import { Slot } from '../slot';
import FormFieldBaseCompact from './form-field-base-compact.vue';
import type { FormFieldCompactProps, FormFieldCompactSlots } from './types';
import { useFormSub } from './use-form';

defineOptions({
  name: 'FormFieldCompact'
});

const props = defineProps<FormFieldCompactProps<any, any>>();

const slots = defineSlots<FormFieldCompactSlots<any, any>>();

const { useField } = useFormSub();

const forwardedProps = useOmitProps(props, ['name', 'validate', 'reset']);

const state = useField(props.name, {
  validate: props.validate,
  reset: props.reset
});

const error = computed(() => state.value.meta.error);
</script>

<template>
  <FormFieldBaseCompact data-soybean-form-field v-bind="forwardedProps" :error="error">
    <template #label>
      <slot v-if="slots.label || label" name="label" v-bind="state" />
    </template>
    <template #default="slotProps">
      <Slot
        :id="slotProps.formFieldId"
        :aria-describedby="slotProps.ariaDescribedBy"
        :aria-invalid="slotProps.ariaInvalid"
        :name="name"
        :model-value="state.value"
        @update:model-value="state.handleChange"
        @blur="state.onBlur"
      >
        <slot v-bind="state" />
      </Slot>
    </template>
    <template #description>
      <slot v-if="slots.description || description" name="description" v-bind="state" />
    </template>
    <template v-if="slots.error" #error="errorScope">
      <slot name="error" v-bind="errorScope" />
    </template>
  </FormFieldBaseCompact>
</template>
