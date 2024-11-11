<script setup lang="ts">
import { computed } from 'vue';
import { DropdownMenuRadioItem, useForwardPropsEmits } from 'reka-ui';
import { cn, dropdownMenuVariants } from '@soybean-ui/variants';
import SDropdownMenuItemIndicator from './dropdown-menu-indicator.vue';
import SDropdownMenuRadioIndicatorIconRoot from './dropdown-menu-radio-indicator-icon-root.vue';
import SDropdownMenuRadioIndicatorIcon from './dropdown-menu-radio-indicator-icon.vue';
import type { DropdownMenuRadioItemEmits, DropdownMenuRadioItemProps } from './types';

defineOptions({
  name: 'SDropdownMenuRadioItem'
});

const {
  class: cls,
  size,
  indicatorClass,
  indicatorIconRootClass,
  indicatorIconClass,
  ...delegatedProps
} = defineProps<DropdownMenuRadioItemProps>();

const emit = defineEmits<DropdownMenuRadioItemEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { radioItem } = dropdownMenuVariants({ size });

  return cn(radioItem(), cls);
});
</script>

<template>
  <DropdownMenuRadioItem v-bind="forwarded" :class="mergedCls">
    <SDropdownMenuItemIndicator :class="indicatorClass" :size="size">
      <slot name="indicatorIcon">
        <SDropdownMenuRadioIndicatorIconRoot :class="indicatorIconRootClass">
          <SDropdownMenuRadioIndicatorIcon :class="indicatorIconClass" />
        </SDropdownMenuRadioIndicatorIconRoot>
      </slot>
    </SDropdownMenuItemIndicator>
    <slot></slot>
  </DropdownMenuRadioItem>
</template>

<style scoped></style>
