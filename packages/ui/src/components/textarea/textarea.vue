<script setup lang="ts">
import { computed, ref } from 'vue';
import { Primitive, useForwardProps } from 'radix-vue';
import { cn, textareaVariants } from '@soybean-ui/variants';
import { computedOmit, isBlankString } from '../../shared';
import type { TextareaProps } from './types';
import TextareaWordCount from './textarea-word-count.vue';
import TextareaRoot from './textarea-root.vue';

defineOptions({
  name: 'STextarea'
});

const props = defineProps<TextareaProps>();

type Emits = {
  'update:modelValue': [value: string];
};

const emit = defineEmits<Emits>();

const delegatedProps = computedOmit(props, [
  'class',
  'size',
  'resize',
  'modelValue',
  'defaultValue',
  'countClass',
  'countGraphemes'
]);

const forwardedProps = useForwardProps(delegatedProps);

const cls = computed(() => {
  const resize = isBlankString(props.resize) ? true : props.resize;

  const { textarea } = textareaVariants({ size: props.size, resize });

  return cn(textarea({ size: props.size, resize }), props.class);
});

function handleInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLTextAreaElement).value);
}

const STextareaRef = ref<HTMLTextAreaElement | null>(null);
defineExpose({ STextareaRef });
</script>

<template>
  <TextareaRoot>
    <Primitive
      ref="STextareaRef"
      as="textarea"
      v-bind="forwardedProps"
      :value="modelValue || defaultValue"
      :class="cls"
      @input="handleInput"
    ></Primitive>
    <TextareaWordCount
      v-if="showCount"
      :value="modelValue || defaultValue"
      :class="countClass"
      :maxlength="maxlength"
      :count-graphemes="countGraphemes"
      :size="size"
    >
      <slot name="count" :value="modelValue || defaultValue" />
    </TextareaWordCount>
  </TextareaRoot>
</template>
