<script setup lang="ts">
import { computed } from 'vue';
import { Primitive, useForwardProps } from '@soybean-ui/primitives';
import { cn, inputVariants } from '@soybean-ui/variants';
import { useThemeSize } from '../../context/theme';
import type { InputEmits, InputProps } from './types';

defineOptions({
  name: 'SInput'
});

const { class: cls, size: _size, modelValue, defaultValue, ...delegatedProps } = defineProps<InputProps>();

const emit = defineEmits<InputEmits>();

const themeSize = useThemeSize();

const size = computed(() => _size || themeSize.value);

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => cn(inputVariants({ size: size.value }), cls));

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>

<template>
  <Primitive
    as="input"
    v-bind="forwardedProps"
    :value="modelValue || defaultValue"
    :class="mergedCls"
    @input="handleInput"
  />
</template>
