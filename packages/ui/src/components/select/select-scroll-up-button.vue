<script setup lang="ts">
import { computed } from 'vue';
import { SelectScrollUpButton, useForwardProps } from 'radix-vue';
import { ChevronUp } from 'lucide-vue-next';
import { cn, selectVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { SelectScrollUpButtonProps } from './types';

defineOptions({
  name: 'SSelectScrollUpButton'
});

const props = defineProps<SelectScrollUpButtonProps>();

const delegatedProps = computedOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);

const cls = computed(() => {
  const { scrollUpButton } = selectVariants({ size: props.size });

  return cn(scrollUpButton(), props.class);
});
</script>

<template>
  <SelectScrollUpButton v-bind="forwardedProps" :class="cls">
    <slot>
      <ChevronUp />
    </slot>
  </SelectScrollUpButton>
</template>

<style scoped></style>
