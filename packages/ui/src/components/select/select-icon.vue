<script setup lang="ts">
import { computed } from 'vue';
import { SelectIcon, useForwardProps } from 'radix-vue';
import { ChevronsUpDown } from 'lucide-vue-next';
import { cn, selectVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { SelectIconProps } from './types';

defineOptions({
  name: 'SSelectIcon'
});

const props = defineProps<SelectIconProps>();

const delegatedProps = computedOmit(props, ['class', 'size']);

const forwardedProps = useForwardProps(delegatedProps);

const cls = computed(() => {
  const { icon } = selectVariants({ size: props.size });

  return cn(icon(), props.class);
});
</script>

<template>
  <SelectIcon v-bind="forwardedProps" :class="cls">
    <slot>
      <ChevronsUpDown />
    </slot>
  </SelectIcon>
</template>

<style scoped></style>
