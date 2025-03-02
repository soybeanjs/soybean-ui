<script setup lang="ts" generic="T extends KeyboardKeyValue | KeyboardKeyValue[] = KeyboardKeyValue[]">
import { computed } from 'vue';
import { cn, commandVariants } from '@soybean-ui/variants';
import SKeyboardKey from '../keyboard-key/keyboard-key.vue';
import type { KeyboardKeyValue } from '../keyboard-key';
import type { CommandShortcutProps } from './types';

defineOptions({
  name: 'SCommandShortcut'
});

const { class: cls, size, value } = defineProps<CommandShortcutProps<T>>();

const mergedCls = computed(() => {
  const { shortcut } = commandVariants({ size });

  return cn(shortcut(), cls);
});
</script>

<template>
  <div :class="mergedCls">
    <SKeyboardKey :value="value" :size="size" />
  </div>
</template>
