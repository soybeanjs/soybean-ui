<script setup lang="ts">
import { computed } from 'vue';
import { ToggleGroupItem, useForwardProps } from 'radix-vue';
import { cn, toggleVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { ToggleGroupItemProps } from './types';

defineOptions({
  name: 'SToggleGroupItem'
});

const props = defineProps<ToggleGroupItemProps>();

const delegatedProps = computedOmit(props, ['class', 'variant', 'size']);

const forwardedProps = useForwardProps(delegatedProps);

const cls = computed(() => {
  const { toggle } = toggleVariants({ variant: props.variant, size: props.size });

  return cn(toggle(), props.class);
});
</script>

<template>
  <ToggleGroupItem v-bind="forwardedProps" :class="cls">
    <slot />
  </ToggleGroupItem>
</template>

<style scoped></style>
