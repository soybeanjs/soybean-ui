<script setup lang="ts">
import { computed } from 'vue';
import { useControllableState, useOmitProps } from '../../composables';
import { Primitive } from '../primitive';
import type { ToggleEmits, ToggleProps, ToggleState } from './types';

defineOptions({
  name: 'Toggle'
});

const props = withDefaults(defineProps<ToggleProps>(), {
  as: 'button',
  type: 'button',
  modelValue: undefined,
  disabled: false
});

const emit = defineEmits<ToggleEmits>();

const forwardedProps = useOmitProps(props, ['defaultValue', 'modelValue', 'disabled']);

const modelValue = useControllableState(
  () => props.modelValue,
  value => {
    emit('update:modelValue', value ?? false);
  },
  props.defaultValue ?? false
);

const dataDisabled = computed(() => (props.disabled ? '' : undefined));

const dataState = computed<ToggleState>(() => (modelValue.value ? 'on' : 'off'));

const onClick = (event: MouseEvent) => {
  if (props.disabled) {
    event.preventDefault();
    event.stopPropagation();

    return;
  }

  modelValue.value = !modelValue.value;
};
</script>

<template>
  <Primitive
    v-bind="forwardedProps"
    :type="as === 'button' ? type : undefined"
    :disabled="as === 'button' ? disabled : undefined"
    :aria-disabled="as === 'button' ? undefined : disabled || undefined"
    :aria-pressed="!!modelValue"
    :data-disabled="dataDisabled"
    :data-state="dataState"
    @click="onClick"
  >
    <slot :model-value="!!modelValue" :pressed="!!modelValue" :state="dataState" :disabled="disabled" />
  </Primitive>
</template>
