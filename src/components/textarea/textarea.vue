<script setup lang="ts">
import { computed } from 'vue';
import { TextareaControl, TextareaCounter, TextareaRoot, provideTextareaUi } from '@soybeanjs/headless';
import { useForwardElement, useOmitProps } from '@soybeanjs/headless/composables';
import { mergeSlotVariants } from '@/theme';
import Icon from '../icon/icon.vue';
import { textareaVariants } from './variants';
import type { TextareaEmits, TextareaProps } from './types';

defineOptions({
  name: 'STextarea'
});

const props = defineProps<TextareaProps>();

const emit = defineEmits<TextareaEmits>();

const [_, setTextareaElement] = useForwardElement(el => props.textareaRef?.(el as HTMLTextAreaElement));

const forwardedProps = useOmitProps(props, [
  'class',
  'size',
  'ui',
  'resize',
  'clearable',
  'showCounter',
  'textareaRef',
  'controlProps',
  'counterProps'
]);

const ui = computed(() => {
  const variants = textareaVariants({
    size: props.size,
    resize: !props.autosize ? props.resize : false
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideTextareaUi(ui);
</script>

<template>
  <TextareaRoot v-slot="{ clear }" v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <TextareaControl v-bind="controlProps" :ref="setTextareaElement" />
    <Icon v-if="clearable" icon="lucide:x" :class="ui.clearable" @click="clear" />
    <TextareaCounter v-if="showCounter" v-slot="slotProps">
      <slot name="counter" v-bind="slotProps" />
    </TextareaCounter>
    <slot name="footer" />
  </TextareaRoot>
</template>
