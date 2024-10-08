<script setup lang="ts">
import { computed } from 'vue';
import { PaginationListItem } from 'radix-vue';
import { cn, paginationVariants } from '@soybean-ui/variants';
import { SButton } from '../button';
import type { ThemeColor } from '../../types';
import type { PaginationListItemProps } from './types';

defineOptions({
  name: 'SPaginationListItem'
});

const { class: cls, size, variant, value, active } = defineProps<PaginationListItemProps>();

const { button } = paginationVariants();

const mergedCls = computed(() => (active ? cls : cn(button(), cls)));

const buttonColor = computed<ThemeColor>(() => (active ? 'primary' : 'accent'));

const btnVariant = computed(() => {
  if (!active) {
    return variant;
  }

  return variant === 'outline' ? 'solid' : 'outline';
});
</script>

<template>
  <PaginationListItem as-child :value>
    <slot>
      <SButton :class="mergedCls" :size :color="buttonColor" :variant="btnVariant" shape="square">
        {{ value }}
      </SButton>
    </slot>
  </PaginationListItem>
</template>
