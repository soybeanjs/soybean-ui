<script setup lang="ts">
import { computed } from 'vue';
import { SelectContent, useForwardPropsEmits } from 'reka-ui';
import { cn, selectVariants } from '@soybean-ui/variants';
import type { SelectContentEmits, SelectContentProps } from './types';

defineOptions({
  name: 'SSelectContent'
});

const {
  class: cls,
  avoidCollisions = true,
  prioritizePosition = true,
  position = 'popper',
  ...delegatedProps
} = defineProps<SelectContentProps>();

const emit = defineEmits<SelectContentEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { content } = selectVariants({ position });

  return cn(content(), cls);
});
</script>

<template>
  <SelectContent v-bind="forwarded" :class="mergedCls" :avoid-collisions :prioritize-position :position>
    <slot />
  </SelectContent>
</template>

<style scoped></style>
