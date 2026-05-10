<script
  setup
  lang="ts"
  generic="
    T extends AcceptableBooleanValue = AcceptableBooleanValue,
    S extends RadioGroupOptionData<T> = RadioGroupOptionData<T>
  "
>
import { computed } from 'vue';
import { RadioGroupCompact, provideRadioGroupUi } from '@soybeanjs/headless/radio-group';
import { useOmitProps } from '@soybeanjs/headless/composables';
import type { AcceptableBooleanValue } from '@soybeanjs/headless/types';
import { mergeVariants } from '@/theme';
import { radioGroupVariants } from './variants';
import type { RadioGroupEmits, RadioGroupOptionData, RadioGroupProps } from './types';

defineOptions({
  name: 'SRadioGroup'
});

const props = defineProps<RadioGroupProps<T, S>>();

const emit = defineEmits<RadioGroupEmits<T>>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'variant', 'color', 'size']);

const compactItems = computed(() => props.items as RadioGroupOptionData<T>[]);

const handleModelValueChange = (value: Exclude<T, undefined>) => {
  emit('update:modelValue', value);
};

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
  <!-- @vue-ignore generic props are validated by RadioGroupProps/RadioGroupCompactProps -->
  <RadioGroupCompact v-bind="forwardedProps" :items="compactItems" @update:model-value="handleModelValueChange" />
</template>
