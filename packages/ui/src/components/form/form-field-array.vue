<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { FormFieldArrayCompact, provideFormFieldUi } from '@soybeanjs/headless/form';
import { keysOf } from '@soybeanjs/headless/shared';
import { formVariants } from '@/styles/form';
import FormErrorMotion from './form-error-motion.vue';
import type { FormFieldArrayProps, FormFieldArraySlots } from './types';

defineOptions({
  name: 'SFormFieldArray'
});

const props = defineProps<FormFieldArrayProps>();

const slots = defineSlots<FormFieldArraySlots>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'size']);

const slotNames = computed(() => keysOf(slots).filter(name => name !== 'error'));

const ui = computed(() => formVariants({ size: props.size }, props.ui, { fieldArray: props.class }));

provideFormFieldUi(ui);
</script>

<template>
  <FormFieldArrayCompact v-bind="forwardedProps">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
    <template #error="errorScope">
      <slot name="error" v-bind="errorScope">
        <FormErrorMotion :error="errorScope.error" :error-props="errorScope.errorProps" />
      </slot>
    </template>
  </FormFieldArrayCompact>
</template>
