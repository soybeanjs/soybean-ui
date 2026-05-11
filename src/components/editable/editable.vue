<script setup lang="ts">
import { computed } from 'vue';
import { EditableCompact, provideEditableUi } from '@soybeanjs/headless/editable';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeVariants } from '@/theme';
import { editableVariants } from './variants';
import type { EditableProps, EditableEmits, EditableSlots } from './types';

defineOptions({
  name: 'SEditable'
});

const props = defineProps<EditableProps>();

const emit = defineEmits<EditableEmits>();

const slots = defineSlots<EditableSlots>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui']);

const listeners = useForwardListeners(emit);

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const variants = editableVariants({
    size: props.size
  });

  return mergeVariants(variants, props.ui, { root: props.class });
});

provideEditableUi(ui);
</script>

<template>
  <EditableCompact v-bind="forwardedProps" v-on="listeners">
    <template v-for="slotName in slotNames" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </EditableCompact>
</template>
