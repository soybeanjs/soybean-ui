<script setup lang="ts" generic="T extends TagsInputAcceptableValue = string">
import { computed } from 'vue';
import { TagsInputRoot, provideTagsInputUi } from '@soybeanjs/headless';
import type { TagsInputAcceptableValue } from '@soybeanjs/headless';
import { useForwardListeners, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import { tagsInputVariants } from './variants';
import type { TagsInputEmits, TagsInputProps } from './types';

defineOptions({
  name: 'STagsInput'
});

const props = defineProps<TagsInputProps<T>>();

const emit = defineEmits<TagsInputEmits<T>>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'onInvalid']);
const listeners = useForwardListeners(emit);
const ui = computed(() => {
  const variants = tagsInputVariants({
    size: props.size
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideTagsInputUi(ui);
</script>

<template>
  <TagsInputRoot v-slot="slotProps" v-bind="forwardedProps" v-on="listeners">
    <slot v-bind="slotProps" />
  </TagsInputRoot>
</template>
