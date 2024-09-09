<script setup lang="ts">
import { useForwardProps } from 'radix-vue';
import { cn, inputVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { InputProps } from './types';

defineOptions({
  name: 'SInput'
});

const props = defineProps<InputProps>();

type Emits = {
  'update:modelValue': [value: string];
};

const emit = defineEmits<Emits>();

const delegatedProps = computedOmit(props, ['class', 'size', 'modelValue', 'defaultValue']);

const forwardedProps = useForwardProps(delegatedProps);

const modelValue = defineModel<string>();

function handleInput(event: InputEvent) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>

<template>
  <input
    v-bind="forwardedProps"
    :value="modelValue || defaultValue"
    :class="cn(inputVariants({ size }), props.class)"
    @input="handleInput"
  />
</template>

<style scoped></style>
