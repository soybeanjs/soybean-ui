<script setup lang="ts" generic="T extends AcceptableBooleanValue = boolean">
import { computed } from 'vue';
import { SwitchCompact, provideSwitchUi } from '@soybeanjs/headless/switch';
import type { AcceptableBooleanValue } from '@soybeanjs/headless/types';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { switchVariants } from './variants';
import type { SwitchEmits, SwitchProps, SwitchSlots } from './types';

defineOptions({
  name: 'SSwitch'
});

const props = withDefaults(defineProps<SwitchProps<T>>(), {
  modelValue: undefined,
  trueValue: true as any,
  falseValue: false as any
});

const emit = defineEmits<SwitchEmits<T>>();

defineSlots<SwitchSlots<T>>();

const forwardedProps = useOmitProps(props, ['class', 'ui', 'color', 'size', 'shape']);

const ui = computed(() => {
  const variants = switchVariants({
    color: props.color,
    size: props.size,
    shape: props.shape
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideSwitchUi(ui);
</script>

<template>
  <SwitchCompact v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <template #leading="slotProps">
      <slot name="leading" v-bind="slotProps" />
    </template>
    <template #default="slotProps">
      <slot v-bind="slotProps" />
    </template>
    <template #trailing="slotProps">
      <slot name="trailing" v-bind="slotProps" />
    </template>
  </SwitchCompact>
</template>
