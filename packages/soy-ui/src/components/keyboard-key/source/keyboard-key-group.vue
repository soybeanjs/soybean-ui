<script setup lang="ts" generic="T extends KeyboardKeyValue | KeyboardKeyValue[]">
import { computed } from 'vue';
import { cn, keyboardKeyVariants } from '@soybean-ui/variants';
import type { KeyboardKeyGroupProps, KeyboardKeyValue } from '../types';
import SKeyboardKey from './keyboard-key.vue';

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
    root: cn(group(), props.class || props.ui?.group),
    separator: cn(separator(), props.ui?.separator)
  };
});
</script>

<template>
  <div :class="mergedCls.root">
    <template v-for="(value, index) in values" :key="index">
      <SKeyboardKey :value="value" :class="ui?.item" :variant="variant" :size="size" />
      <template v-if="separator && index < values.length - 1">
        <span :class="mergedCls.separator">{{ separator }}</span>
      </template>
    </template>
  </div>
</template>
