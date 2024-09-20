<script setup lang="ts">
import { computed } from 'vue';
import { Primitive, useForwardProps } from 'radix-vue';
import { cn, textareaVariants } from '@soybean-ui/variants';
import { computedOmit, isBlankString } from '../../shared';
import type { TextareaProps } from './types';

defineOptions({
  name: 'STextarea'
});

const props = defineProps<TextareaProps>();

type Emits = {
  'update:modelValue': [value: string];
};

const emit = defineEmits<Emits>();

const delegatedProps = computedOmit(props, ['class', 'size', 'resize', 'modelValue', 'defaultValue']);

const forwardedProps = useForwardProps(delegatedProps);

const cls = computed(() => {
  const resize = isBlankString(props.resize) ? true : props.resize;

  return cn(textareaVariants({ size: props.size, resize }), props.class);
});

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value);
}
</script>

<template>
  <Primitive
    as="textarea"
    v-bind="forwardedProps"
    :value="modelValue || defaultValue"
    :class="cls"
    @input="handleInput"
  />
</template>
