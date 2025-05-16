<script setup lang="ts">
import { computed } from 'vue';
import { cn, textareaVariants } from '@soybean-ui/variants';
import type { TextareaRootProps } from '../types';

defineOptions({
  name: 'STextareaRoot'
});

const { class: cls } = defineProps<TextareaRootProps>();

const { root } = textareaVariants();

const mergedCls = computed(() => cn(root(), cls));
</script>

<template>
  <div :class="mergedCls">
    <slot />
  </div>
</template>
