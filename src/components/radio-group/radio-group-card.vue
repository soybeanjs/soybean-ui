<script setup lang="ts" generic="T extends RadioGroupCardOptionData">
import { computed } from 'vue';
import { RadioGroupCardCompact, provideRadioGroupCardUi } from '@soybeanjs/headless/radio-group';
import type { RadioGroupCardOptionData } from '@soybeanjs/headless/radio-group';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { radioGroupCardVariants } from '@/styles/radio-group';
import type { RadioGroupCardProps, RadioGroupCardEmits, RadioGroupCardSlots } from './types';

defineOptions({
  name: 'SRadioGroupCard'
});

const props = defineProps<RadioGroupCardProps<T>>();

const emit = defineEmits<RadioGroupCardEmits<T['value']>>();

const slots = defineSlots<RadioGroupCardSlots>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'variant', 'color', 'size']);

const ui = computed(() =>
  radioGroupCardVariants(
    {
      variant: props.variant,
      color: props.color,
      size: props.size
    },
    props.ui,
    { root: props.class }
  )
);

provideRadioGroupCardUi(ui);
</script>

<template>
  <RadioGroupCardCompact v-bind="forwardedProps" :items="items" @update:model-value="emit('update:modelValue', $event)">
    <template v-if="slots.description" #description="{ item }">
      <slot name="description" :item="item" />
    </template>
  </RadioGroupCardCompact>
</template>
