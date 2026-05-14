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
    <template #label>
      <slot v-if="slots.label || label" name="label" v-bind="state" />
    </template>
    <template #default="slotProps">
      <Slot
        :id="slotProps.formFieldId"
        :aria-describedby="slotProps['aria-described-by']"
        :aria-invalid="slotProps['aria-invalid']"
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
    <template #description>
      <slot v-if="slots.description || description" name="description" v-bind="state" />
    </template>
  </FormFieldBaseCompact>
</template>
