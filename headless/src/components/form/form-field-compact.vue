<script setup lang="ts">
import { computed } from 'vue';
import { Slot } from '../slot';
import { useFormSub } from './use-form';
import FormFieldBaseCompact from './form-field-base-compact.vue';
import type { FormFieldCompactProps, FormFieldCompactSlots } from './types';

defineOptions({
  name: 'FormFieldCompact'
});

const props = defineProps<FormFieldCompactProps<any, any>>();

const slots = defineSlots<FormFieldCompactSlots<any, any>>();

const { useField, setFieldValue } = useFormSub();

const state = useField(props.name, {
  validate: props.validate,
  reset: props.reset
});

const error = computed(() => state.value.meta.error);

function handleUpdateModelValue(value: unknown) {
  setFieldValue(props.name, value);
}
</script>

<template>
  <FormFieldBaseCompact data-soybean-form-field v-bind="props" :error="error">
    <template #default="slotProps">
      <Slot
        :id="slotProps.formFieldId"
        :aria-describedby="slotProps.ariaDescribedBy"
        :aria-invalid="slotProps.ariaInvalid"
        :name="name"
        :model-value="state.value"
        @update:model-value="handleUpdateModelValue"
        @blur="state.onBlur($event, props.name)"
        @change="state.onChange"
        @input="state.onInput"
      >
        <slot v-bind="state" />
      </Slot>
    </template>
    <template v-if="slots.label || label" #label>
      <slot name="label" v-bind="state" />
    </template>
    <template v-if="slots.description || description" #description>
      <slot name="description" v-bind="state" />
    </template>
  </FormFieldBaseCompact>
</template>
