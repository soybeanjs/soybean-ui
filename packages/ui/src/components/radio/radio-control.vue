<script setup lang="ts">
import { computed } from 'vue';
import { RadioGroupItem, useForwardProps } from 'radix-vue';
import { cn, radioVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { RadioControlProps } from './types';

defineOptions({
  name: 'SRadioControl'
});

const props = defineProps<RadioControlProps>();

const delegatedProps = computedOmit(props, ['class']);

const forwarded = useForwardProps(delegatedProps);

const cls = computed(() => {
  const { control } = radioVariants({ color: props.color });

  return cn(control(), props.class);
});
</script>

<template>
  <RadioGroupItem v-bind="forwarded" :class="cls">
    <slot />
  </RadioGroupItem>
</template>

<style scoped></style>
