<script setup lang="ts">
import { computed } from 'vue';
import { DropdownMenuSubTrigger, useForwardProps } from 'reka-ui';
import { ChevronRight } from 'lucide-vue-next';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import type { DropdownMenuSubTriggerProps } from './types';

defineOptions({
  name: 'SDropdownMenuSubTrigger'
});

const { class: cls, size, triggerIconClass, ...delegatedProps } = defineProps<DropdownMenuSubTriggerProps>();

const forwardedProps = useForwardProps(delegatedProps);

const mergedCls = computed(() => {
  const { subTrigger } = dropdownMenuVariants({ size });

  return cn(subTrigger(), cls);
});

const { subTriggerIcon } = dropdownMenuVariants();

const subTriggerIconCls = computed(() => cn(subTriggerIcon(), triggerIconClass));
</script>

<template>
  <DropdownMenuSubTrigger v-bind="forwardedProps" :class="mergedCls">
    <slot />
    <slot name="icon">
      <ChevronRight :class="subTriggerIconCls" />
    </slot>
  </DropdownMenuSubTrigger>
</template>

<style scoped></style>
