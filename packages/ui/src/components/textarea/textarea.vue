<script setup lang="ts">
import { computed } from 'vue';
import { useForwardExpose, useForwardPropsEmits } from 'radix-vue';
import { computedOmit } from '../../shared';
import TextareaRoot from './textarea-root.vue';
import STextareaContent from './textarea-content.vue';
import STextareaCount from './textarea-count.vue';
import type { TextareaContentEmits, TextareaProps } from './types';

defineOptions({
  name: 'STextarea'
});

const props = defineProps<TextareaProps>();

const emit = defineEmits<TextareaContentEmits>();

const { forwardRef } = useForwardExpose();

const delegatedContentProps = computedOmit(props, [
  'class',
  'contentClass',
  'showCount',
  'countClass',
  'countGraphemes'
]);

const forwardedContent = useForwardPropsEmits(delegatedContentProps, emit);

const value = computed(() => props.modelValue || props.defaultValue);
</script>

<template>
  <TextareaRoot :class="props.class">
    <STextareaContent :ref="forwardRef" v-bind="forwardedContent" :class="contentClass" />
    <STextareaCount
      v-if="showCount"
      v-slot="{ count }"
      :class="countClass"
      :size="size"
      :value="value"
      :maxlength="maxlength"
      :count-graphemes="countGraphemes"
    >
      <slot name="count" :count="count" :value="count" />
    </STextareaCount>
  </TextareaRoot>
</template>
