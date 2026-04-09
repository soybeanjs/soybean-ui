<script setup lang="ts" generic="T extends TagsInputAcceptableValue = string">
import { computed } from 'vue';
import { TagsInputRoot, provideTagsInputUi } from '@soybeanjs/headless';
import type { TagsInputAcceptableValue } from '@soybeanjs/headless';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { tagsInputVariants } from './variants';
import type { TagsInputEmits, TagsInputProps } from './types';

defineOptions({
  name: 'STagsInput'
});

const props = defineProps<TagsInputProps<T>>();

const emit = defineEmits<TagsInputEmits<T>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'onInvalid']);
const ui = computed(() => {
  const variants = tagsInputVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideTagsInputUi(ui);

const onUpdateModelValue = (value: T[]) => {
  emit('update:modelValue', value);
};

const onInvalid = (value: T) => {
  emit('invalid', value);
};

const onAddTag = (value: T) => {
  emit('addTag', value);
};

const onRemoveTag = (value: T) => {
  emit('removeTag', value);
};

const listeners: Record<string, (...args: any[]) => void> = {
  'update:modelValue': onUpdateModelValue,
  invalid: onInvalid,
  addTag: onAddTag,
  removeTag: onRemoveTag
};
</script>

<template>
  <TagsInputRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <slot v-bind="slotProps" />
  </TagsInputRoot>
</template>
