<script setup lang="ts" generic="T extends RadioGroupOptionData">
import { computed } from 'vue';
import { RadioGroupCompact, provideRadioGroupUi } from '@soybeanjs/headless/radio-group';
import type { RadioGroupOptionData } from '@soybeanjs/headless/radio-group';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeVariants } from '@/theme';
import { radioGroupVariants } from './variants';
import type { RadioGroupEmits, RadioGroupProps } from './types';

defineOptions({
  name: 'SRadioGroup'
});

const props = defineProps<RadioGroupProps<T>>();

const emit = defineEmits<RadioGroupEmits<T['value']>>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'variant', 'color', 'size']);

const ui = computed(() => {
  const variants = radioGroupVariants({
    variant: props.variant,
    color: props.color,
    size: props.size
  });

  return mergeVariants(variants, props.ui, { root: props.class });
});

provideRadioGroupUi(ui);
</script>

<template>
  <RadioGroupCompact v-bind="forwardedProps" :items="items" @update:model-value="emit('update:modelValue', $event)" />
</template>
