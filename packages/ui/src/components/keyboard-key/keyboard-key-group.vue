<script setup lang="ts" generic="T extends KeyboardKeyValue | KeyboardKeyValue[]">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { cn, keyboardKeyVariants } from '@soybean-ui/variants';
import SKeyboardKey from './keyboard-key.vue';
import type { KeyboardKeyGroupProps, KeyboardKeyValue } from './types';

defineOptions({
  name: 'SKeyboardKeyGroup'
});

const props = withDefaults(defineProps<KeyboardKeyGroupProps<T>>(), {
  values: () => [],
  separator: '+'
});

const mergedCls = computed(() => {
  const { group, separator } = keyboardKeyVariants({ size: props.size, variant: props.variant });

  return {
    root: cn(group(), props.class),
    separator: cn(separator(), props.separatorClass)
  };
});
</script>

<template>
  <Primitive as="div" :class="mergedCls.root">
    <template v-for="(value, index) in values" :key="index">
      <SKeyboardKey :value="value" :class="itemClass" :variant="variant" :size="size" />
      <template v-if="separator && index < values.length - 1">
        <Primitive as="span" :class="mergedCls.separator">{{ separator }}</Primitive>
      </template>
    </template>
  </Primitive>
</template>
