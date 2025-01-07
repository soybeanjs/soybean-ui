<script setup lang="ts">
import { computed } from 'vue';
import { ListboxFilter, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, commandVariants } from '@soybean-ui/variants';
import type { CommandInputEmits, CommandInputProps } from './types';

defineOptions({
  name: 'SCommandInput'
});

const { class: cls, autoFocus: _, ...delegatedProps } = defineProps<CommandInputProps>();

const emit = defineEmits<CommandInputEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const { input } = commandVariants();

const mergedCls = computed(() => cn(input(), cls));
</script>

<template>
  <ListboxFilter v-bind="forwarded" :class="mergedCls" auto-focus />
</template>
