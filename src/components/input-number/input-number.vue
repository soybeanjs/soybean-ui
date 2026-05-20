<script setup lang="ts">
import { computed } from 'vue';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { InputNumberCompact, provideInputNumberUi } from '@soybeanjs/headless/input-number';
import { keysOf } from '@soybeanjs/utils';
import { buttonIconVariants } from '@/styles/button';
import { inputNumberVariants } from '@/styles/input-number';
import { miniSizeMap } from '@/theme';
import type { InputNumberProps, InputNumberEmits, InputNumberSlots } from './types';

defineOptions({
  name: 'SInputNumber'
});

const props = defineProps<InputNumberProps>();

const emit = defineEmits<InputNumberEmits>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'center']);

const slots = defineSlots<InputNumberSlots>();

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const miniSize = miniSizeMap[props.size ?? 'md'];

  return inputNumberVariants(
    {
      size: props.size,
      center: props.center
    },
    {
      decrement: buttonIconVariants({ size: miniSize }),
      increment: buttonIconVariants({ size: miniSize }),
      clear: buttonIconVariants({ size: miniSize, shape: 'circle' })
    },
    props.ui,
    { root: props.class }
  );
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
