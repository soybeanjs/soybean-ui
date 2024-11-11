<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from 'reka-ui';
import { cn, keyboardKeyVariants } from '@soybean-ui/variants';
import type { KeyboardKeyProps } from './types';

defineOptions({
  name: 'SKeyboardKey'
});

const { class: cls, size, keys, separator = '+' } = defineProps<KeyboardKeyProps>();

const mergedCls = computed(() => cn(keyboardKeyVariants({ size }), cls));
</script>

<template>
  <Primitive as="div" :class="mergedCls">
    <slot name="content" :value="keys">
      {{ keys?.join(separator) }}
    </slot>
  </Primitive>
</template>
