<script setup lang="ts">
import { computed } from 'vue';
import { DropdownMenuSubTrigger, useForwardProps } from 'radix-vue';
import { ChevronRight } from 'lucide-vue-next';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import { computedOmit } from '../../shared';
import type { DropdownMenuSubTriggerProps } from './types';

defineOptions({
  name: 'SDropdownMenuSubTrigger'
});

const props = defineProps<DropdownMenuSubTriggerProps>();

const delegatedProps = computedOmit(props, ['class', 'size', 'triggerIconClass']);

const forwardedProps = useForwardProps(delegatedProps);

const subTriggerCls = computed(() => {
  const { subTrigger } = dropdownMenuVariants({ size: props.size });

  return cn(subTrigger(), props.class);
});

const { subTriggerIcon } = dropdownMenuVariants();
</script>

<template>
  <DropdownMenuSubTrigger v-bind="forwardedProps" :class="subTriggerCls">
    <slot />
    <slot name="icon">
      <ChevronRight :class="cn(subTriggerIcon(), props.triggerIconClass)" />
    </slot>
  </DropdownMenuSubTrigger>
</template>

<style scoped></style>
