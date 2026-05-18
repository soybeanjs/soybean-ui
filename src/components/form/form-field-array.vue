<script setup lang="ts">
import { computed } from 'vue';
import { FormFieldArrayCompact, provideFormFieldUi } from '@soybeanjs/headless/form';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { formVariants } from '@/styles/form';
import type { FormFieldArrayProps, FormFieldArraySlots } from './types';

defineOptions({
  name: 'SFormFieldArray'
});

const props = defineProps<FormFieldArrayProps>();

const slots = defineSlots<FormFieldArraySlots>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'size']);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => formVariants({ size: props.size }, props.ui, { field: props.class }));

provideFormFieldUi(ui);
</script>

<template>
  <FormFieldArrayCompact v-bind="forwardedProps">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </FormFieldArrayCompact>
</template>
