<script setup lang="ts">
import { computed } from 'vue';
import { cn, textareaVariants } from '@soybean-ui/variants';
import { Primitive } from 'radix-vue';
import type { TextareaWordCountProps } from './types';

defineOptions({
  name: 'STextareaWordCount'
});

const props = defineProps<TextareaWordCountProps>();

const cls = computed(() => {
  const { count } = textareaVariants();

  return cn(count(), props.class);
});

const countInfo = computed(() => {
  let count = 0;

  if (!props.value) {
    return count;
  }

  if (props.countGraphemes) {
    count = props.countGraphemes(props.value);
  } else {
    count = String(props.value).length;
  }

  if (!props.maxlength) {
    return count;
  }

  return `${count} / ${props.maxlength}`;
});
</script>

<template>
  <Primitive as="div" :class="cls">
    <slot>
      {{ countInfo }}
    </slot>
  </Primitive>
</template>
