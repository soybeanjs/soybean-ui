<script setup lang="ts">
import { computed } from 'vue';
import { useForwardExpose, useForwardPropsEmits } from '@soybean-ui/primitives';
import type { TextareaContentEmits, TextareaProps } from '../types';
import TextareaRoot from './textarea-root.vue';
import STextareaContent from './textarea-content.vue';
import STextareaCount from './textarea-count.vue';

defineOptions({
  name: 'STextarea'
});

const { class: cls, size, ui, showCount, countGraphemes, ...delegatedContentProps } = defineProps<TextareaProps>();

const emit = defineEmits<TextareaContentEmits>();

const { forwardRef } = useForwardExpose();

const forwardedContent = useForwardPropsEmits(delegatedContentProps, emit);

const value = computed(() => delegatedContentProps.modelValue || delegatedContentProps.defaultValue);
</script>

<template>
  <TextareaRoot :class="cls || ui?.root">
    <STextareaContent v-bind="forwardedContent" :ref="forwardRef" :class="ui?.content" :size="size" />
    <STextareaCount
      v-if="showCount"
      v-slot="{ count }"
      :class="ui?.count"
      :size="size"
      :value="value"
      :maxlength="maxlength"
      :count-graphemes="countGraphemes"
    >
      <slot name="count" :count="count" :value="value" />
    </STextareaCount>
  </TextareaRoot>
</template>
