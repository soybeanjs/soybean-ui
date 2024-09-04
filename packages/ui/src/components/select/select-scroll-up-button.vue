<script setup lang="ts">
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

const { scrollUpButton } = selectVariants();
</script>

<template>
  <SelectScrollUpButton v-bind="forwardedProps" :class="cn(scrollUpButton(), props.class)">
    <slot>
      <ChevronUp />
    </slot>
  </SelectScrollUpButton>
</template>

<style scoped></style>
