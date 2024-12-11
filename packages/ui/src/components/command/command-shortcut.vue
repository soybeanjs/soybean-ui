<script setup lang="ts">
import { computed } from 'vue';
import { Primitive } from '@soybean-ui/primitive';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandShortcutProps } from './types';

defineOptions({
  name: 'SCommandShortcut'
});

const { class: cls } = defineProps<CommandShortcutProps>();

const { shortcut } = commandVariants();

const mergedCls = computed(() => cn(shortcut(), cls));
</script>

<template>
  <Primitive :class="mergedCls" as="span">
    <slot />
  </Primitive>
</template>
