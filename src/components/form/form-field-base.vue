<script setup lang="ts">
import { computed } from 'vue';
import { FormFieldBaseCompact, provideFormFieldUi } from '@soybeanjs/headless/form';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants } from '@/theme';
import { formVariants } from './variants';
import type { FormFieldBaseProps, FormFieldBaseSlots } from './types';

defineOptions({
  name: 'SFormFieldBase'
});

const props = defineProps<FormFieldBaseProps>();

const slots = defineSlots<FormFieldBaseSlots>();

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
  <FormFieldBaseCompact v-bind="forwardedProps">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]>
      <slot :name="slotName" />
    </template>
  </FormFieldBaseCompact>
</template>
