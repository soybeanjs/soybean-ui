<script setup lang="ts">
import { computed } from 'vue';
import { useForwardExpose, useForwardPropsEmits } from 'reka-ui';
import TextareaRoot from './textarea-root.vue';
import STextareaContent from './textarea-content.vue';
import STextareaCount from './textarea-count.vue';
import type { TextareaContentEmits, TextareaProps } from './types';

defineOptions({
  name: 'STextarea'
});

const {
  class: rootCls,
  contentClass,
  showCount,
  countClass,
  countGraphemes,
  ...delegatedContentProps
} = defineProps<TextareaProps>();

const emit = defineEmits<TextareaContentEmits>();

const { forwardRef } = useForwardExpose();

const forwardedContent = useForwardPropsEmits(delegatedContentProps, emit);

const value = computed(() => delegatedContentProps.modelValue || delegatedContentProps.defaultValue);
</script>

<template>
  <TextareaRoot :class="rootCls">
    <STextareaContent v-bind="forwardedContent" :ref="forwardRef" :class="contentClass" />
    <STextareaCount v-if="showCount" v-slot="{ count }" :class="countClass" :size :value :maxlength :count-graphemes>
      <slot name="count" :count :value />
    </STextareaCount>
  </TextareaRoot>
</template>
