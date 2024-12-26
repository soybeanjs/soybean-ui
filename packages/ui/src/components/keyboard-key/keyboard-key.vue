<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { cn, keyboardKeyVariants } from '@soybean-ui/variants';
import { useKeyboardKey } from './shared';
import type { KeyboardKeyProps } from './types';

defineOptions({
  name: 'SKeyboardKey'
});

const { class: cls, variant, size, value } = defineProps<KeyboardKeyProps>();

const { getKeyboardKey } = useKeyboardKey();

const mergedCls = computed(() => {
  const { item } = keyboardKeyVariants({ variant, size });

  return cn(item(), cls);
});
</script>

<template>
  <Primitive as="kbd" :class="mergedCls">
    <slot :value="getKeyboardKey(value)">{{ getKeyboardKey(value) }}</slot>
  </Primitive>
</template>
