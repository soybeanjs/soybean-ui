<script setup lang="ts">
import { computed } from 'vue';
import { MenuCheckboxItem, useForwardPropsEmits } from '@soybean-ui/primitives';
import { cn, menuVariants } from '@soybean-ui/variants';
import { Check } from 'lucide-vue-next';
import SMenuItemIndicator from './menu-item-indicator.vue';
import type { MenuCheckboxItemEmits, MenuCheckboxItemProps } from './types';

defineOptions({
  name: 'SMenuCheckboxItem'
});

const { class: cls, size, indicatorClass, ...delegatedProps } = defineProps<MenuCheckboxItemProps>();

const emit = defineEmits<MenuCheckboxItemEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { checkboxItem } = menuVariants({ size });

  return cn(checkboxItem(), cls);
});
</script>

<template>
  <MenuCheckboxItem v-bind="forwarded" :class="mergedCls">
    <SMenuItemIndicator :class="indicatorClass" :size="size">
      <slot name="indicatorIcon">
        <Check />
      </slot>
    </SMenuItemIndicator>
    <slot></slot>
  </MenuCheckboxItem>
</template>
