<script setup lang="ts" generic="T extends RadioGroupOptionData">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { RadioGroupCompact, provideRadioGroupUi } from '@soybeanjs/headless/radio-group';
import type { RadioGroupOptionData } from '@soybeanjs/headless/radio-group';
import { radioGroupVariants } from '@/styles/radio-group';
import type { RadioGroupProps, RadioGroupEmits } from './types';

defineOptions({
  name: 'SRadioGroup'
});

const props = defineProps<RadioGroupProps<T>>();

const emit = defineEmits<RadioGroupEmits<T['value']>>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'variant', 'color', 'size']);

const ui = computed(() =>
  radioGroupVariants(
    {
      variant: props.variant,
      color: props.color,
      size: props.size
    },
    props.ui,
    { root: props.class }
  )
);

provideRadioGroupUi(ui);
</script>

<template>
  <RadioGroupCompact v-bind="forwardedProps" :items="items" @update:model-value="emit('update:modelValue', $event)" />
</template>
