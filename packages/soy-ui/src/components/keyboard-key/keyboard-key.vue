<script setup lang="ts" generic="T extends KeyboardKeyValue | KeyboardKeyValue[]">
import { computed } from 'vue';
import { cn, keyboardKeyVariants } from '@soybean-ui/variants';
import { useThemeSize } from '../../context/theme';
import { useKeyboardKey } from './shared';
import type { KeyboardKeyProps, KeyboardKeyValue } from './types';

defineOptions({
  name: 'SKeyboardKey'
});

const { class: cls, variant, size: _size, value } = defineProps<KeyboardKeyProps<T>>();

const themeSize = useThemeSize();

const size = computed(() => _size || themeSize.value);

const { getKeyboardKey } = useKeyboardKey();

const mergedCls = computed(() => {
  const { item } = keyboardKeyVariants({ variant, size: size.value });

  return cn(item(), cls);
});

const values = computed<KeyboardKeyValue[]>(() => {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map(v => getKeyboardKey(v)).filter(Boolean) as KeyboardKeyValue[];
  }

  return [getKeyboardKey(value)!];
});
</script>

<template>
  <div :class="mergedCls">
    <slot :values="values">
      <span v-for="v in values" :key="v">{{ v }}</span>
    </slot>
  </div>
</template>
