<script setup lang="ts">
import { computed } from 'vue';
import { MenuRadioItem, useForwardPropsEmits } from '@soybean-ui/primitive';
import { cn, menuVariants } from '@soybean-ui/variants';
import SMenuItemIndicator from './menu-item-indicator.vue';
import SMenuRadioIndicatorIcon from './menu-radio-indicator-icon.vue';
import type { MenuRadioItemEmits, MenuRadioItemProps } from './types';

defineOptions({
  name: 'SMenuRadioItem'
});

const { class: cls, size, indicatorClass, ...delegatedProps } = defineProps<MenuRadioItemProps>();

const emit = defineEmits<MenuRadioItemEmits>();

const forwarded = useForwardPropsEmits(delegatedProps, emit);

const mergedCls = computed(() => {
  const { radioItem } = menuVariants({ size });

  return cn(radioItem(), cls);
});
</script>

<template>
  <MenuRadioItem v-bind="forwarded" :class="mergedCls">
    <SMenuItemIndicator :class="indicatorClass" :size>
      <slot name="indicatorIcon">
        <SMenuRadioIndicatorIcon />
      </slot>
    </SMenuItemIndicator>
    <slot></slot>
  </MenuRadioItem>
</template>
