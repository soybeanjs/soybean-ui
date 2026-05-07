<script setup lang="ts">
import { computed } from 'vue';
import { InputNumberCompact, provideInputNumberUi } from '@soybeanjs/headless/input-number';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeSlotVariants } from '@/theme';
import { inputNumberVariants } from './variants';
import type { InputNumberEmits, InputNumberProps, InputNumberSlots } from './types';

defineOptions({
  name: 'SInputNumber'
});

const props = defineProps<InputNumberProps>();

const emit = defineEmits<InputNumberEmits>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'center']);

const slots = defineSlots<InputNumberSlots>();

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const variants = inputNumberVariants({
    size: props.size,
    center: props.center
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideInputNumberUi(ui);
</script>

<template>
  <InputNumberCompact v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </InputNumberCompact>
</template>
