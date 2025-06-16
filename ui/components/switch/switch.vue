<script setup lang="ts" generic="T extends AcceptableBooleanValue = boolean">
import { computed, useId } from 'vue';
import { SwitchRoot, SwitchThumb, provideSwitchThemeContext } from '@headless';
import type { AcceptableBooleanValue } from '@headless';
import { useOmitProps } from '@headless/composables';
import { mergeSlotVariants } from '@theme';
import { switchVariants } from '@variants/switch';
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

const forwardedProps = useOmitProps(props, ['ui', 'size', 'thumbProps']);

const defaultId = useId();

const switchId = computed(() => props.id || `switch-${defaultId}`);

const ui = computed(() => {
  const variants = switchVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui);
});

provideSwitchThemeContext({
  ui
});
</script>

<template>
  <SwitchRoot v-bind="forwardedProps" :id="switchId" @update:model-value="emit('update:modelValue', $event)">
    <SwitchThumb v-bind="thumbProps">
      <slot />
    </SwitchThumb>
  </SwitchRoot>
</template>
