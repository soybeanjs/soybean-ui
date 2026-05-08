<script setup lang="ts">
import { computed } from 'vue';
import { TextareaCompact, provideTextareaUi } from '@soybeanjs/headless/textarea';
import { useOmitProps } from '@soybeanjs/headless/composables';
import { keysOf } from '@soybeanjs/utils';
import { mergeBaseVariants, mergeSlotVariants, miniSizeMap } from '@/theme';
import { buttonIconVariants } from '../button/variants';
import { textareaVariants } from './variants';
import type { TextareaEmits, TextareaProps, TextareaSlots } from './types';

defineOptions({
  name: 'STextarea'
});

const props = defineProps<TextareaProps>();

const emit = defineEmits<TextareaEmits>();

const forwardedProps = useOmitProps(props, ['class', 'size', 'ui', 'resize']);

const slots = defineSlots<TextareaSlots>();

const slotNames = computed(() => keysOf(slots));

const ui = computed(() => {
  const baseVariants = textareaVariants({
    size: props.size,
    resize: !props.autosize ? props.resize : false
  });

  const miniSize = miniSizeMap[props.size ?? 'md'];

  const variants = mergeBaseVariants(baseVariants, {
    clear: buttonIconVariants({
      size: miniSize,
      shape: 'circle'
    })
  });

  return mergeSlotVariants(variants, props.ui, { root: props.class });
});

provideTextareaUi(ui);
</script>

<template>
  <TextareaCompact v-bind="forwardedProps" @update:model-value="emit('update:modelValue', $event)">
    <template v-for="slotName in slotNames" :key="slotName" #[slotName]="slotProps">
      <slot :name="slotName" v-bind="slotProps" />
    </template>
  </TextareaCompact>
</template>
