<script setup lang="ts" generic="T extends KeyboardKeyValue | KeyboardKeyValue[] = KeyboardKeyValue[]">
import { computed } from 'vue';
import { cn, menuVariants } from '@soybean-ui/variants';
import { SKeyboardKey } from '../../keyboard-key';
import type { KeyboardKeyValue } from '../../keyboard-key';
import type { MenuShortcutProps } from '../types';

defineOptions({
  name: 'SMenuShortcut'
});

const { class: cls, size, value } = defineProps<MenuShortcutProps<T>>();

const mergedCls = computed(() => {
  const { shortcut } = menuVariants({ size });

  return cn(shortcut(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <SKeyboardKey :value="value" :size="size" />
  </div>
</template>
