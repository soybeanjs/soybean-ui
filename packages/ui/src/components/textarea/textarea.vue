<script setup lang="ts">
import { cn, textareaVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { TextareaProps } from './types';

defineOptions({
  name: 'STextarea'
});

const props = defineProps<TextareaProps>();

type Emits = {
  'update:modelValue': [value: string];
};

const emit = defineEmits<Emits>();

const delegatedProps = computedOmit(props, ['class', 'size', 'modelValue', 'defaultValue']);

function handleInput(event: InputEvent) {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value);
}
</script>

<template>
  <textarea
    v-bind="delegatedProps"
    :value="modelValue || defaultValue"
    :class="cn(textareaVariants({ size }), props.class)"
    @input="handleInput"
  ></textarea>
</template>
