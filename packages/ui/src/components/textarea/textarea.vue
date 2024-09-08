<script setup lang="ts">
import { cn, textareaVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { TextareaProps } from './types';

defineOptions({
  name: 'STextarea'
});

const props = withDefaults(defineProps<TextareaProps>(), {
  disabled: false
});

const delegatedProps = computedOmit(props, ['class', 'size']);

const modelValue = defineModel<string>();
</script>

<template>
  <textarea
    v-bind="delegatedProps"
    v-model="modelValue"
    :class="cn(textareaVariants({ size }), props.class)"
  ></textarea>
</template>
