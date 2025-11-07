<script setup lang="ts" generic="T extends AcceptableBooleanValue = boolean">
import { computed, useId } from 'vue';
import { SwitchControl, SwitchRoot, SwitchThumb, provideSwitchThemeContext } from '@soybeanjs/headless';
import type { AcceptableBooleanValue } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { switchVariants } from '@/variants/switch';
import type { SwitchEmits, SwitchProps } from './types';

defineOptions({
  name: 'SSwitch'
});

const props = withDefaults(defineProps<SwitchProps<T>>(), {
  modelValue: undefined,
  trueValue: true as any,
  falseValue: false as any
});

const emit = defineEmits<SwitchEmits<T>>();

const forwardedProps = useOmitProps(props, ['ui', 'color', 'size', 'shape', 'controlProps', 'thumbProps']);

const defaultId = useId();

const switchId = computed(() => props.id || `switch-${defaultId}`);

const ui = computed(() => {
  const variants = switchVariants({
    color: props.color,
    size: props.size,
    shape: props.shape
  });

  return mergeSlotVariants(variants, props.ui);
});

provideSwitchThemeContext({
  ui
});
</script>

<template>
  <SwitchRoot v-slot="slotProps" v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <slot name="leading" v-bind="slotProps" />
    <SwitchControl v-bind="controlProps" :id="switchId">
      <SwitchThumb v-bind="thumbProps">
        <slot v-bind="slotProps" />
      </SwitchThumb>
    </SwitchControl>
    <slot name="trailing" v-bind="slotProps" />
  </SwitchRoot>
</template>
