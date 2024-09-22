<script setup lang="ts">
import { DropdownMenuRadioItem, useForwardPropsEmits } from 'radix-vue';
import type { DropdownMenuRadioItemEmits } from 'radix-vue';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import { computed } from 'vue';
import { computedOmit } from '../../shared';
import type { DropdownMenuRadioItemProps } from './types';
import SDropdownMenuItemIndicator from './dropdown-menu-indicator.vue';
import SDropdownMenuRadioIndicatorIcon from './dropdown-menu-radio-indicator-icon.vue';

defineOptions({
  name: 'SDropdownMenuRadioItem'
});

const props = defineProps<DropdownMenuRadioItemProps>();

const emit = defineEmits<DropdownMenuRadioItemEmits>();

const delegatedProps = computedOmit(props, ['class', 'size']);

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const cls = computed(() => {
  const { radioItem } = dropdownMenuVariants({ size: props.size });

  return cn(radioItem(), props.class);
});
</script>

<template>
  <DropdownMenuRadioItem v-bind="forwarded" :class="cls">
    <SDropdownMenuItemIndicator :size="size">
      <slot name="indicatorIcon">
        <SDropdownMenuRadioIndicatorIcon />
      </slot>
    </SDropdownMenuItemIndicator>
    <slot></slot>
  </DropdownMenuRadioItem>
</template>

<style scoped></style>
