<script setup lang="ts">
import { computed } from 'vue';
import { SelectContent, useForwardPropsEmits } from 'radix-vue';
import type { SelectContentEmits } from 'radix-vue';
import { cn, selectVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { SelectContentProps } from './types';

defineOptions({
  name: 'SSelectContent'
});

const props = withDefaults(defineProps<SelectContentProps>(), {
  avoidCollisions: true,
  prioritizePosition: true,
  position: 'popper'
});

const emit = defineEmits<SelectContentEmits>();

const delegatedProps = computedOmit(props, ['class']);

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const cls = computed(() => {
  const { content } = selectVariants({ position: props.position });

  return cn(content(), props.class);
});
</script>

<template>
  <SelectContent v-bind="forwarded" :class="cls">
    <slot />
  </SelectContent>
</template>

<style scoped></style>
