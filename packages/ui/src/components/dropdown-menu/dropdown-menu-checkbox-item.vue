<script setup lang="ts">
import { computed } from 'vue';
import { DropdownMenuCheckboxItem, useForwardPropsEmits } from '@soybean-ui/primitive';
import { Check } from 'lucide-vue-next';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import SDropdownMenuItemIndicator from './dropdown-menu-indicator.vue';
import type { DropdownMenuCheckboxItemEmits, DropdownMenuCheckboxItemProps } from './types';

defineOptions({
  name: 'SDropdownMenuCheckboxItem'
});

const { class: cls, size, indicatorClass, ...delegatedProps } = defineProps<DropdownMenuCheckboxItemProps>();

const emit = defineEmits<DropdownMenuCheckboxItemEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { checkboxItem } = dropdownMenuVariants({ size });

  return cn(checkboxItem(), cls);
});
</script>

<template>
  <DropdownMenuCheckboxItem v-bind="forwarded" :class="mergedCls">
    <SDropdownMenuItemIndicator :class="indicatorClass" :size>
      <slot name="indicatorIcon">
        <Check />
      </slot>
    </SDropdownMenuItemIndicator>
    <slot></slot>
  </DropdownMenuCheckboxItem>
</template>

<style scoped></style>
