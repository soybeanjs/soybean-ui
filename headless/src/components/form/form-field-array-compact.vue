<script setup lang="ts">
import { computed } from 'vue';
import { keysOf } from '@soybeanjs/utils';
import FormFieldBaseCompact from './form-field-base-compact.vue';
import type { FormFieldCompactProps, FormFieldArrayCompactSlots } from './types';
import { useFormSub } from './use-form';

defineOptions({
  name: 'FormFieldArrayCompact'
});

const props = defineProps<FormFieldCompactProps<any, any>>();

const slots = defineSlots<FormFieldArrayCompactSlots<any, any>>();

const { useFieldArray } = useFormSub();

const state = useFieldArray(props.name, {
  validate: props.validate,
  reset: props.reset
});

const slotNames = computed(() => keysOf(slots));

const error = computed(() => state.value.meta.error);
</script>

<template>
  <FormFieldBaseCompact data-soybean-form-field-array v-bind="props" :error="error" :is-field-array="true">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]>
      <slot :name="slotName" v-bind="state" />
    </template>
  </FormFieldBaseCompact>
</template>
