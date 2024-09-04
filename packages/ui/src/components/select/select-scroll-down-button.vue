<script setup lang="ts">
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

const { scrollDownButton } = selectVariants();
</script>

<template>
  <SelectScrollDownButton v-bind="forwardedProps" :class="cn(scrollDownButton(), props.class)">
    <slot>
      <ChevronDown />
    </slot>
  </SelectScrollDownButton>
</template>

<style scoped></style>
