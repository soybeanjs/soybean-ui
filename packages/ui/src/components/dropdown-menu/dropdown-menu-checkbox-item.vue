<script setup lang="ts">
import { DropdownMenuCheckboxItem, useForwardPropsEmits } from 'radix-vue';
import type { DropdownMenuCheckboxItemEmits } from 'radix-vue';
import { Check } from 'lucide-vue-next';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import { computed } from 'vue';
import { computedOmit } from '../../shared';
import type { DropdownMenuCheckboxItemProps } from './types';
import SDropdownMenuItemIndicator from './dropdown-menu-indicator.vue';

defineOptions({
  name: 'SDropdownMenuCheckboxItem'
});

const props = defineProps<DropdownMenuCheckboxItemProps>();

const emit = defineEmits<DropdownMenuCheckboxItemEmits>();

const delegatedProps = computedOmit(props, ['class', 'size']);

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const cls = computed(() => {
  const { checkboxItem } = dropdownMenuVariants({ size: props.size });

  return cn(checkboxItem(), props.class);
});
</script>

<template>
  <DropdownMenuCheckboxItem v-bind="forwarded" :class="cls">
    <SDropdownMenuItemIndicator :size="size">
      <slot name="indicatorIcon">
        <Check />
      </slot>
    </SDropdownMenuItemIndicator>
    <slot></slot>
  </DropdownMenuCheckboxItem>
</template>

<style scoped></style>
