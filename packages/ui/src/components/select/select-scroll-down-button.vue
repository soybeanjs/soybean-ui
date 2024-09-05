<script setup lang="ts">
import { computed } from 'vue';
import { SelectScrollDownButton, useForwardProps } from 'radix-vue';
import { ChevronDown } from 'lucide-vue-next';
import { cn, selectVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { SelectScrollDownButtonProps } from './types';

defineOptions({
  name: 'SSelectScrollDownButton'
});

const props = defineProps<SelectScrollDownButtonProps>();

const delegatedProps = computedOmit(props, ['class']);

const forwardedProps = useForwardProps(delegatedProps);

const cls = computed(() => {
  const { scrollDownButton } = selectVariants({ size: props.size });

  return cn(scrollDownButton(), props.class);
});
</script>

<template>
  <SelectScrollDownButton v-bind="forwardedProps" :class="cls">
    <slot>
      <ChevronDown />
    </slot>
  </SelectScrollDownButton>
</template>

<style scoped></style>
