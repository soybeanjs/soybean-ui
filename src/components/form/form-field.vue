<script setup lang="ts">
import { computed } from 'vue';
import { FormFieldCompact, provideFormFieldUi } from '@soybeanjs/headless/form';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants } from '@/theme';
import { formVariants } from './variants';
import type { FormFieldProps, FormFieldSlots } from './types';

defineOptions({
  name: 'SFormField'
});

const props = defineProps<FormFieldProps>();

const slots = defineSlots<FormFieldSlots>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'size']);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const variants = formVariants({
    size: props.size
  });

  return mergeVariants(variants, props.ui, { field: props.class });
});

provideFormFieldUi(ui);
</script>

<template>
  <FormFieldCompact v-bind="forwardedProps">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </FormFieldCompact>
</template>
